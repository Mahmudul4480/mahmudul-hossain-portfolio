import Link from "next/link";
import { getFeaturedServices } from "@/data/services";
import ServiceCard from "./ServiceCard";
import Reveal from "./Reveal";

export default function ServicesPreview() {
  const featured = getFeaturedServices();

  return (
    <section className="section" id="services-preview">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Beyond code</p>
            <h2>The full growth stack</h2>
          </div>
          <p>
            Development is the foundation — but launch also needs marketing, creative, and
            infrastructure. I handle the full stack solo.
          </p>
        </Reveal>

        <Reveal className="cap-grid">
          {featured.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </Reveal>

        <Reveal className="services-preview-foot">
          <Link href="/services" className="btn btn-ghost">
            View all services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
