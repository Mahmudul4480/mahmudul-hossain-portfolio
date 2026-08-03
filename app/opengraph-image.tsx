import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#090D16",
            border: "2px solid #5EEAD4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5EEAD4",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          M
        </div>
        <div style={{ fontSize: 22, color: "#8D97AE" }}>mahmudul()</div>
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          maxWidth: 980,
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          marginTop: 20,
          fontSize: 34,
          color: "#5EEAD4",
          fontWeight: 600,
        }}
      >
        {siteConfig.title}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 24,
          color: "#8D97AE",
          maxWidth: 900,
          lineHeight: 1.45,
        }}
      >
        Secure multi-tenant SaaS platforms — 100% technical ownership, solo-built.
      </div>
    </div>,
    { ...size },
  );
}
