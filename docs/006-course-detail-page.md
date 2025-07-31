# チケット006: 講座詳細ページ

## 概要
講座の詳細情報とセクション・動画の階層構造を表示する

## 作業内容

### データ取得関数の拡張
- [x] lib/actions/sections.ts の作成
  - [x] getSectionsByCourseId() - 講座のセクション取得
- [x] lib/actions/videos.ts の作成
  - [x] getVideosBySectionId() - セクションの動画取得
  - [x] getVideosByIds() - 複数動画の一括取得
- [x] lib/actions/progress.ts の作成
  - [x] getUserProgress() - ユーザーの進捗取得
  - [x] calculateCourseProgress() - 講座の進捗率計算

### 講座詳細ページ
- [x] app/(user)/course/[id]/page.tsx の作成
  - [x] 講座情報の表示
  - [x] セクション一覧の表示
  - [x] 全体進捗率の表示

### コンポーネント作成
- [x] components/course/CourseHeader.tsx
  - [x] タイトル、説明文
  - [x] サムネイル
  - [x] 全体進捗バー
- [x] components/course/SectionList.tsx
  - [x] セクション一覧表示
  - [x] アコーディオン形式
- [x] components/course/SectionItem.tsx
  - [x] セクションタイトル
  - [x] セクション進捗
  - [x] 動画リスト
- [x] components/course/VideoItem.tsx
  - [x] 動画タイトル
  - [x] 時間表示
  - [x] 完了状態表示
  - [x] 無料/有料バッジ

### 進捗表示
- [x] components/ui/ProgressBar.tsx
  - [x] 進捗バーコンポーネント
  - [x] パーセンテージ表示

### アクセス制御
- [x] 認証チェック（2本目以降の動画）
- [x] 未認証時のメッセージ表示

## 技術詳細
- Server Components
- 並列データフェッチ
- Suspense境界

## 依存関係
- チケット005: 講座一覧実装完了

## 完了条件
- 講座詳細が表示される
- セクションと動画が階層表示される
- 進捗率が正しく計算・表示される
- アクセス制御が動作する