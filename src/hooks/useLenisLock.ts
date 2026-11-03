import { useEffect } from 'react';
import { lockScroll, unlockScroll } from '../lib/scroll';

/** Pára o scroll suave da página enquanto um modal está aberto. */
export function useLenisLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return () => unlockScroll();
  }, [active]);
}
