'use client';

import * as React from 'react';
import { BallotCard, BallotOption } from '@/app/ballots/components/Ballot';
import HeroHeader from '@/app/components/HeroHeader';
import { StepCircle } from '@/app/components/primitives';
import FptpFeatures from './FPTPFeatures';
import { QuoteBlock } from '@/app/components/QuoteBlock';
import Section from '@/app/components/Section';
import SectionHeading from '@/app/components/SectionHeading';
import Walkthrough from './Walkthrough';
import { ProsConsListSection } from './ProCons';
import { ProsCons } from '@/app/types';

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




const STRENGTHS: ProsCons[] = [
    {
        title: "Very simple ballots and counting; easy to explain.",
        summary: "Voters mark one name and you add up the marks—fewer steps, fewer mistakes.",
        details:
            "Poll  need minimal training, audit trails are straightforward, and error rates tend to stay low because there are fewer places to go wrong.",
    },
    {
        title: "Fast results and low administrative cost.",
        summary: "Single-mark tallies produce quick preliminaries and uncomplicated recounts.",
        details:
            "Even in large jurisdictions, preliminary results can be reported quickly and recounts are comparatively simple, keeping election-night logistics and budgets lean.",
    },
    {
        title: "Clear single representative per district (with single-member districts).",
        summary: "Accountability is direct—constituents know exactly who represents them.",
        details:
            "Each area elects a single winner who is easy to identify and contact. If voters are unhappy, there’s a clear person to hold to account in the next election.",
    },
]

const WEAKNESSES: ProsCons[] = [
    {
        title: "Winners may have <50% support in multi-candidate races.",
        summary: "Plurality winners can take office without majority backing in crowded fields.",
        details:
            "When three or more credible candidates split the vote, the winner may be opposed by most voters, which can feel counter-majoritarian—especially when margins are tight.",
    },
    {
        title: "Encourages strategic voting; minor-party ‘spoiler’ effects.",
        summary: "Voters may pick a viable second choice to avoid ‘wasting’ their vote.",
        details:
            "Smaller parties can split ideologically similar blocs and unintentionally help an opponent win. This dynamic can also discourage sincere voting and depress minor-party growth.",
    },
    {
        title: "Often disproportional seat outcomes vs. vote share.",
        summary: "Seat totals can amplify regional strongholds and under-represent dispersed voters.",
        details:
            "A party can secure a majority of seats without a majority of votes if its support is efficiently distributed across districts, producing mismatches between votes and seats.",
    },
]




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
                            First Past the Post is one of the simplest ways to run an election.
                            Each voter chooses one candidate, and the candidate with the most votes wins.
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

                    <Section>
                        <ProsConsListSection id="strengths" title="Strengths" items={STRENGTHS} tone="pro" />
                    </Section>
                    <Section>
                        <ProsConsListSection id="weaknesses" title="Weaknesses" items={WEAKNESSES} tone="con" />
                    </Section>
                </div>
            </main>
        </div>
    );
}
