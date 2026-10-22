import Image from "next/image";
import { sectionImages } from "@/data/section-images";
import { siteConfig } from "@/data/site";

const focus = [
  "High-performance frontend",
  "Robust backend & APIs",
  "Database & security hardening",
  "Advanced integrations",
  "Mobile & web hybrid",
  "AI-native velocity",
];

export default function HomeAbout() {
  return (
    <section className="h-about" id="about" data-tone="light">
      <div className="h-expand-wrap">
        <div className="h-expand" data-expand>
          <Image
            src={sectionImages.about}
            alt="Mahmudul Hossain, independent full-stack engineer and SaaS architect"
            width={1600}
            height={1066}
            className="h-expand-img"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="h-split h-about-grid">
        <div>
          <p className="h-eyebrow">About</p>
          <h2 className="h-display h-display-sm">
            Solo by choice, <span className="h-script">not</span> by limitation
          </h2>
          <div className="h-prose">
            <p>
              I&apos;m <strong>{siteConfig.name}</strong>, an independent full-stack engineer and
              SaaS architect. I don&apos;t run an agency, and I don&apos;t outsource — every line of
              code across every project above was written by me.
            </p>
            <p>
              That means no handoffs between a designer, a backend developer and a project manager
              who has never opened the codebase. You brief one person, and that person owns the
              architecture, the database security, and the pixel-perfect frontend, from the first
              migration to the production deploy.
            </p>
            <p>
              I&apos;m looking to become a reliable, long-term technical partner — not a one-off
              contractor. If that sounds like what your project needs, let&apos;s talk.
            </p>
          </div>
          <dl className="h-stats">
            <div>
              <dt>Self-written code</dt>
              <dd>100%</dd>
            </div>
            <div>
              <dt>Build speed, AI-native</dt>
              <dd>2x</dd>
            </div>
            <div>
              <dt>Production SaaS platforms</dt>
              <dd>5</dd>
            </div>
          </dl>
        </div>
        <div className="h-focus">
          <p className="h-eyebrow">What I focus on</p>
          <ol>
            {focus.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <a href="#stack">{item}</a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
