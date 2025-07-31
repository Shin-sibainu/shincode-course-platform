import { getCourses } from '@/lib/actions/courses'
import CourseCard from '@/components/course/CourseCard'
import CoursesFilter from '@/components/courses/CoursesFilter'
import CoursesHeader from '@/components/courses/CoursesHeader'

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; level?: string; sort?: string; page?: string }>
}) {
  const params = await searchParams
  
  // 全講座を取得
  const allCourses = await getCourses()
  
  // フィルタリング（実際のフィルタリングロジックは後で実装）
  let filteredCourses = allCourses
  
  // ソート
  if (params.sort === 'newest') {
    filteredCourses = [...filteredCourses].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  } else if (params.sort === 'popular') {
    // 人気順のソート（受講者数やレビューが必要）
    // 現在はダミー実装
  }
  
  // ページネーション
  const page = parseInt(params.page || '1')
  const itemsPerPage = 12
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CoursesHeader totalCourses={filteredCourses.length} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* サイドバーフィルター */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <CoursesFilter />
          </aside>
          
          {/* メインコンテンツ */}
          <main className="flex-1">
            {/* モバイル用フィルターボタン */}
            <div className="lg:hidden mb-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                フィルター
              </button>
            </div>
            
            {/* 講座グリッド */}
            {paginatedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  該当する講座が見つかりませんでした
                </p>
              </div>
            )}
            
            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                  {/* 前へボタン */}
                  <a
                    href={page > 1 ? `?page=${page - 1}` : '#'}
                    className={`px-3 py-2 rounded-lg ${
                      page > 1
                        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    前へ
                  </a>
                  
                  {/* ページ番号 */}
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1
                    const isActive = pageNum === page
                    
                    // 表示するページ番号を制限
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 2 && pageNum <= page + 2)
                    ) {
                      return (
                        <a
                          key={pageNum}
                          href={`?page=${pageNum}`}
                          className={`px-3 py-2 rounded-lg ${
                            isActive
                              ? 'bg-purple-600 text-white'
                              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </a>
                      )
                    } else if (
                      pageNum === page - 3 ||
                      pageNum === page + 3
                    ) {
                      return <span key={pageNum}>...</span>
                    }
                    return null
                  })}
                  
                  {/* 次へボタン */}
                  <a
                    href={page < totalPages ? `?page=${page + 1}` : '#'}
                    className={`px-3 py-2 rounded-lg ${
                      page < totalPages
                        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    次へ
                  </a>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}