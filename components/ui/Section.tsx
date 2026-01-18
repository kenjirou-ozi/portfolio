'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, viewportConfig } from '@/lib/animations'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-24 ${className}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
    >
      {children}
    </motion.section>
  )
}
