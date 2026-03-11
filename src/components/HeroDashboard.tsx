import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const lineData = [
  { m: 'Jan', v: 12000 },
  { m: 'Feb', v: 28000 },
  { m: 'Mar', v: 45000 },
  { m: 'Apr', v: 67000 },
  { m: 'May', v: 89000 },
  { m: 'Jun', v: 124000 },
  { m: 'Jul', v: 158000 },
  { m: 'Aug', v: 180000 },
]

const barData = [
  { name: 'ETL', value: 96 },
  { name: 'SQL', value: 94 },
  { name: 'Azure', value: 91 },
  { name: 'BI', value: 95 },
]

const metrics = [
  { label: 'Records', value: '180K+', color: '#f1f5f9' },
  { label: 'Accuracy', value: '97.3%', color: '#10b981' },
  { label: 'Time Saved', value: '80%', color: '#3b82f6' },
]

export default function HeroDashboard() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '16px',
        padding: '28px',
        width: '100%',
        background: 'rgba(13,21,38,0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 0 80px rgba(59,130,246,0.12), 0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Window chrome bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#475569' }}>
          pipeline_metrics.db
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#10b981' }}>
            LIVE
          </span>
        </span>
      </div>

      {/* Line chart */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#475569' }}>
          Records Processed · Last 8 Months
        </span>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={lineData}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#areaGrad)"
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              borderRadius: '8px',
              padding: '14px',
              textAlign: 'center' as const,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: m.color }}>
              {m.value}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#475569', marginTop: '4px' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#475569' }}>
          Pipeline Health Score
        </span>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={barData} layout="vertical" barSize={6}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="name"
              width={40}
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="value"
              fill="url(#barGrad)"
              radius={[0, 3, 3, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Terminal footer */}
      <div
        style={{
          borderRadius: '8px',
          padding: '12px 16px',
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#10b981' }}>
          {'>'} pipeline.run() completed in 1.2s ✓
          <span
            style={{
              display: 'inline-block',
              width: '1px',
              height: '14px',
              background: '#10b981',
              marginLeft: '4px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </span>
      </div>
    </div>
  )
}
