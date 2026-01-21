'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Sparkles, Clock, Layers } from 'lucide-react'

interface ProfileImage {
  asset?: {
    _id: string
    url: string
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

interface Strength {
  _type: string
  title: string
  description: string
}

interface WorkflowStep {
  _type: string
  step: number
  title: string
  description: string
}

interface SocialLink {
  _type: string
  platform: string
  url: string
}

interface ProfileProps {
  name: string
  nameEn?: string
  bio: string
  profileImage?: ProfileImage
  strengths: Strength[]
  workflow: WorkflowStep[]
  socialLinks?: SocialLink[]
}

// Social link icons
const socialIcons: Record<string, React.ReactNode> = {
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  website: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  other: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
}

// Profile Hero Component - Full Background Photo with Text Overlay
function ProfileHero({
  image,
  name,
  nameEn,
  bio,
  socialLinks
}: {
  image?: ProfileImage
  name: string
  nameEn?: string
  bio: string
  socialLinks?: SocialLink[]
}) {
  const imageUrl = image?.asset?.url

  // Staggered animation variants for refined reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const }
    }
  }

  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden">
      {/* Background Image */}
      {imageUrl ? (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={imageUrl}
            alt={image?.alt || `${name}のプロフィール写真`}
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: image?.hotspot
                ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                : 'center 20%'
            }}
            priority
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)]" />
      )}

      {/* Atmospheric Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/95 via-[var(--color-background)]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-background)]" />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Accent Glow Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent-cyan)]/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[var(--color-accent-pink)]/8 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative h-full min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            {/* Refined Label */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-accent-cyan)]">
                <span className="w-8 h-px bg-[var(--color-accent-cyan)]" />
                Creator & Designer
              </span>
            </motion.div>

            {/* Name with Elegant Typography */}
            <motion.h3
              variants={itemVariants}
              className="text-[clamp(2.5rem,8vw,5rem)] font-bold font-orbitron leading-[0.9] mb-4"
            >
              <span className="block text-[var(--color-text-primary)]">{name}</span>
              {nameEn && (
                <span className="block text-[clamp(1rem,2vw,1.25rem)] font-normal tracking-[0.15em] text-[var(--color-text-muted)] mt-3">
                  {nameEn}
                </span>
              )}
            </motion.h3>

            {/* Decorative Divider */}
            <motion.div
              variants={lineVariants}
              className="flex items-center gap-3 my-8 origin-left"
            >
              <div className="w-16 h-px bg-gradient-to-r from-[var(--color-accent-cyan)] to-transparent" />
              <motion.div
                initial={{ rotate: 0, scale: 0 }}
                whileInView={{ rotate: 45, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="w-2 h-2 bg-[var(--color-accent-gold)]"
              />
              <div className="w-8 h-px bg-gradient-to-r from-[var(--color-accent-gold)]/50 to-transparent" />
            </motion.div>

            {/* Bio with Refined Typography */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-xl"
            >
              {bio}
            </motion.p>

            {/* Social Links with Refined Hover Effects */}
            {socialLinks && socialLinks.length > 0 && (
              <motion.div variants={itemVariants} className="flex gap-4 mt-10">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-[var(--color-border-light)] bg-[var(--color-background)]/50 backdrop-blur-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] hover:border-[var(--color-accent-cyan)]/50 transition-all duration-500"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    aria-label={link.platform}
                  >
                    {/* Glow Effect on Hover */}
                    <span className="absolute inset-0 rounded-full bg-[var(--color-accent-cyan)]/0 group-hover:bg-[var(--color-accent-cyan)]/10 transition-all duration-500" />
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 20px var(--color-accent-cyan)/30' }} />
                    <span className="relative z-10">{socialIcons[link.platform] || socialIcons.other}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[var(--color-accent-cyan)]/50 to-transparent"
        />
      </motion.div>
    </div>
  )
}

// Strength Icons for Feature277 Style
const strengthIcons = [
  Sparkles,  // キャラクター一貫性
  Clock,     // デザイン経験
  Layers,    // ワンストップ対応
]

// Strength Card Component (Feature277 Style)
function StrengthCard({
  strength,
  index
}: {
  strength: Strength
  index: number
}) {
  const IconComponent = strengthIcons[index] || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative bg-[var(--color-surface-elevated)] border border-[var(--color-border-medium)] rounded-2xl p-6 md:p-8 hover:border-[var(--color-accent-cyan)]/50 hover:bg-[var(--color-accent-cyan)]/5 transition-all duration-300"
    >
      {/* Icon Container */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)]/20 to-[var(--color-accent-cyan)]/5 border border-[var(--color-accent-cyan)]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[var(--color-accent-cyan)]/20 transition-all duration-300">
        <IconComponent className="w-6 h-6 text-[var(--color-accent-cyan)]" />
      </div>

      {/* Title */}
      <h4 className="text-lg md:text-xl font-bold font-orbitron text-[var(--color-text-primary)] mb-3">
        {strength.title}
      </h4>

      {/* Description */}
      <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
        {strength.description}
      </p>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px var(--color-accent-cyan)/10' }} />
    </motion.div>
  )
}

