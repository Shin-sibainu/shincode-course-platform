interface AdminStatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
  subtitle?: string
}

export default function AdminStatsCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  subtitle
}: AdminStatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-2 flex items-center">
              {trendUp ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <span className={`ml-1 text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-400">
          {icon}
        </div>
      </div>
    </div>
  )
}