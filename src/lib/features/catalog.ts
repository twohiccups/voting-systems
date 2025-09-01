import { FeatureChoices, FeatureId, SystemFeature } from "./types";


/**
 * Canonical feature catalog (single source of truth).
 * Titles/descriptions here power UI labels, docs links, etc.
 */
export const featureCatalog: SystemFeature[] = [
    {
        id: FeatureId.Seats,
        title: "Seats",
        description: "Single- or multi-winner districts.",
        items: [
            { label: "Single-winner" },
            { label: "Multi-winner" },
        ],
    },
    {
        id: FeatureId.BallotType,
        title: "Ballot type",
        description: "How voters express preferences.",
        items: [
            { label: "Single-choice" },
            { label: "Multi-choice" },
            { label: "Ranked" },
            { label: "Scored" },
            { label: "Approval" },
            { label: "List" },
        ],
    },
    {
        id: FeatureId.MajorityGuarantee,
        title: "Majority guarantee",
        description: "Winner always has a majority of support.",
        items: [{ label: "Yes" }, { label: "No" }],
    },
    {
        id: FeatureId.Counting,
        title: "Counting",
        description: "How votes are tallied.",
        items: [
            { label: "Plurality" },
            { label: "Majority runoff" },
            { label: "Transferable" },
            { label: "Proportional formula" },
            { label: "Pairwise comparisons" },
        ],
    },
    {
        id: FeatureId.Proportionality,
        title: "Proportionality",
        description: "Degree to which seats reflect vote shares.",
        items: [{ label: "Low" }, { label: "Medium" }, { label: "High" }],
    },
    {
        id: FeatureId.VoterComplexity,
        title: "Voter complexity",
        description: "How hard it is to vote correctly.",
        items: [
            { label: "Very low" },
            { label: "Low" },
            { label: "Moderate" },
            { label: "High" },
        ],
    },
    {
        id: FeatureId.TallyingComplexity,
        title: "Tallying complexity",
        description: "How hard it is to count results.",
        items: [{ label: "Simple" }, { label: "Moderate" }, { label: "Complex" }],
    },
    {
        id: FeatureId.BallotErrorHandling,
        title: "Ballot error handling",
        description: "How tolerant the system is of ballot mistakes.",
        items: [{ label: "Strict" }, { label: "Moderate" }, { label: "High tolerance" }],
    },
    {
        id: FeatureId.SpoilerRisk,
        title: "Spoiler risk",
        description: "Likelihood that similar candidates split votes.",
        items: [{ label: "High" }, { label: "Medium" }, { label: "Low" }],
    },
    {
        id: FeatureId.StrategicPressure,
        title: "Strategic pressure",
        description: "Incentive to vote strategically vs. sincerely.",
        items: [{ label: "High" }, { label: "Medium" }, { label: "Low" }],
    },
    {
        id: FeatureId.RepresentationStyle,
        title: "Representation style",
        description: "How representation is conceptualized.",
        items: [{ label: "Majoritarian" }, { label: "Proportional" }, { label: "Mixed" }],
    },
];

/** Optional: control display order everywhere from one place */
export const featureOrder: FeatureId[] = [
    FeatureId.Seats,
    FeatureId.BallotType,
    FeatureId.MajorityGuarantee,
    FeatureId.Counting,
    FeatureId.Proportionality,
    FeatureId.VoterComplexity,
    FeatureId.TallyingComplexity,
    FeatureId.BallotErrorHandling,
    FeatureId.SpoilerRisk,
    FeatureId.StrategicPressure,
    FeatureId.RepresentationStyle,
];

/** Fast lookups by id */
export const featureById = new Map<FeatureId, SystemFeature>(
    featureCatalog.map((f) => [f.id, f]),
);

/** Helper: get one feature (throws if missing so bugs surface early) */
export function getFeature(id: FeatureId): SystemFeature {
    const f = featureById.get(id);
    if (!f) throw new Error(`Unknown feature: ${id}`);
    return f;
}

/**
 * Helper: given ratings for a system, return the *ordered* subset of features
 * that actually have ratings. This is handy if you want to pre-filter before
 * passing to a component, or for building a details page.
 */
export function ratedFeaturesFor(
    ratings: Partial<FeatureChoices>,
): SystemFeature[] {
    return featureOrder
        .filter((id) => ratings[id as keyof FeatureChoices] != null)
        .map((id) => getFeature(id));
}
