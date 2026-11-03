import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/scroll';

// ============================================================
// Vídeo que só toca quando está visível no ecrã.
// Os teus dois vídeos têm ~15 MB cada — assim só descarregam os
// metadados no início e só reproduzem quando o utilizador chega lá
// (poupa dados no telemóvel e CPU/bateria).
// ============================================================

const AutoplayVideo: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // necessário para o autoplay no iOS/Safari
    if (prefersReducedMotion()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
    />
  );
};

export default AutoplayVideo;
