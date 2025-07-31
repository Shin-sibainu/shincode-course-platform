import { z } from 'zod'

// 共通のバリデーションルール
const titleSchema = z.string().min(1, 'タイトルは必須です').max(255, 'タイトルは255文字以内で入力してください')
const descriptionSchema = z.string().max(1000, '説明は1000文字以内で入力してください').optional()
const urlSchema = z.string().url('有効なURLを入力してください').optional()
const uuidSchema = z.string().uuid('有効なIDではありません')

// Course スキーマ
export const createCourseSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  thumbnail_url: urlSchema,
})

export const updateCourseSchema = createCourseSchema.partial()

// Section スキーマ
export const createSectionSchema = z.object({
  title: titleSchema,
  order_index: z.number().int().min(0, '順序は0以上の整数である必要があります'),
})

export const updateSectionSchema = z.object({
  title: titleSchema.optional(),
  order_index: z.number().int().min(0).optional(),
})

export const updateSectionOrderSchema = z.object({
  order_index: z.number().int().min(0, '順序は0以上の整数である必要があります'),
})

// Video スキーマ
export const createVideoSchema = z.object({
  title: titleSchema,
  youtube_url: z.string()
    .min(1, 'YouTube URLは必須です')
    .refine((url) => {
      // YouTube URLの基本的な検証
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+$/
      return youtubeRegex.test(url)
    }, ' 有効なYouTube URLを入力してください'),
  duration: z.number().int().min(0).optional(),
  order_index: z.number().int().min(0),
  is_free: z.boolean().default(false),
})

export const updateVideoSchema = z.object({
  title: titleSchema.optional(),
  youtube_url: z.string()
    .refine((url) => {
      if (!url) return true // オプショナルなので空でもOK
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+$/
      return youtubeRegex.test(url)
    }, '有効なYouTube URLを入力してください')
    .optional(),
  duration: z.number().int().min(0).optional(),
  order_index: z.number().int().min(0).optional(),
  is_free: z.boolean().optional(),
})

export const updateVideoOrderSchema = z.object({
  order_index: z.number().int().min(0, '順序は0以上の整数である必要があります'),
})

// Profile スキーマ
export const updateProfileSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください').optional(),
  full_name: z.string().max(255, '名前は255文字以内で入力してください').optional(),
  avatar_url: urlSchema,
})

// パラメータ検証
export const idParamSchema = z.object({
  id: uuidSchema,
})

// エラーレスポンスの型
export interface ValidationError {
  error: string
  details?: z.ZodIssue[]
}

// バリデーションエラーをレスポンス用に整形
export function formatValidationError(error: z.ZodError): ValidationError {
  const firstError = error.issues[0]
  return {
    error: firstError?.message || 'バリデーションエラーが発生しました',
    details: error.issues,
  }
}