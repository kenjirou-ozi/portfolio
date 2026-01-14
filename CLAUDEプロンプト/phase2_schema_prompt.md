【目的】
ポートフォリオサイト用のSanityスキーマを作成したい。

【背景・意図】
AI動画制作・デザインサービスのポートフォリオサイトに必要なコンテンツを
Sanity Studioで管理できるようにする。
現在存在するサンプルの「post」スキーマは削除し、本番用のスキーマに置き換える。

【作成するスキーマ】

## 1. siteSettings（サイト設定）- シングルトン
サイト全体で使用する設定情報。1つのドキュメントのみ存在。

| フィールド名 | 型 | 必須 | 説明 |
|-------------|-----|------|------|
| catchphrase | string | ✅ | ファーストビュー用キャッチコピー |
| subCatchphrase | string | | サブキャッチコピー |
| heroVideoUrl | url | ✅ | 代表動画のYouTube URL |
| siteTitle | string | ✅ | サイトタイトル（SEO用） |
| siteDescription | text | ✅ | サイト説明文（SEO用） |
| ogImage | image | | OGP画像 |

## 2. service（サービス）
提供するサービスの情報。

| フィールド名 | 型 | 必須 | 説明 |
|-------------|-----|------|------|
| title | string | ✅ | サービス名（例：AI動画制作） |
| slug | slug | ✅ | URL用スラッグ |
| description | text | ✅ | サービス説明文 |
| icon | string | | アイコン名またはemoji |
| order | number | ✅ | 表示順（小さい順に表示） |

## 3. work（実績）
制作実績の情報。

| フィールド名 | 型 | 必須 | 説明 |
|-------------|-----|------|------|
| title | string | ✅ | 作品タイトル |
| slug | slug | ✅ | URL用スラッグ |
| category | string | ✅ | カテゴリ（AI動画/AI漫画/デザイン）※選択式 |
| thumbnail | image | ✅ | サムネイル画像 |
| videoUrl | url | | YouTube動画URL（動画作品の場合） |
| targetCustomer | string | | ターゲット顧客（例：飲食店向け） |
| duration | string | | 尺（例：30秒、1分） |
| description | text | | 作品説明 |
| publishedAt | datetime | ✅ | 制作日 |
| featured | boolean | | トップページに表示するか |

## 4. profile（プロフィール）- シングルトン
制作者のプロフィール情報。1つのドキュメントのみ存在。

| フィールド名 | 型 | 必須 | 説明 |
|-------------|-----|------|------|
| name | string | ✅ | 名前 |
| nameEn | string | | 英語名 |
| bio | text | ✅ | 自己紹介文 |
| profileImage | image | | プロフィール画像 |
| strengths | array of object | ✅ | 強み（タイトル、説明の配列） |
| workflow | array of object | | 制作フロー（ステップ番号、タイトル、説明の配列） |
| socialLinks | array of object | | SNSリンク（プラットフォーム名、URL の配列） |

【期待する結果】
1. サンプルの「post」スキーマを削除
2. 上記4つのスキーマを作成（sanity/schemas/ 以下に個別ファイルで）
3. sanity/schemas/index.ts でエクスポート
4. Sanity Studioで4つのドキュメントタイプが表示される
5. siteSettingsとprofileはシングルトン（1つだけ作成可能）として設定

【注意事項】
- スキーマファイルは機能単位で分割（siteSettings.ts, service.ts, work.ts, profile.ts）
- categoryフィールドは選択式（list options）で実装
- シングルトンドキュメントの設定を適切に行う
- 日本語のtitleとdescriptionを設定してStudioを使いやすくする

【参考情報】
Sanity Schema Types: https://www.sanity.io/docs/schema-types
