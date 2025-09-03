'use client';

import * as React from "react";
import { BallotCard, BallotOption, BallotDivider } from "@/app/ballots/components/Ballot";
import type { Candidate } from "@/app/types";
import { FooterActions, labelFor } from "@/app/ballots/components/common";

/**
 * BlockVotingBallot
 * - Plurality-at-large (block voting): voter may select up to `seats` candidates.
 * - Prevents picking more than `seats` by disabling further checks.
 * - Mirrors the structure of MultiChoiceBallot for easy drop-in.
 */
export function Ballot({
    seats = 2,
    title = "City Council At-Large",
    instructions,
}: {
    seats?: number;
    title?: string;
    instructions?: string;
}) {
    const [selected, setSelected] = React.useState<Set<string>>(new Set());

    const candidates: Candidate[] = [
        { id: 'a', label: 'Alice Johnson', sublabel: 'Green Party' },
        { id: 'b', label: 'Brian Smith', sublabel: 'Conservative Party' },
        { id: 'c', label: 'Carla Nguyen', sublabel: 'Liberal Party' },
        { id: 'd', label: 'David Lee', sublabel: 'Independent' },
        { id: 'e', label: 'Ella Martinez', sublabel: 'Progressive Party' },
    ];

    const remaining = seats - selected.size;
    const atCapacity = remaining <= 0;

    function toggle(id: string, nextChecked: boolean) {
        setSelected((prev) => {
            const next = new Set(prev);
            if (nextChecked) {
                if (next.size >= seats) return prev; // hard cap
                next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    }

    return (
        <BallotCard
            title={title}
            instructions={
                instructions ?? `You have ${seats} vote${seats === 1 ? "" : "s"}. Select up to ${seats} candidate${seats === 1 ? "" : "s"
                }.`
            }
            className="mb-8"
        >
            <div className="space-y-2">
                {candidates.map((c) => {
                    const checked = selected.has(c.id);
                    const disableNewCheck = !checked && atCapacity; // allow unchecking even at capacity
                    return (
                        <BallotOption
                            key={c.id}
                            id={`block-${c.id}`}
                            label={c.label}
                            sublabel={c.sublabel}
                            variant="checkbox"
                            checked={checked}
                            disabled={disableNewCheck}
                            onCheckedChange={(checked) => toggle(c.id, checked)}
                        />
                    );
                })}
            </div>

            <BallotDivider />

            <FooterActions
                onClear={() => setSelected(new Set())}
                summary={
                    selected.size
                        ? `You selected: ${Array.from(selected)
                            .map((id) => labelFor(candidates, id))
                            .join(", ")}`
                        : "No selections yet."
                }
                isValid={selected.size <= seats}
                warning={""}
                helper={
                    atCapacity
                        ? "You've used all your votes."
                        : `Votes remaining: ${Math.max(0, remaining)}`
                }
            />
        </BallotCard>
    );
}
