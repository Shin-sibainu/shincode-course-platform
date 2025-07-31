import CourseForm from '@/components/admin/course-form'

export default function NewCoursePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          新規講座作成
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          新しい講座を作成します
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <CourseForm />
      </div>
    </div>
  )
}