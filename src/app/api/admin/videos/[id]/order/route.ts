import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser, getUserProfile } from '@/lib/auth/get-user'
import { idParamSchema, formatValidationError } from '@/lib/validations'
import { z } from 'zod'

// 順序変更用のスキーマ
const reorderSchema = z.object({
  direction: z.enum(['up', 'down'])
})

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
    const validationResult = reorderSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        formatValidationError(validationResult.error),
        { status: 400 }
      )
    }
    
    const { direction } = validationResult.data
    const supabase = await createClient()

    // 現在の動画を取得
    const { data: currentVideo, error: fetchError } = await supabase
      .from('videos')
      .select('*')
      .eq('id', resolvedParams.id)
      .single()

    if (fetchError || !currentVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    // 同じセクションの全動画を取得
    const { data: allVideos, error: videosError } = await supabase
      .from('videos')
      .select('*')
      .eq('section_id', currentVideo.section_id)
      .order('order_index', { ascending: true })

    if (videosError || !allVideos) {
      return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
    }

    const currentIndex = allVideos.findIndex(v => v.id === resolvedParams.id)
    
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === allVideos.length - 1)
    ) {
      return NextResponse.json({ error: 'Cannot move in this direction' }, { status: 400 })
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const targetVideo = allVideos[targetIndex]

    // 順序を入れ替え
    const { error: updateError1 } = await supabase
      .from('videos')
      .update({ order_index: targetVideo.order_index })
      .eq('id', currentVideo.id)

    const { error: updateError2 } = await supabase
      .from('videos')
      .update({ order_index: currentVideo.order_index })
      .eq('id', targetVideo.id)

    if (updateError1 || updateError2) {
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}