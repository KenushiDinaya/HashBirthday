import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import Sunflower from './Sunflower'
import Butterfly from './Butterfly'

/* The closing words — exactly as written for Hashy 💛 */
const FINAL_PARAGRAPHS = [
  'සමහර වෙලාවට මගෙන් ඔයාට ලොකු ආදරයක් නොදැනෙන්න ඇති. මං හැමවෙලේම ඒක වචන වලින් නොකියා, පෙන්නන්නේ නැතුව ඉන්න නිසා, එහෙමත් නැත්නම් මගේ වැඩ එක්ක මං ටිකක් නිහඬ වෙන නිසා, ඔයාට එහෙම හිතෙනවා ඇති.',
  'ඒත් ඇත්තම කතාව ඒක නෙවෙයි. මගේ හිතේ තියෙන ආදරේ කවදාවත් අඩු වෙන්නේ නෑ. මං පෙන්නුවත් නැතත්, කිව්වත් නැතත්, ඔයා වෙනුවෙන් මගේ හිතේ තියෙන ඒ හැඟීම හැමදාමත් එහෙමමයි... සමහරවිට ඊටත් වඩා ගැඹුරුයි.',
  'ඔයාට ඒක නොදැනුනත්, මගේ ආදරේ කවදාවත් වෙනස් වෙන්නේ නෑ, අඩු වෙන්නෙත් නෑ. Love You Forever . ❤️',
]

/** Chapter 5 — the heart-touching finale under a starry sky. */
export default function FinalScreen({ onReplay }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 58,
        size: 1 + Math.random() * 2.4,
        dur: 2 + Math.random() * 3.4,
        delay: Math.random() * 3,
      })),
    []
  )
  const hearts = useMemo(
    () =>
      Array.from({ length: 13 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 13 + Math.random() * 17,
        dur: 7.5 + Math.random() * 6,
        delay: Math.random() * 8,
        rx: (Math.random() - 0.5) * 16,
        tone: i % 3,
      })),
    []
  )

  return (
    <div className="relative h-full w-full overflow-hidden bg-night-cocoa">
      {/* Stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          className="star-twinkle absolute rounded-full bg-[#FFF6D8]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          }}
        />
      ))}

      {/* Rising hearts */}
      {hearts.map((h) => (
        <Heart
          key={h.id}
          aria-hidden="true"
          className="rise-heart"
          fill={h.tone === 0 ? '#FF8FA3' : h.tone === 1 ? '#FFC93C' : '#FF5D7E'}
          strokeWidth={0}
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            opacity: 0.9,
            '--dur': `${h.dur}s`,
            '--delay': `${h.delay}s`,
            '--rx': `${h.rx}vw`,
          }}
        />
      ))}

      {/* Warm glow behind the heart */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[46vh] w-[88vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,110,140,0.32)_0%,rgba(255,201,60,0.14)_45%,transparent_72%)] blur-3xl"
      />

      <Butterfly size={40} top="22%" duration={24} delay={3} hue="amber" />
      <Butterfly size={30} top="58%" duration={28} delay={9} hue="rose" />

      {/* Bottom sunflowers */}
      <div aria-hidden="true" className="absolute bottom-2 left-2 opacity-90 sm:bottom-4 sm:left-8">
        <Sunflower size={84} sway stem />
      </div>
      <div aria-hidden="true" className="absolute bottom-2 right-2 rotate-6 opacity-90 sm:bottom-4 sm:right-8">
        <Sunflower size={108} swaySlow stem />
      </div>

      {/* Content */}
      <div className="thin-scroll relative z-10 flex h-full w-full flex-col items-center justify-center overflow-y-auto px-4 pb-24 pt-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.36em] text-butter/80 sm:text-[11px]"
        >
          <Sparkles size={13} /> Chapter Five · Forever <Sparkles size={13} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="font-sinhala mt-1 text-sm font-medium text-[#FFE3B0]/90 sm:text-lg"
        >
          හැමදාමත්…
        </motion.p>

        {/* Beating heart */}
        <div className="animate-heartbeat mt-1 sm:mt-2">
          <svg
            viewBox="0 0 100 100"
            className="h-32 w-32 drop-shadow-[0_0_45px_rgba(255,80,120,0.55)] min-[420px]:h-36 min-[420px]:w-36 sm:h-48 sm:w-48"
            role="img"
            aria-label="A beating heart"
          >
            <defs>
              <radialGradient id="heartGrad" cx="38%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#FFD3DC" />
                <stop offset="22%" stopColor="#FF8FA3" />
                <stop offset="60%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#B91C3C" />
              </radialGradient>
            </defs>
            <path
              d="M50 88 C 22 66, 6 46, 6 28 C 6 12, 19 4, 31 4 C 40 4, 47 9, 50 17 C 53 9, 60 4, 69 4 C 81 4, 94 12, 94 28 C 94 46, 78 66, 50 88 Z"
              fill="url(#heartGrad)"
              stroke="#7F1D35"
              strokeWidth="1.6"
            />
            <ellipse cx="32" cy="24" rx="8.5" ry="5.2" fill="#FFFFFF" opacity="0.5" transform="rotate(-24 32 24)" />
          </svg>
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 160, damping: 15 }}
          className="text-gradient-gold font-script -mt-2 text-5xl leading-tight sm:text-7xl"
        >
          Love You Forever
        </motion.h1>
        <p className="font-display mt-0.5 text-[10px] font-bold uppercase tracking-[0.4em] text-butter/70 sm:text-xs">
          මේක මගෙ එකම වගේම අන්තිම ලියුම වේවී ළමයෝ <span className="text-[#FF8FA3]">❤</span>
        </p>

        {/* Final words */}
        <div className="mt-3 w-full max-w-xl space-y-2 sm:mt-5 sm:space-y-3">
          {FINAL_PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.22, duration: 0.8 }}
              className="font-sinhala text-[11.5px] font-medium leading-6 text-[#FDE9C8]/95 sm:text-sm sm:leading-7"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Replay */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }} className="mt-4 sm:mt-6">
          <Button variant="outline" size="lg" onClick={onReplay} aria-label="Experience the story again">
            <RotateCcw size={22} /> Relive the Magic
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
