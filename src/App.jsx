import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import CakeScreen from './components/CakeScreen'
import LetterScreen from './components/LetterScreen'
import GalleryScreen from './components/GalleryScreen'
import FinalScreen from './components/FinalScreen'
import ChapterNav from './components/ChapterNav'
import AudioControl from './components/AudioControl'

const TOTAL = 5

const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? '100vw' : '-100vw', opacity: 0.55, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir >= 0 ? '-100vw' : '100vw', opacity: 0.55, scale: 0.97 }),
}

export default function App() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const goTo = useCallback(
    (i) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, i))
      setDir(clamped >= index ? 1 : -1)
      setIndex(clamped)
    },
    [index]
  )
  const next = useCallback(() => {
    if (index === TOTAL - 1) {
      setDir(-1)
      setIndex(0) // replay from the beginning
    } else {
      setDir(1)
      setIndex((i) => i + 1)
    }
  }, [index])
  const prev = useCallback(() => {
    setDir(-1)
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-cream">
      {/* Top progress hairline */}
      <div className="pointer-events-none absolute left-0 top-0 z-50 h-[3px] w-full bg-cocoa/10">
        <div
          className="h-full bg-gradient-to-r from-honey via-sunflower to-butter transition-all duration-700 ease-out"
          style={{ width: `${(index / (TOTAL - 1)) * 100}%` }}
        />
      </div>

      {/* Chapter slides */}
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.main
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.62, ease: [0.32, 0.72, 0, 1] }}
          className="h-full w-full"
        >
          {index === 0 && <WelcomeScreen onNext={next} />}
          {index === 1 && <CakeScreen onNext={next} />}
          {index === 2 && <LetterScreen onNext={next} />}
          {index === 3 && <GalleryScreen />}
          {index === 4 && <FinalScreen onReplay={() => { setDir(-1); setIndex(0) }} />}
        </motion.main>
      </AnimatePresence>

      <ChapterNav
        index={index}
        total={TOTAL}
        onPrev={prev}
        onNext={next}
        onGoto={goTo}
        lastLabel="Replay"
      />
      <AudioControl />
    </div>
  )
}
