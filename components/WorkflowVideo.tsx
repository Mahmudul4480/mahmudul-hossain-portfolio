import { siteConfig } from "@/data/site";
import Reveal from "./Reveal";

export default function WorkflowVideo() {
  return (
    <section className="section" id="workflow">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Watch it happen</p>
            <h2>Workflow showcase</h2>
          </div>
        </Reveal>

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
