import { cn } from '../lib/utils'

/**
 * Pure-SVG sunflower with swaying animation support.
 * size — px width/height. stem — draw stem + leaves. sway — gentle rotate animation.
 */
export default function Sunflower({ size = 110, className, sway = false, swaySlow = false, stem = false }) {
  const petals = Array.from({ length: 13 })
  const dots = Array.from({ length: 8 })
  return (
    <svg
      viewBox={stem ? '0 0 100 130' : '0 0 100 100'}
      width={size}
      height={stem ? (size * 1.3) | 0 : size}
      className={cn(
        'drop-shadow-[0_6px_14px_rgba(224,137,0,0.35)]',
        sway && 'animate-sway',
        swaySlow && 'animate-sway-slow',
        className
      )}
      aria-hidden="true"
    >
      {stem && (
        <g stroke="#5c7a2e" strokeWidth="4" strokeLinecap="round" fill="#7a9e3b">
          <path d="M50 62 C 48 82, 53 102, 50 128" fill="none" />
          <path d="M50 96 C 38 92, 30 100, 26 112 C 40 112, 48 106, 50 96 Z" stroke="#4a6123" strokeWidth="2" />
          <path d="M50 78 C 62 74, 70 82, 74 94 C 60 94, 52 88, 50 78 Z" stroke="#4a6123" strokeWidth="2" />
        </g>
      )}
      <g transform="translate(50 46)">
        {petals.map((_, i) => (
          <ellipse
            key={i}
            rx="8"
            ry="17.5"
            transform={`rotate(${(i * 360) / 13}) translate(0 -21.5)`}
            fill={i % 2 === 0 ? '#FFD93D' : '#FFC93C'}
            stroke="#E08900"
            strokeWidth="0.9"
          />
        ))}
        {petals.map((_, i) => (
          <ellipse
            key={`in-${i}`}
            rx="5.4"
            ry="11"
            transform={`rotate(${(i * 360) / 13 + 13.8}) translate(0 -15.5)`}
            fill="#F5A623"
            opacity="0.9"
          />
        ))}
        <circle r="13.2" fill="#6B4226" stroke="#3E2A14" strokeWidth="1.4" />
        <circle r="8.6" fill="#3E2A14" />
        {dots.map((_, i) => {
          const a = (i * Math.PI * 2) / 8
          return <circle key={`d-${i}`} cx={Math.cos(a) * 5.4} cy={Math.sin(a) * 5.4} r="0.95" fill="#9c6a33" />
        })}
        <circle r="1.15" fill="#9c6a33" />
      </g>
    </svg>
  )
}
