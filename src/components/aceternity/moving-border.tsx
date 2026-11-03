import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { cn } from '@/lib/utils';

// ============================================================
// Aceternity UI — Moving Border
// Um ponto de luz percorre o contorno do botão.
// Adaptado: renderiza como <a> ou <button>, cores da paleta,
// e pára se o utilizador pediu "reduzir movimento".
// ============================================================

type MovingBorderButtonProps = {
  as?: 'a' | 'button';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  borderRadius?: string;
  duration?: number;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function MovingBorderButton({
  as = 'button',
  borderRadius = '0.9rem',
  duration = 3200,
  className,
  containerClassName,
  children,
  ...rest
}: MovingBorderButtonProps) {
  const Component = as as React.ElementType;
  return (
    <Component
      className={cn(
        'relative inline-flex overflow-hidden bg-transparent p-[1.5px] no-underline',
        containerClassName
      )}
      style={{ borderRadius }}
      {...rest}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className="h-20 w-20 opacity-90 bg-[radial-gradient(#60A5FA_40%,transparent_60%)]" />
        </MovingBorder>
      </div>
      <div
        className={cn(
          'relative flex w-full items-center justify-center gap-2.5 border border-primary/20 bg-[#0B1A30]/90 px-8 py-4 text-base font-semibold text-gray-100 backdrop-blur-xl',
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);
  const reduce = useReducedMotion();

  useAnimationFrame((time) => {
    if (reduce) return;
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).x ?? 0);
  const y = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: 'absolute', top: 0, left: 0, display: 'inline-block', transform }}>
        {children}
      </motion.div>
    </>
  );
};
