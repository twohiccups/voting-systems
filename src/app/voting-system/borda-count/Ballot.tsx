'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import { hasDuplicateRanks, FooterActions, rankSummary } from '@/app/ballots/components/common';
import { fourCandidates } from '@/lib/candidates/data';
import RankAllCandidatesBallot from '@/app/ballots/components/RankAllCandidates';

export default function Ballot() {
    const candidates = fourCandidates;
    return (
        <RankAllCandidatesBallot candidates={candidates}/>
    );
}
