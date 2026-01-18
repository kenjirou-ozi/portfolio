# 推奨コマンド一覧

## 開発サーバー
```bash
npm run dev          # 開発サーバー起動 (http://localhost:3000)
```

## ビルド・本番
```bash
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動
```

## コード品質
```bash
npm run lint         # ESLintチェック
```

## Sanity Studio
- 開発時: http://localhost:3000/studio
- データ投入スクリプト: `node scripts/seed-data.mjs`
- データ確認スクリプト: `node scripts/verify-data.mjs`

## Git操作 (Darwin/macOS)
```bash
git status           # 状態確認
git diff             # 変更差分
git add .            # ステージング
git commit -m "..."  # コミット
git log --oneline -5 # 直近5件のログ
```

## ファイル操作 (Darwin/macOS)
```bash
ls -la               # ファイル一覧
find . -name "*.tsx" # ファイル検索
grep -r "pattern" .  # パターン検索
```

## 環境変数
- `.env.local`: 環境変数 (gitignore対象)
- `.env.md`: 環境変数ドキュメント (参照用)

必要な環境変数:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (データ投入時のみ)
