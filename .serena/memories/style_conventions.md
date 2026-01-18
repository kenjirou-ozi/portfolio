# コードスタイル・規約

## TypeScript
- **strict mode**: 有効 (tsconfig.json)
- **パスエイリアス**: `@/*` → プロジェクトルート

## 命名規約
- **コンポーネント**: PascalCase (例: `Card.tsx`, `ServiceIcon.tsx`)
- **関数**: camelCase (例: `fetchData`, `handleClick`)
- **CSS変数**: kebab-case (例: `--color-accent-cyan`)
- **ファイル名**: PascalCase for components, camelCase for utilities

## コンポーネント構造
```tsx
// 1. 'use client' (必要時のみ)
'use client'

// 2. インポート
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

// 3. インターフェース定義
interface ComponentProps {
  children: ReactNode
  className?: string
}

// 4. コンポーネント (named export)
export function Component({ children, className = '' }: ComponentProps) {
  // 実装
}
```

## スタイリング規約
- **CSS変数**: globals.cssで定義、コンポーネントで参照
- **Tailwind**: ユーティリティクラス使用
- **インラインスタイル**: CSS変数参照時に使用 (`style={{ color: 'var(--color-accent-cyan)' }}`)
- **アニメーション**: Framer Motion variants パターン

## Sanityスキーマ
- **命名**: camelCase (例: `siteSettings`, `heroVideoUrl`)
- **日本語タイトル**: 管理画面用に日本語のtitleを設定
- **シングルトン**: siteSettings, profile

## ESLint
- Next.js推奨設定 (eslint-config-next)
- Core Web Vitals ルール有効

## コミットメッセージ
- 日本語で記述
- コンベンショナルコミット形式: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
