import * as React from "react";

export type CandidateTotal = {
    name: string; // e.g., "Alice Johnson (Green)"
    votes: number;
};

export type VotingBreakdownProps = {
    totals: CandidateTotal[];
    className?: string;
    onRowClick?: (candidate: CandidateTotal) => void;
};

// Progress bar for vote share
function ProgressBar({ value }: { value: number }) {
    const v = Math.max(0, Math.min(100, value));
    return (
        <div
            role="progressbar"
            aria-valuenow={Number(v.toFixed(1))}
            aria-valuemin={0}
            aria-valuemax={100}
            className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200"
        >
            <div
                className="h-full rounded-full bg-green-700 transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${v}%` }}
            />
        </div>
    );
}


const VotingBreakdown: React.FC<VotingBreakdownProps> = ({
    totals,
    className,
    onRowClick,
}) => {
    const totalVotes = React.useMemo(
        () => totals.reduce((s, t) => s + (t.votes || 0), 0),
        [totals]
    );
    const nf = React.useMemo(() => new Intl.NumberFormat(undefined), []);

    return (
        <div className={"w-full space-y-3 " + (className ?? "")}>
            {totals.map((t) => {
                const pct = totalVotes > 0 ? (t.votes / totalVotes) * 100 : 0;
                const pctLabel = `${pct.toFixed(1)}%`;
                const clickable = Boolean(onRowClick);
                const handleClick = () => onRowClick?.(t);

                return (
                    <div
                        key={t.name}
                        className={[
                            "rounded-xl border bg-card shadow-sm p-3 md:p-4 space-y-2",
                            clickable ? "cursor-pointer hover:bg-muted/30" : "",
                        ].join(" ")}
                        {...(clickable && {
                            role: "button" as const,
                            tabIndex: 0,
                            onClick: handleClick,
                            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleClick();
                                }
                            },
                        })}
                    >
                        {/* Top row: candidate + votes */}
                        <div className="flex items-center justify-between gap-2">
                            <div
                                className="truncate text-sm font-medium md:text-base"
                                title={t.name}
                            >
                                {t.name}
                            </div>
                            <div className="flex items-center gap-2 text-right">
                                <div className="text-sm font-semibold tracking-tight md:text-base">
                                    {nf.format(t.votes)}
                                </div>
                                <div className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground md:text-xs">
                                    {pctLabel}
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <ProgressBar value={pct} />

                        {/* SR-only text */}
                        <span className="sr-only">
                            {t.name}: {nf.format(t.votes)} votes ({pctLabel})
                        </span>
                    </div>
                );
            })}

            {totals.length > 0 && (
                <div className="p-3 flex items-center justify-between text-xs text-muted-foreground md:text-sm">
                    <span>Total votes</span>
                    <span className="font-medium text-foreground">
                        {new Intl.NumberFormat().format(totalVotes)}
                    </span>
                </div>
            )}
        </div>
    );
};

export default VotingBreakdown;
export type { CandidateTotal as CandidateTotalType };