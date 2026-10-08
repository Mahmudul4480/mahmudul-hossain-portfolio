"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#090d16",
          color: "#e7ecf6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main className="error-page">
          <div className="wrap error-panel">
            <p className="eyebrow">Something broke</p>
            <h1>Unexpected error</h1>
            <p>The app hit a critical error. Try again or return home.</p>
            <div className="error-actions">
              <button type="button" className="btn btn-primary" onClick={() => reset()}>
                Try again
              </button>
              <Link href="/" className="btn btn-ghost">
                Back to home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
