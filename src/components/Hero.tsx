import { motion } from 'framer-motion'
import CircuitBoard from './CircuitBoard'
import { heroContainer, heroItem } from '../utils/animations'

const techPills = ['Python', 'SQL', 'Azure Databricks', 'Power BI', 'PySpark']

export default function Hero() {
  return (
    <section
      id="home"
      className="relative hero-grain"
      style={{
        background: 'var(--bg-primary)',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Background layers */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 800px 600px at 80% 20%, rgba(59,130,246,0.07), transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 600px 500px at 10% 90%, rgba(99,102,241,0.05), transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Circuit board — absolute positioned right half, behind content */}
      <div
        className="hero-circuit-wrap"
        style={{ display: 'none' }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .hero-circuit-wrap {
              display: block !important;
              position: absolute;
              top: 0;
              right: 0;
              width: 50%;
              height: 100%;
              z-index: 0;
              overflow: hidden;
            }
          }
        `}</style>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.0 }}
          style={{ width: '100%', height: '100%' }}
        >
          <CircuitBoard />
        </motion.div>
        {/* Top fade — hides circuit under navbar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(8,13,20,0.95) 0%, rgba(8,13,20,0.3) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
        {/* Left fade — separates circuit from text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '35%',
          background: 'linear-gradient(to right, rgba(8,13,20,1) 0%, rgba(8,13,20,0.4) 40%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      </div>

      {/* Main content — z-index above circuit */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '80px 24px 0',
        }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .hero-left-col { max-width: 52vw !important; padding: 0 80px !important; }
          }
        `}</style>

        <div className="hero-left-col" style={{ maxWidth: '100%' }}>
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            {/* Status badge */}
            <motion.div variants={heroItem} style={{ marginBottom: '24px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: '#10b981',
                  border: '1px solid rgba(16,185,129,0.3)',
                  background: 'rgba(16,185,129,0.06)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10b981',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                    display: 'inline-block',
                  }}
                />
                Available for hire · Data Analyst & Engineer
              </span>
            </motion.div>

            {/* Name — HEADLINE */}
            <motion.div variants={heroItem} style={{ marginBottom: '8px' }}>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(52px, 6.5vw, 80px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                  color: '#f1f5f9',
                  margin: 0,
                }}
              >
                Vamsi Bhogaraju
              </h1>
            </motion.div>

            {/* Tagline Line 1 — subtitle */}
            <motion.div variants={heroItem}>
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'rgba(241,245,249,0.5)',
                  margin: 0,
                }}
              >
                Turning Data
              </p>
            </motion.div>

            {/* Tagline Line 2 */}
            <motion.div variants={heroItem}>
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#3b82f6',
                  margin: 0,
                  marginBottom: '24px',
                }}
              >
                Into Decisions
              </p>
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={heroItem}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(15px, 2.5vw, 18px)',
                color: '#94a3b8',
                lineHeight: 1.65,
                maxWidth: '480px',
                marginBottom: '32px',
              }}
            >
              I build data pipelines that don't break, dashboards that make sense, and systems that
              scale. From raw ingestion to business insight.
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={heroItem} style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', marginBottom: '32px' }}>
              {techPills.map((pill) => (
                <span
                  key={pill}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#94a3b8',
                  }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={heroItem} style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '16px' }}>
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
                  boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
                  transition: 'all 0.2s',
                }}
              >
                View My Work
              </a>
              <a
                href="/Vamsi_Bhogaraju_Resume.pdf"
                download="Vamsi_Bhogaraju_Resume.pdf"
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
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1L8 8L15 1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#475569' }}>
          scroll to explore
        </span>
      </motion.div>
    </section>
  )
}
