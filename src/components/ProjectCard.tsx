import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isFeatured = !!project.featured

  const defaultBoxShadow = isFeatured
    ? 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 40px rgba(59,130,246,0.05), inset 3px 0 12px rgba(59,130,246,0.2), 0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)'
    : 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 40px rgba(59,130,246,0.03), 0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="project-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        background: isFeatured
          ? 'linear-gradient(145deg, #152040 0%, #0e1a2e 50%, #080d14 100%)'
          : 'linear-gradient(145deg, #131f38 0%, #0e1a2e 60%, #0a1525 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: isFeatured ? '3px solid #3b82f6' : undefined,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        gridColumn: isFeatured ? 'span 2' : undefined,
        boxShadow: defaultBoxShadow,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
        if (isFeatured) e.currentTarget.style.borderLeftColor = '#3b82f6'
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px rgba(59,130,246,0.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        if (isFeatured) e.currentTarget.style.borderLeftColor = '#3b82f6'
        e.currentTarget.style.boxShadow = defaultBoxShadow
      }}
    >
      {/* Accent bar */}
      <div style={{
        height: '3px',
        width: '100%',
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        boxShadow: isFeatured
          ? `0 0 20px rgba(59,130,246,0.5), 0 0 24px rgba(59,130,246,0.3)`
          : `0 0 12px ${project.accent}, 0 0 24px rgba(59,130,246,0.3)`,
      }} />

      <style>{`
        @media (max-width: 1023px) { .project-card { grid-column: span 1 !important; } }
        @media (max-width: 767px) { .project-card-body { padding: 20px !important; } }
      `}</style>

      {/* Body */}
      <div className="project-card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px' }}>
        <span
          style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#3b82f6',
            marginBottom: '8px',
            background: 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(59,130,246,0.15)',
            borderRadius: '4px',
            padding: '3px 10px',
          }}
        >
          {project.type}
        </span>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: isFeatured ? 'clamp(20px, 3.5vw, 26px)' : 'clamp(18px, 3vw, 22px)',
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: '16px',
            textShadow: '0 0 40px rgba(59,130,246,0.15)',
          }}
        >
          {project.title}
        </h3>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {project.bullets.map((b, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                color: '#94a3b8',
                lineHeight: 1.8,
              }}
            >
              <span style={{ color: '#3b82f6' }}>→ </span>
              <span style={{ paddingLeft: '4px' }}>{b}</span>
            </p>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '20px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="project-tag"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: '#64748b',
                transition: 'all 0.2s',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {project.github && (
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '16px', marginTop: '16px' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-github-link"
              style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#475569',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              View on GitHub →
            </a>
          </div>
        )}
      </div>
      <style>{`
        .project-tag:hover {
          background: rgba(59,130,246,0.08) !important;
          border-color: rgba(59,130,246,0.25) !important;
          color: #60a5fa !important;
        }
        .project-github-link:hover {
          color: #60a5fa !important;
          transform: translateX(3px);
        }
      `}</style>
    </motion.div>
  )
}
