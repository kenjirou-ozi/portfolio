'use client'

import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  size?: 'default' | 'narrow' | 'wide' | 'full'
  className?: string
  asymmetric?: boolean
}

/**
 * Container Component - Spatial Composition
 *
 * Features:
 * - Responsive max-width constraints
 * - Generous horizontal padding (per frontend-design SKILL)
 * - Asymmetric margin option for visual interest
 */
export function Container({
  children,
  size = 'default',
  className = '',
  asymmetric = false,
}: ContainerProps) {
  const maxWidthMap = {
    default: '1280px', // max-w-7xl
    narrow: '896px',   // max-w-4xl
    wide: '1400px',
    full: 'none',
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: maxWidthMap[size],
        marginLeft: 'auto',
        marginRight: 'auto',
        // Generous padding: 24px mobile (handled via CSS media queries or use base)
        paddingLeft: asymmetric ? '48px' : '24px',
        paddingRight: asymmetric ? '24px' : '24px',
      }}
    >
      {children}
    </div>
  )
}

// Section wrapper with vertical spacing
interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  background?: 'base' | 'surface' | 'elevated' | 'gradient'
  spacing?: 'default' | 'large' | 'none'
}

export function Section({
  children,
  id,
  className = '',
  background = 'base',
  spacing = 'default',
}: SectionProps) {
  // Generous vertical spacing: 96px default, 128px large
  const spacingMap = {
    default: { paddingTop: '96px', paddingBottom: '96px' },
    large: { paddingTop: '128px', paddingBottom: '128px' },
    none: { paddingTop: '0', paddingBottom: '0' },
  }

  // Background colors
  const bgColorMap = {
    base: '#07070A',
    surface: '#0D0D12',
    elevated: '#14141F',
    gradient: 'linear-gradient(180deg, #0D0D12 0%, #07070A 100%)',
  }

  return (
    <section
      id={id}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: bgColorMap[background],
        ...spacingMap[spacing],
      }}
    >
      {children}
    </section>
  )
}

// Grid layout component
interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'default' | 'large'
  className?: string
}

export function Grid({
  children,
  cols = 3,
  gap = 'default',
  className = '',
}: GridProps) {
  // Gap sizes
  const gapMap = {
    default: '24px',
    large: '32px',
  }

  // For responsive columns, we'll use CSS Grid with auto-fit
  // This creates a responsive grid without media queries
  const getGridTemplate = () => {
    switch (cols) {
      case 1:
        return '1fr'
      case 2:
        return 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))'
      case 3:
        return 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))'
      case 4:
        return 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))'
      default:
        return 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))'
    }
  }

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: getGridTemplate(),
        gap: gapMap[gap],
      }}
    >
      {children}
    </div>
  )
}

// Decorative background element
interface BackgroundGlowProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  color?: 'primary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BackgroundGlow({
  position = 'top-right',
  color = 'primary',
  size = 'md',
  className = '',
}: BackgroundGlowProps) {
  const positionMap: Record<string, React.CSSProperties> = {
    'top-left': { top: 0, left: 0, transform: 'translate(-50%, -50%)' },
    'top-right': { top: 0, right: 0, transform: 'translate(50%, -50%)' },
    'bottom-left': { bottom: 0, left: 0, transform: 'translate(-50%, 50%)' },
    'bottom-right': { bottom: 0, right: 0, transform: 'translate(50%, 50%)' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  }

  const sizeMap = {
    sm: { width: '256px', height: '256px' },
    md: { width: '384px', height: '384px' },
    lg: { width: '600px', height: '600px' },
  }

  const colorMap = {
    primary: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
    accent: 'radial-gradient(ellipse at center, rgba(255, 107, 53, 0.4) 0%, transparent 70%)',
  }

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        background: colorMap[color],
        filter: 'blur(80px)',
        opacity: 0.4,
        ...positionMap[position],
        ...sizeMap[size],
      }}
    />
  )
}
