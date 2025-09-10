'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { FooterActions } from '@/app/ballots/components/common';
import { mmpLocalCandidates, mmpParties } from '@/lib/candidates/data';

export function Ballot() {

    const localCandidates = mmpLocalCandidates;
    const parties = mmpParties;

    const [selectedLocalId, setSelectedLocalId] = React.useState<string | null>(null);
    const [selectedPartyId, setSelectedPartyId] = React.useState<string | null>(null);

    const localSummary = selectedLocalId
        ? `Local choice: ${localCandidates.find(c => c.id === selectedLocalId)?.label}`
        : 'No local candidate selected.';
    const partySummary = selectedPartyId
        ? `Party choice: ${parties.find(p => p.id === selectedPartyId)?.name}`
        : 'No party selected.';

    return (
        <div>
            {/* First ballot: local constituency vote */}
            <BallotCard
                title="Your District Representative"
                instructions="Mark one local candidate."
                className="mb-6"
            >
                <div className="space-y-2">
                    {localCandidates.map(c => (
                        <BallotOption
                            key={c.id}
                            label={c.label}
                            sublabel={c.sublabel}
                            variant="checkbox"
                            checked={selectedLocalId === c.id}
                            onCheckedChange={checked => setSelectedLocalId(checked ? c.id : null)}
                        />
                    ))}
                </div>
                <FooterActions
                    summary={localSummary}
                    isValid={selectedLocalId !== null}
                    submitLabel="Next"
                    onSubmit={() => { }}
                    onClear={() => setSelectedLocalId(null)}
                />
            </BallotCard>

            <BallotDivider />

            {/* Second ballot: party list vote */}
            <BallotCard
                title="Party Vote"
                instructions="Mark one party."
            >
                <div className="space-y-2">
                    {parties.map(p => (
                        <BallotOption
                            key={p.id}
                            label={p.name}
                            sublabel={p.tagline}
                            variant="checkbox"
                            checked={selectedPartyId === p.id}
                            onCheckedChange={checked => setSelectedPartyId(checked ? p.id : null)}
                        />
                    ))}
                </div>
                <FooterActions
                    summary={partySummary}
                    helper="Seats are allocated proportionally based on party vote."
                    isValid={selectedPartyId !== null}
                    submitLabel="Cast Vote"
                    onSubmit={() => console.log('Submitted:', { selectedLocalId, selectedPartyId })}
                    onClear={() => setSelectedPartyId(null)}
                />
            </BallotCard>
        </div>
    );
}
