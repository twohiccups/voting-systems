'use client'

import ScoreBallot from "@/app/ballots/components/ScoreBallot";
import { professionalCandidates } from "@/lib/candidates/data";

export function Ballot() {
    return (
        <ScoreBallot candidates={professionalCandidates} />
    );
}

