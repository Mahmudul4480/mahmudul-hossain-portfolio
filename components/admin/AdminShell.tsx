"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AdminShellProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminShell({ children, title }: AdminShellProps) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <Image src="/assets/logo-monogram.jpg" alt="" width={36} height={36} />
          <span>
            mahmudul<span className="accent">()</span>
          </span>
        </Link>

        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-link">
            All posts
          </Link>
          <Link href="/admin/posts/new" className="admin-nav-link admin-nav-link-primary">
            + New post
          </Link>
          <Link href="/blog" className="admin-nav-link" target="_blank">
            View blog ↗
          </Link>
          <Link href="/" className="admin-nav-link" target="_blank">
            View site ↗
          </Link>
        </nav>

        <button type="button" className="admin-logout" onClick={logout}>
          Sign out
        </button>
      </aside>

      <div className="admin-main">
        {title && (
          <header className="admin-topbar">
            <h1>{title}</h1>
          </header>
        )}
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
