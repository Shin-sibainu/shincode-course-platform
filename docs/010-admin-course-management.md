# チケット010: 講座管理機能

## 概要
管理者向けの講座作成・編集・削除機能を実装する

## 作業内容

### 講座一覧ページ
- [x] app/admin/courses/page.tsx の作成
  - [x] 講座一覧テーブル
  - [x] 新規作成ボタン
  - [x] 編集・削除アクション

### データ操作関数
- [x] lib/actions/admin/courses.ts の作成
  - [x] createCourse() - 講座作成
  - [x] updateCourse() - 講座更新
  - [x] deleteCourse() - 講座削除
  - [-] uploadThumbnail() - サムネイルアップロード

### 講座作成ページ
- [x] app/admin/courses/new/page.tsx の作成
  - [x] 講座作成フォーム
- [x] components/admin/courses/CourseForm.tsx
  - [x] タイトル入力
  - [x] 説明文入力
  - [x] サムネイルアップロード
  - [x] バリデーション

### 講座編集ページ
- [x] app/admin/courses/[id]/page.tsx の作成
  - [x] 既存データの読み込み
  - [x] 編集フォーム

### 画像アップロード
- [ ] lib/storage/upload.ts の作成
  - [ ] Supabase Storageへのアップロード
- [ ] components/ui/ImageUpload.tsx
  - [ ] ドラッグ&ドロップ対応
  - [ ] プレビュー表示
  - [ ] ファイルサイズ制限

### 削除確認
- [x] components/ui/ConfirmDialog.tsx
  - [x] 削除確認ダイアログ
  - [x] キャンセル可能

### テーブルコンポーネント
- [ ] components/admin/courses/CourseTable.tsx
  - [ ] ソート機能
  - [ ] ページネーション
  - [ ] 検索機能

## 技術詳細
- Server Actions
- Supabase Storage
- Form validation
- Optimistic updates

## 依存関係
- チケット009: 管理画面ダッシュボード実装完了

## 完了条件
- 講座の作成・編集・削除ができる
- サムネイル画像のアップロードが動作する
- バリデーションが適切に動作する
- 一覧表示とページネーションが動作する