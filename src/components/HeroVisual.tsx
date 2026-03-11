import { useRef, useEffect } from 'react'
import * as THREE from 'three'

// ── Card definitions ──────────────────────────────────────────────────

type CardSize = 'large' | 'medium' | 'small'

interface CardDef {
  size: CardSize
  border: string
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
}

const SIZES: Record<CardSize, [number, number]> = {
  large: [2.2, 1.3],
  medium: [1.6, 1.0],
  small: [1.1, 0.7],
}

const TEX_W = 400
const TEX_H = 250

// ── Drawing helpers ───────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

function drawCardBase(ctx: CanvasRenderingContext2D, borderColor: string) {
  // Background fill
  roundRect(ctx, 3, 3, TEX_W - 6, TEX_H - 6, 14)
  ctx.fillStyle = 'rgba(17,30,53,0.95)'
  ctx.fill()

  // Glowing border — pass 1 (outer glow)
  ctx.save()
  roundRect(ctx, 3, 3, TEX_W - 6, TEX_H - 6, 14)
  ctx.shadowBlur = 30
  ctx.shadowColor = borderColor
  ctx.strokeStyle = borderColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()

  // Glowing border — pass 2 (double intensity)
  ctx.save()
  roundRect(ctx, 3, 3, TEX_W - 6, TEX_H - 6, 14)
  ctx.shadowBlur = 15
  ctx.shadowColor = borderColor
  ctx.strokeStyle = borderColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  text: string, x: number, y: number,
  bg: string, fg: string,
) {
  ctx.font = '500 11px monospace'
  const tw = ctx.measureText(text).width
  const pw = tw + 14
  const ph = 20

  ctx.save()
  roundRect(ctx, x, y, pw, ph, 4)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.restore()

  ctx.fillStyle = fg
  ctx.fillText(text, x + 7, y + 14)
}

// ── Card definitions ──────────────────────────────────────────────────

