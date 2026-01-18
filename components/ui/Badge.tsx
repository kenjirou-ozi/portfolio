import { ReactNode } from 'react'

type BadgeVariant = 'teal' | 'orange' | 'gold'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses = {
  teal: 'bg-[rgba(0,217,255,0.1)] text-[var(--color-accent-cyan)] border-[rgba(0,217,255,0.3)]',
  orange: 'bg-[rgba(255,107,53,0.1)] text-[#FF6B35] border-[rgba(255,107,53,0.3)]',
  gold: 'bg-[rgba(255,215,0,0.1)] text-[var(--color-accent-gold)] border-[rgba(255,215,0,0.3)]',
}

export function Badge({ children, variant = 'teal', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block py-1.5 px-4 text-xs font-medium tracking-wider border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
