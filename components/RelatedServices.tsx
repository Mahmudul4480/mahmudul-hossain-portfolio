import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceCard from "./ServiceCard";

interface RelatedServicesProps {
  services: Service[];
}

export default function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <section className="related-block">
      <h2>Related services</h2>
      <div className="cap-grid related-grid">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
      <p className="related-all">
        <Link href="/services">Browse all services →</Link>
      </p>
    </section>
  );
}
