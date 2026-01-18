# タスク完了時チェックリスト

## 必須チェック
1. **型エラー確認**
   ```bash
   npm run build  # TypeScript型チェック含む
   ```

2. **Lintチェック**
   ```bash
   npm run lint
   ```

3. **動作確認**
   - 開発サーバーで視覚確認 (`npm run dev`)
   - 該当ページ/コンポーネントの表示確認

## コンポーネント追加時
- [ ] 適切なディレクトリに配置 (ui/, sections/, layout/)
- [ ] TypeScript型定義
- [ ] CSS変数使用 (ハードコード避ける)
- [ ] Framer Motion使用時はvariants定義

## Sanityスキーマ変更時
- [ ] スキーマファイル更新
- [ ] schemas/index.tsにエクスポート追加
- [ ] Sanity Studioで確認
- [ ] 必要に応じてクエリ更新 (queries.ts)

## ページ/ルート追加時
- [ ] app/ディレクトリに適切に配置
- [ ] メタデータ設定 (layout.tsx or page.tsx)
- [ ] Server/Client Component適切に選択

## スタイル変更時
- [ ] CSS変数の一貫性確認
- [ ] レスポンシブ対応確認
- [ ] ダークテーマでの表示確認

## Git操作
- [ ] 変更差分確認 (`git diff`)
- [ ] 不要ファイル除外確認
- [ ] 意味のあるコミットメッセージ (日本語)
