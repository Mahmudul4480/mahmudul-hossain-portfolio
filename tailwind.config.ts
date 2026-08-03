import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#090D16",
        "bg-soft": "#0E1424",
        panel: "#121a2c",
        "panel-2": "#161f34",
        line: "#232d47",
        text: "#E7ECF6",
        "text-dim": "#8D97AE",
        "text-faint": "#5C6680",
        cyan: "#5EEAD4",
        "cyan-dim": "#2E8A7B",
        amber: "#F2A93B",
        "amber-soft": "#4a3a22",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "14px",
      },
      maxWidth: {
        wrap: "1180px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(.16,.8,.24,1)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        heroFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        heroGlow: {
          "0%, 100%": { opacity: "0.75", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        chipGlow: {
          "0%, 100%": {
            boxShadow:
              "0 10px 36px rgba(0,0,0,.38), 0 0 22px rgba(94,234,212,.14), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -1px 0 rgba(255,255,255,.08)",
          },
          "50%": {
            boxShadow:
              "0 12px 40px rgba(0,0,0,.4), 0 0 36px rgba(94,234,212,.28), 0 0 18px rgba(255,255,255,.12), inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(255,255,255,.1)",
          },
        },
        chipShine: {
          "0%, 100%": { opacity: "0", transform: "rotate(18deg) translateX(-120%)" },
          "45%, 55%": { opacity: "1" },
          "100%": { opacity: "0", transform: "rotate(18deg) translateX(220%)" },
        },
        techDrift1: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(6px,-10px) rotate(3deg)" },
        },
        techDrift2: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(-8px,-8px) rotate(-4deg)" },
        },
        techDrift3: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(8px,6px) rotate(4deg)" },
        },
        techDrift4: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(-6px,8px) rotate(-3deg)" },
        },
        techDrift5: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(7px,-7px) rotate(2deg)" },
        },
        techDrift6: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(-7px,-6px) rotate(-2deg)" },
        },
        techDrift7: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(5px,9px) rotate(3deg)" },
        },
        techDrift8: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(-5px,7px) rotate(-3deg)" },
        },
        techDrift9: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(0,-8px) rotate(2deg)" },
        },
      },
      animation: {
        blink: "blink 1.1s steps(1) infinite",
        scroll: "scroll 32s linear infinite",
        "hero-float": "heroFloat 7s ease-in-out infinite",
        "hero-glow": "heroGlow 8s ease-in-out infinite",
        "chip-glow": "chipGlow 4.5s ease-in-out infinite",
        "chip-shine": "chipShine 5.5s ease-in-out infinite",
        "tech-drift-1": "techDrift1 5.5s ease-in-out infinite",
        "tech-drift-2": "techDrift2 6.2s ease-in-out infinite",
        "tech-drift-3": "techDrift3 5.8s ease-in-out infinite",
        "tech-drift-4": "techDrift4 6.6s ease-in-out infinite",
        "tech-drift-5": "techDrift5 5.2s ease-in-out infinite",
        "tech-drift-6": "techDrift6 6.4s ease-in-out infinite",
        "tech-drift-7": "techDrift7 5.9s ease-in-out infinite",
        "tech-drift-8": "techDrift8 6.8s ease-in-out infinite",
        "tech-drift-9": "techDrift9 6.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
