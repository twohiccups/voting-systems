'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { FooterActions } from './common';
import { Party } from '@/app/types';


export default function PartyListBallot({
    parties,
}: {
    parties: Party[];
}) {
    const [selectedPartyId, setSelectedPartyId] = React.useState<string | null>(null);

    function toggleParty(id: string, checked: boolean) {
        setSelectedPartyId((prev) => {
            if (checked) return id;            // select this party
            if (prev === id) return null;      // unselect if same
            return prev;                       // otherwise no-op
        });
    }

    const selectedParty = React.useMemo(
        () => parties.find((p) => p.id === selectedPartyId) ?? null,
        [selectedPartyId, parties]
    );

    const summary = selectedParty
        ? `You selected: ${selectedParty.name}`
        : 'No party selected.';

    return (
        <section aria-labelledby="party-list-heading" className="mb-10">
            <BallotCard
                title="Legislature — Party List (Closed List)"
                instructions="Mark one party. Candidates are seated from the party list based on proportional seat allocation."
                className="mb-8"
            >
                <div className="space-y-2">
                    {parties.map((p) => (
                        <div key={p.id} className="border border-[var(--border)] theme-transition">
                            {/* Use checkbox variant but enforce single selection in state */}
                            <BallotOption
                                id={`party-${p.id}`}
                                label={p.name}
                                sublabel={p.tagline}
                                variant="checkbox"
                                checked={selectedPartyId === p.id}
                                onCheckedChange={(checked) => toggleParty(p.id, checked)}
                                className="rounded-none"
                            />

                            {/* Party’s closed list preview */}
                            <div className="px-3 pb-3 text-xs text-[var(--muted-foreground)]">
                                <ol className="list-decimal pl-5 space-y-0.5">
                                    {p.candidates.map((c, idx) => (
                                        <li key={c.id} className="truncate">
                                            <span className="text-[var(--card-foreground)]">{c.label}</span>
                                            {c.sublabel ? (
                                                <span className="ml-1 text-[var(--muted-foreground)]">— {c.sublabel}</span>
                                            ) : null}
                                            {idx === 0 ? <span className="ml-1">(List leader)</span> : null}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>

                <BallotDivider />

                <FooterActions
                    onClear={() => setSelectedPartyId(null)}
                    summary={summary}
                    isValid={selectedPartyId !== null}
                    warning=""
                    helper="Select exactly 1 party."
                />
            </BallotCard>
        </section>
    );
}
