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
 * Data for the Borda count voting system.
 *
 * The Borda count is a ranked voting method in which voters list candidates
 * in order of preference. Points are awarded according to position on each
 * ballot—if there are \(n\) candidates, the top choice receives \(n−1\)
 * points, the second choice \(n−2\), and so on. The candidate with the
 * highest total wins. By taking all preferences into account, the Borda count
 * seeks to elect broadly acceptable candidates and minimise wasted votes.
 */
export const slug = "borda-count";
export const name = "Borda Count";
export const aka = ["Borda Voting"];

export const introParagraph: string = `
  Although the idea dates back at least to the 15th century with Nicholas of
  Cusa, the Borda count was popularized by French mathematician
  Jean-Charles de Borda in the 18th century. It asks voters to rank all
  candidates. Each position on the ballot is worth a set number of points,
  with higher ranks earning more points. When all points are tallied, the
  candidate with the most points overall is declared the winner. Because every
  ranking counts, the Borda count rewards candidates who enjoy broad support
  rather than those who merely top the largest plurality.
`;


export const strengths: ProsCons[] = [
  {
    title: "Captures full preference orderings",
    summary: "Voters can express nuanced preferences among all candidates.",
    details: `The Borda count allows voters to rank candidates rather than
      picking just one. As a result, points from lower preferences still
      contribute to a candidate’s total, reducing the fear of wasting
      votes and reflecting a more complete picture of voter sentiment.`,
  },
  {
    title: "Encourages consensus outcomes",
    summary: "Moderate candidates with broad appeal can prevail.",
    details: `Because points accrue from being consistently ranked near the
      top, candidates who are acceptable to many voters—rather than
      polarising figures—tend to score well. This can discourage extreme
      campaigning and reward coalition-building.`,
  },
  {
    title: "Monotonic",
    summary: "Ranking a candidate higher never hurts that candidate.",
    details: `Under Borda, giving a candidate a higher rank cannot reduce
      their point total, which helps align voter intent with outcomes.`,
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "More complex to administer and understand",
    summary: "Counting points and ranking all candidates takes effort.",
    details: `Compared with first-past-the-post, tallying a Borda election
      requires calculating point totals across all ballots. This
      complexity increases the risk of administrative errors and can slow
      the announcement of results.`,
  },
  {
    title: "Requires voters to rank every candidate",
    summary: "Ballots are longer and may overwhelm voters.",
    details: `To function properly, the Borda count expects voters to
      assign a rank to each candidate. In contests with many
      contenders, completing the ballot can be time-consuming and may
      discourage participation or lead to arbitrary lower rankings.`,
  },
  {
    title: "Vulnerable to cloning and nomination strategies",
    summary: "Similar candidates can split points and distort outcomes.",
    details: `The Borda count does not satisfy the Condorcet criterion and
      is sensitive to the set of candidates. Introducing additional
      “clone” or spoiler candidates can siphon points and change who
      wins, even if head-to-head preferences favor another candidate.`,
  },
];


export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.SingleWinner, // Classic Borda is single-winner
  [FeatureId.BallotType]: BallotType.Ranked, // Ranks all candidates
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.No, // Majority’s favorite can lose
  [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // Ranking can be demanding
  [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate, // Point totals by rank
  [FeatureId.SpoilerRisk]: SpoilerRisk.High, // Clone candidates can distort
  [FeatureId.StrategicPressure]: StrategicPressure.High, // Burying & truncation effective
};


export const useCases: UseCase[] = [
  {
    country: "Slovenia",
    bodies: ["Reserved seats for ethnic minorities in the National Assembly (preferential/Borda-style ranking)"],
  },
  {
    country: "Nauru",
    bodies: ["Parliamentary elections (Dowdall 'modified Borda' system: 1, 1/2, 1/3, …)"],
  },
  {
    country: "Kiribati",
    bodies: ["Presidential candidate nomination by the legislature (Borda-style ranking)"],
  },
  {
    country: "Various",
    bodies: ["University senate, professional society, and sports awards elections"],
  },
];
