'use client';

import * as React from 'react';
import { BallotCard, BallotOption } from '../../ballots/components/Ballot';
import HeroHeader from '@/app/components/HeroHeader';

// --- Small UI helpers (local-only) ---
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="max-w-5xl mx-auto px-4 md:px-6 py-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
        </section>
    );
}

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm leading-none">
            {children}
        </span>
    );
}

function KeyFacts() {
    return (
        <div className="flex flex-wrap gap-2">
            <Chip>Single-winner (typically)</Chip>
            <Chip>Ballot: mark ONE candidate</Chip>
            <Chip>Counting: plurality (most votes wins)</Chip>
            <Chip>Proportionality: low</Chip>
            <Chip>Complexity: very low</Chip>
            <Chip>Strategic voting: common</Chip>
            <Chip>Spoiler risk: higher</Chip>
        </div>
    );
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
        <div className="max-w-3xl mx-auto">
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

// --- Walkthrough (step-by-step demo) ---
function Walkthrough() {
    // Simple synthetic totals for the example race
    const [totals] = React.useState([
        { name: 'Alice Johnson (Green)', votes: 3856 },
        { name: 'Brian Smith (Conservative)', votes: 4120 },
        { name: 'Carla Nguyen (Liberal)', votes: 3922 },
    ]);

    const winner = totals.reduce((max, t) => (t.votes > max.votes ? t : max), totals[0]);

    return (
        <div className="not-prose">
            <ol className="space-y-3 list-decimal pl-5">
                <li>
                    Voters each select <strong>one</strong> candidate on the ballot. There’s no ranking or
                    scoring.
                </li>
                <li>All ballots are counted; each selected candidate receives one vote from that ballot.</li>
                <li>The candidate with the <strong>most votes</strong> is declared the winner.</li>
            </ol>

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
                    Winner: <strong>{winner.name}</strong> with {winner.votes.toLocaleString()} votes (a
                    plurality). Note there’s no need to reach 50%+1.
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
                    <li>Clear single representative per district (when used with single-member districts).</li>
                </ul>
            </div>
            <div className="rounded-2xl border p-5">
                <h3 className="font-semibold text-lg mb-2">Weaknesses</h3>
                <ul className="space-y-2 list-disc pl-5">
                    <li>Can elect a winner with less than 50% of votes in multi-candidate races.</li>
                    <li>Encourages strategic voting; minor-party “spoiler” effects are common.</li>
                    <li>Tends to under-represent smaller parties and produce disproportional outcomes.</li>
                </ul>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <>
            {/* Name & Hero */}
            <HeroHeader
                title={'First Past The Post'}
                subtitle={'Also called Plurality Voting — the candidate with the most votes wins.'}
                bgImage={''}
            />

            {/* Other Known Names */}
            <Section title="Other Known Names">
                <ul>
                    <li>Plurality Voting</li>
                    <li>Single-Member Plurality (when used with single-member districts)</li>
                    <li>Winner-Take-All (colloquial; emphasizes seat allocation effect)</li>
                </ul>
            </Section>

            {/* Quick Facts / Features Overview */}
            <Section title="Quick Facts">
                <KeyFacts />
            </Section>

            {/* Description */}
            <Section title="Description">
                <p>
                    First Past the Post (FPTP) is a single-mark, plurality voting method. Each voter selects
                    one candidate; the candidate with the highest number of votes wins the seat. There is no
                    requirement to achieve an absolute majority, and no ranking or runoffs are involved. FPTP
                    is often paired with single-member districts to produce one representative per district.
                </p>
            </Section>

            {/* Ballot Example */}
            <Section title="Ballot Example">
                <FptpBallot />
            </Section>

            {/* How It Works – Walkthrough */}
            <Section title="How It Works — Walkthrough">
                <Walkthrough />
            </Section>

            {/* Strengths & Weaknesses */}
            <Section title="Strengths & Weaknesses">
                <ProsCons />
            </Section>

            {/* Common Applications */}
            <Section title="Common Applications">
                <ul>
                    <li>Single-winner offices (e.g., mayor, governor, legislator in single-member districts)</li>
                    <li>
                        Organizations that prioritize simplicity and fast results over proportional outcomes
                    </li>
                    <li>Elections with two major candidates (where majority and plurality often coincide)</li>
                </ul>
            </Section>

            {/* Real-World Use (examples) */}
            <Section title="Real-World Use">
                <p className="mb-3">
                    Examples of jurisdictions that use FPTP (or single-member plurality) for many national or
                    subnational elections include:
                </p>
                <ul>
                    <li>United Kingdom (House of Commons)</li>
                    <li>Canada (House of Commons and many provinces)</li>
                    <li>India (Lok Sabha)</li>
                    <li>United States (most single-member offices, including U.S. House seats in most states)</li>
                    <li>Several Caribbean nations and other Commonwealth countries</li>
                </ul>
                <p className="mt-3 text-sm text-zinc-500">
                    Note: Use can vary by level of government and over time; always check the specific office
                    and year.
                </p>
            </Section>

            {/* Related Systems */}
            <Section title="Related Systems">
                <ul>
                    <li>
                        <strong>Two-Round System (Runoff):</strong> Requires a majority via a second round if no one
                        exceeds 50% in the first round.
                    </li>
                    <li>
                        <strong>Ranked Choice Voting (IRV):</strong> Voters rank candidates; instant runoffs
                        simulate multiple rounds to achieve a majority.
                    </li>
                    <li>
                        <strong>Approval Voting:</strong> Voters may approve of any number of candidates; most approvals wins.
                    </li>
                    <li>
                        <strong>Single Transferable Vote (STV):</strong> A multi-winner, ranked method that aims for proportional results.
                    </li>
                </ul>
            </Section>

            {/* Further Reading / Resources */}
            <Section title="Further Reading & Resources">
                <ul>
                    <li>Introductory civics primers on plurality voting</li>
                    <li>Research on disproportionality and Duverger’s law</li>
                    <li>Official election administrator guides for plurality counting</li>
                </ul>
            </Section>
        </>
    );
}
