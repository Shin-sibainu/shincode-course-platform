import { getUser } from '@/lib/auth/get-user'
import { createClient } from '@/lib/supabase/server'
import AdminStatsCard from '@/components/admin/stats-card'
import RecentActivityList from '@/components/admin/recent-activity'
import Link from 'next/link'

interface ActivityData {
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

async function getAdminStats() {
  const supabase = await createClient()

  // 総ユーザー数
  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // 総講座数
  const { count: courseCount } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })

  // 総動画数
  const { count: videoCount } = await supabase
    .from('videos')
    .select('*', { count: 'exact', head: true })

  // アクティブユーザー数（過去7日間にログインしたユーザー）
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { count: activeUserCount } = await supabase
    .from('user_progress')
    .select('user_id', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())

  return {
    userCount: userCount || 0,
    courseCount: courseCount || 0,
    videoCount: videoCount || 0,
    activeUserCount: activeUserCount || 0,
  }
}

async function getRecentActivity() {
  const supabase = await createClient()

  // 最近の進捗情報を取得
  const { data: recentProgress } = await supabase
    .from('user_progress')
    .select(`
      id,
      completed,
      completed_at,
      created_at,
      user_id,
      video:videos(
        id,
        title,
        section:sections(
          id,
          title,
          course:courses(
            id,
            title
          )
        )
      )
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  // データの整形
  if (!recentProgress) return []
  
  // nullのvideoを持つエントリを除外
  const typedProgress = recentProgress as unknown as ActivityData[]
  return typedProgress.filter(activity => activity.video !== null)
}

export default async function AdminDashboard() {
  const _user = await getUser()
  const stats = await getAdminStats()
  const recentActivity = await getRecentActivity()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          管理者ダッシュボード
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          プラットフォームの概要と統計情報
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatsCard
          title="総ユーザー数"
          value={stats.userCount}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          trend="+12%"
          trendUp={true}
        />

        <AdminStatsCard
          title="総講座数"
          value={stats.courseCount}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />

        <AdminStatsCard
          title="総動画数"
          value={stats.videoCount}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        />

        <AdminStatsCard
          title="アクティブユーザー"
          value={stats.activeUserCount}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          subtitle="過去7日間"
        />
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/courses/new"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow block"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                新規講座作成
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                新しい講座を追加
              </p>
            </div>
          </div>
        </Link>

        <a
          href="/admin/users"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                ユーザー管理
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ユーザー一覧を確認
              </p>
            </div>
          </div>
        </a>

        <a
          href="/admin/analytics"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                統計・分析
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                詳細な分析を表示
              </p>
            </div>
          </div>
        </a>
      </div>

      {/* 最近のアクティビティ */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            最近のアクティビティ
          </h2>
        </div>
        <RecentActivityList activities={recentActivity} />
      </div>
    </div>
  )
}