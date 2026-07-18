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
  );
}
