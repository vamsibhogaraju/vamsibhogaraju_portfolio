import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import { scrollTriggerDefaults } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const credentials = [
  { icon: 'dot', title: 'MSc Computer Science', detail: 'Lakehead University · Thunder Bay, ON · 2023–2025' },
  { icon: 'dot', title: 'BE Computer Science', detail: 'Sathyabama Institute · Chennai, IN · 2019–2023' },
  { icon: 'dot', title: 'IEEE Published', detail: 'ICTCS 2025 · Clustering Multi-Omics Data' },
  { icon: 'dot', title: 'Microsoft Certified', detail: 'Power BI Data Analyst Associate · PL-300' },
  { icon: 'dot', title: 'Google Data Analytics', detail: 'Professional Certificate' },
]

export default function About() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.cred-card')
    gsap.fromTo(
      cards,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, ...scrollTriggerDefaults },
      }
    )
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const left = sectionRef.current.querySelector('.about-left')
    if (left) {
      gsap.fromTo(left, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: left, ...scrollTriggerDefaults },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" style={{ background: '#080d14', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <style>{`
          .about-grid { display: grid; grid-template-columns: 1fr; gap: 64px; align-items: start; }
          @media (min-width: 1024px) { .about-grid { grid-template-columns: 45% 55%; } }
          @media (min-width: 768px) { .about-grid { padding: 0 24px; } }
        `}</style>
        <div className="about-grid">
          {/* Left */}
          <div className="about-left">
            <SectionLabel number="02" label="ABOUT" />
            <blockquote
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '30px',
                fontWeight: 700,
                color: '#f1f5f9',
                lineHeight: 1.3,
                borderLeft: '4px solid #3b82f6',
                paddingLeft: '24px',
                marginBottom: '32px',
              }}
            >
              Every dataset has an answer. The hard part is finding the right question.
            </blockquote>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                color: '#94a3b8',
                lineHeight: 1.85,
                marginBottom: '40px',
              }}
            >
              I'm Vamsi, and I've spent the last couple of years getting my hands dirty with real data problems.
              Building ETL pipelines that don't fall apart, designing Azure Lakehouse architectures
              that actually scale, and creating Power BI dashboards that people outside the data team
              can finally make sense of. Whether I'm cleaning 50K+ records in SQL, automating
              workflows in Python, or transforming 180K+ transactions into something meaningful, I
              obsess over getting it right. Not just getting it done.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  background: '#3b82f6',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                See My Projects
              </a>
              <a
                href="/Vamsi_Bhogaraju_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                View Resume
              </a>
            </div>
          </div>

          {/* Right — Credential cards */}
          <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {credentials.map((cred) => (
              <div
                key={cred.title}
                className="cred-card"
                style={{
                  borderRadius: '8px',
                  padding: '20px 24px',
                  paddingLeft: '24px',
                  background: '#111e35',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: '3px solid #3b82f6',
                  cursor: 'default',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(6px)'
                  e.currentTarget.style.borderColor = 'rgba(99,179,237,0.25)'
                  e.currentTarget.style.borderLeftColor = '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderLeftColor = '#3b82f6'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  {cred.icon === 'dot' ? (
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '2px', flexShrink: 0 }} />
                  ) : (
                    <span style={{ fontSize: '18px' }}>{cred.icon}</span>
                  )}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500, color: '#f1f5f9' }}>
                    {cred.title}
                  </span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#475569', marginLeft: '30px' }}>
                  {cred.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