const CARDS: CardDef[] = [
  // 1 — STAT: Records Processed (large)
  {
    size: 'large',
    border: '#3b82f6',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      // Accent dot
      ctx.beginPath()
      ctx.arc(TEX_W - 24, 22, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#3b82f6'
      ctx.fill()

      ctx.font = '500 12px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('RECORDS PROCESSED', 24, 40)

      ctx.font = '800 42px sans-serif'
      ctx.fillStyle = '#f1f5f9'
      ctx.fillText('180K+', 24, 96)

      // Mini bar chart
      const bars = [0.6, 0.85, 0.7, 1.0]
      const barW = 28
      const barGap = 8
      const maxH = 60
      const baseY = 200
      bars.forEach((v, i) => {
        const bx = 24 + i * (barW + barGap)
        const bh = v * maxH
        const grad = ctx.createLinearGradient(bx, baseY - bh, bx, baseY)
        grad.addColorStop(0, '#60a5fa')
        grad.addColorStop(1, '#3b82f6')
        ctx.fillStyle = grad
        roundRect(ctx, bx, baseY - bh, barW, bh, 3)
        ctx.fill()
      })
    },
  },
  // 2 — SKILL: Python (medium)
  {
    size: 'medium',
    border: '#6366f1',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      ctx.font = '700 28px monospace'
      ctx.fillStyle = '#6366f1'
      ctx.fillText('{ }', 24, 48)

      ctx.font = '700 22px sans-serif'
      ctx.fillStyle = '#f1f5f9'
      ctx.fillText('Python', 24, 90)

      ctx.font = '400 13px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('Pandas · NumPy · ETL', 24, 120)

      drawPill(ctx, 'Primary Stack', 24, 148, 'rgba(99,102,241,0.15)', '#818cf8')
    },
  },
  // 3 — STAT: Accuracy (small)
  {
    size: 'small',
    border: '#10b981',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      ctx.font = '500 12px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('ACCURACY', 24, 40)

      ctx.font = '800 42px sans-serif'
      ctx.fillStyle = '#10b981'
      ctx.fillText('97.3%', 24, 96)

      // Sparkline
      ctx.beginPath()
      ctx.moveTo(24, 170)
      ctx.lineTo(100, 150)
      ctx.lineTo(180, 130)
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 2
      ctx.stroke()
      const dots: [number, number][] = [[24, 170], [100, 150], [180, 130]]
      dots.forEach(([dx, dy]) => {
        ctx.beginPath()
        ctx.arc(dx, dy, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#10b981'
        ctx.fill()
      })
    },
  },
  // 4 — SKILL: Azure Databricks (medium)
  {
    size: 'medium',
    border: '#3b82f6',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      ctx.font = '400 26px sans-serif'
      ctx.fillStyle = '#3b82f6'
      ctx.fillText('☁', 24, 46)

      ctx.font = '700 22px sans-serif'
      ctx.fillStyle = '#f1f5f9'
      ctx.fillText('Azure Databricks', 24, 88)

      let px = 24
      ;['Delta Lake', 'PySpark', 'Synapse'].forEach((t) => {
        drawPill(ctx, t, px, 114, 'rgba(59,130,246,0.12)', '#60a5fa')
        px += ctx.measureText(t).width + 22
      })
    },
  },
  // 5 — ABSTRACT: Hexagons (large)
  {
    size: 'large',
    border: 'rgba(99,102,241,0.6)',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      const cx = TEX_W / 2
      const cy = 105
      for (let r = 24; r <= 72; r += 16) {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        const t = 1 - (r - 24) / 56
        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(99,102,241,${t * 0.4})`
        ctx.strokeStyle = `rgba(${59 + Math.round(40 * (1 - t))},${130 - Math.round(28 * (1 - t))},${246 - Math.round(115 * (1 - t))},${0.2 + t * 0.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }

      ctx.font = '500 12px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('// data architecture', 24, TEX_H - 20)
    },
  },
  // 6 — STAT: Time Saved (small)
  {
    size: 'small',
    border: '#f59e0b',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      ctx.font = '500 12px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('TIME SAVED', 24, 40)

      ctx.font = '800 42px sans-serif'
      ctx.fillStyle = '#f59e0b'
      ctx.fillText('80%', 24, 96)

      ctx.font = '400 13px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('via automation', 24, 126)
    },
  },
  // 7 — SKILL: Power BI + DAX (medium)
  {
    size: 'medium',
    border: '#10b981',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      ctx.font = '400 26px sans-serif'
      ctx.fillStyle = '#10b981'
      ctx.fillText('▦', 24, 46)

      ctx.font = '700 22px sans-serif'
      ctx.fillStyle = '#f1f5f9'
      ctx.fillText('Power BI + DAX', 24, 88)

      ctx.font = '400 13px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('KPI Dashboards · Reporting', 24, 118)
    },
  },
  // 8 — ABSTRACT: Dot grid (medium)
  {
    size: 'medium',
    border: 'rgba(59,130,246,0.5)',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      const filled = [
        [1, 0, 0, 1, 0],
        [1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
        [0, 0, 0, 1, 0],
      ]
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          const dx = 50 + col * 34
          const dy = 32 + row * 30
          ctx.beginPath()
          ctx.arc(dx, dy, 5, 0, Math.PI * 2)
          if (filled[row][col]) {
            ctx.fillStyle = '#3b82f6'
            ctx.fill()
          } else {
            ctx.strokeStyle = 'rgba(59,130,246,0.3)'
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Connecting lines
      ctx.strokeStyle = 'rgba(59,130,246,0.25)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(50, 32); ctx.lineTo(50, 62); ctx.lineTo(84, 62)
      ctx.lineTo(84, 92); ctx.lineTo(118, 92)
      ctx.lineTo(118, 122); ctx.lineTo(152, 122); ctx.lineTo(186, 122)
      ctx.lineTo(152, 152)
      ctx.stroke()

      ctx.font = '500 12px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('// pipeline flow', 24, TEX_H - 20)
    },
  },
  // 9 — STAT: Projects (small)
  {
    size: 'small',
    border: '#3b82f6',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      ctx.font = '500 12px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('PROJECTS', 24, 40)

      ctx.font = '800 42px sans-serif'
      ctx.fillStyle = '#f1f5f9'
      ctx.fillText('5+', 24, 96)

      ctx.font = '400 13px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('shipped & documented', 24, 126)
    },
  },
  // 10 — ABSTRACT: Waveform (large)
  {
    size: 'large',
    border: 'rgba(139,92,246,0.6)',
    draw(ctx) {
      drawCardBase(ctx, this.border)

      const cy = 100
      // Wave 1 (blue)
      ctx.save()
      ctx.beginPath()
      for (let x = 24; x < TEX_W - 24; x++) {
        const y = cy + Math.sin((x - 24) * 0.03) * 32
        if (x === 24) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2.5
      ctx.shadowBlur = 12
      ctx.shadowColor = '#3b82f6'
      ctx.stroke()
      ctx.restore()

      // Wave 2 (indigo, offset)
      ctx.save()
      ctx.beginPath()
      for (let x = 24; x < TEX_W - 24; x++) {
        const y = cy + Math.sin((x - 24) * 0.03 + 1.8) * 26
        if (x === 24) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = '#6366f1'
      ctx.lineWidth = 2
      ctx.shadowBlur = 10
      ctx.shadowColor = '#6366f1'
      ctx.stroke()
      ctx.restore()

      ctx.font = '500 12px monospace'
      ctx.fillStyle = '#475569'
      ctx.fillText('// signal processing', 24, TEX_H - 20)
    },
  },
]

// ── Card positions (exact, as specified) ──────────────────────────────

const POSITIONS: [number, number, number][] = [
  [-1.8,  1.4,  0.5],  // 1 — large, top left
  [ 1.6,  1.6, -0.5],  // 2 — medium, top right
  [-2.8,  0.2,  0.0],  // 3 — small, middle left
  [ 0.3,  0.6,  1.0],  // 4 — medium, center
  [ 2.4, -0.4, -1.0],  // 5 — large, right
  [-1.2, -1.2,  0.3],  // 6 — small, bottom left
  [ 1.0, -1.6, -0.3],  // 7 — medium, bottom center
  [-2.6,  1.8, -0.8],  // 8 — medium, top far left
  [ 2.8,  1.0,  0.2],  // 9 — small, right
  [ 0.2, -2.2,  0.8],  // 10 — large, bottom center
]

// ── Component ─────────────────────────────────────────────────────────

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'

    // ── Scene + Camera ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Build card meshes ──
    interface CardMeta {
      mesh: THREE.Mesh
      baseX: number
      baseY: number
      baseZ: number
      phaseY: number
      phaseX: number
      amplitudeY: number
      amplitudeX: number
      speed: number
      rotDir: number
      depthMul: number
      currentX: number
      currentY: number
    }

    const cards: CardMeta[] = []
    const geometries: THREE.PlaneGeometry[] = []
    const materials: THREE.MeshBasicMaterial[] = []
    const textures: THREE.CanvasTexture[] = []

    CARDS.forEach((def, i) => {
      // Draw texture onto offscreen canvas
      const offscreen = document.createElement('canvas')
      offscreen.width = TEX_W
      offscreen.height = TEX_H
      const ctx = offscreen.getContext('2d')!
      def.draw(ctx, TEX_W, TEX_H)

      const texture = new THREE.CanvasTexture(offscreen)
      texture.flipY = true
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      textures.push(texture)

      // Geometry + Material
      const [gw, gh] = SIZES[def.size]
      const geo = new THREE.PlaneGeometry(gw, gh)
      geometries.push(geo)

      const [bx, by, bz] = POSITIONS[i]

      // Opacity by depth
      let opacity: number
      if (bz > 0.5) opacity = 1.0
      else if (bz >= -0.5) opacity = 0.88
      else opacity = 0.7

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity,
      })
      materials.push(mat)

      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(bx, by, bz)

      // Cards face the camera flat — only tiny z tilt
      mesh.rotation.x = 0
      mesh.rotation.y = 0
      mesh.rotation.z = (Math.random() - 0.5) * 0.1 // ±0.05 rad

      scene.add(mesh)

      // Parallax depth multiplier
      const depthMul = bz > 0 ? 0.3 : bz > -0.5 ? 0.18 : 0.08

      cards.push({
        mesh,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        phaseY: i * 0.65,
        phaseX: i * 0.65 + Math.PI * 0.7, // offset from Y
        amplitudeY: 0.04 + (i % 4) * 0.01,   // 0.04–0.07
        amplitudeX: 0.02,
        speed: 0.3 + (i % 3) * 0.1,           // 0.3–0.5
        rotDir: i % 2 === 0 ? 1 : -1,
        depthMul,
        currentX: bx,
        currentY: by,
      })
    })

    // ── Sizing ──
    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // ── Mouse ──
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      mouseRef.current.active = true
    }
    const onMouseLeave = () => {
      mouseRef.current.active = false
    }
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)

    // ── Animation loop ──
    const clock = new THREE.Clock()
    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      const m = mouseRef.current
      const targetX = m.active ? m.x : 0
      const targetY = m.active ? m.y : 0
      const lerpFactor = 0.03

      cards.forEach((c) => {
        // Y float
        const floatY = Math.sin(elapsed * c.speed + c.phaseY) * c.amplitudeY
        // Subtle X drift
        const floatX = Math.sin(elapsed * c.speed * 0.7 + c.phaseX) * c.amplitudeX

        // Mouse parallax (reduced by 40% — multipliers already low)
        const offsetX = targetX * c.depthMul * 0.36
        const offsetY = targetY * c.depthMul * 0.36

        c.currentX += (c.baseX + offsetX + floatX - c.currentX) * lerpFactor
        c.currentY += (c.baseY + offsetY + floatY - c.currentY) * lerpFactor

        c.mesh.position.x = c.currentX
        c.mesh.position.y = c.currentY

        // Barely perceptible y rotation only
        c.mesh.rotation.y += 0.0005 * c.rotDir
      })

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)

      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      textures.forEach((t) => t.dispose())
      renderer.dispose()

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '500px',
        pointerEvents: 'all',
      }}
    />
  )
}
