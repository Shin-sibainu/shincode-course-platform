import { Metadata } from 'next'
import SignupForm from './signup-form'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '新規登録 | AI学習プラットフォーム',
  description: 'AI学習プラットフォームに新規登録',
}

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                アカウントを作成
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                すでにアカウントをお持ちの方は
                <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500 ml-1">
                  ログイン
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              <SignupForm />
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                新規登録のメリット
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-left">全講座の2本目以降の動画も視聴可能</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-left">学習進捗の記録と管理</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-left">パーソナライズされた学習体験</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-purple-600 dark:bg-purple-800 h-full">
          <div className="flex items-center justify-center p-12 w-full h-full overflow-y-auto">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-white mb-6">
                AIの未来を<br />一緒に創ろう
              </h1>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">即座に学習開始</h3>
                    <p className="mt-1 text-purple-200">
                      登録後すぐに全ての講座にアクセス可能。待ち時間なし
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">初心者に優しい</h3>
                    <p className="mt-1 text-purple-200">
                      プログラミング未経験者でも安心。基礎から丁寧に解説
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">コミュニティサポート</h3>
                    <p className="mt-1 text-purple-200">
                      同じ目標を持つ仲間と共に成長。質問し合える環境
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-10 border-t border-purple-500">
                <p className="text-purple-200 text-sm">
                  すでに受講生数
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  10,000人突破！
                </p>
                <p className="text-purple-200 text-sm mt-2">
                  あなたもAI開発の第一歩を踏み出しませんか？
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}