'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

interface FormData {
  name: string
  email: string
  company: string
  message: string
  deadline: string
  budget: string
}

interface FormErrors {
  [key: string]: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  message: '',
  deadline: '',
  budget: '',
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          const errors: FormErrors = {}
          data.errors.forEach((err: { field: string; message: string }) => {
            errors[err.field] = err.message
          })
          setFieldErrors(errors)
        }
        throw new Error(data.message || '送信に失敗しました')
      }

      setStatus('success')
      setFormData(initialFormData)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : '予期しないエラーが発生しました')
    }
  }

  const inputClasses = `
    w-full px-4 py-3
    bg-[var(--color-surface)]
    border border-[var(--color-border-subtle)]
    text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-dim)]
    focus:outline-none focus:border-[var(--color-accent-cyan)] focus:shadow-[0_0_0_1px_var(--color-accent-cyan)]
    transition-all duration-300
  `

  const labelClasses = 'block text-sm font-medium text-[var(--color-text-secondary)] mb-2'

  const errorClasses = 'text-[var(--color-accent-pink)] text-sm mt-1'

  return (
    <Section id="contact">
      <Container>
        <motion.div
          className="max-w-2xl mx-auto flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <Heading level="h2" decorative centered>
              お問い合わせ
            </Heading>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-center text-lg text-[var(--color-text-secondary)] leading-relaxed"
          >
            AI動画制作・AI漫画・デザインに関するご相談は、
            <br />
            下記フォームよりお気軽にお問い合わせください。
          </motion.p>

          {/* Success Message */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12 px-8 bg-[var(--color-surface)] border border-[var(--color-accent-cyan)] shadow-[var(--glow-cyan)]"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                      送信完了
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      お問い合わせありがとうございます。
                      <br />
                      内容を確認の上、折り返しご連絡いたします。
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setStatus('idle')}
                  >
                    新しいお問い合わせ
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                variants={containerVariants}
              >
                {/* Error Banner */}
                {status === 'error' && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[rgba(255,0,110,0.1)] border border-[var(--color-accent-pink)] text-[var(--color-accent-pink)]"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className={labelClasses}>
                    お名前 <span className="text-[var(--color-accent-pink)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${inputClasses} ${fieldErrors.name ? 'border-[var(--color-accent-pink)]' : ''}`}
                    placeholder="山田 太郎"
                    disabled={status === 'loading'}
                  />
                  {fieldErrors.name && <p className={errorClasses}>{fieldErrors.name}</p>}
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className={labelClasses}>
                    メールアドレス <span className="text-[var(--color-accent-pink)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${inputClasses} ${fieldErrors.email ? 'border-[var(--color-accent-pink)]' : ''}`}
                    placeholder="example@example.com"
                    disabled={status === 'loading'}
                  />
                  {fieldErrors.email && <p className={errorClasses}>{fieldErrors.email}</p>}
                </motion.div>

                {/* Company (Optional) */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="company" className={labelClasses}>
                    会社名
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="株式会社〇〇"
                    disabled={status === 'loading'}
                  />
                </motion.div>

                {/* Two Column Row: Deadline & Budget */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Deadline */}
                  <div>
                    <label htmlFor="deadline" className={labelClasses}>
                      ご希望納期
                    </label>
                    <select
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className={inputClasses}
                      disabled={status === 'loading'}
                    >
                      <option value="">選択してください</option>
                      <option value="1週間以内">1週間以内</option>
                      <option value="2週間以内">2週間以内</option>
                      <option value="1ヶ月以内">1ヶ月以内</option>
                      <option value="2ヶ月以内">2ヶ月以内</option>
                      <option value="未定">未定・相談したい</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className={labelClasses}>
                      予算感
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={inputClasses}
                      disabled={status === 'loading'}
                    >
                      <option value="">選択してください</option>
                      <option value="〜10万円">〜10万円</option>
                      <option value="10〜30万円">10〜30万円</option>
                      <option value="30〜50万円">30〜50万円</option>
                      <option value="50〜100万円">50〜100万円</option>
                      <option value="100万円〜">100万円〜</option>
                      <option value="未定">未定・相談したい</option>
                    </select>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className={labelClasses}>
                    お問い合わせ内容 <span className="text-[var(--color-accent-pink)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`${inputClasses} resize-none ${fieldErrors.message ? 'border-[var(--color-accent-pink)]' : ''}`}
                    placeholder="ご依頼内容やご質問など、詳しくお聞かせください"
                    disabled={status === 'loading'}
                  />
                  {fieldErrors.message && <p className={errorClasses}>{fieldErrors.message}</p>}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'loading'}
                    className="w-full"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        送信中...
                      </span>
                    ) : (
                      '送信する'
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social Links */}
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
