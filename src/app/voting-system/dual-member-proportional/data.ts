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
 * Data for dual-member proportional (DMP).
 *
 * DMP is a hybrid electoral system that elects two representatives from
 * each small district. Voters cast a single ballot for a pair of
 * candidates. The candidate with the most votes wins the first seat, while
 * the second seat is allocated to a party or candidate that is
 * under-represented based on the proportional results across all districts.
 * This method aims to provide overall proportionality while keeping
 * geographic districts small and ballot design simple.
 */
export const slug = "dual-member-proportional";
export const name = "Dual-Member Proportional";
export const aka: string[] = ["DMP"];

export const introParagraph: string = `
  Dual-member proportional representation elects two members per district.
  Voters cast one vote for a party-endorsed pair of candidates. The
  candidate with the most votes in each district wins the first seat. The
  second seat is assigned to an under-represented party to bring the overall
  seat totals closer to each party’s share of the vote across the
  jurisdiction. DMP retains the simplicity of small districts and a
  single vote while achieving proportional outcomes.
`;

export const strengths: ProsCons[] = [
  {
    title: "Maintains local representation with proportional results",
    summary:
      "Each district elects two MPs, one by plurality and one to balance proportionality.",
    details: `By electing two members per district and awarding the second
      seat to an under-represented party, DMP combines the familiarity of
      single-member plurality voting with overall proportional outcomes.`,
  },
  {
    title: "Simple ballot and small districts",
    summary: "Voters cast a single vote for a pair of candidates.",
    details: `DMP uses a straightforward ballot: each party nominates a
      pair of candidates and voters mark their preferred pair. Because
      districts remain small, constituents continue to have identifiable
      local representatives.`,
  },
  {
    title: "Reduces need for long party lists",
    summary: "Local candidates remain central.",
    details: `All representatives are elected locally rather than from
      regional or national lists. This maintains a strong link between
      elected members and their communities and can increase
      accountability compared with list-based proportional systems.`,
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Limited real-world experience",
    summary: "Largely theoretical and untested at scale.",
    details: `DMP is a relatively new proposal and has not been widely
      implemented. Its practical impacts on party systems and voter
      behaviour remain speculative, which may make policymakers
      cautious.`,
  },
  {
    title: "Complex second seat allocation",
    summary: "Determining under-representation requires calculations.",
    details: `While the ballot is simple, calculating which party receives
      the second seat in each district requires comparing overall vote
      shares and seat entitlements. This could be opaque to voters and
      open to disputes.`,
  },
  {
    title: "Potential for strategic nominations",
    summary: "Parties may game candidate pairings.",
    details: `Because one seat is allocated by plurality and the second to
      balance proportionality, parties might strategically nominate pairs
      or coordinate across districts to maximise their chances, adding
      complexity to campaigning.`,
  },
];

export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.MultiWinner, // Two representatives per district
  [FeatureId.BallotType]: BallotType.SingleChoice, // Voters cast one vote for a party/candidate
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.No, // Balancing formula may deny local majority both seats
  [FeatureId.VoterComplexity]: VoterComplexity.Low, // Just one choice
  [FeatureId.TallyingComplexity]: TallyingComplexity.Complex, // Involves proportional seat balancing
  [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // Proportional element mitigates spoilers
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Some incentive to coordinate
};



export const useCases: UseCase[] = [
  {
    country: "Canada (proposed)",
    bodies: ["Provincial legislative elections (pilot proposals)"],
  },
];
