import { ProsCons, UseCase } from "@/app/types";
import {
    BallotErrorHandling,
    BallotType,
    CountingRule,
    FeatureChoices,
    FeatureId,
    MajorityGuarantee,
    Proportionality,
    RepresentationStyle,
    SeatType,
    SpoilerRisk,
    StrategicPressure,
    TallyingComplexity,
    VoterComplexity,
} from "@/lib/features/types";

/**
 * Data for the single transferable vote (STV).
 *
 * STV is a proportional, preferential voting system used in multi-member
 * districts. Voters rank candidates in order of preference. A quota is
 * calculated, and any candidate who achieves it is elected; surplus votes
 * beyond the quota are transferred to remaining candidates according to
 * next preferences. When no one meets the quota, the least popular
 * candidate is eliminated and their votes are transferred. This process
 * repeats until all seats are filled, ensuring that most voters help elect
 * someone and that representation is roughly proportional.
 */
export const slug = "single-transferable-vote";
export const name = "Single Transferable Vote";
export const aka: string[] = ["STV"];

export const introParagraph: string = `
  The single transferable vote is a ranked, multi-winner electoral method
  designed to combine proportional representation with voter choice. Voters
  list candidates in order of preference. Each candidate needs a certain
  number of votes (the quota) to be elected. Surplus votes and those from
  eliminated candidates are transferred to voters’ next preferences until
  enough candidates reach the quota. STV ensures that most votes help
  elect someone, prevents landslide victories, and allows voters to support
  individuals across party lines.
`;

export const strengths: ProsCons[] = [
    {
        title: "Proportional and balanced representation",
        summary: "Seats reflect the spectrum of voter preferences.",
        details: `STV provides mixed and balanced representation: parties or
      groups win seats roughly in proportion to their share of the vote,
      and no single party can easily monopolise representation. Most
      voters elect someone they support, meaning few votes are wasted.`,
    },
    {
        title: "Voters can cross party lines",
        summary: "Preferences within and across parties are honoured.",
        details: `STV allows voters to rank individual candidates from the same
      party or different parties. Supporters can promote diversity
      (gender, ethnicity, ideology) without splitting the vote or
      requiring separate parties.`,
    },
    {
        title: "Prevents landslides and extremes",
        summary: "Elimination and transfer discourage polarisation.",
        details: `By redistributing votes from surplus and least-popular candidates,
      STV prevents a single faction from sweeping all seats and reduces the
      chances that extreme or fringe candidates will prevail.`,
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Proportionality depends on district magnitude",
        summary: "Small districts can yield less proportional results.",
        details: `The degree of proportionality achieved by STV depends on how many
      seats are in each district. Smaller districts with only a few seats may
      still produce disproportionate outcomes.`,
    },
    {
        title: "Complex counting and transfers",
        summary: "Fractional transfers require precise calculations.",
        details: `Counting STV ballots involves calculating a quota and transferring
      surplus votes in fractional amounts. This often requires computer
      assistance and meticulous record-keeping, making the tallying process
      more complicated than single-round systems.`,
    },
    {
        title: "Intra-party competition and weakened party control",
        summary: "Candidates from the same party must compete against each other.",
        details: `Because voters rank individuals, multiple candidates from the same
      party may vie for the same supporters. This reduces the role of political
      parties in determining who gets elected and can lead to intra-party
      competition.`,
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.MultiWinner,
    [FeatureId.BallotType]: BallotType.Ranked,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Transferable,
    [FeatureId.Proportionality]: Proportionality.High,
    [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // was Medium
    [FeatureId.TallyingComplexity]: TallyingComplexity.Complex,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.Low,
    [FeatureId.StrategicPressure]: StrategicPressure.Low,
    [FeatureId.RepresentationStyle]: RepresentationStyle.Proportional,
};

export const useCases: UseCase[] = [
    {
        country: "Ireland",
        bodies: ["Dáil Éireann (Lower House), local elections"],
    },
    {
        country: "Malta",
        bodies: ["Parliament of Malta"],
    },
    {
        country: "Australia",
        bodies: ["Australian Senate and some state/territory legislatures"],
    },
    {
        country: "New Zealand",
        bodies: ["Local body elections and health boards"],
    },
];
