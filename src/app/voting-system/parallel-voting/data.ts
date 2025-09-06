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
 * Data for parallel voting (also called superposition or mixed system).
 *
 * Parallel voting employs two or more distinct electoral systems side by
 * side to elect different members of a legislature. Typically, a portion of
 * seats is filled using a winner-take-all system such as first past the
 * post, while the remaining seats are allocated using proportional
 * representation. The results of each part are calculated independently and
 * then combined.
 */
export const slug = "parallel-voting";
export const name = "Parallel Voting";
export const aka: string[] = ["Superposition"];

export const introParagraph: string = `
  In a parallel voting system, two separate electoral methods operate at the
  same time. Voters typically have two votes: one for a local candidate and
  one for a party list. Some seats are awarded to district winners using a
  majoritarian or plurality method, while the rest are apportioned
  proportionally based on party votes. Because the systems run in parallel
  and do not interact, the proportional seats do not compensate for
  distortions in the majoritarian component.
`;

export const strengths: ProsCons[] = [
  {
    title: "Combines local representation and proportional elements",
    summary: "Provides both district MPs and party list MPs.",
    details: `Parallel voting offers a mix of constituency representatives
      elected by simple methods and party list members elected
      proportionally. Voters have the opportunity to support local
      personalities and ensure that parties with significant support gain
      some proportional representation.`,
  },
  {
    title: "Simpler than compensatory mixed systems",
    summary: "No need to adjust seat totals.",
    details: `Because the majoritarian and proportional parts are counted
      independently, administrators do not need to calculate top-up
      seats or handle overhangs. This makes parallel voting easier to
      implement than systems like MMP.`,
  },
  {
    title: "Encourages moderate party systems",
    summary: "Combines incentives of different electoral rules.",
    details: `The coexistence of majoritarian and proportional seats can
      favour larger parties in the district tier while giving smaller
      parties limited representation via list seats. This tends to
      balance incentives for coalition-building and local campaigning.`,
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Limited proportionality",
    summary: "List seats do not compensate for district distortions.",
    details: `Because the two components operate independently, the
      proportional tier does not correct over-representation of parties
      winning many constituency seats. The overall seat distribution
      remains tilted towards larger parties.`,
  },
  {
    title: "Unequal weight of votes",
    summary: "Voters’ influence differs across tiers.",
    details: `Votes cast in the majoritarian component may carry more
      weight than those cast for proportional seats, creating two classes
      of representatives and potential inequities. Smaller parties often
      remain under-represented.`,
  },
  {
    title: "Confusion from multiple voting rules",
    summary: "Different systems run concurrently.",
    details: `Voters must understand two separate electoral processes on
      the same ballot. The presence of district and list MPs can
      complicate accountability and create uncertainty about how votes
      translate into seats.`,
  },
];

export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.MultiWinner,
  [FeatureId.BallotType]: BallotType.List, // Typically one district vote + one party list vote
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.No, // No compensatory mechanism; majorities not guaranteed
  [FeatureId.VoterComplexity]: VoterComplexity.Moderate,
  [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate, // Separate tallies for two tiers
  [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate, // Less severe than FPTP, more than MMP
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Split-ticket and coordination
};

export const useCases: UseCase[] = [
  { country: "Japan", bodies: ["House of Representatives (lower house)"] },
  { country: "Taiwan", bodies: ["Legislative Yuan"] },
  { country: "Armenia", bodies: ["National Assembly"] },
  { country: "Russia & Argentina", bodies: ["Lower houses of parliament"] },
];
