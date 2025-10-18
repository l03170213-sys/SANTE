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
    const { email } = body;
    if (!email) return { statusCode: 400, body: "email is required" };

    // Check if user exists in auth
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

    // generate temp password
    const tempPassword = Math.random().toString(36).slice(-10) + "A1!";

    if (!user) {
      // create user
      const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: tempPassword,
          email_confirm: true,
        }),
      });
      user = await createRes.json();
    } else {
      // user exists — set password
      const userId = user.id;
      await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: tempPassword }),
      });
    }

    const userId = user.id;

    // Upsert profile and admins table
    await supabaseAdmin.from("profiles").upsert({
      id: userId,
      email,
      role: "admin",
      approved: true,
    });

    // insert into admins table (upsert by email to avoid duplicates)
    await supabaseAdmin
      .from("admins")
      .upsert({ email }, { onConflict: "email" });

    // send email with temp password: Mailgun preferred, fallback to SendGrid
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      const mgApiKey = process.env.MAILGUN_API_KEY;
      const mgDomain = process.env.MAILGUN_DOMAIN;
      const bodyForm = new URLSearchParams();
      bodyForm.append("from", EMAIL_FROM);
      bodyForm.append("to", email);
      bodyForm.append("subject", "Accès administrateur");
      bodyForm.append(
        "html",
        `<p>Bonjour,</p>
<p>Vous avez été ajouté en tant qu'administrateur. Utilisez ce mot de passe provisoire pour vous connecter : <strong>${tempPassword}</strong></p>
<p>Lors de votre première connexion, vous pourrez changer le mot de passe ici : <a href="${APP_URL}/change-password">${APP_URL}/change-password</a></p>
<p>Merci.</p>`,
      );
      await fetch(`https://api.mailgun.net/v3/${mgDomain}/messages`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`api:${mgApiKey}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyForm.toString(),
      });
    } else if (SENDGRID_API_KEY) {
      const msg = {
        to: email,
        from: EMAIL_FROM,
        subject: "Accès administrateur",
        html: `<p>Bonjour,</p>
<p>Vous avez été ajouté en tant qu'administrateur. Utilisez ce mot de passe provisoire pour vous connecter : <strong>${tempPassword}</strong></p>
<p>Lors de votre première connexion, vous pourrez changer le mot de passe ici : <a href="${APP_URL}/change-password">${APP_URL}/change-password</a></p>
<p>Merci.</p>`,
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
