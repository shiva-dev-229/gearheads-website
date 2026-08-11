const STATS = [
  { value: '1,000+', label: 'Students reached / year' },
  { value: '31+', label: 'FIRST teams supported' },
  { value: '28+', label: 'Events per year' },
  { value: '3×', label: 'World Championship' },
] as const

export default function ImpactStats() {
  return (
    <section>
      <div>
        {STATS.map((s) => (
          <div key={s.label}>
            <div>{s.value}</div>
            <div>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
