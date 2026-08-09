'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlurCrossfade } from '~/components/motion/blur-crossfade';
import { isExternalHref } from '~/lib/href';
import type { Slide } from '../_data/slides';

type SlideLinkProps = {
  index: number;
  slide: Slide;
};

export function SlideLink({ index, slide }: SlideLinkProps) {
  const external = isExternalHref(slide.href);

  return (
    <Link
      href={slide.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex flex-col gap-3"
    >
      <div className="text grid min-w-0 font-serif tracking-wide">
        <BlurCrossfade itemKey={index} as="p" className="col-start-1 row-start-1">
          {slide.subtitle}
        </BlurCrossfade>
      </div>
      <div className="text-foreground/60 group-hover:text-foreground grid font-serif text-sm tracking-wide transition-colors">
        <BlurCrossfade itemKey={index} as="span" className="col-start-1 row-start-1 font-sans">
          {slide.label}{' '}
          <ArrowRight className="inline-block size-4 transition-transform group-hover:translate-x-1" />
        </BlurCrossfade>
      </div>
    </Link>
  );
}
