import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const row1 = [
  'Python', 'SQL', 'Azure Databricks', 'Power BI', 'PySpark',
  'ETL Pipelines', 'Delta Lake', 'T-SQL', 'Data Warehousing',
  'Microsoft Azure', 'Spark', 'Pandas', 'ChatGPT', 'Claude',
  'Gemini', 'Notion',
]

const row2 = [
  'NumPy', 'DAX', 'Azure Synapse', 'NLP', 'BERT', 'T5 Transformer',
  'Data Modeling', 'PostgreSQL', 'Azure Data Lake', 'Cursor',
  'SparkSQL', 'Data Ingestion', 'Perplexity', 'GitHub Copilot',
  'Hugging Face',
]

function MarqueePill({ label }: { label: string }) {
  return (
    <span
      className="marquee-pill"
      style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        padding: '8px 20px',
        borderRadius: '999px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#94a3b8',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  )
}

export default function SkillMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !row1Ref.current || !row2Ref.current) return

    gsap.fromTo(row1Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    )
    gsap.fromTo(row2Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    )
  }, [])

  // Triplicate for seamless loop
  const r1Items = [...row1, ...row1, ...row1]
  const r2Items = [...row2, ...row2, ...row2]

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: '32px 0',
        marginBottom: '48px',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        .marquee-row:hover .marquee-track { animation-play-state: paused; }
        .marquee-pill:hover {
          background: rgba(59,130,246,0.1) !important;
          border-color: rgba(59,130,246,0.3) !important;
          color: #60a5fa !important;
        }
      `}</style>

      {/* Row 1 — scrolls left */}
      <div ref={row1Ref} className="marquee-row" style={{ overflow: 'hidden', marginBottom: '12px' }}>
        <div className="marquee-track" style={{
          display: 'flex', gap: '12px', width: 'max-content',
          animation: 'marquee-left 30s linear infinite',
        }}>
          {r1Items.map((s, i) => <MarqueePill key={`r1-${i}`} label={s} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div ref={row2Ref} className="marquee-row" style={{ overflow: 'hidden' }}>
        <div className="marquee-track" style={{
          display: 'flex', gap: '12px', width: 'max-content',
          animation: 'marquee-right 30s linear infinite',
        }}>
          {r2Items.map((s, i) => <MarqueePill key={`r2-${i}`} label={s} />)}
        </div>
      </div>
    </div>
  )
}
