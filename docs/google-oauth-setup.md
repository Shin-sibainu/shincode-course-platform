# Google OAuth セットアップ手順

## Supabaseダッシュボードでの設定

1. [Supabaseダッシュボード](https://app.supabase.com)にログイン
2. プロジェクト「shinCode_course_platform」を選択
3. 左側メニューから「Authentication」→「Providers」を選択
4. 「Google」を有効化
5. 以下の情報を入力：
   - Client ID (Google Cloud ConsoleのOAuth 2.0クライアントIDから取得)
   - Client Secret (Google Cloud ConsoleのOAuth 2.0クライアントシークレットから取得)

## Google Cloud Consoleでの設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. プロジェクトを作成または選択
3. 「APIとサービス」→「認証情報」を選択
4. 「認証情報を作成」→「OAuth クライアント ID」を選択
5. アプリケーションの種類：「ウェブアプリケーション」を選択
6. 以下を設定：
   - 名前：任意（例：Supabase shinCode_course_platform）
   - 承認済みのJavaScriptオリジン：
     - `https://urzgjdwoejyybanaqopj.supabase.co`
     - `http://localhost:3000` (開発用)
   - 承認済みのリダイレクトURI：
     - `https://urzgjdwoejyybanaqopj.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (開発用)

7. 作成されたクライアントIDとクライアントシークレットをSupabaseに設定

## 実装済みの機能

- Google OAuthログイン
- プロフィール自動作成（email, full_nameはauth.usersから参照）
- セキュアなプロフィール管理（RLSポリシー適用済み）
- ログアウト機能

## テスト方法

1. `npm run dev`で開発サーバーを起動
2. `/login`ページにアクセス
3. 「Googleでログイン」ボタンをクリック
4. Googleアカウントでログイン
5. 自動的にプロフィールが作成され、ホームページへリダイレクト