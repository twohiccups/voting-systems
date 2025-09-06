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
 * Data for the Ranked Pairs (Tideman) method.
 *
 * Ranked Pairs is a Condorcet-compliant method that orders all pairwise
 * victories from strongest to weakest and “locks in” these victories one
 * at a time, skipping any that would create a cycle. The candidate who
 * emerges unbeaten in this locked graph of victories is the winner. This
 * process respects Condorcet majority while producing a complete ranking.
 */
export const slug = "ranked-pairs";
export const name = "Ranked Pairs";
export const aka = ["Tideman Method"];

export const introParagraph: string = `
Ranked Pairs is a pairwise comparison method developed by Nicolaus Tideman.
After voters rank the candidates, all head-to-head victories are ordered by
their margin. Starting with the strongest victory, each result is “locked”
into a directed graph provided that doing so does not create a cycle. The
process continues until every comparison has been considered, producing a final
order of candidates. The candidate at the top of this order is elected.
Ranked Pairs always elects the Condorcet winner when one exists and produces a
stable, complete ranking of candidates.
`;

export const strengths: ProsCons[] = [
    {
        title: "Condorcet compliant and monotonic",
        summary: "Elects the Condorcet winner; ranking a candidate higher never hurts them.",
        details: `
Ranked Pairs satisfies the Condorcet criterion: if a candidate beats every
other candidate head-to-head, that candidate will win. It is also monotonic,
so giving a candidate a higher ranking cannot reduce their chance of winning.
`,
    },
    {
        title: "Produces a complete ranking",
        summary: "Orders all candidates from first to last.",
        details: `
Unlike methods that only pick a single winner, Ranked Pairs yields a full
ranking of candidates. This can be useful for multi-stage selections or
for providing detailed insights into voter preferences.
`,
    },
    {
        title: "Clear algorithm with moderate counting effort",
        summary: "Conceptually straightforward once pairwise tallies are available.",
        details: `
While pairwise comparisons must be computed, the core steps—sorting victories
and locking them while avoiding cycles—are implementable without advanced
mathematics. For typical candidate counts this is manageable for officials
and auditors.
`,
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Sensitive to ties and ordering of equal margins",
        summary: "Tie-breaking rules can influence outcomes.",
        details: `
If multiple pairwise victories have the same strength, different
tie-breaking procedures or ordering conventions can lead to different
final rankings. Clear published tie-break rules are important.
`,
    },
    {
        title: "Requires full pairwise data",
        summary: "More involved than plurality/IRV to tabulate and explain to the public.",
        details: `
Implementing Ranked Pairs requires computing every head-to-head matchup.
With many candidates this adds complexity, and the locking graph may be
less intuitive to lay audiences than simpler methods.
`,
    },
    {
        title: "Limited real-world adoption",
        summary: "Less familiar to voters and officials.",
        details: `
Outside of private organizations and societies, Ranked Pairs sees limited
use. Lower familiarity can create learning and trust hurdles at rollout.
`,
    },
];

// ranked-pairs (a Condorcet completion)
export const keyFeatures: Partial<FeatureChoices> = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.Ranked, // Rankings produce pairwise graph
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // Elects Condorcet winner when one exists
    [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // Ranking required
    [FeatureId.TallyingComplexity]: TallyingComplexity.Complex, // Sort/lock pairs by margin without cycles
    [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // Pairwise basis reduces classic spoilers
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Burying/cycle play still possible
};


export const useCases: UseCase[] = [
    {
        country: "International",
        bodies: [
            "Various private organizations, academic societies, and award committees (usage varies by year)",
        ],
    },
];
