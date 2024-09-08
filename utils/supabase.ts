import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";


const supabaseUrl = "https://xfcyfgduhwcuftrcijta.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmY3lmZ2R1aHdjdWZ0cmNpanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMDE4MTcsImV4cCI6MjAyODY3NzgxN30.sTOrXGoSclTtSVIMOSbPWTgHUpwh0wryqhH7vxRmvf0"
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmY3lmZ2R1aHdjdWZ0cmNpanRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzEwMTgxNywiZXhwIjoyMDI4Njc3ODE3fQ.khLkvGKWlSld4tiv-i3nxduI8ClKy6GlTDZuFD7PgeQ"


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
})