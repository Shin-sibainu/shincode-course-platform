'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface VideoProgressProps {
  videoId: string
}

export default function VideoProgress({ videoId }: VideoProgressProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleToggleComplete = async () => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      if (isCompleted) {
        // Mark as incomplete
        await supabase
          .from('user_progress')
          .update({ completed: false, completed_at: null })
          .eq('user_id', user.id)
          .eq('video_id', videoId)
      } else {
        // Mark as complete
        await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            video_id: videoId,
            completed: true,
            completed_at: new Date().toISOString()
          })
      }

      setIsCompleted(!isCompleted)
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleComplete}
          disabled={isLoading}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded font-medium transition
            ${isCompleted
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isCompleted ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>完了済み</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>完了にする</span>
            </>
          )}
        </button>
      </div>

      <div className="text-sm text-gray-400">
        進捗を記録して学習を管理しましょう
      </div>
    </div>
  )
}