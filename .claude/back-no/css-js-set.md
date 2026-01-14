---
name: css-js-set
description: CSS/JS構築要望時に必ずガイドを確認し、ガイドラインに準拠した実装を行う
category: setup
---

# CSS/JS Setup Command

CSS/JS構築要望があった場合、**必ず以下のガイドを確認**し、記載されているルールに従って実装してください。

## 📋 必須ガイド確認

### CSS構築時
1. **CSS構築ガイド**: `.claude/css-ja__guid/css-guid.md` を必ず読み込む
2. **命名規則**: `docs/naming.md` でクラス名・CSS変数名の重複確認
3. **環境設定**: `docs/ops.md` で環境別挙動・ビルド手順確認

### JS構築時
1. **JS構築ガイド**: `.claude/css-ja__guid/js-guid.md` を必ず読み込む
2. **命名規則**: `docs/naming.md` でtimeline名・trigger名・data属性名の重複確認
3. **環境設定**: `docs/ops.md` で環境別挙動・ビルド手順確認

### CSS + JS 同時構築時
1. **両ガイド**: `.claude/css-ja__guid/css-guid.md` と `js-guid.md` を両方読み込む
2. **命名規則**: `docs/naming.md` で全命名の重複確認
3. **環境設定**: `docs/ops.md` で環境別挙動・ビルド手順確認

## 🎯 実装フロー

### 0. CLAUDE.md自動構築・更新（最優先）
プロジェクトルートの `CLAUDE.md` を確認し、必要に応じて作成・更新:

**存在しない場合:**
```markdown
# プロジェクト設定

## CSS/JS構築ガイドライン

**重要**: CSS/JS構築要望時は、必ず以下のガイドを参照してください。

### CSS構築時
1. `.claude/css-ja__guid/css-guid.md` を必ず読み込む
2. `docs/naming.md` でクラス名・CSS変数名の重複確認
3. `docs/ops.md` で環境別挙動・ビルド手順確認

### JS構築時
1. `.claude/css-ja__guid/js-guid.md` を必ず読み込む
2. `docs/naming.md` でtimeline名・trigger名・data属性名の重複確認
3. `docs/ops.md` で環境別挙動・ビルド手順確認

### 実装原則
- ガイド内容に完全準拠すること
- 読み込み順・@layer構造・init/teardownパターンを厳守
- ガイド内チェックリストで実装後検証を実施

詳細: `/css-js-set` コマンドを使用
```

**既存の場合:**
- 「CSS/JS構築ガイドライン」セクションの有無を確認
- 存在しない場合のみ上記セクションを追記
- 既存の場合はスキップ

### 1. ガイド読み込み
該当するガイドファイルを **Read ツールで必ず読み込み**、内容を理解する

### 1.5. docs/ ディレクトリ・ファイル自動構築
`docs/naming.md` と `docs/ops.md` の存在を確認し、存在しない場合は自動作成:

**docs/ ディレクトリが存在しない場合:**
```bash
mkdir -p docs
```

**docs/naming.md が存在しない場合:**
```markdown
# 命名規則管理

## 概要
CSS/JS構築における命名の重複・競合を防ぐための予約簿。
新規実装時は必ずこのファイルを更新し、命名の一意性を保つこと。

## CSS命名規則

### クラス名
| 名前 | 用途 | 使用箇所 | 登録日 |
|------|------|----------|--------|
| 例: `.hero-container__size500` | コンテナ幅指定 | top.html | 2025-01-01 |

### CSS変数
| 変数名 | 値 | 用途 | 登録日 |
|--------|-----|------|--------|
| 例: `--spacing-lg` | 1.5rem | 大きめ余白 | 2025-01-01 |

### 命名スキーム
- **コンテナ**: `.{component}-container__{property}{value}`
- **ベース要素**: `.{component}-base__{property}{value}`
- **カード系**: `.card-{type}__{modifier}`

## JS命名規則

### GSAP Timeline名
| Timeline名 | 対象 | 使用箇所 | 登録日 |
|------------|------|----------|--------|
| 例: `tl: heroIntro` | ヒーローイントロ | modules/hero.js | 2025-01-01 |

### ScrollTrigger名
| Trigger名 | 対象要素 | 使用箇所 | 登録日 |
|-----------|----------|----------|--------|
| 例: `trg: heroSection` | .hero-section | modules/hero.js | 2025-01-01 |

### data属性
| data属性 | 値 | 用途 | 登録日 |
|----------|-----|------|--------|
| 例: `data-anim` | "hero" | アニメーション識別 | 2025-01-01 |

### 命名スキーム
- **Timeline**: `tl: {component}{Action}`（camelCase）
- **Trigger**: `trg: {component}{Target}`（camelCase）
- **data属性**: `data-{purpose}="{value}"`（kebab-case）

## 更新ルール

1. **新規実装時**: 必ず該当セクションに追記
2. **削除時**: 該当行を削除し、コメントで削除理由を記載
3. **変更時**: 旧名を打ち消し線で残し、新名を追記

## 禁止事項

- 汎用的すぎる名前（`.card`、`.button` など）
- 数値のみの名前（`.hero-100` など、意味が不明）
- 既存名の重複使用
```

