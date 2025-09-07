'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import { hasDuplicateRanks, FooterActions, rankSummary } from '@/app/ballots/components/common';
import { Candidate } from '@/app/types';

export default function RankAllCandidatesBallot({ candidates }: { candidates: Candidate[] }) {
    type RankMap = Record<string, number | null>;
    const [ranks, setRanks] = React.useState<RankMap>(() =>
        Object.fromEntries(candidates.map((c) => [c.id, null]))
    );

    function setRank(id: string, value: number | null) {
        setRanks((prev) => ({ ...prev, [id]: value }));
    }

    const values = Object.values(ranks);
    const usedRanks = new Set(values.filter((v) => v !== null) as number[]);
    const rankDuplicates = hasDuplicateRanks(ranks);
    const allRanked = values.every((v) => typeof v === 'number'); // EXTRA RULE: no blanks allowed

    // Helpful UI bits
    const remainingRanks = Array.from(
        { length: candidates.length },
        (_, i) => i + 1
    ).filter((n) => !usedRanks.has(n));

    // Validation and messaging


    return (
        <BallotCard
            title="Presidential Primary"
            instructions={`Rank ALL candidates by preference. Use 1 for your favorite, 2 for your next choice, and so on — with no duplicates.`}
            className="mb-8"
        >
            <div className="space-y-2">
                {candidates.map((c) => (
                    <BallotOption
                        key={c.id}
                        id={`rank-${c.id}`}
                        label={c.label}
                        sublabel={c.sublabel}
                        variant="rank"
                        rank={ranks[c.id]}
                        rankMin={1}
                        rankMax={candidates.length}
                        onRankChange={(v) => setRank(c.id, v)}
                    />
                ))}
            </div>

            <BallotDivider />

            <FooterActions
                onClear={() => setRanks(Object.fromEntries(candidates.map((c) => [c.id, null])))}
                summary={rankSummary(candidates, ranks)}
                isValid={allRanked && !rankDuplicates}
                warningAlways={rankDuplicates ? 'Duplicate ranks detected. Each rank should be unique.' : undefined}
                warningOnSubmit={!allRanked ? 'Every candidate must be ranked (no blanks).' : undefined}
                helper={
                    allRanked
                        ? 'All ranks assigned.'
                        : `Remaining ranks to assign: ${remainingRanks.join(', ') || '—'}`
                }
            />

        </BallotCard>
    );
}
