/**
 * Experience Blended — Contact Form Handler
 * Shared between Express (production) and Vite middleware (development)
 *
 * Storage : server/data/submissions.json  (simple CRM)
 * Email   : Resend API (RESEND_API_KEY env var)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ContactSubmission {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  partner: string;
  service: string;
  date: string;
  message: string;
  status: "new" | "read" | "replied";
}

// ── Storage ───────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

function readSubmissions(): ContactSubmission[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeSubmissions(submissions: ContactSubmission[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
}

// ── Email ─────────────────────────────────────────────────────────────────────
async function sendEmailNotification(submission: ContactSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notification.");
    return;
  }

  const toEmail = process.env.NOTIFICATION_EMAIL || "hello@experienceblended.com";
  const fromEmail = process.env.FROM_EMAIL || "noreply@experienceblended.com";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: `Experience Blended <${fromEmail}>`,
      to: toEmail,
      subject: `✦ New Inquiry — ${submission.name}${submission.partner ? ` & ${submission.partner}` : ""}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: 'DM Sans', Arial, sans-serif; background: #FAF8F5; margin: 0; padding: 0;">
          <div style="max-width: 560px; margin: 40px auto; background: #ffffff; border: 1px solid #e0ddd8; padding: 40px;">
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; margin: 0 0 8px;">Experience Blended</p>
            <h1 style="font-family: Georgia, serif; font-size: 28px; color: #1A1A1A; margin: 0 0 32px; font-weight: 700;">
              New Inquiry
            </h1>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #1A1A1A; font-size: 14px; font-weight: 600;">${submission.name}</td>
              </tr>
              ${
                submission.partner
                  ? `<tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Partner</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #1A1A1A; font-size: 14px;">${submission.partner}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #1A1A1A; font-size: 14px;">
                  <a href="mailto:${submission.email}" style="color: #1A1A1A;">${submission.email}</a>
                </td>
              </tr>
              ${
                submission.date
                  ? `<tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Wedding Date</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #1A1A1A; font-size: 14px;">${submission.date}</td>
              </tr>`
                  : ""
              }
              ${
                submission.message
                  ? `<tr>
                <td style="padding: 12px 16px 12px 0; border-bottom: 1px solid #f0ede8; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; color: #1A1A1A; font-size: 14px; line-height: 1.6;">${submission.message.replace(/\n/g, "<br>")}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Received</td>
                <td style="padding: 12px 0; color: #999; font-size: 12px;">${new Date(submission.submittedAt).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f0ede8; text-align: center;">
              <a href="mailto:${submission.email}?subject=Re: Day of Coordination Inquiry"
                 style="display: inline-block; background: #1A1A1A; color: #fff; text-decoration: none; padding: 12px 28px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600;">
                Reply to ${submission.name}
              </a>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`[contact] Email notification sent to ${toEmail}`);
  } catch (err) {
    console.error("[contact] Failed to send email notification:", err);
  }
}

// ── Main Handler ──────────────────────────────────────────────────────────────
export async function handleContactForm(body: Record<string, string>): Promise<{
  ok: boolean;
  message: string;
  submission?: ContactSubmission;
}> {
  const { name, email, partner = "", service = "Day of Coordination", date = "", message = "" } = body;

  if (!name?.trim() || !email?.trim()) {
    return { ok: false, message: "Name and email are required." };
  }

  const submission: ContactSubmission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    submittedAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    partner: partner.trim(),
    service: service.trim(),
    date: date.trim(),
    message: message.trim(),
    status: "new",
  };

  // Persist to JSON (CRM store)
  const submissions = readSubmissions();
  submissions.unshift(submission);
  writeSubmissions(submissions);

  console.log(`[contact] Saved submission #${submissions.length} — ${submission.name} / ${submission.date || "date TBD"}`);

  // Send email (non-blocking)
  sendEmailNotification(submission).catch(() => {});

  return {
    ok: true,
    message: "Submission received.",
    submission,
  };
}
