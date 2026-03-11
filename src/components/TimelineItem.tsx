import type { ExperienceItem } from '../data/experience'

interface TimelineItemProps {
  item: ExperienceItem
  side: 'left' | 'right'
}

export default function TimelineItem({ item, side }: TimelineItemProps) {
  const isLeft = side === 'left'

  return (
    <>
      <style>{`
        .tl-mobile-accent { border-left: 3px solid rgba(59,130,246,0.4); }
        .tl-dot, .tl-connector { display: none; }
        @media (min-width: 1024px) {
          .tl-item-left {
            display: flex;
            justify-content: flex-end;
            padding-right: calc(50% + 40px);
            padding-left: 0;
          }
          .tl-item-right {
            display: flex;
            justify-content: flex-start;
            padding-left: calc(50% + 40px);
            padding-right: 0;
          }
          .tl-dot { display: block !important; }
          .tl-connector { display: block !important; }
          .tl-mobile-accent { border-left: none !important; }
        }
      `}</style>
      <div
        className={`timeline-item ${isLeft ? 'tl-item-left' : 'tl-item-right'}`}
        style={{
          position: 'relative',
          marginBottom: '48px',
        }}
      >
        {/* Timeline dot */}
        <div
          className="tl-dot"
          style={{
            display: 'none',
            position: 'absolute',
            left: '50%',
            top: '24px',
            transform: 'translateX(-50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#3b82f6',
            border: '2px solid #080d14',
            zIndex: 10,
            boxShadow: '0 0 0 4px rgba(59,130,246,0.2), 0 0 20px rgba(59,130,246,0.4)',
          }}
        />

        {/* Connector line */}
        <div
          className="tl-connector"
          style={{
            display: 'none',
            position: 'absolute',
            top: '30px',
            height: '2px',
            width: '40px',
            background: 'rgba(59,130,246,0.3)',
            ...(isLeft
              ? { left: '50%', marginLeft: '7px' }
              : { right: '50%', marginRight: '7px' }),
          }}
        />

        {/* Card */}
        <div
          className="tl-mobile-accent"
          style={{
            maxWidth: '400px',
            width: '100%',
            borderRadius: '12px',
            padding: '28px 32px',
            background: 'linear-gradient(145deg, #131f38, #0e1a2e)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderTop: '2px solid rgba(59,130,246,0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'
            e.currentTarget.style.borderTopColor = 'rgba(59,130,246,0.5)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.borderTopColor = 'rgba(59,130,246,0.4)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
            {item.role}
          </h3>
          <span style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#3b82f6', marginTop: '4px' }}>
            {item.company}
          </span>
          <span style={{
            display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#475569',
            marginTop: '8px', marginBottom: '20px', paddingBottom: '16px',
            borderBottom: '1px dashed rgba(255,255,255,0.06)',
          }}>
            {item.date}  ·  {item.location}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {item.bullets.map((b, i) => (
              <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#94a3b8', lineHeight: 1.8 }}>
                <span style={{ color: '#3b82f6', fontWeight: 500 }}>→ </span>{b}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
