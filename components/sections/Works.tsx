'use client'

import { motion } from 'framer-motion'
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
}

interface WorksProps {
  works: Work[]
}

const categoryLabels = {
  'ai-video': 'AI動画',
  'ai-manga': 'AI漫画',
  'design': 'デザイン',
}

const categoryIcons = {
  'ai-video': '🎬',
  'ai-manga': '📚',
  'design': '🎨',
}

export function Works({ works }: WorksProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    },
  }

  return (
    <Section id="works">
      <Container>
        <div className="flex flex-col gap-16">
          {/* Section Heading */}
          <div className="flex flex-col gap-6">
            <Heading level="h2" decorative centered>
              Works
            </Heading>
            <p className="text-center text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              これまでの制作実績
            </p>
          </div>

          {/* Works - Editorial Layout */}
          <div className="flex flex-col gap-20">
            {works.map((work, index) => {
              const isEven = index % 2 === 0
              const isFeatured = work.featured

              return (
                <motion.article
                  key={work._id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative ${isFeatured ? 'pt-12' : ''}`}
                >
                  {/* Featured label */}
                  {isFeatured && (
                    <div className="absolute top-0 left-0 flex items-center gap-2">
                      <div className="w-8 h-px bg-[var(--color-accent-gold)]" />
                      <span className="text-xs tracking-widest uppercase text-[var(--color-accent-gold)] font-medium">
                        Featured Work
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-12 gap-12 items-center">
                    {/* Image Column */}
                    <div className={`${isFeatured ? 'col-span-7' : 'col-span-6'} relative ${isEven ? 'order-0' : 'order-1'}`}>
                      {/* Art Deco corner decoration */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[rgba(255,215,0,0.3)] pointer-events-none" />
                      <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[rgba(255,215,0,0.3)] pointer-events-none" />

                      <div className="relative aspect-video bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-lg overflow-hidden">
                        {/* Icon placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-7xl opacity-20">
                            {categoryIcons[work.category]}
                          </span>
                        </div>

                        {work.videoUrl && (
                          <img
                            src={`https://img.youtube.com/vi/${work.videoUrl.split('v=')[1]?.split('&')[0] || work.videoUrl}/hqdefault.jpg`}
                            alt={work.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`${isFeatured ? 'col-span-5' : 'col-span-6'} ${isEven ? 'text-left order-1' : 'text-right order-0'}`}>
                      <div className={`flex flex-col gap-6 ${isEven ? 'items-start' : 'items-end'}`}>
                        {/* Category Badge */}
                        <div className="flex gap-2">
                          <Badge variant="teal">{categoryLabels[work.category]}</Badge>
                          {work.targetCustomer && (
                            <Badge variant="orange">{work.targetCustomer}</Badge>
                          )}
                          {work.duration && (
                            <Badge variant="gold">{work.duration}</Badge>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-orbitron text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] leading-tight">
                          {work.title}
                        </h3>

                        {/* Decorative line */}
                        <div className={`flex items-center gap-2 ${isEven ? 'justify-start' : 'justify-end'}`}>
                          <div className="w-12 h-px bg-[var(--color-accent-cyan)]" />
                          <div className="w-2 h-2 rotate-45 bg-[var(--color-accent-gold)]" />
                        </div>

                        {/* Description */}
                        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-prose">
                          {work.description}
                        </p>

                        {/* Work number */}
                        <div className="pt-4">
                          <span className="text-4xl font-orbitron text-white/10 font-bold">
                            &ldquo;{String(index + 1).padStart(2, '0')}&rdquo;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* End decoration */}
          <div className="flex justify-center pt-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[var(--color-border-medium)]" />
              <div className="w-2 h-2 rotate-45 border border-[var(--color-accent-gold)]" />
              <div className="w-16 h-px bg-[var(--color-border-medium)]" />
              <div className="w-2 h-2 rotate-45 border border-[var(--color-accent-gold)]" />
              <div className="w-8 h-px bg-[var(--color-border-medium)]" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
