import { Request, Response, Router } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || "";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { auth: { persistSession: false } });

// Helper to require service role configured
function ensureServiceRoleConfigured(res: Response) {
  if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) {
    res.status(500).json({ error: "Service role key or URL not configured on server" });
    return false;
  }
  return true;
}

// GET practitioner requests (only for admins)
router.get("/practitioner_requests", async (req: Request, res: Response) => {
  if (!ensureServiceRoleConfigured(res)) return;
  try {
    const { data, error } = await supabaseAdmin.from("practitioner_requests").select("*").order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Approve practitioner request: create auth user and profile
router.post("/approve", async (req: Request, res: Response) => {
  if (!ensureServiceRoleConfigured(res)) return;
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Missing request id" });
  try {
    const { data: reqData, error: fetchErr } = await supabaseAdmin.from("practitioner_requests").select("*").eq("id", id).single();
    if (fetchErr) return res.status(400).json({ error: fetchErr.message });
    const request = reqData as any;
    // create auth user with random password
    const pw = Math.random().toString(36).slice(2, 10) + "A!";
    const { data: userData, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email: request.email,
      password: pw,
      email_confirm: true,
      user_metadata: { full_name: request.name, practitioner: true },
    } as any);
    if (createErr) return res.status(500).json({ error: createErr.message });
    const user = (userData as any).user ?? (userData as any);

    // insert profile linking to auth user
    const { error: profileErr } = await supabaseAdmin.from("profiles").insert([
      { id: user.id, role: "practitioner", approved: true, full_name: request.name, city: request.postal },
    ]);
    if (profileErr) return res.status(500).json({ error: profileErr.message });

    // Optionally remove or mark request as processed
    await supabaseAdmin.from("practitioner_requests").update({ processed: true }).eq("id", id);

    // Return created user email and a temp password (you may want to send via email instead)
    res.json({ ok: true, email: request.email, tempPassword: pw });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to register current logged-in user (via access token) as admin in admins table
router.post("/register-self", async (req: Request, res: Response) => {
  if (!ensureServiceRoleConfigured(res)) return;
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing bearer token" });
  const token = authHeader.split(" ")[1];
  try {
    const { data: userRes, error: userErr } = await supabaseAdmin.auth.getUser(token as string);
    if (userErr) return res.status(401).json({ error: userErr.message });
    const user = userRes?.data?.user;
    if (!user) return res.status(401).json({ error: "Invalid user" });
    // insert into admins table
    const { error: insertErr } = await supabaseAdmin.from("admins").upsert([{ email: user.email }]);
    if (insertErr) return res.status(500).json({ error: insertErr.message });
    res.json({ ok: true, email: user.email });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
