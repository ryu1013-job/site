import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { StaggerItem, StaggerReveal } from '~/components/motion/stagger-reveal';
import { Links } from '../_components/links';
import { Socials } from '../_components/socials';

const AboutPage = () => {
    return (
        <>
            <Links />
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-16 py-16 px-4 sm:px-0">
                <header className="flex flex-col gap-5">
                    <div className="relative mb-1 w-fit">
                        <div className="pointer-events-none absolute bottom-[calc(100%+2px)] left-[-10px] z-10 flex flex-col items-start">
                            <p className="rounded-2xl bg-foreground px-3 py-1.5 font-sans text-xs leading-none whitespace-nowrap text-background/90 shadow-sm">
                                I'm both.
                            </p>
                            <span
                                aria-hidden
                                className="mt-[3px] ml-[18px] size-1.5 rounded-full bg-foreground"
                            />
                        </div>
                        <ViewTransition name="profile-avatar" default="none" share="morph">
                            <Link href="/" className="relative block size-14 overflow-hidden rounded-[50%] [corner-shape:squircle]">
                                <Image src="/icon-1.webp" alt="" width={56} height={56} />
                            </Link>
                        </ViewTransition>
                    </div>
                    <StaggerReveal className="flex flex-col gap-5">
                        <StaggerItem>
                            <h1 className="text-4xl">ryu</h1>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="flex items-center gap-1 font-serif text-sm">
                                <span>Product Engineer</span>
                                <a
                                    href="https://product-recruit.timee.co.jp/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    @Timee
                                </a>
                            </p>
                        </StaggerItem>
                    </StaggerReveal>
                </header>

                <StaggerReveal className="flex flex-col gap-16" delay={0.15}>
                    <StaggerItem className="flex flex-col gap-6 font-serif text-sm/8">
                        <p>
                            I've loved making things since I was a kid, which is how I became an engineer. I find
                            value in being able to deliver what I've built to countless people with just a computer.
                        </p>
                        <p>
                            I'm not particularly good with people, but I do my best every day. I'd rather talk to
                            AI. I work fully remote and mostly stay at home.
                        </p>
                        <p>
                            I still enjoy exploring technology, but lately I've been more focused on building
                            products closer to the business side. Work is my hobby.
                        </p>
                    </StaggerItem>

                    <StaggerItem className="flex flex-col gap-6 font-serif">
                        <h2 className="text-lg">Mission</h2>
                        <div className="flex flex-col gap-6 text-sm/8">
                            <p className="text-base">"Bring happiness to the care industry"</p>
                            <p>
                                My near-term mission is to bring happiness to everyone involved in care — care
                                recipients, facility staff, and others across the industry.
                            </p>
                            <p>
                                I ended up in care by chance, through an internal transfer. With no background in the
                                field, I started learning — reading books, visiting facilities, and taking courses.
                            </p>
                            <p>
                                Along the way, I came to feel how wonderful and dignified care work is. At the same
                                time, I saw how many problems it still carries.
                            </p>
                        </div>
                    </StaggerItem>

                    <StaggerItem className="flex flex-col gap-6 font-serif">
                        <h2 className="text-lg">Goal</h2>
                        <div className="flex flex-col gap-10 text-sm/8">
                            <div className="flex flex-col gap-4">
                                <p className="text-base">1. Change the labor shortage in care</p>
                                <p>
                                    Care is always short on people. The number of older adults keeps growing, and the
                                    workforce cannot keep up. This is not a job anyone can do. It needs people with
                                    skill, ethics, and compassion — and there are not enough of them.
                                </p>
                                <p>
                                    This is also what I face directly in my day job. I want to keep working on creating
                                    caregivers and fair compensation for them.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-base">2. Change how care work is seen</p>
                                <p>
                                    Care work does not have a great public image. It is hard work — but it is also
                                    deeply meaningful work.
                                </p>
                                <p>
                                    The time of dying can be as fragile, precious, and beautiful as the time of being
                                    born. I want to help raise the image of this essential profession.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-base">3. Build products that make care sustainable</p>
                                <p>
                                    Beyond hiring and image, care needs better tools and systems. As a product engineer,
                                    I want to keep building products that make good care more sustainable for everyone
                                    involved.
                                </p>
                            </div>
                        </div>
                    </StaggerItem>

                    <StaggerItem className="flex flex-col gap-6 font-serif">
                        <h2 className="text-lg">Principle</h2>
                        <div className="flex flex-col gap-10 text-sm/8">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-base">Now or Never</p>
                                    <p>Choose what only now can do</p>
                                </div>
                                <p>
                                    This age, this environment, this fire — they will never line up the same way again.
                                    So I prioritize what only now can do. Not the safe option, but the challenge that is
                                    possible because it is now. I do not miss the chance. I do not hold back. I jump in.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-base">Blicke in dich</p>
                                    <p>Face yourself</p>
                                </div>
                                <p>
                                    More than what is right, I prioritize what I want. I cut out the noise from outside
                                    and trust the excitement and unease I feel inside.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-base">Play the World</p>
                                    <p>Enjoy it</p>
                                </div>
                                <p>
                                    Do what is fun. Find fun in everything. Do not do what is boring. Live to do what is
                                    fun.
                                </p>
                            </div>
                        </div>
                    </StaggerItem>

                    <StaggerItem className="flex flex-col gap-6 font-serif">
                        <h2 className="text-lg">Hobby</h2>
                        <div className="flex flex-col gap-3 text-sm/8">
                            <p>1. Film Photography</p>
                            <p>2. Reading</p>
                            <p>3. Sweets</p>
                        </div>
                    </StaggerItem>

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

export default AboutPage;
