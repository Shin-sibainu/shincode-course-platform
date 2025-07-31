import { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  // Supabase User型を拡張
}

export interface UserSession {
  user: AuthUser | null
  isLoading?: boolean
}