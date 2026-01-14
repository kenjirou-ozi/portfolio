#!/bin/bash
# =============================================================================
# Alacritty セットアップスクリプト
# 目的: Claude Code用に最適化されたAlacrittyの自動セットアップ
# 対象: macOS
# =============================================================================

set -e  # エラーが発生したら即座に終了

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ロゴ表示
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║         Alacritty セットアップスクリプト                     ║"
echo "║         Claude Code 最適化版                                  ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo

# 関数: ステップ表示
print_step() {
    echo -e "${BLUE}[ステップ $1/$2]${NC} $3"
}

# 関数: 成功メッセージ
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 関数: 警告メッセージ
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 関数: エラーメッセージ
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# ステップ1: Homebrewのチェック
print_step 1 5 "Homebrewの確認"
if ! command -v brew &> /dev/null; then
    print_error "Homebrewがインストールされていません"
    echo "以下のコマンドでHomebrewをインストールしてください："
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    exit 1
fi
print_success "Homebrew が見つかりました ($(brew --version | head -1))"
echo

# ステップ2: Alacrittyのインストール確認
print_step 2 5 "Alacrittyのインストール確認"
if command -v alacritty &> /dev/null; then
    print_warning "Alacritty は既にインストールされています ($(alacritty --version))"
    read -p "再インストールしますか？ (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        brew reinstall --cask alacritty
        print_success "Alacritty を再インストールしました"
    else
        print_success "既存のインストールを使用します"
    fi
else
    echo "Alacritty をインストール中..."
    brew install --cask alacritty
    print_success "Alacritty のインストールが完了しました"
fi
echo

# ステップ3: 設定ディレクトリの作成
print_step 3 5 "設定ディレクトリの確認"
CONFIG_DIR="$HOME/.config/alacritty"
if [ ! -d "$CONFIG_DIR" ]; then
    mkdir -p "$CONFIG_DIR"
    print_success "設定ディレクトリを作成しました: $CONFIG_DIR"
else
    print_success "設定ディレクトリが既に存在します: $CONFIG_DIR"
fi
echo

# ステップ4: 設定ファイルの確認
print_step 4 5 "設定ファイルの確認"
CONFIG_FILE="$CONFIG_DIR/alacritty.yml"
if [ -f "$CONFIG_FILE" ]; then
    print_success "設定ファイルが見つかりました: $CONFIG_FILE"
    echo "設定内容の確認："
    echo "---"
    head -20 "$CONFIG_FILE"
    echo "..."
    echo "---"
else
    print_error "設定ファイルが見つかりません: $CONFIG_FILE"
    echo "設定ファイルは既に作成されているはずです。"
    echo "もし存在しない場合は、Claude に設定ファイルの作成を依頼してください。"
    exit 1
fi
echo

# ステップ5: 動作確認
print_step 5 5 "動作確認"
echo "Alacritty の起動テストを実行します..."
if alacritty --version &> /dev/null; then
    print_success "Alacritty は正常に動作しています"
    echo
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✨ セットアップが完了しました！ ✨${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo
    echo "📋 次のステップ："
    echo "  1. Alacritty を起動:     alacritty"
    echo "  2. Claude Code を起動:   alacritty -e claude"
    echo "  3. 設定をカスタマイズ:   $CONFIG_FILE"
    echo
    echo "📖 詳細なガイド："
    echo "  - セットアップガイド: claudedocs/alacritty-setup-guide.md"
    echo "  - クイックリファレンス: claudedocs/alacritty-quick-reference.md"
    echo
    echo "🎯 最適化された機能："
    echo "  ✅ 50,000行のスクロールバッファ"
    echo "  ✅ 大量テキストペースト時のフリーズ防止"
    echo "  ✅ 軽量レンダリング設定"
    echo "  ✅ 日本語フォント対応"
    echo
    read -p "Alacritty を今すぐ起動しますか？ (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Alacritty を起動しています..."
        open -a Alacritty
    fi
else
    print_error "Alacritty の起動に失敗しました"
    exit 1
fi
