import { createClient } from '@/lib/supabase/server'
import { UserProgress, Course } from '@/types/course'
import { getUser } from '@/lib/auth/get-user'

export async function getUserProgress(): Promise<UserProgress[]> {
  const supabase = await createClient()
  
  const user = await getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user progress:', error)
    return []
  }

  return data || []
}

export async function getUserCourseProgress(userId: string): Promise<(Course & { progress: number; completedVideos: number; totalVideos: number })[]> {
  const supabase = await createClient()

  // 受講中の講座とその進捗を効率的に取得
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      videos!inner (
        id,
        title,
        sections!inner (
          id,
          title,
          order_index,
          courses!inner (
            id,
            title,
            description,
            thumbnail_url
          )
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user course progress:', error)
    return []
  }

  // 講座ごとにグループ化して進捗を計算
  const courseProgressMap = new Map()
  
  data?.forEach(progress => {
    const course = progress.videos.sections.courses
    const courseId = course.id
    
    if (!courseProgressMap.has(courseId)) {
      courseProgressMap.set(courseId, {
        course,
        progressRecords: [],
        completedCount: 0,
        totalCount: 0
      })
    }
    
    const courseData = courseProgressMap.get(courseId)
    courseData.progressRecords.push(progress)
    courseData.totalCount++
    if (progress.completed) {
      courseData.completedCount++
    }
  })

  // 進捗率を計算して返す
  return Array.from(courseProgressMap.values()).map(({ course, completedCount, totalCount }) => ({
    ...course,
    progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    completedVideos: completedCount,
    totalVideos: totalCount
  }))
}

export async function getVideoProgress(videoId: string): Promise<UserProgress | null> {
  const supabase = await createClient()
  
  const user = await getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('video_id', videoId)
    .single()

  if (error) {
    // No progress record exists yet
    return null
  }

  return data
}

export async function updateVideoProgress(videoId: string, completed: boolean): Promise<boolean> {
  const supabase = await createClient()
  
  const user = await getUser()
  if (!user) return false

  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      video_id: videoId,
      completed,
      completed_at: completed ? new Date().toISOString() : null
    })

  if (error) {
    console.error('Error updating video progress:', error)
    return false
  }

  return true
}