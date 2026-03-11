import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import { certifications } from '../data/certifications'
import { scrollTriggerDefaults } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function getTheme(issuer: string) {
  if (issuer === 'Google') return {
    accent: '#10b981', accentLight: '#6ee7b7',
    bgTint: 'rgba(16,185,129,0.1)', borderTint: 'rgba(16,185,129,0.25)',
    badgeBg: 'rgba(16,185,129,0.08)', badgeBorder: 'rgba(16,185,129,0.2)',
    topBorder: 'rgba(16,185,129,0.4)', topBorderHover: '#10b981',
  }
  if (issuer === 'Cognibot') return {
    accent: '#a78bfa', accentLight: '#a78bfa',
    bgTint: 'rgba(139,92,246,0.1)', borderTint: 'rgba(139,92,246,0.25)',
    badgeBg: 'rgba(139,92,246,0.08)', badgeBorder: 'rgba(139,92,246,0.2)',
    topBorder: 'rgba(139,92,246,0.4)', topBorderHover: '#8b5cf6',
  }
  return {
    accent: '#3b82f6', accentLight: '#60a5fa',
    bgTint: 'rgba(59,130,246,0.12)', borderTint: 'rgba(59,130,246,0.25)',
    badgeBg: 'rgba(59,130,246,0.08)', badgeBorder: 'rgba(59,130,246,0.2)',
    topBorder: 'rgba(59,130,246,0.4)', topBorderHover: '#3b82f6',
  }
}

function LogoIcon({ issuer, initial, theme }: { issuer: string; initial: string; theme: ReturnType<typeof getTheme> }) {
  if (issuer === 'Google') return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
    </svg>
  )
  if (issuer === 'Microsoft') return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="32" height="32">
      <path fill="#f25022" d="M1 1h10v10H1z"/>
      <path fill="#00a4ef" d="M12 1h10v10H12z"/>
      <path fill="#7fba00" d="M1 12h10v10H1z"/>
      <path fill="#ffb900" d="M12 12h10v10H12z"/>
    </svg>
  )
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
      {/* Hexagon */}
      <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="#8B1A1A"/>
      {/* Outer ring dots */}
      {[0,40,80,120,160,200,240,280,320].map((deg) => {
        const r = 22; const cx = 50 + r * Math.cos((deg - 90) * Math.PI / 180); const cy = 50 + r * Math.sin((deg - 90) * Math.PI / 180)
        return <circle key={`o${deg}`} cx={cx} cy={cy} r="3" fill="#fff" opacity="0.9"/>
      })}
      {/* Middle ring dots */}
      {[0,60,120,180,240,300].map((deg) => {
        const r = 14; const cx = 50 + r * Math.cos((deg - 90) * Math.PI / 180); const cy = 50 + r * Math.sin((deg - 90) * Math.PI / 180)
        return <circle key={`m${deg}`} cx={cx} cy={cy} r="2.5" fill="#fff" opacity="0.75"/>
      })}
      {/* Inner ring dots */}
      {[0,90,180,270].map((deg) => {
        const r = 7; const cx = 50 + r * Math.cos((deg - 90) * Math.PI / 180); const cy = 50 + r * Math.sin((deg - 90) * Math.PI / 180)
        return <circle key={`i${deg}`} cx={cx} cy={cy} r="2" fill="#fff" opacity="0.6"/>
      })}
      {/* Center dot */}
      <circle cx="50" cy="50" r="2.5" fill="#fff"/>
    </svg>
  )
}

export default function Certifications() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.cert-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, ...scrollTriggerDefaults },
      }
    )
  }, [])

  return (
    <section id="certifications" style={{ background: '#080d14', padding: '120px 0 100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <SectionLabel number="06" label="CERTIFICATIONS" />
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
            Credentials
          </h2>
        </div>

        <style>{`
          .cert-grid { display: grid; grid-template-columns: 1fr; gap: 20px; max-width: 1000px; margin: 0 auto; }
          @media (min-width: 768px) { .cert-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .cert-grid { grid-template-columns: repeat(3, 1fr); } }
        `}</style>
        <div ref={gridRef} className="cert-grid">
          {certifications.map((cert) => {
            const theme = getTheme(cert.issuer)
            return (
              <div
                key={cert.title}
                className="cert-card"
                style={{
                  background: 'linear-gradient(145deg, #131f38, #0e1a2e)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderTop: `2px solid ${theme.topBorder}`,
                  borderRadius: '14px',
                  padding: '32px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = theme.topBorderHover
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = theme.topBorder
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)'
                }}
              >
                {/* Logo icon box */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    background: theme.bgTint,
                    border: `1px solid ${theme.borderTint}`,
                  }}
                >
                  <LogoIcon issuer={cert.issuer} initial={cert.initial} theme={theme} />
                </div>

                {/* Badge pill */}
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    background: theme.badgeBg,
                    border: `1px solid ${theme.badgeBorder}`,
                    color: theme.accentLight,
                  }}
                >
                  {cert.badge}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '6px',
                  }}
                >
                  {cert.title}
                </h3>

                {/* Issuer */}
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme.accent,
                    marginBottom: '16px',
                  }}
                >
                  {cert.issuer}
                </span>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.75,
                    borderTop: '1px dashed rgba(255,255,255,0.06)',
                    paddingTop: '14px',
                    margin: '14px 0 0 0',
                  }}
                >
                  {cert.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
