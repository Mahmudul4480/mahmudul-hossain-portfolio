"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { siteConfig } from "@/data/site";

export default function HomeNav() {
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState(false);
  const menuId = useId();
  const pillMenuId = useId();

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setPill(!entry.isIntersecting), {
      threshold: 0.18,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`h-nav${pill ? " is-hidden" : ""}`}>
        <Link href="/" className="h-logo" aria-label={`${siteConfig.name} home`}>
          <span className="h-logo-mark">
            <Image src="/assets/logo-monogram.jpg" alt="" width={36} height={36} priority />
          </span>
          <span>
            mahmudul<span className="h-logo-accent">()</span>
          </span>
        </Link>

        <nav className={`h-nav-links${open ? " is-open" : ""}`} aria-label="Primary" id={menuId}>
          {siteConfig.navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="btn btn-primary btn-small h-nav-cta-mobile"
            onClick={() => setOpen(false)}
          >
            Start a project
          </Link>
        </nav>

        <div className="h-nav-end">
          <Link href="#contact" className="btn btn-primary btn-small h-nav-cta">
            Start a project
          </Link>
          <button
            type="button"
            className="h-nav-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`h-pill-wrap${pill ? " is-visible" : ""}`}>
        <div className="h-pill">
          <Image
            src="/assets/mahmudul-hero.png"
            alt=""
            width={84}
            height={84}
            className="h-pill-photo"
          />
          <span className="h-pill-name">{siteConfig.name}</span>
          <button
            type="button"
            className="h-pill-menu"
            aria-expanded={open}
            aria-controls={pillMenuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span />
            <span />
            <span />
          </button>
        </div>
        {open && pill ? (
          <nav className="h-pill-panel" id={pillMenuId} aria-label="Primary">
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
          </nav>
        ) : null}
      </div>
    </>
  );
}
