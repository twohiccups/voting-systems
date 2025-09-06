'use client';

import * as React from "react";
import MultiChoiceBallot from "@/app/ballots/components/MultiChoiceBallot";
import { fiveCandidates } from "@/lib/candidates/data";

/**
 * BlockVotingBallot
 * - Plurality-at-large (block voting): voter may select up to `seats` candidates.
 * - Prevents picking more than `seats` by disabling further checks.
 * - Mirrors the structure of MultiChoiceBallot for easy drop-in.
 */
export function Ballot() {
    return (
        <MultiChoiceBallot candidates={fiveCandidates} />
    );
}
