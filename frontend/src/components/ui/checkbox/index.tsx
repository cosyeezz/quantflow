import { RiCheckLine } from '@remixicon/react'
import { cn } from '@/lib/utils'

type CheckboxProps = {
  id?: string
  checked?: boolean
  onCheck?: (event: React.MouseEvent<HTMLDivElement>) => void
  className?: string
  disabled?: boolean
  indeterminate?: boolean
}

const IndeterminateIcon = () => {
  return (
    <div data-testid='indeterminate-icon'>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

const Checkbox = ({
  id,
  checked,
  onCheck,
  className,
  disabled,
  indeterminate,
}: CheckboxProps) => {
  const checkClassName = (checked || indeterminate)
    ? 'bg-components-checkbox-bg text-components-checkbox-icon hover:bg-components-checkbox-bg-hover'
    : 'border border-components-checkbox-border bg-components-checkbox-bg-unchecked hover:bg-components-checkbox-bg-unchecked-hover hover:border-components-checkbox-border-hover'
  
  const disabledClassName = (checked || indeterminate)
    ? 'cursor-not-allowed bg-components-checkbox-bg-disabled-checked text-components-checkbox-icon-disabled hover:bg-components-checkbox-bg-disabled-checked'
    : 'cursor-not-allowed border-components-checkbox-border-disabled bg-components-checkbox-bg-disabled hover:border-components-checkbox-border-disabled hover:bg-components-checkbox-bg-disabled'

  return (
    <div
      id={id}
      className={cn(
        'flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-[4px] shadow-sm', // shadow-xs -> shadow-sm approximation
        checkClassName,
        disabled && disabledClassName,
        className,
      )}
      onClick={(event) => {
        if (disabled)
          return
        onCheck?.(event)
      }}
      data-testid={`checkbox-${id}`}
    >
      {!checked && indeterminate && <IndeterminateIcon />}
      {checked && <RiCheckLine className='h-3 w-3' data-testid={`check-icon-${id}`} />}
    </div>
  )
}

export default Checkbox
