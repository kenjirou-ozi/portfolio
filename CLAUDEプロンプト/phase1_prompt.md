【目的】
AI動画制作・デザインサービスのポートフォリオサイト用に、Next.js + Sanity CMSのプロジェクトを新規作成したい。

【背景・意図】
Sanity Studioを `/studio` ルートに埋め込む形式（Embedded Studio）で構築する。
コンテンツ編集者がブラウザから /studio にアクセスしてコンテンツを管理できるようにする。

【プロジェクト情報】
- プロジェクト名: portfolio
- Sanity Project ID: c1jyl9jh
- Sanity Dataset: production
- GitHubリポジトリ: https://github.com/kenjirou-ozi/portfolio.git

【技術スタック】
- Next.js（App Router）
- TypeScript
- Tailwind CSS
- Sanity CMS（next-sanityツールキット使用）

【期待する結果】
1. Next.js + TypeScript + Tailwind CSSのプロジェクトが作成されている
2. next-sanityがインストールされ、Sanity Studioが /studio で動作する
3. 環境変数ファイル（.env.local）が作成され、Sanity認証情報が設定されている
4. 開発サーバー（localhost:3000）でサイトが表示される
5. localhost:3000/studio でSanity Studioが表示される

【注意事項】
- App Routerを使用すること
- 最新の安定版を使用すること
- .env.localに機密情報を設定し、.gitignoreに含まれていることを確認すること

【参考情報】
next-sanity公式: https://github.com/sanity-io/next-sanity
