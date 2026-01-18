'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { scrollReveal, viewportConfig } from '../design-system/animations'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'glass' | 'bordered'
  hover?: boolean
  className?: string
  animate?: boolean
}

/**
 * Card Component - Creative Edge Design
 *
 * Features:
 * - Glassmorphism effect
 * - Cyan accent border on hover
 * - Subtle glow effect
 * - Diagonal accent line decoration
 * - Generous padding (24px default, 32px large)
 */
export function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  animate = true,
}: CardProps) {
  // Background styles for each variant
  const variantBgStyles = {
    default: '#0D0D12',
    glass: 'rgba(13, 13, 18, 0.7)',
    bordered: 'transparent',
  }

  // Border styles for each variant
  const variantBorderStyles = {
    default: '1px solid rgba(255, 255, 255, 0.08)',
    glass: '1px solid rgba(255, 255, 255, 0.08)',
    bordered: '2px solid rgba(0, 212, 255, 0.2)',
  }

  return (
    <motion.div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        borderRadius: '16px',
        background: variantBgStyles[variant],
        border: variantBorderStyles[variant],
        backdropFilter: variant === 'glass' ? 'blur(12px)' : undefined,
        WebkitBackdropFilter: variant === 'glass' ? 'blur(12px)' : undefined,
      }}
      variants={animate ? scrollReveal : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={animate ? viewportConfig : undefined}
    >
      {/* Top accent line - appears on hover */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Corner decorations */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderTop: '2px solid #00D4FF',
          borderLeft: '2px solid #00D4FF',
          opacity: 0.3,
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '32px',
          height: '32px',
          borderBottom: '2px solid #FF6B35',
          borderRight: '2px solid #FF6B35',
          opacity: 0.3,
        }}
      />

      {/* Content - Generous padding */}
      <div style={{ position: 'relative', zIndex: 10, padding: '24px' }}>
        {children}
      </div>
    </motion.div>
  )
}

// Card with image header
interface CardImageProps extends CardProps {
  imageSrc?: string
  imageAlt?: string
  aspectRatio?: 'video' | 'square' | 'portrait'
}

export function CardImage({
  children,
  imageSrc,
  imageAlt = '',
  aspectRatio = 'video',
  ...props
}: CardImageProps) {
  const aspectRatioMap = {
    video: '56.25%', // 16:9
    square: '100%',  // 1:1
    portrait: '133.33%', // 3:4
  }

  return (
    <motion.div
      className={props.className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        borderRadius: '16px',
        background: '#0D0D12',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      variants={props.animate !== false ? scrollReveal : undefined}
      initial={props.animate !== false ? 'hidden' : undefined}
      whileInView={props.animate !== false ? 'visible' : undefined}
      viewport={props.animate !== false ? viewportConfig : undefined}
    >
      {imageSrc && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: aspectRatioMap[aspectRatio],
            overflow: 'hidden',
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #0D0D12 0%, transparent 50%)',
            }}
          />
        </div>
      )}
      <div style={{ padding: '24px' }}>
        {children}
      </div>
    </motion.div>
  )
}
