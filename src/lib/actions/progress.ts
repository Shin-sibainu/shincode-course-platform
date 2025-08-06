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

  // まず、ユーザーが進捗を持つ講座のIDを取得
  const { data: progressData, error: progressError } = await supabase
    .from('user_progress')
    .select('video_id, completed, videos!inner(section_id, sections!inner(course_id))')
    .eq('user_id', userId)

  if (progressError) {
    console.error('Error fetching user progress:', progressError)
    return []
  }

  // 進捗がある講座のIDを収集
  const courseIds = new Set<string>()
  const courseProgressMap = new Map<string, { completed: number }>()

  progressData?.forEach(progress => {
    const courseId = progress.videos.sections.course_id
    courseIds.add(courseId)
    
    if (!courseProgressMap.has(courseId)) {
      courseProgressMap.set(courseId, { completed: 0 })
    }
    
    if (progress.completed) {
      const data = courseProgressMap.get(courseId)!
      data.completed++
    }
  })

  if (courseIds.size === 0) {
    return []
  }

  // 進捗がある講座の完全な情報を取得（全動画数を含む）
  const { data: coursesData, error: coursesError } = await supabase
    .from('courses')
    .select(`
      id,
      title,
      description,
      thumbnail_url,
      sections!inner(
        id,
        videos!inner(
          id
        )
      )
    `)
    .in('id', Array.from(courseIds))

  if (coursesError) {
    console.error('Error fetching courses data:', coursesError)
    return []
  }

  // 各講座の進捗情報を構築
  return coursesData.map(course => {
    // 講座内の全動画数を計算
    const totalVideos = course.sections.reduce((total: number, section: any) => 
      total + section.videos.length, 0
    )
    
    // 完了した動画数を取得
    const completedVideos = courseProgressMap.get(course.id)?.completed || 0
    
    // 進捗率を計算
    const progress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail_url: course.thumbnail_url,
      progress,
      completedVideos,
      totalVideos
    }
  })
}

export async function getCourseProgress(courseId: string, userId: string): Promise<{ progress: number; completedVideos: number; totalVideos: number }> {
  const supabase = await createClient()

  // 講座の全動画数を取得
  const { data: courseData, error: courseError } = await supabase
    .from('courses')
    .select(`
      sections!inner(
        videos!inner(
          id
        )
      )
    `)
    .eq('id', courseId)
    .single()

  if (courseError || !courseData) {
    console.error('Error fetching course data:', courseError)
    return { progress: 0, completedVideos: 0, totalVideos: 0 }
  }

  // 全動画数を計算
  const totalVideos = courseData.sections.reduce((total: number, section: any) => 
    total + section.videos.length, 0
  )

  // ユーザーの進捗を取得
  const { data: progressData, error: progressError } = await supabase
    .from('user_progress')
    .select('completed, videos!inner(sections!inner(course_id))')
    .eq('user_id', userId)
    .eq('videos.sections.course_id', courseId)

  if (progressError) {
    console.error('Error fetching user progress:', progressError)
    return { progress: 0, completedVideos: 0, totalVideos }
  }

  // 完了した動画数を計算
  const completedVideos = progressData?.filter(p => p.completed).length || 0
  
  // 進捗率を計算
  const progress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0

  return { progress, completedVideos, totalVideos }
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