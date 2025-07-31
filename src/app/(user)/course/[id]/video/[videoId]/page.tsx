import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getCourseWithSectionsAndVideos } from '@/lib/actions/courses'
import { getUser } from '@/lib/auth/get-user'
import VideoPlayer from '@/components/video/VideoPlayer'
import VideoProgress from '@/components/video/VideoProgress'
import VideoSidebar from '@/components/video/VideoSidebar'
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
      <div className="flex flex-col lg:flex-row lg:h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col order-2 lg:order-1">
          {/* Video Header */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Link
                  href={`/course/${id}`}
                  className="text-gray-400 hover:text-white transition flex-shrink-0"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                <div className="min-w-0">
                  <h1 className="text-base lg:text-xl font-semibold text-white truncate">{currentVideo.title}</h1>
                  <p className="text-xs lg:text-sm text-gray-400 truncate">{course.title}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                {prevVideo && (
                  <Link
                    href={`/course/${id}/video/${prevVideo.id}`}
                    className="px-3 py-1.5 lg:px-4 lg:py-2 bg-gray-700 text-white text-sm lg:text-base rounded hover:bg-gray-600 transition"
                  >
                    <span className="hidden sm:inline">前の動画</span>
                    <span className="sm:hidden">前へ</span>
                  </Link>
                )}
                {nextVideo && (
                  <Link
                    href={`/course/${id}/video/${nextVideo.id}`}
                    className="px-3 py-1.5 lg:px-4 lg:py-2 bg-purple-600 text-white text-sm lg:text-base rounded hover:bg-purple-700 transition"
                  >
                    <span className="hidden sm:inline">次の動画</span>
                    <span className="sm:hidden">次へ</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1 bg-black flex items-center justify-center aspect-video lg:aspect-auto">
            {youtubeId ? (
              <VideoPlayer videoId={youtubeId} />
            ) : (
              <div className="text-white text-center p-4">
                <svg className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-sm lg:text-base">動画を読み込めませんでした</p>
              </div>
            )}
          </div>

          {/* Video Controls */}
          {user && (
            <div className="bg-gray-800 border-t border-gray-700 px-4 lg:px-6 py-3 lg:py-4">
              <VideoProgress videoId={currentVideo.id} />
            </div>
          )}
        </div>

        {/* Sidebar - Course Content */}
        <VideoSidebar 
          course={course}
          currentVideoId={videoId}
          courseId={id}
          videoIndex={videoIndex}
          totalVideos={totalVideos}
          user={user}
        />
      </div>
    </div>
  )
}