'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

interface HeadingProps {
  level: HeadingLevel
  children: ReactNode
  className?: string
  decorative?: boolean
  centered?: boolean
}

const levelClasses = {
  h1: 'text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-semibold',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
  h4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
}

export function Heading({
  level,
  children,
  className = '',
  decorative = false,
  centered = false,
}: HeadingProps) {
  const Component = level

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  }

  const textAlign = centered ? 'text-center' : 'text-left'
  const baseClasses = `font-orbitron text-[var(--color-text-primary)] uppercase tracking-wider m-0 ${levelClasses[level]} ${textAlign}`

  if (decorative) {
    return (
      <motion.div
        className={`relative ${centered ? 'flex flex-col items-center' : 'block'} ${className}`}
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Component className={baseClasses}>{children}</Component>

        {/* Art Deco decorative underline */}
        <div className={`mt-4 flex items-center gap-2 ${centered ? 'justify-center' : 'justify-start'}`}>
          <div className="w-8 h-0.5 bg-[var(--color-accent-gold)]" />
          <div className="w-2 h-2 rotate-45 border border-[var(--color-accent-gold)]" />
          <div className="w-16 h-0.5 bg-[var(--color-accent-cyan)]" />
          <div className="w-2 h-2 rotate-45 border border-[var(--color-accent-gold)]" />
          <div className="w-8 h-0.5 bg-[var(--color-accent-gold)]" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={headingVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Component className={baseClasses}>{children}</Component>
    </motion.div>
  )
}
