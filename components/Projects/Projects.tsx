"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";

import { Web, DESKTOP, Console } from "@/data/projects";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const INITIAL_VISIBLE = 6;

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

interface ProjectSectionProps {
  index: string;
  kicker: string;
  title: string;
  projects: readonly Project[];
  section: string;
  showDivider?: boolean;
}

const ProjectSection = ({
  index,
  kicker,
  title,
  projects,
  section,
  showDivider = true,
}: ProjectSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const hasMore = projects.length > INITIAL_VISIBLE;
  const visible = useMemo(
    () =>
      expanded || !hasMore ? projects : projects.slice(0, INITIAL_VISIBLE),
    [expanded, hasMore, projects],
  );
  const hiddenCount = projects.length - visible.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      aria-labelledby={`section-${section}`}
    >
      {/* Section header */}
      <div className="mb-8 flex flex-col gap-2 sm:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
            {index} — {kicker}
          </span>
          <h2
            id={`section-${section}`}
            className="font-caprasimo mt-1 text-3xl font-bold leading-tight text-(--color-text-primary) sm:text-4xl md:text-[42px]"
          >
            {title}
          </h2>
        </div>

        <span
          className="font-roboto-slab self-start rounded-full border border-(--color-border)
                     bg-(--color-background-secondary) px-3 py-1 text-xs font-medium
                     text-(--color-text-secondary) md:self-auto"
        >
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* Grid */}
      <div
        id={`section-${section}-grid`}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
      >
        <AnimatePresence initial={false}>
          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
                delay: i < INITIAL_VISIBLE ? 0 : (i - INITIAL_VISIBLE) * 0.04,
              }}
            >
              <ProjectCard project={project} section={section} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* See more / See less */}
      {hasMore && (
        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`section-${section}-grid`}
            className="group inline-flex items-center gap-2 rounded-full border
                       border-(--color-border) bg-(--color-background-secondary)
                       px-5 py-2.5 font-roboto-slab text-sm font-medium
                       text-(--color-text-secondary) transition-all duration-300
                       hover:border-orange-400/40 hover:text-(--color-primary)
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-orange-500/60"
          >
            <span>
              {expanded
                ? "Show less"
                : `Show ${hiddenCount} more ${
                    hiddenCount === 1 ? "project" : "projects"
                  }`}
            </span>
            <FiChevronDown
              aria-hidden
              size={16}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      )}

      {/* Divider */}
      {showDivider && (
        <div
          aria-hidden
          className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-(--color-border) to-transparent sm:mt-20"
        />
      )}
    </motion.section>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const Projects = () => {
  const [windowHeight, setWindowHeight] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWindowHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isShortScreen = windowHeight !== null && windowHeight < 700;

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div
        className={`flex flex-col ${
          isShortScreen ? "gap-10 py-10" : "gap-14 py-16 md:gap-20 md:py-24"
        }`}
      >
        {/* ---------- Header ---------- */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
            Selected Work
          </span>
          <h1
            className={`font-caprasimo mt-2 bg-gradient-to-r from-(--color-text-primary) to-(--color-primary)
                        bg-clip-text font-bold leading-[1.05] text-transparent
                        dark:from-white dark:to-(--color-primary-light)
                        ${
                          isShortScreen
                            ? "text-3xl sm:text-4xl"
                            : "text-4xl sm:text-5xl md:text-6xl"
                        }`}
          >
            Things I&apos;ve built and shipped.
          </h1>
          <p
            className={`font-roboto-slab mt-4 max-w-2xl leading-relaxed text-(--color-text-secondary) ${
              isShortScreen ? "text-sm sm:text-base" : "text-base sm:text-lg"
            }`}
          >
            A working collection across web, desktop, and console — each one a
            different challenge, a different stack, and a different lesson.
          </p>
        </motion.header>

        {/* ---------- Sections ---------- */}
        <div className="flex flex-col gap-14 md:gap-20">
          {Web.length > 0 && (
            <ProjectSection
              index="01"
              kicker="Web"
              title="Web Development"
              projects={Web}
              section="web"
            />
          )}

          {DESKTOP.length > 0 && (
            <ProjectSection
              index="02"
              kicker="Desktop"
              title="Desktop Applications"
              projects={DESKTOP}
              section="desktop"
            />
          )}

          {Console.length > 0 && (
            <ProjectSection
              index="03"
              kicker="Console"
              title="Console Applications"
              projects={Console}
              section="console"
              showDivider={false}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
