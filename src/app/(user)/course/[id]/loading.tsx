export default function CourseLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Course Header Skeleton */}
      <div className="bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <div className="h-4 w-32 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-8 w-3/4 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-6 w-full bg-gray-700 rounded animate-pulse mb-6"></div>
            <div className="flex items-center space-x-6">
              <div className="h-5 w-24 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-6"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="h-12 bg-purple-300 dark:bg-purple-700 rounded-lg animate-pulse mb-6"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}