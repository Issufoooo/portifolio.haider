import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

// ============================================================
// SCROLL — Lenis (smooth scroll) sincronizado com o GSAP ScrollTrigger.
// Um único "relógio": o ticker do GSAP faz avançar o Lenis.
// ============================================================

let lenis: Lenis | null = null;
let locks = 0;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScroll(): () => void {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Bloqueia o scroll da página (modais, menu mobile). Seguro para chamadas aninhadas. */
export function lockScroll() {
  locks += 1;
  if (locks === 1) lenis?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) lenis?.start();
}

/** Scroll suave para um seletor (#id) ou elemento. Cai para o nativo se o Lenis não estiver ativo. */
export function scrollToTarget(target: string | HTMLElement, offset = -72) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

// Estado partilhado entre o GSAP (ScrollTrigger) e a cena 3D do Hero.
// O R3F lê isto dentro do useFrame — sem re-renders do React.
export const heroState = {
  scroll: 0, // 0 → 1 enquanto o Hero sai do ecrã
  pointerX: 0, // -1 → 1
  pointerY: 0, // -1 → 1
};
