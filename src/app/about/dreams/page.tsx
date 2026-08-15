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
  description: 'Dreams and intentions by age.',
};

function statusLabel(status: DreamStatus | undefined) {
  if (status === 'done') return 'done';
  if (status === 'carried') return 'carried';
  return null;
}

function DreamLine({ dream }: { dream: Dream }) {
  const label = statusLabel(dream.status);
  const isDone = dream.status === 'done';

  return (
    <li
      className={cn(
        'flex flex-col gap-1 border-l border-foreground/10 pl-4',
        isDone && 'text-foreground/45',
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className={cn(isDone && 'line-through decoration-foreground/25')}>
          {dream.title}
        </span>
        {label ? (
          <span className="font-sans text-[11px] tracking-wide text-foreground/35 lowercase">
            {label}
          </span>
        ) : null}
      </div>
      {dream.note ? (
        <p className="text-xs/5 text-foreground/50">{dream.note}</p>
      ) : null}
    </li>
  );
}

const DreamsPage = () => {
  return (
    <>
      <Links />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-14 px-4 py-16 sm:gap-16 sm:px-0">
        <header className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <ViewTransition name="profile-avatar" default="none" share="morph">
              <Link
                href="/"
                className="relative size-10 overflow-hidden rounded-[50%] [corner-shape:squircle]"
              >
                <Image src="/icon-1.webp" alt="" width={56} height={56} />
              </Link>
            </ViewTransition>
            <StaggerReveal>
              <StaggerItem className="font-serif">
                <h1 className="text-base">Dreams</h1>
              </StaggerItem>
            </StaggerReveal>
          </div>

          <StaggerReveal className="flex flex-col gap-4" delay={0.08}>
            <StaggerItem>
              <p className="font-serif text-sm/7 text-foreground/70">
                What I hope for at each age — quiet intentions, not a plan.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-sans text-xs text-foreground/45">
                <Link href="/about" className="underline-dotted hover:opacity-70">
                  About
                </Link>
                <span className="mx-1.5 text-foreground/25">/</span>
                <span>Dreams</span>
              </p>
            </StaggerItem>
          </StaggerReveal>

          <StaggerReveal delay={0.12}>
            <StaggerItem>
              <nav
                aria-label="Ages"
                className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-xs tabular-nums text-foreground/50"
              >
                {DREAM_AGES.map((entry) => (
                  <a
                    key={entry.age}
                    href={`#age-${entry.age}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {formatAge(entry.age)}
                  </a>
                ))}
              </nav>
            </StaggerItem>
          </StaggerReveal>
        </header>

        <StaggerReveal className="flex flex-col gap-16" delay={0.18}>
          {DREAM_AGES.map((entry) => (
            <StaggerItem key={entry.age}>
              <section
                id={`age-${entry.age}`}
                className="scroll-mt-20 flex flex-col gap-6 font-serif"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="font-sans text-3xl tabular-nums tracking-tight text-foreground/90 sm:text-4xl">
                    {formatAge(entry.age)}
                  </h2>
                  {entry.theme ? (
                    <p className="text-sm/6 text-foreground/55">{entry.theme}</p>
                  ) : null}
                </div>

                <ul className="flex flex-col gap-5 text-sm/7">
                  {entry.dreams.map((dream) => (
                    <DreamLine key={dream.title} dream={dream} />
                  ))}
                </ul>
              </section>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <StaggerReveal delay={0.4}>
          <StaggerItem className="flex flex-col items-center gap-8 py-6 font-sans">
            <Socials />
            <div className="flex flex-col items-center gap-3 text-sm">
              <Link href="/about" className="underline hover:opacity-70">
                Back to About
              </Link>
              <Link href="/" className="text-foreground/50 underline hover:opacity-70">
                Back to Home
              </Link>
            </div>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </>
  );
};

export default DreamsPage;
