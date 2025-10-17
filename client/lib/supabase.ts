import { createClient } from '@supabase/supabase-js';

// Vite exposes env vars prefixed with VITE_ via import.meta.env
const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

// Some environments (or tests) might expose env via a global window.__env object
const win = typeof window !== 'undefined' ? (window as any) : undefined;
const windowUrl = win?.__env?.VITE_SUPABASE_URL;
const windowKey = win?.__env?.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = envUrl || windowUrl;
const supabaseAnonKey = envKey || windowKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set.\n' +
    'Set these env vars in your Vite environment or connect Supabase in the Builder.io MCP.\n' +
    'See https://www.builder.io/c/docs/projects for guidance.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
});
