'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'

interface Service {
  _id: string
  title: string
  description: string
  order: number
}

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  }

  return (
    <Section id="services">
      <Container>
        <motion.div
          className="flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Heading */}
          <motion.div variants={itemVariants} className="text-center flex flex-col gap-4">
            <Heading level="h2" decorative centered>
              Services
            </Heading>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
              AI技術を活用した高品質なクリエイティブサービス
            </p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div variants={itemVariants} className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 flex items-center justify-center bg-[var(--color-surface)] border-2 border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-background)] transition-all duration-300 shadow-[var(--glow-cyan)]"
              aria-label="前のサービスを表示"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Carousel */}
            <div ref={emblaRef} className="overflow-hidden mx-8">
              <div className="flex gap-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <Card className="h-full">
                      <div className="flex flex-col text-center gap-6 p-2">
                        {/* Decorative number */}
                        <div className="flex justify-center">
                          <span className="font-orbitron text-5xl font-black text-[var(--color-accent-cyan)] opacity-20">
                            {String(service.order).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold font-orbitron text-[var(--color-text-primary)]">
                          {service.title}
                        </h3>
                        <p className="text-[var(--color-text-muted)] leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 flex items-center justify-center bg-[var(--color-surface)] border-2 border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-background)] transition-all duration-300 shadow-[var(--glow-cyan)]"
              aria-label="次のサービスを表示"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
