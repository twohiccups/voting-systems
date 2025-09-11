// app/components/TaxonomyCard.tsx
"use client";

import * as React from "react";
import type { TaxonomySystem } from "@/lib/taxonomy/types";

export default function TaxonomyCard({ system }: { system: TaxonomySystem }) {
    return (
        <article
            className="group relative rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
            aria-label={system.name}
        >
            <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold leading-snug tracking-tight">
                    {system.name}
                </h3>

                {system.shortDescription ? (
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                        {system.shortDescription}
                    </p>
                ) : null}
            </div>

            {/* Optional: subtle focus ring for keyboard users */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-ring/0 focus-within:ring-2 focus-within:ring-ring/50" />
        </article>
    );
}
