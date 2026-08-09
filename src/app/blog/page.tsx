import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ViewTransition } from 'react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { getBlogEntries } from '~/lib/posts';
import { BlogList } from '../_components/blog-list';
import { Links } from '../_components/links';
import { Socials } from '../_components/socials';

export const metadata: Metadata = {
  title: 'Blog',
  description: '書いたものと登壇の記録',
  alternates: { canonical: '/blog' },
};

const BlogPage = async () => {
  const entries = await getBlogEntries();

  return (
    <>
      <Links />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-16 sm:gap-12">
        <div className="flex items-center gap-2 px-4 sm:px-0">
          <ViewTransition name="profile-avatar" default="none" share="morph">
            <Link
              href="/"
              className="size-10 overflow-hidden rounded-[50%] [corner-shape:squircle]"
            >
              <Image src="/icon-3.webp" alt="" width={56} height={56} />
            </Link>
          </ViewTransition>
          <StaggerReveal>
            <StaggerItem className="font-serif">
              <h2 className="text-base">Blog</h2>
            </StaggerItem>
          </StaggerReveal>
        </div>

        <BlogList entries={entries} />

        <StaggerReveal delay={1}>
          <StaggerItem className="flex flex-col items-center gap-8 py-6 font-sans">
            <Socials />
            <Link href="/" className="text-sm underline hover:opacity-70">
              Back to Home
            </Link>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </>
  );
};

export default BlogPage;
