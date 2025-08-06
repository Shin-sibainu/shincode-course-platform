import { redirect } from 'next/navigation'
import { getUser, getUserProfile } from '@/lib/auth/get-user'
import dynamic from 'next/dynamic'

const AdminSidebar = dynamic(() => import('@/components/admin/sidebar'), {
  loading: () => (
    <div className="w-64 h-screen bg-gray-800 animate-pulse">
      <div className="p-4">
        <div className="h-8 bg-gray-700 rounded mb-4"></div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  const userProfile = user ? await getUserProfile() : null

  // 認証チェック
  if (!user) {
    redirect('/login')
  }

  // 管理者権限チェック
  if (userProfile?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* サイドバー */}
        <AdminSidebar />
        
        {/* メインコンテンツ */}
        <main className="flex-1 ml-64">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}