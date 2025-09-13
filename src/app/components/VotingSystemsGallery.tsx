"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import VotingSystemCard from "./VotingSystemCard";
import VotingSystemsTable from "./VotingSystemsTable";
import { ViewToggle } from "./primitives";
import { taxonomy, votingSystems } from "@/lib/taxonomy/catalog";
import FacetFilters from "./FacetFilters";

import { useKeyFeatures } from "@/hooks/useKeyFeatures";
import { FeatureId } from "@/lib/features/types";
import {
    UnifiedFilters,
    parseFiltersFromQuery,
    GallerySystem,
    matchesUnifiedFilters,
    ANY,
    putFiltersInQuery,
    CATEGORY_KEY,
} from "@/utils/featureFilters";

/** -------- Local hook: media query for table view -------- */
function useCanUseTable(breakpoint: string = "(min-width: 768px)") {
    const [canUse, setCanUse] = React.useState(false);
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
    initialQuery,
}: {
    initialQuery?: Record<string, string | string[] | undefined>;
}) {
    const [view, setView] = React.useState<"grid" | "table">("grid");
    const canUseTable = useCanUseTable();

    // App Router bits
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize unified filters (features + category) from URL on first render
    const [filters, setFilters] = React.useState<UnifiedFilters>(() => {
        if (initialQuery) {
            const q = new URLSearchParams();
            Object.entries(initialQuery).forEach(([k, v]) => {
                if (typeof v === "string") q.set(k, v);
            });
            return parseFiltersFromQuery(q);
        }
        return parseFiltersFromQuery(new URLSearchParams(searchParams?.toString()));
    });

    // Defer filter value to keep UI responsive while computing
    const deferredFilters = React.useDeferredValue(filters);
    const [, startTransition] = React.useTransition();

    // Keep view to grid on small screens
    React.useEffect(() => {
        if (!canUseTable && view !== "grid") setView("grid");
    }, [canUseTable, view]);

    // Normalize taxonomyId presence
    const normalized = React.useMemo<GallerySystem[]>(() => {
        const fallback =
            taxonomy.find((t) => t.id === "other")?.id ||
            (taxonomy[0]?.id ?? "other");
        return votingSystems.map((s) => ({
            ...s,
            taxonomyId: s.taxonomyId ?? fallback,
        })) as GallerySystem[];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Stable list for the lazy features hook
    const systemsForKeyFeatures = React.useMemo(
        () => normalized.map(({ slug, keyFeatures }) => ({ slug, keyFeatures })),
        [normalized]
    );

    // Lazy-load keyFeatures for systems that don't have them
    const featuresBySlug = useKeyFeatures(systemsForKeyFeatures);

    // Attach loaded features without changing identity if already present
    const withFeatures = React.useMemo<GallerySystem[]>(
        () =>
            normalized.map((s) =>
                s.keyFeatures ? s : { ...s, keyFeatures: featuresBySlug[s.slug] }
            ),
        [normalized, featuresBySlug]
    );

    // Apply unified filters (category + features)
    const filtered = React.useMemo(() => {
        return withFeatures.filter((s) => matchesUnifiedFilters(s, deferredFilters));
    }, [withFeatures, deferredFilters]);

    const hasActiveFacets = React.useMemo(() => {
        return Object.entries(filters).some(([_, v]) => v && v !== ANY);
    }, [filters]);

    // Debounced + deduped URL sync (lighter than router.replace)
    const lastQsRef = React.useRef<string>("");
    React.useEffect(() => {
        const q = new URLSearchParams(searchParams?.toString());
        putFiltersInQuery(q, filters);
        const nextQs = q.toString();
        if (nextQs === lastQsRef.current) return;

        const id = setTimeout(() => {
            lastQsRef.current = nextQs;
            const url = nextQs ? `${pathname}?${nextQs}` : pathname || "/";
            window.history.replaceState(null, "", url);
            // router.replace(url, { scroll: false });
        }, 150);

        return () => clearTimeout(id);
    }, [filters, pathname, router, searchParams]);

    /** facet helpers */
    const setFacet = (
        key: keyof UnifiedFilters,
        value: UnifiedFilters[keyof UnifiedFilters]
    ) =>
        startTransition(() => {
            setFilters((prev) => ({ ...prev, [key]: value }));
        });

    const clearAllFacets = () =>
        startTransition(() => {
            setFilters(
                () =>
                    Object.fromEntries(
                        [
                            CATEGORY_KEY,
                            FeatureId.Seats,
                            FeatureId.BallotType,
                            FeatureId.MajorityGuarantee,
                            FeatureId.VoterComplexity,
                            FeatureId.TallyingComplexity,
                            FeatureId.SpoilerRisk,
                            FeatureId.StrategicPressure,
                        ].map((k) => [k as keyof UnifiedFilters, ANY])
                    ) as UnifiedFilters
            );
        });

    return (
        <div className="flex flex-col gap-4">
            <FacetFilters
                filters={filters}
                onChangeFacet={setFacet}
                onClearAll={clearAllFacets}
            />

            {/* View toggle + count */}
            <div className="mb-5 flex items-center justify-between gap-2 sm:gap-3">
                <p className="text-xs sm:text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-card-foreground">
                        {filtered.length}
                    </span>{" "}
                    {filtered.length === 1 ? "system" : "systems"}
                    {filters[CATEGORY_KEY] && filters[CATEGORY_KEY] !== ANY && (
                        <>
                            {" "}
                            in{" "}
                            <span className="font-medium text-card-foreground">
                                {String(filters[CATEGORY_KEY])}
                            </span>
                        </>
                    )}
                    {hasActiveFacets && <span> with selected filters</span>}
                </p>
                <ViewToggle
                    value={view}
                    onChange={setView}
                    allowTable={canUseTable}
                />
            </div>

            {view === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {filtered.map((s) => (
                        <VotingSystemCard key={s.id ?? s.slug} system={s} />
                    ))}
                </div>
            )}

            {view === "table" && canUseTable && (
                <VotingSystemsTable
                    systems={filtered}
                    taxonomy={taxonomy}
                    onTaxonomyClick={(id) =>
                        setFilters((prev) => ({ ...prev, [CATEGORY_KEY]: id }))
                    }
                />
            )}
        </div>
    );
}
