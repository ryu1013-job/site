import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ViewTransition } from 'react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { parseDate } from '~/lib/blog';
import { getPost, getPosts } from '~/lib/posts';

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPost(slug);

  return {
    title: meta.title,
    description: meta.subTitle,
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.subTitle,
      publishedTime: parseDate(meta.date).toISOString(),
      authors: ['ryu'],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.subTitle,
    },
  };
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { Content, meta } = await getPost(slug);

  return (
    <>
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ViewTransition name="profile-avatar" default="none" share="morph">
            <Link
              href="/blog"
              className="size-10 overflow-hidden rounded-[50%] [corner-shape:squircle]"
            >
              <Image src="/icon-3.webp" alt="" width={56} height={56} />
            </Link>
          </ViewTransition>
          <StaggerReveal>
            <StaggerItem className="text-foreground/60 font-sans text-xs">
              <time dateTime={parseDate(meta.date).toISOString()}>{meta.date}</time>
            </StaggerItem>
          </StaggerReveal>
        </div>
        <StaggerReveal className="flex flex-col gap-3" delay={0.1}>
          <StaggerItem>
            <h1 className="font-serif text-2xl">{meta.title}</h1>
          </StaggerItem>
          {meta.subTitle ? (
            <StaggerItem className="text-foreground/60 font-serif text-sm">
              {meta.subTitle}
            </StaggerItem>
          ) : null}
        </StaggerReveal>
      </header>

      <StaggerReveal delay={0.15}>
        <StaggerItem>
          <article>
            <Content />
          </article>
        </StaggerItem>
      </StaggerReveal>
    </>
  );
};

export default BlogPostPage;
