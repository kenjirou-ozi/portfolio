import { Variants } from 'framer-motion'

// =====================================
// Container Animation Variants
// =====================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// =====================================
// Basic Animation Variants
// =====================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// =====================================
// Special Effect Variants
// =====================================

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const glitchText: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  show: {
    opacity: 1,
    x: [0, -2, 2, -2, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.25, 0.5, 0.75, 1],
      ease: 'easeInOut',
    },
  },
}

// =====================================
// Hover Variants
// =====================================

export const hoverScale = {
  scale: 1.03,
  transition: {
    duration: 0.15,
    ease: 'easeOut',
  },
}

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
  transition: {
    duration: 0.15,
    ease: 'easeOut',
  },
}

export const hoverLift = {
  y: -5,
  transition: {
    duration: 0.15,
    ease: 'easeOut',
  },
}

// =====================================
// Card Animation Variants
// =====================================

export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)',
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
}

// =====================================
// Text Animation Utilities
// =====================================

export const revealText: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
}

export const typeWriter: Variants = {
  hidden: { width: 0 },
  show: {
    width: '100%',
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}

// =====================================
// Scroll-Triggered Animation Variants
// =====================================

export const scrollFadeIn: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const scrollParallax = (offset: number = 50) => ({
  hidden: { opacity: 0, y: offset },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
})

// =====================================
// Button & CTA Animation Variants
// =====================================

export const pulseGlow: Variants = {
  initial: {
    boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
  },
  animate: {
    boxShadow: [
      '0 0 10px rgba(0, 212, 255, 0.3)',
      '0 0 30px rgba(0, 212, 255, 0.6)',
      '0 0 10px rgba(0, 212, 255, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const buttonHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)',
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.7)',
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
  },
}

// =====================================
// Number Counter Animation
// =====================================

export interface CounterProps {
  from: number
  to: number
  duration?: number
}

export const counterAnimation = (from: number, to: number, duration: number = 2): any => ({
  from,
  to,
  transition: {
    duration,
    ease: 'easeOut',
  },
})

// =====================================
// Utility Functions
// =====================================

/**
 * Create staggered delay for multiple items
 */
export const createStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay
}

/**
 * Viewport scroll trigger config for framer-motion
 */
export const viewportConfig = {
  once: true,
  amount: 0.3,
}

export const viewportConfigPartial = {
  once: true,
  amount: 0.1,
}

/**
 * Page transition variants
 */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}
