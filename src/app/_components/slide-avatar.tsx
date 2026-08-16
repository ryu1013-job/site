'use client';

import Image from 'next/image';
import { ViewTransition } from 'react';
import { BlurCrossfade } from '~/components/motion/blur-crossfade';

type SlideAvatarProps = {
  index: number;
  src: string;
};

export function SlideAvatar({ index, src }: SlideAvatarProps) {
  return (
    <div className="flex justify-center pt-1 sm:justify-end sm:pr-2">
      <div className="relative">
        <div className="pointer-events-none absolute bottom-full left-[-2px] z-10 mb-px">
          <div className="relative">
            <p className="rounded-[14px] bg-foreground px-3 py-[7px] font-sans text-xs leading-none whitespace-nowrap text-background">
              I'm both.
            </p>
            <span
              aria-hidden
              className="absolute -bottom-[7px] left-[10px] size-[18px] rounded-full bg-foreground"
            />
          </div>
          <span
            aria-hidden
            className="mt-[9px] ml-[24px] block size-2 rounded-full bg-foreground"
          />
          <span
            aria-hidden
            className="mt-[2px] ml-[32px] block size-[5px] rounded-full bg-foreground"
          />
        </div>
        <ViewTransition
          name="profile-avatar"
          default="none"
          share="morph"
        >
          <div className="relative size-20 overflow-hidden rounded-[50%] [corner-shape:squircle]">
            <BlurCrossfade itemKey={index} className="absolute inset-0">
              <Image src={src} alt="" width={80} height={80} />
            </BlurCrossfade>
          </div>
        </ViewTransition>
      </div>
    </div>
  );
}
