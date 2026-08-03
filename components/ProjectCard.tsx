import Image from "next/image";
import type { Project } from "@/data/projects";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={`proj-card${project.fullWidth ? " full-width" : ""}`}>
      <div className="browser-chrome">
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
        <div className="url">{project.browserUrl}</div>
      </div>

      <div className="proj-visual">
        {project.image ? (
          <>
            <Image
              className="proj-image"
              src={project.image}
              alt={project.imageAlt ?? project.title}
              width={580}
              height={190}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            <div className="shot-fade" />
          </>
        ) : (
          <span className="mono-tag">{project.monoTag}</span>
        )}
      </div>

      <div className="proj-body">
        <p className="proj-kicker">{project.kicker}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="proj-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.isPrivate ? (
          <span className="proj-link disabled">Private build — demo on request</span>
        ) : (
          <a className="proj-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Visit live site <ExternalIcon />
          </a>
        )}
      </div>
    </article>
  );
}
