import SingleChoiceBallot from "@/app/ballots/components/SingleChoiceBallot";
import { fourCandidates } from "@/lib/candidates/data";

export function Ballot() {
    const candidates = fourCandidates;
    return (

        <SingleChoiceBallot
            candidates={candidates}
            title="City Mayor Election"
            instructions="Choose one candidate. If majority is not reached, the lowest candidate(s) are eliminated and you vote again next round."
        />
    )
}