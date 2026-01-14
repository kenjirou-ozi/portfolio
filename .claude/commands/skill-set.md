# skill-set コマンド - 汎用 Claude Code Skills 構築システム

## 📚 概要

このコマンドは、**任意のサービス・ツール・フレームワーク**に関する Claude Code Skills を自動構築する汎用システムです。Anthropic 公式の skill-creator パターンに準拠し、Context7 で最新ドキュメントを調査して正確な skills を生成します。

**対象**: あらゆるサービス・ツール・フレームワーク・ライブラリ（技術スタック、API、開発ツール、デザインシステムなど）
**保存先**: `~/.claude/skills/{サービス名}/`
**調査エンジン**: Context7 MCP（第一優先）→ WebSearch/公式ドキュメント（フォールバック）

## 🎯 コマンドの目的

1. **対象サービスの特定**: ユーザーが指定したサービス・ツールを識別
2. **Context7 による調査**: 対象の最新ドキュメントとベストプラクティスを取得
3. **要件定義**: スキルに必要な機能、トリガー、使用シナリオを明確化
4. **Skill 自動構築**: 公式形式に準拠した SKILL.md、スクリプト、リファレンスを生成
5. **検証とパッケージング**: 構築したスキルが正しく機能することを確認

## 📋 実行フロー

### Phase 0: 対象サービスの特定 (Service Identification)

```bash
# ユーザー入力例（あらゆるジャンル対応）:
/skill-set "{決済サービス名} payment integration"
/skill-set "{フォームライブラリ名} form validation"
/skill-set "{認証サービス名} authentication"
/skill-set "{CSSフレームワーク名} components"
/skill-set "{データベース名} query builder"
/skill-set "{テストフレームワーク名} integration testing"

# 抽出される情報:
- サービス名: {ユーザー指定のサービス}
- 主要機能: {ユーザー指定の機能}
- 技術スタック: {Context7 または公式ドキュメントから取得}
```

### Phase 1: 情報調査 (Intelligent Research)

```bash
# 対象サービスの公式ドキュメントを自動調査（多段階フォールバック）

## 第一優先: Context7 MCP
1. Context7 でライブラリ ID を解決
   mcp__context7__resolve-library-id "{サービス名}"

2. Context7 が情報を持っている場合:
   mcp__context7__get-library-docs "{library-id}" --topic "{主要機能}"
   → インストール方法、コード例、ベストプラクティスを取得

## フォールバック（Context7 に情報がない場合）:
3. WebSearch で公式ドキュメントを検索
   - "{サービス名} official documentation"
   - "{サービス名} getting started guide"
   - "{サービス名} best practices"

4. 公式サイトから直接情報を取得
   - README.md（GitHub）
   - 公式ドキュメントサイト
   - API リファレンス

# 調査項目（情報源に関わらず自動抽出）:
- 最新バージョンと機能
- 公式推奨パターン
- ベストプラクティス
- 言語・フレームワークサポート
- 統合方法とエコシステム
- よくあるエラーと解決策
```

### Phase 2: 要件定義 (Requirements Discovery)

```bash
# Context7 調査結果に基づいてユーザーに質問:
1. どのような機能をスキル化したいですか？
   - 基本的な実装
   - 高度な統合パターン
   - トラブルシューティング
   - パフォーマンス最適化

2. スキルのトリガーとなるキーワードは？
   - 自動提案: "{サービス名}", "{主要機能}", "{関連キーワード}"

3. どのようなシナリオで使用しますか？
   - 自動推測: Context7 調査から典型的なユースケースを抽出
```

### Phase 3: Skill 構築 (Build)

#### 3.1 ディレクトリ構造の作成

