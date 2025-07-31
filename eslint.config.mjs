import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 未使用変数の警告を無効化（ただし、_で始まる変数は許可）
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      // 空のインターフェースを許可
      "@typescript-eslint/no-empty-object-type": "off",
      // any型の使用を警告に変更（エラーではなく）
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
];

export default eslintConfig;
