'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Course } from '@/types/course'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface CourseTableRowProps {
  course: Course
}

export default function CourseTableRow({ course }: CourseTableRowProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`「${course.title}」を削除しますか？この操作は取り消せません。`)) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/courses/${course.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('削除に失敗しました')
      }

      // ページをリロードして最新の状態を反映
      window.location.reload()
    } catch (_error) {
      alert('削除中にエラーが発生しました')
      setIsDeleting(false)
    }
  }

  return (
    <tr className={isDeleting ? 'opacity-50' : ''}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {course.thumbnail_url && (
            <div className="h-10 w-10 flex-shrink-0 relative">
              <Image
                className="rounded-lg object-cover"
                src={course.thumbnail_url}
                alt={course.title}
                fill
                sizes="40px"
              />
            </div>
          )}
          <div className={course.thumbnail_url ? 'ml-4' : ''}>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {course.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {course.description?.substring(0, 50)}...
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {course.section_count || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {course.video_count || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {format(new Date(course.created_at), 'yyyy年MM月dd日', { locale: ja })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Link
            href={`/admin/courses/${course.id}`}
            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
          >
            編集
          </Link>
          <Link
            href={`/admin/courses/${course.id}/sections`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          >
            セクション
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