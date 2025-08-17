'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { FooterActions, labelFor } from './common';
import { Party } from '@/app/types';


export default function PanachageBallot({
    parties,
    seats = 5,
    cumulateMax = 1, // 1 = simple panachage (checkboxes); >1 = allow cumulation (score inputs)
}: {
    parties: Party[];
    seats?: number;
    cumulateMax?: number;
}) {
    // If cumulateMax === 1, track a Set of selected candidate IDs.
    // If > 1, track a Map of candidateId -> votes (0..cumulateMax).
    const simpleMode = cumulateMax <= 1;

    const allCandidates = React.useMemo(
        () => parties.flatMap((p) => p.candidates),
        [parties]
    );

    // ----- State -----
    const [selections, setSelections] = React.useState<Set<string>>(new Set());
    const [allocations, setAllocations] = React.useState<Map<string, number>>(
        () => new Map(allCandidates.map((c) => [c.id, 0]))
    );

    // ----- Derived totals -----
    const totalVotes = React.useMemo(() => {
        if (simpleMode) return selections.size;
        // sum of all allocated votes
        return Array.from(allocations.values()).reduce((a, b) => a + (b || 0), 0);
    }, [simpleMode, selections, allocations]);

    const remaining = seats - totalVotes;
    const isValid = remaining >= 0;

    const warning =
        remaining < 0
            ? `Too many selections/votes. Reduce by ${Math.abs(remaining)} to stay within ${seats} total.`
            : '';

    // ----- Updaters -----
    function toggleCheckbox(id: string, checked: boolean) {
        setSelections((prev) => {
            const next = new Set(prev);
            if (checked) {
                next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    }

    function setScore(id: string, next: number | null) {
        const v = clampNumber(next ?? 0, 0, cumulateMax);
        setAllocations((prev) => {
            const map = new Map(prev);
            map.set(id, v);
            return map;
        });
    }

    function handleClear() {
        setSelections(new Set());
        setAllocations(new Map(allCandidates.map((c) => [c.id, 0])));
    }

    const summary = React.useMemo(() => {
        if (simpleMode) {
            const picked = Array.from(selections);
            return picked.length
                ? `You selected: ${picked.map((id) => labelFor(allCandidates, id)).join(', ')}`
                : 'No selections yet.';
        }
        // cumulation summary
        const parts = allCandidates
            .map((c) => {
                const v = allocations.get(c.id) ?? 0;
                return v > 0 ? `${c.label} (${v})` : null;
            })
            .filter(Boolean) as string[];
        return parts.length ? `You allocated: ${parts.join(', ')}` : 'No allocations yet.';
    }, [simpleMode, selections, allocations, allCandidates]);

    const helper =
        remaining >= 0 ? `Remaining: ${remaining} ${remaining === 1 ? 'vote' : 'votes'}` : `Over by ${Math.abs(remaining)}`;

    return (
        <BallotCard
            title="Legislature — Panachage"
            instructions={
                simpleMode
                    ? `Select up to ${seats} candidates across any party list.`
                    : `Distribute up to ${seats} total votes across candidates (up to ${cumulateMax} per candidate).`
            }
            className="mb-8"
        >
            <div className="space-y-4">
                {parties.map((p) => (
                    <fieldset
                        key={p.id}
                        aria-labelledby={`party-${p.id}-legend`}
                        className="border border-[var(--border)]"
                    >
                        <legend
                            id={`party-${p.id}-legend`}
                            className="px-3 py-2 text-sm font-semibold tracking-wide text-[var(--foreground)]"
                        >
                            {p.name}
                            {p.tagline ? (
                                <span className="ml-2 text-[var(--muted-foreground)] font-normal">— {p.tagline}</span>
                            ) : null}
                        </legend>

                        <div className="px-3 pb-3 space-y-2">
                            {p.candidates.map((c) =>
                                simpleMode ? (
                                    <BallotOption
                                        key={c.id}
                                        id={`pan-${c.id}`}
                                        label={c.label}
                                        sublabel={c.sublabel}
                                        variant="checkbox"
                                        checked={selections.has(c.id)}
                                        onCheckedChange={(checked) => toggleCheckbox(c.id, checked)}
                                    />
                                ) : (
                                    <BallotOption
                                        key={c.id}
                                        id={`pan-${c.id}`}
                                        label={c.label}
                                        sublabel={c.sublabel}
                                        variant="score"
                                        score={allocations.get(c.id) ?? 0}
                                        onScoreChange={(v) => setScore(c.id, v)}
                                        scoreMin={0}
                                        scoreMax={cumulateMax}
                                    />
                                )
                            )}
                        </div>
                    </fieldset>
                ))}
            </div>

            <BallotDivider />

            <FooterActions
                onClear={handleClear}
                summary={summary}
                isValid={isValid}
                warning={warning}
                helper={helper}
            />
        </BallotCard>
    );
}

function clampNumber(n: number, min: number, max: number) {
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
}
