import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

/**
 * Background-music provider.
 * Plays  /song.mp3  (place the file you want into `public/song.mp3`).
 * - Starts on the first user gesture (the "Open Your Surprise" button) to satisfy browser autoplay rules.
 * - Exposes play / pause / mute / volume to any component via useAudio().
 */
const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.72)
  const [error, setError] = useState(false)

  // Keep element volume / mute in sync
  useEffect(() => {
    const a = audioRef.current
    if (a) {
      a.volume = volume
      a.muted = muted
    }
  }, [volume, muted])

  const start = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = volume
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      a.pause()
      setPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  return (
    <AudioContext.Provider
      value={{ playing, muted, volume, setVolume, toggleMute, toggle, start, error }}
    >
      {children}
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
        preload="auto"
        onError={() => setError(true)}
      />
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>')
  return ctx
}
