import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="error-page">
        <div className="wrap error-panel">
          <p className="eyebrow">404</p>
          <h1>This page does not exist</h1>
          <p>
            The route you requested is not on this site — maybe it moved, maybe it never shipped.
            Either way, you are not lost.
          </p>
          <div className="error-actions">
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/blog" className="btn btn-ghost">
              Read the blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
