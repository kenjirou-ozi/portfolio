【目的】
1. 環境変数・認証情報管理ドキュメントを作成する
2. プロジェクトをGitHubリポジトリにプッシュする

---

## タスク1: .env.md の作成

プロジェクトルートに環境変数・認証情報を管理するドキュメントを作成する。

【期待する結果】
1. プロジェクトルートに `.env.md` ファイルを作成
2. `.gitignore` に `.env.md` を追加して保護

【.env.md の内容】
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

---

## タスク2: GitHubへプッシュ

作成したプロジェクトをGitHubリポジトリにプッシュする。

【リモートリポジトリ情報】
- URL: https://github.com/kenjirou-ozi/portfolio.git
- ブランチ: main

【手順】
1. リモートリポジトリを追加（まだの場合）
2. 変更をステージング
3. コミット
4. mainブランチにプッシュ

【注意事項】
- プッシュ前に `.gitignore` に以下が含まれていることを確認:
  - .env.local
  - .env.md
  - node_modules/
- 機密情報がコミットに含まれていないことを確認

【期待する結果】
- GitHubリポジトリ（kenjirou-ozi/portfolio）にコードが反映されている
- .env.local と .env.md はプッシュされていない
