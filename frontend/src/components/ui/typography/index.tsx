import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const headingVariants = cva(
  'font-semibold text-text-primary tracking-tight',
  {
    variants: {
      level: {
        h1: 'text-3xl md:text-4xl',
        h2: 'text-2xl md:text-3xl',
        h3: 'text-xl md:text-2xl',
        h4: 'text-lg md:text-xl',
        h5: 'text-base md:text-lg',
        h6: 'text-sm md:text-base',
      },
    },
    defaultVariants: {
      level: 'h1',
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Component = as || (level as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h1'
    return (
      <Component
        className={cn(headingVariants({ level, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'

const textVariants = cva(
  'text-text-secondary',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      dimmed: {
        true: 'text-text-tertiary',
        false: '',
      }
    },
    defaultVariants: {
      size: 'md',
      weight: 'normal',
      dimmed: false,
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: 'span' | 'p' | 'div'
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, size, weight, dimmed, as: Component = 'span', ...props }, ref) => {
    return (
      <Component
        className={cn(textVariants({ size, weight, dimmed, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Text.displayName = 'Text'

export { Heading, Text }
