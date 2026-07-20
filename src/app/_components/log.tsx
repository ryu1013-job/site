'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Marker, MarkerContent } from '~/components/ui/marker';
import { LOG_ITEMS } from '../_data/log';

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Log() {
  return (
    <div>
      <Marker variant="separator" className="px-2">
        <MarkerContent className="font-sans text-xs">Log</MarkerContent>
      </Marker>
      <motion.div
        className="flex flex-col gap-8 px-8 py-10"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {LOG_ITEMS.map((item) => (
          <motion.a
            key={`${item.date}-${item.title}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group flex flex-col gap-2 transition-opacity duration-100 hover:opacity-50"
          >
            <div className="flex items-center gap-2 font-sans text-xs">
              <span>{item.date}</span>
              <span className="text-foreground/60">{item.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-serif">{item.title}</p>
              <ArrowUpRight className="size-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            {'subTitle' in item && item.subTitle ? (
              <p className="text-foreground/60 font-serif text-xs">{item.subTitle}</p>
            ) : null}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
