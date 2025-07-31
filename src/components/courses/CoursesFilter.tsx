'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function CoursesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const categories = [
    { id: 'web', name: 'Web開発' },
    { id: 'mobile', name: 'モバイル開発' },
    { id: 'ai', name: 'AI・機械学習' },
    { id: 'data', name: 'データサイエンス' },
    { id: 'cloud', name: 'クラウド' },
    { id: 'security', name: 'セキュリティ' },
  ]
  
  const levels = [
    { id: 'beginner', name: '初級' },
    { id: 'intermediate', name: '中級' },
    { id: 'advanced', name: '上級' },
  ]
  
  const sortOptions = [
    { id: 'newest', name: '新着順' },
    { id: 'popular', name: '人気順' },
  ]
  
  const handleFilterChange = (type: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    if (value) {
      current.set(type, value)
    } else {
      current.delete(type)
    }
    
    // ページ番号をリセット
    current.delete('page')
    
    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/courses${query}`)
  }
  
  const handleClearFilters = () => {
    router.push('/courses')
  }
  
  const activeCategory = searchParams.get('category')
  const activeLevel = searchParams.get('level')
  const activeSort = searchParams.get('sort') || 'newest'
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          フィルター
        </h2>
        <button
          onClick={handleClearFilters}
          className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          クリア
        </button>
      </div>
      
      {/* カテゴリー */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          カテゴリー
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={activeCategory === category.id}
                onChange={(e) => handleFilterChange('category', e.target.checked ? e.target.value : '')}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* レベル */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          レベル
        </h3>
        <div className="space-y-2">
          {levels.map((level) => (
            <label key={level.id} className="flex items-center">
              <input
                type="radio"
                name="level"
                value={level.id}
                checked={activeLevel === level.id}
                onChange={(e) => handleFilterChange('level', e.target.checked ? e.target.value : '')}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {level.name}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* ソート */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          並び替え
        </h3>
        <select
          value={activeSort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}