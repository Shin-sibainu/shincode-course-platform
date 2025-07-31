# チケット003: 認証システムの実装

## 概要
Supabase AuthとGoogle OAuthを使用した認証システムを実装する

## 作業内容

### 認証基盤の実装
- [x] Supabaseクライアントヘルパーの作成
  - [x] lib/supabase/client.ts (Browser Client)
  - [x] lib/supabase/server.ts (Server Client)
- [x] middleware.ts の実装
  - [x] トークンリフレッシュ処理
  - [x] クッキー管理

### ログインページの実装
- [x] app/(auth)/login/page.tsx の作成
  - [x] Googleログインボタン
  - [x] エラーメッセージ表示
- [x] app/(auth)/login/google-auth.tsx の作成
  - [x] GoogleAuthButtonコンポーネント
- [ ] app/(auth)/login/actions.ts の作成
  - [ ] Server Actionsによるログイン処理

### 認証コールバックの実装
- [x] app/auth/callback/route.ts の作成
  - [x] OAuth認証後のリダイレクト処理

### 認証状態管理
- [ ] 認証コンテキストの作成（必要に応じて）
- [x] ユーザー情報の取得ヘルパー関数

### ログアウト機能
- [x] ログアウトServer Actionの作成
- [x] ログアウトボタンコンポーネント

## 技術詳細
- Supabase Auth
- Google OAuth
- Server Actions
- Next.js middleware

## 依存関係
- チケット001: 初期セットアップ完了
- チケット002: データベーススキーマ作成完了

## 完了条件
- Googleログインが動作する
- ログイン後、profilesテーブルに自動的にレコードが作成される
- ログアウトが動作する
- 認証状態が適切に管理される