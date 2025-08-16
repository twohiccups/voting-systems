// File: components/VotingTaxonomy.tsx
"use client";

import * as React from "react";
import TaxonomyCard from "./TaxonomyCard";
import { TaxonomySystems } from "../content/TaxonomySystems";
import type { TaxonomySystem } from "../types";
import { Dot, NextIcon, PrevIcon } from "./primitives";

const intro = `Voting systems vary widely — some reward simplicity, others aim for fairness or consensus. To navigate this variety, we’ve grouped the world’s voting systems into six core types, each grounded in a distinct logic of design.`;

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
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void; // <-- fix
    onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;   // <-- fix
}) {
    if (!systems?.length) return null;

    return (
        <div
            className="md:hidden"
            aria-roledescription="carousel"
            aria-label="Voting system types"
        >
            <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <div className="overflow-hidden rounded-xl">
                    <div className="min-h-[1px]">
                        <TaxonomyCard system={systems[index]} />
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                    {/* Prev */}
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous slide"
                        className="inline-flex items-center justify-center rounded-xl border px-2.5 py-1.5 
                       text-xs sm:text-sm font-medium shadow-sm active:scale-[0.98]
                       bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)] 
                       hover:bg-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 
                       focus-visible:outline-[var(--ring)]"
                    >
                        <PrevIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
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
                        className="inline-flex items-center justify-center rounded-xl border px-2.5 py-1.5 
                       text-xs sm:text-sm font-medium shadow-sm active:scale-[0.98]
                       bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)] 
                       hover:bg-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 
                       focus-visible:outline-[var(--ring)]"
                    >
                        <NextIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VotingTaxonomy({
    systems = TaxonomySystems,
    heading = "The Six Core Types of Voting Systems",
}: {
    systems?: TaxonomySystem[];
    heading?: string;
}) {
    const [index, setIndex] = React.useState(0);
    const total = systems.length;

    // Keep index in range if systems change
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
        <section className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
            {/* Header */}
            <div className="mb-5 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                    {heading}
                </h2>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-[var(--muted-foreground)] max-w-3xl">
                    {intro}
                </p>
            </div>

            {/* Mobile: slideshow */}
            <MobileSlideshow
                systems={systems}
                index={index}
                setIndex={setIndex}
                prev={prev}
                next={next}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            />

            {/* Tablet/Desktop: Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {systems.map((system) => (
                    <TaxonomyCard key={system.name} system={system} />
                ))}
            </div>
        </section>
    );
}
