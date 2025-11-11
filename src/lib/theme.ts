/**
 * Theme Management Utilities
 * Handles dark/light mode and RTL direction
 */

export type Theme = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';

const THEME_KEY = 'stafftract-theme';
const DIR_KEY = 'stafftract-dir';

/**
 * Get the current theme from localStorage or system preference
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored) return stored;
  
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'dark'; // Default to dark
}

/**
 * Set the theme and persist to localStorage
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

/**
 * Apply theme to DOM
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const body = document.body;
  
  if (theme === 'dark') {
    root.classList.add('dark');
    body.classList.add('dark');
  } else {
    root.classList.remove('dark');
    body.classList.remove('dark');
  }
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme(): Theme {
  const current = getTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/**
 * Get the current direction from localStorage
 */
export function getDirection(): Direction {
  if (typeof window === 'undefined') return 'ltr';
  
  const stored = localStorage.getItem(DIR_KEY) as Direction | null;
  return stored || 'ltr';
}

/**
 * Set the direction and persist to localStorage
 */
export function setDirection(dir: Direction): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(DIR_KEY, dir);
  applyDirection(dir);
}

/**
 * Apply direction to DOM
 */
export function applyDirection(dir: Direction): void {
  if (typeof window === 'undefined') return;
  
  document.documentElement.dir = dir;
  document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en';
}

/**
 * Toggle between LTR and RTL
 */
export function toggleDirection(): Direction {
  const current = getDirection();
  const next: Direction = current === 'ltr' ? 'rtl' : 'ltr';
  setDirection(next);
  return next;
}

/**
 * Initialize theme and direction on app load
 */
export function initializeTheme(): void {
  const theme = getTheme();
  const dir = getDirection();
  
  applyTheme(theme);
  applyDirection(dir);
}

/**
 * Listen for system theme changes
 */
export function watchSystemTheme(callback: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      const theme: Theme = e.matches ? 'dark' : 'light';
      applyTheme(theme);
      callback(theme);
    }
  };
  
  mediaQuery.addEventListener('change', handler);
  
  return () => mediaQuery.removeEventListener('change', handler);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get motion preference for animations
 */
export function getMotionPreference(): 'full' | 'reduced' {
  return prefersReducedMotion() ? 'reduced' : 'full';
}

/**
 * Hook-like function to use reduced motion in components
 */
export function useReducedMotion(): boolean {
  return prefersReducedMotion();
}

/**
 * Listen for motion preference changes
 */
export function watchMotionPreference(callback: (reduced: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handler);
  
  return () => mediaQuery.removeEventListener('change', handler);
}
