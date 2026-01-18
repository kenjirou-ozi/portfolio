'use client'

import { HeroPattern } from './sections/HeroPattern'
import { ServicesPattern } from './sections/ServicesPattern'
import { WorksPattern } from './sections/WorksPattern'
import { ProfilePattern } from './sections/ProfilePattern'
import { ContactPattern } from './sections/ContactPattern'

/**
 * Preview Page - All Design Patterns Combined
 *
 * This page displays all section patterns together for review.
 * Access at: /design-preview
 */
export function PreviewPage() {
  return (
    <div className="design-pattern-root">
      {/* Hero Section */}
      <HeroPattern
        catchphrase="AIで、映像の常識を変える"
        subCatchphrase="AI動画・AI漫画・デザインで、あなたのビジネスを加速"
      />

      {/* Services Section */}
      <ServicesPattern />

      {/* Works Section */}
      <WorksPattern />

      {/* Profile Section */}
      <ProfilePattern
        name="林 憲二郎"
        nameEn="Kenjiro Hayashi"
        bio="デザイン歴12年。大手企業での部署長経験を経て、AIを活用したクリエイティブ制作に特化。キャラクター一貫性技術で、高品質なAI動画を実現します。「AIで、映像の常識を変える」をモットーに、D2Cブランド、オンラインスクール、スタートアップなど幅広い業界のクライアントに対応。"
      />

      {/* Contact Section */}
      <ContactPattern
        email="contact@example.com"
      />

      {/* Footer placeholder */}
      <footer
        className="py-8 text-center"
        style={{
          background: 'var(--color-bg-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
          }}
        >
          Design Pattern Preview - Phase 3
        </p>
      </footer>
    </div>
  )
}
