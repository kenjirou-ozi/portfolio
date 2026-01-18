'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#services', label: 'SERVICES' },
    { href: '#works', label: 'WORKS' },
    { href: '#profile', label: 'PROFILE' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b-2 border-[var(--color-accent-cyan)] shadow-[var(--glow-cyan)]'
          : 'bg-[rgba(10,10,10,0.8)] backdrop-blur-sm border-b border-[var(--color-border-subtle)]'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo / Site Name */}
          <motion.a
            href="#"
            className="font-orbitron text-2xl font-black tracking-wider uppercase relative text-[var(--color-text-primary)] no-underline"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">KENJIROU</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wider text-[var(--color-text-secondary)] no-underline relative transition-colors duration-300 hover:text-[var(--color-accent-cyan)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center py-2.5 px-8 border-2 border-[var(--color-accent-cyan)] font-semibold text-sm tracking-wider uppercase transition-all duration-300 relative overflow-hidden bg-[var(--color-accent-cyan)] text-[var(--color-background)] no-underline shadow-[var(--glow-cyan)] hover:brightness-110"
          >
            <span className="relative z-10">お問い合わせ</span>
            {/* Corner accents */}
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--color-accent-gold)]" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--color-accent-gold)]" />
          </a>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            className="py-6 border-t-2 border-[var(--color-border-medium)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium text-sm tracking-wider uppercase transition-colors duration-300 py-2 px-3 text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-accent-cyan)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="py-3 px-8 border-2 border-[var(--color-accent-cyan)] text-center font-semibold text-sm tracking-wider uppercase transition-all duration-300 bg-[var(--color-accent-cyan)] text-[var(--color-background)] shadow-[var(--glow-cyan)] no-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                お問い合わせ
              </a>
            </div>
          </motion.nav>
        )}
      </Container>

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)] to-transparent ${
          isScrolled ? 'opacity-60' : 'opacity-30'
        }`}
      />
    </motion.header>
  )
}
