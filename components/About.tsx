import { siteConfig } from "@/data/site";
import { sectionImages } from "@/data/section-images";
import SectionVisual from "./SectionVisual";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionVisual
          imageSrc={sectionImages.about}
          imageAlt="Mahmudul Hossain, independent full-stack engineer and SaaS architect"
          imagePosition="right"
        >
          <p className="eyebrow">About</p>
          <h2>Solo by choice, not by limitation</h2>
          <p className="section-visual-lede">
            I&apos;m <strong>{siteConfig.name}</strong>, an independent full-stack engineer and SaaS
            architect. I don&apos;t run an agency, and I don&apos;t outsource — every line of code
            across every project above was written by me.
          </p>
          <p>
            That means no handoffs between a designer, a backend developer and a project manager who
            has never opened the codebase. You brief one person, and that person owns the
            architecture, the database security, and the pixel-perfect frontend, from the first
            migration to the production deploy.
          </p>
          <p>
            I&apos;m looking to become a reliable, long-term technical partner — not a one-off
            contractor. If that sounds like what your project needs, let&apos;s talk.
          </p>

          <div className="about-stats">
            <div>
              <div className="n">100%</div>
              <div className="l">Self-written code</div>
            </div>
            <div>
              <div className="n">2x</div>
              <div className="l">Build speed, AI-native</div>
            </div>
            <div>
              <div className="n">5</div>
              <div className="l">Production SaaS platforms</div>
            </div>
          </div>
        </SectionVisual>
      </div>
    </section>
  );
}
