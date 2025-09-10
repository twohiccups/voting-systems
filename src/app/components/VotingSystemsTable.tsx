"use client";

import * as React from "react";
import { Chip, Td, Th } from "./primitives";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VotingSystem, TaxonomySystem } from "@/lib/taxonomy/types";

type Props = {
    systems: VotingSystem[];
    taxonomy: TaxonomySystem[];
    onTaxonomyClick?: (taxonomyId: TaxonomySystem["id"]) => void;
    className?: string;
    zebra?: boolean;
};

export default function VotingSystemsTable({
    systems,
    taxonomy,
    className,
    zebra = true,
}: Props) {
    const router = useRouter();

    return (
        <div
            className={[
                "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)]",
                className ?? "",
            ].join(" ")}
            role="region"
            aria-label="Voting systems table"
        >
            <table className="min-w-full text-left text-xs sm:text-sm">
                <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]">
                        <Th>Name</Th>
                        <Th>Type</Th>
                        <Th>Description</Th>
                    </tr>
                </thead>
                <tbody>
                    {systems.map((s, i) => {
                        const typeName = taxonomy.find((t) => t.id === s.taxonomyId)?.name ?? "Other";
                        const rowBg = zebra && i % 2 === 1 ? "bg-[var(--muted)]" : "bg-[var(--card)]";
                        const href = `/voting-system/${s.slug}`;

                        // Stop row navigation when the Chip is clicked

                        // Make the whole row act like a link (click + keyboard)
                        const go = () => router.push(href);
                        const onRowKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                go();
                            }
                        };

                        return (
                            <tr
                                key={s.id}
                                role="link"
                                tabIndex={0}
                                aria-label={`${s.name} details`}
                                onClick={go}
                                onKeyDown={onRowKeyDown}
                                className={[
                                    "border-b last:border-0 border-[var(--border)]",
                                    rowBg,
                                    // clickable + hover highlight
                                    "cursor-pointer transition-colors hover:bg-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                                ].join(" ")}
                            >
                                <Td className="whitespace-nowrap font-medium text-[var(--card-foreground)]">
                                    {/* Keep semantic link for accessibility, but style like plain text */}
                                    <Link
                                        href={href}
                                        // remove link styling; rely on row hover instead
                                        className="no-underline text-[inherit] focus:outline-none font-bold"
                                        // avoid double-handling; let row handle navigation
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {s.name}
                                    </Link>
                                </Td>
                                <Td className="whitespace-nowrap">
                                    <Chip ariaLabel={`Filter by ${typeName}`}>
                                        {s.taxonomyId}
                                    </Chip>
                                </Td>
                                <Td className="text-[var(--muted-foreground)]">{s.shortDescription}</Td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
