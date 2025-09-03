// VotingBreakdown.tsx
"use client";

import * as React from "react";
import type { Candidate } from "@/app/types";
import { Badge, PARTY_PALETTE, type PartyColor } from "@/app/components/primitives";

export type VotingBreakdownProps = {
    candidates: Candidate[];
    className?: string;
    onRowClick?: (candidate: Candidate) => void;
};

function resolveColor(color?: string): PartyColor {
    return (color && (color as PartyColor) in PARTY_PALETTE ? (color as PartyColor) : "gray");
}



// Progress bar with gradient (winner gets a subtle ring accent)
function ProgressBar({
    value,
    color,
}: {
    value: number;
    color?: string;
}) {
    const v = Math.max(0, Math.min(100, value));
    const p = PARTY_PALETTE[resolveColor(color)];

    return (
        <div
            role="progressbar"
            aria-valuenow={Number(v.toFixed(1))}
            aria-valuemin={0}
            aria-valuemax={100}
            className={[
                "relative w-full overflow-hidden rounded-full",
                "h-3.5",
                "bg-gray-200",
            ].join(" ")}
        >
            <div
                className={[
                    "h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none",
                    "bg-gradient-to-r",
                    p.gradFrom600,
                    p.gradTo700,
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
        <div className={["w-full space-y-3", className].filter(Boolean).join(" ")}>
            {candidates.map((c) => {
                const votes = c.total ?? 0;
                const pct = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                const pctLabel = `${pct.toFixed(1)}%`;
                const clickable = Boolean(onRowClick);
                const handleClick = () => onRowClick?.(c);
                const p = PARTY_PALETTE[resolveColor(c.color)];

                return (
                    <div
                        key={c.id}
                        className={[
                            "rounded-2xl shadow-sm p-3 md:p-4 space-y-3",
                            p.bg50, // light card background
                            clickable ? "cursor-pointer hover:opacity-95" : "",
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
                        {/* Header row */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-2 md:gap-3">
                            {/* Left: name + badge */}
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    {/* color dot */}
                                    <span
                                        className={["inline-block h-2.5 w-2.5 rounded-full flex-shrink-0", p.dot].join(" ")}
                                        aria-hidden
                                    />
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold leading-tight whitespace-normal break-words">
                                                {c.label}
                                            </span>
                                            {c.sublabel && <Badge color={c.color}>{c.sublabel}</Badge>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: numbers (second line on mobile, right-aligned on desktop) */}
                            <div className="flex items-center gap-2 justify-end text-right">                                <div className="text-sm md:text-base font-semibold tabular-nums">
                                {nf.format(votes)}
                            </div>
                                <div className="rounded-full border bg-white px-2 py-0.5 text-[11px] md:text-xs text-gray-600">
                                    {pctLabel}
                                </div>
                            </div>
                        </div>
                        {/* Bar */}
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
                <div className="mt-4 rounded-xl  bg-white p-3 md:p-4 flex items-center justify-between shadow-sm">
                    <span className="inline-flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Total votes</span>
                    </span>
                    <span className="font-semibold text-gray-900 text-base md:text-lg tabular-nums">
                        {nf.format(totalVotes)}
                    </span>
                </div>
            )}

        </div>
    );
};

export default VotingBreakdown;
