'use client'

import WinnerCard from "../components/WinnerCard";
import VotingBreakdown from "../components/VotingBreakdown";
import { Badge, StepCircle } from "@/app/components/primitives";
import { Candidate } from "@/app/types"; // adjust path as needed

function Walkthrough() {
    const candidates: Candidate[] = [
        { id: "c1", label: "Alice Johnson", sublabel: "Green", total: 3856, color: "green" },
        { id: "c2", label: "Brian Smith", sublabel: "Conservative", total: 4200, color: "blue" },
        { id: "c3", label: "Carla Nguyen", sublabel: "Liberal", total: 3944, color: "red" },
    ];

    const totalVotes = candidates.reduce((sum, c) => sum + (c.total ?? 0), 0);
    const winner = candidates.reduce(
        (max, c) => ((c.total ?? 0) > (max.total ?? 0) ? c : max),
        candidates[0]
    );

    const handleRowClick = (candidate: Candidate) => {
        console.log(`Clicked ${candidate.label}`);
    };

    return (
        <div className="not-prose">
            {/* Timeline container */}
            <ol
                className="
          relative ml-6
          before:absolute before:left-0 before:top-0 before:h-full before:w-px
          before:bg-gray-200
        "
            >
                {/* Step 1 */}
                <li className="relative pl-8">
                    <div className="absolute -left-6 top-0">
                        <StepCircle num={1} />
                    </div>
                    <div className="pb-6 border-b border-gray-200 last:border-none">
                        <p className="mb-2">Three candidates run for mayor:</p>
                        <ul className="pl-0 text-sm flex flex-col divide-y divide-gray-200 rounded-lg bg-white/50">
                            {candidates.map((c) => (
                                <li key={c.id} className="flex items-center gap-2 py-2 px-2">
                                    <span className="font-medium">{c.label}</span>
                                    {c.sublabel && (
                                        <Badge color={c.color} className="shrink-0">
                                            {c.sublabel}
                                        </Badge>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>

                {/* Step 2 */}
                <li className="relative pl-8">
                    <div className="absolute -left-6 top-0">
                        <StepCircle num={2} />
                    </div>
                    <div className="pb-6 border-b border-gray-200 last:border-none">
                        <p>
                            There are 12,000 voters in the city. Each voter chooses one
                            candidate on their ballot.
                        </p>
                    </div>
                </li>

                {/* Step 3 */}
                <li className="relative pl-8">
                    <div className="absolute -left-6 top-0">
                        <StepCircle num={3} />
                    </div>
                    <div className="pb-6 border-b border-gray-200 last:border-none">
                        <p className="mb-2">After ballots are counted, the totals are:</p>
                        <div className="mt-2">
                            <VotingBreakdown
                                candidates={candidates}
                                onRowClick={(row) => {
                                    const candidate = candidates.find(
                                        (c) =>
                                            `${c.label} ${c.sublabel ? `(${c.sublabel})` : ""}` ===
                                            row.label
                                    );
                                    if (candidate) handleRowClick(candidate);
                                }}
                            />
                        </div>
                    </div>
                </li>

                {/* Step 4 */}
                <li className="relative pl-8">
                    <div className="absolute -left-6 top-0">
                        <StepCircle num={4} />
                    </div>
                    <div className="pb-0">
                        <p className="mb-2">
                            The candidate with the most votes is declared the winner:
                        </p>
                        <div className="mt-2">
                            <WinnerCard candidate={winner} totalVotes={totalVotes} />
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    );
}

export default Walkthrough;
