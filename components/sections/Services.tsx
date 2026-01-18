'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { staggerFastContainer, fadeInUp } from '@/lib/animations'

interface Service {
  _id: string
  title: string
  description: string
  icon: string
  order: number
}

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {
  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col gap-12">
          {/* Section Heading */}
          <div className="text-center flex flex-col gap-4">
            <Heading level="h2" decorative centered>
              Services
            </Heading>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
              AI技術を活用した高品質なクリエイティブサービス
            </p>
          </div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerFastContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {services.map((service) => (
              <motion.div key={service._id} variants={fadeInUp}>
                <Card>
                  <div className="flex flex-col items-center text-center gap-6">
                    <ServiceIcon icon={service.icon} />
                    <h3 className="text-2xl font-bold font-orbitron text-[var(--color-text-primary)]">
                      {service.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
