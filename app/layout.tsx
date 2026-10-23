import type { Metadata, Viewport } from "next";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { fontVariables, inter, jetbrainsMono, spaceGrotesk } from "@/lib/fonts";
import "./globals.css";
import "./home.css";

const siteUrl = siteConfig.url;
const defaultTitle = siteConfig.seoTitle;

// The env var may hold the full <meta> tag pasted from Search Console; keep only the token.
function verificationToken(raw: string | undefined, fallback?: string) {
  if (!raw) return fallback;
  const match = raw.match(/content=["']([^"']+)["']/);
  return (match ? match[1] : raw).trim() || fallback;
}

const googleVerification = verificationToken(
  process.env.GOOGLE_SITE_VERIFICATION,
  "8cO67QbCqHube5qUnPp7F1lYB20GSPndA2EB04PBVr8",
);
const bingVerification = verificationToken(process.env.BING_SITE_VERIFICATION);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: defaultTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@Mahmudul4480",
    creator: "@Mahmudul4480",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-C8JB2JC41C";
const isProd = process.env.NODE_ENV === "production";

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} ${inter.className}`} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <JsonLd />
        {children}
        {isProd && gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
