interface CoursesHeaderProps {
  totalCourses: number
}

export default function CoursesHeader({ totalCourses }: CoursesHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">
          すべての講座
        </h1>
        <p className="text-lg opacity-90 mb-2">
          プログラミングとAI開発を学ぶための講座コレクション
        </p>
        <p className="text-sm opacity-75">
          {totalCourses}件の講座が見つかりました
        </p>
      </div>
    </div>
  )
}