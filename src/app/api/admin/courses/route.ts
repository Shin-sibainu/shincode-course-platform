import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser, getUserProfile } from '@/lib/auth/get-user'
import { createCourseSchema, formatValidationError } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
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
    const validationResult = createCourseSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        formatValidationError(validationResult.error),
        { status: 400 }
      )
    }
    
    const data = validationResult.data
    const supabase = await createClient()

    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        title: data.title,
        description: data.description,
        thumbnail_url: data.thumbnail_url,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(course)
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}