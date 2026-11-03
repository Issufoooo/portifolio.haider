import { gsap, SplitText } from './gsap';

// ============================================================
// GSAP SplitText — revelação de texto linha a linha, com máscara.
// Cada linha sobe de dentro de uma "janela" (overflow clip), por isso
// o texto parece nascer do nada em vez de apenas fazer fade.
// Usa autoSplit: se o ecrã mudar de largura (ou a fonte carregar),
// o texto é re-dividido e a animação é reaplicada sem saltos.
// ============================================================

type Options = {
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Se true, só corre quando o elemento entra no ecrã. */
  onScroll?: boolean;
  start?: string;
};

export function splitReveal(el: Element, opts: Options = {}) {
  const { delay = 0, duration = 1, stagger = 0.09, onScroll = false, start = 'top 88%' } = opts;

  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    linesClass: 'split-line',
    onSplit(self) {
      // As máscaras cortam acentos e descendentes — damos-lhes folga.
      self.masks.forEach((m) => {
        const h = m as HTMLElement;
        h.style.paddingBlock = '0.16em';
        h.style.marginBlock = '-0.16em';
      });
      return gsap.from(self.lines, {
        yPercent: 115,
        duration,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: onScroll ? { trigger: el, start, once: true } : undefined,
      });
    },
  });
}
