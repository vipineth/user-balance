import { cn } from '../lib/classnames'

interface IProps {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
  className?: string
}

export function Button({ children, onClick, disabled, className }: IProps) {
  const classes = cn(
    'bg-black hover:bg-gray-800 disabled:bg-gray-400 text-xs disabled:cursor-not-allowed cursor-pointer text-white px-4 py-2 rounded-lg font-medium transition-colors',
    className,
  )
  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
