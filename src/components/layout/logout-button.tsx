'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        console.error('Logout failed')
        alert('ログアウトに失敗しました。もう一度お試しください。')
      }
    } catch (error) {
      console.error('Logout error:', error)
      alert('ログアウト中にエラーが発生しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'ログアウト中...' : 'ログアウト'}
    </button>
  )
}