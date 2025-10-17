import { Request, Response, Router } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || "";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
});

function ensureServiceRoleConfigured(res: Response) {
  if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) {
    res
      .status(500)
      .json({ error: "Service role key or URL not configured on server" });
    return false;
  }
  return true;
}

// Create or update a profile (should be called from a trusted client after signup)
router.post("/create", async (req: Request, res: Response) => {
  if (!ensureServiceRoleConfigured(res)) return;
  const { id, email, role, full_name } = req.body || {};
  if (!id) return res.status(400).json({ error: "Missing id" });
  try {
    const { error } = await supabaseAdmin
      .from("profiles")
      .upsert([{ id, email, role: role || "patient", full_name }], {
        onConflict: "id",
      });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
