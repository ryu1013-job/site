'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { AnimatedIconHandle } from '~/components/ui/types';
import GithubIcon from '~/components/ui/github-icon';
import LinkedinIcon from '~/components/ui/linkedin-icon';
import TwitterXIcon from '~/components/ui/twitter-x-icon';
import InstagramIcon from '~/components/ui/instagram-icon';

type IconComponent = typeof GithubIcon | typeof TwitterXIcon | typeof LinkedinIcon;

const SOCIAL_ITEMS: {
  href: string;
  label: string;
  icon: IconComponent;
}[] = [
  {
    href: 'https://github.com/ryu1013-job',
    label: 'GitHub',
    icon: GithubIcon,
  },
  {
    href: 'https://x.com/_ryu1013',
    label: 'X',
    icon: TwitterXIcon,
  },
  {
    href: 'https://www.linkedin.com/in/ryu1013',
    label: 'LinkedIn',
    icon: LinkedinIcon,
  },
  {
    href: 'https://www.instagram.com/ryut1013',
    label: 'Instagram',
    icon: InstagramIcon,
  },
];

function SocialLink({ href, label, icon: Icon }: (typeof SOCIAL_ITEMS)[number]) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-5 items-center justify-center"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <Icon ref={iconRef} size={20} className="block" />
    </Link>
  );
}

export function Socials() {
  return (
    <nav className="flex items-center justify-center gap-4" aria-label="Social links">
      {SOCIAL_ITEMS.map((item) => (
        <SocialLink key={item.href} {...item} />
      ))}
    </nav>
  );
}
