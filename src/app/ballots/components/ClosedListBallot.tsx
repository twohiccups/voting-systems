'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { FooterActions } from './common';
import { Party } from '@/app/types';

export default function ClosedListBallot({ parties }: { parties: Party[] }) {
    const [selectedPartyId, setSelectedPartyId] = React.useState<string | null>(null);

    function toggleParty(id: string, checked: boolean) {
        setSelectedPartyId((prev) => {
            if (checked) return id;         // select this party
            if (prev === id) return null;   // unselect if same
            return prev;
        });
    }

    const selectedParty = parties.find((p) => p.id === selectedPartyId) ?? null;

    return (
        <BallotCard
            title="Legislature — Party List (Closed List)"
            instructions="Mark one party. Candidate order is fixed by the party and shown for reference."
            className="mb-8"
        >
            {/* Prevent horizontal scroll on tiny screens */}
            <div className="space-y-3 overflow-hidden">
                {parties.map((p) => (
                    <fieldset key={p.id} className="border border-[var(--border)] min-w-0">
                        <legend className="px-3 py-2 text-sm font-semibold tracking-wide text-[var(--foreground)] break-words">
                            {p.name}
                            {p.tagline ? (
                                <span className="ml-2 text-[var(--muted-foreground)] font-normal">— {p.tagline}</span>
                            ) : null}
                        </legend>

                        {/* Party choice (single-choice semantics via checkbox UI) */}
                        <div className="px-3 pb-2 min-w-0">
                            <BallotOption
                                id={`closedlist-party-${p.id}`}
                                label={`Vote for ${p.name}`}
                                sublabel="(Party/list vote)"
                                variant="checkbox"
                                checked={selectedPartyId === p.id}
                                onCheckedChange={(checked) => toggleParty(p.id, checked)}
                                // make the row span full width and allow text to shrink
                                className="rounded-none w-full min-w-0"
                            />
                        </div>

                        {/* Fixed slate preview (read-only) */}
                        <div
                            className="
                px-3 pb-3 text-xs text-[var(--muted-foreground)] min-w-0
                pr-14 sm:pr-3
              "
                        >
                            <ol className="list-decimal pl-5 space-y-0.5 max-h-40 overflow-auto sm:max-h-none">
                                {p.candidates.map((c, idx) => (
                                    <li
                                        key={c.id}
                                        className="min-w-0 break-words whitespace-normal sm:truncate"
                                    >
                                        <span className="text-[var(--card-foreground)]">{c.label}</span>
                                        {c.sublabel ? <span className="ml-1">— {c.sublabel}</span> : null}
                                        {idx === 0 ? <span className="ml-1">(List leader)</span> : null}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </fieldset>
                ))}
            </div>

            <BallotDivider />

            <FooterActions
                onClear={() => setSelectedPartyId(null)}
                summary={selectedParty ? `You selected: ${selectedParty.name}` : 'No party selected.'}
                isValid={selectedPartyId !== null}
                warning=""
                helper="Select exactly 1 party."
            />
        </BallotCard>
    );
}
