'use client';

import { TextAnimate } from '~/components/ui/text-animate';
import { SLIDES, SLIDE_ROTATE_MS } from '../_data/slides';
import { useRotatingIndex } from '../_hooks/use-rotating-index';
import { SlideAvatar } from './slide-avatar';
import { SlideLink } from './slide-link';

export function ProfileHero() {
  const index = useRotatingIndex(SLIDES.length, SLIDE_ROTATE_MS);
  const slide = SLIDES[index];

  return (
    <section className="mt-[calc(100vh/4)] w-full">
      <div className="grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_1fr] sm:items-start sm:gap-0 sm:pr-14">
        <SlideAvatar index={index} src={slide.image} />
        <div className="flex min-w-0 flex-col gap-2 text-center sm:pl-2 sm:text-left">
          <h1 className="text-5xl">
            ryu
          </h1>
          <SlideLink index={index} slide={slide} />
        </div>
      </div>
    </section>
  );
}
