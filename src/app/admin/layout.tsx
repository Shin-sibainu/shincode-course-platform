import { redirect } from 'next/navigation'
import { getUser, getUserProfile } from '@/lib/auth/get-user'
import AdminSidebar from '@/components/admin/sidebar'

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