"use client";

import { useRef, useMemo } from "react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
  FaBootstrap,
  FaAws,
  FaLinux,
  FaCss3Alt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiCplusplus,
  SiCloudinary,
  SiSocketdotio,
  SiFastapi,
  SiAngular,
  SiNextdotjs,
  SiRedis,
  SiDocker,
  SiGithub,
} from "react-icons/si";
import { AiFillOpenAI } from "react-icons/ai";
import { TbBrandOpenai } from "react-icons/tb";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Icons — two rows, scroll in opposite directions                    */
/* ------------------------------------------------------------------ */

const rowOneIcons = [
  { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-(--color-text-primary)" />,
  },
  { name: "Angular", icon: <SiAngular className="text-red-600" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500" /> },
  { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  {
    name: "Express",
    icon: <SiExpress className="text-(--color-text-primary)" />,
  },
  { name: "FastAPI", icon: <SiFastapi className="text-teal-500" /> },
];

const rowTwoIcons = [
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600" /> },
  { name: "Redis", icon: <SiRedis className="text-red-500" /> },
  { name: "AWS", icon: <FaAws className="text-orange-500" /> },
  { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
  { name: "Linux", icon: <FaLinux className="text-yellow-600" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
  {
    name: "GitHub",
    icon: <SiGithub className="text-(--color-text-primary)" />,
  },
  { name: "Python", icon: <FaPython className="text-blue-400" /> },
  { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
  { name: "OpenAI", icon: <AiFillOpenAI className="text-green-600" /> },
  { name: "Cloudinary", icon: <SiCloudinary className="text-blue-400" /> },
  {
    name: "Socket.io",
    icon: <SiSocketdotio className="text-(--color-text-primary)" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Skill cards — asymmetric sizes, color accents, mono labels         */
/* ------------------------------------------------------------------ */

type Span = "sm" | "md" | "lg";

interface Skill {
  strong: string;
  p: string;
}

interface SkillGroup {
  index: string; // 01, 02, ...
  title: string;
  kicker: string; // short editorial subtitle
  accent: string; // tailwind color classes for the accent bar
  items: Skill[];
  span: Span;
}

const skillGroups: SkillGroup[] = [
  {
    index: "01",
    title: "Frontend",
    kicker: "Interfaces that feel obvious",
    accent: "bg-cyan-500",
    span: "lg",
    items: [
      {
        strong: "React & Next.js",
        p: "App Router, RSC, streaming, server actions, dynamic routes.",
      },
      {
        strong: "Angular",
        p: "Component architecture, RxJS, services, dependency injection.",
      },
      {
        strong: "TypeScript",
        p: "Strict typing end-to-end, generics, discriminated unions.",
      },
      {
        strong: "Tailwind & Bootstrap",
        p: "Design tokens, responsive utilities, dark mode.",
      },
      {
        strong: "Framer Motion",
        p: "Micro-interactions, layout animations, reduced-motion aware.",
      },
    ],
  },
  {
    index: "02",
    title: "Backend",
    kicker: "APIs built to stay up",
    accent: "bg-emerald-500",
    span: "md",
    items: [
      {
        strong: "Node.js & Express",
        p: "REST APIs, middleware, auth flows, rate limiting.",
      },
      {
        strong: "FastAPI",
        p: "Python-first async APIs, Pydantic schemas, OpenAPI docs.",
      },
      {
        strong: "Authentication",
        p: "JWT, bcrypt, session strategies, protected routes.",
      },
      {
        strong: "WebSockets",
        p: "Real-time messaging and presence with Socket.IO.",
      },
    ],
  },
  {
    index: "03",
    title: "DataBase",
    kicker: "Schemas and queries that scale",
    accent: "bg-blue-500",
    span: "md",
    items: [
      {
        strong: "MongoDB & Mongoose",
        p: "Document modelling, aggregation pipelines, indexes.",
      },
      {
        strong: "PostgreSQL",
        p: "Relational design, joins, transactions, migrations.",
      },
      { strong: "Redis", p: "Caching, sessions, rate limiting, pub/sub." },
      {
        strong: "Query Optimization",
        p: "Profiling slow queries and cutting response times.",
      },
    ],
  },
  {
    index: "04",
    title: "Cloud & DevOps",
    kicker: "Ship it, then keep it running",
    accent: "bg-orange-500",
    span: "lg",
    items: [
      {
        strong: "AWS S3",
        p: "Bucket policies, presigned URLs, static hosting, lifecycle rules.",
      },
      {
        strong: "AWS EC2 & Lambda",
        p: "Instance provisioning, serverless functions, IAM roles.",
      },
      {
        strong: "AWS RDS & CloudFront",
        p: "Managed databases and edge caching for global delivery.",
      },
      {
        strong: "Linux",
        p: "Shell, systemd, SSH, permissions, cron, log troubleshooting.",
      },
      {
        strong: "Docker & Git",
        p: "Containerised local dev, branching strategies, CI workflows.",
      },
    ],
  },
  {
    index: "05",
    title: "Generative AI",
    kicker: "LLMs wired into real products",
    accent: "bg-fuchsia-500",
    span: "md",
    items: [
      {
        strong: "LLM Integration",
        p: "OpenAI, Gemini, Claude — streaming and function calling.",
      },
      {
        strong: "RAG Pipelines",
        p: "Vector search with Pinecone, chunking, embeddings.",
      },
      {
        strong: "Agent Workflows",
        p: "Tool use, multi-step reasoning, prompt design.",
      },
    ],
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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const MarqueeRow = ({
  icons,
  reverse = false,
}: {
  icons: typeof rowOneIcons;
  reverse?: boolean;
}) => {
  const prefersReduced = useReducedMotion();
  const doubled = useMemo(() => [...icons, ...icons], [icons]);

  // Each item is roughly 96px wide (icon + gap). One loop = icons.length * 96
  const distance = icons.length * 96;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6 pt-2 pb-2 w-max"
        animate={
          prefersReduced
            ? undefined
            : { x: reverse ? [-distance, 0] : [0, -distance] }
        }
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 45,
            ease: "linear",
          },
        }}
      >
        {doubled.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            className="group flex w-20 flex-shrink-0 flex-col items-center gap-2"
          >
            <div
              className="grid h-12 w-12 place-items-center rounded-xl border border-(--color-border)
                         bg-(--color-background) text-2xl shadow-sm transition-all duration-300
                         group-hover:-translate-y-1 group-hover:border-orange-400/40
                         group-hover:shadow-md md:h-14 md:w-14 md:text-[26px]"
            >
              {tool.icon}
            </div>
            <span className="font-roboto-slab text-[10px] font-medium uppercase tracking-wider text-(--color-text-muted) transition-colors group-hover:text-(--color-text-secondary) md:text-[11px]">
              {tool.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const spanClass: Record<Span, string> = {
  sm: "md:col-span-1",
  md: "md:col-span-1 lg:col-span-1",
  lg: "md:col-span-2 lg:col-span-2",
};

const SkillCard = ({ group, index }: { group: SkillGroup; index: number }) => {
  return (
    <motion.article
      variants={fadeUp}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border
                  border-(--color-border) bg-(--color-background)
                  p-6 transition-all duration-500 hover:border-orange-400/30
                  hover:shadow-[0_20px_60px_-20px_rgba(249,115,22,0.15)]
                  md:p-7 ${spanClass[group.span]}`}
    >
      {/* Accent bar */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-[3px] ${group.accent} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Index + kicker */}
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.18em] text-(--color-text-muted)">
            {group.index} — {group.kicker}
          </span>
          <h3 className="font-caprasimo mt-1 text-2xl font-extrabold leading-tight text-(--color-text-primary) md:text-[28px]">
            {group.title}
          </h3>
        </div>
      </header>

      <ul className="space-y-3.5">
        {group.items.map((item) => (
          <li key={item.strong} className="font-roboto-slab">
            <p className="text-sm font-semibold text-(--color-text-primary)">
              {item.strong}
            </p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-(--color-text-muted)">
              {item.p}
            </p>
          </li>
        ))}
      </ul>
    </motion.article>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const prefersReduced = useReducedMotion();

  return (
    <section id="skills">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="mx-auto flex w-full max-w-7xl flex-col px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        {/* ---------- Header ---------- */}
        <motion.header
          variants={fadeUp}
          className="mb-14 flex flex-col items-start gap-3 md:mb-20"
        >
          <span className="font-roboto-slab text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
            Skills & Stack
          </span>
          <h1 className="font-caprasimo max-w-3xl bg-gradient-to-r from-(--color-text-primary) to-(--color-primary) bg-clip-text text-4xl font-bold leading-[1.05] text-transparent dark:from-white dark:to-(--color-primary-light) sm:text-5xl md:text-6xl">
            Tools I reach for, and the problems they solve.
          </h1>
          <p className="font-roboto-slab mt-2 max-w-2xl text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
            A working map of the technologies I use day-to-day — from
            pixel-level frontend work to cloud infrastructure and AI pipelines.
          </p>
        </motion.header>

        {/* ---------- Marquee ---------- */}
        <motion.section
          variants={fadeUp}
          aria-label="Technologies I work with"
          className="relative mb-16 md:mb-24"
        >
          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-(--color-background) to-transparent md:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-(--color-background) to-transparent md:w-28"
          />

          <div className="flex flex-col gap-4">
            <MarqueeRow icons={rowOneIcons} />
            <MarqueeRow icons={rowTwoIcons} reverse />
          </div>
        </motion.section>

        {/* ---------- Grid ---------- */}
        <motion.section
          variants={stagger}
          aria-label="Skill categories"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </motion.section>

        {/* ---------- Footer note ---------- */}
        <motion.p
          variants={fadeUp}
          className="font-roboto-slab mt-14 text-center text-sm text-(--color-text-muted) md:mt-20"
        >
          Always learning. Currently exploring vector databases and edge
          runtimes.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Skills;
