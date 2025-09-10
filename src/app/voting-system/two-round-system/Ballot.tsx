'use client'

import SingleChoiceBallot from "@/app/ballots/components/SingleChoiceBallot";
import { SimpleTabs } from "@/app/components/Tabs";
import { fourCandidates } from "@/lib/candidates/data";

// --- Ballot Example (interactive) ---
export function Ballot() {
    const candidates = fourCandidates;
    const roundOneWinners = [fourCandidates[1], fourCandidates[2]]
    return (
        <SimpleTabs defaultValue="round-1">
            <SimpleTabs.List>
                <SimpleTabs.Trigger value="round-1">Round 1</SimpleTabs.Trigger>
                <SimpleTabs.Trigger value="round-2">Round 2 / Runoff</SimpleTabs.Trigger>
            </SimpleTabs.List>

            <SimpleTabs.Content value="round-1">
                <SingleChoiceBallot
                    title="City Mayor Election — Round 1"
                    instructions="Choose one candidate. If no candidate wins a majority of votes in this round, the top two candidates will advance to a runoff."
                    candidates={candidates}
                />
            </SimpleTabs.Content>

            <SimpleTabs.Content value="round-2">
                <SingleChoiceBallot
                    title="City Mayor Election — Runoff"
                    instructions="As no candidate won a majority in the first round, the top two candidates now compete head-to-head. Choose one candidate. The winner will be elected mayor."
                    candidates={roundOneWinners}
                />
            </SimpleTabs.Content>

        </SimpleTabs >

    );
}

