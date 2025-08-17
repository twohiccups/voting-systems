'use client';

import * as React from 'react';
import ApprovalBallot from './components/ApprovalBallot';
import MultiChoiceBallot from './components/MultiChoiceBallot';
import RankedBallot from './components/RankedBallot';
import ScoredBallot from './components/ScoredBallot';
import SingleChoiceBallot from './components/SingleChoiceBallot';
import CumulativeBallot from './components/CumulativeBallot';
import PartyListBallot from './components/PartyListBallot';
import PanachageBallot from './components/PanachageBallot'; // ← NEW
import { Candidate, Party } from '../types';
import SectionHeading from '../components/SectionHeading';
import OpenListBallot from './components/OpenListBallot';
import ClosedListBallot from './components/CloseListBallot';

export default function BallotTypesShowcasePage() {
    const candidates = React.useMemo<Candidate[]>(
        () => [
            { id: 'cand-a', label: 'Alex Johnson', sublabel: 'Independent' },
            { id: 'cand-b', label: 'Bailey Rivera', sublabel: 'Green' },
            { id: 'cand-c', label: 'Cameron Lee', sublabel: 'Liberty' },
            { id: 'cand-d', label: 'Devin Patel', sublabel: 'Forward' },
        ],
        []
    );

    const parties = React.useMemo<Party[]>(
        () => [
            {
                id: 'party-green',
                name: 'Green Alliance',
                tagline: 'Environmental & social justice',
                candidates: [
                    { id: 'ga-1', label: 'Avery Kim', sublabel: 'Climate Policy Expert' },
                    { id: 'ga-2', label: 'Jordan Singh', sublabel: 'Urban Planner' },
                    { id: 'ga-3', label: 'Morgan Diaz', sublabel: 'Public Health' },
                ],
            },
            {
                id: 'party-liberty',
                name: 'Liberty Coalition',
                tagline: 'Civil liberties & open markets',
                candidates: [
                    { id: 'lc-1', label: 'Riley Chen', sublabel: 'Constitutional Lawyer' },
                    { id: 'lc-2', label: 'Casey O’Neill', sublabel: 'Small Business Owner' },
                    { id: 'lc-3', label: 'Sasha Novak', sublabel: 'Economist' },
                ],
            },
            {
                id: 'party-forward',
                name: 'Forward Futures',
                tagline: 'Tech & pragmatic governance',
                candidates: [
                    { id: 'ff-1', label: 'Taylor Brooks', sublabel: 'Data Scientist' },
                    { id: 'ff-2', label: 'Noah Park', sublabel: 'Educator' },
                    { id: 'ff-3', label: 'Emery Santos', sublabel: 'Transit Advocate' },
                ],
            },
        ],
        []
    );


    const partiesClosed: Party[] = [
        {
            id: 'party-green',
            name: 'Green Alliance',
            tagline: 'Environmental & social justice',
            candidates: [
                { id: 'ga-1', label: 'Avery Kim', sublabel: 'Climate Policy Expert' },
                { id: 'ga-2', label: 'Jordan Singh', sublabel: 'Urban Planner' },
                { id: 'ga-3', label: 'Morgan Diaz', sublabel: 'Public Health' },
            ],
        },
        {
            id: 'party-liberty',
            name: 'Liberty Coalition',
            tagline: 'Civil liberties & open markets',
            candidates: [
                { id: 'lc-1', label: 'Riley Chen', sublabel: 'Constitutional Lawyer' },
                { id: 'lc-2', label: 'Casey O’Neill', sublabel: 'Small Business Owner' },
                { id: 'lc-3', label: 'Sasha Novak', sublabel: 'Economist' },
            ],
        },
        {
            id: 'party-forward',
            name: 'Forward Futures',
            tagline: 'Tech & pragmatic governance',
            candidates: [
                { id: 'ff-1', label: 'Taylor Brooks', sublabel: 'Data Scientist' },
                { id: 'ff-2', label: 'Noah Park', sublabel: 'Educator' },
                { id: 'ff-3', label: 'Emery Santos', sublabel: 'Transit Advocate' },
            ],
        },
    ];

    function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
        return (
            <section className="p-4  space-y-4">
                <SectionHeading title={title} />
                {children}
            </section>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-12">
            <header className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                    Ballot Types Showcase
                </h1>
                <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
                    Explore five common electoral ballot designs. These examples are interactive and use the shared UI
                    components you provided.
                </p>
            </header>

            <SectionBlock title="Single-Choice Ballot">
                <SingleChoiceBallot candidates={candidates} />
            </SectionBlock>

            <SectionBlock title="Multi-Choice Ballot">
                <MultiChoiceBallot candidates={candidates} max={2} />
            </SectionBlock>

            <SectionBlock title="Ranked Ballot">
                <RankedBallot candidates={candidates} />
            </SectionBlock>

            <SectionBlock title="Scored Ballot">
                <ScoredBallot candidates={candidates} />
            </SectionBlock>

            <SectionBlock title="Approval Ballot">
                <ApprovalBallot candidates={candidates} />
            </SectionBlock>

            <SectionBlock title="Cumulative Ballot (Variant of Multi-Choice)">
                <CumulativeBallot candidates={candidates} maxVotes={5} />
            </SectionBlock>

            <SectionBlock title="Party-List Ballot (Closed List)">
                <PartyListBallot parties={parties} />
            </SectionBlock>

            <SectionBlock title="Panachage (Pick across party lists)">
                <PanachageBallot parties={parties} seats={5} />
            </SectionBlock>

            <SectionBlock title="Panachage with Cumulation (e.g., up to 2 per candidate)">
                <PanachageBallot parties={parties} seats={5} cumulateMax={2} />
            </SectionBlock>

            <SectionBlock title="Open-List Party Ballot (Party vote + candidate preferences)">
                <OpenListBallot parties={parties} preferMax={2} />
            </SectionBlock>

            <SectionBlock title="Party-List Ballot (Closed List)">
                <ClosedListBallot parties={partiesClosed} />
            </SectionBlock>


            <footer className="pt-8 text-center text-xs text-[var(--muted-foreground)]">
                Built with accessible, keyboard-friendly controls. Customize styling via your theme variables.
            </footer>
        </main>
    );
}
