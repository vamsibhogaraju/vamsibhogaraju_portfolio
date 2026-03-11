import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillMarquee from './SkillMarquee'
import { scrollTriggerDefaults } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    name: 'PROGRAMMING',
    primary: ['Python'],
    secondary: ['Pandas', 'NumPy'],
  },
  {
    name: 'SQL & DATABASES',
    primary: ['SQL', 'T-SQL'],
    secondary: ['MySQL', 'PostgreSQL', 'CTEs', 'Window Functions', 'Joins'],
  },
  {
    name: 'BI & VISUALIZATION',
    primary: ['Power BI', 'DAX'],
    secondary: ['Data Visualization', 'KPI Reporting', 'Dashboard Development'],
  },
  {
    name: 'CLOUD & BIG DATA',
    primary: ['Azure Databricks', 'Microsoft Azure', 'Azure Data Lake', 'Azure Synapse'],
    secondary: ['Delta Lake', 'PySpark', 'SparkSQL', 'Apache Spark', 'Azure Data Factory'],
  },
  {
    name: 'DATA ENGINEERING',
    primary: ['ETL Pipelines', 'Data Warehousing', 'Data Transformation', 'Data Ingestion'],
    secondary: ['Data Lineage', 'Data Modeling', 'Data Validation'],
  },
  {
    name: 'NLP & ML',
    primary: ['NLP', 'T5 Transformer'],
    secondary: ['BERT', 'GPT-2', 'AllenNLP', 'Machine Learning'],
  },
]

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.skill-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.5, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, ...scrollTriggerDefaults },
      }
    )
  }, [])

  return (
    <section id="skills" style={{ background: '#0d1526', padding: '120px 80px 120px' }}>
      <style>{`
        @media (max-width: 1023px) { #skills { padding: 120px 24px !important; } }
        @media (max-width: 767px) { #skills { padding: 60px 16px !important; } }
        .skills-grid { display: grid; grid-template-columns: 1fr; gap: 14px; max-width: 1080px; padding: 0 24px; margin: 48px auto 0; align-items: stretch; }
        .skill-card { border-left: 3px solid rgba(59,130,246,0.4) !important; }
        .skill-card:hover { border-left-color: #3b82f6 !important; }
        @media (min-width: 768px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .skills-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
          color: '#3b82f6', letterSpacing: '0.08em',
        }}>
          // 03 SKILLS
        </span>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 6vw, 52px)',
          letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f1f5f9', marginTop: '12px',
        }}>
          Skills & Stack
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '16px',
          color: '#94a3b8', marginTop: '12px',
        }}>
          Tools I use to build, analyze and ship.
        </p>
      </div>

      {/* Marquee ticker */}
      <SkillMarquee />

      {/* Category cards */}
      <div ref={gridRef} className="skills-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="skill-card"
            style={{
              background: '#111e35',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.25s',
              minHeight: '170px',
              display: 'flex',
              flexDirection: 'column' as const,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span style={{
              display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px',
              textTransform: 'uppercase', letterSpacing: '0.16em', color: '#60a5fa',
              marginBottom: '16px', paddingBottom: '10px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {cat.name}
            </span>
            <div style={{ flex: 1, paddingTop: '8px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.primary.map((s) => (
                  <span key={s} style={{
                    display: 'inline-block', fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                    fontWeight: 500, padding: '5px 14px', borderRadius: '6px',
                    background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)',
                    color: '#93c5fd',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
              {cat.secondary.length > 0 && (
                <>
                  <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', margin: '12px 0' }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.secondary.map((s) => (
                      <span key={s} style={{
                        display: 'inline-block', fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                        fontWeight: 400, padding: '5px 14px', borderRadius: '6px',
                        background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#64748b',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
