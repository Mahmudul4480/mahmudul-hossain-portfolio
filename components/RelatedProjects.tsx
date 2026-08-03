import Link from "next/link";
import type { Project } from "@/data/projects";

interface RelatedProjectsProps {
  projects: Project[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="related-block">
      <h2>See it in production</h2>
      <p className="related-block-lede">
        Real client work where this service shows up in the final product.
      </p>
      <ul className="related-project-list">
        {projects.map((project) => (
          <li key={project.slug}>
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {project.title} ↗
              </a>
            ) : (
              <span>{project.title}</span>
            )}
            <span className="related-project-kicker">{project.kicker}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
