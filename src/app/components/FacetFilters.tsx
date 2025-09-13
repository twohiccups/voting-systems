"use client";

import * as React from "react";
import { Button, Card } from "./primitives";
import { FacetSelect } from "./facets";
import { getFeature } from "@/lib/features/catalog";
import { FeatureId } from "@/lib/features/types";
import {
    UnifiedFilters,
    CATEGORY_KEY,
    facetOptions,
    categoryOptionsFrom,
    ANY,
} from "@/utils/featureFilters";
import { taxonomy } from "@/lib/taxonomy/catalog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";






type FacetFiltersProps = {
    filters: UnifiedFilters;
    onChangeFacet: (
        key: keyof UnifiedFilters,
        value: UnifiedFilters[keyof UnifiedFilters]
    ) => void;
    onClearAll: () => void;
};

const MotionCard = motion(Card);

export default function FacetFilters({
    filters,
    onChangeFacet,
    onClearAll,
}: FacetFiltersProps) {
    const options = React.useMemo(() => {
        return {
            category: categoryOptionsFrom(taxonomy),
            seats: facetOptions(FeatureId.Seats),
            ballot: facetOptions(FeatureId.BallotType),
            majority: facetOptions(FeatureId.MajorityGuarantee),
            voter: facetOptions(FeatureId.VoterComplexity),
            tally: facetOptions(FeatureId.TallyingComplexity),
            spoiler: facetOptions(FeatureId.SpoilerRisk),
            strategy: facetOptions(FeatureId.StrategicPressure),
        } as const;
    }, []);

    // Build a single config list we can map over
    const facetConfig = React.useMemo(
        () =>
            [
                {
                    key: CATEGORY_KEY as keyof UnifiedFilters,
                    label: "Category",
                    options: options.category,
                },
                {
                    key: FeatureId.Seats as unknown as keyof UnifiedFilters,
                    label: getFeature(FeatureId.Seats).title,
                    options: options.seats,
                },
                {
                    key: FeatureId.BallotType as unknown as keyof UnifiedFilters,
                    label: getFeature(FeatureId.BallotType).title,
                    options: options.ballot,
                },
                {
                    key: FeatureId.MajorityGuarantee as unknown as keyof UnifiedFilters,
                    label: getFeature(FeatureId.MajorityGuarantee).title,
                    options: options.majority,
                },
                {
                    key: FeatureId.VoterComplexity as unknown as keyof UnifiedFilters,
                    label: getFeature(FeatureId.VoterComplexity).title,
                    options: options.voter,
                },
                {
                    key: FeatureId.TallyingComplexity as unknown as keyof UnifiedFilters,
                    label: getFeature(FeatureId.TallyingComplexity).title,
                    options: options.tally,
                },
                {
                    key: FeatureId.SpoilerRisk as unknown as keyof UnifiedFilters,
                    label: getFeature(FeatureId.SpoilerRisk).title,
                    options: options.spoiler,
                },
                {
                    key: FeatureId.StrategicPressure as unknown as keyof UnifiedFilters,
                    label: getFeature(FeatureId.StrategicPressure).title,
                    options: options.strategy,
                },
            ] satisfies Array<{
                key: keyof UnifiedFilters;
                label: string;
                options: readonly unknown[] | unknown[]; // keep it flexible to match FacetSelect
            }>,
        [options]
    );

    const [open, setOpen] = React.useState(false);
    const panelId = React.useId();
    const buttonId = React.useId();
    const prefersReducedMotion = useReducedMotion();

    const hasActiveFilters = React.useMemo(
        () => Object.values(filters).some((v) => v !== ANY),
        [filters]
    );

    return (
        <div className="w-full" aria-label="Filter by features">
            <MotionCard
                layout
                transition={
                    prefersReducedMotion
                        ? { duration: 0 }
                        : { layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }
                }
            >
                {/* Toolbar */}
                <div className="flex items justify-between gap-2">
                    <Button
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls={panelId}
                    >
                        <span className="inline-flex items-center gap-2">
                            <svg
                                viewBox="0 0 24 24"
                                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                                fill="currentColor"
                                aria-hidden
                            >
                                <path d="M6.293 8.293a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
                            </svg>
                            <span>{open ? "Hide filters" : "Show filters"}</span>
                        </span>
                    </Button>

                    <Button onClick={onClearAll} aria-disabled={!hasActiveFilters}>
                        Clear filters
                    </Button>
                </div>

                {/* Expanding panel */}
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            id={panelId}
                            key="filters-panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                transition: prefersReducedMotion
                                    ? { duration: 0 }
                                    : {
                                        height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                                        opacity: { duration: 0.18, delay: 0.06 },
                                    },
                            }}
                            exit={
                                prefersReducedMotion
                                    ? { height: 0, opacity: 0, transition: { duration: 0 } }
                                    : {
                                        height: 0,
                                        opacity: 0,
                                        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                                    }
                            }
                            style={{ overflow: "hidden" }}
                            role="region"
                            aria-labelledby={buttonId}
                            className="mt-3"
                        >
                            <div
                                className="
      grid gap-3
      sm:grid-cols-2
      lg:grid-cols-4
      [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]
    "
                            >
                                {facetConfig.map(({ key, label, options }) => (
                                    <FacetSelect
                                        key={String(key)}
                                        label={label}
                                        facetKey={key}
                                        filters={filters}
                                        options={options}
                                        onChange={onChangeFacet}
                                    />
                                ))}
                            </div>
                        </motion.div>

                    )}
                </AnimatePresence>
            </MotionCard>
        </div>
    );
}
