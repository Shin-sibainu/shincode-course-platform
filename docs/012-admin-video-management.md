# チケット012: 動画管理機能

## 概要
セクション内の動画追加・編集・削除・並び替え機能を実装する

## 作業内容

### 動画管理ページ
- [ ] app/admin/courses/[id]/sections/[sectionId]/videos/page.tsx の作成
  - [ ] 動画一覧表示
  - [ ] ドラッグ&ドロップで並び替え
  - [ ] 新規追加ボタン

### データ操作関数
- [ ] lib/actions/admin/videos.ts の作成
  - [ ] createVideo() - 動画追加
  - [ ] updateVideo() - 動画更新
  - [ ] deleteVideo() - 動画削除
  - [ ] reorderVideos() - 動画並び替え
  - [ ] extractYouTubeId() - YouTube URL解析

### 動画追加/編集フォーム
- [ ] components/admin/videos/VideoForm.tsx
  - [ ] タイトル入力
  - [ ] YouTube URL入力
  - [ ] 無料/有料フラグ
  - [ ] 動画時間（自動/手動）
  - [ ] バリデーション

### YouTube URL処理
- [ ] lib/utils/youtube.ts の作成
  - [ ] URL形式の検証
  - [ ] 動画IDの抽出
  - [ ] サムネイルURL生成
  - [ ] 埋め込みURL生成

### ドラッグ&ドロップ
- [ ] components/admin/videos/SortableVideo.tsx
  - [ ] ドラッグ可能な動画アイテム
  - [ ] プレビュー表示

### 動画プレビュー
- [ ] components/admin/videos/VideoPreview.tsx
  - [ ] YouTubeサムネイル表示
  - [ ] 基本情報表示
  - [ ] 編集・削除ボタン

### バッチ操作
- [ ] 複数動画の一括追加
- [ ] CSVインポート（オプション）

### エラーハンドリング
- [ ] 無効なYouTube URL
- [ ] 重複URL警告
- [ ] API制限対応

## 技術詳細
- YouTube Data API（オプション）
- Server Actions
- URL validation
- Drag & Drop

## 依存関係
- チケット011: セクション管理機能実装完了

## 完了条件
- 動画の追加・編集・削除ができる
- YouTube URLから動画情報を取得できる
- ドラッグ&ドロップで並び替えができる
- 無料/有料フラグが設定できる