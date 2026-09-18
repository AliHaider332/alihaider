// components/layout/Header/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './HeaderComponents/MobileMenu';
import Toggle from './HeaderComponents/Toggle';
import DesktopMenu from './HeaderComponents/DesktopMenu';
import Logo from './HeaderComponents/Logo';

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll(); // run once in case page loads already scrolled
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-[90%] mx-auto px-3 md:px-6 rounded-2xl  theme-transition ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}
      style={{
        backgroundColor: 'var(--header-bg)',
        borderBottom: '1px solid var(--header-border)',
      }}
    >
      <div className="flex justify-between items-center py-3 md:hidden">
        <MobileMenu pathname={pathname} />
        <Logo />
        <Toggle />
      </div>

      <div className="hidden md:flex justify-between items-center py-3">
        <Logo />
        <DesktopMenu pathname={pathname} />
        <Toggle />
      </div>
    </header>
  );
};

export default Header;