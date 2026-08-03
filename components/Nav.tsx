"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="wrap" aria-label="Primary">
        <Link href="/" className="logo">
          <span className="logo-badge">
            <Image
              src="/assets/logo-monogram.jpg"
              alt="Mahmudul Hossain logo"
              width={42}
              height={42}
              priority
            />
          </span>
          <span className="fn">mahmudul</span>
          <span className="accent">()</span>
          <span className="cursor" aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {siteConfig.navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="btn btn-primary btn-small"
            onClick={() => setOpen(false)}
          >
            Book a call
          </Link>
        </div>
      </nav>
    </header>
  );
}
