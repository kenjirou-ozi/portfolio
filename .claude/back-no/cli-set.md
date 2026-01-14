# /cli-set - WordPress CLI環境自動セットアップ

## 目的
wp-cli / mysql-cli をLocal by Flywheel環境で自動的にセットアップし、適切なCLIツールをスムーズに利用可能にする。

## 実行内容

### 1. 環境検出フェーズ
- Local by Flywheel稼働状況確認
- WordPressインストールパス検出
- MySQLソケット/ポート情報取得
- wp-cli / mysql-cli インストール確認

### 2. セットアップフェーズ
- `.wp-cli-config` 生成（wp-cli自動設定）
- `.mysql-cli-config` 生成（mysql-cli接続情報）
- シェル設定ファイルへのエイリアス追加（オプション）
- プロジェクトメモリへの設定保存

### 3. 検証フェーズ
- wp-cli接続テスト（`wp db check`）
- mysql-cli接続テスト（`SHOW DATABASES`）
- 設定ファイル整合性確認

### 4. CLAUDE.md更新
- CLI使用推奨ルールセクション追加
- プロジェクト固有の接続情報記載
- 使用例とベストプラクティス記載

## セットアップ後の利用方法

### wp-cli（自動設定）
```bash
# プロジェクトルートから実行
wp db query "SELECT * FROM wp_posts LIMIT 5;"
wp plugin list
wp db export backup.sql
```

### mysql-cli（設定ファイル利用）
```bash
# プロジェクトルートから実行
mysql --defaults-extra-file=.mysql-cli-config -e "SHOW TABLES;"
mysql --defaults-extra-file=.mysql-cli-config local
```

### エイリアス利用（オプション設定時）
```bash
# どこからでも実行可能
local-wp db query "SHOW TABLES;"
local-mysql -e "SELECT * FROM wp_posts LIMIT 5;" local
```

## CLI推奨ルール

### WordPress関連操作 → wp-cli優先
- プラグイン/テーマ管理: `wp plugin`, `wp theme`
- データベースバックアップ: `wp db export`
- コンテンツ操作: `wp post`, `wp user`
- 設定確認: `wp option get`, `wp config get`
- メンテナンス: `wp cache flush`, `wp cron event list`

**理由**: wp-config.php設定を自動読み込み、WordPress専用機能が充実

### 直接SQL操作 → mysql-cli推奨
- 複雑なクエリ実行
- テーブル構造変更（ALTER TABLE）
- 直接的なデータ操作（INSERT/UPDATE/DELETE）
- パフォーマンス分析（EXPLAIN）
- データベース管理（CREATE/DROP DATABASE）

**理由**: 柔軟なSQL実行、トランザクション制御、詳細なエラー情報

### 選択基準
| 操作内容 | 推奨CLI | 理由 |
|---------|--------|------|
| 投稿データ確認 | wp-cli | `wp post list --format=table` で見やすい |
| 投稿データ一括更新 | mysql-cli | 複雑なWHERE条件でのUPDATE |
| プラグイン有効化 | wp-cli | `wp plugin activate` で安全 |
| カスタムテーブル作成 | mysql-cli | CREATE TABLE の柔軟性 |
| データベースバックアップ | wp-cli | `wp db export` で圧縮対応 |
| データベース復元 | mysql-cli | `mysql < backup.sql` で高速 |
| 設定値確認 | wp-cli | `wp option get` で型変換対応 |
| 大量データ分析 | mysql-cli | EXPLAIN、インデックス確認 |

## 設定ファイル詳細

### .wp-cli-config（YAML形式）
```yaml
path: app/public
url: http://localhost:10034
user: admin
skip-plugins:
  - debug-bar
  - query-monitor
```

### .mysql-cli-config（MySQL形式）
```ini
[client]
socket = /Users/knihirou/Library/Application Support/Local/run/xR9UqkUmu/mysql/mysqld.sock
user = root
password = root
database = local
```

## トラブルシューティング

### wp-cli接続エラー
```bash
# 手動確認
cd app/public
wp --info
wp db check

# 設定ファイル確認
cat .wp-cli-config
```

### mysql-cli接続エラー
```bash
# 手動確認（ソケット指定）
mysql --socket="/Users/knjirou/Library/Application Support/Local/run/xR9UqkUmu/mysql/mysqld.sock" -u root -proot

# 設定ファイル確認
cat .mysql-cli-config
```

### Local環境変更時
```bash
# 再セットアップ実行
/cli-set --force

# または設定ファイル手動更新
vim .mysql-cli-config  # ソケットパス修正
```

## セキュリティ注意事項

1. `.mysql-cli-config` は `.gitignore` に追加（パスワード含む）
2. `.wp-cli-config` も環境依存のためコミット不要
3. 本番環境では絶対に root / root を使用しない
4. バックアップファイルも `.gitignore` 推奨

## 実装詳細

セットアップスクリプトは以下を自動実行：

1. **環境検出**
   - `ps aux | grep mysql` でLocal MySQL検出
   - `lsof -i :port` でポート確認
   - `find` でソケットファイル検索
   - `wp-config.php` 解析

2. **設定生成**
   - `.wp-cli-config` 生成（YAML）
   - `.mysql-cli-config` 生成（INI）
   - プロジェクトメモリ保存

3. **検証**
   - `wp db check` 実行
   - `mysql` 接続テスト
   - エラー時は詳細表示

4. **CLAUDE.md更新**
   - CLI推奨ルールセクション追記
   - プロジェクト固有情報記載
   - 使用例追加
