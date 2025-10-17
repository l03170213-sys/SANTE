import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM!;

if (SENDGRID_API_KEY) sgMail.setApiKey(SENDGRID_API_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { auth: { persistSession: false } });

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
    const body = JSON.parse(event.body || "{}");
    const { requestId, reason } = body;
    if (!requestId) return { statusCode: 400, body: "requestId is required" };

    const { data: reqRows } = await supabaseAdmin.from('practitioner_requests').select('*').eq('id', requestId).limit(1);
    const req = reqRows && reqRows[0];
    if (!req) return { statusCode: 404, body: 'request not found' };

    await supabaseAdmin.from('practitioner_requests').update({ processed: true, processed_reason: reason || null }).eq('id', requestId);

    if (SENDGRID_API_KEY) {
      await sgMail.send({
        to: req.email,
        from: EMAIL_FROM,
        subject: 'Votre candidature praticien a été rejetée',
        html: `<p>Bonjour ${req.name || ''},</p><p>Votre candidature a été rejetée. Raison : ${reason || 'non spécifiée'}.</p>`,
      });
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err: any) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || err }) };
  }
};

export { handler };
