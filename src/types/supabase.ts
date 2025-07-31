export type UserProfile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  role: string | null
  created_at: string | null
  updated_at: string | null
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          avatar_url: string | null
          role: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      sections: {
        Row: {
          id: string
          course_id: string | null
          title: string
          order_index: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          course_id?: string | null
          title: string
          order_index: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          course_id?: string | null
          title?: string
          order_index?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      videos: {
        Row: {
          id: string
          section_id: string | null
          title: string
          youtube_url: string
          duration: number | null
          order_index: number
          is_free: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          section_id?: string | null
          title: string
          youtube_url: string
          duration?: number | null
          order_index: number
          is_free?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          section_id?: string | null
          title?: string
          youtube_url?: string
          duration?: number | null
          order_index?: number
          is_free?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string | null
          video_id: string | null
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          video_id?: string | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          video_id?: string | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
        }
      }
    }
  }
}