// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kdwyatshlhqafwwopiwj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkd3lhdHNobGhxYWZ3d29waXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzc2NTcsImV4cCI6MjA2NzkxMzY1N30.0pYxLo1tbC5l2972efWR3F_MTrkoQNXVH52EzezIlZw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});