```bash
# 汎用ディレクトリ構造（サービス名を動的に挿入）
mkdir -p ~/.claude/skills/{サービス名}/{スキル名}/{scripts,references,assets}

# 実例:
# 実例（汎用パターン）:
# 決済サービスの場合
mkdir -p ~/.claude/skills/{payment-service}/payment-integration/{scripts,references,assets}
mkdir -p ~/.claude/skills/{payment-service}/subscription-management/{scripts,references,assets}

# フォームライブラリの場合
mkdir -p ~/.claude/skills/{form-library}/basic-forms/{scripts,references,assets}
mkdir -p ~/.claude/skills/{form-library}/validation/{scripts,references,assets}

# BaaS プラットフォームの場合
mkdir -p ~/.claude/skills/{baas-platform}/auth/{scripts,references,assets}
mkdir -p ~/.claude/skills/{baas-platform}/realtime/{scripts,references,assets}
mkdir -p ~/.claude/skills/supabase/auth/{scripts,references,assets}
mkdir -p ~/.claude/skills/supabase/realtime/{scripts,references,assets}
```

#### 3.2 SKILL.md の生成（汎用テンプレート）

**必須要素**:
- YAML frontmatter (name, description, license, metadata)
- スキルの説明と使用シナリオ
- トリガーキーワード（Context7 調査から自動抽出）
- 実装例とコードスニペット（Context7 ドキュメントから生成）
- ベストプラクティス（公式推奨パターン）
- トラブルシューティングガイド

**汎用テンプレート**:
```markdown
---
name: {service-slug}-{skill-slug}
description: {サービス名}を使用した{主要機能}の実装をサポート。{Context7から抽出した特徴}。Use when "{トリガー1}", "{トリガー2}", "{トリガー3}" などのキーワードが含まれる場合。
license: MIT
metadata:
  version: 1.0.0
  author: Claude Code Skill Builder
  category: {カテゴリ: frontend/backend/database/api など}
  domain: {service-slug}
  updated: {YYYY-MM-DD}
  python-tools: {生成されるツール名.py}
  tech-stack: {Context7から抽出した技術スタック}
  context7-library-id: {Context7 Library ID}
---

# {サービス名} {スキル名} Skill

## 📚 概要

このスキルは、{Context7調査結果に基づいた説明}。

## 🎯 トリガーキーワード

{Context7から自動抽出されたキーワードリスト}
- "{サービス名}"
- "{主要機能}"
- "{関連キーワード1}"
- "{関連キーワード2}"

## 📋 使用シナリオ

{Context7ドキュメントから抽出された典型的なユースケース}

## 🚀 実装パターン

{Context7ドキュメントのコードスニペットから生成}

### パターン 1: {基本パターン名}

\`\`\`{言語}
{Context7から取得したコード例}
\`\`\`

### パターン 2: {高度なパターン名}

\`\`\`{言語}
{Context7から取得した高度な実装例}
\`\`\`

## ⚠️ 重要な注意事項

{Context7ドキュメントから抽出されたベストプラクティスと注意点}

## 🔧 Python ツール

### {tool_name}.py

{ツールの説明}

\`\`\`bash
python scripts/{tool_name}.py {使用例}
\`\`\`

## 📚 リファレンス

- `references/{service}-basics.md`: 基本的な使い方
- `references/{service}-advanced.md`: 高度なパターン
- `references/troubleshooting.md`: トラブルシューティング

## 📝 アセット

- `assets/{template-name}.{ext}`: 再利用可能なテンプレート

## 🔗 公式リソース

{Context7から取得した公式リンク}
```

#### 3.3 スクリプトの作成（動的生成）

**スクリプト生成戦略**:
1. Context7 調査結果から検証すべき項目を抽出
2. サービス固有のベストプラクティスを Python コードに変換
3. 実行可能な検証ツールを自動生成

**生成パターン例**:

```python
#!/usr/bin/env python3
"""
{サービス名} 設定検証ツール
使用法: python validate_{service}_config.py <target-file>

Context7 調査結果に基づく検証項目:
{Context7から抽出されたベストプラクティス}
"""
import sys
import re
from pathlib import Path

def validate_{service}_config(file_path):
    """{サービス名}の設定ファイルを検証"""
    content = Path(file_path).read_text()
    issues = []

    # Context7から抽出された検証ルール
    {動的に生成される検証ロジック}

    # 結果表示
    if not issues:
        print("✅ All checks passed!")
        return 0
    else:
        print("Issues found:")
        for issue in issues:
            print(f"  {issue}")
        return 1

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python validate_{service}_config.py <target-file>")
        sys.exit(1)

**実例（決済サービスの場合）**:
```python
#!/usr/bin/env python3
"""
決済サービス設定検証ツール
Context7 調査: API キー管理、エラーハンドリング、Webhook セキュリティ
"""
import sys
import re
from pathlib import Path

