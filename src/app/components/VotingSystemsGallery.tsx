"use client";

import * as React from "react";
import type { TaxonomySystem, VotingSystem } from "../types";
import VotingSystemCard from "./VotingSystemCard";
import { Chip, ViewToggle } from "./primitives";
import VotingSystemsTable from "./VotingSystemsTable";

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
}: {
    systems: VotingSystem[];
    taxonomy: TaxonomySystem[];
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
        <div>

            {/* Bubble filters */}
            <div className="mb-6">
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
                            ariaLabel={`Filter by ${t.id}`}
                        >
                            {t.id}
                        </Chip>
                    ))}
                </div>
            </div>

            {/* View toggle + count */}
            <div className="mb-5 flex items-center justify-between gap-2 sm:gap-3">
                <p className="text-xs sm:text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-card-foreground">
                        {filtered.length}
                    </span>{" "}
                    {filtered.length === 1 ? "system" : "systems"}
                    {active !== ALL && (
                        <>
                            {" "}in{" "}
                            <span className="font-medium text-card-foreground">
                                {activeLabel}
                            </span>
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
                <VotingSystemsTable
                    systems={filtered}
                    taxonomy={taxonomy}
                    onTaxonomyClick={(id) => setActive(id as FilterKey)}
                />
            )}
        </div>
    );
}
