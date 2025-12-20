import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dlfxpkixljqdiajantxy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZnhwa2l4bGpxZGlhamFudHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMzA0NzMsImV4cCI6MjA0OTkwNjQ3M30.pCPMVi8YGpvdqGMg0HdNYEHblq0D8dqY6fJp0V_MVCI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
