// components/layout/Header/DesktopMenu.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Nav items — every href points to a section id on the home page     */
/* ------------------------------------------------------------------ */

const navLinks = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#contact', label: 'Contact', id: 'contact' },
] as const;

interface DesktopMenuProps {
  /** Optional: called when a link is clicked — useful to close a mobile menu */
  onNavigate?: () => void;
}

const DesktopMenu = ({ onNavigate }: DesktopMenuProps) => {
  const [activeId, setActiveId] = useState<string>('home');

  /* ------------------------------------------------------------------ */
  /*  Track the section currently in view                                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    // Pick the section whose top is closest to (but not below) the viewport top + offset
    const offset = 120;

    const updateActive = () => {
      let current = sections[0].id;

      for (const section of sections) {
        const { top } = section.getBoundingClientRect();
        if (top - offset <= 0) current = section.id;
        else break;
      }

      // Special case: at the very bottom of the page, highlight the last section
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) current = sections[sections.length - 1].id;

      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-x-7 lg:gap-x-9">
        {navLinks.map(({ href, label, id }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative inline-flex items-center py-1
                            font-roboto-slab text-[14px] font-medium
                            transition-colors duration-200 lg:text-[15px]
                            ${
                              isActive
                                ? 'text-(--color-primary)'
                                : 'text-(--color-text-secondary) hover:text-(--color-primary)'
                            }`}
              >
                {label}

                {/* Underline — grows from left on hover, stays full-width when active */}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full
                              bg-gradient-to-r from-(--color-primary) to-(--color-primary-dark)
                              transition-all duration-300 ease-out
                              ${
                                isActive
                                  ? 'w-full opacity-100'
                                  : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                              }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopMenu;