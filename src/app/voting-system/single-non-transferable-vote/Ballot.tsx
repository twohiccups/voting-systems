'use client'

import SingleChoiceBallot from "@/app/ballots/components/SingleChoiceBallot";
import { fiveCandidates } from "@/lib/candidates/data";

// --- Ballot Example (interactive) ---
export function Ballot() {
    return (
        <SingleChoiceBallot
            title="City Council"
            candidates={fiveCandidates} />
    )
}
