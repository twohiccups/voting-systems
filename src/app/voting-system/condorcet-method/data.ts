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
 * Data for Condorcet methods.
 *
 * A Condorcet method elects the candidate who would beat every other
 * candidate in head-to-head comparisons. Each voter ranks the candidates,
 * and the system constructs a matrix of pairwise preferences. If there is
 * a candidate who defeats all others one-on-one, that candidate—the
 * Condorcet winner—is elected.
 */
export const slug = "condorcet-method";
export const name = "Condorcet Method";
export const aka = ["Pairwise Majority", "Schulze / Ranked Pairs (Condorcet completions)"];

export const introParagraph: string = `
  Condorcet methods look for a candidate who would win in every head-to-head
  matchup against the other contenders. Voters rank candidates, and the
  system compares each pair of candidates to see which is preferred by more
  voters. If a candidate beats all others in these pairwise contests, that
  person is the Condorcet winner and is elected. When there is no such
  candidate (a cycle), a Condorcet completion rule—such as the Schulze
  method or Ranked Pairs—selects the winner.
`;

export const strengths: ProsCons[] = [
  {
    title: "Satisfies the Condorcet criterion",
    summary: "Selects the pairwise majority winner when one exists.",
    details: `Condorcet methods guarantee that if one candidate is preferred
      to every other candidate in head-to-head matchups, that candidate
      will be elected. This aligns closely with intuitive notions of
      majority rule and eliminates vote splitting among similar candidates.`,
  },
  {
    title: "Encourages consensus candidates",
    summary: "Winners often have broad support.",
    details: `Because a Condorcet winner must defeat every opponent in
      direct comparisons, such candidates tend to be broadly acceptable
      rather than polarising. This property can moderate campaigning
      and encourage coalition-building.`,
  },
  {
    title: "Reduces impact of spoilers",
    summary: "Similar candidates do not split the vote.",
    details: `Since every pair of candidates is considered separately, the
      presence of minor or similar candidates does not automatically
      disadvantage a major candidate. Voters can rank sincerely without
      worrying that doing so will produce a spoiler effect.`,
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Possibility of cycles and ambiguity",
    summary: "No Condorcet winner may exist.",
    details: `In some elections, preferences can cycle (A beats B, B beats
      C, and C beats A). When no candidate wins all pairwise contests,
      the method must rely on secondary rules or additional algorithms
      to resolve the cycle, which can be complex and contentious.`,
  },
  {
    title: "Computational complexity and education",
    summary: "Requires pairwise comparison matrix.",
    details: `Counting a Condorcet election involves constructing and
      analysing a matrix of head-to-head results. This is more
      complicated than tallying first choices and may be less
      transparent to voters unfamiliar with the method.`,
  },
  {
    title: "Limited public use and familiarity",
    summary: "Not widely adopted in governmental elections.",
    details: `Condorcet methods are rarely used in governmental
      elections, so voters may find them novel. The administrative
      infrastructure and public understanding required could be
      barriers to adoption.`,
  },
];


export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.SingleWinner, // Single office
  [FeatureId.BallotType]: BallotType.Ranked, // Pairwise comparisons from rankings
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // Satisfies majority criterion
  [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // Ranking required
  [FeatureId.TallyingComplexity]: TallyingComplexity.Complex, // Pairwise matrix, cycles
  [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // Strong against vote-splitting
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Burying still possible
};

export const useCases: UseCase[] = [
  {
    country: "Various organisations",
    bodies: [
      "Debian Project elections (Schulze Condorcet)",
      "Ubuntu Developer Membership Board (uses Condorcet / CIVS)",
      "Many open-source communities via CIVS",
    ],
  },
];
