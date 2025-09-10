'use client';

import { BallotCard, BallotOption } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import { fiveCandidates } from '@/lib/candidates/data';
import { FooterActions } from '@/app/ballots/components/common';


export default function LimitedVotingBallot() {
    const [selected, setSelected] = React.useState<Set<string>>(new Set());

    const toggle = (id: string, checked: boolean) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (checked) {
                // Enforce maximum selections (2 in this example)
                if (next.size < 2) next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    };

    const clear = () => setSelected(new Set());

    return (
        <BallotCard
            title="Community Council Election"
            instructions="Vote for up to 2 candidates. There will be 3 winners."
        >
            <div className="space-y-2">
                {fiveCandidates.map((c) => (
                    <BallotOption
                        key={c.id}
                        label={c.label}
                        variant="checkbox"
                        checked={selected.has(c.id)}
                        onCheckedChange={(checked) => toggle(c.id, checked)}
                    />
                ))}
            </div>

            <FooterActions
                summary={`You have selected ${selected.size} candidate(s).`}
                warning={selected.size > 2 ? "Too many selections — only 2 allowed." : undefined}
                onClear={clear}
                onSubmit={() => console.log('Submitted:', Array.from(selected))}
                submitLabel="Cast Vote"
                isValid={selected.size <= 2}
            />
        </BallotCard>
    );
}
