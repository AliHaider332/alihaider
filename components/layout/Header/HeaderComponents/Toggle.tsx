// components/layout/Header/HeaderComponents/Toggle.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';

const Toggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggleTheme}
      className="text-2xl md:text-3xl xl:text-4xl cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-[var(--color-background-secondary)]"
      aria-label="Toggle Theme"
    >
      {!mounted ? (
        // Render an invisible placeholder of the same size.
        // Server + first client render both produce this → no mismatch.
        <span className="inline-block w-[1em] h-[1em]" aria-hidden="true" />
      ) : theme === 'dark' ? (
        <FiSun className="text-yellow-500 transition-transform duration-500 transform hover:rotate-90" />
      ) : (
        <FiMoon className="text-[var(--color-text-primary)] hover:scale-110 transition-transform duration-300" />
      )}
    </button>
  );
};

export default Toggle;