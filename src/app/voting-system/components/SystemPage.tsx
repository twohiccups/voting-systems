// app/voting-system/components/SystemPage.tsx
import * as React from 'react';
import HeroHeader from '@/app/components/HeroHeader';
import { QuoteBlock } from '@/app/components/QuoteBlock';
import Section from '@/app/components/Section';
import SectionHeading from '@/app/components/SectionHeading';
import { ProsConsListSection } from './ProCons';
import KeyFeatures from './KeyFeatures';

import type { SystemContent } from '@/lib/systems/types';
import UseCases from './UseCases';

export default function SystemPage({ content }: { content: SystemContent }) {
    const {
        name,
        aka,
        introParagraph,
        keyFeatures,
        strengths,
        weaknesses,
        useCases,
    } = content;

    // ✅ Safely access components with a fallback
    const {
        HowItWorks: HowItWorksCmp,
        Ballot: BallotCmp,
        Walkthrough,
    } = content.components ?? {};

    return (
        <div>
            <HeroHeader title={name} subtitle={aka?.[0] ?? ''} bgImage="" />
            <main className="py-12 sm:py-16 lg:py-24 px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                <div className="space-y-12 sm:space-y-16 lg:space-y-24">
                    <Section>
                        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-start">
                            <div className="lg:col-span-2">
                                <QuoteBlock>{introParagraph}</QuoteBlock>
                            </div>
                            <aside className="lg:col-span-1 lg:sticky lg:top-24">
                                <KeyFeatures
                                    systemName={name}
                                    featureChoices={keyFeatures}
                                    linkBase="/features"
                                    showQuote={false}
                                />
                            </aside>
                        </div>
                    </Section>

                    {HowItWorksCmp && (
                        <Section>
                            <SectionHeading title="How It Works" />
                            <HowItWorksCmp />
                        </Section>
                    )}

                    {Walkthrough && (
                        <Section>
                            <SectionHeading title="Walkthrough Example" />
                            <Walkthrough />
                        </Section>
                    )}

                    {BallotCmp && (
                        <Section>
                            <SectionHeading title="Ballot Example" />
                            <BallotCmp />
                        </Section>
                    )}

                    <Section>
                        <ProsConsListSection id="strengths" title="Strengths" items={strengths} tone="pro" />
                    </Section>

                    <Section>
                        <ProsConsListSection id="weaknesses" title="Weaknesses" items={weaknesses} tone="con" />
                    </Section>


                    <Section>
                        <SectionHeading title="Real Applications" />
                        <UseCases useCases={useCases} />
                    </Section>
                </div>
            </main>
        </div>
    );
}
