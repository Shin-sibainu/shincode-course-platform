# チケット001: 初期セットアップとプロジェクト構成

## 概要
プロジェクトの初期セットアップとSupabaseの設定を行う

## 作業内容

### 環境構築
- [ ] Supabaseプロジェクトの作成
- [ ] 環境変数の設定（.env.local）
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] 必要なパッケージのインストール
  - [ ] @supabase/supabase-js
  - [ ] @supabase/ssr

### プロジェクト構造の作成
- [ ] src/lib/supabase/client.ts の作成
- [ ] src/lib/supabase/server.ts の作成
- [ ] src/lib/supabase/middleware.ts の作成
- [ ] middleware.ts の作成
- [ ] 基本的なディレクトリ構造の作成
  - [ ] src/components
  - [ ] src/types
  - [ ] src/app/(auth)
  - [ ] src/app/(user)
  - [ ] src/app/admin

### Supabase設定
- [ ] Google OAuth プロバイダーの設定
- [ ] リダイレクトURLの設定

## 技術詳細
- Next.js 15.4.3
- TypeScript
- Supabase Auth

## 依存関係
なし（最初のチケット）

## 完了条件
- Supabaseプロジェクトが作成されている
- 環境変数が設定されている
- 基本的なディレクトリ構造が作成されている
- Supabaseクライアントが正しく設定されている