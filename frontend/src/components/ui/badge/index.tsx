import type { CSSProperties, ReactNode } from 'react'
import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

enum BadgeState {
  Warning = 'warning',
  Accent = 'accent',
  Default = 'default',
}

const badgeVariants = cva(
  'inline-flex justify-center items-center border',
  {
    variants: {
      variant: {
        default: 'text-text-tertiary border-divider-deep',
        warning: 'text-text-warning border-text-warning',
        accent: 'text-text-accent-secondary border-text-accent-secondary',
      },
      size: {
        s: 'rounded-[5px] gap-0.5 min-w-[18px]',
        m: 'rounded-md gap-[3px] min-w-5',
        l: 'rounded-md gap-1 min-w-6',
      },
      iconOnly: {
        true: '',
        false: '',
      }
    },
    compoundVariants: [
      { size: 's', iconOnly: true, className: 'p-[3px]' },
      { size: 's', iconOnly: false, className: 'px-[5px] py-[3px]' },
      { size: 'm', iconOnly: true, className: 'p-1' },
      { size: 'm', iconOnly: false, className: 'px-[5px] py-[2px]' },
      { size: 'l', iconOnly: true, className: 'p-1.5' },
      { size: 'l', iconOnly: false, className: 'px-2 py-1' },
    ],
    defaultVariants: {
      size: 'm',
      variant: 'default',
      iconOnly: false,
    },
  },
)

type BadgeProps = {
  size?: 's' | 'm' | 'l'
  iconOnly?: boolean
  uppercase?: boolean
  state?: 'warning' | 'accent' | 'default' // Map BadgeState enum to string union for easier usage
  styleCss?: CSSProperties
  children?: ReactNode
} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

const Badge: React.FC<BadgeProps> = ({
  className,
  size,
  state = 'default',
  iconOnly = false,
  uppercase = false,
  styleCss,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        badgeVariants({ variant: state, size, iconOnly, className }),
        uppercase ? 'uppercase text-[10px] font-medium' : 'text-[11px] font-medium', // Approximation of system-2xs-medium
      )}
      style={styleCss}
      {...props}
    >
      {children}
    </div>
  )
}
Badge.displayName = 'Badge'

export default Badge
export { Badge, BadgeState, badgeVariants }
