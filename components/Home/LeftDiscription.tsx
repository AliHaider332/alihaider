// components/Home/LeftDiscription.tsx
"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import { SiLeetcode, SiWhatsapp, SiGithub, SiInstagram } from "react-icons/si";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";

interface LeftDescriptionProps {
  isParentVisible: boolean;
}

const socialLinks = [
  {
    Icon: FaLinkedin,
    href: "https://www.linkedin.com/in/alihaider332/",
    name: "LinkedIn",
  },
  { Icon: SiGithub, href: "https://github.com/AliHaider332", name: "GitHub" },
  {
    Icon: SiLeetcode,
    href: "https://leetcode.com/u/alihaider332gb/",
    name: "LeetCode",
  },
  {
    Icon: SiInstagram,
    href: "https://www.instagram.com/ch_ali_haider_332",
    name: "Instagram",
  },
  { Icon: SiWhatsapp, href: "https://wa.me/+923193238467", name: "WhatsApp" },
];

const LeftDescription = ({ isParentVisible }: LeftDescriptionProps) => {
  const el = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    if (!isParentVisible || !el.current) return;

    const typed = new Typed(el.current, {
      strings: [
        "Full Stack Developer",
        "MERN Stack Developer",
        "React & Next.js Developer",
        "Backend Engineer",
        "Cloud & AWS Enthusiast",
      ],
      typeSpeed: 65,
      backSpeed: 40,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: "▍",
      smartBackspace: true,
      startDelay: 400,
    });

    typedRef.current = typed;
    return () => {
      typedRef.current?.destroy();
      typedRef.current = null;
    };
  }, [isParentVisible]);

  // Single shared entrance animation with per-block delay
  const anim = (delay: number) =>
    ({
      opacity: isParentVisible ? 1 : 0,
      transform: isParentVisible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    }) as const;

  return (
    <div className="flex w-full flex-col items-center gap-7 text-center sm:gap-8 lg:items-start lg:text-left">
      {/* Eyebrow + availability */}
      <div
        className="flex items-center gap-3 font-roboto-slab text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)"
        style={anim(150)}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Available for work
      </div>

      {/* Name */}
      <div style={anim(250)}>
        <h1 className="font-roboto-slab text-4xl font-black leading-[1.02] tracking-tight text-(--color-text-primary) sm:text-5xl md:text-6xl lg:text-[68px]">
          Ali{" "}
          <span className="relative inline-block">
            Haider
            {/* Underline accent */}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-(--color-primary) to-(--color-primary-dark) transition-transform duration-700 ease-out"
              style={{
                transform: isParentVisible ? "scaleX(1)" : "scaleX(0)",
                transitionDelay: "900ms",
              }}
            />
          </span>
        </h1>
      </div>

      {/* Typed role */}
      <div style={anim(400)} className="min-h-[1.4em]">
        <p className="font-roboto-slab text-lg font-bold text-(--color-primary) sm:text-xl md:text-2xl">
          <span ref={el} />
        </p>
      </div>

      {/* Short pitch */}
      <p
        style={anim(500)}
        className="font-roboto-slab max-w-lg text-sm leading-relaxed text-(--color-text-secondary) sm:text-base"
      >
        I design and build full-stack products — from a React or Next.js
        interface down to the API, database, and cloud infrastructure that keeps
        them running.
      </p>

      {/* Social links */}
      <div style={anim(650)}>
        <ul className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
          {socialLinks.map(({ Icon, href, name }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group grid h-10 w-10 place-items-center rounded-xl border
                           border-(--color-border) bg-(--color-background)
                           text-(--color-text-secondary) transition-all duration-300
                           hover:-translate-y-0.5 hover:border-(--color-primary)/40
                           hover:text-(--color-primary)
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-orange-500/60"
              >
                <Icon size={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div
        style={anim(800)}
        className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
      >
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 rounded-xl
                     bg-gradient-to-r from-(--color-primary) to-(--color-primary-dark)
                     px-6 py-3 font-roboto-slab text-sm font-semibold text-white
                     shadow-lg shadow-orange-500/20 transition-all duration-300
                     hover:shadow-xl hover:shadow-orange-500/25
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-orange-500/60 sm:text-base"
        >
          Hire Me
          <FiArrowUpRight
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>

        <button
          type="button"
          onClick={() => {
            const a = document.createElement("a");
            a.href = "/Ali_Haider_Full_Stack_Developer_Resume.pdf";
            a.download = "Ali_Haider_Full_Stack_Developer_Resume.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
          className="group inline-flex items-center justify-center gap-2 rounded-xl
                     border border-(--color-border) bg-(--color-background)
                     px-6 py-3 font-roboto-slab text-sm font-semibold
                     text-(--color-text-primary) transition-all duration-300
                     hover:-translate-y-0.5 hover:border-(--color-primary)/40
                     hover:text-(--color-primary)
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-orange-500/60 sm:text-base"
        >
          Download CV
          <FiDownload
            aria-hidden
            size={16}
            className="transition-transform duration-300 group-hover:translate-y-0.5"
          />
        </button>
      </div>
    </div>
  );
};

export default LeftDescription;
