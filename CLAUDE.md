# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI 学習プラットフォーム - YouTube 動画を活用した Udemy ライクな講座プラットフォームの MVP 開発。AI でプログラム開発したいエンジニア・非エンジニア向けの学習サービス。

## Essential Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint for code quality checks
```

## Architecture Overview

### Tech Stack

- **フロントエンド**: Next.js 15.4.3 (App Router), React 19.1.0, TypeScript
- **スタイリング**: Tailwind CSS v4
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth (Google OAuth)
- **動画**: YouTube 埋め込み
- **デプロイ**: Vercel

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # 認証関連ページ
│   │   └── login/         # ログインページ
│   ├── (user)/            # ユーザー向けページ
│   │   ├── course/        # 講座関連ページ
│   │   └── dashboard/     # ダッシュボード
│   ├── admin/             # 管理者向けページ
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # ホームページ
├── components/            # 再利用可能なコンポーネント
├── lib/                   # ユーティリティ、Supabaseクライアント
└── types/                 # TypeScript型定義
```

### Key Configuration

- **TypeScript**: Path alias `@/*` maps to `./src/*`
- **ESLint**: Configured with Next.js recommended rules using flat config format
- **Development**: Uses Turbopack for faster development builds

## 機能要件

### ユーザー向け機能

1. **ホームページ**

   - 講座一覧の表示
   - 講座のサムネイル、タイトル、概要を表示

2. **認証機能**

   - Google 認証のみ（Supabase Auth + Google OAuth）
   - 最初の動画は誰でも視聴可能
   - 2 本目以降は認証が必要

3. **講座詳細ページ**

   - 3 階層構造の表示（講座 → セクション → 動画）
   - 全体進捗率の表示
   - セクションごとの進捗表示

4. **動画視聴ページ**

   - YouTube 動画の埋め込み表示
   - 動画完了の手動マーク機能
   - 自由な動画選択（順番制限なし）

5. **ダッシュボード**
   - 受講中講座の一覧
   - 個人の学習進捗表示

### 管理者向け機能

1. **講座管理**

   - 講座の作成・編集・削除
   - タイトル、説明、サムネイル設定

2. **セクション管理**

   - セクションの作成・編集・削除
   - セクションの並び替え機能

3. **動画管理**
   - 動画の追加・編集・削除
   - YouTube URL の手動入力
   - 無料動画フラグの設定
   - 動画の並び替え機能

## Database Schema

### profiles（ユーザープロフィール）

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255),
  full_name VARCHAR(255),
  avatar_url VARCHAR(500),
  role VARCHAR(50) DEFAULT 'user', -- 'user' or 'admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) の設定
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のプロフィールのみ読み取り・更新可能
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- プロフィール自動作成のトリガー
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### courses（講座）

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### sections（セクション）

```sql
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### videos（動画）

```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  youtube_url VARCHAR(500) NOT NULL,
  duration INTEGER, -- 秒数
  order_index INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_progress（進捗）

```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);
```

## ページルーティング

### ユーザー向け

- `/` - ホーム（講座一覧）
- `/course/[id]` - 講座詳細
- `/course/[id]/video/[videoId]` - 動画視聴
- `/dashboard` - ダッシュボード
- `/login` - ログイン

### 管理者向け

- `/admin` - 管理画面
- `/admin/courses` - 講座管理
- `/admin/courses/[id]` - 講座編集
- `/admin/courses/[id]/sections` - セクション管理

## 認証フロー

1. Google OAuth による認証（Supabase Auth 使用）
2. 最初の動画は未認証で視聴可能
3. 2 本目以降は認証必須
4. auth.users テーブルにユーザー作成時、自動的に profiles テーブルにレコード作成

## 環境変数

`.env.local`に以下を設定:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development Workflow

### 開発優先順位

1. Supabase プロジェクトセットアップとデータベーススキーマ作成
2. 認証システム実装（Google OAuth）
3. 基本的なページ構造とルーティング
4. 講座・動画表示機能
5. 進捗管理機能
6. 管理画面実装

### コーディング規約

- TypeScript strict mode を維持
- Supabase RLS（Row Level Security）を全テーブルに適用
- コンポーネントは機能単位で`src/components/`に配置
- Server Components と Client Components を適切に使い分け
- YouTube 埋め込みはセキュリティを考慮（iframe sandbox 属性等）

### Next.js App Router ベストプラクティス

#### 1. Server Components を優先

- デフォルトで全てのコンポーネントは Server Component
- `"use client"` ディレクティブは本当に必要な場合のみ使用
- クライアント側の対話性が必要な場合のみ Client Component に

#### 2. データフェッチング

