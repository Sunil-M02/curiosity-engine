import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ywbbkthduolyztmzdwgn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3YmJrdGhkdW9seXp0bXpkd2duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTMwODIsImV4cCI6MjA4MjA2OTA4Mn0.cSyRpwE0zhctS-9cH_j5hPYi83VmXk_Ih3AOppAsFks";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
