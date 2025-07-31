import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser, getUserProfile } from '@/lib/auth/get-user'
import { idParamSchema, formatValidationError } from '@/lib/validations'
import { z } from 'zod'

// Section作成用のスキーマを定義
const createSectionBodySchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(255, 'タイトルは255文字以内で入力してください'),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // パラメータの解決
    const resolvedParams = await params
    
    // パラメータの検証
    const paramResult = idParamSchema.safeParse(resolvedParams)
    if (!paramResult.success) {
      return NextResponse.json(
        formatValidationError(paramResult.error),
        { status: 400 }
      )
    }
    
    // 認証チェック
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 管理者権限チェック
    const userProfile = await getUserProfile()
    if (userProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // リクエストボディの検証
    const body = await request.json()
    const validationResult = createSectionBodySchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        formatValidationError(validationResult.error),
        { status: 400 }
      )
    }
    
    const data = validationResult.data
    const supabase = await createClient()

    // 現在の最大order_indexを取得
    const { data: sections } = await supabase
      .from('sections')
      .select('order_index')
      .eq('course_id', resolvedParams.id)
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = sections && sections.length > 0 
      ? sections[0].order_index + 1 
      : 1

    const { data: section, error } = await supabase
      .from('sections')
      .insert({
        course_id: resolvedParams.id,
        title: data.title,
        order_index: nextOrderIndex,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(section)
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}