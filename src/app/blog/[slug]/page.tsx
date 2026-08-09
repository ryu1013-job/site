import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ViewTransition } from 'react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { parseDate } from '~/lib/blog';
import { getPost, getPosts } from '~/lib/posts';
import { SITE_DESCRIPTION, SITE_URL } from '~/lib/site';
import { Links } from '../../_components/links';
import { Socials } from '../../_components/socials';

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
  const description = meta.subTitle ?? SITE_DESCRIPTION;

  return {
    title: meta.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: meta.title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: parseDate(meta.date).toISOString(),
    },
  };
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { Content, meta } = await getPost(slug);

  return (
    <>
      <Links />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-0">
        <header className="flex flex-col gap-6">
          <ViewTransition name="profile-avatar" default="none" share="morph">
            <Link
              href="/blog"
              className="size-10 overflow-hidden rounded-[50%] [corner-shape:squircle]"
            >
              <Image src="/icon-3.webp" alt="" width={56} height={56} />
            </Link>
          </ViewTransition>
          <StaggerReveal className="flex flex-col gap-3">
            <StaggerItem className="text-foreground/60 flex items-center gap-3 font-sans text-xs">
              <time dateTime={parseDate(meta.date).toISOString()}>{meta.date}</time>
              <span className="flex items-center gap-2">
                {meta.category.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </span>
            </StaggerItem>
            <StaggerItem>
              <ViewTransition name={`post-title-${slug}`} default="none" share="morph">
                <h1 className="font-serif text-2xl">{meta.title}</h1>
              </ViewTransition>
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
};

export default BlogPostPage;
