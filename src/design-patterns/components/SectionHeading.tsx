'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportConfig } from '../design-system/animations'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  label?: string
  align?: 'left' | 'center'
  className?: string
}

/**
 * SectionHeading Component - Bold Visual Impact
 *
 * Features:
 * - Large display typography (Chakra Petch)
 * - Cyan accent bar on the left
 * - Staggered reveal animation
 * - Generous spacing below (per frontend-design SKILL)
 */
export function SectionHeading({
  title,
  subtitle,
  label,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <motion.div
      className={className}
      style={{
        maxWidth: '768px',
        marginBottom: '64px', // Generous spacing
        textAlign: isCenter ? 'center' : 'left',
        marginLeft: isCenter ? 'auto' : undefined,
        marginRight: isCenter ? 'auto' : undefined,
      }}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {/* Label */}
      {label && (
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            justifyContent: isCenter ? 'center' : 'flex-start',
          }}
          variants={staggerItem}
        >
          {!isCenter && (
            <span
              style={{
                width: '32px',
                height: '2px',
                background: '#00D4FF',
              }}
            />
          )}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#FF6B35',
            }}
          >
            {label}
          </span>
          {isCenter && (
            <span
              style={{
                width: '32px',
                height: '2px',
                background: '#00D4FF',
              }}
            />
          )}
        </motion.div>
      )}

      {/* Title with accent bar */}
      <motion.div
        style={{
          position: 'relative',
          paddingLeft: !isCenter ? '24px' : undefined,
        }}
        variants={staggerItem}
      >
        {/* Left accent bar */}
        {!isCenter && (
          <motion.span
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              borderRadius: '9999px',
              background: 'linear-gradient(180deg, #00D4FF 0%, #0099CC 100%)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          />
        )}

        <h2
          style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={staggerItem}
          style={{
            marginTop: '24px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '60ch',
            paddingLeft: !isCenter ? '24px' : undefined,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

// Variant: Hero-style large heading
interface HeroHeadingProps {
  title: string
  highlight?: string
  subtitle?: string
  className?: string
}

export function HeroHeading({
  title,
  highlight,
  subtitle,
  className = '',
}: HeroHeadingProps) {
  return (
    <motion.div
      className={className}
      style={{ textAlign: 'center' }}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={staggerItem}
        style={{
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1,
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          margin: 0,
        }}
      >
        {title}
        {highlight && (
          <>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {highlight}
            </span>
          </>
        )}
      </motion.h1>

      {subtitle && (
        <motion.p
          variants={staggerItem}
          style={{
            marginTop: '32px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '18px',
            maxWidth: '50ch',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
