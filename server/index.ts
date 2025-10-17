import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin API routes
  try {
    const adminRouter = require("./routes/admin").default;
    app.use("/api/admin", adminRouter);
  } catch (e) {
    // ignore if not available
    console.warn("Admin router not loaded", e);
  }

  // Profiles API (server-side profile creation/upsert using service role)
  try {
    const profilesRouter = require("./routes/profiles").default;
    app.use("/api/profiles", profilesRouter);
  } catch (e) {
    console.warn("Profiles router not loaded", e);
  }

  return app;
}
