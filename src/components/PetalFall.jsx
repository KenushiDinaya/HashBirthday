import { useMemo } from 'react'
import { cn } from '../lib/utils'

/** A gentle shower of drifting sunflower petals (and a few rose petals). */
export default function PetalFall({ count = 18, roseChance = 0.22 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 13,
        dur: 9 + Math.random() * 8,
        delay: -Math.random() * 14,
        drift: (Math.random() - 0.5) * 26,
        rose: Math.random() < roseChance,
      })),
    [count, roseChance]
  )
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className={cn('petal', p.rose && 'petal-rose')}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.72}px`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}vw`,
          }}
        />
      ))}
    </div>
  )
}
