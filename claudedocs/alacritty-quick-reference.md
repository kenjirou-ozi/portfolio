# Alacritty クイックリファレンス

## インストール（初回のみ）

```bash
brew install --cask alacritty
```

## 起動方法

```bash
# 通常起動
alacritty

# Claude Codeを起動
alacritty -e claude

# 特定のディレクトリで起動
alacritty --working-directory ~/projects
```

## キーボードショートカット（macOS）

| 操作 | ショートカット |
|------|----------------|
| コピー | `⌘ + C` |
| ペースト | `⌘ + V` |
| 検索 | `⌘ + F` |
| 新しいウィンドウ | `⌘ + N` |
| フォントサイズ拡大 | `⌘ + +` |
| フォントサイズ縮小 | `⌘ + -` |
| フォントサイズリセット | `⌘ + 0` |

## 設定ファイルの場所

```
~/.config/alacritty/alacritty.yml
```

## よく使う設定変更

### フォントサイズ変更

```yaml
font:
  size: 14.0  # お好みのサイズに
```

### ウィンドウの透過度

```yaml
window:
  opacity: 0.95  # 0.0〜1.0
```

### スクロール速度

```yaml
scrolling:
  multiplier: 3  # 数値を増やすと速くなる
```

## トラブルシューティング

### 設定ファイルの構文チェック

```bash
alacritty --print-events
```

### ログ確認（詳細モード）

```bash
alacritty -vvv
```

### 設定ファイルの場所確認

```bash
echo ~/.config/alacritty/alacritty.yml
```

## パフォーマンス設定（現在の最適化）

✅ **既に設定済み**:
- スクロールバッファ: 50,000行
- レンダリング最適化: 有効
- 透過: 無効（パフォーマンス優先）
- カーソル点滅: 無効
- デバッグログ: 最小限

## 日本語表示

✅ **既に設定済み**:
- フォント: Menlo（macOS標準、日本語対応）
- 文字エンコーディング: UTF-8

## エイリアス設定（便利）

`~/.zshrc` に追加：

```bash
# Alacritty起動
alias al='alacritty'

# Alacritty + Claude Code
alias cc-al='alacritty -e claude'

# Alacritty + プロジェクトディレクトリ
alias al-proj='alacritty --working-directory ~/projects'
```

## おすすめワークフロー

```bash
# 1. Alacrittyを起動
alacritty

# 2. プロジェクトディレクトリに移動
cd ~/projects/my-app

# 3. Claude Codeを起動
claude

# または、1コマンドで
alacritty --working-directory ~/projects/my-app -e claude
```

---

**更新日**: 2026-01-14
