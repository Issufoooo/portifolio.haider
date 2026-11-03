import type { RefObject } from 'react';
import { gsap } from '../lib/gsap';
import { splitReveal } from '../lib/splitReveal';
import { useGsapContext } from './useGsapContext';

/**
 * Cabeçalho de secção com a mesma assinatura em todo o site:
 *   [data-split] → o título sobe linha a linha, de dentro de uma máscara
 *   [data-fade]  → rótulo e texto de apoio entram com um fade curto
 */
export function useHeaderReveal(ref: RefObject<HTMLElement>) {
  useGsapContext(ref, () => {
    const root = ref.current;
    if (!root) return;
    const title = root.querySelector('[data-split]');
    const fades = root.querySelectorAll('[data-fade]');
    const split = title ? splitReveal(title, { onScroll: true }) : null;

    if (fades.length) {
      gsap.from(fades, {
        y: 14,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 88%', once: true },
      });
    }
    return () => split?.revert();
  }, []);
}
