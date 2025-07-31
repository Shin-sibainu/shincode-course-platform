export interface Course {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  created_at: string
  updated_at: string
  section_count?: number
  video_count?: number
}

export interface Section {
  id: string
  course_id: string
  title: string
  order_index: number
  created_at: string
  updated_at: string
  videos?: Video[]
  video_count?: number
}

export interface Video {
  id: string
  section_id: string
  title: string
  youtube_url: string
  duration: number | null
  order_index: number
  is_free: boolean
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  video_id: string
  completed: boolean
  completed_at: string | null
  created_at: string
}

export interface CourseWithSections extends Course {
  sections: (Section & { videos: Video[] })[]
}