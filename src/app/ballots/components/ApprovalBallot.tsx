'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import { FooterActions, labelFor } from './common';
import { Candidate } from '@/app/types';

export default function ApprovalBallot({ candidates }: { candidates: Candidate[] }) {
    const [approvals, setApprovals] = React.useState<Set<string>>(new Set());

    function toggle(id: string, checked: boolean) {
        setApprovals((prev) => {
            const next = new Set(prev);
            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    }

    return (
        <section aria-labelledby="approval-ballot-heading" className="mb-10">
            <BallotCard title="Community Advisory Board" instructions="Approve any number of candidates." className="mb-8">
                <div className="space-y-2">
                    {candidates.map((c) => (
                        <BallotOption
                            key={c.id}
                            id={`approval-${c.id}`}
                            label={c.label}
                            sublabel={c.sublabel}
                            variant="checkbox"
                            checked={approvals.has(c.id)}
                            onCheckedChange={(checked) => toggle(c.id, checked)}
                        />
                    ))}
                </div>

                <BallotDivider />
                <FooterActions
                    onClear={() => setApprovals(new Set())}
                    summary={
                        approvals.size
                            ? `Approved: ${Array.from(approvals).map((id) => labelFor(candidates, id)).join(', ')}`
                            : 'No approvals yet.'
                    }
                    isValid={true}
                />
            </BallotCard>
        </section>
    );
}
