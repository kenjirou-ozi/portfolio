'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    },
  }

  return (
    <Section id="contact">
      <Container>
        <motion.div
          className="max-w-3xl mx-auto text-center flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <Heading level="h2" decorative centered>
              お問い合わせ
            </Heading>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl text-[var(--color-text-secondary)] leading-relaxed"
          >
            AI動画制作・AI漫画・デザインに関するご相談は、
            <br />
            お気軽にお問い合わせください。
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              href="mailto:contact@example.com"
              variant="primary"
              size="lg"
            >
              メールで問い合わせる
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 flex flex-col gap-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-[var(--color-border-medium)]" />
              <span className="text-sm text-[var(--color-text-muted)]">または</span>
              <div className="w-12 h-px bg-[var(--color-border-medium)]" />
            </div>

            <div className="flex items-center justify-center gap-8">
              <a
                href="https://twitter.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-secondary)] transition-colors duration-300 relative inline-flex items-center gap-2 no-underline hover:text-[var(--color-accent-cyan)]"
              >
                <span className="text-[var(--color-accent-cyan)]">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
