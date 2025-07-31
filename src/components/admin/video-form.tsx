'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Video } from '@/types/course'

interface VideoFormProps {
  sectionId: string
  video?: Video
  onCancel?: () => void
}

export default function VideoForm({ sectionId, video, onCancel }: VideoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: video?.title || '',
    youtube_url: video?.youtube_url || '',
    duration: video?.duration || 0,
    is_free: video?.is_free || false,
  })

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // YouTube URLのバリデーション
    const youtubeId = extractYouTubeId(formData.youtube_url)
    if (!youtubeId) {
      alert('有効なYouTube URLを入力してください')
      return
    }

    setIsSubmitting(true)

    try {
      const url = video
        ? `/api/admin/videos/${video.id}`
        : `/api/admin/sections/${sectionId}/videos`
      const method = video ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          youtube_url: `https://www.youtube.com/watch?v=${youtubeId}`,
        }),
      })

      if (!response.ok) {
        throw new Error('保存に失敗しました')
      }

      // フォームをリセット
      if (!video) {
        setFormData({
          title: '',
          youtube_url: '',
          duration: 0,
          is_free: false,
        })
      }
      
      router.refresh()
      
      if (video && onCancel) {
        onCancel()
      }
    } catch (_error) {
      alert('エラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            動画タイトル *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="例: イントロダクション"
          />
        </div>

        <div>
          <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            YouTube URL *
          </label>
          <input
            type="url"
            id="youtube_url"
            value={formData.youtube_url}
            onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            動画時間（秒）
          </label>
          <input
            type="number"
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
            min="0"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="300"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_free"
            checked={formData.is_free}
            onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="is_free" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            無料で公開する
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim() || !formData.youtube_url.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : video ? '更新' : '追加'}
        </button>
        {video && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}