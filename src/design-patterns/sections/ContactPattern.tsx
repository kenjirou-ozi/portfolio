'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { Container, Section, BackgroundGlow } from '../components/Container'
import {
  staggerContainer,
  staggerItem,
  scrollReveal,
  viewportConfig,
} from '../design-system/animations'

interface ContactPatternProps {
  email?: string
  phone?: string
}

/**
 * Contact Section Pattern - Tech Bold + Creative Edge
 *
 * Features:
 * - Clean form with proper spacing and typography
 * - Glowing input focus states
 * - Split layout with info sidebar
 * - Generous negative space (per frontend-design SKILL)
 */
export function ContactPattern({
  email = 'contact@example.com',
  phone,
}: ContactPatternProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formState)
  }

  const services = [
    { value: '', label: 'サービスを選択' },
    { value: 'ai-video', label: 'AI動画制作' },
    { value: 'ai-manga', label: 'AI漫画制作' },
    { value: 'design', label: 'デザイン' },
    { value: 'other', label: 'その他' },
  ]

  // Input styles with proper focus states
  const getInputStyle = (fieldName: string) => ({
    background: '#14141F',
    border: focusedField === fieldName ? '1px solid #00D4FF' : '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: focusedField === fieldName ? '0 0 20px rgba(0, 212, 255, 0.15)' : 'none',
    color: '#FFFFFF',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    transition: 'all 0.3s ease',
  })

  return (
    <Section id="contact" background="base">
      {/* Background decorations */}
      <BackgroundGlow position="center" color="primary" size="lg" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#00D4FF 1px, transparent 1px),
            linear-gradient(90deg, #00D4FF 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <Container>
        <SectionHeading
          label="Contact"
          title="お問い合わせ"
          subtitle="プロジェクトのご相談、お見積もりなど、お気軽にお問い合わせください"
          align="center"
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Form */}
          <motion.div
            variants={scrollReveal}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label
                  className="block mb-3 text-sm font-medium"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  お名前 <span style={{ color: '#FF6B35' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 rounded-lg outline-none"
                  style={getInputStyle('name')}
                  placeholder="山田 太郎"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block mb-3 text-sm font-medium"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  メールアドレス <span style={{ color: '#FF6B35' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 rounded-lg outline-none"
                  style={getInputStyle('email')}
                  placeholder="email@example.com"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  className="block mb-3 text-sm font-medium"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  会社名
                </label>
                <input
                  type="text"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 rounded-lg outline-none"
                  style={getInputStyle('company')}
                  placeholder="株式会社〇〇"
                />
              </div>

              {/* Service */}
              <div>
                <label
                  className="block mb-3 text-sm font-medium"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  ご希望のサービス
                </label>
                <select
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  onFocus={() => setFocusedField('service')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 rounded-lg outline-none cursor-pointer"
                  style={{
                    ...getInputStyle('service'),
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                    paddingRight: '48px',
                  }}
                >
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block mb-3 text-sm font-medium"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  お問い合わせ内容 <span style={{ color: '#FF6B35' }}>*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 rounded-lg outline-none resize-y min-h-[160px]"
                  style={getInputStyle('message')}
                  placeholder="ご相談内容をお聞かせください"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button variant="primary" size="lg" className="w-full">
                  送信する
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            variants={staggerItem}
            className="lg:col-span-2"
          >
            <div
              className="p-8 lg:p-10 rounded-2xl h-full"
              style={{
                background: '#0D0D12',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h3
                className="text-xl font-semibold mb-8"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  color: '#FFFFFF',
                }}
              >
                お問い合わせ先
              </h3>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(0, 212, 255, 0.1)',
                      color: '#00D4FF',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm mb-1"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      メール
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="text-base hover:underline"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: '#00D4FF',
                      }}
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(255, 107, 53, 0.1)',
                      color: '#FF6B35',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm mb-1"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      返信目安
                    </p>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: '#FFFFFF',
                      }}
                    >
                      24時間以内
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="my-10 h-px"
                style={{ background: 'rgba(255, 255, 255, 0.08)' }}
              />

              {/* Quick links */}
              <div>
                <p
                  className="text-sm mb-4"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  サービス資料
                </p>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  サービス資料をダウンロード
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
