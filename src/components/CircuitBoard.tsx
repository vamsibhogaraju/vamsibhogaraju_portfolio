import { useEffect, useRef, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────────────
interface Node {
  x: number
  y: number
  col: number
  row: number
  active: boolean
  skill?: string
  category?: string
  // Animation state
  flashTimer: number      // 0 = rest, >0 = flashing
  flashRadius: number     // animated radius
  flashGlow: number       // animated shadowBlur
  baseRadius: number      // rest radius
  labelFlash: number      // label flash timer
  labelPhase: number      // idle pulse phase offset
  neighbors: Node[]       // adjacency list
  traces: Trace[]         // traces connected to this node
}

interface Trace {
  from: Node
  to: Node
  bend?: { x: number; y: number }
  glowBoost: number       // current glow boost (lerps back to 0)
}

interface Pulse {
  trace: Trace
  progress: number
  speed: number
  trail: { x: number; y: number; alpha: number; width: number }[]
  color: string
  fadeOut: number         // 1 = alive, <1 = fading out at dead end
  dead: boolean
}

interface ICChip {
  x: number
  y: number
  w: number
  h: number
  label: string
  breathPhase: number
  pins: { x: number; y: number; side: 'top' | 'bottom'; glow: number }[]
}

// ── Constants ──────────────────────────────────────────────────────────
const CELL = 48
const PLAIN_NODE_RADIUS = 3
const SKILL_NODE_RADIUS = 5
const MAX_PULSES = 18
const MIN_PULSES = 10
const PULSE_SPAWN_MS = 400
const PULSE_HEAD_RADIUS = 5
const TRAIL_LENGTH = 16

const PULSE_COLORS = [
  { color: '#3b82f6', weight: 50 },
  { color: '#60a5fa', weight: 20 },
  { color: '#6366f1', weight: 20 },
  { color: '#10b981', weight: 10 },
]

const categoryColors: Record<string, string> = {
  lang: '#3b82f6',
  cloud: '#8b5cf6',
  viz: '#10b981',
  lib: '#f59e0b',
  tool: '#6366f1',
}

const skillNodes = [
  { label: 'Python', category: 'lang' },
  { label: 'SQL', category: 'lang' },
  { label: 'PySpark', category: 'lang' },
  { label: 'Azure', category: 'cloud' },
  { label: 'Databricks', category: 'cloud' },
  { label: 'Power BI', category: 'viz' },
  { label: 'Spark', category: 'viz' },
  { label: 'Pandas', category: 'lib' },
  { label: 'NumPy', category: 'lib' },
  { label: 'Airflow', category: 'tool' },
  { label: 'Git', category: 'tool' },
  { label: 'Excel', category: 'tool' },
]

const chipLabels = ['ETL', 'ML', 'DWH', 'API']

// ── Helpers ────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
function easeOutQuad(t: number) { return t * (2 - t) }
function easeInOutSine(t: number) { return -(Math.cos(Math.PI * t) - 1) / 2 }

function pointOnTrace(trace: Trace, t: number): { x: number; y: number } {
  if (trace.bend) {
    if (t < 0.5) {
      const tt = t * 2
      return { x: lerp(trace.from.x, trace.bend.x, tt), y: lerp(trace.from.y, trace.bend.y, tt) }
    }
    const tt = (t - 0.5) * 2
    return { x: lerp(trace.bend.x, trace.to.x, tt), y: lerp(trace.bend.y, trace.to.y, tt) }
  }
  return { x: lerp(trace.from.x, trace.to.x, t), y: lerp(trace.from.y, trace.to.y, t) }
}

function pickPulseColor(node?: Node): string {
  // Emerald only on SQL/BI nodes
  if (node?.skill && (node.skill === 'SQL' || node.skill === 'Power BI')) {
    if (Math.random() < 0.3) return '#10b981'
  }
  const r = Math.random() * 100
  let cumulative = 0
  for (const pc of PULSE_COLORS) {
    cumulative += pc.weight
    if (r < cumulative) return pc.color
  }
  return '#3b82f6'
}

function makeNode(x: number, y: number, col: number, row: number, active: boolean): Node {
  return {
    x, y, col, row, active,
    flashTimer: 0, flashRadius: active ? PLAIN_NODE_RADIUS : 0,
    flashGlow: 0, baseRadius: PLAIN_NODE_RADIUS,
    labelFlash: 0, labelPhase: Math.random() * Math.PI * 2,
    neighbors: [], traces: [],
  }
}

// ── Component ──────────────────────────────────────────────────────────
export default function CircuitBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const opacityRef = useRef(0)
  const startTimeRef = useRef(0)
  const prevTimeRef = useRef(0)
  const fpsRef = useRef(60)

  const dataRef = useRef<{
    nodes: Node[]
    activeNodes: Node[]
    traces: Trace[]
    pulses: Pulse[]
    chips: ICChip[]
    lastSpawn: number
    w: number
    h: number
    // Adjacency for junction detection
    adjacency: Map<Node, Trace[]>
  } | null>(null)

  const generateLayout = useCallback((w: number, h: number) => {
    const cols = Math.floor(w / CELL)
    const rows = Math.floor(h / CELL)
    const nodes: Node[] = []
    const nodeMap: (Node | null)[][] = []

    for (let r = 0; r < rows; r++) {
      nodeMap[r] = []
      for (let c = 0; c < cols; c++) {
        const active = Math.random() < 0.55
        const node = makeNode(c * CELL + CELL / 2, r * CELL + CELL / 2, c, r, active)
        nodes.push(node)
        nodeMap[r][c] = active ? node : null
      }
    }

    // Assign skills
    const activeNodes = nodes.filter((n) => n.active)
    const usedIndices = new Set<number>()
    const shuffled = [...skillNodes].sort(() => Math.random() - 0.5)
    for (const skill of shuffled) {
      let attempts = 0
      while (attempts < 150) {
        const idx = Math.floor(Math.random() * activeNodes.length)
        if (!usedIndices.has(idx)) {
          const node = activeNodes[idx]
          if (node.col > 1 && node.col < cols - 2 && node.row > 1 && node.row < rows - 2) {
            let tooClose = false
            for (const ui of usedIndices) {
              if (dist(node.x, node.y, activeNodes[ui].x, activeNodes[ui].y) < CELL * 2.5) {
                tooClose = true; break
              }
            }
            if (!tooClose) {
              node.skill = skill.label
              node.category = skill.category
              node.baseRadius = SKILL_NODE_RADIUS
              node.flashRadius = SKILL_NODE_RADIUS
              usedIndices.add(idx)
              break
            }
          }
        }
        attempts++
      }
    }

    // Build traces + adjacency
    const traces: Trace[] = []
    const traceSet = new Set<string>()
    const adjacency = new Map<Node, Trace[]>()

    const addTrace = (from: Node, to: Node, bend?: { x: number; y: number }) => {
      const key = `${from.row},${from.col}-${to.row},${to.col}`
      if (traceSet.has(key)) return
      traceSet.add(key)
      const trace: Trace = { from, to, bend, glowBoost: 0 }
      traces.push(trace)
      from.traces.push(trace)
      to.traces.push(trace)
      if (!from.neighbors.includes(to)) from.neighbors.push(to)
      if (!to.neighbors.includes(from)) to.neighbors.push(from)
      if (!adjacency.has(from)) adjacency.set(from, [])
      if (!adjacency.has(to)) adjacency.set(to, [])
      adjacency.get(from)!.push(trace)
      adjacency.get(to)!.push(trace)
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const node = nodeMap[r]?.[c]
        if (!node) continue
        if (c + 1 < cols && nodeMap[r][c + 1]) addTrace(node, nodeMap[r][c + 1]!)
        if (r + 1 < rows && nodeMap[r + 1]?.[c]) addTrace(node, nodeMap[r + 1][c]!)
        if (Math.random() < 0.1 && c + 1 < cols && r + 1 < rows && nodeMap[r + 1]?.[c + 1]) {
          addTrace(node, nodeMap[r + 1][c + 1]!, { x: nodeMap[r + 1][c + 1]!.x, y: node.y })
        }
      }
    }

    // IC Chips
    const chips: ICChip[] = []
    for (const label of chipLabels) {
      let attempts = 0
      while (attempts < 200) {
        const chipW = CELL * 2
        const chipH = CELL * 1.2
        const cx = CELL * 2 + Math.random() * (w - CELL * 6)
        const cy = CELL * 2 + Math.random() * (h - CELL * 6)
        let overlap = false
        for (const ex of chips) {
          if (cx < ex.x + ex.w + CELL && cx + chipW > ex.x - CELL &&
              cy < ex.y + ex.h + CELL && cy + chipH > ex.y - CELL) {
            overlap = true; break
          }
        }
        if (!overlap) {
          const pins: ICChip['pins'] = []
          for (let p = 0; p < 4; p++) {
            const px = cx + (chipW / 5) * (p + 1)
            pins.push({ x: px, y: cy, side: 'top', glow: 0 })
            pins.push({ x: px, y: cy + chipH, side: 'bottom', glow: 0 })
          }
          chips.push({ x: cx, y: cy, w: chipW, h: chipH, label, breathPhase: Math.random() * Math.PI * 2, pins })
          break
        }
        attempts++
      }
    }

    // Initial pulses
    const pulses: Pulse[] = []
    for (let i = 0; i < MIN_PULSES && traces.length > 0; i++) {
      const trace = traces[Math.floor(Math.random() * traces.length)]
      pulses.push({
        trace, progress: Math.random(),
        speed: 0.4 + Math.random() * 0.5,
        trail: [], color: pickPulseColor(trace.from),
        fadeOut: 1, dead: false,
      })
    }

    dataRef.current = { nodes, activeNodes, traces, pulses, chips, lastSpawn: 0, w, h, adjacency }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    startTimeRef.current = performance.now()
    prevTimeRef.current = startTimeRef.current

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateLayout(rect.width, rect.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // ── Render ────────────────────────────────────────────────────────
    const render = (time: number) => {
      const data = dataRef.current
      if (!data) { animRef.current = requestAnimationFrame(render); return }

      const rawDt = (time - prevTimeRef.current) / 1000
      const dt = Math.min(rawDt, 0.05) // cap delta
      prevTimeRef.current = time
      fpsRef.current = lerp(fpsRef.current, 1 / (rawDt || 0.016), 0.1)

      const lowPerf = fpsRef.current < 50
      const shadowScale = lowPerf ? 0.7 : 1
      const maxP = lowPerf ? MAX_PULSES - 3 : MAX_PULSES

      const { nodes, traces, pulses, chips, w, h, adjacency } = data
      const elapsed = (time - startTimeRef.current) / 1000
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Fade-in
      if (elapsed < 0.5) opacityRef.current = 0
      else if (elapsed < 1.7) opacityRef.current = (elapsed - 0.5) / 1.2
      else opacityRef.current = 1
      // Slow brightness pulse: oscillate between 0.92 and 1.0 over 3s
      const brightnessPulse = 0.92 + 0.08 * ((Math.sin(elapsed * (Math.PI * 2 / 3)) + 1) / 2)
      const globalA = opacityRef.current * brightnessPulse

      ctx.clearRect(0, 0, w, h)

      // ── 1. BACKGROUND ──────────────────────────────────────────────
      // Base fill
      ctx.globalAlpha = globalA
      ctx.fillStyle = '#080d14'
      ctx.fillRect(0, 0, w, h)

      // Center radial glow
      const centerGlow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6)
      centerGlow.addColorStop(0, 'rgba(59,130,246,0.04)')
      centerGlow.addColorStop(1, 'rgba(59,130,246,0)')
      ctx.fillStyle = centerGlow
      ctx.fillRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = 'rgba(59,130,246,0.06)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < w; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // PCB substrate tint
      ctx.fillStyle = 'rgba(0,15,8,0.2)'
      ctx.fillRect(0, 0, w, h)

      // ── 2. TRACES (double pass) ────────────────────────────────────
      // Decay trace glow boosts
      for (const trace of traces) {
        trace.glowBoost = lerp(trace.glowBoost, 0, 0.05)
      }

      // Pass 1: glow layer
      for (const trace of traces) {
        ctx.save()
        const boost = trace.glowBoost
        ctx.strokeStyle = `rgba(59,130,246,${0.16 + boost * 0.14})`
        ctx.lineWidth = 6
        ctx.shadowBlur = 14 * shadowScale
        ctx.shadowColor = `rgba(59,130,246,${0.25 + boost * 0.15})`
        ctx.beginPath()
        ctx.moveTo(trace.from.x, trace.from.y)
        if (trace.bend) { ctx.lineTo(trace.bend.x, trace.bend.y); ctx.lineTo(trace.to.x, trace.to.y) }
        else ctx.lineTo(trace.to.x, trace.to.y)
        ctx.stroke()
        ctx.restore()
      }

      // Pass 2: core line
      for (const trace of traces) {
        const boost = trace.glowBoost
        ctx.strokeStyle = `rgba(59,130,246,${0.44 + boost * 0.3})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(trace.from.x, trace.from.y)
        if (trace.bend) { ctx.lineTo(trace.bend.x, trace.bend.y); ctx.lineTo(trace.to.x, trace.to.y) }
        else ctx.lineTo(trace.to.x, trace.to.y)
        ctx.stroke()
      }

      // ── 3. IC CHIPS ────────────────────────────────────────────────
      for (const chip of chips) {
        const breathT = easeInOutSine((Math.sin(elapsed * (Math.PI * 2 / 3) + chip.breathPhase) + 1) / 2)
        const chipShadow = lerp(8, 18, breathT) * shadowScale

        ctx.save()
        ctx.shadowBlur = chipShadow
        ctx.shadowColor = 'rgba(59,130,246,0.25)'
        ctx.fillStyle = 'rgba(17,30,53,0.92)'
        ctx.strokeStyle = `rgba(59,130,246,0.75)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(chip.x, chip.y, chip.w, chip.h, 3)
        ctx.fill()
        ctx.stroke()
        ctx.restore()

        // Internal circuitry lines
        const lineY1 = chip.y + chip.h * 0.3
        const lineY2 = chip.y + chip.h * 0.5
        const lineY3 = chip.y + chip.h * 0.7
        ctx.strokeStyle = 'rgba(99,179,237,0.15)'
        ctx.lineWidth = 0.5
        for (const ly of [lineY1, lineY2, lineY3]) {
          ctx.beginPath()
          ctx.moveTo(chip.x + 6, ly)
          ctx.lineTo(chip.x + chip.w - 6, ly)
          ctx.stroke()
        }

        // Label
        ctx.font = "bold 10px 'JetBrains Mono', monospace"
        ctx.fillStyle = '#60a5fa'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(chip.label, chip.x + chip.w / 2, chip.y + chip.h / 2)

        // Pins
        for (const pin of chip.pins) {
          pin.glow = Math.max(0, pin.glow - dt * 3)
          const pinAlpha = 0.3 + pin.glow * 0.7
          ctx.save()
          if (pin.glow > 0.1) {
            ctx.shadowBlur = 16 * shadowScale * pin.glow
            ctx.shadowColor = '#60a5fa'
          }
          ctx.fillStyle = `rgba(96,165,250,${pinAlpha})`
          const pinLen = 6
          if (pin.side === 'top') ctx.fillRect(pin.x - 1, pin.y - pinLen, 2, pinLen)
          else ctx.fillRect(pin.x - 1, pin.y, 2, pinLen)
          ctx.restore()
        }
      }

      // ── 4. NODES ───────────────────────────────────────────────────
      for (const node of nodes) {
        if (!node.active) continue

        // Update flash timers
        if (node.flashTimer > 0) {
          node.flashTimer = Math.max(0, node.flashTimer - dt)
          const totalFlash = 0.52 // 120ms expand + 400ms fade
          const t = 1 - node.flashTimer / totalFlash
          if (t < 0.23) {
            // Expand phase (0-120ms)
            const et = easeOutQuad(t / 0.23)
            node.flashRadius = lerp(node.baseRadius, node.baseRadius * 2.2, et)
            node.flashGlow = 28 * shadowScale
          } else {
            // Shrink + fade phase
            const et = easeOutQuad((t - 0.23) / 0.77)
            node.flashRadius = lerp(node.baseRadius * 2.2, node.baseRadius, et)
            node.flashGlow = lerp(28, node.skill ? 24 : 14, et) * shadowScale
          }
        } else {
          node.flashRadius = lerp(node.flashRadius, node.baseRadius, 0.1)
          node.flashGlow = lerp(node.flashGlow, node.skill ? 24 * shadowScale : 14 * shadowScale, 0.05)
        }
        if (node.labelFlash > 0) node.labelFlash = Math.max(0, node.labelFlash - dt * 2)

        // Mouse hover glow
        const mouseDist = dist(mx, my, node.x, node.y)
        const hoverT = mouseDist < 80 ? (1 - mouseDist / 80) : 0

        const isSkill = !!(node.skill && node.category)
        const nodeColor = isSkill ? (categoryColors[node.category!] || '#3b82f6') : '#3b82f6'

        // Draw node glow
        ctx.save()
        const glowVal = Math.max(node.flashGlow, hoverT * 20 * shadowScale)
        ctx.shadowBlur = glowVal
        ctx.shadowColor = hoverT > 0.1 ? '#60a5fa' : (node.flashTimer > 0 ? nodeColor : `rgba(59,130,246,0.4)`)
        const drawRadius = Math.max(node.flashRadius, node.baseRadius)
        const alphaBoost = isSkill ? 0.29 + 0.56 : 0.29

        ctx.fillStyle = nodeColor
        ctx.globalAlpha = globalA * clamp(alphaBoost + node.flashTimer * 1.5 + hoverT * 0.4, 0, 1)
        ctx.beginPath()
        ctx.arc(node.x, node.y, drawRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        ctx.globalAlpha = globalA

        // Skill label pill
        if (isSkill && node.skill) {
          const labelPulse = (Math.sin(elapsed * (Math.PI * 2 / (2 + (node.labelPhase % 2))) + node.labelPhase) + 1) / 2
          const borderAlpha = lerp(0.3, 0.6, labelPulse) + node.labelFlash * 0.4
          const bgAlpha = node.labelFlash > 0.1 ? lerp(0.08, 0.25, node.labelFlash) : 0.08
          const textColor = node.labelFlash > 0.3 ? '#ffffff' : '#e2e8f0'

          ctx.font = "600 11px 'JetBrains Mono', monospace"
          const textW = ctx.measureText(node.skill).width
          const pillW = textW + 20
          const pillH = 22
          const pillX = node.x - pillW / 2
          const pillY = node.y - node.baseRadius - 18 - pillH

          // Pill background
          ctx.fillStyle = `rgba(59,130,246,${bgAlpha})`
          ctx.beginPath()
          ctx.roundRect(pillX, pillY, pillW, pillH, 4)
          ctx.fill()

          // Pill border
          ctx.strokeStyle = `rgba(59,130,246,${clamp(borderAlpha, 0, 1)})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Pill text
          ctx.fillStyle = textColor
          ctx.globalAlpha = globalA * clamp(0.7 + node.labelFlash * 0.3, 0, 1)
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(node.skill, node.x, pillY + pillH / 2)
          ctx.globalAlpha = globalA
        }
      }

      // ── 5. PULSES ─────────────────────────────────────────────────
      // Spawn
      if (time - data.lastSpawn > PULSE_SPAWN_MS && pulses.length < maxP && traces.length > 0) {
        const trace = traces[Math.floor(Math.random() * traces.length)]
        pulses.push({
          trace, progress: 0,
          speed: 0.4 + Math.random() * 0.5,
          trail: [], color: pickPulseColor(trace.from),
          fadeOut: 1, dead: false,
        })
        data.lastSpawn = time
      }

      // Ensure minimum count
      while (pulses.length < MIN_PULSES && traces.length > 0) {
        const trace = traces[Math.floor(Math.random() * traces.length)]
        pulses.push({
          trace, progress: 0,
          speed: 0.4 + Math.random() * 0.5,
          trail: [], color: pickPulseColor(trace.from),
          fadeOut: 1, dead: false,
        })
      }

      // Mouse hover extra pulses
      if (mx > 0 && my > 0) {
        for (const trace of traces) {
          if (pulses.length >= maxP) break
          const mid = pointOnTrace(trace, 0.5)
          if (dist(mx, my, mid.x, mid.y) < 50 && Math.random() < 0.008) {
            pulses.push({
              trace, progress: 0,
              speed: 0.6 + Math.random() * 0.4,
              trail: [], color: pickPulseColor(trace.from),
              fadeOut: 1, dead: false,
            })
          }
        }
      }

      // Update & draw
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        pulse.progress += pulse.speed * dt

        // Boost trace glow
        pulse.trace.glowBoost = Math.max(pulse.trace.glowBoost, 0.8)

        if (pulse.progress >= 1) {
          const endNode = pulse.trace.to
          // Flash the node
          endNode.flashTimer = 0.52
          endNode.labelFlash = 1

          // Check for chip pin hits
          for (const chip of chips) {
            for (const pin of chip.pins) {
              if (dist(endNode.x, endNode.y, pin.x, pin.y) < CELL) {
                pin.glow = 1
              }
            }
          }

          // Junction splitting: 3+ connections → 30% chance to split
          const nodeTraces = adjacency.get(endNode) || []
          const otherTraces = nodeTraces.filter(t => t !== pulse.trace)

          if (otherTraces.length >= 2 && Math.random() < 0.3 && pulses.length < maxP - 1) {
            // Split into 2 pulses on different traces
            const shuffled = [...otherTraces].sort(() => Math.random() - 0.5)
            for (let s = 0; s < Math.min(2, shuffled.length); s++) {
              const nextTrace = shuffled[s]
              // Orient trace so pulse goes away from endNode
              const oriented: Trace = nextTrace.from === endNode ? nextTrace
                : { from: nextTrace.to, to: nextTrace.from, bend: nextTrace.bend, glowBoost: nextTrace.glowBoost }
              pulses.push({
                trace: oriented, progress: 0,
                speed: 0.4 + Math.random() * 0.4,
                trail: [], color: pulse.color,
                fadeOut: 1, dead: false,
              })
            }
            pulses.splice(i, 1)
            continue
          } else if (otherTraces.length > 0) {
            // Continue on a random other trace
            const nextTrace = otherTraces[Math.floor(Math.random() * otherTraces.length)]
            const oriented: Trace = nextTrace.from === endNode ? nextTrace
              : { from: nextTrace.to, to: nextTrace.from, bend: nextTrace.bend, glowBoost: nextTrace.glowBoost }
            pulse.trace = oriented
            pulse.progress = 0
            pulse.speed = 0.4 + Math.random() * 0.5
            continue
          } else {
            // Dead end: fade out
            pulse.dead = true
          }
        }

        // Fade out dead pulses
        if (pulse.dead) {
          pulse.fadeOut -= dt * 5 // ~200ms
          if (pulse.fadeOut <= 0) {
            pulses.splice(i, 1)
            continue
          }
        }

        const pos = pointOnTrace(pulse.trace, clamp(pulse.progress, 0, 1))
        const fadeAlpha = pulse.fadeOut

        // Update trail
        pulse.trail.unshift({ x: pos.x, y: pos.y, alpha: 0.9, width: 3 })
        if (pulse.trail.length > TRAIL_LENGTH) pulse.trail.length = TRAIL_LENGTH

        // Draw trail (tapered segments with glow)
        for (let t = 1; t < pulse.trail.length; t++) {
          const seg = pulse.trail[t]
          const prev = pulse.trail[t - 1]
          const trailT = t / pulse.trail.length
          seg.alpha = lerp(1.0, 0, trailT)
          seg.width = lerp(3.5, 0.5, trailT)

          ctx.save()
          ctx.strokeStyle = pulse.color
          ctx.globalAlpha = globalA * seg.alpha * fadeAlpha * 1.5
          ctx.lineWidth = seg.width
          ctx.shadowBlur = 14 * shadowScale
          ctx.shadowColor = pulse.color
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(seg.x, seg.y)
          ctx.stroke()
          ctx.restore()
        }

        // Draw pulse head
        ctx.save()
        ctx.shadowBlur = 32 * shadowScale
        ctx.shadowColor = pulse.color
        ctx.fillStyle = pulse.color
        ctx.globalAlpha = globalA * fadeAlpha
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, PULSE_HEAD_RADIUS, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        ctx.globalAlpha = globalA
      }

      // ── 6. SCANLINES ───────────────────────────────────────────────
      ctx.globalAlpha = globalA * 0.03
      ctx.fillStyle = '#000'
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1)
      }

      // ── 7. VIGNETTE ────────────────────────────────────────────────
      ctx.globalAlpha = globalA
      const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.15, w / 2, h / 2, Math.max(w, h) * 0.7)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(0.3, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(8,13,20,0.7)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      // ── 8. BLOOM (screen composite) ────────────────────────────────
      // Draw canvas on itself at low opacity with screen blend for bloom
      ctx.globalAlpha = 0.2
      ctx.globalCompositeOperation = 'screen'
      ctx.filter = 'blur(2px)'
      ctx.drawImage(canvas, 0, 0, w, h)
      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1

      animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [generateLayout])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', willChange: 'transform', transform: 'translateZ(0)' }}
      />
    </div>
  )
}
