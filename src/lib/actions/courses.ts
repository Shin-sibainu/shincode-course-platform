import { createClient } from '@/lib/supabase/server'
import { Course, Section, Video } from '@/types/course'

export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient()

  // コースとセクション数、動画数を1つのクエリで取得
  const { data: courses, error } = await supabase
    .from('courses')
    .select('id, title, description, thumbnail_url, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }

  if (!courses || courses.length === 0) {
    return []
  }

  // セクション数と動画数を一括で取得
  const courseIds = courses.map(c => c.id)
  
  const { data: sectionCounts } = await supabase
    .from('sections')
    .select('course_id, count:id.count()')
    .in('course_id', courseIds)

  // 各コースの動画数を取得するため、sectionsテーブル経由でクエリ
  const { data: videoCountsData } = await supabase
    .from('sections')
    .select(`
      course_id,
      videos(count)
    `)
    .in('course_id', courseIds)

  // カウントをマッピング
  const sectionCountMap = new Map(
    sectionCounts?.map(s => [s.course_id, s.count]) || []
  )
  
  // 動画数を集計
  const videoCountMap = new Map<string, number>()
  videoCountsData?.forEach(section => {
    const currentCount = videoCountMap.get(section.course_id) || 0
    const videoCount = Array.isArray(section.videos) ? section.videos.length : 0
    videoCountMap.set(section.course_id, currentCount + videoCount)
  })

  return courses.map(course => ({
    ...course,
    section_count: sectionCountMap.get(course.id) || 0,
    video_count: videoCountMap.get(course.id) || 0
  }))
}

export async function getCourseById(id: string): Promise<Course | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('id, title, description, thumbnail_url, created_at, updated_at')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching course:', error)
    return null
  }

  return data
}

export async function getCourseSections(courseId: string): Promise<Section[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sections')
    .select('id, course_id, title, order_index, created_at, updated_at')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching sections:', error)
    return []
  }

  return data || []
}

export async function getSectionVideos(sectionId: string): Promise<Video[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('videos')
    .select('id, section_id, title, youtube_url, duration, order_index, is_free, created_at, updated_at')
    .eq('section_id', sectionId)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching videos:', error)
    return []
  }

  return data || []
}

export async function getCourseWithSectionsAndVideos(courseId: string) {
  const supabase = await createClient()

  // 1つのクエリで全データを取得
  const { data: course, error } = await supabase
    .from('courses')
    .select(`
      id, title, description, thumbnail_url, created_at, updated_at,
      sections (
        id, course_id, title, order_index, created_at, updated_at,
        videos (id, section_id, title, youtube_url, duration, order_index, is_free, created_at, updated_at)
      )
    `)
    .eq('id', courseId)
    .single()

  if (error) {
    console.error('Error fetching course with sections and videos:', error)
    return null
  }

  // セクションと動画をソート
  if (course && course.sections) {
    course.sections.sort((a: Section & { videos: Video[] }, b: Section & { videos: Video[] }) => a.order_index - b.order_index)
    course.sections.forEach((section: Section & { videos: Video[] }) => {
      if (section.videos) {
        section.videos.sort((a: Video, b: Video) => a.order_index - b.order_index)
      }
    })
  }

  return course
}