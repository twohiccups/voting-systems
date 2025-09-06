"use client";

import { BallotCard, BallotOption, BallotDivider } from "@/app/ballots/components/Ballot";
import { candidates } from "@/app/ballots/components/CandidatesData";
import RankAllCandidatesBallot from "@/app/ballots/components/RankAllCandidates";
import { fourCandidates } from "@/lib/candidates/data";
import * as React from "react";



export default function Ballot() {
    const candidates = fourCandidates;

    return (
        <RankAllCandidatesBallot candidates={candidates} />
    )
}
