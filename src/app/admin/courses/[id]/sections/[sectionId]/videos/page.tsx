import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourseById } from '@/lib/actions/courses'
import { getSectionById } from '@/lib/actions/sections'
import { getSectionVideos } from '@/lib/actions/courses'
import VideoTableRow from '@/components/admin/video-table-row'
import VideoForm from '@/components/admin/video-form'

interface VideoManagementPageProps {
  params: Promise<{
    id: string
    sectionId: string
  }>
}

export default async function VideoManagementPage({ params }: VideoManagementPageProps) {
  const { id, sectionId } = await params
  const course = await getCourseById(id)
  const section = await getSectionById(sectionId)
  
  if (!course || !section) {
    notFound()
  }

  const videos = await getSectionVideos(sectionId)

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link
            href="/admin/courses"
            className="hover:text-gray-900 dark:hover:text-gray-200"
          >
            講座一覧
          </Link>
          <span>/</span>
          <Link
            href={`/admin/courses/${id}/sections`}
            className="hover:text-gray-900 dark:hover:text-gray-200"
          >
            {course.title}
          </Link>
          <span>/</span>
          <span>{section.title}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          動画管理
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {section.title} の動画を管理します
        </p>
      </div>

      {/* 新規動画追加フォーム */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          新規動画追加
        </h2>
        <VideoForm sectionId={sectionId} />
      </div>

      {/* 動画一覧 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            動画一覧
          </h2>
        </div>
        
        {videos.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            まだ動画がありません
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
                    動画タイトル
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    YouTube URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    無料
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    時間
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {videos.map((video, index) => (
                  <VideoTableRow 
                    key={video.id} 
                    video={video}
                    index={index}
                    totalVideos={videos.length}
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