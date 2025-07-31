'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { UserProfile } from '@/types/supabase'

interface MobileMenuProps {
  user: User | null
  userProfile: UserProfile | null
}

export default function MobileMenu({ user, userProfile }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-button lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
        aria-label="メニューを開く"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" />
      )}

      {/* Mobile menu panel */}
      <div
        className={`mobile-menu fixed top-0 right-0 z-50 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">メニュー</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="メニューを閉じる"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User section */}
          {user && userProfile && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                  {userProfile.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userProfile.full_name || 'ユーザー'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <input
              type="search"
              placeholder="何を学びたいですか？"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:bg-white focus:border-purple-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                ホーム
              </Link>

              <button className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center justify-between">
                カテゴリー
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {user && (
                <>
                  <Link
                    href="/my-learning"
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    マイコース
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    ダッシュボード
                  </Link>
                </>
              )}

              <Link
                href="/business"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                法人向け
              </Link>

              <Link
                href="/teach"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                講師になる
              </Link>

              {userProfile?.role === 'admin' && (
                <>
                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">管理者</p>
                    <Link
                      href="/admin"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      管理画面
                    </Link>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            {user ? (
              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  ログアウト
                </button>
              </form>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-gray-900 dark:bg-purple-600 rounded hover:bg-gray-800 dark:hover:bg-purple-700"
                  onClick={() => setIsOpen(false)}
                >
                  新規登録
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}