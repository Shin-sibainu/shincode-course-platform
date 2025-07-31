import { Metadata } from 'next'
import LoginForm from './login-form'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ログイン | AI学習プラットフォーム',
  description: 'AI学習プラットフォームにログイン',
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                アカウントにログイン
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                まだアカウントをお持ちでない方は
                <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500 ml-1">
                  新規登録
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              <LoginForm />
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">または</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  組織の
                  <Link href="/login/organization" className="font-medium text-purple-600 hover:text-purple-500 mx-1">
                    シングルサインオン（SSO）
                  </Link>
                  でログイン
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-purple-600 dark:bg-purple-800 h-full">
          <div className="flex items-center justify-center p-12 w-full h-full overflow-y-auto">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-white mb-6">
                最新のAI技術を<br />実践的に学ぼう
              </h1>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">実践的なプロジェクト</h3>
                    <p className="mt-1 text-purple-200">
                      実際の開発現場で使えるスキルを、手を動かしながら習得
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">自分のペースで学習</h3>
                    <p className="mt-1 text-purple-200">
                      好きな時間に、好きな場所で、自分のペースで進められる
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">無料お試し視聴</h3>
                    <p className="mt-1 text-purple-200">
                      各講座の最初の動画は無料。内容を確認してから受講開始
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-10 border-t border-purple-500">
                <p className="text-purple-200 text-sm">
                  受講生の声
                </p>
                <blockquote className="mt-2">
                  <p className="text-white italic">
                    「AIプログラミングの基礎から応用まで、体系的に学べました。実際のプロジェクトで活用できるスキルが身につきました！」
                  </p>
                  <footer className="mt-2 text-purple-200 text-sm">
                    — 田中さん、フルスタックエンジニア
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}