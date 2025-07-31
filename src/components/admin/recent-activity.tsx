import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Activity {
  id: string
  completed: boolean
  completed_at: string | null
  created_at: string
  user_id: string
  video: {
    id: string
    title: string
    section: {
      id: string
      title: string
      course: {
        id: string
        title: string
      }
    }
  } | null
}

interface RecentActivityListProps {
  activities: Activity[]
}

export default function RecentActivityList({ activities }: RecentActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        まだアクティビティがありません
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {activities.map((activity) => (
        <div key={activity.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    U
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-900 dark:text-white">
                    ユーザーが
                    {activity.completed ? '完了しました' : '開始しました'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.video?.title || '不明な動画'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {activity.video?.section?.course?.title || '不明な講座'} / {activity.video?.section?.title || '不明なセクション'}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(
                new Date(activity.completed_at || activity.created_at),
                { addSuffix: true, locale: ja }
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}