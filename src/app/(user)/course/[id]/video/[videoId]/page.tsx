import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getCourseWithSectionsAndVideos } from '@/lib/actions/courses'
import { getUser } from '@/lib/auth/get-user'
import VideoPlayer from '@/components/video/VideoPlayer'
import VideoProgress from '@/components/video/VideoProgress'
import type { Section, Video, CourseWithSections } from '@/types/course'

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string; videoId: string }>
}) {
  const { id, videoId } = await params
  const user = await getUser()
  const course: CourseWithSections | null = await getCourseWithSectionsAndVideos(id)

  if (!course) {
    notFound()
  }

  // Find the current video
  let currentVideo = null
  let currentSection = null
  let videoIndex = 0
  let totalVideos = 0

  for (const section of course.sections) {
    for (const video of section.videos) {
      if (video.id === videoId) {
        currentVideo = video
        currentSection = section
        videoIndex = totalVideos
      }
      totalVideos++
    }
  }

  if (!currentVideo || !currentSection) {
    notFound()
  }

  // Check if user can access this video
  if (!currentVideo.is_free && !user) {
    redirect('/login')
  }

  // Get previous and next videos
  const allVideos = course.sections.flatMap((s: Section & { videos: Video[] }) => s.videos)
  const prevVideo = videoIndex > 0 ? allVideos[videoIndex - 1] : null
  const nextVideo = videoIndex < allVideos.length - 1 ? allVideos[videoIndex + 1] : null

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const youtubeId = getYouTubeId(currentVideo.youtube_url)

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Header */}
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href={`/course/${id}`}
                  className="text-gray-400 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                <div>
                  <h1 className="text-xl font-semibold text-white">{currentVideo.title}</h1>
                  <p className="text-sm text-gray-400">{course.title}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {prevVideo && (
                  <Link
                    href={`/course/${id}/video/${prevVideo.id}`}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                  >
                    前の動画
                  </Link>
                )}
                {nextVideo && (
                  <Link
                    href={`/course/${id}/video/${nextVideo.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    次の動画
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1 bg-black flex items-center justify-center">
            {youtubeId ? (
              <VideoPlayer videoId={youtubeId} />
            ) : (
              <div className="text-white text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p>動画を読み込めませんでした</p>
              </div>
            )}
          </div>

          {/* Video Controls */}
          {user && (
            <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
              <VideoProgress videoId={currentVideo.id} />
            </div>
          )}
        </div>

        {/* Sidebar - Course Content */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">講座内容</h2>
            <p className="text-sm text-gray-400 mt-1">
              {videoIndex + 1} / {totalVideos} 完了
            </p>
          </div>

          <div className="p-4 space-y-4">
            {course.sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.videos.map((video) => {
                    const isActive = video.id === videoId
                    const canAccess = video.is_free || user

                    return (
                      <Link
                        key={video.id}
                        href={canAccess ? `/course/${id}/video/${video.id}` : '/login'}
                        className={`
                          block px-3 py-2 rounded text-sm transition
                          ${isActive 
                            ? 'bg-gray-700 text-white' 
                            : canAccess
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-500 cursor-not-allowed'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="truncate">{video.title}</span>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            {Math.floor((video.duration || 600) / 60)}:{String((video.duration || 600) % 60).padStart(2, '0')}
                          </span>
                        </div>
                        {video.is_free && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs text-green-400 bg-green-900/50 rounded">
                            無料
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}