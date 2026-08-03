import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceIcon from "./ServiceIcon";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="cap-card service-card">
      <ServiceIcon name={service.icon} />
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      <Link href={`/services/${service.slug}`} className="service-card-link">
        Learn more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </Link>
    </article>
  );
}
