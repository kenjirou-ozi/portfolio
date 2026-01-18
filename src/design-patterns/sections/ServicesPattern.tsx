'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { Container, Section, Grid, BackgroundGlow } from '../components/Container'
import { staggerContainer, staggerItem, viewportConfig } from '../design-system/animations'

interface Service {
  _id: string
  title: string
  description: string
  icon: string
}

interface ServicesPatternProps {
  services?: Service[]
}

// Service icons mapping
const serviceIcons: Record<string, ReactNode> = {
  video: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  manga: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  design: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
}

// Default services data
const defaultServices: Service[] = [
  {
    _id: '1',
    title: 'AI動画制作',
    description: 'キャラクター一貫性技術で、高品質なAI動画を制作。企業VP、SNS動画、教育コンテンツなど幅広く対応。',
    icon: 'video',
  },
  {
    _id: '2',
    title: 'AI漫画制作',
    description: 'AIを活用した漫画・イラスト制作。商品紹介、サービス説明、ストーリーコンテンツなど。',
    icon: 'manga',
  },
  {
    _id: '3',
    title: 'デザイン',
    description: '12年のデザイン経験を活かした、ロゴ・バナー・LP・印刷物など。ブランディングから納品まで一貫対応。',
    icon: 'design',
  },
]

/**
 * Services Section Pattern - Tech Bold
 *
 * Features:
 * - 3-column card grid with generous spacing
 * - Icon with gradient background
 * - Staggered reveal animation
 * - Hover glow effects
 * - Proper typography with inline styles
 */
export function ServicesPattern({
  services = defaultServices,
}: ServicesPatternProps) {
  return (
    <Section id="services" background="surface">
      {/* Background decorations */}
      <BackgroundGlow position="top-left" color="primary" size="md" />

      {/* Diagonal line decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-[1px] opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #00D4FF)',
          transform: 'rotate(-30deg) translateY(100px)',
        }}
      />

      <Container>
        <SectionHeading
          label="Services"
          title="サービス"
          subtitle="AIテクノロジーとデザインの力で、あなたのビジネスに価値を提供します"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <Grid cols={3}>
            {services.map((service, index) => (
              <motion.div key={service._id} variants={staggerItem}>
                <Card variant="glass" className="h-full">
                  {/* Icon with gradient background */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden"
                    style={{
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                    }}
                  >
                    {/* Icon glow */}
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.2), transparent 70%)',
                      }}
                    />
                    {/* Icon */}
                    <span style={{ color: '#00D4FF' }}>
                      {serviceIcons[service.icon] || serviceIcons.design}
                    </span>
                  </div>

                  {/* Service number */}
                  <div
                    className="absolute top-6 right-6 opacity-20"
                    style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontSize: '56px',
                      fontWeight: 700,
                      color: '#00D4FF',
                      lineHeight: 1,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(90deg, #00D4FF, #FF6B35)',
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Section>
  )
}
