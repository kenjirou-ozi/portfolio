'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface HeroProps {
  catchphrase: string
  subCatchphrase: string
  heroVideoUrl?: string
}

export function Hero({ catchphrase, subCatchphrase }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-background)]">
      {/* Brutalist geometric background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 border-r-[3px] border-b-[3px] border-[var(--color-accent-cyan)] opacity-30" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border-l-[3px] border-t-[3px] border-[var(--color-accent-pink)] opacity-30" />

      {/* Diagonal neon lines */}
      <div className="absolute top-0 right-1/4 w-0.5 h-full opacity-20 rotate-12 origin-top bg-gradient-to-b from-transparent via-[var(--color-accent-cyan)] to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-0.5 h-2/3 opacity-15 -rotate-6 origin-bottom bg-gradient-to-b from-transparent via-[var(--color-accent-pink)] to-transparent" />

      {/* Glow orbs */}
      <div className="absolute top-20 right-40 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[var(--color-accent-cyan)]" />
      <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full blur-3xl opacity-10 bg-[var(--color-accent-pink)]" />

      <Container>
        <motion.div
          className="relative z-10 py-32 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Cyberpunk decorative element */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
            <div className="w-16 h-[3px] bg-[var(--color-accent-cyan)] shadow-[var(--glow-cyan)]" />
            <span className="text-xs tracking-[0.4em] uppercase font-medium text-[var(--color-text-secondary)]">
              ▼ Portfolio 2026 ▼
            </span>
            <div className="w-8 h-[3px] bg-[var(--color-accent-pink)] shadow-[var(--glow-pink)]" />
          </motion.div>

          {/* Main headline - brutalist, geometric */}
          <motion.h1
            variants={itemVariants}
            className="font-orbitron font-black leading-none tracking-wider mb-10 text-6xl md:text-7xl lg:text-8xl uppercase bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-pink)] bg-clip-text text-transparent"
          >
            {catchphrase.split('、').map((part, index) => (
              <span key={index} className="block">
                {part}
                {index === 0 && '、'}
              </span>
            ))}
          </motion.h1>

          {/* Geometric divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
            <div className="w-4 h-4 rotate-45 bg-[var(--color-accent-cyan)] shadow-[var(--glow-cyan)]" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-pink)]" />
            <div className="w-3 h-3 bg-[var(--color-accent-pink)] shadow-[var(--glow-pink)]" />
            <div className="w-2 h-2 bg-[var(--color-accent-gold)]" />
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-14 text-[var(--color-text-secondary)]"
          >
            {subCatchphrase}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
            <Button href="#works" variant="primary" size="lg">
              実績を見る
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              お問い合わせ
            </Button>
          </motion.div>

          {/* Scroll indicator - cyberpunk */}
          <motion.div
            className="absolute bottom-16 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 text-[var(--color-accent-cyan)]">
                ▼ SCROLL
              </span>
              <motion.div
                className="w-0.5 h-20 bg-gradient-to-b from-[var(--color-accent-cyan)] to-transparent"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Large decorative typography element - neon effect */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
        <span className="font-orbitron font-black tracking-wider text-[clamp(12rem,25vw,20rem)] text-[var(--color-accent-cyan)]">
          AI
        </span>
      </div>

      {/* Grid overlay for brutalist aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] grid-overlay" />
    </section>
  )
}
