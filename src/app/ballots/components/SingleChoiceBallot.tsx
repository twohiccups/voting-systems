'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import { FooterActions, labelFor } from './common';
import { Candidate } from '@/app/types';

export default function SingleChoiceBallot({ candidates }: { candidates: Candidate[] }) {
    const [singleChoice, setSingleChoice] = React.useState<string | null>(null);

    return (
        <BallotCard
            title="City Mayor"
            instructions="Mark exactly one candidate. If you make a mistake, you can change your selection before submitting."
            className="mb-8"
        >
            <div className="space-y-2">
                {candidates.map((c) => (
                    <BallotOption
                        key={c.id}
                        id={`single-${c.id}`}
                        label={c.label}
                        sublabel={c.sublabel}
                        variant="checkbox"
                        checked={singleChoice === c.id}
                        onCheckedChange={(checked) => setSingleChoice(checked ? c.id : null)}
                    />
                ))}
            </div>

            <BallotDivider />
            <FooterActions
                onClear={() => setSingleChoice(null)}
                summary={singleChoice ? `You selected: ${labelFor(candidates, singleChoice)}` : 'No selection yet.'}
                isValid={singleChoice !== null}
            />
        </BallotCard>
    );
}
