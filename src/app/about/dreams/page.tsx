import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ViewTransition } from 'react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { cn } from '~/lib/utils';
import { Links } from '../../_components/links';
import { Socials } from '../../_components/socials';
import {
  DREAM_AGES,
  formatAge,
  type Dream,
  type DreamStatus,
} from '../../_data/dreams';

export const metadata: Metadata = {
  title: 'Dreams — ryu',
  description: '歳ごとの夢と意図',
};

function statusLabel(status: DreamStatus | undefined) {
  if (status === 'done') return '達成';
  if (status === 'carried') return '持ち越し';
  return null;
}

function DreamLine({ dream }: { dream: Dream }) {
  const label = statusLabel(dream.status);
  const isDone = dream.status === 'done';

  return (
    <li
      className={cn(
        'flex flex-col gap-1',
        isDone && 'text-foreground/50',
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span>
          <span aria-hidden="true">- </span>
          <span className={cn(isDone && 'line-through decoration-foreground/25')}>
            {dream.title}
          </span>
        </span>
        {label ? (
          <span className="font-sans text-xs text-foreground/50">{label}</span>
        ) : null}
      </div>
      {dream.note ? (
        <p className="text-foreground/60 pl-[0.75em] text-xs">{dream.note}</p>
      ) : null}
    </li>
  );
}

function DreamAgeItem({
  age,
  theme,
  dreams,
}: {
  age: number;
  theme?: string;
  dreams: Dream[];
}) {
  return (
    <div className="flex flex-col gap-3 font-serif">
      <div className="flex w-fit flex-wrap items-center gap-2 font-sans text-xs tabular-nums">
        <span>{formatAge(age)}</span>
        {theme ? <span className="text-foreground/50">{theme}</span> : null}
      </div>
      <ul className="flex flex-col gap-2 text-xs/5 text-foreground/90">
        {dreams.map((dream) => (
          <DreamLine key={dream.title} dream={dream} />
        ))}
      </ul>
    </div>
  );
}

const DreamsPage = () => {
  return (
    <>
      <Links />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 py-16 sm:gap-12">
        <div className="flex items-center gap-2 px-4 sm:px-0">
          <ViewTransition name="profile-avatar" default="none" share="morph">
            <Link
              href="/"
              className="size-10 overflow-hidden rounded-[50%] [corner-shape:squircle]"
            >
              <Image src="/icon-1.webp" alt="" width={56} height={56} />
            </Link>
          </ViewTransition>
          <StaggerReveal>
            <StaggerItem className="font-serif">
              <h2 className="text-base">Dreams</h2>
            </StaggerItem>
          </StaggerReveal>
        </div>

        <StaggerReveal
          className="flex flex-col gap-10 px-4 sm:gap-12 sm:px-0"
          delay={0.15}
        >
          {DREAM_AGES.map((entry) => (
            <StaggerItem key={entry.age} id={`age-${entry.age}`}>
              <DreamAgeItem {...entry} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        <StaggerReveal delay={1}>
          <StaggerItem className="flex flex-col items-center gap-8 py-6 font-sans">
            <Socials />
            <Link href="/about" className="underline-dotted text-sm hover:opacity-70">
              Back to About
            </Link>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </>
  );
};

export default DreamsPage;