def validate_payment_config(file_path):
    """決済サービス設定の検証"""
    content = Path(file_path).read_text()
    issues = []

    # Context7 から取得したベストプラクティスに基づく検証
    if re.search(r'(api_key|secret_key)s*=s*["']sk_', content):
        issues.append("❌ API keys hardcoded (use env variables)")

    if not re.search(r'try:|except', content):
        issues.append("⚠️  Missing error handling for API calls")

    return issues

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python validate_payment_config.py <target-file>")
        sys.exit(1)

    issues = validate_payment_config(sys.argv[1])
    if not issues:
        print("✅ All best practices followed!")
        sys.exit(0)
    else:
        print("Payment service configuration issues:")
        for issue in issues:
            print(f"  {issue}")
        sys.exit(1)
```
    else:
        print("Stripe configuration issues:")
        for issue in issues:
            print(f"  {issue}")
        return 1

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python validate_stripe_config.py <file>")
        sys.exit(1)
    sys.exit(validate_stripe_config(sys.argv[1]))
```

#### 3.4 リファレンスドキュメントの作成（動的生成）

**リファレンス生成戦略**:
1. Context7 ドキュメントから基本情報を抽出
2. ベストプラクティスを構造化された Markdown に変換
3. よくあるエラーと解決策を表形式で整理

**汎用テンプレート**:

```markdown
# {サービス名} 基本ガイド

## インストール

{Context7から取得したインストール手順}

## 基本的な使い方

### 必須要素

{Context7から抽出された必須設定項目}

### よくあるエラー

| エラー | 原因 | 解決策 |
|--------|------|--------|
{Context7から抽出されたトラブルシューティング情報}

## 推奨パターン
**実例（BaaS 認証の場合）**:
```markdown
# BaaS 認証基本ガイド

## 概要
このガイドでは、BaaS プラットフォームの認証機能を実装する方法を説明します。

## 前提条件
- プラットフォームアカウントの作成
- プロジェクトの初期化
- API キーの取得

## 手順

### 1. クライアントの初期化
```typescript
// Context7 から取得した公式パターン
import { createClient } from '{baas-client-package}'

const client = createClient(
  process.env.PLATFORM_URL,
  process.env.PLATFORM_ANON_KEY
)
```

### 2. 認証フローの実装
```typescript
// サインアップ
const { data, error } = await client.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// サインイン
const { data, error } = await client.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
})
```

## ベストプラクティス
- 環境変数で認証情報を管理
- セッション管理の適切な実装
- エラーハンドリングの徹底

## トラブルシューティング
- **問題**: 認証エラーが発生する
  - **解決**: API キーの確認、環境変数の設定確認
```

```{言語拡張子}
{Context7から取得したベストプラクティスコード}

{必要に応じて TypeScript インターフェース}

{再利用可能なコンポーネント/関数/クラス}
```

**実例（React Hook Form の場合）**:

```tsx
// assets/form-template.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// バリデーションスキーマ（Zod）
const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ReusableForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // フォーム送信ロジック
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### Phase 4: 検証とパッケージング (Validation)

```bash
# スキル構造の検証（Anthropic 公式スクリプトを使用する場合）
# Note: 公式スクリプトが利用可能な場合のみ
# python scripts/quick_validate.py ~/.claude/skills/swiper-slider/basic-slider

# スキルのパッケージング（配布用）
# python scripts/package_skill.py ~/.claude/skills/swiper-slider/basic-slider ./dist

# 手動検証チェックリスト
1. ✅ SKILL.md に YAML frontmatter が存在するか
2. ✅ name と description が適切か
3. ✅ scripts/ 内のスクリプトが実行可能か
4. ✅ references/ にドキュメントがあるか
5. ✅ トリガーキーワードが明確か
```

