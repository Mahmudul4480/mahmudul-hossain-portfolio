import { Caveat } from "next/font/google";
import Link from "next/link";
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
import SquareWipe from "@/components/home/SquareWipe";

const script = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
  display: "swap",
});

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
