'use client';

import * as React from 'react';
import HeroHeader from '@/app/components/HeroHeader';
import { QuoteBlock } from '@/app/components/QuoteBlock';
import Section from '@/app/components/Section';
import SectionHeading from '@/app/components/SectionHeading';
import Walkthrough from './Walkthrough';
import { ProsConsListSection } from './ProCons';
import { systemFeatures } from '@/app/features/features';
import KeyFacts from './KeyFeatures';
import UseCases from './UseCases';
import { introParagraph, keyFeatures, strengths, weaknesses } from './data';
import { HowItWorks } from './HowItWorks';
import { Ballot } from './Ballot';
import KeyFeatures from './KeyFeatures';




// --- Page Layout ---
export default function Page() {
    return (
        <div>
            <HeroHeader
                title="First Past The Post"
                subtitle="Also called Plurality Voting — the candidate with the most votes wins."
                bgImage=""
            />

            <main className="py-12 sm:py-16 lg:py-24 px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                <div className="space-y-12 sm:space-y-16 lg:space-y-24">
                    {/* Intro + compact facts side-by-side (no card, no tightening) */}
                    <Section>
                        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-start">
                            {/* Quote = 2/3 on lg+ */}
                            <div className="lg:col-span-2">
                                <QuoteBlock>
                                    {introParagraph}
                                </QuoteBlock>
                            </div>

                            {/* Facts = 1/3 on lg+, stacked below on mobile */}
                            <aside className="lg:col-span-1 lg:sticky lg:top-24">
                                <KeyFeatures
                                    systemName="First-Past-the-Post"
                                    ratings={keyFeatures}
                                    features={systemFeatures}
                                    linkBase="/features"
                                    showQuote={false}
                                />;
                            </aside>
                        </div>
                    </Section>



                    <Section>
                        <SectionHeading title="How It Works" />
                        <HowItWorks />
                    </Section>

                    <Section>
                        <SectionHeading title="Walkthrough Example" />
                        <Walkthrough />
                    </Section>


                    <Section>
                        <SectionHeading title="Ballot Example" />
                        <Ballot />
                    </Section>

                    <Section>
                        <ProsConsListSection id="strengths" title="Strengths" items={strengths} tone="pro" />
                    </Section>
                    <Section>
                        <ProsConsListSection id="weaknesses" title="Weaknesses" items={weaknesses} tone="con" />
                    </Section>

                    <Section>
                        <SectionHeading title="Real Applications" />
                        <UseCases />
                    </Section>
                </div>
            </main>
        </div>
    );
}
