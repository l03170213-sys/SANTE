import { createClient } from '@supabase/supabase-js';

const supabaseUrl = REPLACE_ENV.SUPABASE_URL;
const supabaseAnonKey = REPLACE_ENV.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
});
