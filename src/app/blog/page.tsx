import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { Links } from '../_components/links';
import { BLOG_ITEMS } from '../_data/blog';
import { Socials } from '../_components/socials';

const BlogPage = () => {
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

        <StaggerReveal className="flex flex-col gap-8 px-4 sm:px-0" delay={0.15}>
          {BLOG_ITEMS.map((item) => {
            const external = item.href.startsWith('https');
            const body = (
              <>
                <div
                  className={`flex items-center gap-2 font-sans text-xs ${external ? 'text-foreground/60' : 'text-foreground/50'}`}
                >
                  <span>{item.date}</span>
                  {item.category.includes('talk') ? <span>Talk</span> : null}
                </div>
                <div className="flex items-center gap-1">
                  <span>{item.title}</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                {'subTitle' in item && item.subTitle ? (
                  <span className="text-foreground/60 mt-1 text-xs">{item.subTitle}</span>
                ) : null}
              </>
            );

            return (
              <StaggerItem
                key={item.title}
                className="group font-serif transition-opacity duration-300 hover:opacity-60"
              >
                {external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1"
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={item.href} className="flex flex-col gap-1">
                    {body}
                  </Link>
                )}
              </StaggerItem>
            );
          })}
        </StaggerReveal>

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
