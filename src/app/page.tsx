import Link from 'next/link'
import Image from 'next/image'
import { getCourses } from '@/lib/actions/courses'
// import CourseCard from '@/components/course/CourseCard'

const categories = [
  { name: 'AI・機械学習', icon: '🤖', count: 128 },
  { name: 'Web開発', icon: '🌐', count: 256 },
  { name: 'モバイル開発', icon: '📱', count: 89 },
  { name: 'データサイエンス', icon: '📊', count: 167 },
  { name: 'DevOps', icon: '⚙️', count: 74 },
  { name: 'セキュリティ', icon: '🔒', count: 45 },
  { name: 'ブロックチェーン', icon: '⛓️', count: 38 },
  { name: 'ゲーム開発', icon: '🎮', count: 92 }
]

const trustedBy = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'
]

export default async function Home() {
  const courses = await getCourses()
  
  // 講座データに追加のメタデータを付与（仮のデータ）
  const featuredCourses = courses.map((course, index) => ({
    ...course,
    instructor: ['山田太郎', '佐藤花子', '鈴木一郎', '田中美咲'][index % 4],
    rating: Number((4.5 + (Math.random() * 0.5)).toFixed(1)),
    ratingCount: Math.floor(Math.random() * 300) + 50,
    price: Math.floor(Math.random() * 20000) + 5000,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 30000) + 20000 : undefined,
    duration: Math.floor(Math.random() * 15) + 3 + '時間',
    lectureCount: Math.floor(Math.random() * 100) + 20,
    level: ['初級', '中級', '上級'][Math.floor(Math.random() * 3)],
    isBestseller: index === 0,
    isNew: index === 1
  }))
  
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                AIプログラミングを学んで
                <br />
                <span className="text-purple-600 dark:text-purple-400">新しいキャリア</span>を切り開こう
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                実践的なプロジェクトを通じて、最新のAI技術とプログラミングスキルを身につけましょう。
                業界をリードする講師陣による質の高いコンテンツで、あなたの成長をサポートします。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
                >
                  コースを探す
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  無料で始める
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg"></div>
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format&q=75"
                alt="学習イメージ"
                fill
                className="object-cover rounded-lg shadow-xl"
                priority
                sizes="(min-width: 1024px) 600px, 0px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 dark:text-gray-500">
            <span className="text-sm font-medium">世界中の企業で活躍する卒業生</span>
            {trustedBy.map((company) => (
              <span key={company} className="text-lg font-semibold">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            人気のカテゴリー
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${encodeURIComponent(category.name)}`}
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} コース</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              注目のコース
            </h2>
            <Link
              href="/courses"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              すべて見る →
            </Link>
          </div>
          
          {featuredCourses.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">講座がありません</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                まだ講座が登録されていません。
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course, index) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="group bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative aspect-video">
                  <Image
                    src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop&auto=format&q=75'}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 4}
                  />
                  {course.isBestseller && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded">
                      ベストセラー
                    </span>
                  )}
                  {course.isNew && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                      新着
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.instructor}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-orange-500">{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-orange-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({course.ratingCount.toLocaleString()})</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {course.duration} • {course.lectureCount}レクチャー • {course.level}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">¥{course.price.toLocaleString()}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">¥{course.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            なぜ私たちのプラットフォームが選ばれるのか
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">体系的なカリキュラム</h3>
              <p className="text-gray-600 dark:text-gray-400">
                初心者から上級者まで、レベルに合わせた段階的な学習が可能
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">実践的なプロジェクト</h3>
              <p className="text-gray-600 dark:text-gray-400">
                実際の開発現場で使えるスキルを、ハンズオンで習得
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">充実したサポート</h3>
              <p className="text-gray-600 dark:text-gray-400">
                講師への質問やコミュニティでの交流で、学習をサポート
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 dark:bg-purple-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            今すぐ学習を始めよう
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            最初の動画は無料で視聴可能。まずは気になるコースをチェックして、
            あなたのペースで学習を始めましょう。
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded hover:bg-gray-100 transition"
          >
            無料で始める
          </Link>
        </div>
      </section>
    </div>
  )
}