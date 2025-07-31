import { getUserWithProfile } from "@/lib/auth/get-user";
import Link from "next/link";
import UserMenu from "./user-menu";
import MobileMenu from "./mobile-menu";

export default async function Header() {
  const userData = await getUserWithProfile();
  const user = userData?.user || null;
  const userProfile = userData?.profile || null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center mr-4 lg:mr-8">
              <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                Vibe Coding Platform
              </span>
            </Link>

            {/* Categories Dropdown */}
            <div className="hidden lg:block relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                カテゴリー
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Search Icon */}
            <div className="flex lg:hidden flex-1 justify-end mr-2">
              <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-4">
              <div className="relative w-full">
                <input
                  type="search"
                  placeholder="何を学びたいですか？"
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:bg-white focus:border-purple-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-4">
            {/* Business Link */}
            <Link
              href="/business"
              className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              法人向け
            </Link>

            {/* Teach Link */}
            <Link
              href="/teach"
              className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              講師になる
            </Link>

            {/* My Learning (for logged in users) */}
            {user && (
              <Link
                href="/my-learning"
                className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                マイコース
              </Link>
            )}

            {/* Shopping Cart - Hidden on mobile */}
            <button className="hidden lg:flex relative p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 h-5 w-5 text-xs font-bold text-white bg-purple-600 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Notifications (for logged in users) - Hidden on mobile */}
            {user && (
              <button className="hidden lg:flex relative p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* User Menu or Login/Signup - Hidden on mobile */}
            <div className="hidden lg:block">
              {user ? (
                <UserMenu userProfile={userProfile} />
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-purple-600 rounded hover:bg-gray-800 dark:hover:bg-purple-700"
                  >
                    新規登録
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <MobileMenu user={user} userProfile={userProfile} />
          </div>
        </div>
      </div>
    </header>
  );
}
