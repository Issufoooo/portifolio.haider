import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Cria animações GSAP com limpeza automática e respeito por
 * `prefers-reduced-motion`. Se o utilizador pediu menos movimento,
 * `setup` NÃO corre — o conteúdo fica simplesmente visível.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement>,
  setup: () => void | (() => void),
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope.current ?? undefined);
    mm.add('(prefers-reduced-motion: no-preference)', () => setup());
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
