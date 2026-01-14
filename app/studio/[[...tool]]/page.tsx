import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// パフォーマンス最適化のため静的生成を強制
export const dynamic = 'force-static'

// メタデータとビューポート設定をエクスポート
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
