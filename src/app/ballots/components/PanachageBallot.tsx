'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { Party } from '@/app/types';
import { labelFor, FooterActions } from '@/app/ballots/components/common';

export default function PanachageBallot({
    parties,
    seats = 5,
    cumulateMax = 1, // 1 = simple panachage (checkboxes); >1 = allow cumulation (score inputs)
}: {
    parties: Party[];
    seats?: number;
    cumulateMax?: number;
}) {
    const simpleMode = cumulateMax <= 1;

    // Flatten once for summaries & resets
    const allCandidates = React.useMemo(() => parties.flatMap((p) => p.candidates), [parties]);

    // ----- State -----
    // Simple mode: set of selected IDs
    const [selections, setSelections] = React.useState<Set<string>>(new Set());

    // Cumulation mode: map candidateId -> votes (0..cumulateMax)
    const [allocations, setAllocations] = React.useState<Map<string, number>>(
        () => new Map(allCandidates.map((c) => [c.id, 0]))
    );

    // Keep allocations in sync if the parties prop changes
    React.useEffect(() => {
        setAllocations((prev) => {
            const next = new Map<string, number>();
            for (const c of allCandidates) next.set(c.id, prev.get(c.id) ?? 0);
            return next;
        });
    }, [allCandidates]);

    // ----- Totals -----
    const totalVotes = React.useMemo(() => {
        if (simpleMode) return selections.size;
        let sum = 0;
        allocations.forEach((v) => (sum += v || 0));
        return sum;
    }, [simpleMode, selections, allocations]);

    const remaining = seats - totalVotes;
    const isOver = remaining < 0;
    const isValid = !isOver && totalVotes > 0 && totalVotes <= seats;

    const warning = isOver
        ? `Too many selections/votes. Reduce by ${Math.abs(remaining)} to stay within ${seats} total.`
        : '';

    const helper =
        remaining >= 0
            ? `Remaining: ${remaining} ${remaining === 1 ? 'vote' : 'votes'}`
            : `Over by ${Math.abs(remaining)}`;

    // ----- Updaters -----
    function toggleCheckbox(id: string, checked: boolean) {
        setSelections((prev) => {
            const next = new Set(prev);
            if (checked) {
                // Enforce seat cap in simple checkbox mode
                if (next.size >= seats) return prev; // ignore extra checks
                next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    }

    // Compute a per-candidate effective max that respects both cumulateMax *and* remaining pool.
    function effectiveMaxFor(id: string) {
        const current = allocations.get(id) ?? 0;
        const rem = seats - totalVotes; // remaining before this change
        // You can always keep what you already allocated; you can add up to rem more (bounded by cumulateMax)
        return Math.min(cumulateMax, current + Math.max(0, rem));
    }

    function setScore(id: string, requested: number | null) {
        const current = allocations.get(id) ?? 0;
        const effMax = effectiveMaxFor(id);
        const next = clampNumber(requested ?? 0, 0, effMax);

        // If unchanged, no-op
        if (next === current) return;

        setAllocations((prev) => {
            const map = new Map(prev);
            map.set(id, next);
            return map;
        });
    }

    function handleClear() {
        setSelections(new Set());
        setAllocations(new Map(allCandidates.map((c) => [c.id, 0])));
    }

    // ----- Summary -----
    const summary = React.useMemo(() => {
        if (simpleMode) {
            const picked = Array.from(selections);
            return picked.length
                ? `You selected: ${picked.map((id) => labelFor(allCandidates, id)).join(', ')}`
                : 'No selections yet.';
        }
        const parts = allCandidates
            .map((c) => {
                const v = allocations.get(c.id) ?? 0;
                return v > 0 ? `${c.label} (${v})` : null;
            })
            .filter(Boolean) as string[];
        return parts.length ? `You allocated: ${parts.join(', ')}` : 'No allocations yet.';
    }, [simpleMode, selections, allocations, allCandidates]);

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
                        className={`border ${isOver ? 'border-red-300 bg-red-50' : 'border-[var(--border)]'}`}
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
                                        // soft-disable if no remaining seats and not already selected
                                        disabled={!selections.has(c.id) && remaining <= 0}
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
                                        // Per-row max respects remaining pool so users can’t overshoot seats
                                        scoreMax={effectiveMaxFor(c.id)}
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
                submitLabel="Cast Vote"
                onSubmit={() => {
                    if (simpleMode) {
                        const selected = Array.from(selections);
                        console.log('Submitted panachage (simple):', { selected });
                    } else {
                        const payload = Array.from(allocations.entries())
                            .filter(([, v]) => v > 0)
                            .map(([candidateId, votes]) => ({ candidateId, votes }));
                        console.log('Submitted panachage (cumulation):', payload);
                    }
                }}
            />
        </BallotCard>
    );
}

function clampNumber(n: number, min: number, max: number) {
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
}
