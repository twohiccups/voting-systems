// VotingBreakdown.tsx
"use client";

import * as React from "react";
import type { Candidate } from "@/app/types";
import { Badge } from "@/app/components/primitives";

export type VotingBreakdownProps = {
    candidates: Candidate[];
    className?: string;
    onRowClick?: (candidate: Candidate) => void;
};

const barColor: Record<string, string> = {
    green: "bg-green-700",
    blue: "bg-blue-700",
    red: "bg-red-700",
    gray: "bg-gray-700",
};

const boxBg: Record<string, string> = {
    green: "bg-green-50",
    blue: "bg-blue-50",
    red: "bg-red-50",
    gray: "bg-gray-50",
};

function resolveColor(color?: string) {
    return color && color in barColor ? color : "gray";
}

// Progress bar for vote share (color-aware)
function ProgressBar({ value, color }: { value: number; color?: string }) {
    const v = Math.max(0, Math.min(100, value));
    const resolved = resolveColor(color);
    return (
        <div
            role="progressbar"
            aria-valuenow={Number(v.toFixed(1))}
            aria-valuemin={0}
            aria-valuemax={100}
            className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200"
        >
            <div
                className={[
                    "h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none",
                    barColor[resolved],
                ].join(" ")}
                style={{ width: `${v}%` }}
            />
        </div>
    );
}

const VotingBreakdown: React.FC<VotingBreakdownProps> = ({
    candidates,
    className,
    onRowClick,
}) => {
    const totalVotes = React.useMemo(
        () => candidates.reduce((s, c) => s + (c.total ?? 0), 0),
        [candidates]
    );
    const nf = React.useMemo(() => new Intl.NumberFormat(undefined), []);

    return (
        <div className={"w-full space-y-3 " + (className ?? "")}>
            {candidates.map((c) => {
                const votes = c.total ?? 0;
                const pct = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                const pctLabel = `${pct.toFixed(1)}%`;
                const clickable = Boolean(onRowClick);
                const handleClick = () => onRowClick?.(c);
                const displayName = `${c.label}${c.sublabel ? "" : ""}`;
                const resolved = resolveColor(c.color);

                return (
                    <div
                        key={c.id}
                        className={[
                            "rounded-xl border shadow-sm p-3 md:p-4 space-y-2",
                            boxBg[resolved],
                            clickable ? "cursor-pointer hover:opacity-80" : "",
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
                        {/* Top row: candidate + badge + votes */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="truncate text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold truncate" title={displayName}>
                                        {c.label}
                                    </span>
                                    {c.sublabel && <Badge color={c.color}>{c.sublabel}</Badge>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-right">
                                <div className="text-sm font-semibold tracking-tight md:text-base">
                                    {nf.format(votes)}
                                </div>
                                <div className="rounded-full border px-2 py-0.5 text-[11px] bg-white text-muted-foreground md:text-xs">
                                    {pctLabel}
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <ProgressBar value={pct} color={c.color} />

                        {/* SR-only text */}
                        <span className="sr-only">
                            {c.label}
                            {c.sublabel ? ` (${c.sublabel})` : ""}: {nf.format(votes)} votes ({pctLabel})
                        </span>
                    </div>
                );
            })}
            {candidates.length > 0 && (
                <div className="mt-3 rounded-lg border bg-muted/30 p-3 flex items-center justify-between text-sm md:text-base shadow-sm">
                    <span className="font-medium text-muted-foreground">Total votes</span>
                    <span className="font-semibold text-foreground text-lg">
                        {new Intl.NumberFormat().format(totalVotes)}
                    </span>
                </div>
            )}


        </div>
    );
};

export default VotingBreakdown;
