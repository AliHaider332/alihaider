/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaRegFileCode } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import { FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';

import type { Project } from '@/data/projects';

interface ProjectDetailProps {
  project: Project | null;
  section: string;
}

const SWIPE_THRESHOLD = 50;

const ProjectDetail = ({ project, section }: ProjectDetailProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const totalImages = project?.image.length ?? 0;
  const initialIndex = useMemo(() => {
    const raw = Number(searchParams.get('img') ?? '0');
    if (Number.isNaN(raw) || raw < 0 || raw >= totalImages) return 0;
    return raw;
  }, [searchParams, totalImages]);

  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  // Keep local state in sync if user navigates via browser back/forward
  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  // Update URL when the active image changes (replace, don't push)
  useEffect(() => {
    if (!project) return;
    const params = new URLSearchParams(searchParams.toString());
    if (current === 0) params.delete('img');
    else params.set('img', String(current));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(((index % totalImages) + totalImages) % totalImages);
      setIsLoaded(false);
    },
    [current, totalImages],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!project || totalImages <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Don't hijack typing
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, project, totalImages]);

  // Preload neighbors for buttery navigation
  useEffect(() => {
    if (!project || totalImages <= 1) return;
    const neighbors = [
      (current + 1) % totalImages,
      (current - 1 + totalImages) % totalImages,
    ];
    neighbors.forEach((idx) => {
      const img = new window.Image();
      img.src = project.image[idx];
    });
  }, [current, project, totalImages]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="font-roboto-slab text-lg text-(--color-text-secondary)">
          No project found.
        </p>
        <Link
          href="/projects"
          className="font-roboto-slab rounded-lg bg-(--color-primary) px-5 py-2 text-white transition-colors hover:bg-(--color-primary-dark)"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const hasGallery = totalImages > 1;
  const slideVariants = {
    enter: (dir: 1 | -1) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <article className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 py-8 sm:px-6 lg:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="font-roboto-slab flex items-center gap-2 text-sm text-(--color-text-muted)"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1 transition-colors hover:text-(--color-primary)"
        >
          <FiArrowLeft aria-hidden /> Projects
        </Link>
        <span aria-hidden>/</span>
        <span className="capitalize">{section}</span>
        <span aria-hidden>/</span>
        <span className="truncate text-(--color-text-secondary)">{project.title}</span>
      </nav>

      {/* Title */}
      <header className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-caprasimo bg-gradient-to-r from-(--color-text-primary) to-(--color-primary)
                     bg-clip-text py-2 text-4xl font-bold text-transparent
                     dark:from-white dark:to-(--color-primary-light)
                     sm:text-5xl md:text-6xl"
        >
          {project.title}
        </motion.h1>
        {project.featured && (
          <span className="font-roboto-slab mt-2 inline-block rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            ⭐ Featured
          </span>
        )}
      </header>

      <div className="font-roboto-slab flex flex-col items-start gap-10 lg:flex-row lg:gap-12 xl:gap-20">
        {/* ---------- Gallery ---------- */}
        <section
          aria-roledescription="carousel"
          aria-label={`${project.title} screenshots`}
          className="group w-full lg:w-[60%] xl:w-[55%]"
        >
          <div
            ref={regionRef}
            tabIndex={hasGallery ? 0 : -1}
            onTouchStart={hasGallery ? onTouchStart : undefined}
            onTouchEnd={hasGallery ? onTouchEnd : undefined}
            className="relative mx-auto flex w-full select-none items-center justify-center
                       overflow-hidden rounded-2xl bg-(--color-background-secondary) shadow-2xl
                       outline-none ring-orange-500/40 focus-visible:ring-2"
            style={{ aspectRatio: '16 / 10' }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={project.image[current]}
                  alt={`${project.title} — screenshot ${current + 1} of ${totalImages}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={current === 0}
                  onLoad={() => setIsLoaded(true)}
                  className={`object-contain transition-opacity duration-300 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!isLoaded && (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-border) border-t-orange-500" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {hasGallery && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full
                             bg-gray-900/60 p-3 text-white opacity-0 backdrop-blur-sm
                             transition-all duration-300 hover:scale-110 hover:bg-gray-900/80
                             focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-orange-400 group-hover:opacity-100 md:left-4"
                >
                  <FiChevronLeft size={22} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full
                             bg-gray-900/60 p-3 text-white opacity-0 backdrop-blur-sm
                             transition-all duration-300 hover:scale-110 hover:bg-gray-900/80
                             focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-orange-400 group-hover:opacity-100 md:right-4"
                >
                  <FiChevronRight size={22} aria-hidden />
                </button>

                {/* Counter */}
                <div
                  aria-live="polite"
                  className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {current + 1} / {totalImages}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {hasGallery && (
            <div
              role="tablist"
              aria-label="Choose screenshot"
              className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2
                         [scrollbar-width:thin]"
            >
              {project.image.map((src, index) => {
                const active = index === current;
                return (
                  <button
                    key={src + index}
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show screenshot ${index + 1}`}
                    onClick={() => goTo(index)}
                    className={`relative h-16 w-24 flex-shrink-0 snap-start overflow-hidden rounded-lg
                               border-2 transition-all duration-200
                               ${
                                 active
                                   ? 'border-orange-500 shadow-lg shadow-orange-500/30'
                                   : 'border-transparent opacity-60 hover:opacity-100'
                               }
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* ---------- Info ---------- */}
        <section className="flex w-full flex-col gap-6 lg:w-[40%] xl:w-[45%]">
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-(--color-border)
                           bg-(--color-background) px-4 py-2 text-sm font-medium text-orange-600
                           shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
                           dark:text-orange-400"
              >
                Live Demo <IoIosLink aria-hidden />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-(--color-border)
                           bg-(--color-background) px-4 py-2 text-sm font-medium text-orange-600
                           shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
                           dark:text-orange-400"
              >
                Source Code <FaRegFileCode aria-hidden />
              </a>
            )}
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-caprasimo mb-2 text-xl font-semibold text-(--color-text-primary) dark:text-(--color-primary-light)">
              Overview
            </h2>
            <p className="text-[15px] leading-relaxed text-(--color-text-secondary) sm:text-base">
              {project.summary}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="font-caprasimo mb-2 text-xl font-semibold text-(--color-text-primary) dark:text-(--color-primary-light)">
              Tech Stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-(--color-border) bg-(--color-background-secondary)
                             px-3 py-1 text-xs font-medium text-(--color-text-secondary)"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h2 className="font-caprasimo mb-2 text-xl font-semibold text-(--color-text-primary) dark:text-(--color-primary-light)">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700
                             dark:bg-orange-900/40 dark:text-orange-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      
    </article>
  );
};

export default ProjectDetail;