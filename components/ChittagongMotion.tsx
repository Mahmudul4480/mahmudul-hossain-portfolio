"use client";

import { useEffect, useRef } from "react";
import type { ServiceProcessStep } from "@/data/services";

const PLACES = [
  "Agrabad",
  "GEC",
  "Nasirabad",
  "Halishahar",
  "Pahartali",
  "Kattali",
  "Patenga",
  "Panchlaish",
  "Khulshi",
  "Chawkbazar",
  "Akbarshah",
];

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Original port illustration. Geometry is not taken from the agency SVGs. */
export function ChittagongHeroArt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    const layers = Array.from(root.querySelectorAll<SVGGElement>("[data-depth]"));
    let frame = 0;
    const paint = () => {
      frame = 0;
      const panel = root.parentElement;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const span = Math.max(rect.height, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      for (const layer of layers) {
        const depth = Number(layer.getAttribute("data-depth") || 0);
        layer.style.transform = `translate3d(0, ${progress * depth}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="ctg-art" aria-hidden="true">
      <svg className="ctg-art-svg" viewBox="0 0 800 480" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="ctgSkyMh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#090d16" />
            <stop offset="0.55" stopColor="#0e1424" />
            <stop offset="0.82" stopColor="#12343a" />
            <stop offset="1" stopColor="#2a2114" />
          </linearGradient>
          <linearGradient id="ctgRiverMh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5eead4" stopOpacity="0.35" />
            <stop offset="0.35" stopColor="#12343a" />
            <stop offset="1" stopColor="#090d16" />
          </linearGradient>
          <radialGradient id="ctgSunMh" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#f2a93b" />
            <stop offset="0.45" stopColor="#5eead4" stopOpacity="0.55" />
            <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="480" fill="url(#ctgSkyMh)" />
        <g className="ctg-stars">
          <circle cx="70" cy="48" r="1.2" />
          <circle cx="140" cy="90" r="1" />
          <circle cx="210" cy="36" r="1.4" />
          <circle cx="300" cy="70" r="1" />
          <circle cx="390" cy="28" r="1.3" />
          <circle cx="470" cy="84" r="1" />
          <circle cx="560" cy="40" r="1.2" />
          <circle cx="740" cy="64" r="1.1" />
        </g>
        <g className="ctg-sun">
          <circle cx="640" cy="150" r="70" fill="url(#ctgSunMh)" />
          <circle cx="640" cy="150" r="16" fill="#f2a93b" />
        </g>
        <g data-depth="10">
          <path
            d="M0 250 C80 210 140 230 220 200 C300 170 360 220 460 190 C560 160 640 210 800 180 L800 320 L0 320 Z"
            fill="#121a2c"
          />
        </g>
        <g data-depth="18">
          <path
            d="M0 290 C120 250 200 270 300 250 C420 226 500 270 620 248 C700 234 760 260 800 250 L800 360 L0 360 Z"
            fill="#161f34"
          />
        </g>
        <g data-depth="28">
          <g className="ctg-city" transform="translate(0 -56)">
          <g fill="#1a2744" stroke="#3a4d6e" strokeWidth="1.5">
            <rect x="36" y="188" width="46" height="150" />
            <rect x="90" y="150" width="38" height="188" />
            <rect x="136" y="200" width="54" height="138" />
            <rect x="198" y="132" width="42" height="206" />
            <rect x="248" y="176" width="60" height="162" />
            <rect x="316" y="210" width="40" height="128" />
            <rect x="364" y="160" width="50" height="178" />
          </g>
          <g className="ctg-wins" fill="#5eead4">
            <rect x="48" y="204" width="6" height="8" />
            <rect x="64" y="204" width="6" height="8" />
            <rect x="48" y="224" width="6" height="8" />
            <rect x="102" y="168" width="6" height="8" />
            <rect x="116" y="188" width="6" height="8" />
            <rect x="210" y="150" width="6" height="8" />
            <rect x="226" y="170" width="6" height="8" />
            <rect x="262" y="196" width="6" height="8" />
            <rect x="286" y="216" width="6" height="8" />
            <rect x="378" y="180" width="6" height="8" />
            <rect x="396" y="200" width="6" height="8" />
          </g>
          <g stroke="#5eead4" fill="none" strokeWidth="2">
            <path d="M430 250 V150 H520" />
            <path d="M430 170 H500" />
            <path d="M468 150 V250" />
          </g>
          <g className="ctg-hook" stroke="#f2a93b" strokeWidth="2">
            <path d="M500 170 V230" />
            <path d="M492 230 H508" />
          </g>
          <g stroke="#8d97ae" fill="none" strokeWidth="3">
            <path d="M500 292 H760" />
            <path d="M548 292 V230" />
            <path d="M688 292 V230" />
          </g>
          <g stroke="#5eead4" fill="none" strokeWidth="1.4">
            <path d="M548 240 Q618 268 688 240" />
            <path d="M548 250 Q618 274 688 250" />
            <path d="M500 292 Q524 270 548 240" />
            <path d="M760 292 Q724 270 688 240" />
          </g>
          <g className="ctg-bridge-lights" fill="#f2a93b">
            <circle cx="548" cy="232" r="3" />
            <circle cx="618" cy="262" r="3" />
            <circle cx="688" cy="232" r="3" />
            <circle cx="580" cy="292" r="2.4" />
            <circle cx="650" cy="292" r="2.4" />
            <circle cx="720" cy="292" r="2.4" />
          </g>
          <g className="ctg-pin">
            <path d="M250 118 c14 0 24 10 24 22 c0 16 -24 36 -24 36 s-24 -20 -24 -36 c0 -12 10 -22 24 -22 z" fill="#5eead4" />
            <circle cx="250" cy="140" r="7" fill="#090d16" />
            <circle className="ctg-pin-pulse" cx="250" cy="140" r="7" fill="none" stroke="#5eead4" strokeWidth="2" />
          </g>
          </g>
        </g>
        <g data-depth="36">
          <g transform="translate(0 -56)">
          <rect x="0" y="328" width="800" height="152" fill="url(#ctgRiverMh)" />
          <g className="ctg-waves" fill="none" stroke="#5eead4" strokeOpacity="0.45" strokeWidth="2">
            <path d="M-80 360 Q-40 348 0 360 T80 360 T160 360 T240 360 T320 360 T400 360 T480 360 T560 360 T640 360 T720 360 T800 360 T880 360" />
            <path d="M-80 392 Q-20 378 40 392 T160 392 T280 392 T400 392 T520 392 T640 392 T760 392 T880 392" />
          </g>
          <g transform="translate(0 400)">
            <g className="ctg-ship-a" fill="#e7ecf6">
              <path d="M0 0 L120 0 L104 22 H16 Z" />
              <rect x="36" y="-16" width="28" height="16" fill="#5eead4" />
              <rect x="48" y="-28" width="6" height="12" fill="#f2a93b" />
            </g>
          </g>
          <g transform="translate(0 424)">
            <g className="ctg-ship-b" fill="#8d97ae">
              <path d="M0 0 L90 0 L78 16 H12 Z" />
              <rect x="28" y="-12" width="22" height="12" fill="#121a2c" />
            </g>
          </g>
          <g transform="translate(210 412)">
            <g className="ctg-sampan">
              <path d="M0 8 Q20 0 40 8 L34 14 H6 Z" fill="#e7ecf6" />
              <path d="M20 8 V-16" stroke="#5eead4" strokeWidth="1.5" />
              <path d="M20 -14 L34 2 H20 Z" fill="#f2a93b" opacity="0.85" />
            </g>
          </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export function ChittagongMarquee() {
  const row = [...PLACES, ...PLACES];
  return (
    <div className="ctg-marquee" aria-hidden="true">
      <div className="ctg-marquee-track">
        {row.map((place, index) => (
          <span key={`${place}-${index}`}>
            {place}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function cardOpacity(progress: number, index: number, count: number) {
  const seg = 1 / count;
  const fade = seg * 0.45;
  const start = index * seg;
  const end = start + seg;
  if (index === 0) {
    if (progress <= end - fade) return 1;
    if (progress >= end) return 0;
    return 1 - (progress - (end - fade)) / fade;
  }
  if (index === count - 1) {
    if (progress <= start) return 0;
    if (progress >= start + fade) return 1;
    return (progress - start) / fade;
  }
  if (progress <= start || progress >= end) return 0;
  if (progress < start + fade) return (progress - start) / fade;
  if (progress > end - fade) return 1 - (progress - (end - fade)) / fade;
  return 1;
}

export function ChittagongVoyage({ steps }: { steps: ServiceProcessStep[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const route = pathRef.current;
    const ship = shipRef.current;
    if (!section || !route || !ship || reducedMotion()) return;
    const length = route.getTotalLength();
    route.style.strokeDasharray = `${length}`;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      route.style.strokeDashoffset = `${length * (1 - progress)}`;
      ship.style.left = `${progress * 100}%`;
      const count = steps.length;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const opacity = cardOpacity(progress, index, count);
        card.style.opacity = String(opacity);
        card.style.transform = `translate3d(0, ${(1 - opacity) * 28}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <div ref={sectionRef} className="ctg-voyage">
      <div className="ctg-voyage-sticky">
        <div className="ctg-voyage-cards">
          {steps.map((step, index) => (
            <article
              key={step.step}
              className="ctg-voyage-card"
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            >
              <span className="ctg-voyage-port">
                {step.step} · {step.title}
              </span>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="ctg-voyage-route">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="ctg-voyage-svg" aria-hidden="true">
            <path
              d="M16 74 C180 18 280 112 500 70 C720 28 820 108 984 64"
              stroke="rgba(231,236,246,0.16)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8 10"
            />
            <path
              ref={pathRef}
              className="ctg-voyage-draw"
              d="M16 74 C180 18 280 112 500 70 C720 28 820 108 984 64"
              stroke="#5eead4"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          <div className="ctg-voyage-stops">
            {steps.map((step, index) => (
              <span key={step.step} style={{ left: `${(index / (steps.length - 1)) * 100}%` }}>
                <b />
                {step.title}
              </span>
            ))}
          </div>
          <div ref={shipRef} className="ctg-voyage-ship">
            <svg viewBox="0 0 120 48" aria-hidden="true">
              <path d="M4 28 L116 28 L100 44 H18 Z" fill="#e7ecf6" />
              <rect x="42" y="14" width="26" height="14" fill="#5eead4" />
              <rect x="52" y="4" width="6" height="10" fill="#f2a93b" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChittagongScenes() {
  return (
    <div className="ctg-scenes" aria-hidden="true">
      <figure>
        <svg viewBox="0 0 320 200">
          <rect width="320" height="200" fill="#0e1424" />
          <rect y="120" width="320" height="80" fill="#12343a" />
          <path d="M40 120 V48 H150" stroke="#5eead4" strokeWidth="3" fill="none" />
          <path d="M40 70 H130" stroke="#5eead4" strokeWidth="3" />
          <g className="ctg-hook">
            <path d="M130 70 V110" stroke="#f2a93b" strokeWidth="2" />
          </g>
          <path d="M180 150 L300 150 L286 168 H196 Z" fill="#e7ecf6" />
          <rect x="220" y="136" width="22" height="14" fill="#5eead4" />
        </svg>
        <figcaption>Port</figcaption>
      </figure>
      <figure>
        <svg viewBox="0 0 320 200">
          <rect width="320" height="200" fill="#090d16" />
          <circle cx="250" cy="48" r="16" fill="#f2a93b" />
          <path d="M20 150 H300" stroke="#8d97ae" strokeWidth="4" />
          <path d="M80 150 V78" stroke="#8d97ae" strokeWidth="4" />
          <path d="M240 150 V78" stroke="#8d97ae" strokeWidth="4" />
          <path d="M80 90 Q160 130 240 90" stroke="#5eead4" strokeWidth="2" fill="none" />
          <g className="ctg-bridge-lights" fill="#f2a93b">
            <circle cx="80" cy="80" r="3" />
            <circle cx="160" cy="124" r="3" />
            <circle cx="240" cy="80" r="3" />
          </g>
          <rect y="156" width="320" height="44" fill="#12343a" />
        </svg>
        <figcaption>Karnaphuli bridge</figcaption>
      </figure>
      <figure>
        <svg viewBox="0 0 320 200">
          <rect width="320" height="200" fill="#0e1424" />
          <circle className="ctg-sun" cx="230" cy="70" r="22" fill="#f2a93b" />
          <path d="M0 130 C80 110 140 150 220 128 C270 114 300 124 320 120 V200 H0 Z" fill="#4a3a22" />
          <path d="M0 150 C70 138 130 162 210 148 C260 140 300 150 320 146 V200 H0 Z" fill="#12343a" />
          <path className="ctg-waves" d="M-20 158 Q20 148 60 158 T140 158 T220 158 T300 158 T380 158" fill="none" stroke="#5eead4" strokeWidth="2" />
        </svg>
        <figcaption>Patenga</figcaption>
      </figure>
      <figure>
        <svg viewBox="0 0 320 200">
          <rect width="320" height="200" fill="#090d16" />
          <path d="M0 120 C50 70 90 100 140 64 C190 28 230 90 320 50 V200 H0 Z" fill="#121a2c" />
          <path d="M0 150 C80 110 140 160 220 130 C270 112 300 140 320 132 V200 H0 Z" fill="#161f34" />
          <circle cx="64" cy="40" r="2" fill="#5eead4" className="ctg-stars" />
          <circle cx="120" cy="24" r="1.4" fill="#e7ecf6" />
        </svg>
        <figcaption>Hills</figcaption>
      </figure>
    </div>
  );
}
