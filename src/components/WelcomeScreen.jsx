import { motion } from 'framer-motion'
import { Sparkles, Gift, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import Sunflower from './Sunflower'
import Butterfly from './Butterfly'
import PetalFall from './PetalFall'
import { useAudio } from '../audio/AudioProvider'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

/** Chapter 1 — the welcome wish. */
export default function WelcomeScreen({ onNext }) {
  const { start } = useAudio()

  const handleOpen = () => {
    start() // begin the background song (user gesture — allowed by browsers)
    onNext()
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#FFFBEA] via-[#FFE98A] to-[#FFC93C]">
      {/* Radiant sun glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[62vh] w-[92vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,244,180,0.7)_38%,transparent_75%)] blur-2xl"
      />

      <PetalFall count={20} />
      <Butterfly size={46} top="18%" duration={17} delay={0.5} hue="amber" />
      <Butterfly size={34} top="34%" duration={23} delay={5} hue="rose" />
      <Butterfly size={26} top="12%" duration={27} delay={9.5} hue="white" />

      {/* Corner sunflowers */}
      <div aria-hidden="true" className="absolute -left-6 -top-4 opacity-90 sm:-left-2 sm:-top-2">
        <Sunflower size={92} sway stem={false} />
      </div>
      <div aria-hidden="true" className="absolute -right-8 top-8 rotate-12 opacity-90 sm:-right-4">
        <Sunflower size={76} swaySlow />
      </div>

      {/* Rising bottom sunflower bed */}
      <div aria-hidden="true" className="absolute -bottom-3 left-1/2 flex w-[130%] -translate-x-1/2 items-end justify-center gap-1 sm:gap-4">
        {[64, 88, 118, 150, 118, 88, 64].map((s, i) => (
          <Sunflower key={i} size={s} sway={i % 2 === 0} swaySlow={i % 2 !== 0} stem />
        ))}
      </div>

      {/* Sparkles */}
      {[
        { left: '12%', top: '26%', d: '0s', s: 22 },
        { left: '84%', top: '30%', d: '0.9s', s: 18 },
        { left: '22%', top: '48%', d: '1.4s', s: 15 },
        { left: '76%', top: '52%', d: '0.4s', s: 24 },
        { left: '50%', top: '14%', d: '1.8s', s: 17 },
      ].map((sp, i) => (
        <Sparkles
          key={i}
          aria-hidden="true"
          size={sp.s}
          className="sparkle-pulse absolute z-10 text-deep/80"
          style={{ left: sp.left, top: sp.top, animationDelay: sp.d }}
        />
      ))}

      {/* Center content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex h-full flex-col items-center justify-center px-5 pb-28 text-center sm:pb-36"
      >
        <motion.div
          variants={item}
          className="mb-3 flex items-center gap-2 rounded-full border border-deep/30 bg-white/55 px-4 py-1.5 shadow-sm backdrop-blur-sm sm:mb-5 sm:px-6 sm:py-2"
        >
          <span className="text-sm sm:text-base">🌻</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-deep sm:text-xs">
            Happy Birthday
          </span>
          <span className="text-sm sm:text-base">🌻</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-script text-5xl leading-[1.05] text-bark drop-shadow-[0_2px_0_rgba(255,255,255,0.7)] sm:text-7xl lg:text-8xl"
        >
          Happy Birthday
        </motion.h1>

        <motion.p
          variants={item}
          className="text-gradient-gold mt-1 font-display text-[26vw] font-black uppercase leading-none tracking-tight drop-shadow-[0_6px_18px_rgba(224,137,0,0.45)] min-[420px]:text-8xl sm:text-9xl"
        >
          Hashy
        </motion.p>

        <motion.p
          variants={item}
          className="font-sinhala mt-3 text-base font-semibold text-cocoa/90 sm:mt-5 sm:text-2xl"
        >
          ළමයෝ — ඔයාට සුබම සුබ උපන් දිනයක්! <span className="text-[#c2255c]">❤️</span>
        </motion.p>

        <motion.div variants={item} className="mt-5 sm:mt-8">
          <Button size="lg" onClick={handleOpen} aria-label="Open your birthday surprise">
            <Gift size={26} strokeWidth={2.2} />
            Open Your Surprise
          </Button>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-cocoa/60 sm:text-[11px]">
            🔊 Sound on for the full magic
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 text-cocoa/60 sm:bottom-24"
      >
        <ChevronDown size={22} className="animate-bounce" />
      </div>
    </div>
  )
}
