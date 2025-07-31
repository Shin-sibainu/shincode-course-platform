'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Section } from '@/types/course'

interface SectionFormProps {
  courseId: string
  section?: Section
  onCancel?: () => void
}

export default function SectionForm({ courseId, section, onCancel }: SectionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState(section?.title || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)

    try {
      const url = section
        ? `/api/admin/sections/${section.id}`
        : `/api/admin/courses/${courseId}/sections`
      const method = section ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.trim() }),
      })

      if (!response.ok) {
        throw new Error('保存に失敗しました')
      }

      // フォームをリセット
      if (!section) {
        setTitle('')
      }
      
      // ページをリフレッシュ
      router.refresh()
      
      if (section && onCancel) {
        onCancel()
      }
    } catch (_error) {
      alert('エラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="セクション名を入力"
        required
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        {isSubmitting ? '保存中...' : section ? '更新' : '追加'}
      </button>
      {section && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          キャンセル
        </button>
      )}
    </form>
  )
}