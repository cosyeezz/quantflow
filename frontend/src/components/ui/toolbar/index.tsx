import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Select from '../LegacySelect' // Using the LegacySelect we restored

// --- Components ---

export const Toolbar = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  )
}

export const ToolbarSeparator = ({ className }: { className?: string }) => (
  <div className={cn("w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1", className)}></div>
)

interface ToolbarSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
  width?: string
}

export const ToolbarSearch = React.forwardRef<HTMLInputElement, ToolbarSearchProps>(
  ({ className, placeholder, value, onChange, onSearch, width = "w-48", ...props }, ref) => {
    // Internal state if uncontrolled, but usually controlled
    const [localValue, setLocalValue] = useState(value || '')

    useEffect(() => {
        if (value !== undefined) setLocalValue(value)
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value)
      onChange?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch?.(localValue as string)
        }
        props.onKeyDown?.(e)
    }
    
    const handleClear = () => {
        const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>
        setLocalValue('')
        onChange?.(event)
        onSearch?.('') // Optional: trigger search on clear
    }

    return (
      <div className={cn("group relative flex items-center", width, className)}>
        <Search className="absolute left-2.5 w-4 h-4 text-gray-400 group-hover:text-gray-500 transition-colors pointer-events-none" />
        <input
          ref={ref}
          type="text"
          className={cn(
            "w-full h-9 pl-9 pr-8 text-sm bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#2a2a2e] rounded-lg",
            "placeholder:text-gray-400 text-gray-900 dark:text-gray-100",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200",
            "hover:border-gray-300 dark:hover:border-[#3a3a3e]"
          )}
          placeholder={placeholder || "Search..."}
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {localValue && (
            <button 
                onClick={handleClear}
                className="absolute right-2.5 p-0.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        )}
      </div>
    )
  }
)
ToolbarSearch.displayName = 'ToolbarSearch'


// Wrapper around LegacySelect to force the specific styling from the screenshot
export const ToolbarSelect = ({ 
    options, 
    value, 
    onChange, 
    placeholder, 
    className, 
    ...props 
}: any) => {
  return (
    <div className={cn("min-w-[140px]", className)}>
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            variant="ghost" 
            size="md"
            className="w-full"
            {...props}
        />
    </div>
  )
}
