# Portfolio Project - Next.js + Sanity CMS Setup

## プロジェクト概要
- **目的**: AI動画制作・デザインサービスのポートフォリオサイト
- **技術スタック**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + Sanity CMS
- **Sanity設定**: Project ID: c1jyl9jh, Dataset: production
- **特徴**: Sanity Studioを `/studio` ルートに埋め込み
- **完了日**: 2026-01-14

## 完了した実装

### 1. プロジェクト構造
```
portfolio/
├── app/
│   ├── studio/[[...tool]]/page.tsx  # Sanity Studio埋め込み
│   ├── page.tsx                      # ホームページ (Sanityデータ取得)
│   ├── layout.tsx                    # ルートレイアウト
│   └── globals.css                   # Tailwind CSSスタイル
├── sanity/
│   ├── env.ts                        # 環境変数エクスポート
│   ├── lib/
│   │   ├── client.ts                 # Sanityクライアント設定
│   │   └── queries.ts                # GROQクエリ定義
│   └── schemas/
│       └── index.ts                  # コンテンツスキーマ (post)
├── sanity.config.ts                  # Sanity Studio設定
├── .env.local                        # 環境変数 (Git管理外)
└── package.json
```

### 2. 依存関係
- **Next.js**: 16.1.1 (最新安定版)
- **React**: 19.0.0
- **Sanity**: 3.x
- **next-sanity**: 10.x
- **@sanity/vision**: 3.x
- **TypeScript**: 5.x
- **Tailwind CSS**: 3.x (新しい @tailwindcss/postcss プラグイン使用)

### 3. 環境変数設定
```bash
# .env.local (Git管理外)
NEXT_PUBLIC_SANITY_PROJECT_ID=c1jyl9jh
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-11
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
```

### 4. 主要ファイルの実装

#### `sanity.config.ts`
- Sanity Studio設定 (basePath: '/studio')
- structureTool, visionTool プラグイン統合
- スキーマタイプのインポート

#### `sanity/lib/client.ts`
- createClient による Sanity クライアント初期化
- CDN設定 (useCdn: true)
- 環境変数からの設定読み込み

#### `sanity/lib/queries.ts`
- 型安全な GROQ クエリ定義 (defineQuery)
- POSTS_QUERY: 投稿一覧取得
- POST_QUERY: 単一投稿取得

#### `sanity/schemas/index.ts`
- post スキーマ定義 (title, slug, excerpt, body, publishedAt)
- defineType, defineField によるスキーマ定義
- バリデーションルール設定

#### `app/studio/[[...tool]]/page.tsx`
- NextStudio コンポーネントでStudio埋め込み
- dynamic = 'force-static' で最適化
- メタデータとビューポート設定エクスポート

#### `app/page.tsx`
- Server Component によるデータ取得
- Sanity からの投稿一覧表示
- Studio へのリンク設置
- エラーハンドリング (.catch(() => []))

### 5. Git管理
- リポジトリ初期化完了
- 初期コミット作成済み (コミットハッシュ: 0c57271)
- `.env.local` は `.gitignore` で保護
- **GitHubリポジトリ**: https://github.com/kenjirou-ozi/portfolio.git

## 開発サーバー
- **URL**: http://localhost:3000
- **Studio URL**: http://localhost:3000/studio
- **状態**: 稼働中
- **起動時間**: 3.3秒
- **コンパイル時間**: 約7秒 (初回)

## 次のステップ

### 即座に実行可能
1. **Sanity Studio へのアクセス**: `http://localhost:3000/studio`
   - Sanityアカウントでログイン
   - コンテンツ作成・編集

2. **コンテンツ作成**: Studio で投稿作成
   - タイトル、スラッグ、本文入力
   - 保存後、ホームページに自動表示