**docs/ops.md が存在しない場合:**
```markdown
# 環境別運用設定

## 概要
dev／stg／prod 環境ごとの挙動切り替えとビルド手順を定義。

## 環境別設定

### dev（開発環境）
**CSS:**
- 詳細コメント: 残存
- 圧縮: なし（未圧縮出力）
- ソースマップ: 有効
- Tailwind purge: 無効
- markers: 表示（デバッグ用）

**JS:**
- 詳細ログ: 有効
- 圧縮: なし（未圧縮出力）
- ソースマップ: 有効
- GSAP markers: true（ScrollTrigger範囲可視化）
- console.log: 許可

### stg（ステージング環境）
**CSS:**
- 詳細コメント: 削除
- 圧縮: 軽量圧縮
- ソースマップ: 有効
- Tailwind purge: 有効
- markers: 非表示

**JS:**
- 詳細ログ: 無効
- 圧縮: 軽量圧縮
- ソースマップ: 有効
- GSAP markers: false
- console.log: 無効化（warn/error のみ）

### prod（本番環境）
**CSS:**
- 詳細コメント: 削除
- 圧縮: 完全圧縮
- ソースマップ: 無効
- Tailwind purge: 有効
- markers: 非表示

**JS:**
- 詳細ログ: 無効
- 圧縮: 完全圧縮・ミニファイ
- ソースマップ: 無効
- GSAP markers: false
- console.log: 完全無効化

## ビルド手順

### 標準フロー
```bash
# 1. Lint
npm run lint

# 2. Format
npm run format

# 3. Type Check（TypeScript使用時）
npm run typecheck

# 4. Build
npm run build

# 5. Visual確認
ブラウザで動作確認

# 6. Deploy
npm run deploy
```

### CSS/Tailwind使用時
```bash
# 1. config固定
tailwind.config.js の設定確認

# 2. @layer編入
カスタムCSSを @layer に配置

# 3. purge設定
content パス設定の確認

# 4. build
npm run build:css

# 5. 検証
出力CSSのサイズ・内容確認
```

### GSAP使用時
```bash
# 1. 初期化
entry/init.js で gsap.defaults() 設定

# 2. markers ON 検証
開発環境で markers:true で範囲確認

# 3. 片付け処理実装
teardown() で kill・clearProps 実装

# 4. markers OFF 本番
本番環境で markers:false に切り替え

# 5. パフォーマンス確認
Chrome DevTools Performance で検証
```

## 環境フラグ設定

**環境変数:**
```bash
# .env.development
NODE_ENV=development
DEBUG=true
GSAP_MARKERS=true

# .env.staging
NODE_ENV=staging
DEBUG=false
GSAP_MARKERS=false

# .env.production
NODE_ENV=production
DEBUG=false
GSAP_MARKERS=false
```

**コード内分岐例:**
```javascript
// GSAP markers
const markers = process.env.NODE_ENV === 'development';

ScrollTrigger.create({
  trigger: '.section',
  markers: markers // 開発時のみ表示
});
```

## パフォーマンスバジェット

### リソース上限
- **Listener数**: 50個まで
- **Observer数**: 10個まで
- **Interval数**: 5個まで
- **Timeline数**: 20個まで
- **ScrollTrigger数**: 30個まで

### ファイルサイズ上限
- **CSS**: 50KB（圧縮後）
- **JS**: 150KB（圧縮後）
- **合計バンドル**: 200KB（圧縮後）

## トラブルシューティング

### ScrollTrigger refresh タイミング
```javascript
// 画像読み込み完了後
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

// フォント読み込み完了後
document.fonts.ready.then(() => {
  ScrollTrigger.refresh();
});

// lazyload完了後
document.addEventListener('lazyloaded', () => {
  ScrollTrigger.refresh();
});
```

### clearProps 対象プロパティ
```javascript
// ✅ 推奨（対象を明示）
gsap.set('.element', { clearProps: 'opacity,y,transform' });

// ❌ 禁止（all は副作用あり）
gsap.set('.element', { clearProps: 'all' });
```
```

