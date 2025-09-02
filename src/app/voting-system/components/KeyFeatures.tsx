"use client";

import * as React from "react";
import Link from "next/link";
import { FeatureChoices, SystemFeature } from "@/lib/features/types";
import { systemFeatures } from "@/app/features/features";



/** Optional: keep the quotes here or move elsewhere */
const electionQuotes: { quote: string; author: string }[] = [
    { quote: "It’s not the voting that’s democracy; it’s the counting.", author: "Tom Stoppard" },
    { quote: "Elections belong to the people. It’s their decision.", author: "Abraham Lincoln" },
    { quote: "The ballot is stronger than the bullet.", author: "Abraham Lincoln" },
    { quote: "Voting is a civic sacrament.", author: "Rev. Theodore Hesburgh" },
    { quote: "The ignorance of one voter in a democracy impairs the security of all.", author: "John F. Kennedy" },
    { quote: "Nobody will ever deprive the American people of the right to vote except the American people themselves, and the only way they could do this is by not voting.", author: "Franklin D. Roosevelt" },
    { quote: "The right to vote is the right upon which all other rights depend.", author: "Thomas Paine" },
    { quote: "Voting is the foundation stone of political action.", author: "Martin Luther King Jr." },
    { quote: "The biggest threat to our democracy is indifference.", author: "Barack Obama" },
    { quote: "The Ballot or the Bullet.", author: "Malcolm X" },
];

type KeyFeaturesProps = {
    /** Human-readable system name shown in the header row (e.g., “First-Past-the-Post”). */
    systemName: string;

    /**
     * Partial mapping of feature ratings for the system.
     */
    featureChoices: FeatureChoices;

    /**
     * Full feature catalog (the same array you previously imported as `systemFeatures`).
     * The component will filter this down to whatever exists in `ratings`.
     */
    /**
     * Optional anchor base for feature links. Defaults to "/features".
     * Links will be `${linkBase}#${feature.id}`.
     */
    linkBase?: string;

    /** Optional: customize the title text. Default: "Key Facts" */
    title?: string;

    /** Optional: show a random quote footer (default false) */
    showQuote?: boolean;
};

export default function KeyFeatures({
    systemName,
    featureChoices,
    linkBase = "/features",
    showQuote = false,
}: KeyFeaturesProps) {
    // Pick a random quote once per render
    const randomQuote = React.useMemo(
        () => electionQuotes[Math.floor(Math.random() * electionQuotes.length)],
        []
    );

    // Only include features that have a rating provided
    const ratedFeatures: SystemFeature[] = React.useMemo(
        () =>
            systemFeatures.filter(
                (f): f is SystemFeature =>
                    f.id in featureChoices && featureChoices[f.id as keyof FeatureChoices] !== undefined
            ),
        [featureChoices]
    );

    return (
        <div className="max-w-sm bg-white text-black border-4 border-black">
            {/* Title */}
            <div className="px-3 pt-3">
                <h3 className="text-3xl font-extrabold leading-none tracking-tight">
                    Key Features
                </h3>
                <div className="mt-2 border-b-8 border-black" />
            </div>

            {/* Meta rows */}
            <div className="px-3 py-2 text-sm">
                <div className="flex justify-between">
                    <span className="font-semibold">System</span>
                    <span>{systemName}</span>
                </div>
                <div className="border-b-4 border-black mt-1" />
            </div>

            {/* Header row */}
            <div className="px-3">
                <div className="flex items-baseline justify-between py-1">
                    <span className="text-xl font-extrabold">Impact</span>
                    <span className="text-[11px] uppercase tracking-wide text-black/70">
                        % Value*
                    </span>
                </div>
                <div className="border-b-4 border-black" />
            </div>

            {/* Feature rows */}
            <div className="px-3 py-1.5">
                {ratedFeatures.map((section, i) => {
                    const value = featureChoices[section.id as keyof FeatureChoices]!;
                    const isLast = i === ratedFeatures.length - 1;

                    return (
                        <Link
                            key={section.id}
                            href={`${linkBase}#${section.id}`}
                            className="block no-underline text-black focus:outline-none"
                            style={{ color: "inherit" }}
                        >
                            <div className="transition-colors duration-150 hover:bg-yellow-200">
                                <div className="flex items-baseline py-1.5">
                                    <span className="font-semibold">{section.title}</span>
                                    <span aria-hidden className="mx-2 flex-1" />
                                    <span className="tabular-nums text-right">{value}</span>
                                </div>
                                <div
                                    className={
                                        isLast
                                            ? "border-b-8 border-black"
                                            : i === 1 || i === 4
                                                ? "border-b-4 border-black"
                                                : "border-b border-black/70"
                                    }
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Footnotes / Random quote */}
            <div className="px-3 py-2">
                {showQuote && (
                    <p className="mt-2 text-[11px] leading-snug text-black/80 italic">
                        “{randomQuote.quote}” — {randomQuote.author}
                    </p>
                )}
            </div>
        </div>
    );
}