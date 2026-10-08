import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionVisualProps {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  children: ReactNode;
  className?: string;
  priority?: boolean;
}

export default function SectionVisual({
  imageSrc,
  imageAlt,
  imagePosition = "right",
  children,
  className = "",
  priority = false,
}: SectionVisualProps) {
  const isRight = imagePosition === "right";

  return (
    <div
      className={`section-visual ${isRight ? "section-visual--image-right" : "section-visual--image-left"} ${className}`.trim()}
    >
      <Reveal className={`section-visual-copy ${isRight ? "section-visual-copy-first" : "section-visual-copy-second"}`}>
        {children}
      </Reveal>

      <Reveal className={`section-visual-media ${isRight ? "section-visual-media-second" : "section-visual-media-first"}`}>
        <div className="section-visual-frame">
          <div className="section-visual-glow" aria-hidden="true" />
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={960}
            height={720}
            className="section-visual-image"
            sizes="(max-width: 960px) 100vw, 46vw"
            priority={priority}
          />
        </div>
      </Reveal>
    </div>
  );
}