// Strengths Container Animation Variants
const strengthsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Workflow Item Component (Process3 Style)
function WorkflowItem({
  step,
  isLast
}: {
  step: WorkflowStep
  isLast: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step.step * 0.15, ease: 'easeOut' }}
      className="relative flex flex-col items-center text-center flex-1"
    >
      {/* Step Badge with Glow */}
      <motion.div
        className="relative mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[var(--color-accent-cyan)] rounded-full blur-xl opacity-30" />

        {/* Badge */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[var(--color-accent-cyan)] bg-[var(--color-surface-elevated)] flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold font-orbitron bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-gold)] bg-clip-text text-transparent">
            {String(step.step).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Title */}
      <h4 className="text-lg md:text-xl font-bold font-orbitron text-[var(--color-text-primary)] mb-3">
        {step.title}
      </h4>

      {/* Description */}
      <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed max-w-[280px]">
        {step.description}
      </p>

      {/* Connector Line (Desktop only, not for last item) */}
      {!isLast && (
        <div className="hidden md:block absolute top-8 md:top-10 left-[calc(50%+2.5rem)] md:left-[calc(50%+3rem)] w-[calc(100%-5rem)] md:w-[calc(100%-6rem)] h-px">
          <div className="w-full h-full bg-gradient-to-r from-[var(--color-accent-cyan)]/60 via-[var(--color-accent-gold)]/40 to-transparent" />
        </div>
      )}
    </motion.div>
  )
}

// Workflow Container Animation Variants
const workflowContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

// Main Profile Component
export function Profile({
  name,
  nameEn,
  bio,
  profileImage,
  strengths,
  workflow,
  socialLinks
}: ProfileProps) {
  return (
    <section id="profile">
      {/* Hero Section - Full Background Photo */}
      <ProfileHero
        image={profileImage}
        name={name}
        nameEn={nameEn}
        bio={bio}
        socialLinks={socialLinks}
      />

      {/* Strengths and Workflow Sections */}
      <div className="py-20 md:py-32 bg-[var(--color-background)]">
        <Container>
          <div className="flex flex-col gap-24">

          {/* Strengths - Feature277 Style */}
          {strengths && strengths.length > 0 && (
            <div className="flex flex-col gap-12">
              {/* Section Header */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold font-orbitron text-[var(--color-text-primary)] mb-3">
                  選ばれる理由
                </h3>
                <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-sm md:text-base">
                  AI技術と長年のデザイン経験を組み合わせ、独自の価値を提供します
                </p>
              </div>

              {/* Strengths Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={strengthsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {strengths.map((strength, index) => (
                  <StrengthCard
                    key={index}
                    strength={strength}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Workflow - Process3 Style */}
          {workflow && workflow.length > 0 && (
            <div className="flex flex-col gap-12">
              {/* Section Title */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold font-orbitron text-[var(--color-text-primary)]">
                  制作フロー
                </h3>
                <p className="text-[var(--color-text-muted)] mt-2 text-sm md:text-base">
                  How I Work
                </p>
              </div>

              {/* Workflow Container - Horizontal on Desktop, Vertical on Mobile */}
              <motion.div
                className="flex flex-col md:flex-row gap-8 md:gap-4"
                variants={workflowContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {workflow.map((step, index) => (
                  <WorkflowItem
                    key={step.step}
                    step={step}
                    isLast={index === workflow.length - 1}
                  />
                ))}
              </motion.div>
            </div>
          )}
          </div>
        </Container>
      </div>
    </section>
  )
}
