'use client';

import * as React from 'react';
import ApprovalBallot from './components/ApprovalBallot';
import MultiChoiceBallot from './components/MultiChoiceBallot';
import RankedBallot from './components/RankedBallot';
import ScoredBallot from './components/ScoredBallot';
import SingleChoiceBallot from './components/SingleChoiceBallot';
import CumulativeBallot from './components/CumulativeBallot';
import PartyListBallot from './components/PartyListBallot';
import PanachageBallot from './components/PanachageBallot';
import SectionHeading from '../components/SectionHeading';
import OpenListBallot from './components/OpenListBallot';
import ClosedListBallot from './components/CloseListBallot';
import { candidates, parties, partiesClosed } from './components/CandidatesData';

function TableOfContents({ sections }: { sections: { id: string; title: string }[] }) {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
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
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)] mb-2">
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
    ]


    function SectionBlock({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
        return (
            <section id={id} className="scroll-mt-24 anchor p-4 space-y-4">
                <a tabIndex={-1} aria-hidden="true" className="block h-0" />
                <SectionHeading title={title} />
                {children}
            </section>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-12">
            <header className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Ballot Types Showcase</h1>
                <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
                    Explore five common electoral ballot designs. These examples are interactive and use the shared UI
                    components you provided.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px,1fr]">
                <div className="order-2 md:order-1">
                    <TableOfContents sections={sections} />
                </div>
                <div className="order-1 md:order-2 space-y-12">
                    <SectionBlock id="single-choice" title="Single-Choice Ballot">
                        <SingleChoiceBallot candidates={candidates} />
                    </SectionBlock>

                    <SectionBlock id="multi-choice" title="Multi-Choice Ballot">
                        <MultiChoiceBallot candidates={candidates} max={2} />
                    </SectionBlock>

                    <SectionBlock id="ranked" title="Ranked Ballot">
                        <RankedBallot candidates={candidates} />
                    </SectionBlock>

                    <SectionBlock id="scored" title="Scored Ballot">
                        <ScoredBallot candidates={candidates} />
                    </SectionBlock>

                    <SectionBlock id="approval" title="Approval Ballot">
                        <ApprovalBallot candidates={candidates} />
                    </SectionBlock>

                    <SectionBlock id="cumulative" title="Cumulative Ballot (Variant of Multi-Choice)">
                        <CumulativeBallot candidates={candidates} maxVotes={5} />
                    </SectionBlock>

                    <SectionBlock id="partylist" title="Party-List Ballot (Closed List)">
                        <PartyListBallot parties={parties} />
                    </SectionBlock>

                    <SectionBlock id="panachage" title="Panachage (Pick across party lists)">
                        <PanachageBallot parties={parties} seats={5} />
                    </SectionBlock>

                    <SectionBlock id="panachage-cumulation" title="Panachage with Cumulation (e.g., up to 2 per candidate)">
                        <PanachageBallot parties={parties} seats={5} cumulateMax={2} />
                    </SectionBlock>

                    <SectionBlock id="open-list" title="Open-List Party Ballot (Party vote + candidate preferences)">
                        <OpenListBallot parties={parties} preferMax={2} />
                    </SectionBlock>

                    <SectionBlock id="closed-list" title="Party-List Ballot (Closed List)">
                        <ClosedListBallot parties={partiesClosed} />
                    </SectionBlock>

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
                </div>
            </div>

            <footer className="pt-8 text-center text-xs text-[var(--muted-foreground)]">
                Built with accessible, keyboard-friendly controls. Customize styling via your theme variables.
            </footer>
        </main>
    );
}
