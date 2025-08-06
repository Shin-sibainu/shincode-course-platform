# Suggested Commands for Development

## 開発コマンド
```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# ESLintによるコード品質チェック
npm run lint

# ダミーデータのシード（開発用）
npm run seed
```

## Git関連コマンド（Windows環境）
```bash
# 現在の状態確認
git status

# 変更の確認
git diff

# 変更をステージング
git add .

# コミット
git commit -m "commit message"

# プッシュ
git push

# ブランチ確認
git branch

# 新しいブランチ作成
git checkout -b branch-name
```

## ファイル操作（Windows環境）
```bash
# ディレクトリ表示
dir
# または
ls

# ディレクトリ移動
cd path/to/directory

# ファイル内容表示
type filename
# または
cat filename

# ファイル検索
dir /s filename
# または
find . -name filename
```

## Supabase関連
- Supabaseダッシュボードでデータベーススキーマとマイグレーションを管理
- 環境変数は`.env.local`に設定:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY

## 開発時の推奨フロー
1. `npm run dev`で開発サーバーを起動
2. コード変更後は自動でホットリロード
3. コミット前に`npm run lint`でコード品質チェック
4. エラーがあれば修正してから再度lint実行