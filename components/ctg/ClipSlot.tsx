"use client";

import React, { useEffect, useRef, useState } from "react";
import { Ship } from "./CtgArt";

export const CTG_CLIPS: Record<string, { src: string; webm?: string; poster?: string } | undefined> = {
  port: { src: "/ctg/clips/port.mp4", webm: "/ctg/clips/port.webm", poster: "/ctg/clips/port.jpg" },
  bridge: { src: "/ctg/clips/bridge.mp4", webm: "/ctg/clips/bridge.webm", poster: "/ctg/clips/bridge.jpg" },
};

type Variant = "port" | "bridge" | "beach" | "crb";

function Fallback({ variant }: { variant: Variant }) {
  if (variant === "port")
    return (
      <svg viewBox="0 0 400 240" className="ctg-clip__svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="240" fill="#090d16" />
        <rect y="160" width="400" height="80" fill="#121a2c" />
        <g className="ctg-clip-crane"><rect x="250" y="40" width="8" height="120" fill="#f2a93b" /><rect x="190" y="36" width="150" height="10" fill="#f2a93b" /><rect className="ctg-clip-hook" x="214" y="46" width="22" height="14" fill="#5eead4" /></g>
        <g className="ctg-clip-ship"><Ship x={20} y={160} scale={0.5} /></g>
      </svg>
    );
  if (variant === "bridge")
    return (
      <svg viewBox="0 0 400 240" className="ctg-clip__svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="240" fill="#121a2c" />
        <circle cx="300" cy="90" r="40" fill="#f2a93b" opacity="0.8" />
        <rect y="170" width="400" height="70" fill="#090d16" />
        <path d="M0 170 Q200 150 400 170" stroke="#e7ecf6" strokeWidth="5" fill="none" />
        <line x1="130" y1="60" x2="130" y2="168" stroke="#e7ecf6" strokeWidth="5" /><line x1="270" y1="60" x2="270" y2="168" stroke="#e7ecf6" strokeWidth="5" />
        {[0, 1, 2, 3, 4].map((i) => (<g key={i} stroke="#5eead4" strokeWidth="1.5"><line x1="130" y1="64" x2={60 + i * 14} y2="164" /><line x1="130" y1="64" x2={145 + i * 14} y2="162" /><line x1="270" y1="64" x2={200 + i * 12} y2="162" /><line x1="270" y1="64" x2={285 + i * 14} y2="164" /></g>))}
        <g className="ctg-clip-car"><rect x="0" y="158" width="18" height="7" rx="2" fill="#f2a93b" /></g>
      </svg>
    );
  if (variant === "beach")
    return (
      <svg viewBox="0 0 400 240" className="ctg-clip__svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="240" fill="#12343a" />
        <circle className="ctg-clip-sun" cx="200" cy="150" r="46" fill="#f2a93b" />
        <rect y="150" width="400" height="90" fill="#121a2c" />
        <g className="ctg-clip-wave" stroke="#5eead4" strokeWidth="3" fill="none" opacity="0.7"><path d="M-40 180 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" /></g>
        <path d="M0 215 C120 200 260 225 400 205 L400 240 L0 240Z" fill="#f2a93b" />
      </svg>
    );
  return (
    <svg viewBox="0 0 400 240" className="ctg-clip__svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="240" fill="#0e1424" />
      <g className="ctg-clip-leaves">
        <ellipse cx="120" cy="80" rx="120" ry="50" fill="#2e8a7b" /><ellipse cx="300" cy="70" rx="120" ry="48" fill="#1a4a42" />
      </g>
      <rect x="110" y="110" width="12" height="130" fill="#4a3a22" /><rect x="290" y="100" width="12" height="140" fill="#4a3a22" />
      <g fill="#f2a93b" className="ctg-clip-light">{[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={60 + i * 55} cy={140 + (i % 2) * 20} r="2.5" />)}</g>
    </svg>
  );
}

function LazyClip({ clip }: { clip: { src: string; webm?: string; poster?: string } }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        io.disconnect();
      },
      { rootMargin: "240px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready) return;
    el.load();
    el.play().catch(() => undefined);
  }, [ready]);

  return (
    <video ref={ref} poster={clip.poster} autoPlay muted loop playsInline preload="none" disablePictureInPicture aria-hidden="true">
      {ready && clip.webm ? <source src={clip.webm} type="video/webm" /> : null}
      {ready ? <source src={clip.src} type="video/mp4" /> : null}
    </video>
  );
}

export function ClipSlot({ id, title, en, variant }: { id: string; title: string; en: string; variant: Variant }) {
  const clip = CTG_CLIPS[id];
  return (
    <figure className="ctg-clip" data-clip-slot={id}>
      <div className="ctg-clip__frame">
        {clip ? <LazyClip clip={clip} /> : <Fallback variant={variant} />}
      </div>
      <figcaption>
        <b>{title}</b> <span>{en}</span>
      </figcaption>
    </figure>
  );
}
