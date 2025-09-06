// lib/features/catalog.ts

import {
    FeatureChoices,
    FeatureId,
    SystemFeature,
    // Item enums
    SeatType,
    BallotType,
    MajorityGuarantee,
    CountingRule,
    Proportionality,
    VoterComplexity,
    TallyingComplexity,
    BallotErrorHandling,
    SpoilerRisk,
    StrategicPressure,
    RepresentationStyle,
} from "./types";

/**
 * Canonical feature catalog (single source of truth).
 * Titles/descriptions here power UI labels, docs links, etc.
 */
export const featureCatalog: SystemFeature[] = [
    {
        id: FeatureId.Seats,
        title: "Seats",
        description:
            "Whether the election selects a single officeholder or fills multiple seats in a council or legislature.",
        items: [
            {
                label: SeatType.SingleWinner,
                detail:
                    "Produces one winner, such as a president, mayor, or district representative.",
            },
            {
                label: SeatType.MultiWinner,
                detail:
                    "Produces several winners, as in parliaments, councils, or corporate boards.",
            },
            {
                label: SeatType.Both,
                detail:
                    "The method can be used for either a single winner or multiple seats, depending on the context.",
            },
        ],
    },
    {
        id: FeatureId.BallotType,
        title: "Ballot type",
        description: "The way voters are asked to express their preferences on the ballot.",
        items: [
            {
                label: BallotType.SingleChoice,
                detail: "Voters mark only one candidate or party.",
            },
            {
                label: BallotType.MultiChoice,
                detail:
                    "Voters may select more than one option, as in block voting or approval systems.",
            },
            {
                label: BallotType.Ranked,
                detail:
                    "Voters list candidates in order of preference: first, second, third, and so on.",
            },
            {
                label: BallotType.Scored,
                detail:
                    "Voters assign numerical ratings, such as from 0 to 5 or 0 to 10.",
            },
            {
                label: BallotType.Approval,
                detail:
                    "Voters mark every candidate they find acceptable; all approvals count equally.",
            },
            {
                label: BallotType.List,
                detail:
                    "Voters choose a party list, or sometimes both a party and a preferred candidate within that list.",
            },
        ],
    },
    {
        id: FeatureId.MajorityGuarantee,
        title: "Majority guarantee",
        description:
            "Whether the rules ensure the winner commands support from more than half the voters.",
        items: [
            {
                label: MajorityGuarantee.Yes,
                detail:
                    "The winner must secure over 50% of votes or effective support, as in two-round or ranked-choice elections.",
            },
            {
                label: MajorityGuarantee.No,
                detail:
                    "A candidate may win with less than half the vote, as in first-past-the-post, approval voting, or proportional lists.",
            },
        ],
    },
    {
        id: FeatureId.Counting,
        title: "Counting rule",
        description:
            "The algorithm that translates ballots into winners or seat allocations.",
        items: [
            {
                label: CountingRule.Plurality,
                detail:
                    "The candidate with the most votes wins, even if they lack a majority.",
            },
            {
                label: CountingRule.MajorityRunoff,
                detail:
                    "A winner is chosen by requiring over 50%, either through a second round or through instant runoffs.",
            },
            {
                label: CountingRule.Transferable,
                detail:
                    "Votes are transferred from eliminated or surplus candidates, as in ranked-choice or single transferable vote.",
            },
            {
                label: CountingRule.ProportionalFormula,
                detail:
                    "Seats are distributed in proportion to vote share, using formulas such as D’Hondt, Sainte-Laguë, or the Hare quota.",
            },
            {
                label: CountingRule.PairwiseComparisons,
                detail:
                    "Candidates are compared head-to-head, as in Condorcet methods or Ranked Pairs.",
            },
            {
                label: CountingRule.Scoring,
                detail: "Candidates with the highest total score wins.",
            },
        ],
    },
    {
        id: FeatureId.Proportionality,
        title: "Proportionality",
        description:
            "How closely the final seat distribution reflects the overall share of votes.",
        items: [
            {
                label: Proportionality.Low,
                detail:
                    "Seat shares can be heavily distorted—for example, 40% of votes may yield 60% of seats under first-past-the-post.",
            },
            {
                label: Proportionality.Moderate,
                detail:
                    "Results adjust somewhat toward fairness, but are not fully proportional, as in limited vote or parallel systems.",
            },
            {
                label: Proportionality.High,
                detail:
                    "Seat shares mirror vote shares closely, as in single transferable vote or party-list proportional representation.",
            },
        ],
    },
    {
        id: FeatureId.VoterComplexity,
        title: "Voter complexity",
        description:
            "The level of effort required from voters to express their preferences accurately.",
        items: [
            {
                label: VoterComplexity.VeryLow,
                detail: "Marking a single ‘X’ on the ballot, as in first-past-the-post.",
            },
            {
                label: VoterComplexity.Low,
                detail:
                    "Selecting several options or marking approvals and disapprovals.",
            },
            {
                label: VoterComplexity.Moderate,
                detail:
                    "Ranking or scoring requires more thought about candidate order or numerical values.",
            },
            {
                label: VoterComplexity.High,
                detail:
                    "Detailed rankings or scores for many candidates, such as in large multi-seat ranked-choice elections.",
            },
        ],
    },
    {
        id: FeatureId.TallyingComplexity,
        title: "Tallying complexity",
        description:
            "The administrative difficulty of counting votes and verifying results.",
        items: [
            {
                label: TallyingComplexity.Simple,
                detail:
                    "Counting straightforward marks and declaring the highest total as winner.",
            },
            {
                label: TallyingComplexity.Moderate,
                detail:
                    "Requires formulas or multiple rounds, as in approval, cumulative, or two-round elections.",
            },
            {
                label: TallyingComplexity.Complex,
                detail:
                    "Involves iterative transfers, quotas, or head-to-head matrices, as in ranked-choice, Condorcet, or dual member proportional systems.",
            },
        ],
    },
    {
        id: FeatureId.BallotErrorHandling,
        title: "Ballot error handling",
        description:
            "How the system treats ballots with mistakes, ambiguities, or incomplete preferences.",
        items: [
            {
                label: BallotErrorHandling.Strict,
                detail:
                    "A ballot is spoiled by overvotes or invalid marks, as in first-past-the-post, block voting, or two-round elections.",
            },
            {
                label: BallotErrorHandling.Moderate,
                detail:
                    "Some errors are tolerated, but ballots may truncate or exhaust early, as in ranked-choice or single transferable vote.",
            },
            {
                label: BallotErrorHandling.Lenient,
                detail:
                    "Most partial or ambiguous ballots still count, as in approval, score, Condorcet, or party-list systems.",
            },
        ],
    },
    {
        id: FeatureId.SpoilerRisk,
        title: "Spoiler risk",
        description:
            "The chance that similar candidates split the vote and change the outcome.",
        items: [
            { label: SpoilerRisk.High, detail: "Frequent under first-past-the-post or block voting." },
            { label: SpoilerRisk.Moderate, detail: "Reduced but still possible in systems like two-round or ranked-choice." },
            { label: SpoilerRisk.Low, detail: "Largely eliminated in approval, score, or proportional systems." },
        ],
    },
    {
        id: FeatureId.StrategicPressure,
        title: "Strategic voting pressure",
        description:
            "How strongly voters feel pushed to vote insincerely to avoid worse outcomes.",
        items: [
            { label: StrategicPressure.High, detail: "Common, as in lesser-evil voting under first-past-the-post." },
            { label: StrategicPressure.Moderate, detail: "Sometimes advantageous in two-round or ranked-choice systems." },
            { label: StrategicPressure.Low, detail: "Voters can usually vote sincerely in approval, score, or proportional systems." },
        ],
    },
    {
        id: FeatureId.RepresentationStyle,
        title: "Representation style",
        description:
            "The overall philosophy of governance implied by the rule.",
        items: [
            { label: RepresentationStyle.Majoritarian, detail: "Aims to produce a single clear winner or majority government." },
            { label: RepresentationStyle.Proportional, detail: "Seeks to reflect the diversity of preferences across parties and candidates." },
            { label: RepresentationStyle.Mixed, detail: "Combines both approaches, as in mixed-member proportional or parallel systems." },
        ],
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
