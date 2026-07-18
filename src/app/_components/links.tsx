'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, ViewTransition } from 'react';
import { cn } from '~/lib/utils';
import type { AnimatedIconHandle } from '~/components/ui/types';
import BookIcon from '~/components/ui/book-icon';
import HeartIcon from '~/components/ui/heart-icon';
import SaveIcon from '~/components/ui/save-icon';

type IconComponent = typeof HeartIcon | typeof SaveIcon | typeof BookIcon;

const NAV_ITEMS: {
  href: string;
  label: string;
  icon: IconComponent;
  hoverColor: string;
  activeColor: string;
}[] = [
  {
    href: '/about',
    label: 'About',
    icon: HeartIcon,
    hoverColor: 'group-hover:text-rose-500',
    activeColor: 'text-rose-500',
  },
  {
    href: '/background',
    label: 'Background',
    icon: SaveIcon,
    hoverColor: 'group-hover:text-violet-500',
    activeColor: 'text-violet-500',
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: BookIcon,
    hoverColor: 'group-hover:text-amber-500',
    activeColor: 'text-amber-500',
  },
];

function NavLink({
  href,
  label,
  icon: Icon,
  hoverColor,
  activeColor,
  isActive,
}: {
  href: string;
  label: string;
  icon: IconComponent;
  hoverColor: string;
  activeColor: string;
  isActive: boolean;
}) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <Link
      href={isActive ? '/' : href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-1 px-4 py-1 transition-colors hover:underline',
        isActive && 'underline',
      )}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <Icon
        ref={iconRef}
        size={18}
        className={cn('transition-colors', hoverColor, isActive && activeColor)}
      />
      <span className="font-sans">{label}</span>
    </Link>
  );
}

export function Links() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 w-full">
      <ViewTransition name="site-nav" default="none" share="morph">
        <nav className="mx-auto flex w-full max-w-2xl justify-center divide-x divide-border overflow-hidden rounded bg-background/50 py-2 text-sm backdrop-blur-sm">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              isActive={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              }
            />
          ))}
        </nav>
      </ViewTransition>
    </div>
  );
}
