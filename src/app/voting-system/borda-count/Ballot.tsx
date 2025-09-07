'use client';

import * as React from 'react';
import { fourCandidates } from '@/lib/candidates/data';
import RankAllCandidatesBallot from '@/app/ballots/components/RankAllCandidates';

export default function Ballot() {
    const candidates = fourCandidates;
    return (
        <RankAllCandidatesBallot candidates={candidates}/>
    );
}
