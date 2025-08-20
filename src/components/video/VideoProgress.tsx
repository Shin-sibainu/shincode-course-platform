'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface VideoProgressProps {
  videoId: string
}

export default function VideoProgress({ videoId }: VideoProgressProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Load initial progress state
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setIsLoading(false)
          return
        }

        const { data: progress } = await supabase
          .from('user_progress')
          .select('completed')
          .eq('user_id', user.id)
          .eq('video_id', videoId)
          .single()

        if (progress) {
          setIsCompleted(progress.completed)
        }
      } catch (error) {
        console.error('Error loading progress:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [videoId, supabase])

  const handleToggleComplete = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const newCompletedState = !isCompleted

      // Always use upsert to handle both cases
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          video_id: videoId,
          completed: newCompletedState,
          completed_at: newCompletedState ? new Date().toISOString() : null
        })

      if (error) {
        console.error('Error updating progress:', error)
        return
      }

      setIsCompleted(newCompletedState)
      
      // Force page refresh to update progress display
      window.location.reload()
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