## 🎨 構築可能なスキル例(あらゆるカテゴリ対応)

**重要**: 以下は代表的なカテゴリ例です。Context7 または公式ドキュメントから情報取得可能な**あらゆるサービス・ツール・フレームワーク**に対応可能です。

### カテゴリ別スキル構成パターン

#### 決済サービス系スキル
1. **Payment Integration Skill**
   - **ディレクトリ**: `~/.claude/skills/{payment-service}/payment-integration/`
   - **目的**: 決済処理の実装
   - **トリガー**: "{サービス名} 決済", "payment processing"

2. **Subscription Management Skill**
   - **ディレクトリ**: `~/.claude/skills/{payment-service}/subscription/`
   - **目的**: サブスクリプション管理
   - **トリガー**: "{サービス名} サブスク", "recurring payment"

3. **Webhook Handling Skill**
   - **ディレクトリ**: `~/.claude/skills/{payment-service}/webhooks/`
   - **目的**: Webhook セキュリティと処理
   - **トリガー**: "{サービス名} webhook", "payment events"

#### フォームライブラリ系スキル
1. **Basic Forms Skill**
   - **ディレクトリ**: `~/.claude/skills/{form-library}/basic-forms/`
   - **目的**: 基本的なフォーム実装
   - **トリガー**: "フォーム作成", "form validation"

2. **Schema Validation Skill**
   - **ディレクトリ**: `~/.claude/skills/{form-library}/validation/`
   - **目的**: スキーマバリデーション統合
   - **トリガー**: "バリデーション", "form schema"

3. **Dynamic Fields Skill**
   - **ディレクトリ**: `~/.claude/skills/{form-library}/dynamic-fields/`
   - **目的**: 動的フォームフィールド
   - **トリガー**: "動的フォーム", "field array"

#### BaaS プラットフォーム系スキル
1. **Auth Skill**
   - **ディレクトリ**: `~/.claude/skills/{baas-platform}/auth/`
   - **目的**: 認証・認可の実装
   - **トリガー**: "{プラットフォーム名} 認証", "user authentication"

2. **Realtime Skill**
   - **ディレクトリ**: `~/.claude/skills/{baas-platform}/realtime/`
   - **目的**: リアルタイムデータ同期
   - **トリガー**: "{プラットフォーム名} リアルタイム", "live updates"

3. **Storage Skill**
   - **ディレクトリ**: `~/.claude/skills/{baas-platform}/storage/`
   - **目的**: ファイルストレージ管理
   - **トリガー**: "{プラットフォーム名} ストレージ", "file upload"

#### CSS フレームワーク系スキル
1. **Component Library Skill**
   - **ディレクトリ**: `~/.claude/skills/{css-framework}/components/`
   - **目的**: 再利用可能なコンポーネント
   - **トリガー**: "{フレームワーク名} コンポーネント", "UI components"

2. **Responsive Design Skill**
   - **ディレクトリ**: `~/.claude/skills/{css-framework}/responsive/`
   - **目的**: レスポンシブデザインパターン
   - **トリガー**: "レスポンシブ", "mobile first"

3. **Theming Skill**
   - **ディレクトリ**: `~/.claude/skills/{css-framework}/theming/`
   - **目的**: カスタムテーマ設定
   - **トリガー**: "{フレームワーク名} テーマ", "design system"

## 🔧 Python ツール開発ガイドライン

### 必須事項
1. **Shebang**: `#!/usr/bin/env python3`
2. **Docstring**: スクリプトの目的と使用法
3. **エラーハンドリング**: 適切な例外処理
4. **終了コード**: 成功時 0、エラー時 1
5. **ヘルプメッセージ**: 引数が不足している場合の使用法表示

### 推奨パターン

```python
#!/usr/bin/env python3
"""
ツール名
使用法: python script_name.py <arguments>
"""
import sys
from pathlib import Path

def main(args):
    """メイン処理"""
    try:
        # 処理内容
        print("✅ Success!")
        return 0
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script_name.py <arguments>")
        sys.exit(1)

    sys.exit(main(sys.argv[1:]))
```

