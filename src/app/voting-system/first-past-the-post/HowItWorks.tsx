import { StepCircle } from "@/app/components/primitives";

// --- How It Works (rules) ---
export function HowItWorks() {
    return (
        <div className="not-prose space-y-3">
            <div className="flex items-start">
                <StepCircle num={1} />
                <p>
                    Several candidates run for the seat.
                </p>
            </div>
            <div className="flex items-start">
                <StepCircle num={2} />
                <p>
                    Each voter selects one candidate on the ballot.
                </p>
            </div>
            <div className="flex items-start">
                <StepCircle num={3} />
                <p>
                    Count the ballots: each marked candidate gets <strong>one</strong> vote.
                </p>
            </div>
            <div className="flex items-start">
                <StepCircle num={4} />
                <p>
                    The candidate with the <strong>most votes</strong> wins.
                </p>
            </div>
        </div>
    );
}