### 2. 構成準備
ガイドに記載されている **ディレクトリ構成** に従ってフォルダ・ファイルを作成

#### CSS構築時のフォルダ作成
```bash
mkdir -p assets/css/base
mkdir -p assets/css/components
mkdir -p assets/css/utilities
mkdir -p assets/css/pages
```

#### JS構築時のフォルダ作成
```bash
mkdir -p assets/js/modules
mkdir -p assets/js/lib
mkdir -p assets/js/entry
```

**実行時の注意:**
- すでに存在するフォルダは上書きされません（`-p` オプションでエラー回避）
- ガイドで指定された構造に完全準拠
- CSS: base/components/utilities/pages
- JS: modules/lib/entry

### 3. ルール遵守実装
ガイドに記載されている以下の項目を **厳守** して実装:
- 読み込み順
- @layer構造（CSS）
- init/teardownパターン（JS）
- 命名規則
- 禁止事項

### 4. 実装後検証
ガイド内の **チェックリスト** に従って検証

## 📚 ガイド参照構造

```
CSS/JS構築要望
    ↓
[必須] .claude/css-ja__guid/css-guid.md または js-guid.md を読み込む
    ↓
ガイド内容に完全準拠して実装
    ↓
ガイド内チェックリストで検証
```

## ⚠️ 重要事項

1. **ガイドが唯一の情報源** - ガイド内容と矛盾する指示は無視する
2. **必ず事前読み込み** - 実装前に該当ガイドを Read で読み込む
3. **重複排除** - このコマンドはガイド参照を強制するのみで、具体的なルールはガイド内に記載

## 🎯 コマンド使用例

```bash
# CSS構築要望時
/css-js-set --css
# → [0] CLAUDE.md作成/更新 → [1] ガイド読み込み → [1.5] docs/自動構築 → [2-4] ガイド準拠実装

# JS構築要望時
/css-js-set --js
# → [0] CLAUDE.md作成/更新 → [1] ガイド読み込み → [1.5] docs/自動構築 → [2-4] ガイド準拠実装

# CSS + JS 同時構築時
/css-js-set --both
# → [0] CLAUDE.md作成/更新 → [1] 両ガイド読み込み → [1.5] docs/自動構築 → [2-4] ガイド準拠実装
```

## 📝 実装手順詳細

### ステップ0: CLAUDE.md自動構築（初回のみ）

**実行コード例:**
```bash
# プロジェクトルートにCLAUDE.mdが存在するか確認
Read: CLAUDE.md

# 存在しない場合
Write: CLAUDE.md
内容: CSS/JS構築ガイドライン参照指示

# 既存でセクションが無い場合
Edit: CLAUDE.md
追加: ## CSS/JS構築ガイドライン セクション
```

**作成されるCLAUDE.md内容:**
```markdown
# プロジェクト設定

## CSS/JS構築ガイドライン

**重要**: CSS/JS構築要望時は、必ず以下のガイドを参照してください。

### CSS構築時
1. `.claude/css-ja__guid/css-guid.md` を必ず読み込む
2. `docs/naming.md` でクラス名・CSS変数名の重複確認
3. `docs/ops.md` で環境別挙動・ビルド手順確認

### JS構築時
1. `.claude/css-ja__guid/js-guid.md` を必ず読み込む
2. `docs/naming.md` でtimeline名・trigger名・data属性名の重複確認
3. `docs/ops.md` で環境別挙動・ビルド手順確認

### 実装原則
- ガイド内容に完全準拠すること
- 読み込み順・@layer構造・init/teardownパターンを厳守
- ガイド内チェックリストで実装後検証を実施

詳細: `/css-js-set` コマンドを使用
```

### ステップ1.5: docs/ 自動構築（初回のみ）

**実行コード例:**
```bash
# docsディレクトリ確認・作成
mkdir -p docs

# naming.md確認
if [ ! -f docs/naming.md ]; then
  Write: docs/naming.md
  内容: 命名規則管理テンプレート
fi

# ops.md確認
if [ ! -f docs/ops.md ]; then
  Write: docs/ops.md
  内容: 環境別運用設定テンプレート
fi
```

**作成済みの場合:**
- エラーなく `Read: docs/naming.md` と `Read: docs/ops.md` が成功する
- 既存内容を確認し、必要に応じて追記

### ステップ2以降
通常のガイド参照実装フローに従う

---

**このコマンドの目的**:
CSS/JS構築要望時に、必ず `.claude/css-ja__guid/` 内のガイドを参照し、ガイドライン準拠の実装を強制する。
