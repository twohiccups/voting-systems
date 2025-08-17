'use client';

import * as React from 'react';
import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import { FooterActions, labelFor } from './common';
import { Party } from '@/app/types';



export default function OpenListBallot({
    parties,
    preferMax = 2, // max candidate preferences within the chosen party
    requireParty = true, // if false, allow only candidate prefs to imply the party
}: {
    parties: Party[];
    preferMax?: number;
    requireParty?: boolean;
}) {
    const [selectedPartyId, setSelectedPartyId] = React.useState<string | null>(null);
    const [prefs, setPrefs] = React.useState<Set<string>>(new Set());

    // When switching party, clear preferences (open-list implementations vary; this keeps it simple & clear)
    function toggleParty(id: string, checked: boolean) {
        setSelectedPartyId((prev) => {
            const next = checked ? id : prev === id ? null : prev;
            if (next !== prev) setPrefs(new Set());
            return next;
        });
    }

    // Helpers
    function partyForCandidate(candidateId: string) {
        return parties.find((p) => p.candidates.some((c) => c.id === candidateId))?.id ?? null;
    }

    function togglePref(id: string, checked: boolean) {
        setPrefs((prev) => {
            const next = new Set(prev);
            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    }

    // Derived validity
    const chosenParty =
        selectedPartyId ??
        // If party not explicitly chosen and not required, infer from first selected preference (common fallback)
        (!requireParty && prefs.size ? partyForCandidate(Array.from(prefs)[0]) : null);

    // Enforce that all preferences belong to chosen party
    const crossPartyPref = React.useMemo(() => {
        if (!chosenParty) return false;
        for (const id of prefs) {
            if (partyForCandidate(id) !== chosenParty) return true;
        }
        return false;
    }, [prefs, chosenParty]);

    const remaining = preferMax - prefs.size;
    const tooMany = remaining < 0;
    const hasPartyProblem = requireParty && !chosenParty;

    const warning = [
        hasPartyProblem ? 'Please select a party.' : '',
        tooMany ? `Too many preferences. Reduce by ${Math.abs(remaining)}.` : '',
        crossPartyPref ? 'All preference votes must be within the selected party.' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const isValid = !hasPartyProblem && !tooMany && !crossPartyPref;

    const summary = (() => {
        const partyName = chosenParty ? parties.find((p) => p.id === chosenParty)?.name : null;
        const prefsList = Array.from(prefs)
            .map((id) => labelFor(parties.flatMap((p) => p.candidates), id))
            .join(', ');
        return partyName
            ? prefs.size
                ? `Party: ${partyName}. Preferences: ${prefsList}`
                : `Party: ${partyName}. No preferences marked.`
            : prefs.size
                ? `Preferences: ${prefsList}`
                : 'No selections yet.';
    })();

    function handleClear() {
        setSelectedPartyId(null);
        setPrefs(new Set());
    }

    return (
        <BallotCard
            title="Legislature — Party List (Open List)"
            instructions={`Mark one party for your list vote. Optionally give up to ${preferMax} preference votes to candidates within that party to influence the order in which they are seated.`}
            className="mb-8"
        >
            <div className="space-y-4">
                {parties.map((p) => {
                    const isSelectedParty = chosenParty === p.id;
                    const disabledCandidates =
                        // Candidates are interactive only for the chosen party,
                        // unless no party is required and none chosen yet.
                        requireParty ? !isSelectedParty : chosenParty ? !isSelectedParty : false;

                    return (
                        <fieldset
                            key={p.id}
                            aria-labelledby={`openlist-${p.id}-legend`}
                            className="border border-[var(--border)]"
                        >
                            <legend
                                id={`openlist-${p.id}-legend`}
                                className="px-3 py-2 text-sm font-semibold tracking-wide text-[var(--foreground)]"
                            >
                                {p.name}
                                {p.tagline ? (
                                    <span className="ml-2 text-[var(--muted-foreground)] font-normal">— {p.tagline}</span>
                                ) : null}
                            </legend>

                            {/* Party choice (single-choice semantics using a checkbox UI) */}
                            <div className="px-3 pb-2">
                                <BallotOption
                                    id={`openlist-party-${p.id}`}
                                    label={`Vote for ${p.name}`}
                                    sublabel="(Party/list vote)"
                                    variant="checkbox"
                                    checked={selectedPartyId === p.id}
                                    onCheckedChange={(checked) => toggleParty(p.id, checked)}
                                    className="rounded-none"
                                />
                            </div>

                            {/* Candidate preferences (open-list influence) */}
                            <div className="px-3 pb-3 space-y-2">
                                {p.candidates.map((c) => (
                                    <BallotOption
                                        key={c.id}
                                        id={`openlist-pref-${c.id}`}
                                        label={c.label}
                                        sublabel={c.sublabel}
                                        variant="checkbox"
                                        checked={prefs.has(c.id)}
                                        onCheckedChange={(checked) => togglePref(c.id, checked)}
                                        disabled={disabledCandidates}
                                    />
                                ))}
                            </div>
                        </fieldset>
                    );
                })}
            </div>

            <BallotDivider />

            <FooterActions
                onClear={handleClear}
                summary={summary}
                isValid={isValid}
                warning={warning}
                helper={
                    remaining >= 0
                        ? `Preference votes remaining: ${remaining}`
                        : `Over by ${Math.abs(remaining)}`
                }
            />
        </BallotCard>
    );
}
