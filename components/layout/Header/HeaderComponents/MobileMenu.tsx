// components/layout/Header/MobileMenu.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { FiArrowUpRight } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  Same nav items as DesktopMenu — hash links on the home page        */
/* ------------------------------------------------------------------ */

const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#about", label: "About", id: "about" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

/* ------------------------------------------------------------------ */
/*  Motion presets                                                     */
/* ------------------------------------------------------------------ */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* ------------------------------------------------------------------ */
  /*  Lock body scroll while the menu is open                            */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar disappearing so the layout doesn't shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = original;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  /* ------------------------------------------------------------------ */
  /*  Close on outside click / Escape / desktop resize                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  /* ------------------------------------------------------------------ */
  /*  Move focus into the panel when it opens, restore on close          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Focus the first link after the panel animation starts
    const t = setTimeout(() => {
      const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");
      firstLink?.focus();
    }, 60);

    return () => {
      clearTimeout(t);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  /* ------------------------------------------------------------------ */
  /*  Scroll spy — same logic as DesktopMenu                             */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const offset = 120;

    const updateActive = () => {
      let current = sections[0].id;

      for (const section of sections) {
        const { top } = section.getBoundingClientRect();
        if (top - offset <= 0) current = section.id;
        else break;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) current = sections[sections.length - 1].id;

      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <div className="md:hidden">
      {/* ---------- Trigger ---------- */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
        className="grid h-10 w-10 place-items-center rounded-lg text-(--color-text-primary)
                   transition-colors hover:bg-(--color-background-secondary)
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-orange-500/60"
      >
        {isOpen ? (
          <RxCross2 className="text-xl sm:text-2xl" aria-hidden />
        ) : (
          <HiMiniBars3CenterLeft className="text-xl sm:text-2xl" aria-hidden />
        )}
      </button>

      {/* ---------- Panel + backdrop ---------- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              aria-hidden
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px] md:hidden"
            />

            {/* Sliding panel */}
            <motion.aside
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(86vw,360px)]
                         flex-col border-l border-(--color-border)
                         bg-(--color-background) shadow-2xl md:hidden"
            >
              {/* Warm glow behind the panel — soft, top-right */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full
                           bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_70%)]
                           blur-2xl"
              />

              {/* Orange accent strip */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[2px]
                           bg-gradient-to-b from-(--color-primary) via-(--color-primary)/60 to-transparent"
              />

              {/* ---------- Panel header ---------- */}
              <header className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
                <Link
                  href="#home"
                  onClick={() => setIsOpen(false)}
                  className="font-caprasimo inline-flex items-baseline gap-1 text-lg font-bold text-(--color-text-primary) transition-colors hover:text-(--color-primary)"
                >
                  Ali Haider
                  <span aria-hidden className="text-(--color-primary)">
                    .
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-lg text-(--color-text-secondary)
                             transition-colors hover:bg-(--color-background-secondary) hover:text-(--color-primary)
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                >
                  <RxCross2 size={20} aria-hidden />
                </button>
              </header>

              {/* ---------- Nav list ---------- */}
              <nav
                aria-label="Mobile navigation"
                className="flex flex-1 flex-col overflow-y-auto px-3 py-5"
              >
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-1"
                >
                  {navLinks.map(({ href, label, id }, i) => {
                    const isActive = activeId === id;

                    return (
                      <motion.li key={id} variants={itemVariants}>
                        <Link
                          href={href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive ? "true" : undefined}
                          className={`group relative flex items-center justify-between
                                      overflow-hidden rounded-xl px-4 py-3
                                      font-roboto-slab text-[15px] font-medium
                                      transition-colors duration-200
                                      ${
                                        isActive
                                          ? "bg-orange-500/10 text-(--color-primary)"
                                          : "text-(--color-text-secondary) hover:bg-(--color-background-secondary) hover:text-(--color-text-primary)"
                                      }`}
                        >
                          <span className="flex items-center gap-3">
                            
                            {label}
                          </span>

                          {isActive ? (
                            <span
                              aria-hidden
                              className="h-1.5 w-1.5 rounded-full bg-(--color-primary)"
                            />
                          ) : (
                            <FiArrowUpRight
                              aria-hidden
                              size={14}
                              className="translate-x-1 text-(--color-text-muted) opacity-0
                                         transition-all duration-300
                                         group-hover:translate-x-0 group-hover:text-(--color-primary) group-hover:opacity-100"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                {/* ---------- Panel footer ---------- */}
                <div className="mt-auto border-t border-(--color-border) pt-5">
                  <p className="font-roboto-slab px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-(--color-text-muted)">
                    Get in touch
                  </p>

                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="group mt-3 inline-flex w-full items-center justify-between
                               rounded-xl bg-gradient-to-r from-(--color-primary)
                               to-(--color-primary-dark) px-4 py-3
                               font-roboto-slab text-sm font-semibold text-white
                               shadow-lg shadow-orange-500/20 transition-all duration-300
                               hover:shadow-xl hover:shadow-orange-500/25
                               focus-visible:outline-none focus-visible:ring-2
                               focus-visible:ring-orange-500/60"
                  >
                   Contact
                    <FiArrowUpRight
                      aria-hidden
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
