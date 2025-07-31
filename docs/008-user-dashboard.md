# チケット008: ユーザーダッシュボード

## 概要
ユーザーの学習進捗と受講中の講座を表示するダッシュボードを実装する

## 作業内容

### ダッシュボードページ
- [x] app/(user)/dashboard/page.tsx の作成
  - [x] ユーザー情報の表示
  - [x] 受講中講座の取得
  - [x] 学習統計の計算

### データ取得関数
- [x] lib/actions/dashboard.ts の作成
  - [x] getUserCourses() - ユーザーの受講講座取得
  - [x] getLearningStats() - 学習統計取得
  - [x] getRecentActivity() - 最近の学習履歴

### ダッシュボードコンポーネント
- [x] components/dashboard/StatsCard.tsx
  - [x] 統計情報カード（完了講座数、総視聴時間など）
- [x] components/dashboard/CourseProgress.tsx
  - [x] 受講中講座の進捗表示
  - [x] 講座へのリンク
- [x] components/dashboard/RecentActivity.tsx
  - [x] 最近視聴した動画リスト
  - [x] 視聴日時表示

### プロフィール表示
- [x] components/dashboard/UserProfile.tsx
  - [x] アバター表示
  - [x] 名前、メールアドレス
  - [x] プロフィール編集リンク

### 空状態
- [x] 受講講座がない場合の表示
- [x] 講座探索への誘導

### グラフ表示（オプション）
- [ ] 学習時間の推移グラフ
- [ ] 進捗率のビジュアル表示

## 技術詳細
- Server Components
- 並列データフェッチ
- Tailwind CSS Grid

## 依存関係
- チケット003: 認証システム実装完了
- チケット007: 動画視聴ページ実装完了

## 完了条件
- ダッシュボードが表示される
- 受講中の講座と進捗が確認できる
- 学習統計が表示される
- レスポンシブデザインが実装されている