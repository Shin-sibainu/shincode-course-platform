import { getUser, getUserProfile } from '@/lib/auth/get-user'
import { createClient } from '@/lib/supabase/server'
import SyncProfileButton from '@/components/profile/sync-profile-button'
import { redirect } from 'next/navigation'

export default async function DebugProfilePage() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  const userProfile = await getUserProfile()
  const supabase = await createClient()
  
  // auth.usersから直接メタデータを取得
  const { data: authUser } = await supabase.auth.getUser()
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">プロフィールデバッグ</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Auth User (auth.users)</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(authUser?.user, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Profile (profiles + auth.users)</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(userProfile, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">アクション</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-4">
              Google アカウントからアバター URL を同期します
            </p>
            <SyncProfileButton />
          </div>
        </div>
      </div>
    </div>
  )
}