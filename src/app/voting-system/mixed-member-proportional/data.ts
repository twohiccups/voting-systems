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
 * Data for mixed-member proportional representation (MMP).
 *
 * MMP combines single-member district elections with party-list
 * proportional representation. Voters typically have two votes: one for a
 * constituency representative and one for a party list. Constituency seats
 * are filled first using plurality or another majoritarian method, and then
 * list seats are allocated to compensate parties so that their total seat
 * share matches their overall vote share. If a party
 * wins more districts than its proportional share, overhang seats may be
 * created to maintain fairness.
 */
export const slug = "mixed-member-proportional";
export const name = "Mixed-Member Proportional";
export const aka: string[] = ["MMP"];

export const introParagraph: string = `
  Mixed-member proportional representation blends local and proportional
  representation. Electors cast separate votes for a local constituency
  candidate and for a party. All constituency winners take their seats.
  Additional seats from party lists are then allocated to ensure that the
  overall composition of the legislature reflects the proportion of party
  votes. This compensatory approach means that parties with equal vote
  shares end up with equal seat shares, even if one wins many more
  districts. Overhang seats may be added when a
  party’s district wins exceed its proportional entitlement.
`;

export const strengths: ProsCons[] = [
  {
    title: "Combines proportionality with local representation",
    summary: "Voters have both a local MP and a proportional party outcome.",
    details: `MMP retains single-member districts, giving constituents
      geographic representatives, while also ensuring that each party’s
      total number of seats matches its share of the vote. This provides
      the fairness of list PR without sacrificing local ties.`,
  },
  {
    title: "Two votes give voters flexibility",
    summary: "Support a local candidate and a different party.",
    details: `Under MMP, electors can split their votes—backing a local
      representative from one party and giving their party vote to another.
      This encourages sincere choice and can benefit smaller parties that
      lack strong local bases.`,
  },
  {
    title: "Compensatory allocation corrects distortions",
    summary: "Seats are topped up to match vote shares.",
    details: `Because list seats are allocated after district results, MMP
      corrects disproportionate outcomes. Parties with equal vote shares
      end up with equal seat shares, preventing anomalies where a party wins
      a majority of seats on a minority of votes.`,
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Complexity and dual representation",
    summary: "Two votes and two types of members may confuse voters.",
    details: `MMP ballots require voters to understand both district and
      party votes, and legislatures include two categories of members. Some
      voters may be uncertain about how their votes interact or who to hold
      accountable, potentially reducing transparency.`,
  },
  {
    title: "Overhang seats and size variability",
    summary: "Parliament size may fluctuate to preserve proportionality.",
    details: `When a party wins more constituency seats than its share of the
      party vote would allot, extra or “overhang” seats can be created,
      increasing the size of the legislature. This complicates seat
      allocation and can create tension between proportionality and fixed
      chamber sizes.`,
  },
  {
    title: "Party lists can reduce accountability",
    summary: "List MPs are chosen by party leaders.",
    details: `In many MMP systems, voters cannot influence the ranking of
      candidates on party lists. This gives party organisations considerable
      control over who enters parliament and may distance list MPs from voters.`,
  },
];

export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.MultiWinner,
  [FeatureId.BallotType]: BallotType.List, // Usually two votes (district + party list), but party list defines proportionality
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.No, // Majorities can emerge, but not guaranteed
  [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // Two votes, mixed rules
  [FeatureId.TallyingComplexity]: TallyingComplexity.Complex, // Compensatory seat allocation
  [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // Proportional correction reduces spoilers
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Split-ticket strategies
};

export const useCases: UseCase[] = [
  { country: "Germany", bodies: ["Bundestag"] },
  { country: "New Zealand", bodies: ["House of Representatives"] },
  { country: "Scotland", bodies: ["Devolved parliaments"] },
  { country: "Bolivia", bodies: ["National legislatures"] },
];
