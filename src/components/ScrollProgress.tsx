import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

// MOTION — barra fina de progresso de leitura no topo da página.
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #3B82F6, #93C5FD)' }}
    />
  );
};

export default ScrollProgress;
