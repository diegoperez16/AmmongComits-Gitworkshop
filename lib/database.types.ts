export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
        }
      }
      scores: {
        Row: {
          id: string
          username: string
          score: number
          game_time: number
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          score: number
          game_time?: number
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          score?: number
          game_time?: number
          created_at?: string
        }
      }
      missions: {
        Row: {
          id: string
          mission_id: string
          title: string
          description: string
          category: 'default' | 'detective' | 'unlocked'
          difficulty: string
          badge?: string
          what_you_learn?: string
          steps?: string[]
          evidence?: string
          story_part?: number
          claimed_by: string | null
          claimed_at: string | null
          completed_by: string[]
          created_at: string
        }
        Insert: {
          id?: string
          mission_id: string
          title: string
          description: string
          category: 'default' | 'detective' | 'unlocked'
          difficulty: string
          badge?: string
          what_you_learn?: string
          steps?: string[]
          evidence?: string
          story_part?: number
          claimed_by?: string | null
          claimed_at?: string | null
          completed_by?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          mission_id?: string
          title?: string
          description?: string
          category?: 'default' | 'detective' | 'unlocked'
          difficulty?: string
          badge?: string
          what_you_learn?: string
          steps?: string[]
          evidence?: string
          story_part?: number
          claimed_by?: string | null
          claimed_at?: string | null
          completed_by?: string[]
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
