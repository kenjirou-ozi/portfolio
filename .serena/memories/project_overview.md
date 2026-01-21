# Portfolio Project Overview

## プロジェクト概要
- **名前**: portfolio-temp
- **目的**: AI動画・AI漫画・デザインサービスのポートフォリオサイト
- **所有者**: 林 憲二郎 (Kenjiro Hayashi)
- **コンセプト**: 「AIで、映像の常識を変える」

## テックスタック
- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x (CSS変数ベース)
- **Animation**: Framer Motion 12.x
- **CMS**: Sanity 5.x (embedded studio at /studio)
- **Testing**: Playwright (E2E)

## ディレクトリ構成 (Updated 2025-01-18)
```
portfolio/ (122 files after cleanup)
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト (Orbitron + IBM Plex Sans)
│   ├── page.tsx           # ホームページ (SSR with Sanity)
│   ├── globals.css        # Tailwind CSS 4 + CSS変数
│   └── studio/[[...tool]]/ # Sanity Studio (embedded)
├── components/             # 本番コンポーネント (Tailwind classes)
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Services, Works, Profile, Contact
│   └── ui/                # Badge, Button, Card, Container, Heading, Section, ServiceIcon
├── sanity/
│   ├── schemas/           # Sanityスキーマ定義
│   └── lib/               # クライアント, クエリ
├── lib/                   # ユーティリティ (animations.ts)
├── scripts/               # セットアップ・データ投入スクリプト
├── claudedocs/            # Claude作業ドキュメント
└── public/                # 静的アセット
```

**Note**: `src/design-patterns/` and `app/design-preview/` were removed during cleanup (2025-01-18) as prototype code.

## Sanityスキーマ
- **siteSettings**: サイト設定 (シングルトン)
  - Hero動画トグル (YouTube/MP4切替)
  - キャッチフレーズ、SEO設定
- **profile**: プロフィール (シングルトン)
- **service**: サービス一覧 (iconフィールドなし)
- **work**: 制作実績

## 主要コンポーネント (Updated 2026-01-20)
- **Hero**: YouTube/MP4動画の条件付きレンダリング
- **Services**: Embla Carouselによるカルーセル表示
- **Works**: 制作実績グリッド
- **Profile**: 
  - ProfileHero: 背景写真レイアウト + テキストオーバーレイ
  - StrengthCard: Feature277スタイル（アイコン + ホバーエフェクト）
  - WorkflowItem: Process3スタイル（横並びステップ + コネクター）
- **Contact**: お問い合わせフォーム (Resend API)

## デザインシステム
- **テーマ**: ダークサイバーパンク風
- **カラー**: CSS変数で管理
  - `--color-accent-cyan`: シアン系アクセント
  - `--color-accent-pink`: ピンク系アクセント
  - `--color-surface`: 背景色
  - `--color-surface-elevated`: 浮き上がり背景
- **アニメーション**: Framer Motion variants使用
