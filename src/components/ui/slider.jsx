import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../../lib/utils'

// shadcn/ui Slider — sunflower themed (used for the song volume control)
const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-cocoa/20">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-honey via-sunflower to-butter" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label="Volume"
      className="block h-4 w-4 rounded-full border border-deep bg-paper shadow-md transition-transform duration-150 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
    />
  </SliderPrimitive.Root>
))
Slider.displayName = 'Slider'

export { Slider }
