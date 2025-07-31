'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SyncProfileButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSync = async () => {
    try {
      setIsLoading(true)
      
      // sync_user_profile関数を実行
      const { data, error } = await supabase
        .rpc('sync_user_profile')
      
      if (error) {
        console.error('Profile sync error:', error)
        alert('プロフィールの同期に失敗しました。')
      } else {
        console.log('Profile synced:', data)
        alert('プロフィールを同期しました。')
        router.refresh()
      }
    } catch (error) {
      console.error('Sync error:', error)
      alert('エラーが発生しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSync}
      disabled={isLoading}
      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? '同期中...' : 'プロフィールを同期'}
    </button>
  )
}