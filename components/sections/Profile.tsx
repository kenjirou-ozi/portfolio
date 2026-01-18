'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'
import { staggerFastContainer, fadeInUp } from '@/lib/animations'

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

interface ProfileProps {
  name: string
  nameEn?: string
  bio: string
  strengths: Strength[]
  workflow: WorkflowStep[]
}

export function Profile({ name, nameEn, bio, strengths, workflow }: ProfileProps) {
  return (
    <Section id="profile">
      <Container>
        <div className="flex flex-col gap-16">
          {/* Section Heading */}
          <div className="text-center">
            <Heading level="h2" decorative centered>
              Profile
            </Heading>
          </div>

          {/* Name & Bio */}
          <motion.div
            className="max-w-3xl mx-auto text-center flex flex-col gap-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-[clamp(2rem,5vw,2.5rem)] font-bold font-orbitron bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-pink)] bg-clip-text text-transparent mb-2">
                {name}
              </h3>
              {nameEn && (
                <p className="text-lg text-[var(--color-text-muted)]">{nameEn}</p>
              )}
            </div>
            <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
              {bio}
            </p>
          </motion.div>

          {/* Strengths */}
          {strengths && strengths.length > 0 && (
            <div className="flex flex-col gap-8">
              <h3 className="text-2xl font-bold font-orbitron text-center text-[var(--color-text-primary)]">
                強み
              </h3>
              <motion.div
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6"
                variants={staggerFastContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {strengths.map((strength, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card>
                      <div className="text-center flex flex-col gap-3">
                        <div className="text-4xl text-[var(--color-accent-cyan)] font-bold">
                          &ldquo;{String(index + 1).padStart(2, '0')}&rdquo;
                        </div>
                        <h4 className="text-xl font-bold font-orbitron text-[var(--color-text-primary)]">
                          {strength.title}
                        </h4>
                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                          {strength.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Workflow */}
          {workflow && workflow.length > 0 && (
            <div className="flex flex-col gap-8">
              <h3 className="text-2xl font-bold font-orbitron text-center text-[var(--color-text-primary)]">
                制作フロー
              </h3>
              <motion.div
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4"
                variants={staggerFastContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {workflow.map((step) => (
                  <motion.div key={step.step} variants={fadeInUp}>
                    <Card>
                      <div className="text-center flex flex-col gap-2">
                        <div className="text-[var(--color-accent-cyan)] font-orbitron text-lg font-bold">
                          STEP {step.step}
                        </div>
                        <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                          {step.title}
                        </h4>
                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
