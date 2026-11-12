import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import BlogPreview from "@/components/BlogPreview";
import WorkflowVideo from "@/components/WorkflowVideo";
import FluidBackground from "@/components/home/FluidBackground";
import HomeAbout from "@/components/home/HomeAbout";
import HomeContact from "@/components/home/HomeContact";
import HomeExperience from "@/components/home/HomeExperience";
import HomeFaq from "@/components/home/HomeFaq";
import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeMotion from "@/components/home/HomeMotion";
import HomeNav from "@/components/home/HomeNav";
import HomeProjects from "@/components/home/HomeProjects";
import HomeServices from "@/components/home/HomeServices";
import HomeSkills from "@/components/home/HomeSkills";
import HomeUrgent from "@/components/home/HomeUrgent";
import SquareWipe from "@/components/home/SquareWipe";

const script = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: siteConfig.seoTitle },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seoTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@Mahmudul4480",
    creator: "@Mahmudul4480",
    title: siteConfig.seoTitle,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <div className={`home-root ${script.variable}`}>
      <Link href="#main" className="skip-link">
        Skip to content
      </Link>
      <FluidBackground />
      <HomeNav />
      <HomeMotion />
      <main id="main">
        <HomeHero />
        <HomeIntro />
        <HomeAbout />
        <HomeUrgent />
        <HomeServices />
        <SquareWipe kicker="The stack" />
        <HomeSkills />
        <HomeExperience />
        <SquareWipe kicker="Selected work" />
        <HomeProjects />
        <BlogPreview />
        <WorkflowVideo />
        <HomeFaq />
        <HomeContact />
      </main>
    </div>
  );
}
