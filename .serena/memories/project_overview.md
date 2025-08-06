# Shincode Course Platform Project Overview

## プロジェクトの目的
AI学習プラットフォーム - YouTube動画を活用したUdemyライクな講座プラットフォームのMVP開発。AIでプログラム開発したいエンジニア・非エンジニア向けの学習サービス。

## 技術スタック
- **フロントエンド**: Next.js 15.4.3 (App Router), React 19.1.0, TypeScript
- **スタイリング**: Tailwind CSS v4
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth (Google OAuth)
- **動画**: YouTube埋め込み
- **デプロイ**: Vercel
- **開発ツール**: 
  - ESLint (Next.js推奨ルール、flatコンフィグ形式)
  - TypeScript (strict mode)
  - Turbopack (開発ビルド高速化)

## プロジェクト構造
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # 認証関連ページ
│   ├── (user)/            # ユーザー向けページ
│   ├── admin/             # 管理者向けページ
│   ├── api/               # APIルート
│   └── page.tsx          # ホームページ
├── components/            # 再利用可能なコンポーネント
├── lib/                   # ユーティリティ、Supabaseクライアント
└── types/                 # TypeScript型定義
```

## 主要機能
### ユーザー向け
- 講座一覧表示
- Google認証
- 講座詳細（3階層構造: 講座→セクション→動画）
- YouTube動画視聴
- 学習進捗管理
- ダッシュボード

### 管理者向け
- 講座の作成・編集・削除
- セクション管理（並び替え機能付き）
- 動画管理（YouTube URL入力、無料動画フラグ設定、並び替え）

## データベーステーブル
- profiles（ユーザープロフィール）
- courses（講座）
- sections（セクション）
- videos（動画）
- user_progress（進捗）

## 開発ガイドライン
- TypeScript strict modeを維持
- Supabase RLS（Row Level Security）を全テーブルに適用
- Server ComponentsとClient Componentsを適切に使い分け
- YouTube埋め込みはセキュリティを考慮（iframe sandbox属性等）
- Next.js App Routerのベストプラクティスに従う