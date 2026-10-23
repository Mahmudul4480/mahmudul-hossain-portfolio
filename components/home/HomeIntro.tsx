import { siteConfig } from "@/data/site";

export default function HomeIntro() {
  const items = [...siteConfig.tickerItems, ...siteConfig.tickerItems];

  return (
    <section className="h-intro" data-tone="light">
      <div className="h-intro-copy">
        <p className="h-eyebrow">In production right now</p>
        <p className="h-statement">
          Five platforms I designed, built, and deployed solo — from schema to interface to launch.
        </p>
        <p className="h-intro-script">
          <span className="h-script">A short introduction</span>
          <svg viewBox="0 0 64 48" className="h-wipe-arrow" aria-hidden="true">
            <path d="M32 4c2 10 1 18-2 28" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M22 24c4 4 8 8 10 12 2-6 6-10 12-14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </p>
      </div>
      <div className="h-ticker" aria-hidden="true">
        <div className="h-ticker-track">
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
      <p className="sr-only">{siteConfig.tickerItems.join(". ")}</p>
    </section>
  );
}
