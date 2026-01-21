'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'

interface Work {
  _id: string
  title: string
  category: 'ai-video' | 'ai-manga' | 'design'
  description: string
  videoUrl?: string
  targetCustomer?: string
  duration?: string
  publishedAt: string
  featured: boolean
  thumbnailUrl?: string
  thumbnailAlt?: string
}

interface WorksProps {
  works: Work[]
}

type CategoryFilter = 'all' | 'ai-video' | 'ai-manga' | 'design'

const categoryLabels: Record<string, string> = {
  'all': 'すべて',
  'ai-video': 'AI動画',
  'ai-manga': 'AI漫画',
  'design': 'デザイン',
}

// Extract YouTube video ID
function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

// Get YouTube thumbnail URL
function getYoutubeThumbnail(videoUrl: string): string | null {
  const videoId = extractYoutubeId(videoUrl)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
}

// Work Card Component
function WorkCard({
  work,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick
}: {
  work: Work
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}) {
  const thumbnailSrc = work.thumbnailUrl ||
    (work.videoUrl ? getYoutubeThumbnail(work.videoUrl) : null)

  const hasVideo = !!work.videoUrl

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Card Container */}
      <motion.div
        className="relative aspect-video overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border-subtle)]"
        animate={{
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Thumbnail Image */}
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={work.thumbnailAlt || work.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-elevated)]">
            <span className="text-4xl opacity-30">
              {work.category === 'ai-video' ? '🎬' : work.category === 'ai-manga' ? '📚' : '🎨'}
            </span>
          </div>
        )}

        {/* Play Icon Overlay for Video Works */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-[var(--color-background)]/80 flex items-center justify-center border border-[var(--color-accent-cyan)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0.6,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              style={{ boxShadow: 'var(--glow-cyan)' }}
            >
              <svg
                className="w-6 h-6 text-[var(--color-accent-cyan)] ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        )}

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content Overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="teal" className="mb-2">
            {categoryLabels[work.category]}
          </Badge>
          <h3 className="font-orbitron text-lg font-semibold text-[var(--color-text-primary)] line-clamp-2">
            {work.title}
          </h3>
        </motion.div>

        {/* Featured Badge */}
        {work.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="gold">Featured</Badge>
          </div>
        )}

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-[var(--color-accent-cyan)] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ boxShadow: isHovered ? 'var(--glow-cyan)' : 'none' }}
        />
      </motion.div>
    </motion.article>
  )
}

// Work Modal Component
function WorkModal({
  work,
  onClose
}: {
  work: Work
  onClose: () => void
}) {
  const youtubeId = work.videoUrl ? extractYoutubeId(work.videoUrl) : null
  const thumbnailSrc = work.thumbnailUrl ||
    (work.videoUrl ? getYoutubeThumbnail(work.videoUrl) : null)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-background)]/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] border border-[var(--color-border-medium)]"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[var(--color-background)]/80 border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)] transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video or Image */}
        <div className="relative aspect-video bg-[var(--color-background)]">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={work.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt={work.thumbnailAlt || work.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-elevated)]">
              <span className="text-6xl opacity-30">
                {work.category === 'ai-video' ? '🎬' : work.category === 'ai-manga' ? '📚' : '🎨'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Meta Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="teal">{categoryLabels[work.category]}</Badge>
            {work.targetCustomer && (
              <Badge variant="orange">{work.targetCustomer}</Badge>
            )}
            {work.duration && (
              <Badge variant="gold">{work.duration}</Badge>
            )}
            {work.featured && (
              <Badge variant="gold">Featured</Badge>
            )}
          </div>

          {/* Title */}
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            {work.title}
          </h2>

          {/* Decorative Line */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-[var(--color-accent-cyan)]" />
            <div className="w-2 h-2 rotate-45 bg-[var(--color-accent-gold)]" />
          </div>

          {/* Description */}
          {work.description && (
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {work.description}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Category Filter Component
function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  categories
}: {
  selectedCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  categories: CategoryFilter[]
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300
            border
            ${selectedCategory === category
              ? 'bg-[var(--color-accent-cyan)] text-[var(--color-background)] border-[var(--color-accent-cyan)]'
              : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-medium)] hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]'
            }
          `}
          style={{
            boxShadow: selectedCategory === category ? 'var(--glow-cyan)' : 'none'
          }}
        >
          {categoryLabels[category]}
        </button>
      ))}
    </div>
  )
}

// Main Works Component
export function Works({ works }: WorksProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)

  const categories: CategoryFilter[] = ['all', 'ai-video', 'ai-manga', 'design']

  const filteredWorks = selectedCategory === 'all'
    ? works
    : works.filter((work) => work.category === selectedCategory)

  const handleHover = useCallback((index: number) => {
    setHoveredIndex(index)
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  const handleCardClick = useCallback((work: Work) => {
    setSelectedWork(work)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedWork(null)
  }, [])

  return (
    <>
      <Section id="works">
        <Container>
          <div className="flex flex-col gap-12">
            {/* Section Heading */}
            <div className="flex flex-col gap-6">
              <Heading level="h2" decorative centered>
                Works
              </Heading>
              <p className="text-center text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
                これまでの制作実績
              </p>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />

            {/* Works Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredWorks.map((work, index) => (
                  <motion.div
                    key={work._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WorkCard
                      work={work}
                      index={index}
                      isHovered={hoveredIndex === null || hoveredIndex === index}
                      onHover={() => handleHover(index)}
                      onLeave={handleLeave}
                      onClick={() => handleCardClick(work)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredWorks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[var(--color-text-muted)]">
                  このカテゴリの作品はまだありません
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Work Modal */}
      <AnimatePresence>
        {selectedWork && (
          <WorkModal work={selectedWork} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  )
}