## 📚 リファレンス作成ガイドライン

### 構造
1. **概要**: 何を説明するドキュメントか
2. **前提条件**: 必要な知識や環境
3. **手順**: ステップバイステップガイド
4. **コード例**: 実践的なスニペット
5. **ベストプラクティス**: 推奨パターン
6. **トラブルシューティング**: よくある問題と解決策

### フォーマット
- Markdown 形式
- コードブロックにシンタックスハイライト
- 表を使った情報整理
- 絵文字で視認性向上（適度に）

## 🎯 実行コマンド（汎用パターン）

```bash
# 基本パターン（サービス名 + 機能）
# 基本パターン（サービス名 + 機能）
/skill-set "{決済サービス名} payment integration"
/skill-set "{フォームライブラリ名} basic forms"
/skill-set "{BaaSプラットフォーム名} authentication"
/skill-set "{CSSフレームワーク名} components"

# 詳細指定パターン
/skill-set "{決済サービス名} subscription management with webhooks"
/skill-set "{フォームライブラリ名} with {バリデーションライブラリ名} validation"
/skill-set "{BaaSプラットフォーム名} realtime subscriptions for {フレームワーク名}"

# 複数スキル同時構築
/skill-set "Stripe payment, Stripe webhooks, Stripe subscription"

# フラグ指定
/skill-set "Next.js with Supabase" --with-typescript --with-tests

# 実行例:
# 1. ユーザー: /skill-set "Stripe payment integration"
# 2. システム: Context7 で Stripe ドキュメント調査
# 3. システム: ユーザーに要件確認（基本実装 or 高度な統合?）
# 4. システム: ~/.claude/skills/stripe/payment-integration/ 配下に構築
# 5. 完了: SKILL.md, scripts/, references/, assets/ 生成
```

## ✅ 成功基準

1. ✅ SKILL.md が公式形式に準拠している
2. ✅ トリガーキーワードが明確に定義されている
3. ✅ 実行可能な Python スクリプトが含まれている
4. ✅ リファレンスドキュメントが充実している
5. ✅ テンプレートが再利用可能である
6. ✅ ユーザー要望を正しく反映している

## 🔗 関連ドキュメント

- **Anthropic Skills 公式**: https://github.com/anthropics/skills
- **Awesome Claude Skills**: https://github.com/composiohq/awesome-claude-skills
- **Claude Skills Library**: https://github.com/alirezarezvani/claude-skills
- **Context7 MCP ドキュメント**: MCP Server による最新ドキュメント取得
- **skill-creator 公式ガイド**: Anthropic skills repository

## 📝 注意事項

1. **汎用性の維持**: 特定のサービスに依存しない構造を保つ
2. **Context7 必須**: すべてのスキル構築で Context7 による調査を実施
3. **公式パターン準拠**: Anthropic 公式の skill-creator パターンに従う
4. **ディレクトリ命名**: `~/.claude/skills/{service-slug}/{skill-slug}/` 形式
5. **動的コンテンツ生成**: Context7 調査結果からコード・ドキュメントを自動生成
6. **検証必須**: 構築後は必ず動作確認を行う
7. **メタデータ記録**: Context7 Library ID を SKILL.md の metadata に記録
8. **更新可能性**: サービスのバージョンアップに対応できる構造

## 🚀 実際の実行フロー（詳細）

**注意**: 以下は代表的なパターンの一例です。あらゆるサービス・ツール・フレームワークで同様のフローが適用されます。

### ステップ 1: コマンド実行
```bash
# ユーザー入力
/skill-set "Stripe payment integration"
```

### ステップ 2: サービス識別と Context7 調査
```bash
# システム動作:
1. サービス名抽出: "Stripe"
2. 主要機能抽出: "payment integration"
3. Context7 Library ID 解決:
   mcp__context7__resolve-library-id "Stripe"
   → /stripe/stripe-js または /stripe/stripe-node など

4. 最新ドキュメント取得:
   mcp__context7__get-library-docs "/stripe/stripe-js" --topic "payment integration"
   → インストール方法、コード例、ベストプラクティス、エラー処理を取得
```

