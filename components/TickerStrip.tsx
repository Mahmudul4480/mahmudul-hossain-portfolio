import { siteConfig } from "@/data/site";

export default function TickerStrip() {
  const items = [...siteConfig.tickerItems, ...siteConfig.tickerItems];

  return (
    <div className="ticker-section">
      <p className="ticker-label">In production right now</p>
      <div className="ticker-track" aria-hidden="true">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