3. **GitHubプッシュ**:
   ```bash
   git remote add origin https://github.com/kenjirou-ozi/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### カスタマイズ推奨

#### スキーマ拡張例
```typescript
// sanity/schemas/project.ts
const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI動画制作', value: 'ai-video' },
          { title: 'デザイン', value: 'design' },
          { title: 'その他', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    }),
    // ... その他のフィールド
  ],
})
```

#### ページ追加例
1. **プロジェクト一覧ページ**: `app/projects/page.tsx`
2. **プロジェクト詳細ページ**: `app/projects/[slug]/page.tsx`
3. **会社概要ページ**: `app/about/page.tsx`
4. **お問い合わせページ**: `app/contact/page.tsx`

#### スタイリング
- `app/globals.css` でカスタムスタイル
- Tailwind CSS ユーティリティクラス活用
- コンポーネントライブラリ統合検討 (shadcn/ui, Radix UI等)

## 技術的なポイント

### Sanity Studio 埋め込み
- `[[...tool]]` catch-all ルートで全Studioルーティング処理
- `NextStudio` コンポーネントによるシームレスな統合
- `basePath: '/studio'` でカスタムパス設定
- クライアントコンポーネント ('use client' ディレクティブ)

### パフォーマンス最適化
- Server Components によるサーバーサイドデータ取得
- `useCdn: true` でCDNキャッシュ活用
- `dynamic = 'force-static'` で静的生成
- Turbopack による高速開発体験

### 型安全性
- `defineQuery` による GROQ クエリの型推論
- TypeScript strict モード
- 環境変数の型チェック (non-null assertion)

### セキュリティ
- `.env.local` を Git 管理外
- `NEXT_PUBLIC_*` プレフィックスでクライアント公開制御
- API トークンは環境変数で管理

## トラブルシューティング

### Studio アクセス時の認証
- 初回アクセス時、Sanityアカウントログイン必要
- Project ID と Dataset が正しいか確認
- ブラウザでサードパーティCookie有効化

### データが表示されない
- Studio でコンテンツが作成されているか確認
- `POSTS_QUERY` のクエリ条件を確認 (`defined(slug.current)`)
- ブラウザコンソールでエラーチェック
- Sanity Vision でクエリテスト

### 開発サーバーの再起動
```bash
# バックグラウンドプロセス停止
kill $(lsof -t -i:3000)
# または
lsof -ti:3000 | xargs kill -9

# 再起動
npm run dev
```

### ビルドエラー
```bash
# キャッシュクリア
rm -rf .next
npm run build
```

## ベストプラクティス

### GROQ クエリ
- `defineQuery` で型安全なクエリ定義
- projection で必要なフィールドのみ取得
- reference フィールドは `->` で展開
- ソート条件を明示的に指定 (`order(publishedAt desc)`)

### スキーマ設計
- 再利用可能なフィールドは object タイプで定義
- validation でデータ品質を担保
- preview でStudio表示をカスタマイズ
- 適切な title と description でエディター体験向上

### パフォーマンス
- 画像は next/image コンポーネント使用
- ISR (Incremental Static Regeneration) 活用
- `revalidate` で適切なキャッシュ期間設定
- CDN キャッシュとの組み合わせ

## 学習リソース
- **Next.js App Router**: https://nextjs.org/docs/app
- **Sanity Documentation**: https://www.sanity.io/docs
- **next-sanity GitHub**: https://github.com/sanity-io/next-sanity
- **GROQ クエリ言語**: https://www.sanity.io/docs/groq
- **Sanity Studio**: https://www.sanity.io/docs/sanity-studio
- **Tailwind CSS**: https://tailwindcss.com/docs

## プロジェクト履歴

### 2026-01-14: 初期セットアップ完了
- Next.js + Sanity CMS プロジェクト作成
- Sanity Studio 埋め込み実装
- サンプルスキーマとクエリ作成
- Git 初期化とコミット
- 開発サーバー起動確認

### 次回セッションでの推奨作業
1. プロジェクト用スキーマ作成 (project, category等)
2. ページ追加 (プロジェクト一覧、詳細ページ)
3. UI/UX デザイン実装
4. GitHub プッシュとデプロイ設定
