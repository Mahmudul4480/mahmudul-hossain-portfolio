import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+$/g, "").slice(0, max).trim() : "";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden "website" field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const service = clean(body.service, 120);
  const site = clean(body.site, 300);
  const message = clean(body.message, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Please add your name, a valid email and a short message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@mahmudulhossain.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set; lead not delivered", { name, email, service });
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const subject = `New quote request${service ? ` — ${service}` : ""} from ${name}`;
  const html = `<h2>${esc(subject)}</h2>
<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Service:</b> ${esc(service || "-")}<br><b>Website:</b> ${esc(site || "-")}</p>
<p style="white-space:pre-wrap">${esc(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject, html }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
