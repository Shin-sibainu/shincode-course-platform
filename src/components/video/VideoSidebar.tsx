'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CourseWithSections } from '@/types/course'

interface VideoSidebarProps {
  course: CourseWithSections
  currentVideoId: string
  courseId: string
  videoIndex: number
  totalVideos: number
  user: { id: string; email?: string } | null
}

export default function VideoSidebar({ 
  course, 
  currentVideoId, 
  courseId,
  videoIndex,
  totalVideos,
  user 
}: VideoSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full lg:w-96 bg-gray-800 border-b lg:border-b-0 lg:border-l border-gray-700 overflow-y-auto order-1 lg:order-2">
      {/* モバイル用のコンテンツトグルボタン */}
      <button
        className="lg:hidden p-3 bg-gray-700 flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium">講座内容を表示</span>
        <svg 
          className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="p-3 lg:p-4 border-b border-gray-700">
        <h2 className="text-base lg:text-lg font-semibold text-white">講座内容</h2>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">
          {videoIndex + 1} / {totalVideos} 完了
        </p>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-3 lg:p-4 space-y-3 lg:space-y-4 max-h-[50vh] lg:max-h-full overflow-y-auto`}>
        {course.sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.videos.map((video) => {
                const isActive = video.id === currentVideoId
                const canAccess = video.is_free || user

                return (
                  <Link
                    key={video.id}
                    href={canAccess ? `/course/${courseId}/video/${video.id}` : '/login'}
                    className={`
                      block px-2.5 lg:px-3 py-1.5 lg:py-2 rounded text-xs lg:text-sm transition
                      ${isActive 
                        ? 'bg-gray-700 text-white' 
                        : canAccess
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="truncate">{video.title}</span>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {Math.floor((video.duration || 600) / 60)}:{String((video.duration || 600) % 60).padStart(2, '0')}
                      </span>
                    </div>
                    {video.is_free && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-xs text-green-400 bg-green-900/50 rounded">
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
  )
}