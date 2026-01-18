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

## ディレクトリ構成
```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ (SSR)
│   ├── globals.css        # グローバルスタイル (CSS変数定義)
│   └── studio/[[...tool]]/ # Sanity Studio (embedded)
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Services, Works, Profile, Contact
│   └── ui/                # Card, Button, Badge, Container, etc.
├── sanity/
│   ├── schemas/           # Sanityスキーマ定義
│   └── lib/               # クライアント, クエリ
├── lib/                   # ユーティリティ (animations.ts)
├── scripts/               # セットアップ・データ投入スクリプト
├── claudedocs/            # Claude作業ドキュメント
└── public/                # 静的アセット
```

## Sanityスキーマ
- **siteSettings**: サイト設定 (シングルトン)
- **profile**: プロフィール (シングルトン)
- **service**: サービス一覧
- **work**: 制作実績

## デザインシステム
- **テーマ**: ダークサイバーパンク風
- **カラー**: CSS変数で管理
  - `--color-accent-cyan`: シアン系アクセント
  - `--color-accent-pink`: ピンク系アクセント
  - `--color-surface`: 背景色
  - `--color-surface-elevated`: 浮き上がり背景
- **アニメーション**: Framer Motion variants使用
