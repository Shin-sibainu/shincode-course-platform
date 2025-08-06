# Code Style and Conventions

## TypeScript設定
- **Strict Mode**: 有効（`strict: true`）
- **Target**: ES2017
- **Module Resolution**: bundler
- **Path Alias**: `@/*` → `./src/*`

## ESLint設定
- Next.js推奨ルール使用（`next/core-web-vitals`, `next/typescript`）
- カスタムルール:
  - 未使用変数: `_`で始まる変数は許可
  - 空のインターフェース: 許可
  - any型の使用: 警告（エラーではない）

## ファイル・フォルダ命名規則
- **コンポーネント**: PascalCase（例: `CourseCard.tsx`）
- **ユーティリティ**: camelCase（例: `getCourse.ts`）
- **APIルート**: kebab-case（例: `route.ts`）
- **ページファイル**: 常に`page.tsx`
- **レイアウト**: `layout.tsx`

## Next.js App Router規約
- **ルートグループ**: `(folder)` - URLに影響しない
- **動的ルート**: `[folder]` - パラメータ
- **Server Components**: デフォルト（`"use client"`は必要時のみ）
- **データフェッチング**: Server Componentsで`async/await`使用
- **ローディング**: `loading.tsx`でSuspense境界を作成
- **エラー処理**: `error.tsx`（必ずClient Component）

## コンポーネント設計
- 機能単位で`src/components/`に配置
- Props定義は`interface`を使用
- Server ComponentsとClient Componentsを適切に分離
- Client Componentsは可能な限り小さく保つ

## Supabase実装ルール
- **Browser Client**: Client Components用
- **Server Client**: Server Components, Route Handlers用
- 認証確認は`getUser()`を使用（`getSession()`は信頼しない）
- RLSポリシーを全テーブルに適用

## セキュリティ規約
- 環境変数は`.env.local`に保存
- シークレットキーをコミットしない
- YouTube埋め込みにはsandbox属性を使用
- ユーザー入力は必ず検証（Zodスキーマ使用）

## import順序
1. React/Next.js関連
2. 外部ライブラリ
3. 内部ユーティリティ（`@/lib`）
4. 内部コンポーネント（`@/components`）
5. 型定義（`@/types`）
6. スタイル