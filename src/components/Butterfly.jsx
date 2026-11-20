import { motion } from 'framer-motion'

const PALETTES = {
  amber: { a: '#FFC93C', b: '#F5A623', edge: '#7A4A12', body: '#5C3A1E' },
  rose: { a: '#FFB3C1', b: '#FF8FA3', edge: '#B4535F', body: '#6E2A35' },
  white: { a: '#FFFDF4', b: '#FFE9A8', edge: '#C9A227', body: '#7A5B12' },
}

/**
 * An animated butterfly that flutters across the screen forever.
 * Place inside a `relative overflow-hidden` container.
 */
export default function Butterfly({ size = 44, delay = 0, duration = 19, top = '24%', hue = 'amber' }) {
  const p = PALETTES[hue] ?? PALETTES.amber
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-20"
      style={{ top }}
      initial={{ x: '-14vw', opacity: 0 }}
      animate={{
        x: ['-14vw', '14vw', '42vw', '71vw', '114vw'],
        y: [0, -46, 26, -34, -6],
        rotate: [0, 9, -7, 10, 2],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.22, 0.5, 0.78, 1],
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64">
        <g className="wing-left">
          <path d="M31 28 C 22 8, 3 9, 5 26 C 6.5 38, 18 43, 30 36 Z" fill={p.a} stroke={p.edge} strokeWidth="1.5" />
          <circle cx="14" cy="23" r="2.4" fill={p.b} opacity="0.85" />
          <circle cx="20" cy="31" r="1.6" fill={p.b} opacity="0.85" />
        </g>
        <g className="wing-right">
          <path d="M33 28 C 42 8, 61 9, 59 26 C 57.5 38, 46 43, 34 36 Z" fill={p.a} stroke={p.edge} strokeWidth="1.5" />
          <circle cx="50" cy="23" r="2.4" fill={p.b} opacity="0.85" />
          <circle cx="44" cy="31" r="1.6" fill={p.b} opacity="0.85" />
        </g>
        <ellipse cx="32" cy="34" rx="2.5" ry="8.5" fill={p.body} />
        <circle cx="32" cy="24" r="2.6" fill={p.body} />
        <path d="M30.5 22 C 27 15, 22 13, 18 14" stroke={p.body} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M33.5 22 C 37 15, 42 13, 46 14" stroke={p.body} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="18" cy="14" r="1.2" fill={p.body} />
        <circle cx="46" cy="14" r="1.2" fill={p.body} />
      </svg>
    </motion.div>
  )
}
