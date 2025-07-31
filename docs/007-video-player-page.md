# チケット007: 動画視聴ページ

## 概要
YouTube動画の埋め込み表示と進捗管理機能を実装する

## 作業内容

### 動画視聴ページ
- [x] app/(user)/course/[id]/video/[videoId]/page.tsx の作成
  - [x] 動画情報の取得
  - [x] アクセス権限チェック
  - [x] 前後の動画情報取得

### YouTube埋め込みコンポーネント
- [x] components/video/YouTubePlayer.tsx の作成
  - [x] YouTube iframe埋め込み
  - [x] レスポンシブ対応
  - [x] セキュリティ設定（sandbox属性）

### 動画コントロール
- [x] components/video/VideoControls.tsx の作成
  - [x] 完了マークボタン
  - [x] 前の動画/次の動画ボタン
  - [x] 講座一覧に戻るボタン

### 進捗管理
- [x] lib/actions/progress.ts の拡張
  - [x] markVideoAsCompleted() - 動画完了マーク
  - [x] markVideoAsIncomplete() - 完了マーク解除
- [x] 完了状態のリアルタイム更新

### サイドバー
- [x] components/video/VideoSidebar.tsx の作成
  - [x] 講座内の全動画リスト
  - [x] 現在の動画ハイライト
  - [x] 完了状態表示

### エラーハンドリング
- [x] 動画が見つからない場合
- [x] アクセス権限がない場合
- [x] YouTube URLが無効な場合

### ローディング状態
- [x] app/(user)/course/[id]/video/[videoId]/loading.tsx

## 技術詳細
- YouTube iframe API
- Server Actions
- Optimistic Updates

## 依存関係
- チケット006: 講座詳細ページ実装完了

## 完了条件
- YouTube動画が表示される
- 完了マーク機能が動作する
- 前後の動画へ移動できる
- アクセス制御が正しく動作する