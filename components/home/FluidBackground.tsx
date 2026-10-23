"use client";

import { useEffect, useRef } from "react";

/**
 * Soft orange/teal cursor glow. A full-screen fluid sim left dense dye over
 * body copy; this draws two small radial lights and screens them onto the
 * page, so the effect can only lighten — it never paints a dark blob on text.
 * prefers-reduced-motion, data-saver, and coarse pointers keep the static wash.
 */
export default function FluidBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (motion.matches || !finePointer.matches || connection?.saveData) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    root.classList.add("is-live");

    let width = 0;
    let height = 0;
    let dpr = 1;
    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let hasPointer = false;
    let alpha = 0;
    let frame = 0;
    let stopped = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!hasPointer) {
        current.x = width * 0.72;
        current.y = height * 0.28;
      }
    };

    const orb = (x: number, y: number, radius: number, inner: string, mid: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, inner);
      gradient.addColorStop(0.45, mid);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      if (stopped || document.hidden) {
        frame = 0;
        return;
      }

      const targetX = hasPointer ? pointer.x : current.x;
      const targetY = hasPointer ? pointer.y : current.y;
      current.x += (targetX - current.x) * 0.16;
      current.y += (targetY - current.y) * 0.16;
      alpha += ((hasPointer ? 1 : 0) - alpha) * 0.08;

      ctx.clearRect(0, 0, width, height);
      if (alpha > 0.01) {
        const radius = Math.min(132, Math.max(88, width * 0.078));
        const gap = radius * 0.95;
        ctx.globalAlpha = alpha;
        orb(current.x, current.y, radius, "rgba(242,169,59,0.42)", "rgba(242,169,59,0.1)");
        orb(
          current.x + gap,
          current.y + gap * 0.35,
          radius * 0.55,
          "rgba(94,234,212,0.34)",
          "rgba(94,234,212,0.08)",
        );
        ctx.globalAlpha = 1;
      }

      if (!hasPointer && alpha < 0.02) {
        frame = 0;
        ctx.clearRect(0, 0, width, height);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!frame && !stopped && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      hasPointer = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (alpha === 0) {
        current.x = event.clientX;
        current.y = event.clientY;
      }
      kick();
    };

    const onLeave = () => {
      hasPointer = false;
      kick();
    };

    const onVisibility = () => {
      if (!document.hidden) kick();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      root.classList.remove("is-live");
    };
  }, []);

  return (
    <div className="h-fluid" ref={rootRef} aria-hidden="true">
      <div className="h-fluid-fallback" />
      <canvas ref={canvasRef} className="h-fluid-canvas" />
    </div>
  );
}
