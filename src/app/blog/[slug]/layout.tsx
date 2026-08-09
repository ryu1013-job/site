import Link from 'next/link';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { Links } from '../../../_components/links';
import { Socials } from '../../../_components/socials';

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Links />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-0">
        {children}
        <StaggerReveal delay={0.6}>
          <StaggerItem className="flex flex-col items-center gap-8 py-6 font-sans">
            <Socials />
            <Link href="/blog" className="text-sm underline hover:opacity-70">
              Back to Blog
            </Link>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </>
  );
}
