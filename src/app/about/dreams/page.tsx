import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ViewTransition } from 'react';
import { Check } from 'lucide-react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { cn } from '~/lib/utils';
import { Links } from '../../_components/links';
import { Socials } from '../../_components/socials';
import { DREAM_AGES, formatAge, type Dream } from '../../_data/dreams';

export const metadata: Metadata = {
  title: 'Dreams — ryu',
  description: '歳ごとの夢と意図',
};

function DreamLine({ dream }: { dream: Dream }) {
  const done = dream.done === true;

  return (
    <li className="flex items-start gap-1.5">
      {done ? (
        <Check
          aria-hidden
          className="mt-px size-3.5 shrink-0 text-green-500"
          strokeWidth={2.5}
        />
      ) : (
        <span aria-hidden="true" className="shrink-0">
          -
        </span>
      )}
      <span className={cn(done && 'text-foreground/50 line-through decoration-foreground/30')}>
        {dream.title}
      </span>
      {done ? <span className="sr-only">（達成）</span> : null}
    </li>
  );
}

function DreamAgeItem({ age, dreams }: { age: number; dreams: Dream[] }) {
  return (
    <div className="flex flex-col gap-3 font-serif">
      <div className="font-sans text-xs tabular-nums">{formatAge(age)}</div>
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
