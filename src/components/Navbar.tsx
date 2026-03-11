import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '../hooks/useActiveSection'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'publication', label: 'Publication' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
        background: 'rgba(8,13,20,0.6)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)',
        }}
      />

      {/* Left side: Logo + divider + Open to Work pill */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo('home') }}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            textDecoration: 'none',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: '20px',
          }}
        >
          VB
        </a>

        {/* Divider + Open to Work pill — desktop only */}
        <div
          className="nav-open-to-work"
          style={{ display: 'none', alignItems: 'center' }}
        >
          {/* Thin divider */}
          <div style={{
            width: '1px',
            height: '16px',
            background: 'rgba(255,255,255,0.15)',
            margin: '0 12px',
          }} />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '24px',
              padding: '0 10px',
              borderRadius: '9999px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              border: '1px solid rgba(16,185,129,0.3)',
              background: 'rgba(16,185,129,0.06)',
              color: '#10b981',
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
            Open to Work
          </span>
        </div>
        <style>{`@media (min-width: 1024px) { .nav-open-to-work { display: flex !important; } }`}</style>
      </div>

      {/* Center: Desktop nav links */}
      <div
        className="nav-desktop-links"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '32px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <style>{`
          @media (min-width: 1024px) { .nav-desktop-links { display: flex !important; } }
          .nav-link-btn:hover { color: rgba(241,245,249,1) !important; }
        `}</style>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="nav-link-btn"
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              paddingBottom: '4px',
              paddingTop: '12px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.01em',
              color: active === link.id ? '#f1f5f9' : 'rgba(148,163,184,0.7)',
              transition: 'color 0.15s',
            }}
            aria-current={active === link.id ? 'page' : undefined}
          >
            {active === link.id && (
              <motion.span
                layoutId="activeNav"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {link.label}
          </button>
        ))}
      </div>

      {/* Right side: Contact CTA — desktop only */}
      <div
        className="nav-right-cta"
        style={{
          display: 'none',
          alignItems: 'center',
          marginLeft: 'auto',
        }}
      >
        <style>{`
          @media (min-width: 1024px) { .nav-right-cta { display: flex !important; } }
          .nav-contact-btn:hover { background: #2563eb !important; transform: scale(1.02); }
        `}</style>
        <button
          onClick={() => scrollTo('contact')}
          className="nav-contact-btn"
          style={{
            height: '32px',
            padding: '0 16px',
            borderRadius: '8px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            transition: 'all 0.15s',
          }}
        >
          Contact
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-mobile-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        style={{
          display: 'flex',
          marginLeft: 'auto',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          width: '32px',
          height: '32px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <style>{`@media (min-width: 1024px) { .nav-mobile-hamburger { display: none !important; } }`}</style>
        <span style={{
          display: 'block', width: '20px', height: '1.5px', background: 'white',
          transition: 'all 0.3s', transformOrigin: 'center',
          transform: mobileOpen ? 'rotate(45deg) translate(0, 4.5px)' : 'none',
        }} />
        <span style={{
          display: 'block', width: '20px', height: '1.5px', background: 'white',
          transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1,
        }} />
        <span style={{
          display: 'block', width: '20px', height: '1.5px', background: 'white',
          transition: 'all 0.3s', transformOrigin: 'center',
          transform: mobileOpen ? 'rotate(-45deg) translate(0, -4.5px)' : 'none',
        }} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              top: '56px',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              background: 'rgba(8,13,20,0.97)',
              backdropFilter: 'blur(24px)',
            }}
            onClick={() => setMobileOpen(false)}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontFamily: "'DM Sans', sans-serif",
                  color: active === link.id ? '#3b82f6' : '#94a3b8',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
