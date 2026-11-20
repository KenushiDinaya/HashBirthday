import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Cake, Mail, Sparkles, Wand2 } from 'lucide-react'
import { Button } from './ui/button'
import Sunflower from './Sunflower'
import Butterfly from './Butterfly'
import PetalFall from './PetalFall'
import { cn } from '../lib/utils'

const CANDLE_COLORS = [
  ['#FF8FA3', '#FFFDF4'],
  ['#F5A623', '#FFFDF4'],
  ['#7A9E3B', '#FFFDF4'],
  ['#B784F0', '#FFFDF4'],
  ['#FF8FA3', '#FFF3B0'],
]

const CONFETTI_COLORS = ['#FFD93D', '#FFC93C', '#F5A623', '#FFF3B0', '#FF8FA3', '#FFFFFF', '#FFE98A']

function burstAt(x, delay = 0) {
  window.setTimeout(() => {
    confetti({
      particleCount: 75,
      spread: 85,
      startVelocity: 46,
      origin: { x, y: 0.55 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    })
  }, delay)
}

function fireworksShow() {
  // Twin side cannons
  confetti({ particleCount: 90, angle: 60, spread: 75, origin: { x: 0, y: 0.7 }, colors: CONFETTI_COLORS, disableForReducedMotion: true })
  confetti({ particleCount: 90, angle: 120, spread: 75, origin: { x: 1, y: 0.7 }, colors: CONFETTI_COLORS, disableForReducedMotion: true })
  // Staggered sky bursts
  ;[0, 230, 460, 760, 1070, 1400].forEach((d) => burstAt(0.15 + Math.random() * 0.7, d))
  // Fountain for ~1.6s
  const end = Date.now() + 1600
  const iv = window.setInterval(() => {
    if (Date.now() > end) {
      window.clearInterval(iv)
      return
    }
    confetti({
      particleCount: 34,
      spread: 100,
      startVelocity: 58,
      origin: { x: 0.2 + Math.random() * 0.6, y: 0.78 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    })
  }, 210)
}

/** Chapter 2 — the birthday cake with candles to blow out + fireworks. */
export default function CakeScreen({ onNext }) {
  const [blown, setBlown] = useState(() => Array(5).fill(false))
  const [justBlown, setJustBlown] = useState(-1)
  const firedRef = useRef(false)
  const allBlown = blown.every(Boolean)

  const blowCandle = (i) => {
    setBlown((prev) => {
      if (prev[i]) return prev
      const next = [...prev]
      next[i] = true
      return next
    })
    setJustBlown(i)
    window.setTimeout(() => setJustBlown(-1), 900)
    confetti({
      particleCount: 16,
      spread: 65,
      startVelocity: 22,
      origin: { x: 0.32 + i * 0.09, y: 0.34 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    })
  }

  useEffect(() => {
    if (allBlown && !firedRef.current) {
      firedRef.current = true
      window.setTimeout(fireworksShow, 350)
    }
  }, [allBlown])

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF8E7] via-[#FFE9A8] to-[#F9C85C] px-4 pb-24 pt-4 sm:pb-28">
      <PetalFall count={12} roseChance={0.12} />
      <Butterfly size={40} top="16%" duration={20} delay={2} hue="amber" />
      <Butterfly size={30} top="38%" duration={26} delay={8} hue="white" />

      {/* Heading */}
      <header className="relative z-10 text-center">
        <p className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-deep sm:text-xs">
          <Cake size={15} strokeWidth={2.6} /> Chapter Two · The Cake <Cake size={15} strokeWidth={2.6} />
        </p>
        <h2 className="font-script mt-1 text-4xl text-bark drop-shadow-sm sm:text-6xl">Make a Wish,</h2>
        <p className="text-gradient-gold font-display text-5xl font-black uppercase leading-tight sm:text-7xl">Hashy</p>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa/65 sm:text-xs">
          Tap the candles to blow them out 🎂 | ඉටි පන්දම් අතින් නිවන්න ...
        </p>
      </header>

      {/* Cake */}
      <div className="relative z-10 mt-2 flex flex-col items-center sm:mt-4" aria-label="Birthday cake with five candles">
        {/* Candles */}
        <div className="z-10 flex h-20 items-end gap-3 sm:h-24 sm:gap-5">
          {CANDLE_COLORS.map(([a, b], i) => (
            <button
              key={i}
              onClick={() => blowCandle(i)}
              disabled={blown[i]}
              aria-label={blown[i] ? `Candle ${i + 1} blown out` : `Blow out candle ${i + 1}`}
              className="group flex cursor-pointer flex-col items-center outline-none transition-transform duration-150 enabled:hover:-translate-y-1 focus-visible:-translate-y-1 disabled:cursor-default"
            >
              {/* Flame / smoke */}
              <span className="relative flex h-6 w-5 items-end justify-center sm:h-7">
                {!blown[i] ? (
                  <span className="flame block h-5 w-3.5 sm:h-6 sm:w-4" />
                ) : (
                  <AnimatePresence>
                    {justBlown === i && (
                      <motion.span
                        initial={{ opacity: 0.9, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -22, scale: 1.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute bottom-0 text-sm blur-[1px]"
                      >
                        💨
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </span>
              {/* Candle body */}
              <span
                className="block w-3 rounded-t-sm rounded-b-none shadow-sm ring-1 ring-black/10 sm:w-4"
                style={{
                  height: i % 2 === 0 ? '2.6rem' : '3.3rem',
                  background: `repeating-linear-gradient(135deg, ${a} 0 7px, ${b} 7px 14px)`,
                }}
              />
              {/* Wick glow base */}
              <span className="h-1 w-3.5 rounded-full bg-black/15 sm:w-5" />
            </button>
          ))}
        </div>

        {/* Top tier */}
        <div className="flex w-40 flex-col items-center sm:w-56">
          <div className="icing-drip w-full" />
          <div className="flex h-12 w-full items-center justify-center rounded-b-xl border-x border-b border-deep/25 bg-gradient-to-b from-[#FFF3C9] via-butter to-[#F0B53F] sm:h-16">
            <span className="font-script text-lg text-cocoa/80 sm:text-2xl">Hashy</span>
          </div>
        </div>
        {/* Middle tier */}
        <div className="flex w-56 flex-col items-center sm:w-72">
          <div className="icing-drip w-full" />
          <div className="flex h-14 w-full items-center justify-between rounded-b-xl border-x border-b border-deep/25 bg-gradient-to-b from-[#FFD98A] via-honey to-[#D9831E] px-4 sm:h-[4.5rem] sm:px-6">
            <Sunflower size={26} />
            <span className="font-sinhala text-[10px] font-bold text-[#5C2E0A]/85 sm:text-xs">ළමයෝ · 🌻</span>
            <Sunflower size={26} />
          </div>
        </div>
        {/* Bottom tier */}
        <div className="flex w-72 flex-col items-center sm:w-96">
          <div className="icing-drip w-full" />
          <div className="flex h-16 w-full items-center justify-center gap-3 rounded-b-2xl border-x border-b border-deep/30 bg-gradient-to-b from-[#F5A623] via-[#DE8A1D] to-[#B96A0F] sm:h-20 sm:gap-6">
            {[0, 1, 2].map((i) => (
              <Sunflower key={i} size={i === 1 ? 44 : 32} />
            ))}
          </div>
        </div>
        {/* Plate */}
        <div className="h-3.5 w-80 rounded-[50%] bg-gradient-to-b from-[#FFFDF4] to-[#E7D9B8] shadow-[0_10px_24px_rgba(92,58,30,0.35)] ring-1 ring-cocoa/20 sm:h-5 sm:w-[28rem]" />
      </div>

      {/* Wish message / CTA */}
      <div className="relative z-10 mt-3 flex min-h-[4.5rem] flex-col items-center sm:mt-5">
        <AnimatePresence mode="wait">
          {allBlown ? (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 22, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              className="flex flex-col items-center"
            >
              {/* <p className="flex items-center gap-2 text-center font-script text-2xl text-bark sm:text-3xl">
                <Sparkles className="text-honey" size={22} /> Wish made, Hashy! <Sparkles className="text-honey" size={22} />
              </p>
              <p className="mt-0.5 max-w-xs text-center text-[11px] font-semibold leading-snug text-cocoa/85 sm:max-w-md sm:text-xs">
                May every dream in your heart bloom like a sunflower — tall, golden and always facing the light. 🌻
              </p> */}

              
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm" onClick={fireworksShow} className="h-9 text-[11px] sm:text-xs" aria-label="Launch fireworks again">
                  <Wand2 size={15} /> More Fireworks
                </Button>
                <Button size="sm" variant="cocoa" onClick={onNext} className="h-9 text-[11px] sm:text-xs">
                  Continue <Mail size={15} />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-cocoa/55"
            >
              {5 - blown.filter(Boolean).length} candles still glowing…
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
