'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';

import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  section: string;
  index: number;
}

const SECTION_LABEL: Record<string, string> = {
  web: 'Web',
  desktop: 'Desktop',
  console: 'Console',
};

const ProjectCard = ({ project, section, index }: ProjectCardProps) => {
  const href = `/projects/${section}/${project.id}`;
  const cover = project.image?.[0];
  const label = SECTION_LABEL[section] ?? section;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.36),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <Link
        href={href}
        aria-label={`View ${project.title}`}
        className="block h-full rounded-2xl outline-none
                   focus-visible:ring-2 focus-visible:ring-orange-500/60
                   focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-background)"
      >
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-2xl
                     border border-(--color-border) bg-(--color-background)
                     transition-all duration-500 ease-out
                     group-hover:-translate-y-1
                     group-hover:border-orange-400/40
                     group-hover:shadow-[0_20px_60px_-24px_rgba(249,115,22,0.25)]"
        >
          {/* Cover */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-(--color-background-secondary)">
            {cover ? (
              <Image
                src={cover}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out
                           group-hover:scale-[1.04]"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-(--color-text-muted)">
                <span className="font-roboto-slab text-xs uppercase tracking-widest">
                  No preview
                </span>
              </div>
            )}

            <span
              className="absolute left-3 top-3 z-10 rounded-full border border-(--color-border)
                         bg-(--color-background)/85 px-2.5 py-1 font-roboto-slab text-[10px]
                         font-medium uppercase tracking-[0.14em] text-(--color-text-secondary)
                         backdrop-blur-sm"
            >
              {label}
            </span>

            <span
              aria-hidden
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full
                         border border-(--color-border) bg-(--color-background)/85 text-(--color-text-secondary)
                         backdrop-blur-sm transition-all duration-300
                         group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
            >
              <FiArrowUpRight size={14} />
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3
                className="font-caprasimo text-lg font-bold leading-snug text-(--color-text-primary)
                           transition-colors duration-300 group-hover:text-(--color-primary)
                           sm:text-xl line-clamp-2"
              >
                {project.title}
              </h3>

              {project.featured && (
                <span
                  className="mt-1 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-500
                             px-2 py-0.5 font-roboto-slab text-[10px] font-bold uppercase
                             tracking-wider text-white shadow-sm"
                >
                  Featured
                </span>
              )}
            </div>

            {project.summary && (
              <p className="font-roboto-slab mb-4 line-clamp-2 text-[13px] leading-relaxed text-(--color-text-secondary) sm:line-clamp-3 sm:text-sm">
                {project.summary}
              </p>
            )}

            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-(--color-border) bg-(--color-background-secondary)
                               px-2 py-0.5 font-roboto-slab text-[11px] font-medium
                               text-(--color-text-secondary)"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span
                    className="rounded-md bg-(--color-background-tertiary) px-2 py-0.5
                               font-roboto-slab text-[11px] font-medium text-(--color-text-muted)"
                  >
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between border-t border-(--color-border) pt-4">
              <span
                className="font-roboto-slab text-xs font-medium uppercase tracking-[0.14em]
                           text-(--color-text-muted) transition-colors
                           group-hover:text-(--color-primary)"
              >
                View Project
              </span>

              <div className="flex items-center gap-2">
                {project.github && (
                  <button
                    type="button"
                    onClick={(e) => {
                      // Prevent the parent <Link> from navigating
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.github, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label={`${project.title} source code on GitHub`}
                    className="relative z-10 grid h-8 w-8 place-items-center rounded-lg
                               border border-(--color-border) bg-(--color-background-secondary)
                               text-(--color-text-secondary) transition-colors duration-200
                               hover:border-orange-400/40 hover:text-orange-500
                               focus-visible:outline-none focus-visible:ring-2
                               focus-visible:ring-orange-500/60"
                  >
                    <FiGithub size={14} aria-hidden />
                  </button>
                )}

                {project.link && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.link, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label={`${project.title} live demo`}
                    className="relative z-10 grid h-8 w-8 place-items-center rounded-lg
                               border border-orange-500/30 bg-orange-500/10 text-orange-500
                               transition-colors duration-200 hover:bg-orange-500 hover:text-white
                               focus-visible:outline-none focus-visible:ring-2
                               focus-visible:ring-orange-500/60"
                  >
                    <FiExternalLink size={14} aria-hidden />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;