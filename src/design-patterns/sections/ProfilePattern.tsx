'use client'

import { motion } from 'framer-motion'
import { Card } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { Container, Section, Grid, BackgroundGlow } from '../components/Container'
import {
  staggerContainer,
  staggerItem,
  scrollReveal,
  scrollRevealLeft,
  viewportConfig,
} from '../design-system/animations'

interface Strength {
  title: string
  description: string
}

interface WorkflowStep {
  step: number
  title: string
  description: string
}

interface ProfilePatternProps {
  name?: string
  nameEn?: string
  bio?: string
  strengths?: Strength[]
  workflow?: WorkflowStep[]
}

// Default data
const defaultStrengths: Strength[] = [
  {
    title: 'キャラクター一貫性技術',
    description: 'AI動画でキャラクターの一貫性を保てる希少な技術。ブランドキャラクターの動画展開に最適。',
  },
  {
    title: '12年のデザイン経験',
    description: '部署長レベルの実績。品質とスピードの両立が可能。',
  },
  {
    title: 'ワンストップ対応',
    description: '企画・構成から動画編集、デザインまで一貫して対応。コミュニケーションコスト削減。',
  },
]

const defaultWorkflow: WorkflowStep[] = [
  { step: 1, title: 'ヒアリング', description: '課題と目標の明確化' },
  { step: 2, title: '企画・構成', description: 'コンセプト設計' },
  { step: 3, title: '制作', description: 'AI活用で効率的に' },
  { step: 4, title: '納品', description: '修正対応込み' },
]

/**
 * Profile Section Pattern - Tech Bold + Creative Edge
 *
 * Features:
 * - Split layout with bio and image
 * - Strengths grid with icons
 * - Horizontal workflow timeline
 * - Animated counters and reveals
 * - Generous spacing throughout
 */
export function ProfilePattern({
  name = '林 憲二郎',
  nameEn = 'Kenjiro Hayashi',
  bio = 'デザイン歴12年。大手企業での部署長経験を経て、AIを活用したクリエイティブ制作に特化。キャラクター一貫性技術で、高品質なAI動画を実現します。',
  strengths = defaultStrengths,
  workflow = defaultWorkflow,
}: ProfilePatternProps) {
  return (
    <Section id="profile" background="surface">
      {/* Background decorations */}
      <BackgroundGlow position="top-right" color="primary" size="md" />
      <BackgroundGlow position="bottom-left" color="accent" size="sm" />

      <Container>
        <SectionHeading
          label="Profile"
          title="プロフィール"
        />

        {/* Bio Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Left: Photo/Visual */}
          <motion.div variants={scrollRevealLeft} className="relative">
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #0D0D12 0%, #14141F 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Placeholder for profile image */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 53, 0.1))',
                }}
              >
                <div
                  className="text-center"
                  style={{
                    fontFamily: "'Chakra Petch', sans-serif",
                    fontSize: '40px',
                    fontWeight: 700,
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {name.charAt(0)}
                </div>
              </div>

              {/* Decorative frame */}
              <div
                className="absolute inset-4 border-2 rounded-xl pointer-events-none"
                style={{ borderColor: 'rgba(0, 212, 255, 0.2)', opacity: 0.3 }}
              />
            </div>

            {/* Floating stats card */}
            <motion.div
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 p-6 rounded-xl"
              style={{
                background: '#14141F',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ delay: 0.3 }}
            >
              <div
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: '40px',
                  fontWeight: 700,
                  color: '#00D4FF',
                  lineHeight: 1,
                }}
              >
                12
                <span
                  style={{
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginLeft: '4px',
                  }}
                >
                  年
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '4px',
                }}
              >
                デザイン経験
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Bio text */}
          <motion.div variants={scrollReveal} className="flex flex-col justify-center">
            {/* Name */}
            <div className="mb-8">
              <h3
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                {name}
              </h3>
              {nameEn && (
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    letterSpacing: '0.025em',
                    marginTop: '8px',
                  }}
                >
                  {nameEn}
                </p>
              )}
            </div>

            {/* Bio */}
            <p
              className="mb-10"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.7,
              }}
            >
              {bio}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-12">
              {[
                { value: '100+', label: '制作実績' },
                { value: '50+', label: '取引先企業' },
              ].map((stat, index) => (
                <div key={index}>
                  <div
                    style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#00D4FF',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Strengths Section */}
        <div className="mb-24">
          <motion.h3
            className="text-center mb-16"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: '24px',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            強み
          </motion.h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Grid cols={3}>
              {strengths.map((strength, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card variant="bordered" className="h-full text-center">
                    {/* Number indicator */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
                        color: '#07070A',
                        fontFamily: "'Chakra Petch', sans-serif",
                        fontSize: '18px',
                        fontWeight: 700,
                      }}
                    >
                      {index + 1}
                    </div>

                    <h4
                      className="mb-4"
                      style={{
                        fontFamily: "'Chakra Petch', sans-serif",
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      {strength.title}
                    </h4>

                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: 1.7,
                      }}
                    >
                      {strength.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </div>

        {/* Workflow Timeline */}
        <div>
          <motion.h3
            className="text-center mb-16"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: '24px',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
          >
            制作フロー
          </motion.h3>

          <motion.div
            className="relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {/* Connection line */}
            <div
              className="hidden lg:block absolute top-8 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, #00D4FF, #FF6B35)',
                opacity: 0.3,
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {workflow.map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative text-center"
                >
                  {/* Step circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                    style={{
                      background: '#14141F',
                      border: '2px solid #00D4FF',
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Chakra Petch', sans-serif",
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#00D4FF',
                      }}
                    >
                      {item.step}
                    </span>
                  </div>

                  <h4
                    className="mb-3"
                    style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
