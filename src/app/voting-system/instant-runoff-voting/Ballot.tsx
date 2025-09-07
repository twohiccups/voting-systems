'use client'

import RankedBallot from "@/app/ballots/components/RankedBallot";
import { fourCandidates } from "@/lib/candidates/data";

// --- Ballot Example (interactive) ---
export function Ballot() {

    const candidates = fourCandidates;
    const instructions = `Rank the candidates in order of preference, marking your first choice, second choice, third choice, and so on.
    You may leave some unranked; those will be treated as your lowest preferences. 
    Do not assign the same rank to more than one candidate.`
    return (

        <RankedBallot candidates={candidates} instructions={instructions} />
    );
}

