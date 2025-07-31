import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { updateProfileSchema, formatValidationError } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // 現在のユーザーを取得
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // リクエストボディの検証
    const body = await request.json()
    const validationResult = updateProfileSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        formatValidationError(validationResult.error),
        { status: 400 }
      )
    }
    
    const validatedData = validationResult.data
    
    // プロフィールを更新
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        ...validatedData,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single()
    
    if (error) {
      console.error('Profile update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ profile: data })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}