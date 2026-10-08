"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Login failed.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <div className="admin-login-brand">
        <Image src="/assets/logo-monogram.jpg" alt="" width={48} height={48} className="admin-logo" />
        <div>
          <p className="admin-kicker">Blog CMS</p>
          <h1>Admin sign in</h1>
        </div>
      </div>
      <p className="admin-login-lede">Write, publish, and manage blog posts from your dashboard.</p>

      <label className="admin-field">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          required
          autoComplete="current-password"
        />
      </label>

      {error && <p className="admin-error">{error}</p>}

      <button type="submit" className="btn btn-primary admin-submit" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <Link href="/" className="admin-back-link">
        ← Back to site
      </Link>
    </form>
  );
}
