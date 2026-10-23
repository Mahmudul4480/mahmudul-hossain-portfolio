"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)");
    let revert: (() => void) | null = null;
    let cancelled = false;
    const previousScroll = document.documentElement.style.scrollBehavior;
    if (!reduce) document.documentElement.style.scrollBehavior = "auto";

    const photo = document.querySelector<HTMLElement>("[data-parallax]");
    let raf = 0;
    const onScroll = () => {
      if (!photo || reduce || !desktop.matches) return;
      const y = window.scrollY * 0.14;
      photo.style.transform = `translate3d(-50%, ${y}px, 0)`;
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    if (!reduce) {
      onScroll();
      window.addEventListener("scroll", schedule, { passive: true });
    }

    async function setup() {
      if (reduce || !desktop.matches || cancelled) return;
      const gsapModule = await import("gsap");
      const scrollModule = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-wipe]").forEach((el) => {
          const square = el.querySelector<HTMLElement>("[data-wipe-square]");
          if (!square) return;
          const width = square.offsetWidth || 92;
          const cover = (Math.hypot(window.innerWidth, window.innerHeight) / width) * 1.35;
          gsap.fromTo(
            square,
            { scale: 1, borderRadius: "18px" },
            {
              scale: cover,
              borderRadius: "0px",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "+=85%",
                pin: true,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            },
          );
          const label = el.querySelector("[data-wipe-label]");
          if (label) {
            gsap.to(label, {
              autoAlpha: 0,
              y: -24,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "+=35%",
                scrub: true,
              },
            });
          }
        });

        const work = document.querySelector<HTMLElement>("[data-hscroll]");
        const track = document.querySelector<HTMLElement>("[data-hscroll-track]");
        const head = work?.querySelector<HTMLElement>(".h-work-head");
        if (work && track && head) {
          const distance = () => {
            const available = window.innerWidth - head.getBoundingClientRect().width - 64;
            return Math.max(0, track.scrollWidth - available);
          };
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              id: "work-pin",
              trigger: work,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          track.addEventListener("focusin", (event) => {
            const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(
              ".h-pcard, .h-seeall",
            );
            const trigger = tween.scrollTrigger;
            if (!card || !trigger) return;
            const cards = Array.from(track.children);
            const index = cards.indexOf(card);
            if (index < 0) return;
            const progress = index / Math.max(cards.length - 1, 1);
            const top = trigger.start + (trigger.end - trigger.start) * progress;
            window.scrollTo({ top, behavior: "auto" });
          });
        }

        document.querySelectorAll<HTMLElement>("[data-exp-card]").forEach((card, index) => {
          const rot = index % 2 === 0 ? -2.2 : 2.4;
          gsap.fromTo(
            card,
            { y: 90, rotate: rot * 3 },
            {
              y: 0,
              rotate: rot,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 46%",
                scrub: true,
              },
            },
          );
        });

        const expand = document.querySelector<HTMLElement>("[data-expand]");
        if (expand) {
          gsap.fromTo(
            expand,
            { scale: 0.78, borderRadius: "28px" },
            {
              scale: 1,
              borderRadius: "0px",
              ease: "none",
              scrollTrigger: {
                trigger: expand.parentElement,
                start: "top 80%",
                end: "top 28%",
                scrub: true,
              },
            },
          );
        }
      });

      revert = () => ctx.revert();
      // Pinned sections add spacer height after the browser has already jumped to
      // the URL hash, so re-scroll to the hash target once layout is final.
      const scrollToHash = () => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const target = id ? document.getElementById(id) : null;
        if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
      };
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        scrollToHash();
      });
      document.fonts?.ready
        .then(() => {
          ScrollTrigger.refresh();
          scrollToHash();
        })
        .catch(() => undefined);
    }

    setup();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      document.documentElement.style.scrollBehavior = previousScroll;
      revert?.();
    };
  }, []);

  return null;
}
