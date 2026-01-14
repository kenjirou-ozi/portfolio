【目的】
プロジェクトルートに環境変数・認証情報を管理するドキュメント（.env.md）を作成したい。

【背景・意図】
本プロジェクトで使用する各サービスのID、APIキー、認証情報を一元管理し、
開発時やデプロイ時に参照できるようにする。
機密情報を含むため、.gitignoreに追加してGitHubにプッシュされないようにする。

【期待する結果】
1. プロジェクトルートに `.env.md` ファイルを作成
2. 以下のサービスごとにセクションを作成し、現在判明している情報を記載
   - Sanity（Project ID, Dataset, Organization ID）
   - GitHub（リポジトリURL, アカウント名）
   - Vercel（後で追加予定）
   - Resend（後で追加予定）
3. `.gitignore` に `.env.md` を追加して保護

【ファイル構成例】
```markdown
# 環境変数・認証情報管理

このファイルは機密情報を含むため、Gitで管理しないこと。

## Sanity
- Project ID: c1jyl9jh
- Dataset: production
- Organization ID: oflFzD5a9
- API Token: （後で追加）

## GitHub
- リポジトリURL: https://github.com/kenjirou-ozi/portfolio.git
- アカウント: kenjirou-ozi

## Vercel
- プロジェクト名: （後で追加）
- ドメイン: （後で追加）

## Resend
- API Key: （後で追加）
- 送信元ドメイン: （後で追加）

## 独自ドメイン
- ドメイン名: （後で追加）
- 管理サービス: （後で追加）
```

【注意事項】
- 必ず `.gitignore` に `.env.md` を追加すること
- 実際のAPIキーやパスワードは後から手動で追記する想定
