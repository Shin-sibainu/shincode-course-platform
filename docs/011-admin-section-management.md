# チケット011: セクション管理機能

## 概要
講座内のセクション作成・編集・削除・並び替え機能を実装する

## 作業内容

### セクション管理ページ
- [ ] app/admin/courses/[id]/sections/page.tsx の作成
  - [ ] セクション一覧表示
  - [ ] ドラッグ&ドロップで並び替え
  - [ ] 新規作成ボタン

### データ操作関数
- [ ] lib/actions/admin/sections.ts の作成
  - [ ] createSection() - セクション作成
  - [ ] updateSection() - セクション更新
  - [ ] deleteSection() - セクション削除
  - [ ] reorderSections() - セクション並び替え

### セクション作成/編集
- [ ] components/admin/sections/SectionForm.tsx
  - [ ] タイトル入力
  - [ ] インライン編集対応
  - [ ] バリデーション

### ドラッグ&ドロップ
- [ ] components/admin/sections/SortableSection.tsx
  - [ ] ドラッグ可能なセクションアイテム
  - [ ] 視覚的フィードバック
- [ ] ライブラリの選定と実装
  - [ ] @dnd-kit/sortable または react-sortable-hoc

### セクション内の動画表示
- [ ] components/admin/sections/SectionVideos.tsx
  - [ ] セクション内の動画一覧
  - [ ] 動画管理ページへのリンク

### 削除時の確認
- [ ] セクション削除時の動画確認
- [ ] 関連動画も削除されることの警告

### 空状態
- [ ] セクションがない場合の表示
- [ ] 作成ガイド

## 技術詳細
- Server Actions
- Drag & Drop API
- Optimistic updates
- Cascade delete

## 依存関係
- チケット010: 講座管理機能実装完了

## 完了条件
- セクションの作成・編集・削除ができる
- ドラッグ&ドロップで並び替えができる
- order_indexが正しく更新される
- 削除時の確認が動作する