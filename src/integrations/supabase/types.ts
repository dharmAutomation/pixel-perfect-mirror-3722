export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          inquiry_type: string
          message: string
          phone: string | null
          status: Database["public"]["Enums"]["message_status"]
          submission_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          inquiry_type: string
          message: string
          phone?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          submission_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          inquiry_type?: string
          message?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          submission_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_applications: {
        Row: {
          admin_notes: string | null
          course_id: string | null
          course_name: string
          created_at: string
          email: string
          experience: string
          full_name: string
          heard_from: string
          id: string
          job_status: string
          linkedin_url: string | null
          mobile: string
          qualification: string
          referral_name: string | null
          resume_name: string | null
          resume_path: string
          status: Database["public"]["Enums"]["application_status"]
          submission_key: string
          training_mode: string
          updated_at: string
          whatsapp: string
        }
        Insert: {
          admin_notes?: string | null
          course_id?: string | null
          course_name: string
          created_at?: string
          email: string
          experience: string
          full_name: string
          heard_from: string
          id?: string
          job_status: string
          linkedin_url?: string | null
          mobile: string
          qualification: string
          referral_name?: string | null
          resume_name?: string | null
          resume_path: string
          status?: Database["public"]["Enums"]["application_status"]
          submission_key: string
          training_mode: string
          updated_at?: string
          whatsapp: string
        }
        Update: {
          admin_notes?: string | null
          course_id?: string | null
          course_name?: string
          created_at?: string
          email?: string
          experience?: string
          full_name?: string
          heard_from?: string
          id?: string
          job_status?: string
          linkedin_url?: string | null
          mobile?: string
          qualification?: string
          referral_name?: string | null
          resume_name?: string | null
          resume_path?: string
          status?: Database["public"]["Enums"]["application_status"]
          submission_key?: string
          training_mode?: string
          updated_at?: string
          whatsapp?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_applications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string
          duration: string | null
          icon: string
          id: string
          is_active: boolean
          project_details: string | null
          short_description: string
          skills: string[]
          slug: string
          sort_order: number
          technologies: string[]
          title: string
          training_mode: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          duration?: string | null
          icon?: string
          id?: string
          is_active?: boolean
          project_details?: string | null
          short_description?: string
          skills?: string[]
          slug: string
          sort_order?: number
          technologies?: string[]
          title: string
          training_mode?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          duration?: string | null
          icon?: string
          id?: string
          is_active?: boolean
          project_details?: string | null
          short_description?: string
          skills?: string[]
          slug?: string
          sort_order?: number
          technologies?: string[]
          title?: string
          training_mode?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_inquiries: {
        Row: {
          admin_notes: string | null
          budget: string
          company_name: string
          created_at: string
          description: string
          email: string
          full_name: string
          id: string
          phone: string
          project_type: string
          reference_website: string | null
          status: Database["public"]["Enums"]["lead_status"]
          submission_key: string
          timeline: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          budget: string
          company_name: string
          created_at?: string
          description: string
          email: string
          full_name: string
          id?: string
          phone: string
          project_type: string
          reference_website?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          submission_key: string
          timeline: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          budget?: string
          company_name?: string
          created_at?: string
          description?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          project_type?: string
          reference_website?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          submission_key?: string
          timeline?: string
          updated_at?: string
        }
        Relationships: []
      }
      referral_companies: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          logo_path: string | null
          name: string
          sort_order: number
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_path?: string | null
          name: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_path?: string | null
          name?: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          features: string[]
          icon: string
          id: string
          is_active: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          features?: string[]
          icon?: string
          id?: string
          is_active?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: string[]
          icon?: string
          id?: string
          is_active?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          contact_email: string | null
          founder_bio: string | null
          founder_linkedin_url: string | null
          founder_name: string
          founder_photo_path: string | null
          founder_title: string
          home_academy_tracks: string[]
          home_tech_services: string[]
          id: number
          instagram_url: string | null
          linkedin_url: string | null
          location: string | null
          phone: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          contact_email?: string | null
          founder_bio?: string | null
          founder_linkedin_url?: string | null
          founder_name?: string
          founder_photo_path?: string | null
          founder_title?: string
          home_academy_tracks?: string[]
          home_tech_services?: string[]
          id?: number
          instagram_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          contact_email?: string | null
          founder_bio?: string | null
          founder_linkedin_url?: string | null
          founder_name?: string
          founder_photo_path?: string | null
          founder_title?: string
          home_academy_tracks?: string[]
          home_tech_services?: string[]
          id?: number
          instagram_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          feedback: string
          id: string
          is_published: boolean
          is_sample: boolean
          kind: string
          name: string
          photo_path: string | null
          role_or_company: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          feedback: string
          id?: string
          is_published?: boolean
          is_sample?: boolean
          kind?: string
          name: string
          photo_path?: string | null
          role_or_company?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          feedback?: string
          id?: string
          is_published?: boolean
          is_sample?: boolean
          kind?: string
          name?: string
          photo_path?: string | null
          role_or_company?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      trainers: {
        Row: {
          bio: string | null
          created_at: string
          designation: string
          experience: string | null
          expertise: string[]
          full_name: string
          id: string
          is_active: boolean
          linkedin_url: string | null
          photo_path: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          designation?: string
          experience?: string | null
          expertise?: string[]
          full_name: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          photo_path?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          designation?: string
          experience?: string | null
          expertise?: string[]
          full_name?: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          photo_path?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      application_status:
        | "new"
        | "contacted"
        | "demo_scheduled"
        | "converted"
        | "rejected"
      lead_status:
        | "new"
        | "contacted"
        | "discussion"
        | "proposal_sent"
        | "in_progress"
        | "completed"
        | "rejected"
      message_status: "new" | "read" | "replied" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      application_status: [
        "new",
        "contacted",
        "demo_scheduled",
        "converted",
        "rejected",
      ],
      lead_status: [
        "new",
        "contacted",
        "discussion",
        "proposal_sent",
        "in_progress",
        "completed",
        "rejected",
      ],
      message_status: ["new", "read", "replied", "archived"],
    },
  },
} as const
