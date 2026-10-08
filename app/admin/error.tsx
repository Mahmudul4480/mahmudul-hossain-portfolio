"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="admin-login-page">
      <div className="admin-login-form">
        <p className="admin-kicker">Admin error</p>
        <h1>Something went wrong</h1>
        <p className="admin-login-lede">The admin panel hit an error. Try again or go back.</p>
        <div className="error-actions">
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/admin" className="btn btn-ghost">
            Admin home
          </Link>
        </div>
      </div>
    </div>
  );
}
