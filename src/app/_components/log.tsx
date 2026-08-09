'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Marker, MarkerContent } from '~/components/ui/marker';
import { isExternalHref } from '~/lib/href';
import { LOG_ITEMS } from '../_data/log';

const MotionLink = motion.create(Link);

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

const ITEM_CLASS_NAME =
  'group flex flex-col gap-2 transition-opacity duration-100 hover:opacity-50';

function LogItemBody({ item, external }: { item: (typeof LOG_ITEMS)[number]; external: boolean }) {
  return (
    <>
      <div className="flex items-center gap-2 font-sans text-xs">
        <span>{item.date}</span>
        <span className="text-foreground/60">{item.category}</span>
      </div>
      <div className="flex items-center gap-1">
        <p className="font-serif">{item.title}</p>
        {external ? (
          <ArrowUpRight className="size-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowRight className="size-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </div>
      {'subTitle' in item && item.subTitle ? (
        <p className="text-foreground/60 font-serif text-xs">{item.subTitle}</p>
      ) : null}
    </>
  );
}

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
        {LOG_ITEMS.map((item) => {
          const external = isExternalHref(item.href);
          const key = `${item.date}-${item.title}`;

          return external ? (
            <motion.a
              key={key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className={ITEM_CLASS_NAME}
            >
              <LogItemBody item={item} external />
            </motion.a>
          ) : (
            <MotionLink
              key={key}
              href={item.href}
              variants={itemVariants}
              className={ITEM_CLASS_NAME}
            >
              <LogItemBody item={item} external={false} />
            </MotionLink>
          );
        })}
      </motion.div>
    </div>
  );
}
