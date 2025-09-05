"use client";

import * as React from "react";
import { countries } from "@/lib/countries/data";
import { UseCase } from "@/app/types";


// ---- Small helpers ----
function cx(...classes: Array<string | boolean | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function Flag({ country, className = "" }: { country: string; className?: string }) {
    const code = countries.find((c) => c.name === country)?.code;
    if (!code) return null;
    return (
        <span
            className={cx(`fi fi-${code} text-5xl`, className)}
            aria-hidden
            title={country}
        />
    );
}


function CountryTile({ item }: { item: UseCase }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="relative flex items-start gap-3 min-h-[56px]">
                <Flag country={item.country} className="h-10 w-14 flex-shrink-0" />

                {/* Default text flow (country name) */}
                <h4 className="font-semibold text-[var(--card-foreground)] group-hover:opacity-0 transition-opacity">
                    {item.country}
                </h4>

                {/* Hover layer pinned to the right of the flag */}
                <div className="pointer-events-none absolute inset-y-0 left-[calc(56px+0.75rem)] right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ul className="pointer-events-auto ml-4 list-disc space-y-1 text-sm text-[var(--card-foreground)] marker:text-[var(--muted-foreground)]">
                        {item.bodies.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


interface UseCasesProps {
    useCases: UseCase[]
}
export default function UseCases({ useCases }: UseCasesProps) {
    return (
        <div>
            <p className="mb-3 text-sm text-[var(--muted-foreground)]">
                Hover a card to see which bodies are elected and any notes.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.map((item) => (
                    <CountryTile key={item.country} item={item} />)
                )}
            </div>
        </div>
    );
}
