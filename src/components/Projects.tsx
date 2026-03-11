import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import ProjectCard from './ProjectCard'
import { projects, projectCategories } from '../data/projects'
import { scrollTriggerDefaults } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const headerRef = useRef<HTMLDivElement>(null)

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, ...scrollTriggerDefaults },
      }
    )
  }, [])

  return (
    <section id="projects" className="projects-section" style={{ background: '#080d14', padding: '120px 0' }}>
      <style>{`@media (max-width: 767px) { .projects-section { padding: 60px 0 !important; } }`}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '48px' }}>
          <SectionLabel number="05" label="PROJECTS" />
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 48px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#f1f5f9',
              marginTop: '12px',
              marginBottom: '16px',
            }}
          >
            Things I've Built
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '17px',
              color: '#94a3b8',
            }}
          >
            End-to-end pipelines, analytical systems, and ML research.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={activeFilter === cat ? '' : 'filter-tab-inactive'}
              style={{
                padding: '7px 18px',
                borderRadius: '6px',
                border: activeFilter === cat ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                background: activeFilter === cat ? '#3b82f6' : 'transparent',
                color: activeFilter === cat ? 'white' : '#64748b',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          <style>{`
            @media (min-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            .filter-tab-inactive:hover { border-color: rgba(59,130,246,0.3) !important; color: #94a3b8 !important; }
          `}</style>
          <motion.div className="projects-grid" layout style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', alignItems: 'stretch' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
