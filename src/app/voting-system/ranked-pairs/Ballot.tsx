'use client'

import RankedBallot from "@/app/ballots/components/RankedBallot";
import { studentCandidates } from "@/lib/candidates/data";


export default function Ballot() {
    return (
        <>
            <RankedBallot
                title="Student Union Treasury"
                instructions="Rank the candidates. 1 is your top choice, 2 your next, etc. You may leave some unranked; any ranked candidate is considered preferred to any unranked candidate. Avoid duplicate ranks."
                candidates={studentCandidates}
            />;
        </>
    )
}



