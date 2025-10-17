import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { auth: { persistSession: false } });

const handler: Handler = async (event) => {
  try {
    // Optional: check some secret header to ensure only admin UI calls this function
    const { data, error } = await supabaseAdmin.from('practitioner_requests').select('*').order('created_at', { ascending: false }).limit(200);
    if (error) throw error;
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err: any) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || err }) };
  }
};

export { handler };
