import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { handleContactForm } from "./contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── Contact Form API ─────────────────────────────────────────────────────
  app.post("/api/contact", async (req, res) => {
    try {
      const result = await handleContactForm(req.body);
      res.status(result.ok ? 200 : 400).json(result);
    } catch (err) {
      console.error("[/api/contact]", err);
      res.status(500).json({ ok: false, message: "Server error. Please try again." });
    }
  });

  // Serve static files from dist/public
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // SPA fallback — serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Experience Blended server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
