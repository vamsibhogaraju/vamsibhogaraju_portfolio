import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import { experience } from '../data/experience'
import { scrollTriggerDefaults } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return

    // Timeline line draw
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.5,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      }
    )

    // Card entrances — slide from left
    const items = sectionRef.current.querySelectorAll('.timeline-item')
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, ...scrollTriggerDefaults },
        }
      )
    })
  }, [])

  return (
    <section id="experience" className="exp-section" style={{ background: '#0d1526', padding: '120px 0' }}>
      <style>{`@media (max-width: 767px) { .exp-section { padding: 60px 0 !important; } }`}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <SectionLabel number="04" label="EXPERIENCE" />
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 48px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#f1f5f9',
              marginTop: '12px',
            }}
          >
            Experience
          </h2>
        </div>

        <div ref={sectionRef} style={{ position: 'relative', maxWidth: '720px', margin: '0 auto', paddingLeft: '40px' }}>
          <style>{`
            .exp-timeline-line { display: none; }
            @media (min-width: 768px) { .exp-timeline-line { display: block !important; } }
            @media (max-width: 767px) { .exp-timeline-container { padding-left: 0 !important; } }
          `}</style>

          {/* Vertical timeline line */}
          <div
            ref={lineRef}
            className="exp-timeline-line"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '2px',
              transformOrigin: 'top center',
              background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.5) 5%, rgba(59,130,246,0.3) 95%, transparent)',
            }}
          />

          {experience.map((item) => (
            <div
              key={item.company}
              className="timeline-item"
              style={{ position: 'relative', marginBottom: '20px' }}
            >
              {/* Timeline dot */}
              <div
                className="exp-timeline-line"
                style={{
                  display: 'none',
                  position: 'absolute',
                  left: '-5px',
                  top: '28px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  border: '2px solid #080d14',
                  zIndex: 10,
                  boxShadow: '0 0 0 3px rgba(59,130,246,0.2), 0 0 16px rgba(59,130,246,0.4)',
                }}
              />

              {/* Card */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  padding: 'clamp(16px, 3vw, 28px) clamp(16px, 3vw, 32px)',
                  background: 'linear-gradient(145deg, #131f38, #0e1a2e)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: '3px solid #3b82f6',
                  boxShadow: '-3px 0 12px rgba(59,130,246,0.3)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.boxShadow = '-3px 0 12px rgba(59,130,246,0.3), 0 8px 32px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = '-3px 0 12px rgba(59,130,246,0.3)'
                }}
              >
                {/* Header — two column */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                      {item.role}
                    </h3>
                    <span style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#3b82f6', marginTop: '4px' }}>
                      {item.company}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#475569' }}>
                      {item.date}
                    </span>
                    <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)', margin: '14px 0' }} />

                {/* Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {item.bullets.map((b, i) => (
                    <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, margin: 0 }}>
                      <span style={{ color: '#3b82f6' }}>→ </span>{b}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
