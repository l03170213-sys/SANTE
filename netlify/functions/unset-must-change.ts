import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { auth: { persistSession: false } });

// This endpoint expects a POST with { userId } and must be called server-side or protected
const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

    // Verify secret header
    const secretHeader = event.headers['x-admin-secret'] || event.headers['X-Admin-Secret'];
    if (!process.env.ADMIN_FUNCTION_SECRET || !secretHeader || secretHeader !== process.env.ADMIN_FUNCTION_SECRET) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    const body = JSON.parse(event.body || '{}');
    const { userId } = body;
    if (!userId) return { statusCode: 400, body: 'userId required' };

    const { error } = await supabaseAdmin.from('profiles').update({ must_change_password: false }).eq('id', userId);
    if (error) throw error;
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err: any) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || err }) };
  }
};

export { handler };
