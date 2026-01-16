# Sanity API Token 取得手順

テストデータをスクリプトで自動投入するために、Sanity API Token が必要です。

## 手順

### 1. Sanity Manage にアクセス

https://www.sanity.io/manage/personal/project/c1jyl9jh

### 2. 「API」タブを選択

左側のメニューから「API」をクリック

### 3. 「Tokens」セクションに移動

「Add API token」ボタンをクリック

### 4. トークンを作成

- **Label**: `Development Token` （任意の名前）
- **Permissions**: `Editor` を選択（読み書き権限）
- 「Create」ボタンをクリック

### 5. トークンをコピー

生成されたトークンをコピー（**一度しか表示されないので注意！**）

### 6. .env.local に追加

```bash
# .env.local に以下を追加
SANITY_API_TOKEN=your-generated-token-here
```

### 7. 開発サーバーを再起動

```bash
# 現在のサーバーを停止 (Ctrl+C)
# 再度起動
npm run dev
```

---

## 完了確認

以下のコマンドで環境変数が正しく設定されているか確認：

```bash
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.SANITY_API_TOKEN ? '✅ Token is set' : '❌ Token is missing')"
```

---

## セキュリティ注意事項

- **絶対に Git にコミットしないこと**（.gitignore で .env.local は除外済み）
- トークンを共有しないこと
- 不要になったトークンは削除すること

---

トークン設定完了後、以下のスクリプトを実行してテストデータを投入します：

```bash
node scripts/seed-data.mjs
```
