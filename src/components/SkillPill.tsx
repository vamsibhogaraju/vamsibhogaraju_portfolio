interface SkillPillProps {
  label: string
  variant?: 'primary' | 'secondary'
}

export default function SkillPill({ label, variant = 'secondary' }: SkillPillProps) {
  const isPrimary = variant === 'primary'

  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        padding: '5px 14px',
        borderRadius: '4px',
        background: isPrimary ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.04)',
        border: isPrimary
          ? '1px solid rgba(59,130,246,0.3)'
          : '1px solid rgba(255,255,255,0.08)',
        color: isPrimary ? '#60a5fa' : '#94a3b8',
        fontWeight: isPrimary ? 500 : 400,
      }}
    >
      {label}
    </span>
  )
}
