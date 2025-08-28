"use client";

import * as React from "react";
import {
    systemFeatures,
    // Enums (adjust import paths to where you exported them)

} from "@/app/features/features";
import { BallotErrorHandling, BallotType, CountingRule, FeatureChoices, FeatureId, MajorityGuarantee, Proportionality, RepresentationStyle, SeatType, SpoilerRisk, StrategicPressure, SystemFeature, TallyingComplexity, VoterComplexity } from "@/app/types";

// Rate only the features you want to show right now.
// (If a feature is omitted, it simply won't render.)
const fptpRatings: Partial<FeatureChoices> = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.SingleChoice,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Plurality,
    [FeatureId.Proportionality]: Proportionality.Low,
    [FeatureId.VoterComplexity]: VoterComplexity.VeryLow,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Simple,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.High,
    [FeatureId.StrategicPressure]: StrategicPressure.High,
    [FeatureId.RepresentationStyle]: RepresentationStyle.Majoritarian,
    // NOTE: "use-cases" is not a FeatureId; keep it in a separate section or add a new feature group if desired.
};

// Narrow to only rated features (type-safe guard)
const ratedFeatures: SystemFeature[] = systemFeatures.filter(
    (s): s is SystemFeature => s.id in fptpRatings && fptpRatings[s.id as keyof FeatureChoices] !== undefined
);

export default function FptpUltraCompact() {
    // 3 balanced columns
    const columns = 3;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-[var(--border)] rounded-lg border border-[var(--border)] overflow-hidden text-[12px] leading-none">
            {Array.from({ length: columns }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col">
                    {ratedFeatures
                        .filter((_, idx) => idx % columns === colIdx)
                        .map((section) => {
                            const choice = fptpRatings[section.id as keyof FeatureChoices]!;
                            return (
                                <div
                                    key={section.id}
                                    className="flex items-center justify-between px-3 py-1 border-b border-[var(--border)] last:border-b-0"
                                    title={`${section.title}: ${choice}`}
                                >
                                    <span className="text-[color:var(--card-foreground)] font-bold pr-6 whitespace-nowrap">
                                        {section.title}
                                    </span>
                                    <span className="text-[color:var(--muted-foreground)] whitespace-nowrap pl-6">
                                        {choice}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            ))}
        </div>
    );
}
