'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { FooterActions } from './common';
import { Party } from '@/app/types';

export default function PartyListBallot({
    parties,
    instructions = "Mark one party. Candidates are seated from the party list based on proportional seat allocation."
}: {
    parties: Party[];
    instructions?: string;
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
        <BallotCard
            title="Legislature — Party List (Closed List)"
            instructions={instructions}
            className="mb-8"
        >
            {/* Prevent horizontal scroll on tiny screens */}
            <div className="space-y-2 overflow-hidden">
                {parties.map((p) => (
                    // min-w-0 lets inner text wrap instead of forcing overflow
                    <div key={p.id} className="border border-[var(--border)] theme-transition min-w-0">
                        {/* Use checkbox variant but enforce single selection in state */}
                        <BallotOption
                            id={`party-${p.id}`}
                            label={p.name}
                            sublabel={p.tagline}
                            variant="checkbox"
                            checked={selectedPartyId === p.id}
                            onCheckedChange={(checked) => toggleParty(p.id, checked)}
                            // ensure the clickable row takes full width; allow text to wrap
                            className="rounded-none w-full min-w-0"
                        />

                        {/* Party’s closed list preview */}
                        <div className="px-3 pb-3 text-xs text-[var(--muted-foreground)]">
                            {/* Constrain list so very long lists don’t blow up the card on mobile */}
                            <ol className="list-decimal pl-5 space-y-0.5 max-h-40 overflow-auto sm:max-h-none">
                                {p.candidates.map((c, idx) => (
                                    <li
                                        key={c.id}
                                        // On mobile, wrap + break long words; only truncate on >= sm
                                        className="min-w-0 break-words whitespace-normal sm:truncate"
                                    >
                                        <span className="text-[var(--card-foreground)]">
                                            {c.label}
                                        </span>
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
    );
}
