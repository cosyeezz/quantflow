import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import Spinner from '../spinner'
import { cn } from '@/lib/utils'

// Note: Removed dependency on external CSS file to avoid Tailwind v4 compilation issues with @apply
const buttonVariants = cva(
  'inline-flex justify-center items-center cursor-pointer whitespace-nowrap transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        'primary': [
          'shadow-sm',
          'bg-components-button-primary-bg',
          'border', 'border-components-button-primary-border',
          'hover:bg-components-button-primary-bg-hover',
          'hover:border-components-button-primary-border-hover',
          'text-components-button-primary-text',
          'disabled:shadow-none',
          'disabled:bg-components-button-primary-bg-disabled',
          'disabled:border-components-button-primary-border-disabled',
          'disabled:text-components-button-primary-text-disabled'
        ],
        'secondary': [
          'border-[0.5px]',
          'shadow-xs', // Kept as original, might fallback to shadow-sm if not defined
          'backdrop-blur-[5px]',
          'bg-components-button-secondary-bg',
          'border-components-button-secondary-border',
          'hover:bg-components-button-secondary-bg-hover',
          'hover:border-components-button-secondary-border-hover',
          'text-components-button-secondary-text',
          'disabled:backdrop-blur-sm',
          'disabled:bg-components-button-secondary-bg-disabled',
          'disabled:border-components-button-secondary-border-disabled',
          'disabled:text-components-button-secondary-text-disabled'
        ],
        'secondary-accent': [
          'border-[0.5px]',
          'shadow-xs',
          'bg-components-button-secondary-bg',
          'border-components-button-secondary-border',
          'hover:bg-components-button-secondary-bg-hover',
          'hover:border-components-button-secondary-border-hover',
          'text-components-button-secondary-accent-text',
          'disabled:bg-components-button-secondary-bg-disabled',
          'disabled:border-components-button-secondary-border-disabled',
          'disabled:text-components-button-secondary-accent-text-disabled'
        ],
        'tertiary': [
          'bg-components-button-tertiary-bg',
          'hover:bg-components-button-tertiary-bg-hover',
          'text-components-button-tertiary-text',
          'disabled:bg-components-button-tertiary-bg-disabled',
          'disabled:text-components-button-tertiary-text-disabled'
        ],
        'ghost': [
          'hover:bg-components-button-ghost-bg-hover',
          'text-components-button-ghost-text',
          'disabled:text-components-button-ghost-text-disabled'
        ],
        'ghost-accent': [
          'hover:bg-state-accent-hover',
          'text-components-button-secondary-accent-text',
          'disabled:text-components-button-secondary-accent-text-disabled'
        ],
        'warning': [
           // Warning maps to destructive primary styles in original CSS
          'bg-components-button-destructive-primary-bg',
          'border', 'border-components-button-destructive-primary-border',
          'hover:bg-components-button-destructive-primary-bg-hover',
          'hover:border-components-button-destructive-primary-border-hover',
          'text-components-button-destructive-primary-text',
          'disabled:bg-components-button-destructive-primary-bg-disabled',
          'disabled:border-components-button-destructive-primary-border-disabled',
          'disabled:text-components-button-destructive-primary-text-disabled'
        ],
      },
      size: {
        small: 'px-2 h-6 rounded-md text-xs font-medium',
        medium: 'px-3.5 h-8 rounded-lg text-[13px] leading-4 font-medium',
        large: 'px-4 h-9 rounded-[10px] text-sm font-semibold',
      },
      destructive: {
        true: '', // Logic handled in compound variants or conditional
        false: '',
      }
    },
    compoundVariants: [
      {
        variant: 'primary',
        destructive: true,
        className: [
          'bg-components-button-destructive-primary-bg',
          'border-components-button-destructive-primary-border',
          'hover:bg-components-button-destructive-primary-bg-hover',
          'hover:border-components-button-destructive-primary-border-hover',
          'text-components-button-destructive-primary-text',
          'disabled:bg-components-button-destructive-primary-bg-disabled',
          'disabled:border-components-button-destructive-primary-border-disabled',
          'disabled:text-components-button-destructive-primary-text-disabled'
        ]
      },
      {
        variant: 'secondary',
        destructive: true,
        className: [
          'bg-components-button-destructive-secondary-bg',
          'border-components-button-destructive-secondary-border',
          'hover:bg-components-button-destructive-secondary-bg-hover',
          'hover:border-components-button-destructive-secondary-border-hover',
          'text-components-button-destructive-secondary-text',
          'disabled:bg-components-button-destructive-secondary-bg-disabled',
          'disabled:border-components-button-destructive-secondary-border-disabled',
          'disabled:text-components-button-destructive-secondary-text-disabled'
        ]
      },
       {
        variant: 'tertiary',
        destructive: true,
        className: [
          'bg-components-button-destructive-tertiary-bg',
          'hover:bg-components-button-destructive-tertiary-bg-hover',
          'text-components-button-destructive-tertiary-text',
          'disabled:bg-components-button-destructive-tertiary-bg-disabled',
          'disabled:text-components-button-destructive-tertiary-text-disabled'
        ]
      },
       {
        variant: 'ghost',
        destructive: true,
        className: [
          'hover:bg-components-button-destructive-ghost-bg-hover',
          'text-components-button-destructive-ghost-text',
          'disabled:text-components-button-destructive-ghost-text-disabled'
        ]
      }
    ],
    defaultVariants: {
      variant: 'secondary',
      size: 'medium',
      destructive: false,
    },
  },
)

export type ButtonProps = {
  destructive?: boolean
  loading?: boolean
  spinnerClassName?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, destructive, loading, spinnerClassName, disabled, children, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(
          buttonVariants({ variant, size, destructive, className }),
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner loading={true} className={cn('mr-2 h-4 w-4', spinnerClassName)} />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }