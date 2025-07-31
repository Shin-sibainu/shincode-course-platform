import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getCourseWithSectionsAndVideos } from '@/lib/actions/courses'
import { getUser } from '@/lib/auth/get-user'
import type { Section, Video, CourseWithSections } from '@/types/course'

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getUser()
  const course: CourseWithSections | null = await getCourseWithSectionsAndVideos(id)

  if (!course) {
    notFound()
  }

  const totalVideos = course.sections.reduce((acc: number, section: Section & { videos: Video[] }) => acc + section.videos.length, 0)
  const freeVideos = course.sections.reduce((acc: number, section: Section & { videos: Video[] }) => 
    acc + section.videos.filter((v: Video) => v.is_free).length, 0
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Course Header */}
      <div className="bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <nav className="flex items-center space-x-2 text-sm mb-4">
              <Link href="/" className="hover:text-purple-400">ホーム</Link>
              <span>/</span>
              <span className="text-gray-400">講座詳細</span>
            </nav>
            
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-300 mb-6">{course.description}</p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">4.7</span>
                <span className="text-gray-400">(234 評価)</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>1,234 受講生</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>最終更新: 2024年12月</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                学習内容
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">AIの基本概念と仕組みを理解</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">実践的なプロジェクトを通じた学習</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">最新のAI技術トレンドを把握</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">実務で使えるスキルを習得</span>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                講座内容
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {course.sections.length} セクション • {totalVideos} レクチャー • 
                総時間 {Math.floor(totalVideos * 10)} 分
              </p>

              <div className="space-y-2">
                {course.sections.map((section) => (
                  <details key={section.id} className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded-lg">
                      <div className="flex items-center space-x-3">
                        <svg className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {section.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {section.videos.length} レクチャー • {section.videos.length * 10} 分
                      </span>
                    </summary>
                    
                    <div className="mt-2 space-y-1 pl-7">
                      {section.videos.map((video) => (
                        <Link
                          key={video.id}
                          href={user || video.is_free ? `/course/${course.id}/video/${video.id}` : '/login'}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg group"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                              {video.title}
                            </span>
                            {video.is_free && (
                              <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                無料
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {Math.floor((video.duration || 600) / 60)}:{String((video.duration || 600) % 60).padStart(2, '0')}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              {course.thumbnail_url && (
                <div className="relative w-full aspect-video mb-6">
                  <Image
                    src={course.thumbnail_url}
                    alt={course.title}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 1024px) 100vw, 300px"
                  />
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  ¥12,800
                  <span className="text-lg text-gray-500 line-through ml-2">¥24,800</span>
                </div>
                
                {user ? (
                  <Link
                    href={`/course/${course.id}/video/${course.sections[0]?.videos[0]?.id}`}
                    className="block w-full py-3 px-4 bg-purple-600 text-white text-center font-semibold rounded-lg hover:bg-purple-700 transition"
                  >
                    学習を開始
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block w-full py-3 px-4 bg-purple-600 text-white text-center font-semibold rounded-lg hover:bg-purple-700 transition"
                    >
                      今すぐ受講する
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {freeVideos}本の無料動画を視聴できます
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white">この講座に含まれるもの</h3>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{totalVideos}本のオンデマンドビデオ</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>学習期限なし</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>モバイルとPCでアクセス</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>修了証明書</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}