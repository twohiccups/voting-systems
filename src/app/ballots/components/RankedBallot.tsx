'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import { hasDuplicateRanks, FooterActions, rankSummary } from './common';
import { Candidate } from '@/app/types';
import { useState } from 'react';

export default function RankedBallot({ candidates }: { candidates: Candidate[] }) {
    type RankMap = Record<string, number | null>;
    const [ranks, setRanks] = useState<RankMap>(() =>
        Object.fromEntries(candidates.map((c) => [c.id, null]))
    );

    function setRank(id: string, value: number | null) {
        setRanks((prev) => ({ ...prev, [id]: value }));
    }

    const usedRanks = new Set(Object.values(ranks).filter((v) => v !== null) as number[]);
    const rankDuplicates = hasDuplicateRanks(ranks);

    return (
        <BallotCard
            title="Presidential Primary"
            instructions="Rank candidates by preference. Use 1 for your favorite, 2 for your next choice, and so on. Avoid duplicate ranks. Leave blank candidates you don't like, they will receive minimal points"
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
                isValid={!rankDuplicates}
                warning={rankDuplicates ? 'Duplicate ranks detected. Each rank should be unique.' : ''}
                helper={`Used ranks: ${Array.from(usedRanks).sort((a, b) => a - b).join(', ') || '—'}`}
            />
        </BallotCard>
    );
}
