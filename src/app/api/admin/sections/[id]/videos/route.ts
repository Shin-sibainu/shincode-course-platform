import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser, getUserProfile } from '@/lib/auth/get-user'
import { createVideoSchema, idParamSchema, formatValidationError } from '@/lib/validations'

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
    
    // 現在の最大order_indexを取得
    const supabase = await createClient()
    const { data: videos } = await supabase
      .from('videos')
      .select('order_index')
      .eq('section_id', resolvedParams.id)
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = videos && videos.length > 0 
      ? videos[0].order_index + 1 
      : 1
    
    // order_indexを含めて検証
    const validationResult = createVideoSchema.safeParse({
      ...body,
      order_index: nextOrderIndex,
    })
    
    if (!validationResult.success) {
      return NextResponse.json(
        formatValidationError(validationResult.error),
        { status: 400 }
      )
    }
    
    const data = validationResult.data

    const { data: video, error } = await supabase
      .from('videos')
      .insert({
        section_id: resolvedParams.id,
        title: data.title,
        youtube_url: data.youtube_url,
        duration: data.duration,
        is_free: data.is_free,
        order_index: data.order_index,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(video)
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}