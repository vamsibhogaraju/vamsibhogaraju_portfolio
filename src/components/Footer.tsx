export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#040810', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <style>{`
        .footer-nav-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          color: #475569;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
        }
        .footer-nav-btn:hover { color: #f1f5f9; }
        .footer-ext-link {
          text-decoration: none;
          transition: color 0.2s;
          color: #475569;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
        }
        .footer-ext-link:hover { color: #f1f5f9; }
        .footer-container { padding: 48px 24px 32px; }
        @media (min-width: 768px) { .footer-container { padding: 48px 80px 32px; } }
        .footer-top { display: flex; flex-direction: column; gap: 32px; }
        @media (min-width: 768px) { .footer-top { flex-direction: row; align-items: flex-start; justify-content: space-between; } }
        .footer-bottom { display: flex; flex-direction: column; gap: 12px; }
        @media (min-width: 640px) { .footer-bottom { flex-direction: row; align-items: center; justify-content: space-between; } }
      `}</style>
      <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div className="footer-top">
          <div>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('home') }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                color: '#ffffff',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                marginBottom: '8px',
              }}
            >
              VB
              <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '1px', background: '#3b82f6', marginLeft: '2px' }} />
            </a>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                color: '#475569',
                margin: 0,
              }}
            >
              Data Analyst & Engineer. Turning complexity into clarity.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
            {['About', 'Projects', 'Experience', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="footer-nav-btn"
              >
                {link}
              </button>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
            <a
              href="https://www.linkedin.com/in/vamsi-bhogaraju-35462b16a/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ext-link"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/vamsibhogaraju"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ext-link"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '24px',
            marginTop: '32px',
          }}
        >
          <div className="footer-bottom">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#475569',
              }}
            >
              © 2025 Vamsi Bhogaraju. All rights reserved.
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#475569',
              }}
            >
              Built with React + Vite ♥
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
