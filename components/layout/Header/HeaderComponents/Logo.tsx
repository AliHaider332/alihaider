// components/Logo.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import logo_L from '@/public/Pictures/logo_L.png';
import logo_D from '@/public/Pictures/logo_D.png';

const Logo: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Before mount, render the light logo (matches SSR). After mount,
  // render the correct one. No hydration mismatch because the server
  // and first client render both output the light logo.
  const logoSrc = mounted && theme === 'dark' ? logo_D : logo_L;

  return (
    <Link
      href="/"
      className="flex items-center focus:outline-none focus:ring-2 focus:ring-(--color-primary) rounded-lg p-1"
      aria-label="Haider - Home"
    >
      <div className="relative w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16">
        <Image
          src={logoSrc}
          alt="HAIDER Logo"
          className="object-contain"
          fill
          priority
          sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
        />
      </div>
    </Link>
  );
};

export default Logo;