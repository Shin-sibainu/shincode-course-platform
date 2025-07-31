import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser, getUserProfile } from '@/lib/auth/get-user'
import { updateCourseSchema, idParamSchema, formatValidationError } from '@/lib/validations'

export async function PUT(
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
    const validationResult = updateCourseSchema.safeParse(body)
    
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
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', resolvedParams.id)
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

export async function DELETE(
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

    const supabase = await createClient()

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', resolvedParams.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}