import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('your-project')
);

// Graceful fallback dummy client if environment variables are not yet provided
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: async () => ({ data: [], error: null }),
        insert: async (data) => {
          console.info('[GAZU Supabase Demo] Insert simulated (Supabase env vars not yet configured):', data);
          return { data, error: null };
        },
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
      }),
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      }
    };

if (!isSupabaseConfigured) {
  console.info(
    '💡 [GAZU Fashion] Supabase is ready to connect! Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env or Vercel Environment Variables to link your live database.'
  );
}
