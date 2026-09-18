// components/About/About.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { FiArrowUpRight, FiMapPin, FiCode, FiBookOpen } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { label: "LeetCode problems", value: "390+" },
  { label: "Longest streak", value: "63 days" },
  { label: "Semester", value: "7th" },
];

interface BlockProps {
  index: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  media: {
    src: string;
    alt: string;
    sizes: string;
    priority?: boolean;
  };
  reverse?: boolean;
  cta?: { href: string; label: string };
}

/* ------------------------------------------------------------------ */
/*  Reusable content + media block                                     */
/* ------------------------------------------------------------------ */

const ContentBlock = ({
  index,
  kicker,
  title,
  children,
  media,
  reverse = false,
  cta,
}: BlockProps) => {
  const mediaOrder = reverse ? "lg:order-1" : "lg:order-2";
  const textOrder = reverse ? "lg:order-2" : "lg:order-1";

  return (
    <motion.section
      variants={fadeUp}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14"
    >
      {/* Text side */}
      <div className={`order-1 ${textOrder} min-w-0`}>
        <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
          {index} — {kicker}
        </span>
        <h2 className="font-caprasimo mt-2 text-3xl font-bold leading-tight text-(--color-text-primary) sm:text-4xl md:text-[40px]">
          {title}
        </h2>

        <div className="font-roboto-slab mt-5 space-y-4 text-[15px] leading-relaxed text-(--color-text-secondary) sm:text-base">
          {children}
        </div>

        {cta && (
          <Link
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-xl
                       bg-gradient-to-r from-(--color-primary) to-(--color-primary-dark)
                       px-5 py-2.5 font-roboto-slab text-sm font-semibold text-white
                       shadow-lg shadow-orange-500/20 transition-all duration-300
                       hover:shadow-xl hover:shadow-orange-500/25
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-orange-500/60 sm:text-base"
          >
            {cta.label}
            <FiArrowUpRight
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>

      {/* Media side */}
      <div className={`order-2 ${mediaOrder} min-w-0`}>
        <MediaFrame {...media} />
      </div>
    </motion.section>
  );
};

/* ------------------------------------------------------------------ */
/*  Media frame — consistent treatment for every image                 */
/* ------------------------------------------------------------------ */

const MediaFrame = ({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.figure
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden
                 rounded-2xl border border-(--color-border) bg-(--color-background-secondary)
                 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center transition-transform duration-700 ease-out
                   group-hover:scale-[1.03]"
      />

      {/* Rim-light / vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl
                   bg-gradient-to-b from-white/[0.06] via-transparent to-black/20
                   dark:from-white/[0.04] dark:to-black/30"
      />

      {/* Inner ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl
                   ring-1 ring-inset ring-black/5 dark:ring-white/10"
      />

      {/* Film grain — same trick as the hero portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "120px 120px",
        }}
      />
    </motion.figure>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.03 });

  return (
    <section id="about">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="mx-auto flex w-full max-w-7xl flex-col gap-16 overflow-x-clip px-4 py-16 sm:gap-20 sm:px-6 md:gap-24 md:py-24 lg:px-8"
      >
        {/* ---------- Header ---------- */}
        <motion.header variants={fadeUp} className="max-w-3xl">
          <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
            About
          </span>
          <h1 className="font-caprasimo mt-2 bg-gradient-to-r from-(--color-text-primary) to-(--color-primary) bg-clip-text text-4xl font-bold leading-[1.05] text-transparent dark:from-white dark:to-(--color-primary-light) sm:text-5xl md:text-6xl">
            The person behind the code.
          </h1>
          <p className="font-roboto-slab mt-4 max-w-2xl text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
            A Computer Science student, full-stack developer, and problem-solver
            who believes the best way to learn is to build and ship.
          </p>
        </motion.header>

        {/* ---------- Intro card ---------- */}
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-(--color-border)
                   bg-(--color-background-secondary) p-6 sm:p-10"
        >
          {/* Accent bar */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-[3px] bg-orange-500 opacity-80"
          />

          {/* Quote mark */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-6 top-4 select-none font-serif text-[120px] leading-none text-orange-500/10 sm:text-[160px]"
          >
            &rdquo;
          </span>

          <p className="font-roboto-slab relative z-10 max-w-3xl text-[17px] font-medium italic leading-relaxed text-(--color-text-primary) sm:text-lg sm:leading-8">
            I&apos;m a Computer Science student crafting the future line by line
            — turning ideas into digital reality with clean, purposeful code. My
            passion sits at the intersection of creative web development and
            problem-solving. Every project is a chance to learn, innovate, and
            push what I can build. My goal is to make solutions that inspire,
            connect, and matter.
          </p>

          {/* Stat strip */}
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-(--color-border) pt-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="min-w-0">
                <dt className="font-roboto-slab text-[10px] font-medium uppercase tracking-[0.16em] text-(--color-text-muted) sm:text-[11px]">
                  {label}
                </dt>
                <dd className="font-caprasimo mt-1 text-lg font-bold text-(--color-text-primary) sm:text-xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.section>

        {/* ---------- Education ---------- */}
        <ContentBlock
          index="01"
          kicker="Education"
          title="Computer Science, in progress."
          media={{
            src: "/Pictures/university.webp",
            alt: "University of Agriculture, Faisalabad",
            sizes: "(max-width: 1024px) 100vw, 560px",
          }}
        >
          <p>
            I&apos;m pursuing my Bachelor&apos;s in Computer Science at the
            University of Agriculture, Faisalabad. It isn&apos;t a traditional
            CS hub — but its supportive environment, affordability, and
            scholarships make it the right place for me.
          </p>
          <p>
            I believe real learning happens beyond the classroom, so I actively
            work on hands-on projects and open-source. Now in my 5th semester,
            I&apos;m proud of how far I&apos;ve come and driven to keep growing.
          </p>
        </ContentBlock>

        {/* ---------- DSA ---------- */}
        <ContentBlock
          index="02"
          kicker="Problem Solving"
          title="A year sharpening the fundamentals."
          reverse
          media={{
            src: "/Pictures/leetcode.png",
            alt: "LeetCode profile and progress",
            sizes: "(max-width: 1024px) 100vw, 560px",
          }}
        >
          <p>
            I&apos;ve spent the past year sharpening my data structures and
            algorithms skills, solving over 230 problems with a 46-day streak.
            Each challenge has strengthened my logic and revealed new patterns.
          </p>
          <p>
            Now I&apos;m pushing into harder problems and open-source
            contributions — driven by the thrill of turning complexity into
            clarity.
          </p>
        </ContentBlock>

        {/* ---------- JS Platform ---------- */}
        <ContentBlock
          index="03"
          kicker="Project"
          title="A JavaScript learning platform."
          media={{
            src: "/Pictures/notes.png",
            alt: "JavaScript learning platform interface",
            sizes: "(max-width: 1024px) 100vw, 560px",
          }}
          cta={{
            href: "https://development-journey-iomo.vercel.app/",
            label: "Visit platform",
          }}
        >
          <p>
            I built a comprehensive JavaScript learning platform that covers
            everything from fundamentals to advanced topics — interactive
            examples, AI-powered doubt resolution, and the interview questions
            that actually get asked.
          </p>
          <p>
            It started as a fix for my own revision process. Now it&apos;s
            deployed on Vercel and serves as a complete JavaScript mastery
            resource.
          </p>
        </ContentBlock>

        <motion.section
          variants={fadeUp}
          aria-labelledby="achievements-heading"
          className="relative overflow-hidden rounded-3xl border border-(--color-border)
                       bg-(--color-background-secondary) p-6 sm:p-8 md:p-10"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-[3px] bg-orange-500 opacity-80"
          />

          <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
            Also worth noting
          </span>
          <h2
            id="achievements-heading"
            className="font-caprasimo mt-2 text-2xl font-bold text-(--color-text-primary) sm:text-[28px]"
          >
            Beyond the roles
          </h2>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                value: "550+",
                label: "DSA problems solved",
                sub: "LeetCode & GeeksforGeeks",
              },
              {
                value: "3.55",
                label: "CGPA at UAF",
                sub: "BS Computer Science",
              },
              {
                value: "Hackathons",
                label: "International & Contest",
                sub: "Contributor and participant",
              },
            ].map(({ value, label, sub }) => (
              <li
                key={label}
                className="rounded-2xl border border-(--color-border)
                             bg-(--color-background) p-5"
              >
                <span className="font-caprasimo block text-2xl font-bold text-(--color-primary) sm:text-3xl">
                  {value}
                </span>
                <span className="font-roboto-slab mt-1 block text-sm font-semibold text-(--color-text-primary)">
                  {label}
                </span>
                <span className="font-roboto-slab mt-0.5 block text-xs text-(--color-text-muted)">
                  {sub}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>
      </motion.div>
    </section>
  );
};

export default About;
