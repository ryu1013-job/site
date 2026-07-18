'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';

export const BLUR_TRANSITION = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1],
} as const;

const motionTags = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
} as const;

type BlurCrossfadeProps = {
  itemKey: string | number;
  children: ReactNode;
  className?: string;
  as?: keyof typeof motionTags;
};

export function BlurCrossfade({ itemKey, children, className, as = 'div' }: BlurCrossfadeProps) {
  const Component = motionTags[as];

  return (
    <AnimatePresence initial={false}>
      <Component
        key={itemKey}
        className={className}
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(12px)' }}
        transition={BLUR_TRANSITION}
      >
        {children}
      </Component>
    </AnimatePresence>
  );
}
