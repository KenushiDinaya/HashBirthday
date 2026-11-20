import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

/**
 * Floating bottom navigation for the slide chapters:
 * back button · progress dots (tappable) · next button.
 */
export default function ChapterNav({ index, total, onPrev, onNext, onGoto, lastLabel = 'Replay' }) {
  const isFirst = index === 0
  const isLast = index === total - 1

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cocoa/15 bg-paper/90 py-2 pl-2 pr-2 shadow-paper backdrop-blur-md sm:bottom-6 sm:gap-3 sm:py-2.5 sm:pl-3 sm:pr-3"
    >
      <button
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous chapter"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/15 bg-cream text-cocoa transition hover:bg-butter/40 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Progress">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to chapter ${i + 1}`}
            onClick={() => onGoto(i)}
            className={cn(
              'h-2.5 rounded-full transition-all duration-500 sm:h-3',
              i === index ? 'w-7 bg-honey sm:w-9' : 'w-2.5 bg-cocoa/20 hover:bg-honey/60 sm:w-3'
            )}
          />
        ))}
      </div>

      <Button
        size="sm"
        onClick={onNext}
        className="h-10 rounded-full px-4 text-xs sm:h-11 sm:px-6 sm:text-sm"
        aria-label={isLast ? lastLabel : 'Next chapter'}
      >
        <span className="hidden xs:inline sm:inline">{isLast ? lastLabel : 'Next'}</span>
        {isLast ? <RotateCcw size={17} /> : <ChevronRight size={17} />}
      </Button>
    </nav>
  )
}
