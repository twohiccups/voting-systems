'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { FooterActions, labelFor } from './common';
import { Candidate } from '@/app/types';

type AllocMap = Map<string, number>;

export default function CumulativeBallot({
    candidates,
    maxVotes = 5,
}: {
    candidates: Candidate[];
    maxVotes?: number;
}) {
    // initialize all allocations to 0
    const [allocations, setAllocations] = React.useState<AllocMap>(
        () => new Map(candidates.map((c) => [c.id, 0]))
    );

    // derived totals
    const totalAllocated = React.useMemo(
        () => Array.from(allocations.values()).reduce((sum, v) => sum + (v || 0), 0),
        [allocations]
    );

    const remaining = maxVotes - totalAllocated;
    const isValid = remaining >= 0;

    const warning =
        remaining < 0
            ? `Too many votes allocated. Reduce by ${Math.abs(remaining)} to use at most ${maxVotes}.`
            : '';

    function updateAllocation(id: string, next: number | null) {
        const val = clampNumber(next ?? 0, 0, maxVotes);
        setAllocations((prev) => {
            const nextMap = new Map(prev);
            nextMap.set(id, val);
            return nextMap;
        });
    }

    function handleClear() {
        setAllocations(new Map(candidates.map((c) => [c.id, 0])));
    }

    const summary = React.useMemo(() => {
        const parts = candidates
            .map((c) => {
                const v = allocations.get(c.id) ?? 0;
                return v > 0 ? `${labelFor(candidates, c.id)} (${v})` : null;
            })
            .filter(Boolean) as string[];

        return parts.length
            ? `You allocated: ${parts.join(', ')}`
            : 'No allocations yet.';
    }, [allocations, candidates]);

    return (
        <BallotCard
            title="City Council At-Large — Cumulative"
            instructions={`You have ${maxVotes} total votes. Distribute them among any candidates (including giving multiple votes to one).`}
            className="mb-8"
        >
            <div className="space-y-2">
                {candidates.map((c) => (
                    <BallotOption
                        key={c.id}
                        id={`cum-${c.id}`}
                        label={c.label}
                        sublabel={c.sublabel}
                        variant="score"
                        score={allocations.get(c.id) ?? 0}
                        onScoreChange={(v) => updateAllocation(c.id, v)}
                        scoreMin={0}
                        scoreMax={maxVotes}
                    />
                ))}
            </div>

            <BallotDivider />

            <FooterActions
                onClear={handleClear}
                summary={summary}
                isValid={isValid}
                warning={warning}
                helper={
                    remaining >= 0
                        ? `Remaining votes: ${remaining}`
                        : `Over by ${Math.abs(remaining)}`
                }
            />
        </BallotCard>
    );
}

function clampNumber(n: number, min: number, max: number) {
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
}
