'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import {  FooterActions, labelFor } from './common';
import { Candidate } from '@/app/types';

export default function MultiChoiceBallot({ candidates, max = 2 }: { candidates: Candidate[]; max?: number }) {
    const [multiChoices, setMultiChoices] = React.useState<Set<string>>(new Set());

    const remaining = max - multiChoices.size;
    const warning = remaining < 0 ? `Too many selected. Please select at most ${max}.` : '';

    function toggle(id: string, checked: boolean) {
        setMultiChoices((prev) => {
            const next = new Set(prev);
            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    }

    return (
        <section aria-labelledby="multi-choice-heading" className="mb-10">
            <BallotCard title="City Council At-Large" instructions={`Mark up to ${max} candidates.`} className="mb-8">
                <div className="space-y-2">
                    {candidates.map((c) => (
                        <BallotOption
                            key={c.id}
                            id={`multi-${c.id}`}
                            label={c.label}
                            sublabel={c.sublabel}
                            variant="checkbox"
                            checked={multiChoices.has(c.id)}
                            onCheckedChange={(checked) => toggle(c.id, checked)}
                        />
                    ))}
                </div>

                <BallotDivider />
                <FooterActions
                    onClear={() => setMultiChoices(new Set())}
                    summary={
                        multiChoices.size
                            ? `You selected: ${Array.from(multiChoices).map((id) => labelFor(candidates, id)).join(', ')}`
                            : 'No selections yet.'
                    }
                    isValid={multiChoices.size <= max}
                    warning={warning}
                    helper={`Remaining: ${Math.max(0, remaining)}`}
                />
            </BallotCard>
        </section>
    );
}
