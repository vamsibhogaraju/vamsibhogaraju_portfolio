interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <span
      className="inline-block mb-4 text-[11px] tracking-[0.14em] uppercase"
      style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent-bright)' }}
    >
      // {number} — {label}
    </span>
  )
}
