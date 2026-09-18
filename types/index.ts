// types/index.ts
export interface NavLink {
  href: string;
  label: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface HeaderProps {
  pathname: string;
}

export interface MobileMenuProps {
  pathname: string;
}

export interface DesktopMenuProps {
  pathname: string;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

// CSS Variable types
export type CSSVariable = 
  | '--color-primary'
  | '--color-primary-dark'
  | '--color-primary-light'
  | '--color-primary-bg'
  | '--color-secondary'
  | '--color-secondary-light'
  | '--color-text-primary'
  | '--color-text-secondary'
  | '--color-text-muted'
  | '--color-background'
  | '--color-background-secondary'
  | '--color-background-tertiary'
  | '--color-border'
  | '--color-border-hover'
  | '--color-success'
  | '--color-warning'
  | '--color-error'
  | '--color-info'
  | '--shadow-sm'
  | '--shadow-md'
  | '--shadow-lg'
  | '--shadow-xl'
  | '--transition-fast'
  | '--transition-normal'
  | '--transition-slow'
  | '--radius-sm'
  | '--radius-md'
  | '--radius-lg'
  | '--radius-xl'
  | '--radius-2xl'
  | '--spacing-header'
  | '--spacing-section'
  | '--header-bg'
  | '--header-border'
  | '--header-shadow';

export type Theme = 'light' | 'dark';