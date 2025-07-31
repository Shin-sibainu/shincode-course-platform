# チケット009: 管理画面ダッシュボード

## 概要
管理者向けのダッシュボードと基本的な管理機能を実装する

## 作業内容

### 管理者権限チェック
- [x] lib/auth/admin.ts の作成
  - [x] checkAdminRole() - 管理者権限確認
  - [x] requireAdmin() - 管理者必須チェック

### 管理画面ダッシュボード
- [x] app/admin/page.tsx の作成
  - [x] 統計情報の表示
  - [x] クイックアクション

### 統計データ取得
- [x] lib/actions/admin/stats.ts の作成
  - [x] getTotalUsers() - 総ユーザー数
  - [x] getTotalCourses() - 総講座数
  - [x] getTotalVideos() - 総動画数
  - [x] getActiveUsers() - アクティブユーザー数

### ダッシュボードコンポーネント
- [x] components/admin/StatsGrid.tsx
  - [x] 統計カードのグリッド表示
- [x] components/admin/QuickActions.tsx
  - [x] 講座作成へのリンク
  - [x] ユーザー管理へのリンク
- [x] components/admin/RecentActivities.tsx
  - [x] 最近の更新履歴

### エラーページ
- [ ] app/admin/error.tsx
  - [ ] 権限エラーの表示
- [ ] app/admin/not-found.tsx
  - [ ] 404ページ

### ローディング
- [x] app/admin/loading.tsx
  - [x] 管理画面用ローディング

## 技術詳細
- Server Components
- 管理者権限チェック
- エラーバウンダリー

## 依存関係
- チケット004: レイアウト実装完了
- チケット003: 認証システム実装完了

## 完了条件
- 管理者のみアクセス可能
- 統計情報が表示される
- 各管理機能へのナビゲーションが動作する
- 権限エラーが適切に表示される