- Server Components では `async/await` で直接データフェッチ
- `fetch` API は自動的にキャッシュとデデュープが有効
- 動的データには `{ cache: 'no-store' }` または `{ next: { revalidate: 0 } }` を使用

```typescript
// Good: Server Component でのデータフェッチ
async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  return <CourseDetail course={course} />;
}
```

#### 3. ルーティング規約

- `(folder)` - ルートグループ（URL に影響しない）
- `[folder]` - 動的ルート
- `[...folder]` - キャッチオールルート
- `[[...folder]]` - オプショナルキャッチオールルート

#### 4. レイアウトとテンプレート

- `layout.tsx` - 子ルート間で共有される UI（再レンダリングされない）
- `template.tsx` - ナビゲーション時に新しいインスタンスが作成される
- メタデータは `generateMetadata` 関数または `metadata` オブジェクトで定義

#### 5. ローディングとエラー処理

- `loading.tsx` - Suspense 境界を自動的に作成
- `error.tsx` - エラー境界（必ず Client Component）
- `not-found.tsx` - 404 ページのカスタマイズ

#### 6. ファイル構成

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx      # 認証関連の共通レイアウト
├── (user)/
│   ├── course/
│   │   ├── [id]/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   └── layout.tsx
│   └── layout.tsx      # ユーザー向けページの共通レイアウト
└── layout.tsx          # ルートレイアウト
```

#### 7. Client Component の最適化

- Client Component は可能な限り小さく保つ
- 大きなライブラリは Client Component でのみインポート
- Server Component から Client Component にはシリアライズ可能な props のみ渡す

#### 8. Streaming と Suspense

- `loading.tsx` または `<Suspense>` を使用して UI を段階的に表示
- 重要なコンテンツを優先的に表示し、それ以外は後から読み込む

#### 9. Route Handlers (API Routes)

- `app/api/*/route.ts` で API エンドポイントを定義
- `GET`, `POST`, `PUT`, `DELETE` などの HTTP メソッドをエクスポート

#### 10. 画像最適化

- `next/image` コンポーネントを使用
- 静的インポートで画像サイズを自動検出
- 外部画像には width と height を指定

#### 11. Font 最適化

- `next/font` を使用してフォントを最適化
- layout.tsx でフォントを定義し、全体に適用

#### 12. 並列ルートとインターセプトルート

- `@folder` - 並列ルート（同時に複数のページを表示）
- `(.)folder` - インターセプトルート（モーダルなどに使用）

### Supabase Auth Server-side 実装ルール

#### 1. Supabase クライアントの作成

2 種類のクライアントを使い分ける：

- **Browser Client**: Client Components で使用
- **Server Client**: Server Components, Route Handlers, Server Actions で使用

```typescript
// utils/supabase/client.ts - Client Component 用
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// utils/supabase/server.ts - Server Component 用
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

#### 2. Middleware の設定

認証トークンのリフレッシュとクッキー管理のため必須：

```typescript
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

#### 3. 認証フローの実装

Server Actions を使用してログイン・サインアップを実装：

```typescript
// app/login/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login?message=Error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/login?message=Check email to continue sign in process");
}
```

#### 4. 保護されたルートの実装

**重要**: サーバーサイドでは必ず `getUser()` を使用し、`getSession()` は信頼しない

```typescript
// app/(user)/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  // getUser() で認証を確認
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome {user.email}</h1>
    </div>
  );
}
```

#### 5. Google OAuth の実装

OAuth プロバイダーを使用する場合の実装：

```typescript
// app/login/google-auth.tsx
"use client";

import { createClient } from "@/utils/supabase/client";

export function GoogleAuthButton() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
}
```

#### 6. 重要な注意事項

- 各ルートで新しい Supabase クライアントを作成する
- 認証が必要なルートでは Next.js のキャッシュを無効化
- Email 確認フローには専用の Route Handler を実装
- RLS ポリシーは Supabase ダッシュボードで適切に設定
- クッキーベースのセッション管理を使用（JWT はクッキーに保存）

## Important Notes

- Supabase 管理画面で RLS ポリシーを適切に設定すること
- レスポンシブデザイン対応必須
- SEO 対策（メタタグ、構造化データ）を実装

## 開発時の注意事項

### チケット管理について

- 作業を完了したら、必ず対応するチケット（`docs/XXX-*.md`）内のTODOリストにチェック `[x]` を入れること
- 部分的に完了した場合も、完了した項目にはチェックを入れる
- チケット一覧（`docs/000-ticket-index.md`）の進捗状況も更新する
  - 完了: ✅
  - 進行中: 🔄
  - 未着手: （マークなし）
