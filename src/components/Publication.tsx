import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import { scrollTriggerDefaults } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

export default function Publication() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [citationOpen, setCitationOpen] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: cardRef.current, ...scrollTriggerDefaults },
      }
    )
  }, [])

  return (
    <section id="publication" style={{ background: '#0d1526', padding: '120px 0 100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <SectionLabel number="07" label="PUBLICATION" />
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '48px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#f1f5f9',
              marginTop: '12px',
            }}
          >
            Research
          </h2>
        </div>

        <style>{`
          .pub-cta:hover {
            brightness: 1.1;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(59,130,246,0.35) !important;
          }
        `}</style>

        <div
          ref={cardRef}
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            borderRadius: '20px',
            padding: '48px',
            background: 'linear-gradient(145deg, #131f38, #0e1a2e)',
            border: '1px solid rgba(59,130,246,0.15)',
            borderTop: '3px solid rgba(59,130,246,0.5)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4), 0 0 80px rgba(59,130,246,0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderTopColor = '#3b82f6'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 48px rgba(0,0,0,0.5), 0 0 80px rgba(59,130,246,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderTopColor = 'rgba(59,130,246,0.5)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4), 0 0 80px rgba(59,130,246,0.06)'
          }}
        >
          {/* Badge row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '4px',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.3)',
                color: '#60a5fa',
              }}
            >
              IEEE ICTCS 2025
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '4px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                color: '#10b981',
              }}
            >
              Peer Reviewed
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '30px',
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1.3,
              marginBottom: '20px',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Clustering Multi-Omics Data in Gleason Scores 3+4 and 4+3 Reveals 3 Patterns
          </h3>

          {/* Meta row */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#475569',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px dashed rgba(255,255,255,0.06)',
            }}
          >
            <span>Bhogaraju, V., et al.</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>ICTCS 2025</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>pp. 314–320</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>IEEE</span>
          </p>

          {/* Citation toggle */}
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={() => setCitationOpen(!citationOpen)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#60a5fa',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.textDecoration = 'underline' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.textDecoration = 'none' }}
            >
              {citationOpen ? 'Hide Full Citation ↑' : 'View Full Citation ↓'}
            </button>
            {citationOpen && (
              <div
                style={{
                  marginTop: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#64748b',
                  lineHeight: 1.7,
                }}
              >
                Bhogaraju, V., Kompella, Y. S. S., Korukonda, V., Ramigani, T. R.,
                Namineni, S. V., Elkarami, B., ... &amp; Alkhateeb, A. (2025, April).
                Clustering Multi-Omics Data in Gleason Scores 3+4 and 4+3 Reveals
                3 Patterns. In 2025 International Conference on New Trends in
                Computing Sciences (ICTCS) (pp. 314-320). IEEE.
              </div>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              color: '#94a3b8',
              lineHeight: 1.85,
              margin: '0 0 12px 0',
            }}
          >
            Research applying unsupervised clustering techniques to multi-omics data from prostate
            cancer patients with Gleason scores 3+4 and 4+3, uncovering three distinct molecular
            patterns with potential clinical significance.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              color: '#94a3b8',
              lineHeight: 1.85,
              margin: '0 0 32px 0',
            }}
          >
            Demonstrates how advanced data analysis and machine learning can be applied to
            high-dimensional biological datasets to support cancer subtype discovery and improve
            understanding of disease heterogeneity.
          </p>

          {/* CTA */}
          <a
            href="https://doi.org/10.1109/ICTCS65341.2025.10989316"
            target="_blank"
            rel="noopener noreferrer"
            className="pub-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 28px',
              borderRadius: '8px',
              background: '#3b82f6',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            Read on IEEE →
          </a>
        </div>
      </div>
    </section>
  )
}
