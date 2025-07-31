'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Section } from '@/types/course'
import SectionForm from './section-form'

interface SectionTableRowProps {
  section: Section
  courseId: string
  index: number
  totalSections: number
}

export default function SectionTableRow({ 
  section, 
  courseId, 
  index,
  totalSections 
}: SectionTableRowProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`「${section.title}」を削除しますか？関連する動画も削除されます。`)) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/sections/${section.id}`, {
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
      const response = await fetch(`/api/admin/sections/${section.id}/order`, {
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

  if (isEditing) {
    return (
      <tr>
        <td colSpan={4} className="px-6 py-4">
          <SectionForm 
            courseId={courseId} 
            section={section} 
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
            {section.order_index}
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
              disabled={index === totalSections - 1 || isMoving}
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
          {section.title}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {section.video_count || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
          >
            編集
          </button>
          <Link
            href={`/admin/courses/${courseId}/sections/${section.id}/videos`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          >
            動画管理
          </Link>
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