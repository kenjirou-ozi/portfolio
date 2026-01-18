import { Metadata } from 'next'
import { PreviewPage } from '@/src/design-patterns/PreviewPage'
import '@/src/design-patterns/design-system/index.css'

export const metadata: Metadata = {
  title: 'Design Preview | Portfolio',
  description: 'Phase 3 - 新規デザインパターンのプレビュー',
}

/**
 * Design Preview Route
 *
 * Access at: http://localhost:3000/design-preview
 *
 * This page displays the new design patterns created in Phase 3,
 * completely separate from the existing components.
 */
export default function DesignPreviewPage() {
  return <PreviewPage />
}
