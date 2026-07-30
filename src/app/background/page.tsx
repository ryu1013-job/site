import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { ExperienceItem } from '../_components/experience-item';
import { Links } from '../_components/links';
import { EXPERIENCES } from '../_data/background';
import { Socials } from '../_components/socials';

const BackgroundPage = () => {
    return (
        <>
            <Links />
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 py-16 sm:gap-12">
                <div className="flex items-center gap-2 px-4 sm:px-0">
                    <ViewTransition name="profile-avatar" default="none" share="morph">
                        <Link href="/" className="size-10 overflow-hidden rounded-[50%] [corner-shape:squircle]">
                            <Image src="/icon-2.webp" alt="" width={56} height={56} />
                        </Link>
                    </ViewTransition>
                    <StaggerReveal>
                        <StaggerItem className="font-serif">
                            <h2 className="text-base">History</h2>
                        </StaggerItem>
                    </StaggerReveal>
                </div>

                <StaggerReveal className="flex flex-col gap-10 px-4 sm:gap-12 sm:px-0" delay={0.15}>
                    {EXPERIENCES.map((experience) => (
                        <StaggerItem key={experience.company.name}>
                            <ExperienceItem experience={experience} />
                        </StaggerItem>
                    ))}
                </StaggerReveal>

                <StaggerReveal  delay={1}>
                    <StaggerItem className="flex flex-col items-center gap-8 py-6 font-sans">
                        <Socials />
                        <Link href="/" className="underline-dotted text-sm hover:opacity-70">
                            Back to Home
                        </Link>
                    </StaggerItem>
                </StaggerReveal>
            </div>
        </>
    );
};

export default BackgroundPage;
