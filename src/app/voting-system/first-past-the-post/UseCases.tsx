'use client';

import * as React from "react";
// global import of flag-icons CSS should be in layout.tsx, not here

export type FPTPApplication = {
    country:
    | "United Kingdom"
    | "United States of America"
    | "Canada"
    | "India"
    | "Bangladesh"
    | "Nigeria"
    | "Pakistan"
    | "Malaysia"
    | "Nepal"
    | "Jamaica";
    code: "gb" | "us" | "ca" | "in" | "bd" | "ng" | "pk" | "my" | "np" | "jm";
    bodies: string[];
    notes?: string;
};

const DATA: FPTPApplication[] = [
    {
        country: "United Kingdom",
        code: "gb",
        bodies: ["House of Commons (general elections)"],
        notes: "Single-member constituencies; plurality wins.",
    },
    {
        country: "United States of America",
        code: "us",
        bodies: [
            "U.S. House of Representatives (most states use single-member districts)",
            "Most state legislatures",
            "Many local & mayoral races",
        ],
        notes: "Plurality (most votes) wins in single-member districts.",
    },
    {
        country: "Canada",
        code: "ca",
        bodies: ["House of Commons (federal)", "Most provincial legislatures"],
        notes: "Also called single-member plurality (SMP).",
    },
    {
        country: "India",
        code: "in",
        bodies: ["Lok Sabha (lower house of Parliament)", "Most State Assemblies"],
        notes: "Plurality in single-member constituencies.",
    },
    {
        country: "Bangladesh",
        code: "bd",
        bodies: ["Jatiya Sangsad (National Parliament)"],
        notes: "Single-member constituencies; plurality wins.",
    },
    {
        country: "Nigeria",
        code: "ng",
        bodies: ["House of Representatives", "Senate"],
        notes:
            "Senators elected from single-member senatorial districts; plurality wins.",
    },
    {
        country: "Pakistan",
        code: "pk",
        bodies: ["National Assembly", "Provincial Assemblies"],
        notes: "Single-member constituencies; plurality wins.",
    },
    {
        country: "Malaysia",
        code: "my",
        bodies: ["Dewan Rakyat (House of Representatives)"],
        notes: "Single-member constituencies; plurality wins.",
    },
    {
        country: "Nepal",
        code: "np",
        bodies: ["House of Representatives (165 of 275 seats via FPTP)"],
        notes: "Mixed: FPTP + proportional representation.",
    },
    {
        country: "Jamaica",
        code: "jm",
        bodies: ["House of Representatives"],
        notes: "Single-member constituencies; plurality wins.",
    },
];

function Flag({
    code,
    className = "",
}: {
    code: FPTPApplication["code"];
    className?: string;
}) {
    return (
        <span
            className={`fi fi-${code} text-4xl ${className}`} // bigger with text-4xl
            aria-hidden
        />
    );
}



export default function UseCases() {
    return (
        <>

            <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                Countries that use FPTP and the bodies elected by it.
            </p>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {DATA.map((item) => (
                    <li
                        key={item.code}
                        className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-sm sm:p-4"
                    >
                        <div className="mb-2 flex items-center gap-3">
                            <Flag code={item.code} className="h-8 w-12" />
                            <h4 className="font-semibold text-[var(--card-foreground)]">
                                {item.country}
                            </h4>
                        </div>
                        <ul className="ml-5 list-disc space-y-1 text-sm">
                            {item.bodies.map((b, i) => (
                                <li key={i} className="text-[var(--card-foreground)]">
                                    {b}
                                </li>
                            ))}
                        </ul>
                        {item.notes ? (
                            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                                {item.notes}
                            </p>
                        ) : null}
                    </li>
                ))}
            </ul>
        </>
    );
}
