/**
 * Supabase Client Configuration
 * 
 * Initializes the Supabase client with environment variables
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://vermzahfnxjvowompxsa.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcm16YWhmbnhqdm93b21weHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNjE5ODYsImV4cCI6MjA3MjkzNzk4Nn0.LnSFbklmYawaFB31zcjUfVdkXqSB5U7S9YSRcIZkARc';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file and ensure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Service role client for server-side operations (bypasses RLS)
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcm16YWhmbnhqdm93b21weHNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzM2MTk4NiwiZXhwIjoyMDcyOTM3OTg2fQ.QnyeDeqMI5wnGg18y11NYP6noLgdNyTiXB4VnhcFYLs';

export const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database type definitions for better TypeScript support
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'investment_analyst' | 'executive_assistant';
          is_active: boolean;
          preferences: Record<string, any> | null;
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          role: 'investment_analyst' | 'executive_assistant';
          is_active?: boolean;
          preferences?: Record<string, any> | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: 'investment_analyst' | 'executive_assistant';
          is_active?: boolean;
          preferences?: Record<string, any> | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
      };
      companies: {
        Row: {
          id: string;
          ticker_symbol: string;
          company_name: string;
          gics_sector: string;
          gics_subsector: string;
          gics_industry: string;
          gics_sub_industry: string;
          classification_status: 'pending' | 'complete';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ticker_symbol: string;
          company_name: string;
          gics_sector: string;
          gics_subsector: string;
          gics_industry: string;
          gics_sub_industry: string;
          classification_status?: 'pending' | 'complete';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          ticker_symbol?: string;
          company_name?: string;
          gics_sector?: string;
          gics_subsector?: string;
          gics_industry?: string;
          gics_sub_industry?: string;
          classification_status?: 'pending' | 'complete';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string;
          location_type: 'physical' | 'virtual' | 'hybrid';
          location_details: Record<string, any> | null;
          virtual_details: Record<string, any> | null;
          weather_location: string | null;
          event_type: 'standard' | 'catalyst';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          start_date: string;
          end_date: string;
          location_type: 'physical' | 'virtual' | 'hybrid';
          location_details?: Record<string, any> | null;
          virtual_details?: Record<string, any> | null;
          weather_location?: string | null;
          event_type?: 'standard' | 'catalyst';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string;
          location_type?: 'physical' | 'virtual' | 'hybrid';
          location_details?: Record<string, any> | null;
          virtual_details?: Record<string, any> | null;
          weather_location?: string | null;
          event_type?: 'standard' | 'catalyst';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_companies: {
        Row: {
          id: string;
          event_id: string;
          company_id: string;
          attendance_status: 'attending' | 'not_attending' | 'tentative';
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          company_id: string;
          attendance_status?: 'attending' | 'not_attending' | 'tentative';
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          company_id?: string;
          attendance_status?: 'attending' | 'not_attending' | 'tentative';
          created_at?: string;
        };
      };
      user_event_responses: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          response_status: 'accepted' | 'declined' | 'pending';
          response_date: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          response_status: 'accepted' | 'declined' | 'pending';
          response_date?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          response_status?: 'accepted' | 'declined' | 'pending';
          response_date?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          subsector: string;
          payment_status: 'pending' | 'paid' | 'failed' | 'canceled';
          is_active: boolean;
          expires_at: string | null;
          stripe_subscription_id: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subsector: string;
          payment_status?: 'pending' | 'paid' | 'failed' | 'canceled';
          is_active?: boolean;
          expires_at?: string | null;
          stripe_subscription_id?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subsector?: string;
          payment_status?: 'pending' | 'paid' | 'failed' | 'canceled';
          is_active?: boolean;
          expires_at?: string | null;
          stripe_subscription_id?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      executive_assistant_assignments: {
        Row: {
          id: string;
          assistant_id: string;
          user_id: string;
          permissions: Record<string, any>;
          assignment_type: 'permanent' | 'temporary';
          expires_at: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          assistant_id: string;
          user_id: string;
          permissions: Record<string, any>;
          assignment_type?: 'permanent' | 'temporary';
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          assistant_id?: string;
          user_id?: string;
          permissions?: Record<string, any>;
          assignment_type?: 'permanent' | 'temporary';
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_company_order: {
        Row: {
          id: string;
          user_id: string;
          company_id: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_id: string;
          display_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_id?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};