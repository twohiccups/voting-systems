import { ProsCons, UseCase } from "@/app/types";
import {
    BallotType,
    FeatureChoices,
    FeatureId,
    MajorityGuarantee,
    SeatType,
    SpoilerRisk,
    StrategicPressure,
    TallyingComplexity,
    VoterComplexity,
} from "@/lib/features/types";

/**
 * Data for Copeland’s method.
 *
 * Copeland’s method is a Condorcet-consistent voting rule that awards
 * points based on pairwise contests: a candidate receives one point for
 * every head-to-head win and half a point for every tie. The candidate
 * with the highest point total is elected. This simple scoring of
 * pairwise victories ensures a Condorcet winner, if one exists, will prevail.
 */
export const slug = "copelands-method";
export const name = "Copeland’s Method";
export const aka = ["Copeland Rule"];

export const introParagraph: string = `
Copeland’s method scores each candidate by counting their head-to-head
victories over all other contenders. A candidate earns one point for beating
an opponent and half a point for a tie. After tallying all pairwise contests,
the candidate with the highest score wins. If a Condorcet winner exists, that
candidate will have a higher score than any other and will be elected.
Copeland provides a simple way to apply pairwise majority rule without the
machinery of more elaborate Condorcet algorithms.
`;

export const strengths: ProsCons[] = [
    {
        title: "Condorcet-consistent and straightforward",
        summary: "Selects the pairwise majority winner when one exists.",
        details: `
Copeland ensures that if a candidate beats every other candidate in head-to-head
contests, that candidate will have the highest Copeland score and win.
The scoring rule is intuitive: one point per win and half per tie.
`,
    },
    {
        title: "Relatively simple to compute",
        summary: "Uses a basic point system on pairwise tallies.",
        details: `
Compared with methods that sort victories or build and lock graphs, Copeland
simply counts wins, losses, and ties. This can make tabulation easier to
implement and explain.
`,
    },
    {
        title: "Can produce a full ranking",
        summary: "Scores enable ordering from highest to lowest.",
        details: `
Copeland scores can be used to order candidates. When scores tie, a published
tie-break procedure is needed to obtain a strict ranking.
`,
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Ties are common and need policy",
        summary: "Equal point totals occur frequently.",
        details: `
Because the scoring is coarse, multiple candidates often finish with the same
Copeland score. Jurisdictions must specify clear tie-break rules (e.g., pairwise
margins, runoff, or random selection).
`,
    },
    {
        title: "Fails some fairness criteria",
        summary: "Violates independence of irrelevant alternatives, among others.",
        details: `
Copeland does not satisfy all desirable voting criteria. For instance, adding or
removing a losing candidate can change the outcome between two others.
`,
    },
    {
        title: "Limited adoption and familiarity",
        summary: "Rarely used in governmental elections.",
        details: `
Like other Condorcet methods, Copeland is mostly found in private organizations
and societies, so voters and officials may be less familiar with it.
`,
    },
];

export const keyFeatures: Partial<FeatureChoices> = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.Ranked,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // Condorcet winner always wins
    [FeatureId.VoterComplexity]: VoterComplexity.Moderate,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Complex, // Compute pairwise, assign win/loss points
    [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // Pairwise logic mitigates spoilers
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate,
};


export const useCases: UseCase[] = [
    {
        country: "International",
        bodies: ["Various private organizations, academic societies, and award committees"],
    },
];
