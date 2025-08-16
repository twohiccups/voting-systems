// File: components/VotingSystemsGallery.tsx
"use client";

import * as React from "react";
import type { TaxonomySystem, VotingSystem } from "../types";
import VotingSystemCard from "./VotingSystemCard";
import { Chip, Td, Th, ViewToggle } from "./primitives";

/**
 * VotingSystemsGallery (theme-aware)
 * - Uses CSS variables: --card, --card-foreground, --muted, --muted-foreground, --border
 * - Disables Table/List view on small screens; forces Grid on mobile
 * - Keeps zebra striping with card/muted surfaces for contrast
 */

// Extend the provided VotingSystem with an optional taxonomyId.
export type VotingSystemWithType = VotingSystem & {
    taxonomyId?: TaxonomySystem["id"];
    href?: string;
};


function useCanUseTable(breakpoint: string = "(min-width: 768px)") {
    const [canUse, setCanUse] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (typeof window === "undefined" || !("matchMedia" in window)) return;
        const mql = window.matchMedia(breakpoint);
        const update = () => setCanUse(mql.matches);
        update();
        mql.addEventListener?.("change", update);
        return () => mql.removeEventListener?.("change", update);
    }, [breakpoint]);

    return canUse;
}

export default function VotingSystemsGallery({
    systems,
    taxonomy,
    heading = "Explore Voting Systems",
    intro = `Browse voting systems by core type. Use the bubbles to filter, then switch between a clean grid of cards or a compact table.`,
}: {
    systems: VotingSystemWithType[];
    taxonomy: TaxonomySystem[];
    heading?: string;
    intro?: string;
}) {
    const ALL = "All" as const;
    type FilterKey = typeof ALL | TaxonomySystem["id"];

    const [active, setActive] = React.useState<FilterKey>(ALL);
    const [view, setView] = React.useState<"grid" | "table">("grid");

    const canUseTable = useCanUseTable(); // md and up

    // Force grid when table is not allowed (mobile)
    React.useEffect(() => {
        if (!canUseTable && view !== "grid") setView("grid");
    }, [canUseTable, view]);

    const normalized = React.useMemo(() => {
        const fallback =
            taxonomy.find((t) => t.id === "other")?.id || (taxonomy[0]?.id ?? "other");
        return systems.map((s) => ({ ...s, taxonomyId: s.taxonomyId ?? fallback }));
    }, [systems, taxonomy]);

    const filtered = React.useMemo(() => {
        if (active === ALL) return normalized;
        return normalized.filter((s) => s.taxonomyId === active);
    }, [normalized, active]);

    const activeLabel =
        active === ALL ? "All" : taxonomy.find((t) => t.id === active)?.name ?? "Unknown";

    return (
        <section className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
            <div className="mb-5 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                    {heading}
                </h2>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-[var(--muted-foreground)] max-w-3xl">
                    {intro}
                </p>
            </div>

            {/* Bubble filters */}
            <div className="mb-5 sm:mb-6">
                <div
                    className="flex flex-wrap items-center gap-2"
                    role="tablist"
                    aria-label="Filter by voting system type"
                >
                    <Chip
                        isActive={active === ALL}
                        onClick={() => setActive(ALL)}
                        ariaLabel="Show all systems"
                    >
                        All
                    </Chip>
                    {taxonomy.map((t) => (
                        <Chip
                            key={t.id}
                            isActive={active === t.id}
                            onClick={() => setActive(t.id as FilterKey)}
                            ariaLabel={`Filter by ${t.name}`}
                        >
                            {t.id}
                        </Chip>
                    ))}
                </div>
            </div>

            {/* View toggle + count */}
            <div className="mb-4 sm:mb-5 flex items-center justify-between gap-2 sm:gap-3">
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                    Showing <span className="font-medium text-[var(--card-foreground)]">{filtered.length}</span>{" "}
                    {filtered.length === 1 ? "system" : "systems"}
                    {active !== ALL && (
                        <>
                            {" "}in <span className="font-medium text-[var(--card-foreground)]">{activeLabel}</span>
                        </>
                    )}
                </p>
                <ViewToggle value={view} onChange={setView} allowTable={canUseTable} />
            </div>

            {view === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {filtered.map((s) => (
                        <VotingSystemCard key={s.id} system={s} />
                    ))}
                </div>
            )}

            {view === "table" && canUseTable && (
                <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)]">
                    <table className="min-w-full text-left text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]">
                                <Th>Name</Th>
                                <Th>Type</Th>
                                <Th>Description</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s, i) => (
                                <tr
                                    key={s.id}
                                    className={[
                                        "border-b last:border-0 border-[var(--border)]",
                                        i % 2 === 1 ? "bg-[var(--muted)]" : "bg-[var(--card)]",
                                    ].join(" ")}
                                >
                                    <Td className="whitespace-nowrap font-medium text-[var(--card-foreground)]">
                                        {s.name}
                                    </Td>
                                    <Td className="whitespace-nowrap">
                                        <Chip onClick={() => { }}>
                                            {taxonomy.find((t) => t.id === s.taxonomyId)?.name ?? "Other"}
                                        </Chip>
                                    </Td>
                                    <Td className="text-[var(--muted-foreground)]">
                                        {s.shortDescription}
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
