# クロスデバイス開発セットアップ (2026-01-21)

## 概要
MacBook ⇄ Mac Studio 間でのポートフォリオプロジェクト開発環境を整備。
Dropboxでnode_modulesを同期しないよう設定し、各デバイスで独立管理する方式に変更。

## 問題の原因
- Dropbox経由でnode_modulesを同期していた
- ネイティブモジュール（lightningcss等）がアーキテクチャ固有
- Mac Studio (arm64) で x64用バイナリが存在し、ビルド失敗

## Mac Studio 側の対応 ✅ 完了
1. node_modules と .next を削除
2. `xattr -w com.dropbox.ignored 1` でDropbox同期除外設定
3. `npm install` で arm64用バイナリをインストール
4. `npm run build` 成功確認済み

## MacBook 側の対応 ✅ 完了 (2026-01-21)

以下のコマンドをMacBookで実行：

```bash
# 1. プロジェクトディレクトリに移動
cd "/Volumes/Ozi/Rootz Dropbox/林憲二郎/Claude CODE/portfolio"

# 2. 既存のフォルダを削除（あれば）
rm -rf node_modules .next

# 3. フォルダを作成してDropbox除外設定
mkdir -p node_modules .next
xattr -w com.dropbox.ignored 1 node_modules
xattr -w com.dropbox.ignored 1 .next

# 4. 依存関係をインストール
npm install

# 5. ビルド確認
npm run build
```

## 確認コマンド
```bash
# Dropbox除外設定の確認
xattr -l node_modules
xattr -l .next
# → com.dropbox.ignored: 1 が表示されればOK
```

## 運用ルール
- node_modules と .next は各デバイスで独立管理
- package.json / package-lock.json 変更時は両デバイスで `npm install` 再実行
- ソースコードはDropbox経由で自動同期される

## Serenaメモリの共有状況

- **保存場所**: `.serena/memories/` (プロジェクト内)
- **Dropbox同期**: ✅ 有効 → 両デバイスで自動共有
- **追加対応**: 不要

### Dropbox除外設定済みフォルダ
| フォルダ | 理由 |
|----------|------|
| node_modules | ネイティブバイナリ（アーキテクチャ固有） |
| .next | ビルドキャッシュ |
| .serena/cache | 言語サーバーキャッシュ |

## 完了後の確認
MacBook側で作業完了後、Mac Studioに戻り以下を確認：
- `npm run dev` で開発サーバー起動
- 両デバイスで問題なく開発可能か

---

## セッション完了記録 (2026-01-21)

### MacBook側セットアップ実行結果
- **実行日時**: 2026-01-21
- **アーキテクチャ**: x86_64
- **npm install**: ✅ 1278パッケージインストール成功
- **npm run build**: ✅ Turbopack 54秒でコンパイル完了
- **Dropbox除外設定**: ✅ node_modules, .next 両方に設定済み

### 両デバイス対応状況
| デバイス | アーキテクチャ | 状態 |
|----------|--------------|------|
| Mac Studio | arm64 | ✅ 完了 |
| MacBook Pro | x86_64 | ✅ 完了 |

### 運用開始可能
クロスデバイス開発環境のセットアップが完全に完了。
両デバイスで独立したnode_modulesを管理し、Dropbox同期による競合なし。
