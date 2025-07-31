import { createClient } from '@/lib/supabase/server'
import { Section } from '@/types/course'

export async function getSectionById(id: string): Promise<Section | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}