# Bliss Roppongi カウンセリングアプリ

## セットアップ手順

### 1. Supabase

1. [supabase.com](https://supabase.com) で新規プロジェクト作成（東京リージョン推奨）
2. SQL Editor で `supabase-schema.sql` を実行
3. Settings → API から以下をコピー：
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### 2. ローカル開発

```bash
# 依存インストール
npm install

# .envファイル作成
cp .env.example .env
# .env にSupabaseのURLとキーを貼り付け

# 開発サーバー起動
npm run dev
```

### 3. Vercelデプロイ

1. GitHubにリポジトリ作成 & push
2. [vercel.com](https://vercel.com) でリポジトリをインポート
3. Environment Variables に以下を設定：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

### 運用フロー

```
お客様来店
  ↓
Phase 1（iPad）: 基本情報・施術目的・部位・症状・健康・写真同意（約2分）
  ↓
セラピスト確認画面（スタッフ）: 全情報閲覧 + メモ入力 → 口頭カウンセリング
  ↓
「施術終了」ボタン → iPadをお客様に渡す
  ↓
Phase 2（iPad）: 施術感想・次回予約クロージング（5%OFF特典）・来店ペース
  ↓
翌日 LINEで Phase 3 リンク送信
  ↓
Phase 3（スマホ）: 満足度・Google口コミ（10分延長特典）・サイト評価・クロスセル
```

### 管理画面

- **Dashboard**: 来店数・術後ケア率・写真同意率・即日予約率・各種チャート
- **顧客記録一覧**: 検索・ソート・Phase進捗バッジ
- **顧客詳細**: 全Phase情報 + セラピストメモ + 未完了Phase入力ボタン

### 技術スタック

- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Fonts**: Cormorant Garamond + Noto Sans JP
