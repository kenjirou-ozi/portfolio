'use client'

import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { Container, Section, BackgroundGlow } from '../components/Container'
import {
  heroTitle,
  heroSubtitle,
  heroCTA,
  staggerContainer,
  glowPulse,
  duration,
  easing,
} from '../design-system/animations'

interface HeroPatternProps {
  catchphrase?: string
  subCatchphrase?: string
  videoUrl?: string
}

/**
 * Hero Section Pattern - Tech Bold + Creative Edge
 *
 * Features:
 * - Large display typography with gradient highlight
 * - Dramatic staggered entrance animation
 * - Background video with overlay
 * - Floating geometric decorations
 * - Pulsing glow effects
 */
export function HeroPattern({
  catchphrase = 'AIで、映像の常識を変える',
  subCatchphrase = 'AI動画・AI漫画・デザインで、あなたのビジネスを加速',
  videoUrl,
}: HeroPatternProps) {
  return (
    <Section
      spacing="none"
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Background Video or Gradient */}
      {videoUrl ? (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(7,7,10,0.7) 0%, rgba(7,7,10,0.9) 100%)',
            }}
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 212, 255, 0.15), transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(255, 107, 53, 0.1), transparent 50%),
              var(--color-bg-base)
            `,
          }}
        />
      )}

      {/* Floating Glow Effects */}
      <BackgroundGlow position="top-right" color="primary" size="lg" />
      <BackgroundGlow position="bottom-left" color="accent" size="md" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Geometric Decorations */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-[var(--color-primary)] opacity-20"
        style={{ transform: 'rotate(45deg)' }}
        animate={{
          rotate: [45, 55, 45],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-24 h-24 border border-[var(--color-accent)] opacity-20"
        animate={{
          rotate: [0, -10, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Diagonal Lines */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-0"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] origin-right"
            style={{
              width: '200%',
              top: `${20 + i * 15}%`,
              right: 0,
              background: `linear-gradient(90deg, transparent, var(--color-primary), transparent)`,
              transform: `rotate(-${15 + i * 3}deg)`,
              opacity: 0.1 - i * 0.015,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.1,
              ease: easing.dramatic,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, delay: 0.1 }}
          >
            <span
              className="w-12 h-[1px]"
              style={{ background: 'var(--color-primary)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-primary)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
              }}
            >
              Portfolio
            </span>
            <span
              className="w-12 h-[1px]"
              style={{ background: 'var(--color-primary)' }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={heroTitle}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 'var(--font-bold)',
              lineHeight: 'var(--leading-none)',
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--color-text-primary)',
            }}
          >
            {catchphrase.split('、')[0]}
            <br />
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {catchphrase.split('、')[1] || '常識を変える'}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroSubtitle}
            className="mt-8 mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(var(--text-lg), 2vw, var(--text-xl))',
              color: 'var(--color-text-secondary)',
              maxWidth: '50ch',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            {subCatchphrase}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCTA}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" href="#contact">
              お問い合わせ
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
            <Button variant="secondary" size="lg" href="#works">
              実績を見る
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: duration.slow }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: 'var(--tracking-widest)',
                }}
              >
                SCROLL
              </span>
              <div
                className="w-[1px] h-12"
                style={{
                  background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
