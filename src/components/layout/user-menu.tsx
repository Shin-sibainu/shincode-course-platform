'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { UserProfile } from '@/types/supabase'

interface UserMenuProps {
  userProfile: UserProfile | null
}

export default function UserMenu({ userProfile }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
      setIsOpen(false)
    }
  }

  if (!userProfile) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-800 shadow-lg">
            {userProfile.avatar_url ? (
              <Image
                src={userProfile.avatar_url}
                alt={userProfile.full_name || userProfile.email || 'User'}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {(userProfile.full_name || userProfile.email || 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-zinc-800"></div>
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {userProfile.full_name || 'ユーザー'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {userProfile.role === 'admin' ? '管理者' : '一般ユーザー'}
          </p>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl shadow-xl bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 dark:from-indigo-500/20 dark:to-purple-600/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50 dark:ring-white/20">
                {userProfile.avatar_url ? (
                  <Image
                    src={userProfile.avatar_url}
                    alt={userProfile.full_name || userProfile.email || 'User'}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {(userProfile.full_name || userProfile.email || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {userProfile.full_name || 'ユーザー'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {userProfile.email}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>ダッシュボード</span>
            </Link>
            
            {userProfile.role === 'admin' && (
              <Link
                href="/admin"
                className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>管理画面</span>
              </Link>
            )}
            
            <div className="my-2 border-t border-gray-200 dark:border-zinc-700"></div>
            
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{isLoading ? 'ログアウト中...' : 'ログアウト'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}