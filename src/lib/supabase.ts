import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Enhanced debugging
console.log("All environment variables:", import.meta.env)
console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Anon Key:", supabaseAnonKey)
console.log("Is production?", import.meta.env.PROD)
console.log("Is development?", import.meta.env.DEV)

// More detailed error message
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase environment variables are missing:\n' +
    `VITE_SUPABASE_URL: ${supabaseUrl ? 'Present' : 'Missing'}\n` +
    `VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'Present' : 'Missing'}\n` +
    'Please check:\n' +
    '1. Your .env file contains both variables\n' +
    '2. Variables are prefixed with VITE_\n' +
    '3. Environment variables are properly set in Vercel dashboard'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)