import { projects } from "@/data/projects";
import { sectionImages } from "@/data/section-images";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionVisual from "./SectionVisual";

export default function ProjectsGrid() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionVisual
          imageSrc={sectionImages.projects}
          imageAlt="Mahmudul Hossain presenting production SaaS projects"
          imagePosition="right"
        >
          <p className="eyebrow">Shipped, not mocked up</p>
          <h2>Production projects</h2>
          <p className="section-visual-lede">
            Five platforms I designed, built and deployed solo — from schema to UI to launch.
          </p>
        </SectionVisual>

        <Reveal className="proj-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
