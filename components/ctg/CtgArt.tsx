/**
 * Chattogram illustrations ported from Mahmudul's Social Media Care page
 * (src/components/ctg/CtgArt.tsx) and recoloured to this site's navy, cyan, and amber.
 * Original geometry. See components/ctg/CREDITS.md.
 */
import React from "react";

export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="ctgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#090d16" />
          <stop offset="0.55" stopColor="#121a2c" />
          <stop offset="0.82" stopColor="#2e8a7b" />
          <stop offset="1" stopColor="#f2a93b" />
        </linearGradient>
        <linearGradient id="ctgRiver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5eead4" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#12343a" />
          <stop offset="1" stopColor="#090d16" />
        </linearGradient>
        <radialGradient id="ctgSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f2a93b" />
          <stop offset="0.45" stopColor="#5eead4" />
          <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="700" fill="url(#ctgSky)" />
      <g className="ctg-stars" fill="#e7ecf6">
        {Array.from({ length: 40 }).map((_, i) => (
          <circle key={i} cx={(i * 397) % 1600} cy={(i * 131) % 300} r={(i % 3) * 0.6 + 0.6} opacity={0.3 + (i % 5) / 10} />
        ))}
      </g>
      <circle className="ctg-sun" cx="1120" cy="430" r="190" fill="url(#ctgSun)" />
      <circle cx="1120" cy="430" r="70" fill="#f2a93b" />
      <path data-depth="0.15" className="ctg-layer" d="M0 420 C120 360 220 380 320 340 C420 300 520 360 640 330 C760 300 860 350 980 320 C1100 290 1220 350 1340 330 C1450 312 1530 350 1600 340 L1600 520 L0 520 Z" fill="#161f34" />
      <path data-depth="0.25" className="ctg-layer" d="M0 470 C150 420 260 450 380 420 C520 386 600 440 760 410 C900 384 1000 440 1160 418 C1300 398 1460 440 1600 420 L1600 540 L0 540 Z" fill="#121a2c" />
      <g data-depth="0.35" className="ctg-layer" stroke="#e7ecf6" strokeWidth="2" fill="none">
        <path d="M60 520 Q520 470 980 520" stroke="#5eead4" strokeWidth="6" />
        <line x1="340" y1="300" x2="340" y2="520" stroke="#e7ecf6" strokeWidth="8" />
        <line x1="700" y1="300" x2="700" y2="520" stroke="#e7ecf6" strokeWidth="8" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i} opacity="0.8">
            <line x1="340" y1="310" x2={340 - 30 - i * 30} y2={505 - i * 2} />
            <line x1="340" y1="310" x2={340 + 30 + i * 21} y2={500 - i * 1} />
            <line x1="700" y1="310" x2={700 - 30 - i * 21} y2={500 - i * 1} />
            <line x1="700" y1="310" x2={700 + 30 + i * 30} y2={505 - i * 2} />
          </g>
        ))}
        <circle cx="340" cy="300" r="5" fill="#f2a93b" stroke="none" className="ctg-blink" />
        <circle cx="700" cy="300" r="5" fill="#f2a93b" stroke="none" className="ctg-blink" />
      </g>
      <g data-depth="0.45" className="ctg-layer" fill="#f2a93b">
        {[1080, 1230, 1380].map((x, i) => (
          <g key={x} transform={`translate(${x} ${300 + i * 6})`}>
            <rect x="0" y="40" width="10" height="190" fill="#f2a93b" />
            <rect x="60" y="40" width="10" height="190" fill="#f2a93b" />
            <rect x="-90" y="30" width="230" height="14" fill="#f2a93b" />
            <rect x="0" y="0" width="70" height="12" fill="#f2a93b" />
            <line x1="35" y1="0" x2="-90" y2="30" stroke="#5eead4" strokeWidth="2" />
            <line x1="35" y1="0" x2="140" y2="30" stroke="#5eead4" strokeWidth="2" />
            <rect x="-60" y="44" width="2" height={50 + i * 20} fill="#e7ecf6" />
            <rect x="-72" y={94 + i * 20} width="26" height="14" fill="#5eead4" />
          </g>
        ))}
      </g>
      <rect y="520" width="1600" height="180" fill="url(#ctgRiver)" />
      <g className="ctg-waves" stroke="#5eead4" strokeOpacity="0.35" strokeWidth="2" fill="none">
        {[540, 570, 610, 660].map((y, i) => (
          <path key={y} d={`M0 ${y} q40 -8 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0`} opacity={1 - i * 0.2} />
        ))}
      </g>
      <g className="ctg-ship ctg-ship--a"><Ship x={0} y={500} scale={1} /></g>
      <g className="ctg-ship ctg-ship--b"><Ship x={0} y={560} scale={0.7} flip /></g>
      <g className="ctg-sampan" transform="translate(260 600)">
        <path d="M0 0 Q60 26 120 0 Q60 12 0 0Z" fill="#090d16" />
        <path d="M58 -2 L58 -50 L88 -6 Z" fill="#f2a93b" opacity="0.85" />
      </g>
    </svg>
  );
}

export function Ship({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  const colors = ["#f2a93b", "#5eead4", "#e7ecf6", "#f2a93b", "#2e8a7b", "#c4842a"];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M0 0 L300 0 L270 40 L22 40 Z" fill="#090d16" />
      <rect x="10" y="-6" width="282" height="6" fill="#f2a93b" />
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 9 }).map((__, col) => (
          <rect key={`${row}-${col}`} x={40 + col * 24} y={-26 - row * 18} width="22" height="16" rx="1.5" fill={colors[(row * 5 + col * 7) % colors.length]} opacity={col + row < 10 ? 1 : 0} />
        )),
      )}
      <rect x="258" y="-60" width="30" height="54" fill="#e7ecf6" />
      <rect x="264" y="-52" width="18" height="6" fill="#f2a93b" />
      <rect x="270" y="-78" width="8" height="18" fill="#5eead4" />
    </g>
  );
}

