'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Video } from '@/types/course'
import VideoForm from './video-form'

interface VideoTableRowProps {
  video: Video
  index: number
  totalVideos: number
}

export default function VideoTableRow({ 
  video, 
  index,
  totalVideos 
}: VideoTableRowProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`「${video.title}」を削除しますか？`)) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('削除に失敗しました')
      }

      router.refresh()
    } catch (_error) {
      alert('削除中にエラーが発生しました')
      setIsDeleting(false)
    }
  }

  const handleMove = async (direction: 'up' | 'down') => {
    setIsMoving(true)
    try {
      const response = await fetch(`/api/admin/videos/${video.id}/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ direction }),
      })

      if (!response.ok) {
        throw new Error('並び替えに失敗しました')
      }

      router.refresh()
    } catch (_error) {
      alert('並び替え中にエラーが発生しました')
    } finally {
      setIsMoving(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (isEditing) {
    return (
      <tr>
        <td colSpan={6} className="px-6 py-4">
          <VideoForm 
            sectionId={video.section_id} 
            video={video} 
            onCancel={() => setIsEditing(false)}
          />
        </td>
      </tr>
    )
  }

  return (
    <tr className={isDeleting ? 'opacity-50' : ''}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-900 dark:text-white">
            {video.order_index}
          </span>
          <div className="flex flex-col">
            <button
              onClick={() => handleMove('up')}
              disabled={index === 0 || isMoving}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={() => handleMove('down')}
              disabled={index === totalVideos - 1 || isMoving}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-white">
          {video.title}
        </div>
      </td>
      <td className="px-6 py-4">
        <a 
          href={video.youtube_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {video.youtube_url.substring(0, 30)}...
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {video.is_free ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            無料
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            有料
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {video.duration ? formatDuration(video.duration) : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
          >
            削除
          </button>
        </div>
      </td>
    </tr>
  )
}