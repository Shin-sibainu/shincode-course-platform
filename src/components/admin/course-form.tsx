'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Course } from '@/types/course'

interface CourseFormProps {
  course?: Course
}

export default function CourseForm({ course }: CourseFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    thumbnail_url: course?.thumbnail_url || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = course
        ? `/api/admin/courses/${course.id}`
        : '/api/admin/courses'
      const method = course ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('保存に失敗しました')
      }

      router.push('/admin/courses')
      router.refresh()
    } catch (_error) {
      alert('エラーが発生しました')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          講座タイトル *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="例: Next.jsで作るフルスタックWebアプリ開発"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          講座説明
        </label>
        <textarea
          id="description"
          rows={5}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="講座の内容を詳しく説明してください"
        />
      </div>

      <div>
        <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          サムネイル画像URL
        </label>
        <input
          type="url"
          id="thumbnail_url"
          value={formData.thumbnail_url}
          onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="https://example.com/image.jpg"
        />
        {formData.thumbnail_url && (
          <div className="mt-2 relative h-32 w-56">
            <Image
              src={formData.thumbnail_url}
              alt="サムネイルプレビュー"
              fill
              className="rounded-lg object-cover"
              sizes="224px"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : course ? '更新' : '作成'}
        </button>
      </div>
    </form>
  )
}