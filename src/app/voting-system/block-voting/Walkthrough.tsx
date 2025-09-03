"use client";

import WinnerCard from "../components/WinnerCard";
import VotingBreakdown from "../components/VotingBreakdown";
import { StepCard } from "@/app/components/primitives";
import { Candidate } from "@/app/types"; // adjust path as needed
import CandidateCard from "../components/CandidateCard";

export default function Walkthrough() {
    const REGISTERED_VOTERS = 12000;

    // Adjusted so totals = 10,000
    const candidates: Candidate[] = [
        { id: "c1", label: "Alice Johnson", sublabel: "Green", total: 2000, color: "green" },
        { id: "c2", label: "Brian Smith", sublabel: "Conservative", total: 3750, color: "blue" },
        { id: "c3", label: "Carla Nguyen", sublabel: "Liberal", total: 4250, color: "red" },
    ];

    const totalVotes = candidates.reduce((sum, c) => sum + (c.total ?? 0), 0); // 10,000
    const winner = candidates.reduce((max, c) => ((c.total ?? 0) > (max.total ?? 0) ? c : max), candidates[0]);
    const turnout = Math.min(totalVotes / REGISTERED_VOTERS, 1); // 83.3%

    const byVotes = [...candidates].sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
    const runnerUp = byVotes[1];
    const marginVotes = (winner.total ?? 0) - (runnerUp.total ?? 0);
    const marginPct = REGISTERED_VOTERS > 0 ? (marginVotes / REGISTERED_VOTERS) : 0;


    return (
        <div className="not-prose relative isolate overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_30rem_at_20%_10%,rgba(34,197,94,0.14),transparent_60%),radial-gradient(40rem_30rem_at_80%_20%,rgba(59,130,246,0.14),transparent_60%)]" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="space-y-6">

                    <StepCard index={1} title="Candidates">
                        <p className="mb-3 text-gray-700">Three candidates run for mayor:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {candidates.map((c) => (
                                <CandidateCard key={c.id} candidate={c} />
                            ))}
                        </ul>
                    </StepCard>

                    <StepCard index={2} title="Ballots & turnout">
                        <p className="text-gray-700">
                            Each eligible voter marks one candidate on their ballot. Turnout is the share
                            of registered voters who cast a ballot.
                        </p>
                        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="rounded-xl bg-gray-50 p-3">
                                <dt className="text-gray-500 text-sm">Registered voters</dt>
                                <dd className="mt-1 font-semibold text-gray-900">
                                    {REGISTERED_VOTERS.toLocaleString()}
                                </dd>
                            </div>
                            <div className="rounded-xl bg-gray-50 p-3">
                                <dt className="text-gray-500 text-sm">Ballots counted</dt>
                                <dd className="mt-1 font-semibold text-gray-900">
                                    {totalVotes.toLocaleString()}
                                </dd>
                            </div>
                            <div className="rounded-xl bg-gray-50 p-3">
                                <dt className="text-gray-500 text-sm">Turnout</dt>
                                <dd className="mt-1 font-semibold text-gray-900">
                                    {(turnout * 100).toFixed(1)}%
                                </dd>
                            </div>
                        </dl>
                        <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Turnout</span>
                                <span className="tabular-nums font-medium text-gray-700">
                                    {(turnout * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div className="mt-2 h-2.5 rounded-full bg-gray-100">
                                <div
                                    className="h-2.5 rounded-full bg-gray-900 transition-[width] duration-500"
                                    style={{ width: `${Math.min(100, Math.max(0, turnout * 100))}%` }}
                                />
                            </div>
                        </div>
                    </StepCard>

                    <StepCard index={3} title="Count the votes">
                        <p className="mb-3 text-gray-700">After polls close, ballots are tallied. The totals are:</p>
                        <VotingBreakdown candidates={candidates} />
                    </StepCard>

                    <StepCard index={4} title="Declare the winner">
                        <p className="text-gray-700 mb-2">The candidate with the most votes is declared the winner:</p>
                        <WinnerCard candidate={winner} totalVotes={totalVotes} />
                        <p className="mt-3 text-sm text-gray-600">
                            Margin over next candidate: <span className="font-medium">{marginVotes.toLocaleString()} votes</span>{" "}
                            (<span className="font-medium">{(marginPct * 100).toFixed(1)}%</span> of registered voters).
                        </p>
                    </StepCard>
                </div>
            </div>
        </div>
    );
}
