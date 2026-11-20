import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// shadcn/ui Button — sunflower themed variants
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body font-extrabold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunflower focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none',
  {
    variants: {
      variant: {
        default:
          'border border-deep/50 bg-gradient-to-b from-butter via-sunflower to-honey text-bark shadow-[0_5px_0_#c67a00,0_14px_30px_rgba(245,166,35,0.45)] hover:brightness-105 hover:shadow-[0_4px_0_#c67a00,0_18px_38px_rgba(245,166,35,0.55)]',
        cocoa:
          'border border-bark bg-gradient-to-b from-[#6b4226] to-[#4a2c12] text-butter shadow-[0_5px_0_#241408,0_14px_30px_rgba(62,42,20,0.45)] hover:brightness-110',
        outline:
          'border-2 border-butter/70 bg-transparent text-butter backdrop-blur-sm hover:bg-butter/15',
        paper:
          'border border-cocoa/20 bg-paper text-cocoa shadow-paper hover:-translate-y-0.5',
        ghost: 'bg-transparent text-cocoa hover:bg-cocoa/10',
      },
      size: {
        default: 'h-12 px-6 text-base',
        sm: 'h-10 px-5 text-sm',
        lg: 'h-14 px-8 text-lg sm:h-16 sm:px-10 sm:text-xl',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
))
Button.displayName = 'Button'

export { Button, buttonVariants }
