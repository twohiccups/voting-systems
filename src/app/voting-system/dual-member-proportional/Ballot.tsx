'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import type { Ticket } from '@/app/types';
import { FooterActions } from '@/app/ballots/components/common';


export default function DMPBallot() {
    const tickets = [
        {
            id: 'liberal-party',
            partyLabel: 'Liberal Party',
            primary: {
                id: 'liberal-1',
                label: 'Alex Kim',
                sublabel: 'Primary Candidate',
            },
            secondary: {
                id: 'liberal-2',
                label: 'Brianna Singh',
                sublabel: 'Secondary Candidate',
            },
        },
        {
            id: 'conservative-party',
            partyLabel: 'Conservative Party',
            primary: {
                id: 'conservative-1',
                label: 'Cory Diaz',
                sublabel: 'Primary Candidate',
            },
            secondary: {
                id: 'conservative-2',
                label: 'Dana Rossi',
                sublabel: 'Secondary Candidate',
            },
        },
        {
            id: 'gamma-party',
            partyLabel: 'Gamma Party',
            primary: {
                id: 'gamma-1',
                label: 'Elliot Zhang',
                sublabel: 'Primary Candidate',
            },
            secondary: {
                id: 'gamma-2',
                label: 'Farah Ali',
                sublabel: 'Secondary Candidate',
            },
        },
        {
            id: 'independent-lee',
            partyLabel: 'Independent',
            primary: {
                id: 'ind-1',
                label: 'Jordan Lee',
                sublabel: 'Independent Candidate',
                color: '#6c757d',
            },
        },
    ];


    const [selectedTicketId, setSelectedTicketId] = React.useState<string | null>(null);

    const isValid = selectedTicketId !== null;

    function onSelect(id: string, checked: boolean) {
        // Radio behavior using our checkbox control
        setSelectedTicketId(checked ? id : null);
    }

    // Build display text once
    function ticketLabel(t: Ticket) {
        return t.partyLabel;
    }

    function ticketSublabel(t: Ticket) {
        const primary = t.primary
            ? `${t.primary.label}${t.primary.sublabel ? ` (${t.primary.sublabel})` : ''}`
            : '';
        const secondary = t.secondary
            ? `${t.secondary.label}${t.secondary.sublabel ? ` (${t.secondary.sublabel})` : ''}`
            : '';

        return (
            <div className="space-y-0.5">
                {primary && <div>Primary: {primary}</div>}
                {secondary && <div>Secondary: {secondary}</div>}
            </div>
        );
    }


    const selected = tickets.find((x) => x.id === selectedTicketId) || null;

    return (
        <BallotCard
            title="Legislative District — Dual-Member Mixed Proportional (DMP)"
            instructions={
                'Cast ONE vote for a ticket. Party tickets list two candidates (Primary & Secondary). ' +
                'Your single vote counts for the Primary locally and toward party proportionality.'
            }
            className="mb-8"
        >
            <div className="space-y-2">
                {tickets.map((t) => (
                    <BallotOption
                        key={t.id}
                        label={ticketLabel(t)}
                        sublabel={ticketSublabel(t)}
                        variant="checkbox"
                        checked={selectedTicketId === t.id}
                        onCheckedChange={(checked) => onSelect(t.id, checked)}
                    />
                ))}
            </div>

            <BallotDivider />

            <FooterActions
                onClear={() => setSelectedTicketId(null)}
                summary={
                    selected ? (
                        <div>
                            Your selection:&nbsp;
                            <strong>{ticketLabel(selected)}</strong>
                            <div className="opacity-80 text-xs mt-1">
                                {ticketSublabel(selected)}
                            </div>
                        </div>
                    ) : (
                        'No selection yet.'
                    )
                }
                isValid={isValid}
                warning={!isValid ? 'Please select exactly one ticket (party pair or independent).' : undefined}
                helper="One vote per voter. Tickets show Primary & Secondary candidates."
                submitLabel="Submit"
            />
        </BallotCard>
    );
}
