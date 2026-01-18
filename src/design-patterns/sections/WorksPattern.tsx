'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardImage } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { Button } from '../components/Button'
import { Container, Section, Grid, BackgroundGlow } from '../components/Container'
import { staggerContainer, staggerItem, viewportConfig } from '../design-system/animations'

interface Work {
  _id: string
  title: string
  category: string
  description: string
  videoUrl?: string
  duration?: string
  targetCustomer?: string
  featured?: boolean
}

interface WorksPatternProps {
  works?: Work[]
}

// Category filter options
const categories = [
  { id: 'all', label: 'すべて' },
  { id: 'ai-video', label: 'AI動画' },
  { id: 'ai-manga', label: 'AI漫画' },
  { id: 'design', label: 'デザイン' },
]

// Default works data
const defaultWorks: Work[] = [
  {
    _id: '1',
    title: 'D2Cブランド プロモーション動画',
    category: 'ai-video',
    description: '化粧品ブランドのSNS向けプロモーション動画。キャラクター一貫性技術で高品質な映像を実現。',
    duration: '30秒',
    targetCustomer: 'D2Cブランド',
    featured: true,
  },
  {
    _id: '2',
    title: 'SaaS製品 解説漫画',
    category: 'ai-manga',
    description: 'プロダクトの使い方を分かりやすく解説する漫画コンテンツ。',
    targetCustomer: 'スタートアップ',
    featured: true,
  },
  {
    _id: '3',
    title: 'オンラインスクール 教育動画',
    category: 'ai-video',
    description: '教育コンテンツ向けのAI動画制作。講師キャラクターの一貫性を保持。',
    duration: '5分',
    targetCustomer: 'オンラインスクール',
    featured: false,
  },
  {
    _id: '4',
    title: '飲食店 メニューデザイン',
    category: 'design',
    description: 'カフェのブランドリニューアルに伴うメニュー・販促物デザイン。',
    targetCustomer: '店舗経営者',
    featured: true,
  },
]

/**
 * Works Section Pattern - Creative Edge
 *
 * Features:
 * - Category filter with animated indicator
 * - Masonry-style grid layout
 * - Video thumbnail with play overlay
 * - Hover reveal for details
 * - Generous spacing throughout
 */
export function WorksPattern({
  works = defaultWorks,
}: WorksPatternProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredWorks = activeCategory === 'all'
    ? works
    : works.filter(work => work.category === activeCategory)

  return (
    <Section id="works" background="base">
      {/* Background decorations */}
      <BackgroundGlow position="bottom-right" color="accent" size="lg" />

      {/* Corner decoration */}
      <div
        className="absolute top-0 left-0 w-32 h-32 border-t border-l opacity-10"
        style={{ borderColor: '#00D4FF' }}
      />

      <Container>
        <SectionHeading
          label="Works"
          title="制作実績"
          subtitle="AI動画・AI漫画・デザインの実績をご紹介します"
        />

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="relative px-6 py-3 rounded-full transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: activeCategory === cat.id ? '#07070A' : 'rgba(255, 255, 255, 0.7)',
                background: activeCategory === cat.id ? '#00D4FF' : 'transparent',
                border: `1px solid ${activeCategory === cat.id ? '#00D4FF' : 'rgba(255, 255, 255, 0.08)'}`,
              }}
            >
              {cat.label}
              {/* Active glow */}
              {activeCategory === cat.id && (
                <motion.span
                  className="absolute inset-0 rounded-full -z-10"
                  layoutId="categoryGlow"
                  style={{
                    background: '#00D4FF',
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Works Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid cols={2} gap="large">
                {filteredWorks.map((work, index) => (
                  <motion.div
                    key={work._id}
                    variants={staggerItem}
                    layout
                  >
                    <div className="relative group cursor-pointer">
                      {/* Card with placeholder image */}
                      <CardImage
                        variant="default"
                        aspectRatio={index % 3 === 0 ? 'video' : 'square'}
                        imageSrc={`https://picsum.photos/seed/${work._id}/800/600`}
                        imageAlt={work.title}
                        className="overflow-hidden"
                      >
                        {/* Category Badge */}
                        <div
                          className="absolute top-4 left-4 px-3 py-1.5 rounded-full z-20"
                          style={{
                            background: 'rgba(7, 7, 10, 0.8)',
                            border: '1px solid rgba(0, 212, 255, 0.2)',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '12px',
                            color: '#00D4FF',
                            letterSpacing: '0.025em',
                          }}
                        >
                          {categories.find(c => c.id === work.category)?.label || work.category}
                        </div>

                        {/* Featured Badge */}
                        {work.featured && (
                          <div
                            className="absolute top-4 right-4 px-3 py-1.5 rounded-full z-20"
                            style={{
                              background: 'rgba(255, 107, 53, 0.1)',
                              border: '1px solid #FF6B35',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '12px',
                              color: '#FF6B35',
                            }}
                          >
                            Featured
                          </div>
                        )}

                        {/* Video Play Button Overlay */}
                        {work.videoUrl && (
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                       w-16 h-16 rounded-full flex items-center justify-center
                                       opacity-0 group-hover:opacity-100 transition-all duration-300
                                       scale-90 group-hover:scale-100 z-20"
                            style={{
                              background: '#00D4FF',
                              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                            }}
                          >
                            <svg
                              className="w-6 h-6 ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: '#07070A' }}
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}

                        {/* Content */}
                        <h3
                          className="mb-3"
                          style={{
                            fontFamily: "'Chakra Petch', sans-serif",
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#FFFFFF',
                          }}
                        >
                          {work.title}
                        </h3>

                        <p
                          className="mb-4 line-clamp-2"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 1.7,
                          }}
                        >
                          {work.description}
                        </p>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-4">
                          {work.duration && (
                            <span
                              className="flex items-center gap-2"
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '12px',
                                color: 'rgba(255, 255, 255, 0.5)',
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {work.duration}
                            </span>
                          )}
                          {work.targetCustomer && (
                            <span
                              className="flex items-center gap-2"
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '12px',
                                color: 'rgba(255, 255, 255, 0.5)',
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {work.targetCustomer}
                            </span>
                          )}
                        </div>
                      </CardImage>
                    </div>
                  </motion.div>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
        >
          <Button variant="secondary" size="lg">
            すべての実績を見る
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
        </motion.div>
      </Container>
    </Section>
  )
}
