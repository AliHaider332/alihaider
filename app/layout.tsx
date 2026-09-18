// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Roboto_Slab, Caprasimo } from 'next/font/google';

import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const caprasimo = Caprasimo({
  subsets: ['latin'],
  variable: '--font-caprasimo',
  display: 'swap',
  weight: '400',
});

/* ------------------------------------------------------------------ */
/*  Site config — update the URL to your real domain before deploy     */
/* ------------------------------------------------------------------ */

const SITE_URL = 'https://alihaider.dev'; // ← change to your real domain
const SITE_NAME = 'Ali Haider';
const SITE_TITLE = 'Ali Haider — Full Stack Developer';
const SITE_DESCRIPTION =
  'Full-stack developer building web products with React, Next.js, Node.js, and AWS. Portfolio of shipped projects, freelance work, and case studies.';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  keywords: [
    'Ali Haider',
    'full-stack developer',
    'React developer',
    'Next.js developer',
    'Node.js developer',
    'MERN stack developer',
    'TypeScript developer',
    'AWS developer',
    'FastAPI developer',
    'freelance developer',
    'web developer Pakistan',
    'portfolio',
  ],

  category: 'technology',
  classification: 'Portfolio',

  alternates: {
    canonical: '/',
  },

  /* ---------- Open Graph (Facebook, LinkedIn, Slack, Discord, WhatsApp) ---------- */
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/og/favicon.ico',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Full Stack Developer`,
      },
    ],
  },

  /* ---------- Twitter / X ---------- */
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og/favicon.ico'],
    // creator: '@yourhandle', // add when ready
  },

  /* ---------- Icons ---------- */
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
    shortcut: ['/favicon.ico'],
  },

  /* ---------- Manifest (PWA-lite) ---------- */
  manifest: '/manifest.webmanifest',

  /* ---------- Robots directives ---------- */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  /* ---------- Search console verification (fill in after verifying) ---------- */
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  /* ---------- Misc ---------- */
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/* ------------------------------------------------------------------ */
/*  Theme init script (unchanged)                                      */
/* ------------------------------------------------------------------ */

const themeInitScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = t === 'dark' || (!t && prefersDark);
      var root = document.documentElement;
      root.classList.toggle('dark', isDark);
      root.style.colorScheme = isDark ? 'dark' : 'light';
    } catch (e) {}
  })();
`;

/* ------------------------------------------------------------------ */
/*  Root layout                                                        */
/* ------------------------------------------------------------------ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${caprasimo.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* JSON-LD — Person + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Ali Haider',
                  url: SITE_URL,
                  jobTitle: 'Full Stack Developer',
                  email: 'mailto:your@email.com', // ← update
                  sameAs: [
                    'https://github.com/AliHaider332',
                    'https://www.linkedin.com/in/alihaider332/',
                    'https://leetcode.com/u/alihaider332gb/',
                  ],
                  knowsAbout: [
                    'React',
                    'Next.js',
                    'Angular',
                    'Node.js',
                    'Express.js',
                    'FastAPI',
                    'MongoDB',
                    'PostgreSQL',
                    'AWS',
                    'Docker',
                    'Generative AI',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: SITE_NAME,
                  description: SITE_DESCRIPTION,
                  publisher: { '@id': `${SITE_URL}/#person` },
                  inLanguage: 'en',
                },
              ],
            }).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="font-roboto-slab antialiased bg-(--color-background) text-(--color-text-primary) theme-transition overflow-x-clip">
        <ThemeProvider>
          <Header />
          <main className="pt-20 min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}