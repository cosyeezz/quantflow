import type { FC } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  loading?: boolean
  className?: string
  children?: React.ReactNode | string
}

const Spinner: FC<Props> = ({ loading = false, children, className }) => {
  if (!loading) return null;
  
  return (
    <div
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-gray-200 motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className
      )}
      role="status"
    >
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
      {children}
    </div>
  )
}

export default Spinner
