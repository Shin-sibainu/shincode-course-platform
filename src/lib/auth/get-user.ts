import { createClient } from '@/lib/supabase/server'
import { UserProfile } from '@/types/supabase'
import { cache } from 'react'
import type { User } from '@supabase/supabase-js'

// React cacheを使用して同一リクエスト内での重複呼び出しを防ぐ
export const getUser = cache(async () => {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
})

// ユーザーとプロフィールを同時に取得する関数
export const getUserWithProfile = cache(async (): Promise<{ user: User; profile: UserProfile | null } | null> => {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  return {
    user,
    profile: profile as UserProfile | null
  }
})

export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  const supabase = await createClient()
  
  let targetUserId = userId
  
  if (!targetUserId) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return null
    }
    
    targetUserId = user.id
  }
  
  // profilesテーブルから情報を取得
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', targetUserId)
    .single()
  
  if (profileError || !profile) {
    return null
  }
  
  return profile as UserProfile
}