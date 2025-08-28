'use client';

import * as React from 'react';
import { BallotCard, BallotOption } from '@/app/ballots/components/Ballot';
import HeroHeader from '@/app/components/HeroHeader';
import { StepCircle } from '@/app/components/primitives';
import FptpFeatures from './FPTPFeatures';
import { QuoteBlock } from '@/app/components/QuoteBlock';
import Section from '@/app/components/Section';
import SectionHeading from '@/app/components/SectionHeading';
import ProsConsExpanded from './ProCons';
import Walkthrough from './Walkthrough';

// --- Quick Facts using shared <Chip/> ---
function KeyFacts() {
    return <FptpFeatures />;
}

// --- Ballot Example (interactive) ---
function FptpBallot() {
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

    const candidates = [
        { id: 'a', label: 'Alice Johnson', sublabel: 'Green Party' },
        { id: 'b', label: 'Brian Smith', sublabel: 'Conservative Party' },
        { id: 'c', label: 'Carla Nguyen', sublabel: 'Liberal Party' },
    ];

    return (
        <BallotCard
            title="Mayor Election"
            instructions="Vote for ONE candidate only by marking the box next to their name."
        >
            <div role="group" aria-label="FPTP choices" className="grid gap-2">
                {candidates.map((c) => (
                    <BallotOption
                        key={c.id}
                        id={c.id}
                        label={c.label}
                        sublabel={c.sublabel}
                        variant="checkbox"
                        checked={selectedId === c.id}
                        onCheckedChange={(isChecked) =>
                            setSelectedId(isChecked ? c.id : null)
                        }
                    />
                ))}
            </div>
        </BallotCard>
    );
}

// --- How It Works (rules) ---
function HowItWorks() {
    return (
        <div className="not-prose space-y-3">
            <div className="flex items-start">
                <StepCircle num={1} />
                <p>
                    Several candidates run for the seat.
                </p>
            </div>
            <div className="flex items-start">
                <StepCircle num={2} />
                <p>
                    Each voter selects one candidate on the ballot.
                </p>
            </div>
            <div className="flex items-start">
                <StepCircle num={3} />
                <p>
                    Count the ballots: each marked candidate gets <strong>one</strong> vote.
                </p>
            </div>
            <div className="flex items-start">
                <StepCircle num={4} />
                <p>
                    The candidate with the <strong>most votes</strong> wins.
                </p>
            </div>
        </div>
    );
}






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
                    <Section>
                        <QuoteBlock>
                            First Past the Post (FPTP) is a single-mark, plurality voting
                            method. Each voter selects one candidate; the candidate with the
                            highest number of votes wins the seat.
                        </QuoteBlock>
                    </Section>

                    <Section>
                        <SectionHeading title="Quick Facts" />
                        <KeyFacts />
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
                        <FptpBallot />
                    </Section>

                    <ProsConsExpanded />
                </div>
            </main>
        </div>
    );
}
