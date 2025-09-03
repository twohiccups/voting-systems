"use client";

import React from "react";
import { Badge } from "@/app/components/primitives";
import { Candidate } from "@/app/types";

export default function CandidateCard({
    candidate,
    className = "",
}: {
    candidate: Candidate;
    className?: string;
}) {
    const colorDot = (color?: string) => {
        const map: Record<string, string> = {
            red: "bg-red-500",
            blue: "bg-blue-500",
            green: "bg-green-500",
            yellow: "bg-yellow-500",
            purple: "bg-purple-500",
            gray: "bg-gray-500",
        };
        return map[color ?? "gray"] ?? map.gray;
    };

    return (
        <li
            className={[
                "rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur p-4 shadow-sm",
                "flex items-start justify-between gap-3 transition-shadow hover:shadow-md",
                className,
            ].join(" ")}
        >
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${colorDot(candidate.color)}`} />
                <span className="font-medium leading-tight whitespace-normal break-words">
                    {candidate.label}
                </span>
            </div>

            {candidate.sublabel && (
                <Badge color={candidate.color} className="shrink-0">
                    {candidate.sublabel}
                </Badge>
            )}
        </li>
    );
}
