'use client';

import Link from 'next/link';
import { useState, ViewTransition } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { CATEGORIES, type BlogEntry, type Category } from '~/lib/blog';
import { cn } from '~/lib/utils';

type Filter = Category | 'all';

function EntryBody({ entry }: { entry: BlogEntry }) {
  return (
    <>
      <div className="text-foreground/50 flex items-center gap-2 font-sans text-xs">
        <span>{entry.date}</span>
        <span className="flex items-center gap-2">
          {entry.category.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {entry.slug ? (
          <ViewTransition name={`post-title-${entry.slug}`} default="none" share="morph">
            <span>{entry.title}</span>
          </ViewTransition>
        ) : (
          <span>{entry.title}</span>
        )}
        {entry.kind === 'post' ? (
          <ArrowRight className="size-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        ) : (
          <ArrowUpRight className="size-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </div>
      {entry.subTitle ? (
        <span className="text-foreground/60 mt-1 text-xs">{entry.subTitle}</span>
      ) : null}
    </>
  );
}

export function BlogList({ entries }: { entries: BlogEntry[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const usedCategories = CATEGORIES.filter((category) =>
    entries.some((entry) => entry.category.includes(category)),
  );
  const filtered =
    filter === 'all' ? entries : entries.filter((entry) => entry.category.includes(filter));

  return (
    <div className="flex flex-col gap-10 px-4 sm:px-0">
      <StaggerReveal className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs">
        {(['all', ...usedCategories] as Filter[]).map((category) => (
          <StaggerItem key={category}>
            <button
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={cn(
                'transition-opacity hover:opacity-60',
                filter === category ? 'underline-dotted' : 'text-foreground/50',
              )}
            >
              {category}
            </button>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <StaggerReveal key={filter} className="flex flex-col gap-8" delay={0.1}>
        {filtered.map((entry) => (
          <StaggerItem
            key={entry.href}
            className="group font-serif transition-opacity duration-300 hover:opacity-60"
          >
            {entry.kind === 'post' ? (
              <Link href={entry.href} className="flex flex-col gap-1">
                <EntryBody entry={entry} />
              </Link>
            ) : (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1"
              >
                <EntryBody entry={entry} />
              </a>
            )}
          </StaggerItem>
        ))}
      </StaggerReveal>
    </div>
  );
}
