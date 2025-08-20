"use client";

import { systemFeatures } from "@/app/features/features";
import * as React from "react";

const fptpRatings: Record<string, string> = {
    seats: "Single-winner",
    "ballot-type": "Single-choice",
    "majority-guarantee": "No",
    counting: "Plurality",
    proportionality: "Low",
    "voter-complexity": "Very low",
    "tallying-complexity": "Simple",
    "ballot-error-handling": "Strict",
    "spoiler-risk": "High",
    "strategic-pressure": "High",
    "representation-style": "Majoritarian",
    "use-cases": "Local and municipal elections",
};

const ratedFeatures = systemFeatures.filter((s) => fptpRatings[s.id]);

/**
 * Ultra-compact, single-mode, multi-column list with clearer column boundaries.
 * - One column on mobile, more on larger screens.
 * - Vertical dividers separate columns.
 * - Extra spacing between label and value for clarity.
 */
export default function FptpUltraCompact() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-[var(--border)] rounded-lg border border-[var(--border)] overflow-hidden text-[12px] leading-none">
            {Array.from({ length: 3 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col">
                    {ratedFeatures
                        .filter((_, idx) => idx % 3 === colIdx)
                        .map((section) => {
                            const choice = fptpRatings[section.id]!;
                            return (
                                <div
                                    key={section.id}
                                    className="flex items-center justify-between px-3 py-1 border-b border-[var(--border)] last:border-b-0"
                                    title={`${section.title}: ${choice}`}
                                >
                                    <span className="text-[color:var(--card-foreground)] font-medium pr-6 whitespace-nowrap">
                                        {section.title}
                                    </span>
                                    <span className="text-[color:var(--muted-foreground)] whitespace-nowrap pl-6">
                                        {choice}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            ))}
        </div>
    );
}
