'use client'

import { memo, useState, useCallback } from 'react'

interface VideoPlayerProps {
  videoId: string
  title?: string
}

const VideoPlayer = memo(function VideoPlayer({ videoId, title = "YouTube video player" }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        onLoad={handleLoad}
      />
    </div>
  )
})

export default VideoPlayer