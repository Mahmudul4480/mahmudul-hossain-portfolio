import { siteConfig } from "@/data/site";
import { sectionImages } from "@/data/section-images";
import Reveal from "./Reveal";
import SectionVisual from "./SectionVisual";

export default function WorkflowVideo() {
  return (
    <section className="section" id="workflow">
      <div className="wrap">
        <SectionVisual
          imageSrc={sectionImages.workflow}
          imageAlt="Mahmudul Hossain demonstrating workflow and deployment process"
          imagePosition="left"
        >
          <p className="eyebrow">Watch it happen</p>
          <h2>Workflow showcase</h2>
          <p className="section-visual-lede">
            A short look at how I write code, connect databases, and deploy secure Next.js
            applications on Vercel and Cloudflare in real time.
          </p>
        </SectionVisual>

        <Reveal className="video-card">
          <div className="video-embed">
            <iframe
              src={siteConfig.loomEmbedUrl}
              title="Workflow walkthrough: writing code and deploying a secure Next.js app"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="video-copy">
            <p className="eyebrow" style={{ marginBottom: 0 }}>
              1-minute walkthrough
            </p>
            <h3>How I write, connect and deploy — live</h3>
            <p>
              A short, unedited look at how I write code, manage database connections, and deploy
              secure Next.js applications on Vercel and Cloudflare in real time.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
