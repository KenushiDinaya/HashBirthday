import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX, X, FileAudio } from 'lucide-react'
import { useAudio } from '../audio/AudioProvider'
import { Slider } from './ui/slider'
import { cn } from '../lib/utils'

/**
 * Floating background-music control (bottom-right).
 * FAD button expands into a little player card:
 * play/pause · mute · volume slider · song label.
 */
export default function AudioControl() {
  const { playing, muted, volume, setVolume, toggleMute, toggle, error } = useAudio()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* Expanded player card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="w-64 rounded-3xl border border-cocoa/15 bg-paper/95 p-4 shadow-paper backdrop-blur-md sm:w-72"
            role="dialog"
            aria-label="Background music player"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-butter to-honey text-bark shadow-inner">
                  <FileAudio size={22} strokeWidth={2.2} />
                </div>
                <div className="leading-tight">
                  <p className="font-display text-sm font-bold text-cocoa">For Hashy 💛</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cocoa/55">
                    song.mp3 · our song
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close player"
                className="rounded-full p-1 text-cocoa/50 transition hover:bg-cocoa/10 hover:text-cocoa"
              >
                <X size={16} />
              </button>
            </div>

            {/* Equaliser + controls */}
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={toggle}
                aria-label={playing ? 'Pause music' : 'Play music'}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-butter to-honey text-bark shadow-[0_3px_0_#c67a00] transition active:translate-y-0.5 active:shadow-none"
              >
                {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
              </button>

              {/* Live equaliser bars (purely decorative) */}
              <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
                {[0.5, 0.9, 0.65, 1, 0.75, 0.55].map((h, i) => (
                  <span
                    key={i}
                    className={cn('eq-bar w-[5px] rounded-full bg-honey', !playing && 'opacity-40')}
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s`, animationPlayState: playing ? 'running' : 'paused' }}
                  />
                ))}
              </div>

              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute music' : 'Mute music'}
                className="ml-auto rounded-full border border-cocoa/15 bg-cream p-2.5 text-cocoa transition hover:bg-butter/40"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Volume slider */}
            <div className="mt-3 flex items-center gap-2">
              <VolumeX size={14} className="shrink-0 text-cocoa/50" />
              <Slider
                value={[Math.round(volume * 100)]}
                onValueChange={([v]) => setVolume(v / 100)}
                max={100}
                step={1}
                aria-label="Volume"
                className="flex-1"
              />
              <Volume2 size={14} className="shrink-0 text-cocoa/50" />
            </div>

            {error && (
              <p className="mt-2 rounded-xl bg-sunflower/20 px-2 py-1.5 text-center text-[10px] font-bold leading-snug text-deep">
                Couldn’t load <span className="font-mono">song.mp3</span> — drop your file into the{' '}
                <span className="font-mono">public/</span> folder.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close music player' : 'Open music player'}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-deep/50 bg-gradient-to-b from-butter to-honey text-bark shadow-glow transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
      >
        {playing && !open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunflower/50" aria-hidden="true" />
        )}
        <Music size={26} strokeWidth={2.2} className="relative" />
      </button>
    </div>
  )
}
