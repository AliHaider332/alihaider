// components/Experience/Experience.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiArrowUpRight,
  FiCode,
} from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Role {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: "freelance" | "internship";
  summary: string;
  highlights: string[];
  stack: string[];
  link?: { href: string; label: string };
}

const experience: Role[] = [
  {
    id: "freelance-2026",
    period: "2026 — Present",
    role: "Freelance Full-Stack Developer",
    company: "Client Projects",
    location: "Remote",
    type: "freelance",
    summary:
      "Third-party contractor delivering full-stack production websites end-to-end from requirements gathering and architecture through deployment and handoff.",
    highlights: [
      "Shipped a complete production website for an aviation and flight-training client, owning both the Next.js frontend and Node.js backend from kickoff to launch.",
      "Structured the site around training programs, fleet information, instructors, and FAQs based directly on client requirements.",
      "Implemented technical and on-page SEO to improve crawlability and search-engine indexing.",
      "Integrated Nodemailer for automated contact-form handling and built a custom admin panel for content and site management.",
      "Currently developing additional client projects.",
    ],
    stack: ["Next.js", "React", "Node.js", "Nodemailer", "SEO"],
  },
  {
    id: "vector-coder",
    period: "Internship",
    role: "Web Development Intern",
    company: "Vector Coder",
    location: "Faisalabad",
    type: "internship",
    summary:
      "Converted Figma designs into production-ready React applications while building a portfolio of small apps across e-commerce, weather, and AI-assisted interfaces.",
    highlights: [
      "Translated Figma designs into responsive React applications using reusable, modular components.",
      "Built an e-commerce app with product listings, cart, and checkout UI; a weather app using geolocation APIs; and an AI chatbot powered by Google Generative AI.",
      "Used Git and GitHub for version control and collaborative development workflows.",
    ],
    stack: ["React", "JavaScript", "REST APIs", "Google Generative AI", "Git"],
  },
];

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ------------------------------------------------------------------ */
/*  Type badge                                                         */
/* ------------------------------------------------------------------ */

const TYPE_LABEL: Record<Role["type"], string> = {
  freelance: "Freelance",
  internship: "Internship",
};

/* ------------------------------------------------------------------ */
/*  Single entry                                                       */
/* ------------------------------------------------------------------ */

function ExperienceEntry({ role, index }: { role: Role; index: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      variants={fadeUp}
      className="relative grid grid-cols-1 gap-6 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10"
    >
      {/* Left rail — period + type */}
      <div className="flex flex-col gap-3 md:pt-1">
        <span className="font-roboto-slab inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-(--color-text-muted)">
          <FiCalendar aria-hidden size={12} />
          {role.period}
        </span>

        <span
          className={`font-roboto-slab inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${
            role.type === "freelance"
              ? "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400"
              : "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400"
          }`}
        >
          {TYPE_LABEL[role.type]}
        </span>

        <span className="font-roboto-slab hidden items-center gap-1.5 text-xs text-(--color-text-muted) md:inline-flex">
          <FiMapPin aria-hidden size={12} />
          {role.location}
        </span>
      </div>

      {/* Right content */}
      <div className="relative pb-12 md:pb-16">
        {/* Vertical timeline line (except on last item) */}
        {index < experience.length - 1 && (
          <span
            aria-hidden
            className="absolute left-[-24px] top-2 hidden h-[calc(100%+1.5rem)] w-px
                       bg-gradient-to-b from-(--color-border) via-(--color-border) to-transparent
                       md:block"
          />
        )}

        {/* Dot on the timeline */}
        <span
          aria-hidden
          className="absolute left-[-29px] top-2 hidden h-2.5 w-2.5 rounded-full
                     border-2 border-(--color-background) bg-orange-500
                     shadow-[0_0_0_4px_rgba(249,115,22,0.15)] md:block"
        />

        {/* Header */}
        <header className="mb-4">
          <h3 className="font-caprasimo text-2xl font-bold leading-tight text-(--color-text-primary) sm:text-[28px]">
            {role.role}
          </h3>
          <p className="font-roboto-slab mt-1 flex flex-wrap items-baseline gap-x-2 text-sm text-(--color-text-secondary)">
            <span className="font-semibold text-(--color-text-primary)">
              {role.company}
            </span>
            <span aria-hidden className="text-(--color-text-muted)">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 md:hidden">
              <FiMapPin aria-hidden size={12} />
              {role.location}
            </span>
            <span className="hidden md:inline text-(--color-text-muted)">
              {role.location}
            </span>
          </p>
        </header>

        {/* Summary */}
        <p className="font-roboto-slab max-w-2xl text-[15px] leading-relaxed text-(--color-text-secondary)">
          {role.summary}
        </p>

        {/* Highlights */}
        <ul className="font-roboto-slab mt-5 space-y-2.5">
          {role.highlights.map((item, i) => (
            <motion.li
              key={i}
              initial={prefersReduced ? undefined : { opacity: 0, x: -8 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.4,
                delay: 0.05 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex gap-3 text-[14px] leading-relaxed text-(--color-text-secondary)"
            >
              <span
                aria-hidden
                className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-orange-500"
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Stack chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {role.stack.map((tech) => (
            <span
              key={tech}
              className="font-roboto-slab rounded-md border border-(--color-border)
                         bg-(--color-background-secondary) px-2 py-0.5
                         text-[11px] font-medium text-(--color-text-secondary)"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="experience">
      {" "}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="mx-auto flex w-full max-w-7xl flex-col gap-14 overflow-x-clip
                 px-4 py-16 sm:px-6 md:gap-20 md:py-24 lg:px-8"
      >
        {/* ---------- Header ---------- */}
        <motion.header variants={fadeUp} className="max-w-3xl">
          <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
            Experience
          </span>
          <h1 className="font-caprasimo mt-2 bg-gradient-to-r from-(--color-text-primary) to-(--color-primary) bg-clip-text text-4xl font-bold leading-[1.05] text-transparent dark:from-white dark:to-(--color-primary-light) sm:text-5xl md:text-6xl">
            Where I&apos;ve shipped real work.
          </h1>
          <p className="font-roboto-slab mt-4 max-w-2xl text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
            Freelance and internship experience building production applications
            end-to-end from requirements to deployment.
          </p>
        </motion.header>

        {/* ---------- Timeline ---------- */}
        <section
          aria-label="Work experience"
          className="relative flex flex-col"
        >
          {experience.map((role, i) => (
            <ExperienceEntry key={role.id} role={role} index={i} />
          ))}
        </section>
      </motion.div>
    </section>
  );
};

export default Experience;
