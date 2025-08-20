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

  // まず、ユーザーが何らかの進捗を持つ講座を特定
  const { data: userProgressData, error: progressError } = await supabase
    .from('user_progress')
    .select(`
      *,
      videos!inner (
        id,
        section_id,
        sections!inner (
          id,
          course_id,
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

  if (progressError) {
    console.error('Error fetching user progress:', progressError)
    return []
  }

  if (!userProgressData || userProgressData.length === 0) {
    return []
  }

  // 講座IDのセットを取得
  const courseIds = [...new Set(userProgressData.map(p => p.videos.sections.courses.id))]

  // 各講座の全動画数と完了動画数を正確に計算
  const courseProgressPromises = courseIds.map(async (courseId) => {
    // 講座の全動画数を取得
    const { data: allVideos, error: videosError } = await supabase
      .from('videos')
      .select(`
        id,
        sections!inner (
          course_id
        )
      `)
      .eq('sections.course_id', courseId)

    if (videosError) {
      console.error('Error fetching all videos for course:', courseId, videosError)
      return null
    }

    // この講座のユーザー進捗データを取得
    const { data: courseProgress, error: courseProgressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .in('video_id', allVideos?.map(v => v.id) || [])

    if (courseProgressError) {
      console.error('Error fetching course progress:', courseId, courseProgressError)
      return null
    }

    // 講座情報を取得
    const courseInfo = userProgressData.find(p => p.videos.sections.courses.id === courseId)?.videos.sections.courses

    if (!courseInfo) return null

    const totalVideos = allVideos?.length || 0
    const completedVideos = courseProgress?.filter(p => p.completed).length || 0
    const progress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0

    return {
      ...courseInfo,
      progress,
      completedVideos,
      totalVideos
    }
  })

  const results = await Promise.all(courseProgressPromises)
  return results.filter(result => result !== null) as (Course & { progress: number; completedVideos: number; totalVideos: number })[]
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

export async function getCourseProgress(courseId: string, userId: string): Promise<{ progress: number; completedVideos: number; totalVideos: number } | null> {
  const supabase = await createClient()

  // 講座の全動画数を取得
  const { data: allVideos, error: videosError } = await supabase
    .from('videos')
    .select(`
      id,
      sections!inner (
        course_id
      )
    `)
    .eq('sections.course_id', courseId)

  if (videosError) {
    console.error('Error fetching all videos for course:', courseId, videosError)
    return null
  }

  if (!allVideos || allVideos.length === 0) {
    return { progress: 0, completedVideos: 0, totalVideos: 0 }
  }

  // この講座のユーザー進捗データを取得
  const { data: courseProgress, error: courseProgressError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .in('video_id', allVideos.map(v => v.id))

  if (courseProgressError) {
    console.error('Error fetching course progress:', courseId, courseProgressError)
    return null
  }

  const totalVideos = allVideos.length
  const completedVideos = courseProgress?.filter(p => p.completed).length || 0
  const progress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0

  return {
    progress,
    completedVideos,
    totalVideos
  }
}