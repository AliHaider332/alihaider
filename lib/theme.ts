// lib/theme.ts
import { CSSVariable } from '@/types';

export const getCSSVariable = (variableName: CSSVariable): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};

export const themeColors = {
  primary: 'var(--color-primary)',
  primaryDark: 'var(--color-primary-dark)',
  primaryLight: 'var(--color-primary-light)',
  primaryBg: 'var(--color-primary-bg)',
  secondary: 'var(--color-secondary)',
  secondaryLight: 'var(--color-secondary-light)',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  background: 'var(--color-background)',
  backgroundSecondary: 'var(--color-background-secondary)',
  backgroundTertiary: 'var(--color-background-tertiary)',
  border: 'var(--color-border)',
  borderHover: 'var(--color-border-hover)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
} as const;

export const getThemeColors = () => {
  if (typeof window === 'undefined') return themeColors;
  const styles = getComputedStyle(document.documentElement);
  return {
    primary: styles.getPropertyValue('--color-primary').trim(),
    primaryDark: styles.getPropertyValue('--color-primary-dark').trim(),
    primaryLight: styles.getPropertyValue('--color-primary-light').trim(),
    primaryBg: styles.getPropertyValue('--color-primary-bg').trim(),
    secondary: styles.getPropertyValue('--color-secondary').trim(),
    secondaryLight: styles.getPropertyValue('--color-secondary-light').trim(),
    text: styles.getPropertyValue('--color-text-primary').trim(),
    textSecondary: styles.getPropertyValue('--color-text-secondary').trim(),
    textMuted: styles.getPropertyValue('--color-text-muted').trim(),
    background: styles.getPropertyValue('--color-background').trim(),
    backgroundSecondary: styles.getPropertyValue('--color-background-secondary').trim(),
    backgroundTertiary: styles.getPropertyValue('--color-background-tertiary').trim(),
    border: styles.getPropertyValue('--color-border').trim(),
    borderHover: styles.getPropertyValue('--color-border-hover').trim(),
    success: styles.getPropertyValue('--color-success').trim(),
    warning: styles.getPropertyValue('--color-warning').trim(),
    error: styles.getPropertyValue('--color-error').trim(),
    info: styles.getPropertyValue('--color-info').trim(),
  };
};