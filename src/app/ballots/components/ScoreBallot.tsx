'use client';

import { BallotCard, BallotOption, BallotDivider } from '@/app/ballots/components/Ballot';
import * as React from 'react';
import { FooterActions, scoreSummary } from './common';
import { Candidate } from '@/app/types';


export default function ScoreBallot({ candidates }: { candidates: Candidate[] }) {
    type ScoreMap = Record<string, number | null>;
    const [scores, setScores] = React.useState<ScoreMap>(() =>
        Object.fromEntries(candidates.map((c) => [c.id, null]))
    );

    function setScore(id: string, value: number | null) {
        setScores((prev) => ({ ...prev, [id]: value }));
    }

    return (
        <BallotCard
            title="Candidate Score Ballot"
            instructions="Score each candidate from 0 (strongly oppose) to 10 (strongly support). Leave blank if you have no opinion."
            className="mb-8"
        >
            <div className="space-y-2">
                {candidates.map((c) => (
                    <BallotOption
                        key={c.id}
                        id={`score-${c.id}`}
                        label={c.label}
                        sublabel={c.sublabel}
                        variant="score"
                        scoreMin={0}
                        scoreMax={10}
                        score={scores[c.id]}
                        onScoreChange={(v) => setScore(c.id, v)}
                    />
                ))}
            </div>

            <BallotDivider />
            <FooterActions
                onClear={() => setScores(Object.fromEntries(candidates.map((c) => [c.id, null])))}
                summary={scoreSummary(candidates, scores)}
                isValid={true}
            />
        </BallotCard>
    );
}
