import { memo } from 'react'

interface LoadingSkeletonProps {
  count?: number
  className?: string
}

const LoadingSkeleton = memo(function LoadingSkeleton({ count = 4, className = "" }: LoadingSkeletonProps) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
          {/* Image placeholder */}
          <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
          
          {/* Content placeholder */}
          <div className="p-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

export default LoadingSkeleton