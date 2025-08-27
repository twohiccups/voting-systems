'use client';

import * as React from 'react';
import { BallotCard, BallotOption } from '@/app/ballots/components/Ballot';
import HeroHeader from '@/app/components/HeroHeader';
import { StepCircle } from '@/app/components/primitives';
import FptpFeatures from './FPTPFeatures';
import { QuoteBlock } from '@/app/components/QuoteBlock';
import Section from '@/app/components/Section';
import SectionHeading from '@/app/components/SectionHeading'; // ✅ import

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
        <div>
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
                            onCheckedChange={(isChecked) => setSelectedId(isChecked ? c.id : null)}
                        />
                    ))}
                </div>
            </BallotCard>

            <p className="text-sm text-zinc-500 mt-3">
                In First Past the Post, only your top choice counts. The candidate with the most votes wins,
                even without an absolute majority.
            </p>
        </div>
    );
}

// --- How It Works — Walkthrough ---
function Walkthrough() {
    const totals = [
        { name: 'Alice Johnson (Green)', votes: 3856 },
        { name: 'Brian Smith (Conservative)', votes: 4120 },
        { name: 'Carla Nguyen (Liberal)', votes: 3922 },
    ];
    const winner = totals.reduce((max, t) => (t.votes > max.votes ? t : max), totals[0]);

    return (
        <div className="not-prose space-y-5">
            <div className="space-y-3">
                <div className="flex items-start">
                    <StepCircle num={1} />
                    <p className="mt-0.5">
                        Each voter selects <strong>one</strong> candidate on the ballot. There’s no ranking or scoring.
                    </p>
                </div>
                <div className="flex items-start">
                    <StepCircle num={2} />
                    <p className="mt-0.5">
                        Count ballots: every marked candidate gets <strong>one</strong> vote from that ballot.
                    </p>
                </div>
                <div className="flex items-start">
                    <StepCircle num={3} />
                    <p className="mt-0.5">
                        The candidate with the <strong>most votes</strong> (a plurality) wins the seat. No majority requirement.
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-3">
                {totals.map((t) => (
                    <div
                        key={t.name}
                        className={`flex items-center justify-between rounded-xl border p-3 ${t.name === winner.name ? 'border-green-600' : ''
                            }`}
                    >
                        <span>{t.name}</span>
                        <span className="font-semibold tabular-nums">{t.votes.toLocaleString()}</span>
                    </div>
                ))}
            </div>

            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                <p className="text-sm">
                    Winner: <strong>{winner.name}</strong> with {winner.votes.toLocaleString()} votes.
                </p>
            </div>
        </div>
    );
}

// --- Pros & Cons ---
function ProsCons() {
    return (
        <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="rounded-2xl border p-5">
                <h3 className="font-semibold text-lg mb-2">Strengths</h3>
                <ul className="space-y-2 list-disc pl-5">
                    <li>Very simple ballots and counting; easy to explain.</li>
                    <li>Fast results and low administrative cost.</li>
                    <li>Clear single representative per district (with single-member districts).</li>
                </ul>
            </div>
            <div className="rounded-2xl border p-5">
                <h3 className="font-semibold text-lg mb-2">Weaknesses</h3>
                <ul className="space-y-2 list-disc pl-5">
                    <li>Winners may have &lt;50% support in multi-candidate races.</li>
                    <li>Encourages strategic voting; minor-party “spoiler” effects.</li>
                    <li>Often disproportional seat outcomes vs. vote share.</li>
                </ul>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <div>
            {/* Hero */}
            <HeroHeader
                title="First Past The Post"
                subtitle="Also called Plurality Voting — the candidate with the most votes wins."
                bgImage=""
            />

            <main className="py-12 sm:py-16 lg:py-24 px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                <div className="space-y-12 sm:space-y-16 lg:space-y-24">
                    <Section>
                        <QuoteBlock>
                            First Past the Post (FPTP) is a single-mark, plurality voting method. Each voter selects
                            one candidate; the candidate with the highest number of votes wins the seat. There is no
                            requirement to achieve an absolute majority, and no ranking or runoffs are involved. FPTP
                            is often paired with single-member districts to produce one representative per district.
                        </QuoteBlock>
                    </Section>

                    <Section>
                        <SectionHeading title="Quick Facts" />
                        <KeyFacts />
                    </Section>

                    <Section>
                        <SectionHeading title="Ballot Example" />
                        <FptpBallot />
                    </Section>

                    <Section>
                        <SectionHeading title="How It Works — Walkthrough" />
                        <Walkthrough />
                    </Section>

                    <Section>
                        <SectionHeading title="Strengths & Weaknesses" />
                        <ProsCons />
                    </Section>

                    <Section>
                        <SectionHeading title="Common Applications" />
                        <ul>
                            <li>Single-winner offices (e.g., mayor, governor, legislators in single-member districts)</li>
                            <li>Organizations prioritizing simplicity and fast results</li>
                            <li>Two-major-candidate contexts where majority ≈ plurality</li>
                        </ul>
                    </Section>

                    <Section>
                        <SectionHeading title="Real-World Use" />
                        <p className="mb-3">
                            Jurisdictions commonly using FPTP/single-member plurality include:
                        </p>
                        <ul>
                            <li>United Kingdom (House of Commons)</li>
                            <li>Canada (House of Commons and many provinces)</li>
                            <li>India (Lok Sabha)</li>
                            <li>United States (most single-member offices, including many U.S. House seats)</li>
                            <li>Several Caribbean and other Commonwealth countries</li>
                        </ul>
                        <p className="mt-3 text-sm text-zinc-500">
                            Note: Use varies by level of government and over time; check the specific office and year.
                        </p>
                    </Section>
                </div>
            </main>
        </div>
    );
}
