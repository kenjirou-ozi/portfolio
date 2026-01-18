'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  className?: string
}

const sizeClasses = {
  sm: 'py-2.5 px-6 text-xs',
  md: 'py-3.5 px-10 text-sm',
  lg: 'py-4 px-14 text-base',
}

const variantClasses = {
  primary: 'bg-[var(--color-accent-cyan)] border-[var(--color-accent-cyan)] text-[var(--color-background)] shadow-[var(--glow-cyan)]',
  secondary: 'bg-[var(--color-accent-pink)] border-[var(--color-accent-pink)] text-[var(--color-background)] shadow-[var(--glow-pink)]',
  outline: 'bg-transparent border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeOut' as const }
    },
    tap: { scale: 0.95 },
  }

  const baseClasses = `inline-flex items-center justify-center font-semibold transition-all duration-300 relative overflow-hidden uppercase tracking-wider no-underline cursor-pointer border-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const cornerAccentColor = variant === 'secondary' ? 'border-[var(--color-accent-gold)]' : 'border-[var(--color-text-primary)]'

  const ButtonContent = () => (
    <>
      {/* Geometric corner accents */}
      <span className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${cornerAccentColor} opacity-60`} />
      <span className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${cornerAccentColor} opacity-60`} />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <ButtonContent />
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <ButtonContent />
    </motion.button>
  )
}
