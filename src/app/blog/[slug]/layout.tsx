import Link from 'next/link';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { Links } from '../../_components/links';
import { Socials } from '../../_components/socials';

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Links />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-0">
        {children}
        <StaggerReveal delay={0.6}>
          <StaggerItem className="flex flex-col items-center gap-8 py-6 font-sans">
            <Socials />
            <p className="flex items-center gap-2 text-sm">
              <Link href="/" className="underline hover:opacity-70">
                Home
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/blog" className="underline hover:opacity-70">
                Blog
              </Link>
            </p>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </>
  );
}
