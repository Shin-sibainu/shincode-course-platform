# チケット 002: データベーススキーマの作成

## 概要

Supabase でデータベーススキーマを作成し、RLS ポリシーを設定する

## 作業内容

### テーブル作成

- [x] profiles テーブルの作成
  - [x] id (UUID, PRIMARY KEY)
  - [x] avatar_url (VARCHAR)
  - [x] role (VARCHAR, DEFAULT 'user')
  - [x] timestamps
- [x] courses テーブルの作成
  - [x] id (UUID, PRIMARY KEY)
  - [x] title (VARCHAR NOT NULL)
  - [x] description (TEXT)
  - [x] thumbnail_url (VARCHAR)
  - [x] timestamps
- [x] sections テーブルの作成
  - [x] id (UUID, PRIMARY KEY)
  - [x] course_id (UUID, FOREIGN KEY)
  - [x] title (VARCHAR NOT NULL)
  - [x] order_index (INTEGER NOT NULL)
  - [x] timestamps
- [x] videos テーブルの作成
  - [x] id (UUID, PRIMARY KEY)
  - [x] section_id (UUID, FOREIGN KEY)
  - [x] title (VARCHAR NOT NULL)
  - [x] youtube_url (VARCHAR NOT NULL)
  - [x] duration (INTEGER)
  - [x] order_index (INTEGER NOT NULL)
  - [x] is_free (BOOLEAN DEFAULT FALSE)
  - [x] timestamps
- [x] user_progress テーブルの作成
  - [x] id (UUID, PRIMARY KEY)
  - [x] user_id (UUID, FOREIGN KEY)
  - [x] video_id (UUID, FOREIGN KEY)
  - [x] completed (BOOLEAN DEFAULT FALSE)
  - [x] completed_at (TIMESTAMP)
  - [x] created_at (TIMESTAMP)
  - [x] UNIQUE 制約 (user_id, video_id)

### RLS ポリシー設定

- [x] profiles テーブルの RLS 有効化
  - [x] ユーザーは自分のプロフィールのみ読み取り可能
  - [x] ユーザーは自分のプロフィールのみ更新可能
  - [x] email と full_name は auth.users からアクセスしてセキュリティ強化
- [x] courses テーブルの RLS 有効化
  - [x] 全ユーザーが読み取り可能
  - [x] 管理者のみ作成・更新・削除可能
- [x] sections テーブルの RLS 有効化
  - [x] 全ユーザーが読み取り可能
  - [x] 管理者のみ作成・更新・削除可能
- [x] videos テーブルの RLS 有効化
  - [x] 無料動画は全ユーザーが読み取り可能
  - [x] 有料動画は認証済みユーザーのみ読み取り可能
  - [x] 管理者のみ作成・更新・削除可能
- [x] user_progress テーブルの RLS 有効化
  - [x] ユーザーは自分の進捗のみ読み取り・作成・更新可能

### トリガー・関数作成

- [x] handle_new_user() 関数の作成
- [x] on_auth_user_created トリガーの作成

## 技術詳細

- PostgreSQL (Supabase)
- Row Level Security (RLS)

## 依存関係

- チケット 001: 初期セットアップ完了

## 完了条件

- 全テーブルが作成されている
- RLS ポリシーが適切に設定されている
- プロフィール自動作成トリガーが動作する