### ステップ 3: ユーザーとの対話
```bash
# システムからユーザーへの質問:
「Stripe payment integration スキルを構築します。以下から選択してください:

1. 基本的な決済処理（checkout session）
2. カスタム決済フロー（payment intents）
3. Webhook 統合を含む完全な決済システム

どれを構築しますか？」

# ユーザー回答: "3"
```

### ステップ 4: スキル自動構築
```bash
# ディレクトリ作成
mkdir -p ~/.claude/skills/stripe/payment-integration/{scripts,references,assets}

# SKILL.md 生成（Context7 調査結果から）
cat > ~/.claude/skills/stripe/payment-integration/SKILL.md << 'EOF'
---
name: stripe-payment-integration
description: Stripe を使用した完全な決済処理の実装をサポート。Checkout Session、Payment Intents、Webhook 統合を含む。Use when "Stripe 決済", "payment processing", "checkout" などのキーワードが含まれる場合。
license: MIT
metadata:
  version: 1.0.0
  author: Claude Code Skill Builder
  category: backend
  domain: stripe
  updated: 2025-11-19
  python-tools: validate_stripe_config.py
  tech-stack: Stripe.js, Next.js, TypeScript, Node.js
  context7-library-id: /stripe/stripe-js
---
{Context7から取得した内容を展開}
EOF

# Python 検証スクリプト生成
# references/ ドキュメント生成
# assets/ テンプレート生成
```

### ステップ 5: 検証と完了報告
```bash
# 自動検証
✅ SKILL.md 生成完了
✅ validate_stripe_config.py 作成完了
✅ references/stripe-basics.md 作成完了
✅ assets/payment-form.tsx テンプレート作成完了

# ユーザーへの完了報告
「Stripe payment integration スキルの構築が完了しました！

📁 保存先: ~/.claude/skills/stripe/payment-integration/

📚 含まれるファイル:
- SKILL.md: スキル本体（トリガー: "Stripe 決済", "payment processing"）
- scripts/validate_stripe_config.py: 設定検証ツール
- references/stripe-basics.md: 基本ガイド
- references/webhook-security.md: Webhook セキュリティガイド
- assets/checkout-form.tsx: Checkout フォームテンプレート
- assets/payment-intent.tsx: Payment Intent テンプレート

🎯 次回から "Stripe 決済を実装" と指示すると、このスキルが自動的にロードされます！」
```

## 💡 使用例（複数サービス）

### 例 1: React Hook Form スキル
```bash
/skill-set "React Hook Form with Zod validation"

# 自動実行:
# 1. Context7 で react-hook-form + zod を調査
# 2. バリデーションパターンを抽出
# 3. ~/.claude/skills/react-hook-form/validation/ に構築
# 4. フォームテンプレート、バリデーションスキーマ例を生成
```

### 例 2: Supabase Auth スキル
```bash
/skill-set "Supabase authentication for Next.js"

# 自動実行:
# 1. Context7 で Supabase Auth + Next.js を調査
# 2. Server Components / Client Components パターン抽出
# 3. ~/.claude/skills/supabase/auth/ に構築
# 4. Middleware 例、RLS 設定ガイドを生成
```

### 例 3: Tailwind CSS スキル
```bash
/skill-set "Tailwind CSS component library"

# 自動実行:
# 1. Context7 で Tailwind CSS ベストプラクティスを調査
# 2. 再利用可能なコンポーネントパターンを抽出
# 3. ~/.claude/skills/tailwind/components/ に構築
# 4. ボタン、カード、フォームなどのテンプレート生成
```

---

**Version**: 2.0.0 (Generic Skill Builder)
**Last Updated**: 2025-11-19
**Author**: Claude Code Skill Builder
**Changelog**: v2.0.0 - Swiper.js 固有からあらゆるサービス対応の汎用システムへ刷新
