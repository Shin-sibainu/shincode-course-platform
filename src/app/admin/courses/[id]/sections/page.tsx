import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourseById } from '@/lib/actions/courses'
import { getCourseSections } from '@/lib/actions/courses'
import SectionTableRow from '@/components/admin/section-table-row'
import SectionForm from '@/components/admin/section-form'

interface SectionManagementPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SectionManagementPage({ params }: SectionManagementPageProps) {
  const { id } = await params
  const course = await getCourseById(id)
  if (!course) {
    notFound()
  }

  const sections = await getCourseSections(id)

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/courses"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          講座一覧に戻る
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          セクション管理
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {course.title} のセクションを管理します
        </p>
      </div>

      {/* 新規セクション追加フォーム */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          新規セクション追加
        </h2>
        <SectionForm courseId={id} />
      </div>

      {/* セクション一覧 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            セクション一覧
          </h2>
        </div>
        
        {sections.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            まだセクションがありません
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    順序
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    セクション名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    動画数
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sections.map((section, index) => (
                  <SectionTableRow 
                    key={section.id} 
                    section={section} 
                    courseId={id}
                    index={index}
                    totalSections={sections.length}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}