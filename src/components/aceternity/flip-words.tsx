import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

// ============================================================
// Aceternity UI — Flip Words
// Troca de palavras letra a letra (blur + spring).
// Adaptado: reserva a largura da palavra mais longa (o título não
// "salta" a cada troca) e é invisível para leitores de ecrã
// (aria-hidden + texto alternativo estático).
// ============================================================

export const FlipWords = ({
  words,
  duration = 2800,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  const startAnimation = useCallback(() => {
    const next = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(next);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (isAnimating) return;
    const t = setTimeout(startAnimation, duration);
    return () => clearTimeout(t);
  }, [isAnimating, duration, startAnimation]);

  return (
    <span className="relative inline-block align-baseline">
      <span className="sr-only">{words.join(', ')}</span>
      {/* sizer invisível: fixa a largura */}
      <span className="invisible inline-block" aria-hidden="true">
        {longest}
      </span>
      <span className="absolute inset-0 whitespace-nowrap text-left" aria-hidden="true">
        <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
          <motion.span
            key={currentWord}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            exit={{
              opacity: 0,
              y: -40,
              x: 40,
              filter: 'blur(8px)',
              scale: 2,
              position: 'absolute',
            }}
            className={cn('relative z-10 inline-block text-left', className)}
          >
            {currentWord.split('').map((letter, i) => (
              <motion.span
                key={currentWord + i}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};
