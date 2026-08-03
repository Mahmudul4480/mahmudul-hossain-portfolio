import Link from "next/link";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TickerStrip from "@/components/TickerStrip";
import Capabilities from "@/components/Capabilities";
import ServicesPreview from "@/components/ServicesPreview";
import VelocityTerminal from "@/components/VelocityTerminal";
import ProjectsGrid from "@/components/ProjectsGrid";
import WorkflowVideo from "@/components/WorkflowVideo";
import BlogPreview from "@/components/BlogPreview";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Link href="#main" className="skip-link">
        Skip to content
      </Link>
      <Nav />
      <main id="main">
        <Hero />
        <TickerStrip />
        <Capabilities />
        <ServicesPreview />
        <VelocityTerminal />
        <ProjectsGrid />
        <BlogPreview />
        <WorkflowVideo />
        <About />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
