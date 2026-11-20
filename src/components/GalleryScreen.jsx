import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react'
import Sunflower from './Sunflower'
import PetalFall from './PetalFall'
import { MEMORIES, FLOATING_MEMORIES } from '../data/memories'
import { cn } from '../lib/utils'

/* Fixed collage slots for the drifting polaroids (desktop) */
const SLOTS = [
  { left: '1%', top: '10%', rotate: -11, size: 'w-24 xl:w-28', delay: 0, dur: 6.1 },
  { left: '13%', top: '46%', rotate: 6, size: 'w-20 xl:w-24', delay: 1.1, dur: 7.2 },
  { left: '28%', top: '8%', rotate: -4, size: 'w-24 xl:w-32', delay: 0.5, dur: 6.6 },
  { left: '44%', top: '52%', rotate: 9, size: 'w-20 xl:w-24', delay: 1.9, dur: 7.6 },
  { left: '58%', top: '10%', rotate: -8, size: 'w-24 xl:w-28', delay: 0.8, dur: 6.3 },
  { left: '72%', top: '48%', rotate: 5, size: 'w-20 xl:w-24', delay: 1.5, dur: 7.0 },
  { left: '84%', top: '12%', rotate: 12, size: 'w-16 xl:w-20', delay: 0.2, dur: 5.7 },
  { left: '37%', top: '30%', rotate: -13, size: 'w-16 xl:w-20', delay: 2.3, dur: 8.1 },
]

const TILTS = [-4, 3, -2, 4, -3, 2, -4.5, 3.5, -1.5]

/** Chapter 4 — an animated gallery of memories. */
export default function GalleryScreen() {
  const [lightbox, setLightbox] = useState(null) // index | null
  const total = MEMORIES.length

  const step = useCallback(
    (dir) => setLightbox((i) => (i === null ? i : (i + dir + total) % total)),
    [total]
  )

  useEffect(() => {
    if (lightbox === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, step])

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#FFF8E7] via-[#FFEFB8] to-[#FCD267]">
      <PetalFall count={9} />
      {/* Giant watermark sunflower */}
      <Sunflower
        aria-hidden="true"
        size={340}
        className="pointer-events-none absolute -bottom-24 -right-24 rotate-12 opacity-[0.16]"
      />

      <div className="thin-scroll relative z-10 h-full overflow-y-auto px-3 pb-28 pt-4 sm:px-6 sm:pt-6">
        {/* Header */}
        <header className="text-center">
          <p className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-deep sm:text-xs">
            <Camera size={14} strokeWidth={2.6} /> Chapter Four · Your Memories <Camera size={14} strokeWidth={2.6} />
          </p>
          <h2 className="font-script mt-1 text-4xl text-bark sm:text-6xl">Sunflower Memories</h2>
          <p className="mt-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cocoa/65 sm:text-[11px]">
            <Sparkles size={12} className="text-honey" /> 25 Pieces Of My Heart — Tap Any Photo <Sparkles size={12} className="text-honey" />
          </p>
        </header>

        {/* Drifting polaroids (desktop & tablet) */}
        <div aria-hidden="true" className="relative mx-auto hidden h-44 max-w-6xl md:block lg:h-48">
          {FLOATING_MEMORIES.map((mem, i) => {
            const slot = SLOTS[i % SLOTS.length]
            const memory = MEMORIES.find((m) => m.src === mem.src)
            return (
              <motion.div
                key={mem.src}
                className={cn(
                  'absolute rounded-md border border-black/10 bg-white p-1.5 pb-5 shadow-polaroid',
                  slot.size
                )}
                style={{ left: slot.left, top: slot.top }}
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: [0, -17, 0, -9, 0],
                  rotate: [slot.rotate - 2.5, slot.rotate + 2.5, slot.rotate - 2.5],
                }}
                transition={{
                  opacity: { delay: 0.15 * i, duration: 0.7 },
                  y: { duration: slot.dur, repeat: Infinity, ease: 'easeInOut', delay: slot.delay },
                  rotate: { duration: slot.dur, repeat: Infinity, ease: 'easeInOut', delay: slot.delay },
                }}
              >
                <img
                  src={mem.src}
                  alt={memory?.caption ?? 'memory'}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[3/4] w-full select-none rounded-[3px] object-cover"
                />
              </motion.div>
            )
          })}
        </div>

        {/* Photo grid */}
        <div className="mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-3 min-[480px]:grid-cols-3 sm:gap-4 md:mt-1 lg:grid-cols-4 xl:grid-cols-5">
          {MEMORIES.map((memory, i) => (
            <motion.button
              key={memory.src}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.9), duration: 0.55, ease: 'easeOut' }}
              whileHover={{ rotate: 0, scale: 1.055, y: -7, zIndex: 30 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Open photo ${i + 1}: ${memory.caption}`}
              className="group relative z-0 rounded-md border border-black/10 bg-white p-1.5 pb-6 shadow-polaroid outline-none transition-shadow hover:shadow-glow focus-visible:ring-2 focus-visible:ring-honey sm:pb-7"
              style={{ rotate: TILTS[i % TILTS.length] }}
            >
              {/* Tape */}
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-2 rounded-[2px] bg-butter/85 shadow-sm"
              />
              <img
                src={memory.src}
                alt={memory.caption}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="aspect-[3/4] w-full select-none rounded-[3px] object-cover"
              />
              <span className="pointer-events-none absolute bottom-1 left-0 right-0 truncate px-1 text-center text-[9px] font-extrabold uppercase tracking-wider text-cocoa/75 sm:bottom-1.5 sm:text-[10px]">
                {memory.caption}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#160c05]/88 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={MEMORIES[lightbox].caption}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-white/10 p-2.5 text-cream transition hover:bg-white/25 sm:right-6 sm:top-6"
            >
              <X size={22} />
            </button>
            {/* Counter */}
            <p className="absolute left-3 top-4 z-10 rounded-full border border-white/15 bg-black/45 px-4 py-1.5 font-mono text-xs tracking-widest text-butter sm:left-6 sm:top-7">
              {String(lightbox + 1).padStart(2, '0')} / {total}
            </p>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              aria-label="Previous photo"
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-cream transition hover:bg-white/25 sm:left-5 sm:p-3"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1) }}
              aria-label="Next photo"
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-cream transition hover:bg-white/25 sm:right-5 sm:p-3"
            >
              <ChevronRight size={26} />
            </button>

            {/* Photo */}
            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.82, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="flex max-h-full max-w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={MEMORIES[lightbox].src}
                alt={MEMORIES[lightbox].caption}
                decoding="async"
                draggable={false}
                className="max-h-[70vh] max-w-[88vw] select-none rounded-xl border-[6px] border-white object-contain shadow-2xl sm:max-h-[76vh]"
              />
              <figcaption className="font-script mt-3 text-center text-2xl text-butter sm:text-3xl">
                {MEMORIES[lightbox].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
