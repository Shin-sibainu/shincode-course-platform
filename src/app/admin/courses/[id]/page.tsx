import { notFound } from 'next/navigation'
import { getCourseById } from '@/lib/actions/courses'
import CourseForm from '@/components/admin/course-form'

interface EditCoursePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params
  const course = await getCourseById(id)

  if (!course) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          講座編集
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          講座情報を編集します
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <CourseForm course={course} />
      </div>
    </div>
  )
}