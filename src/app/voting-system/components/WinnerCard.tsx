// WinnerCard.tsx
import * as React from 'react';

export type WinnerCardProps = {
    /** Full display name of the winner (e.g., "Brian Smith (Conservative)") */
    name: string;
    /** Raw vote count for the winner */
    votes: number;
    /** Total ballots counted across all candidates */
    totalVotes: number;
    /** Optional: override computed percentage. If omitted, computed from votes/totalVotes. */
    percentOverride?: number;
    /** Optional extra class names for outer wrapper */
    className?: string;
};

export default function WinnerCard({ name, votes, totalVotes, percentOverride, className }: WinnerCardProps) {
    const pct = (n: number, d: number) => (d === 0 ? 0 : Math.round((n / d) * 100));
    const percent = typeof percentOverride === 'number' ? Math.round(percentOverride) : pct(votes, totalVotes);

    return (
        <div
            className={[
                'relative overflow-hidden rounded-2xl border border-green-300/60',
                'bg-gradient-to-br from-green-50 to-emerald-50',
                'dark:from-green-950/30 dark:to-emerald-950/20 p-4',
                className ?? '',
            ].join(' ')}
            aria-live="polite"
        >
            <div className="pointer-events-none absolute -inset-20 z-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_45%)]" />

            <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white shadow">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-green-600">Winner</p>
                            <p className="text-lg font-semibold leading-tight">{name}</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Votes</p>
                        <p className="text-base font-semibold tabular-nums">{votes.toLocaleString()}</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div>
                    <div className="mb-1 flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">Vote share</span>
                        <span className="text-xs font-medium tabular-nums">{percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-green-200 dark:bg-green-900/40">
                        <div className="h-full rounded-full bg-green-600 transition-[width] duration-700" style={{ width: `${percent}% ` }} />
                    </div>
                </div>

                <p className="text-sm">
                    {name} wins with <strong>{votes.toLocaleString()}</strong> of {totalVotes.toLocaleString()} total votes.
                </p>
            </div>
        </div>
    );
}