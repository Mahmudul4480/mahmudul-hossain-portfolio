"use client";

import { useEffect, useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export default function ContactForm() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === slug);
    if (match) setService(match.name);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("sending");
    setError("");
    const text = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service || "-"}\nWebsite: ${data.site || "-"}\n\n${data.message}`;
    setDraft(text);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        e.currentTarget?.reset?.();
        return;
      }
      if (res.status === 400) {
        setStatus("error");
        setError(json.error || "Please check the form.");
        return;
      }
      setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="h-form h-form-done" role="status">
        <strong>Thanks — your request is in.</strong>
        <p>I&apos;ll reply by email, usually within one business day.</p>
      </div>
    );
  }

  const subject = encodeURIComponent(`Quote request${service ? ` — ${service}` : ""}`);

  return (
    <form className="h-form" onSubmit={onSubmit} aria-label="Request a quote">
      <div className="h-form-row">
        <label>
          Name
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>
      <div className="h-form-row">
        <label>
          Service
          <select name="service" value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Website URL (optional)
          <input name="site" maxLength={300} placeholder="https://" />
        </label>
      </div>
      <label>
        What do you need?
        <textarea name="message" required rows={5} maxLength={5000} />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="h-form-hp" aria-hidden="true" />
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request a quote"}
      </button>
      {status === "error" && <p className="h-form-msg" role="alert">{error}</p>}
      {status === "fallback" && (
        <p className="h-form-msg" role="alert">
          The form couldn&apos;t send right now. Please send it directly:{" "}
          <a href={`mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(draft)}`}>email</a>{" "}
          or{" "}
          <a href={`${siteConfig.whatsapp}?text=${encodeURIComponent(draft)}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      )}
    </form>
  );
}
