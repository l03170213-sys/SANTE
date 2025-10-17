import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM!;
const APP_URL = process.env.APP_URL || "https://your-app.example.com";

if (SENDGRID_API_KEY) sgMail.setApiKey(SENDGRID_API_KEY);

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
});

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST")
      return { statusCode: 405, body: "Method not allowed" };

    // Verify secret header
    const secretHeader =
      event.headers["x-admin-secret"] || event.headers["X-Admin-Secret"];
    if (
      !process.env.ADMIN_FUNCTION_SECRET ||
      !secretHeader ||
      secretHeader !== process.env.ADMIN_FUNCTION_SECRET
    ) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const body = JSON.parse(event.body || "{}");
    const { requestId, tempPassword } = body;
    if (!requestId) return { statusCode: 400, body: "requestId is required" };

    // Load practitioner_request
    const { data: reqRows, error: reqErr } = await supabaseAdmin
      .from("practitioner_requests")
      .select("*")
      .eq("id", requestId)
      .limit(1);
    if (reqErr) throw reqErr;
    const req = reqRows && reqRows[0];
    if (!req) return { statusCode: 404, body: "request not found" };

    const email = req.email;

    // Find auth user by email using admin REST endpoint
    const usersRes = await fetch(
      `${SUPABASE_URL}/auth/v1/admin/users?email=eq.${encodeURIComponent(email)}`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        },
      },
    );
    const users = await usersRes.json();
    let user = users && users[0];

    // If no user exists, create one via admin API
    if (!user) {
      const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: tempPassword || Math.random().toString(36).slice(-8),
          email_confirm: true,
        }),
      });
      user = await createRes.json();
    }

    const userId = user.id;

    // If tempPassword provided, set it explicitly
    const passwordToSet = tempPassword || Math.random().toString(36).slice(-8);
    await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: passwordToSet }),
    });

    // Upsert profile
    const fullName = req.name || (req.email ? req.email.split("@")[0] : userId);
    await supabaseAdmin
      .from("profiles")
      .upsert({
        id: userId,
        email,
        full_name: fullName,
        role: "practitioner",
        approved: true,
        must_change_password: true,
      })
      .select();

    // Insert into practitioners
    await supabaseAdmin
      .from("practitioners")
      .insert([
        { id: userId, specialty: req.specialty || null, clinic_info: {} },
      ])
      .select();

    // Mark request processed
    await supabaseAdmin
      .from("practitioner_requests")
      .update({ processed: true })
      .eq("id", requestId);

    // Send email via SendGrid
    if (SENDGRID_API_KEY) {
      const msg = {
        to: email,
        from: EMAIL_FROM,
        subject: "Votre compte praticien a été validé",
        html: `<p>Bonjour ${fullName},</p>
<p>Votre compte praticien a été validé par l'équipe. Vous pouvez vous connecter avec ce mot de passe provisoire : <strong>${passwordToSet}</strong></p>
<p>Lors de votre première connexion, vous devrez changer votre mot de passe ici : <a href="${APP_URL}/change-password">${APP_URL}/change-password</a></p>
<p>Merci,</p>
<p>L'équipe</p>`,
      };
      await sgMail.send(msg);
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, userId }) };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || err }),
    };
  }
};

export { handler };
