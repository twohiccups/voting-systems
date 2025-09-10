'use client';

import * as React from 'react';
import ApprovalBallot from './components/ApprovalBallot';
import MultiChoiceBallot from './components/MultiChoiceBallot';
import RankedBallot from './components/RankedBallot';
import ScoredBallot from './components/ScoreBallot';
import SingleChoiceBallot from './components/SingleChoiceBallot';
import CumulativeBallot from './components/CumulativeBallot';
import PartyListBallot from './components/PartyListBallot';
import PanachageBallot from './components/PanachageBallot';
import OpenListBallot from './components/OpenListBallot';
import ClosedListBallot from './components/CloseListBallot';
import HeroHeader from '../components/HeroHeader';
import { StepCard, StepList } from '../components/primitives';
import { QuoteBlock } from '../components/QuoteBlock';
import SectionHeading from '../components/SectionHeading';

// NEW: layout primitives
import { FullBleed } from '@/app/components/FullBleed';
import Section from '@/app/components/Section';
import { Container } from '@/app/components/Container';
import { defaultParties, defaultPartiesClosed, fourCandidates } from '@/lib/candidates/data';


const candidates = fourCandidates;
const parties = defaultParties;
const partiesClosed = defaultPartiesClosed;

function TableOfContents({ sections }: { sections: { id: string; title: string }[] }) {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id); // now the <h2>
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    const onJump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
    };

    return (
        <nav
            aria-label="Table of contents"
            className="sticky top-4 z-10 rounded-2xl border bg-[var(--card)] p-4 shadow-sm"
        >
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
                On this page
            </div>
            <ul className="space-y-1 text-sm">
                {sections.map((s) => (
                    <li key={s.id}>
                        <a
                            href={`#${s.id}`}
                            onClick={onJump(s.id)}
                            className={
                                'block rounded-md px-2 py-1 outline-none ring-0 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] focus-visible:bg-[var(--accent)] focus-visible:text-[var(--accent-foreground)] ' +
                                (activeId === s.id
                                    ? 'font-semibold text-[var(--foreground)]'
                                    : 'text-[var(--muted-foreground)]')
                            }
                        >
                            {s.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function BallotTypesShowcasePage() {
    const sections = [
        { id: 'single-choice', title: 'Single-Choice Ballot' },
        { id: 'multi-choice', title: 'Multi-Choice Ballot' },
        { id: 'ranked', title: 'Ranked Ballot' },
        { id: 'scored', title: 'Scored Ballot' },
        { id: 'approval', title: 'Approval Ballot' },
        { id: 'cumulative', title: 'Cumulative Ballot (Variant of Multi-Choice)' },
        { id: 'partylist', title: 'Party-List Ballot (Closed List)' },
        { id: 'panachage', title: 'Panachage (Pick across party lists)' },
        { id: 'panachage-cumulation', title: 'Panachage with Cumulation' },
        { id: 'open-list', title: 'Open-List Party Ballot (Party vote + candidate preferences)' },
        { id: 'closed-list', title: 'Party-List Ballot (Closed List, Alternate Component)' },
    ];

    const ballotItems = [
        { question: 'List of options', detail: 'Candidates, parties, or issues appear on the ballot.' },
        {
            question: 'Instructions',
            detail:
                "Tell voters how to correctly mark their choice (e.g., ‘Mark one candidate only’ or ‘Rank candidates 1, 2, 3…’).",
        },
        {
            question: 'Space to mark the vote',
            detail: 'Check box, circle, ranking, or other method to record the choice.',
        },
    ];


    return (
        <>
            <HeroHeader
                title={'Ballot Types Showcase'}
                subtitle="Explore common electoral ballot designs"
                bgImage={''}
            />

            {/* FullBleed → Section → Container */}
            <FullBleed>
                <Section>
                    <main>
                        <Container>
                            <QuoteBlock>
                                A ballot is the tool voters use to express their choices in an election. It&apos;s
                                usually a piece of paper or electronic form listing the candidates, parties or
                                issues, where the voter marks their selection.
                            </QuoteBlock>

                            <StepCard title="A ballot usually contains:" index={0}>
                                <StepList items={ballotItems} />
                            </StepCard>

                            <div className="order-2 md:order-1">
                                <TableOfContents sections={sections} />
                            </div>

                            {/* Sections — heading carries the ID */}
                            <Section>
                                <SectionHeading id="single-choice" title="Single-Choice Ballot" />
                                <SingleChoiceBallot candidates={candidates} />
                            </Section>

                            <Section>
                                <SectionHeading id="multi-choice" title="Multi-Choice Ballot" />
                                <MultiChoiceBallot candidates={candidates} max={2} />
                            </Section>

                            <Section>
                                <SectionHeading id="ranked" title="Ranked Ballot" />
                                <RankedBallot candidates={candidates} />
                            </Section>

                            <Section>
                                <SectionHeading id="scored" title="Scored Ballot" />
                                <ScoredBallot candidates={candidates} />
                            </Section>

                            <Section>
                                <SectionHeading id="approval" title="Approval Ballot" />
                                <ApprovalBallot candidates={candidates} />
                            </Section>

                            <Section>
                                <SectionHeading id="cumulative" title="Cumulative Ballot (Variant of Multi-Choice)" />
                                <CumulativeBallot candidates={candidates} maxVotes={5} />
                            </Section>

                            <Section>
                                <SectionHeading id="partylist" title="Party-List Ballot (Closed List)" />
                                <PartyListBallot parties={parties} />
                            </Section>

                            <Section>
                                <SectionHeading id="panachage" title="Panachage (Pick across party lists)" />
                                <PanachageBallot parties={parties} seats={5} />
                            </Section>

                            <Section>
                                <SectionHeading
                                    id="panachage-cumulation"
                                    title="Panachage with Cumulation (e.g., up to 2 per candidate)"
                                />
                                <PanachageBallot parties={parties} seats={5} cumulateMax={2} />
                            </Section>

                            <Section>
                                <SectionHeading
                                    id="open-list"
                                    title="Open-List Party Ballot (Party vote + candidate preferences)"
                                />
                                <OpenListBallot parties={parties} preferMax={2} />
                            </Section>

                            <Section>
                                <SectionHeading id="closed-list" title="Party-List Ballot (Closed List)" />
                                <ClosedListBallot parties={partiesClosed} />
                            </Section>

                            <div className="text-center">
                                <a
                                    href="#top"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                >
                                    ↑ Back to top
                                </a>
                            </div>
                        </Container>
                    </main>
                </Section>
            </FullBleed>
        </>
    );
}
