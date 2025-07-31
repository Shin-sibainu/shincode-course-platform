// import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth/get-user'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const _user = await getUser()

  // 認証が必要なページには後で制限を追加
  // 現在は認証なしでアクセス可能

  return <>{children}</>
}