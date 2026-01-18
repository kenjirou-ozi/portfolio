'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  href?: string
  variant?: 'default' | 'elevated'
  decorative?: boolean
}

const variantClasses = {
  default: 'bg-[var(--color-surface)] shadow-md',
  elevated: 'bg-[var(--color-surface-elevated)] shadow-lg',
}

export function Card({
  children,
  className = '',
  href,
  variant = 'default',
  decorative = false,
}: CardProps) {
  const cardVariants = {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -6,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
  }

  const baseClasses = `relative transition-all duration-300 overflow-hidden border-2 border-[var(--color-border-medium)] ${variantClasses[variant]} ${className}`

  const CardContent = () => (
    <>
      {decorative && (
        <>
          {/* Geometric corner decorations - cyberpunk style */}
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--color-accent-cyan)] opacity-40 transition-opacity duration-300" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--color-accent-pink)] opacity-40 transition-opacity duration-300" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--color-accent-pink)] opacity-40 transition-opacity duration-300" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent-cyan)] opacity-40 transition-opacity duration-300" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 p-8">{children}</div>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} block no-underline`}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
      >
        <CardContent />
      </motion.a>
    )
  }

  return (
    <motion.div
      className={baseClasses}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
    >
      <CardContent />
    </motion.div>
  )
}
