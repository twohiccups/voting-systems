import * as React from 'react';
import WinnerCard from '../components/WinnerCard';
import VotingBreakdown, { CandidateTotal } from '../components/VotingBreakdown';
import InitialAvatar from '../components/InitialAvatar';
import { StepCircle } from '@/app/components/primitives';

function Walkthrough() {
    const totals: CandidateTotal[] = [
        { name: 'Alice Johnson (Green)', votes: 3856 },
        { name: 'Brian Smith (Conservative)', votes: 4200 },
        { name: 'Carla Nguyen (Liberal)', votes: 3944 },
    ];

    const totalVotes = totals.reduce((s, t) => s + t.votes, 0);
    const winner = totals.reduce((max, t) => (t.votes > max.votes ? t : max), totals[0]);

    const handleRowClick = (c: CandidateTotal) => console.log(`Clicked ${c.name} `);

    return (
        <div className="not-prose space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
                <StepCircle num={1} />
                <p>Three candidates run for mayor:</p>
            </div>

            <ul className="ml-9 space-y-2 pl-0 text-sm">
                {totals.map((t) => (
                    <li key={t.name} className="flex items-center gap-3">
                        <InitialAvatar name={t.name} />
                        <span>{t.name}</span>
                    </li>
                ))}
            </ul>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
                <StepCircle num={2} />
                <p>There are 12,000 voters in the city. Each voter chooses one candidate on their ballot.</p>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
                <StepCircle num={3} />
                <p>After ballots are counted, the totals are:</p>
            </div>
            <div className="ml-9">
                <VotingBreakdown
                    totals={totals}
                />
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3">
                <StepCircle num={4} />
                <p>The candidate with the most votes is declared the winner:</p>
            </div>
            <div className="ml-9">
                <WinnerCard name={winner.name} votes={winner.votes} totalVotes={totalVotes} />
            </div>
        </div>
    );
}

export default Walkthrough;
