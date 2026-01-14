Claude Code アップデート - 完全再インストールコマンド

## 📋 概要

Claude Code を完全にアンインストールして最新版を再インストールし、バージョンとインストール場所を確認します。

---

## 🎯 実行内容

このコマンドは以下の3つのステップを順次実行します：

### ステップ1: 完全再インストール
```bash
npm uninstall -g @anthropic-ai/claude-code && npm install -g @anthropic-ai/claude-code@latest
```

**実行内容:**
- 既存の Claude Code をグローバル環境からアンインストール
- 最新版の Claude Code を再インストール

**想定時間:** 5-10秒

---

### ステップ2: バージョン確認
```bash
claude --version
```

**実行内容:**
- インストールされた Claude Code のバージョンを表示

**期待される出力例:**
```
2.0.11 (Claude Code)
```

---

### ステップ3: インストール場所確認
```bash
which claude
```

**実行内容:**
- Claude Code の実行ファイルがインストールされている場所を表示

**期待される出力例:**
```
/usr/local/bin/claude
```

---

## ✅ 成功確認

以下の条件がすべて満たされた場合、インストール成功です：

1. **アンインストール成功**: "removed X packages" のメッセージ表示
2. **インストール成功**: "added X packages" のメッセージ表示
3. **バージョン表示**: バージョン番号が正常に表示される
4. **パス確認**: 実行ファイルのパスが表示される

---

## ❌ トラブルシューティング

### エラー: npm が見つからない
```
npm: command not found
```

**対処法:**
1. Node.js がインストールされているか確認
2. `node --version` と `npm --version` を実行
3. インストールされていない場合は Node.js をインストール

### エラー: 権限エラー
```
EACCES: permission denied
```

**対処法:**
- macOS/Linux: `sudo npm install -g @anthropic-ai/claude-code@latest`
- または npm のグローバルディレクトリの権限を修正

### エラー: claude コマンドが見つからない
```
claude: command not found
```

**対処法:**
1. ターミナルを再起動
2. `echo $PATH` で PATH 環境変数を確認
3. `/usr/local/bin` が PATH に含まれているか確認

---

## 📝 使用例

### 基本的な使用
```
/update
```

### 手動実行（ターミナルで）
```bash
npm uninstall -g @anthropic-ai/claude-code && npm install -g @anthropic-ai/claude-code@latest
claude --version
which claude
```

---

## 🔄 実行タイミング

以下の場合にこのコマンドを実行することを推奨します：

1. **新しいバージョンがリリースされたとき**
2. **Claude Code の動作に問題があるとき**
3. **クリーンインストールが必要なとき**
4. **環境をリセットしたいとき**

---

## 📚 関連情報

**公式ドキュメント**: https://docs.claude.com/en/docs/claude-code
**GitHub リポジトリ**: https://github.com/anthropics/claude-code
**リリースノート**: https://github.com/anthropics/claude-code/releases
