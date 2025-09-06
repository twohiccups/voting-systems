"use client";

import RankAllCandidatesBallot from "@/app/ballots/components/RankAllCandidates";
import { fourCandidates } from "@/lib/candidates/data";
import * as React from "react";



export default function Ballot() {
    const candidates = fourCandidates;

    return (
        <RankAllCandidatesBallot candidates={candidates} />
    )
}
