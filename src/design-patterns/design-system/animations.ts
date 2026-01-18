/**
 * Animation System - Dramatic Reveals + Responsive Interactions
 *
 * Design Rationale:
 * - Staggered page load for premium feel
 * - Scroll-triggered reveals for engagement
 * - Hover states that surprise and delight
 * - Motion library (Framer Motion) for React
 */

import type { Variants, Transition } from 'framer-motion'

// ===== Duration Constants =====
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  reveal: 0.8,
  dramatic: 1.2,
} as const

// ===== Easing Functions =====
export const easing = {
  // Smooth default
  smooth: [0.25, 0.1, 0.25, 1] as const,
  // Dramatic entrance
  dramatic: [0.16, 1, 0.3, 1] as const,
  // Bouncy feel
  bounce: [0.34, 1.56, 0.64, 1] as const,
  // Sharp exit
  exit: [0.4, 0, 1, 1] as const,
  // Tech feel - linear start, ease out
  tech: [0.0, 0.0, 0.2, 1] as const,
} as const

// ===== Stagger Configuration =====
export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
} as const

// ===== Scroll Reveal Variants =====
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.reveal,
      ease: easing.dramatic,
    },
  },
}

export const scrollRevealLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.reveal,
      ease: easing.dramatic,
    },
  },
}

export const scrollRevealRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.reveal,
      ease: easing.dramatic,
    },
  },
}

export const scrollRevealScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.reveal,
      ease: easing.dramatic,
    },
  },
}

// ===== Staggered Children Container =====
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.dramatic,
    },
  },
}

// ===== Hero Specific Animations =====
export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    skewY: 3,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: duration.dramatic,
      ease: easing.dramatic,
    },
  },
}

export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.reveal,
      ease: easing.dramatic,
      delay: 0.3,
    },
  },
}

export const heroCTA: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.bounce,
      delay: 0.6,
    },
  },
}

// ===== Card Hover Variants =====
export const cardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 212, 255, 0.2)',
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
}

// ===== Button Animations =====
export const buttonHover: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
  tap: {
    scale: 0.97,
  },
}

export const buttonGlow: Variants = {
  rest: {
    opacity: 0,
    scale: 0.8,
  },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
}

// ===== Glow Pulse Animation =====
export const glowPulse: Variants = {
  initial: {
    opacity: 0.5,
    scale: 1,
  },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ===== Line Draw Animation =====
export const lineDraw: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: duration.dramatic,
        ease: easing.tech,
      },
      opacity: {
        duration: duration.fast,
      },
    },
  },
}

// ===== Viewport Configuration =====
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: '-50px',
}

// ===== Transition Presets =====
export const transitions: Record<string, Transition> = {
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  },
  smooth: {
    duration: duration.normal,
    ease: easing.smooth,
  },
  dramatic: {
    duration: duration.reveal,
    ease: easing.dramatic,
  },
}
