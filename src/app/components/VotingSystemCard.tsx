// File: components/VotingSystemCard.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import { Chip } from "./primitives";
import { VotingSystem } from "../types";

export type VotingSystemCardProps = {
    system: VotingSystem;
    className?: string;
};

export default function VotingSystemCard({
    system,
    className = "",
}: VotingSystemCardProps) {
    const { name, shortDescription, taxonomyId, slug } = system;
    const href = `/voting-system/${slug}`;

    return (
        <Link
            href={href}
            className={[
                // Surface + border + text from theme
                "group relative inline-block max-w-full rounded-xl border p-3 sm:p-4 shadow-sm transition",
                "bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]",
                // Hover/active affordances
                "hover:shadow-md active:scale-[0.998]",
                // Accessible focus outline using theme ring
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
                className,
            ].join(" ")}
            aria-label={`${name} – open details`}
        >
            {/* Title */}
            <h3
                className={[
                    "mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg font-semibold leading-snug",
                    "line-clamp-2 md:line-clamp-none lg:line-clamp-2",
                ].join(" ")}
            >
                {name}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] line-clamp-3 md:line-clamp-none lg:line-clamp-3">
                {shortDescription}
            </p>

            {/* Taxonomy Chip (decorative inside link; not focusable, not clickable) */}
            <div className="mt-3">
                <span className="pointer-events-none">
                    <Chip
                        // prevent nested interactive behavior inside <a>
                        ariaLabel={taxonomyId}
                    >
                        {taxonomyId}
                    </Chip>
                </span>
            </div>

            {/* subtle hover affordance via overlay ring (kept transparent by default) */}
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-[var(--ring)]/20" />
        </Link>
    );
}
