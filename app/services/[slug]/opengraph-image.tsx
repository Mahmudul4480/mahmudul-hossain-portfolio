import { ImageResponse } from "next/og";
import { getServiceBySlug, services } from "@/data/services";
import { siteConfig } from "@/data/site";

export const runtime = "edge";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default function ServiceOgImage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  const title = service?.name ?? "Services";
  const subtitle = service?.shortDescription ?? siteConfig.title;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "64px 72px",
        background: "linear-gradient(160deg, #090D16 0%, #121a2c 55%, #0E1424 100%)",
        color: "#E7ECF6",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 22, color: "#5EEAD4", marginBottom: 16, fontWeight: 600 }}>
        {siteConfig.name} · Services
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          maxWidth: 980,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 26,
          color: "#8D97AE",
          maxWidth: 900,
          lineHeight: 1.45,
        }}
      >
        {subtitle}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
