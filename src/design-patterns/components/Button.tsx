'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { buttonHover, duration, easing } from '../design-system/animations'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

/**
 * Button Component - Tech Bold Design
 *
 * Features:
 * - Gradient border with glow effect
 * - Angled/clipped corner for tech aesthetic
 * - Scale + glow animation on hover
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) {
  const sizeMap = {
    sm: { padding: '8px 16px', fontSize: '14px' },
    md: { padding: '12px 24px', fontSize: '16px' },
    lg: { padding: '16px 32px', fontSize: '18px' },
  }

  const variantMap = {
    primary: {
      background: 'linear-gradient(to right, #00D4FF, #0099CC)',
      color: '#07070A',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: '#00D4FF',
      border: '2px solid #00D4FF',
    },
    ghost: {
      background: 'transparent',
      color: 'rgba(255, 255, 255, 0.7)',
      border: 'none',
    },
  }

  // Angled clip path for tech aesthetic
  const clipPath = variant === 'primary'
    ? 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
    : undefined

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Chakra Petch', sans-serif",
        fontWeight: 500,
        letterSpacing: '0.025em',
        transition: 'all 0.3s ease',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        borderRadius: variant === 'primary' ? 0 : '8px',
        clipPath,
        ...sizeMap[size],
        ...variantMap[variant],
      }}
      variants={buttonHover}
      initial="rest"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
    >
      {/* Glow effect layer */}
      {variant === 'primary' && (
        <motion.span
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
            clipPath,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: duration.normal, ease: easing.smooth }}
        />
      )}

      {/* Content */}
      <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>

      {/* Corner accent for primary */}
      {variant === 'primary' && (
        <>
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '12px',
              height: '12px',
              borderTop: '2px solid rgba(255,255,255,0.3)',
              borderRight: '2px solid rgba(255,255,255,0.3)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '12px',
              height: '12px',
              borderBottom: '2px solid rgba(255,255,255,0.3)',
              borderLeft: '2px solid rgba(255,255,255,0.3)',
            }}
          />
        </>
      )}
    </Component>
  )
}

// Icon variants
export function ButtonIcon({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </span>
  )
}
