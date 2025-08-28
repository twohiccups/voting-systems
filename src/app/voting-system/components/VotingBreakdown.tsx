import * as React from 'react';

export type CandidateTotal = { name: string; votes: number };

export type VotingBreakdownProps = {
    totals: CandidateTotal[];
    sort?: 'desc' | 'asc' | 'none';
    highlight?: 'auto' | string | null;
    showPercent?: boolean;
    showBar?: boolean;
    barColorClass?: string;
    showTotalFooter?: boolean;
    formatVotes?: (n: number) => string;
    onRowClick?: (candidate: CandidateTotal) => void;
    className?: string;
    ariaLabel?: string;
};

export default function VotingBreakdown({
    totals,
    sort = 'desc',
    highlight = 'auto',
    showPercent = true,
    showBar = true,
    barColorClass = 'bg-green-600',
    showTotalFooter = true,
    formatVotes,
    onRowClick,
    className,
    ariaLabel = 'Voting breakdown by candidate',
}: VotingBreakdownProps) {
    const totalVotes = React.useMemo(
        () => totals.reduce((s, t) => s + t.votes, 0),
        [totals]
    );

    const sorted = React.useMemo(() => {
        if (sort === 'none') return totals.slice();
        const arr = totals.slice();
        arr.sort((a, b) => (sort === 'desc' ? b.votes - a.votes : a.votes - b.votes));
        return arr;
    }, [totals, sort]);

    const autoWinner = React.useMemo(
        () => (totals.length ? totals.reduce((max, t) => (t.votes > max.votes ? t : max), totals[0]) : null),
        [totals]
    );

    const isHighlighted = (name: string) => {
        if (highlight === null) return false;
        if (highlight === 'auto') return autoWinner?.name === name;
        return highlight === name;
    };

    const pct = (n: number) => (totalVotes === 0 ? 0 : Math.round((n / totalVotes) * 100));
    const fmtVotes = (n: number) => (formatVotes ? formatVotes(n) : n.toLocaleString());

    const handleKey = (t: CandidateTotal, e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!onRowClick) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onRowClick(t);
        }
    };

    return (
        <div className={["grid gap-3", className ?? ""].join(" ")} aria-label={ariaLabel} role="list">
            {sorted.map((t) => {
                const percent = pct(t.votes);
                const highlighted = isHighlighted(t.name);

                const rowClasses = [
                    // MOBILE: 2 cols (name | votes), % sits under name
                    // SM+:    3 cols (name | % | votes)
                    "group grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] grid-rows-[auto_auto] items-center gap-x-3 gap-y-2",
                    "rounded-2xl border p-4 transition",
                    "bg-card text-card-foreground",
                    highlighted
                        ? "border-green-600 shadow-[0_0_0_3px_rgba(22,163,74,0.12)]"
                        : "border-border hover:bg-accent/40",
                    onRowClick
                        ? "cursor-pointer focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background"
                        : ""
                ].join(" ");

                return (
                    <div
                        key={t.name}
                        role="listitem"
                        className={rowClasses}
                        onClick={onRowClick ? () => onRowClick(t) : undefined}
                        onKeyDown={(e) => handleKey(t, e)}
                        tabIndex={onRowClick ? 0 : -1}
                        data-candidate={t.name}
                    >
                        {/* name (row 1, col 1) */}
                        <div className={["min-w-0", highlighted ? "font-semibold" : ""].join(" ")}>
                            <span className="truncate" title={t.name}>{t.name}</span>
                        </div>

                        {/* votes (row 1, last col) */}
                        <div className="w-20 justify-self-end text-right sm:col-start-3">
                            <span className="font-semibold tabular-nums">{fmtVotes(t.votes)}</span>
                        </div>

                        {/* percentage
                MOBILE: under the name (row 2, col 1, left aligned)
                SM+:    row 1, middle col, right aligned with fixed width
            */}
                        {showPercent && (
                            <div
                                className="row-start-2 col-start-1 text-xs sm:row-start-1 sm:col-start-2 sm:w-12 sm:justify-self-end sm:text-right sm:text-sm tabular-nums text-muted-foreground"
                                aria-label={`${percent}% for ${t.name}`}
                            >
                                {percent}%
                            </div>
                        )}

                        {/* bar (row 2, spans full width on both layouts) */}
                        {showBar && (
                            <div
                                className="col-span-2 sm:col-span-3 h-2 w-full overflow-hidden rounded-full bg-muted/60 dark:bg-muted/30"
                                aria-hidden
                            >
                                <div
                                    className={["h-full rounded-full transition-[width] duration-700", barColorClass].join(" ")}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}

            {showTotalFooter && (
                <div className="mt-1 text-right text-xs text-muted-foreground">
                    Total ballots: <span className="tabular-nums">{totalVotes.toLocaleString()}</span>
                </div>
            )}
        </div>
    );
}
