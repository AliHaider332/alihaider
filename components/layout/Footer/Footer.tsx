// components/layout/Footer/Footer.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiArrowUpRight,
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavLink {
  href: string;
  label: string;
}

interface ResourceLink {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
}

interface SocialLink {
  href: string;
  label: string;
  Icon: ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;
}

/* ------------------------------------------------------------------ */
/*  Data — every href is a hash on the home page                       */
/* ------------------------------------------------------------------ */

const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const resourceLinks: ResourceLink[] = [
  {
    href: 'https://development-journey-iomo.vercel.app/',
    label: 'JS Learning Platform',
    external: true,
  },
  {
    href: 'https://github.com/AliHaider332',
    label: 'GitHub Profile',
    external: true,
  },
  {
    href: '/Ali_Haider_Full_Stack_Developer_Resume.pdf',
    label: 'Resume',
    download: true,
  },
];

const socials: SocialLink[] = [
  {
    href: 'https://github.com/AliHaider332',
    label: 'GitHub',
    Icon: FiGithub,
  },
  {
    href: 'https://www.linkedin.com/in/alihaider332/',
    label: 'LinkedIn',
    Icon: FiLinkedin,
  },
  {
    href: 'https://leetcode.com/u/alihaider332gb/',
    label: 'LeetCode',
    Icon: SiLeetcode,
  },
  {
    href: 'https://www.instagram.com/ch_ali_haider_332',
    label: 'Instagram',
    Icon: FiInstagram,
  },
  {
    // TODO: replace with your real email address
    href: 'mailto:bhaialihaider332@email.com',
    label: 'Email',
    Icon: FiMail,
  },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative mt-24 border-t border-(--color-border) bg-(--color-background-secondary)"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* Top hairline gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-(--color-primary)/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          {/* ---------- Brand column ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm"
          >
            <Link
              href="#home"
              className="font-caprasimo inline-flex items-baseline gap-1 text-2xl font-bold text-(--color-text-primary) transition-colors hover:text-(--color-primary)"
            >
              Ali Haider
              <span aria-hidden className="text-(--color-primary)">
                .
              </span>
            </Link>

            <p className="font-roboto-slab mt-4 text-sm leading-relaxed text-(--color-text-secondary)">
              Full-stack developer building web products with React, Next.js,
              Node.js, and AWS. Currently open to freelance and full-time work.
            </p>

            {/* Socials */}
            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
              {socials.map(({ href, label, Icon }) => {
                const isExternal = href.startsWith('http');
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      className="grid h-9 w-9 place-items-center rounded-lg border
                                 border-(--color-border) bg-(--color-background)
                                 text-(--color-text-secondary) transition-all duration-300
                                 hover:-translate-y-0.5 hover:border-orange-400/40
                                 hover:text-(--color-primary)
                                 focus-visible:outline-none focus-visible:ring-2
                                 focus-visible:ring-orange-500/60"
                    >
                      <Icon size={16} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* ---------- Navigate column ---------- */}
          <motion.nav
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="font-roboto-slab text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 font-roboto-slab text-sm text-(--color-text-secondary) transition-colors hover:text-(--color-primary)"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-(--color-primary) transition-all duration-300 group-hover:w-3"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ---------- Resources column ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-roboto-slab text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
              Resources
            </h3>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map(({ href, label, external, download }) => {
                const isInternal = href.startsWith('/') && !download;

                const className =
                  'group inline-flex items-center gap-1.5 font-roboto-slab text-sm text-(--color-text-secondary) transition-colors hover:text-(--color-primary)';

                if (isInternal) {
                  return (
                    <li key={href}>
                      <Link href={href} className={className}>
                        {label}
                        <FiArrowUpRight
                          aria-hidden
                          size={14}
                          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={href}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      download={download ? '' : undefined}
                      className={className}
                    >
                      {label}
                      <FiArrowUpRight
                        aria-hidden
                        size={14}
                        className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Availability chip */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-roboto-slab text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                Available for work
              </span>
            </div>
          </motion.div>
        </div>

        {/* ---------- Bottom strip ---------- */}
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-(--color-border) pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-roboto-slab text-xs text-(--color-text-muted)">
            © {year} Ali Haider. All rights reserved.
          </p>

          <p className="font-roboto-slab text-xs text-(--color-text-muted)">
            Built with{' '}
            <span className="text-(--color-text-secondary)">Next.js</span>,{' '}
            <span className="text-(--color-text-secondary)">Tailwind CSS</span>{' '}
            and a lot of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;