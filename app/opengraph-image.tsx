import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#090D16",
          color: "#F4F7FB",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#122033",
              color: "#5EEAD4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              marginRight: 20,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 32, color: "#5EEAD4" }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            {siteConfig.title}
          </div>
          <div style={{ fontSize: 28, color: "#9FB0C3", marginTop: 24 }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ fontSize: 24, color: "#7D8FA3" }}>www.mahmudulhossain.com</div>
      </div>
    ),
    { ...size },
  );
}
