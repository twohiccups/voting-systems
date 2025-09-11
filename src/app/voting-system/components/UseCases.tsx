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

    // text-5xl sets the scale; w/h in em keep the 4:3 footprint
    const box = "inline-block text-5xl leading-none w-[1.333333em] h-[1em]";

    return (
        <span
            className={cx(code ? `fi fi-${code}` : "", box, className)}
            aria-hidden
            title={code ? country : "No flag"}
        />
    );
}

function CountryTile({ item }: { item: UseCase }) {
    return (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
            <div className="flex items-start gap-3">
                <Flag country={item.country} className="h-10 w-14 flex-shrink-0" />
                <div className="min-w-0">
                    <h4 className="font-semibold text-[var(--card-foreground)] flex items-center gap-2">
                        <span>{item.country}</span>
                        {item.note ? (
                            <span className="text-xs text-[var(--muted-foreground)] font-normal">
                                {item.note}
                            </span>
                        ) : null}
                    </h4>
                    <ul className="ml-4 list-disc space-y-1 text-sm text-[var(--card-foreground)] marker:text-[var(--muted-foreground)]">
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
    useCases: UseCase[];
}

export default function UseCases({ useCases }: UseCasesProps) {
    return (
        <div>
            <p className="mb-3 text-sm text-[var(--muted-foreground)]">
                Each card shows which bodies are elected and any notes.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.map((item) => (
                    <CountryTile key={item.country} item={item} />
                ))}
            </div>
        </div>
    );
}
