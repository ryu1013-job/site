'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 8 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function StaggerReveal({
  children,
  className,
  delay = 0,
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'variants' | 'initial' | 'animate'>;

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div className={cn(className)} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}
