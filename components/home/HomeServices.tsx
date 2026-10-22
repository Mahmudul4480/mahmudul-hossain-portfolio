import Link from "next/link";
import { services } from "@/data/services";

export default function HomeServices() {
  return (
    <section className="h-services" id="services-preview" data-tone="light">
      <div className="h-split">
        <div className="h-sticky">
          <p className="h-eyebrow">Beyond code</p>
          <h2 className="h-display">Services</h2>
          <p className="h-sticky-copy">
            Development is the foundation — but launch also needs marketing, creative, and
            infrastructure. I handle the full stack solo.
          </p>
          <p className="h-sticky-note">What you can hire me for</p>
          <Link href="/services" className="btn h-btn-dark">
            View all services
          </Link>
        </div>
        <ol className="h-svc-list">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="h-svc">
                <span className="h-svc-no">{String(index + 1).padStart(2, "0")}</span>
                <span className="h-svc-body">
                  <span className="h-svc-top">
                    <strong>{service.name}</strong>
                    <em>{service.startingPrice}</em>
                  </span>
                  <span>{service.shortDescription}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
