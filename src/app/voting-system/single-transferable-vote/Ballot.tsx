'use client'

import RankedBallot from "@/app/ballots/components/RankedBallot";
import { fiveCandidates } from "@/lib/candidates/data";

// --- Ballot Example (interactive) ---
export function Ballot() {
    return (
        <RankedBallot
            title="City Council"
            instructions="Rank the candidates in order of preference to elect multiple council members. Mark 1 for your top choice, 2 for your next, and continue as far as you wish. You may rank as many or as few candidates as you like. Avoid duplicate ranks. If your higher-ranked choices are elected or eliminated, your vote transfers to your next preference."
            candidates={fiveCandidates} />
    )
}

