"use client";

import Link from "next/link";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    <>
      <Nav />
      <main id="main" className="error-page">
        <div className="wrap error-panel">
          <p className="eyebrow">Something broke</p>
          <h1>Unexpected error</h1>
          <p>
            A server or client error interrupted this page. You can retry, or head back to a known
            route while I investigate.
          </p>
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
      <Footer />
    </>
  );
}
