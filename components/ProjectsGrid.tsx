import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function ProjectsGrid() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Shipped, not mocked up</p>
            <h2>Production projects</h2>
          </div>
          <p>Five platforms I designed, built and deployed solo — from schema to UI to launch.</p>
        </Reveal>

        <Reveal className="proj-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
