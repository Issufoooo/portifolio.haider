import React, { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { heroState, prefersReducedMotion } from '@/lib/scroll';

// ============================================================
// Carrega a cena 3D só quando faz sentido:
//   ✓ ecrã ≥ 768px  ✓ sem "reduzir movimento"  ✓ WebGL disponível
//   ✓ depois do primeiro render (não atrasa o texto do Hero)
// O Three.js vive num chunk à parte (lazy) e só é descarregado aqui.
// Se algo falhar, o Hero continua a funcionar com o fundo CSS.
// ============================================================

const HeroScene = lazy(() => import('./HeroScene'));

class SceneBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canUseWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

const HeroBackdrop: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if (!canUseWebGL()) return;
    const t = window.setTimeout(() => setEnabled(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  // Desmonta a cena quando o Hero sai do ecrã (liberta GPU/memória/bateria)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Posição do rato → heroState (lido pelo R3F no useFrame)
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        heroState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
        heroState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 transition-opacity [transition-duration:1400ms] ease-out"
      style={{ opacity: ready ? 0.85 : 0 }}
    >
      {enabled && inView && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <div className="absolute inset-0">
              <HeroScene active={inView} onReady={() => setReady(true)} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
};

export default HeroBackdrop;
