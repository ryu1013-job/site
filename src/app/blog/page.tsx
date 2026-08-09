import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { Links } from '../_components/links';
import { BLOG_ITEMS, isOffsiteBlogHref } from '../_data/blog';
import { Socials } from '../_components/socials';

const BlogPage = () => {
    return (
        <>
            <Links />
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-16 sm:gap-12">
                <div className="flex items-center gap-2 px-4 sm:px-0">
                    <ViewTransition name="profile-avatar" default="none" share="morph">
                        <Link href="/" className="size-10 overflow-hidden rounded-[50%] [corner-shape:squircle]">
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
                        const offsite = isOffsiteBlogHref(item.href);
                        const external = item.href.startsWith('http');

                        return (
                        <StaggerItem
                            key={item.href}
                            className="group font-serif transition-opacity duration-300 hover:opacity-60"
                        >
                            {offsite ? (
                                <a
                                    href={item.href}
                                    target={external ? '_blank' : undefined}
                                    rel={external ? 'noopener noreferrer' : undefined}
                                    className="flex flex-col gap-1"
                                >
                                    <span className="font-sans text-xs text-foreground/60">{item.date}</span>
                                    <div className="flex items-center gap-1">
                                        <span>{item.title}</span>
                                        {external ? (
                                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        ) : (
                                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        )}
                                    </div>
                                    {'subTitle' in item && item.subTitle ? (
                                        <span className="mt-1 text-xs text-foreground/60">{item.subTitle}</span>
                                    ) : null}
                                </a>
                            ) : (
                                <Link href={item.href} className="flex flex-col gap-1">
                                    <span className="font-sans text-xs text-foreground/50">{item.date}</span>
                                    <div className="flex items-center gap-1">
                                        <span>{item.title}</span>
                                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                    {'subTitle' in item && item.subTitle ? (
                                        <span className="mt-1 text-xs text-foreground/60">{item.subTitle}</span>
                                    ) : null}
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
