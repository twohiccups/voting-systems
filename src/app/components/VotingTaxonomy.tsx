"use client";

import * as React from "react";
import TaxonomyCard from "./TaxonomyCard";
import { TaxonomySystems } from "../../lib/taxonomy/catalog";
import { Dot, NextIcon, PrevIcon } from "./primitives";
import { TaxonomySystem } from "@/lib/taxonomy/types";


const intro = `There isn’t a single "natural" map of voting methods. This is one practical way to group them into categories—each emphasizing a different design goal or trade-off.`;

function MobileSlideshow({
    systems,
    index,
    setIndex,
    prev,
    next,
    onTouchStart,
    onTouchEnd,
}: {
    systems: TaxonomySystem[];
    index: number;
    setIndex: (i: number) => void;
    prev: () => void;
    next: () => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}) {
    if (!systems?.length) return null;

    return (
        <div
            className="md:hidden"
            aria-roledescription="carousel"
            aria-label="Voting system categories"
        >
            <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <div className="overflow-hidden rounded-xl">
                    <div className="min-h-[1px]">
                        <TaxonomyCard system={systems[index]} />
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-4 flex items-center justify-between px-2">
                    {/* Prev */}
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous slide"
                        className="inline-flex items-center justify-center rounded-xl border px-3 py-2 
              text-sm font-medium shadow-sm active:scale-[0.98]
              bg-card text-card-foreground border-border 
              hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-ring"
                    >
                        <PrevIcon className="h-5 w-5" />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                        {systems.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className="focus:outline-none"
                            >
                                <Dot active={i === index} />
                            </button>
                        ))}
                    </div>

                    {/* Next */}
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next slide"
                        className="inline-flex items-center justify-center rounded-xl border px-3 py-2 
              text-sm font-medium shadow-sm active:scale-[0.98]
              bg-card text-card-foreground border-border 
              hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-ring"
                    >
                        <NextIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VotingTaxonomy({
    systems = TaxonomySystems,
}: {
    systems?: TaxonomySystem[];
    heading?: string;
}) {
    // Hide "Other" in the UI but keep it available in the exported list for filters, etc.
    const visibleSystems = React.useMemo(
        () => (systems || []).filter((s) => s.id !== "Other"),
        [systems]
    );

    const [index, setIndex] = React.useState(0);
    const total = visibleSystems.length;

    React.useEffect(() => {
        if (index >= total) setIndex(0);
    }, [total, index]);

    const prev = () => setIndex((i) => (i - 1 + total) % total);
    const next = () => setIndex((i) => (i + 1) % total);

    const startX = React.useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (startX.current === null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
        startX.current = null;
    };

    return (
        <div className="sm:min-h-[50vh]">
            {/* Header */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <p className="mt-2 sm:mt-3 text-base sm:text-base md:text-lg text-muted-foreground">
                    {intro}
                </p>
            </div>

            {/* Mobile: slideshow */}
            <MobileSlideshow
                systems={visibleSystems}
                index={index}
                setIndex={setIndex}
                prev={prev}
                next={next}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            />

            {/* Tablet/Desktop: Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {visibleSystems.map((system) => (
                    <TaxonomyCard key={system.name} system={system} />
                ))}
            </div>
        </div>
    );
}
