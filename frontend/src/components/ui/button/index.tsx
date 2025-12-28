import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import Spinner from '../spinner'
import { cn } from '@/lib/utils'
import './index.css' // Import component-specific styles

const buttonVariants = cva(
  'btn disabled:btn-disabled transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        'primary': 'btn-primary',
        'warning': 'btn-warning',
        'secondary': 'btn-secondary',
        'secondary-accent': 'btn-secondary-accent',
        'ghost': 'btn-ghost',
        'ghost-accent': 'btn-ghost-accent',
        'tertiary': 'btn-tertiary',
      },
      size: {
        small: 'btn-small',
        medium: 'btn-medium',
        large: 'btn-large',
      },
      disabled: {
        true: 'btn-disabled opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'medium',
      disabled: false,
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
          buttonVariants({ variant, size, disabled: disabled || loading, className }),
          destructive && 'btn-destructive',
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
