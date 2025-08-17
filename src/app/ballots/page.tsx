'use client';

import * as React from 'react';
import ApprovalBallot from './components/ApprovalBallot';
import MultiChoiceBallot from './components/MultiChoiceBallot';
import RankedBallot from './components/RankedBallot';
import ScoredBallot from './components/ScoredBallot';
import SingleChoiceBallot from './components/SingleChoiceBallot';
import { Candidate } from '../types';
import SectionHeading from '../components/SectionHeading';

/**
 * Ballot Types Showcase Page
 */
export default function BallotTypesShowcasePage() {
    // --- Shared demo data ---
    const candidates = React.useMemo<Candidate[]>(
        () => [
            { id: 'cand-a', label: 'Alex Johnson', sublabel: 'Independent' },
            { id: 'cand-b', label: 'Bailey Rivera', sublabel: 'Green' },
            { id: 'cand-c', label: 'Cameron Lee', sublabel: 'Liberty' },
            { id: 'cand-d', label: 'Devin Patel', sublabel: 'Forward' },
        ],
        []
    );

    return (
        <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
            <header className="space-y-1">
                <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Ballot Types Showcase</h1>
                <p className="text-sm text-[var(--muted-foreground)]">
                    Explore five common electoral ballot designs. These examples are interactive and use the shared UI
                    components you provided.
                </p>
            </header>

            <SectionHeading title="Single-Choice Ballot" />
            <SingleChoiceBallot candidates={candidates} />

            <SectionHeading title="Multi-Choice Ballot" />
            <MultiChoiceBallot candidates={candidates} max={2} />


            <SectionHeading title="Ranked Ballot" />
            <RankedBallot candidates={candidates} />

            <SectionHeading title="Scored Ballot" />
            <ScoredBallot candidates={candidates} />

            <SectionHeading title="Approval Ballot" />

            <ApprovalBallot candidates={candidates} />

            <footer className="pt-6 text-xs text-[var(--muted-foreground)]">
                Built with accessible, keyboard-friendly controls. Customize styling via your theme variables.
            </footer>
        </main>
    );
}