export function Container({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 240 110" className="ctg-container-svg" aria-hidden="true">
      <rect x="2" y="2" width="236" height="106" rx="4" fill={color} />
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} x={12 + i * 17.5} y="10" width="7" height="90" fill="#000" opacity="0.13" />
      ))}
      <rect x="2" y="2" width="236" height="8" fill="#000" opacity="0.18" />
      <rect x="2" y="100" width="236" height="8" fill="#000" opacity="0.25" />
      <text x="14" y="98" fill="#090d16" opacity="0.7" fontSize="11" fontFamily="monospace">{label}</text>
    </svg>
  );
}

export function Deg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 300" className={className} aria-hidden="true">
      <g className="ctg-steam" stroke="#f2a93b" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M110 90 q-20 -25 0 -50 q20 -25 0 -50" />
        <path d="M160 85 q-20 -25 0 -50 q20 -25 0 -50" />
        <path d="M210 90 q-20 -25 0 -50 q20 -25 0 -50" />
      </g>
      <ellipse cx="160" cy="112" rx="130" ry="22" fill="#4a3a22" />
      <ellipse cx="160" cy="108" rx="118" ry="16" fill="#8a5a20" />
      <ellipse cx="160" cy="106" rx="100" ry="10" fill="#f2a93b" />
      <path d="M30 112 Q30 270 160 276 Q290 270 290 112 Z" fill="#4a3a22" />
      <path d="M44 130 Q50 250 160 258 Q270 250 276 130" fill="none" stroke="#8d97ae" strokeWidth="6" />
      <rect x="10" y="118" width="34" height="14" rx="6" fill="#8d97ae" />
      <rect x="276" y="118" width="34" height="14" rx="6" fill="#8d97ae" />
      <path d="M40 276 Q160 300 280 276" stroke="#f2a93b" strokeWidth="10" strokeLinecap="round" fill="none" className="ctg-fire" />
    </svg>
  );
}

export function Beach({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ctgDusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#090d16" />
          <stop offset="0.6" stopColor="#12343a" />
          <stop offset="1" stopColor="#f2a93b" />
        </linearGradient>
      </defs>
      <rect width="1600" height="420" fill="url(#ctgDusk)" />
      <circle cx="800" cy="300" r="90" fill="#f2a93b" opacity="0.9" />
      <rect y="290" width="1600" height="130" fill="#121a2c" />
      <g stroke="#5eead4" strokeOpacity="0.5" strokeWidth="3">
        <line x1="680" y1="310" x2="920" y2="310" />
        <line x1="720" y1="330" x2="880" y2="330" />
        <line x1="760" y1="350" x2="840" y2="350" />
      </g>
      <path d="M0 380 C300 350 600 400 900 372 C1200 346 1400 390 1600 370 L1600 420 L0 420Z" fill="#f2a93b" opacity="0.85" />
      <path d="M0 400 C400 380 900 420 1600 395 L1600 420 L0 420Z" fill="#4a3a22" />
      <g fill="#090d16">
        <path d="M1260 300 l60 -6 l12 -60 l8 60 l40 6 z" />
        <path d="M200 320 Q260 336 320 320 Q260 328 200 320Z" />
      </g>
    </svg>
  );
}

export function RainTree({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 220" className={className} aria-hidden="true">
      <path d="M150 220 L150 120 M150 150 L110 110 M150 140 L195 100" stroke="#4a3a22" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="150" cy="80" rx="140" ry="60" fill="#12343a" />
      <ellipse cx="100" cy="70" rx="70" ry="40" fill="#2e8a7b" />
      <ellipse cx="200" cy="64" rx="70" ry="38" fill="#1a4a42" />
    </svg>
  );
}

type IconProps = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IndustryIcons: Record<string, (p: IconProps) => React.ReactElement> = {
  school: ({ className }) => (
    <svg viewBox="0 0 64 64" className={className} {...stroke}><path d="M8 26 L32 12 L56 26 L32 40 Z" /><path d="M18 32 V46 Q32 54 46 46 V32" /><path d="M56 26 V42" /><circle cx="56" cy="45" r="2.5" fill="currentColor" /></svg>
  ),
  shipping: ({ className }) => (
    <svg viewBox="0 0 64 64" className={className} {...stroke}><path d="M6 40 H58 L52 50 H12 Z" /><rect x="14" y="28" width="10" height="12" /><rect x="26" y="28" width="10" height="12" /><rect x="38" y="28" width="10" height="12" /><rect x="26" y="16" width="10" height="12" /><path d="M4 56 q7 -4 14 0 t14 0 t14 0 t14 0" /></svg>
  ),
  clinic: ({ className }) => (
    <svg viewBox="0 0 64 64" className={className} {...stroke}><rect x="10" y="14" width="44" height="40" rx="6" /><path d="M32 24 V44 M22 34 H42" /><path d="M24 14 V8 H40 V14" /></svg>
  ),
  shop: ({ className }) => (
    <svg viewBox="0 0 64 64" className={className} {...stroke}><path d="M8 22 L14 10 H50 L56 22" /><path d="M8 22 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" /><path d="M12 28 V54 H52 V28" /><rect x="26" y="38" width="12" height="16" /></svg>
  ),
};
