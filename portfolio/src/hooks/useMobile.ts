import { useEffect, useState } from 'react';

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);

    // Sync on mount
    setIsMobile(mql.matches);

    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}
