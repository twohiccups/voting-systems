'use client'

import CumulativeBallot from "@/app/ballots/components/CumulativeBallot";
import { fiveCandidates } from "@/lib/candidates/data";

// --- Ballot Example (interactive) ---
export function Ballot() {
    const candidates = fiveCandidates;
    return (
        <CumulativeBallot candidates={candidates} />
    );
}

