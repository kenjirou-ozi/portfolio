'use client'

import { motion } from 'framer-motion'

interface ServiceIconProps {
  icon: string
  className?: string
}

export function ServiceIcon({ icon, className = '' }: ServiceIconProps) {
  return (
    <motion.div
      className={`w-20 h-20 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-accent-cyan)] flex items-center justify-center text-4xl ${className}`}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
        transition: { duration: 0.2 },
      }}
    >
      {icon}
    </motion.div>
  )
}
