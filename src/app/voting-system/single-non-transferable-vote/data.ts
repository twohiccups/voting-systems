// app/voting-system/single-non-transferable-vote/data.ts
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

export const name = "Single Non-Transferable Vote";
export const aka = ["SNTV"];

export const introParagraph: string = `
  Single Non-Transferable Vote (SNTV) is a multi-winner system in which each voter
  casts exactly one vote, even though multiple seats are being filled. The top
  candidates by vote total win the available seats. This simple design can give
  minority groups a chance at representation if they concentrate support, but it
  also requires parties to manage their vote distribution carefully to avoid
  wasting support on surplus votes for popular candidates.
`;

export const strengths: ProsCons[] = [
  {
    title: "Simple ballot and counting.",
    summary: "Each voter marks one candidate; highest vote-getters win.",
    details:
      "No rankings or transfers—just tally votes and award seats to the top finishers. Easy to explain and administer without complex algorithms.",
  },
  {
    title: "Allows minority representation.",
    summary: "Cohesive groups can elect a candidate even with less than majority support.",
    details:
      "If a group represents 20% of voters in a 5-seat district, it can often secure 1 seat by rallying behind one candidate.",
  },
  {
    title: "Encourages diverse candidates.",
    summary: "Parties nominate broader slates to maximize seat chances.",
    details:
      "Because one candidate can’t soak up surplus votes, parties often recruit multiple candidates to appeal to different voter segments.",
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Vote-splitting risk for parties.",
    summary: "Poor vote management can waste support.",
    details:
      "If too many voters pile onto one candidate, that candidate wins easily but surplus votes are wasted, potentially costing the group other seats.",
  },
  {
    title: "Strategic and tactical demands.",
    summary: "Parties must carefully direct supporters to balance votes.",
    details:
      "Requires coordination, which may be hard to enforce in large electorates. Mismanagement can hand seats to opponents with less total support.",
  },
  {
    title: "Not fully proportional.",
    summary: "Seat shares don’t always match vote shares.",
    details:
      "While better than block voting, SNTV does not systematically translate votes to seats—fragmented groups may still be underrepresented.",
  },
];

export const keyFeatures: FeatureChoices = {
  [FeatureId.Seats]: SeatType.MultiWinner,
  [FeatureId.BallotType]: BallotType.SingleChoice,
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
  [FeatureId.Counting]: CountingRule.Plurality, // top vote-getters win
  [FeatureId.Proportionality]: Proportionality.Moderate, // semi-proportional
  [FeatureId.VoterComplexity]: VoterComplexity.Low,
  [FeatureId.TallyingComplexity]: TallyingComplexity.Simple,
  [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
  [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate,
  [FeatureId.StrategicPressure]: StrategicPressure.High, // parties must coordinate
  [FeatureId.RepresentationStyle]: RepresentationStyle.SemiProportional,
};

export const useCases: UseCase[] = [
  {
    country: "Japan (historical)",
    bodies: ["House of Representatives (multi-member districts, until 1994 reform)"],
  },
  {
    country: "Taiwan",
    bodies: ["Legislative Yuan (before 2008 reform)", "Local councils (in some cases)"],
  },
  {
    country: "Afghanistan",
    bodies: ["Wolesi Jirga (House of the People)"],
  },
  {
    country: "Jordan",
    bodies: ["House of Representatives (various elections)"],
  },
  {
    country: "Vanuatu",
    bodies: ["Parliament (multi-member constituencies)"],
  },
];
