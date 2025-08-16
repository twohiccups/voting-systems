"use client";

import * as React from "react";
import type { TaxonomySystem, VotingSystem } from "../types";
import { Chip, Td, Th } from "./primitives";



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
    onTaxonomyClick,
    className,
    zebra = true,
}: Props) {
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
                        const typeName =
                            taxonomy.find((t) => t.id === s.taxonomyId)?.name ?? "Other";
                        const rowBg =
                            zebra && i % 2 === 1 ? "bg-[var(--muted)]" : "bg-[var(--card)]";
                        return (
                            <tr
                                key={s.id}
                                className={[
                                    "border-b last:border-0 border-[var(--border)]",
                                    rowBg,
                                ].join(" ")}
                            >
                                <Td className="whitespace-nowrap font-medium text-[var(--card-foreground)]">
                                    {s.name}
                                </Td>
                                <Td className="whitespace-nowrap">
                                    <Chip
                                        onClick={
                                            onTaxonomyClick && s.taxonomyId
                                                ? () => onTaxonomyClick(s.taxonomyId as TaxonomySystem["id"])
                                                : undefined
                                        }
                                        ariaLabel={`Filter by ${typeName}`}
                                    >
                                        {s.taxonomyId}
                                    </Chip>
                                </Td>
                                <Td className="text-[var(--muted-foreground)]">
                                    {s.shortDescription}
                                </Td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
