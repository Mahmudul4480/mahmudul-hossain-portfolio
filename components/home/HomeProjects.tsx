import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { sectionImages } from "@/data/section-images";
import { services } from "@/data/services";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function HomeProjects() {
  const seeAll = "See all";

  return (
    <section className="h-work" id="work" data-tone="dark" data-hscroll>
      <div className="h-work-stage">
        <div className="h-work-head">
          <p className="h-eyebrow h-eyebrow-light">Shipped, not mocked up</p>
          <h2 className="h-display h-display-work">Projects</h2>
          <p className="h-sticky-copy h-on-dark">
            Five platforms I designed, built and deployed solo — from schema to UI to launch.
          </p>
          <Image
            src={sectionImages.projects}
            alt="Mahmudul Hossain presenting production SaaS projects"
            width={640}
            height={420}
            className="h-side-photo h-work-photo"
            sizes="280px"
          />
        </div>
        <div className="h-work-track" data-hscroll-track>
          {projects.map((project) => (
            <article key={project.slug} className="h-pcard">
              <div className="h-pcard-visual">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? project.title}
                    width={960}
                    height={600}
                    sizes="(max-width: 767px) 86vw, 640px"
                  />
                ) : (
                  <span className="h-pcard-fallback">{project.monoTag}</span>
                )}
              </div>
              <p className="h-pcard-kicker">{project.kicker}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="h-pcard-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {project.isPrivate || !project.liveUrl ? (
                <span className="h-pcard-link is-disabled">Private build — demo on request</span>
              ) : (
                <a
                  className="h-pcard-link"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site <ExternalIcon />
                </a>
              )}
            </article>
          ))}
          <Link href="/services" className="h-seeall">
            <span className="h-seeall-kicker">Services</span>
            <span className="h-seeall-title" aria-label={`See all ${services.length} services`}>
              {seeAll.split("").map((letter, index) => (
                <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 40}ms` }}>
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
            <span className="h-seeall-count">({services.length})</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
