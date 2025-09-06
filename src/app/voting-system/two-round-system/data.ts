// app/voting-system/two-round-system/data.ts
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

export const name = "Two-Round System";
export const aka = ["Runoff Voting", "Second Round", "TRS", "Two-Tour (France)"];

export const introParagraph: string = `
  The Two-Round System elects a single winner using up to two separate elections.
  Voters select one candidate in the first round. If no one wins a majority,
  the top two (or, in some variants, a small set of leading candidates) advance to
  a runoff where voters choose again. The method aims to ensure the winner has
  broad support while keeping ballots simple, at the cost of a second trip to the polls.
`;

export const strengths: ProsCons[] = [
  {
    title: "Majority-backed winners.",
    summary: "Runoff guarantees over-50% support in the final round.",
    details:
      "If no candidate earns a majority initially, the head-to-head runoff produces a clear mandate between the two strongest contenders.",
  },
  {
    title: "Simple ballots each round.",
    summary: "One mark for one candidate—familiar and easy to explain.",
    details:
      "No rankings or transfers for voters to learn; administration mirrors standard plurality elections, just repeated if needed.",
  },
  {
    title: "Encourages broader appeal and coalition-building.",
    summary: "Candidates seek support beyond their base for the runoff.",
    details:
      "Eliminated candidates’ supporters become pivotal, nudging finalists toward more consensus-oriented platforms and outreach.",
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Cost and turnout challenges.",
    summary: "A second election day adds expense and can depress turnout.",
    details:
      "Jurisdictions must staff and fund another round; voter fatigue or scheduling conflicts may reduce participation in the runoff.",
  },
  {
    title: "Timing delays and campaigning intensity.",
    summary: "Longer election cycles and heightened negative campaigning.",
    details:
      "Extended timelines can increase campaign costs and polarization between the two rounds.",
  },
  {
    title: "First-round vote-splitting can shape the runoff.",
    summary: "Popular compromise candidates may miss the top-two cut.",
    details:
      "If similar candidates divide support, a broadly acceptable option might be excluded from the final, despite strong second-choice appeal.",
  },
];

// two-round-system (runoff)
export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.SingleWinner,
  [FeatureId.BallotType]: BallotType.SingleChoice, // Fresh ballot in each round
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // Final round produces a majority winner
  [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // Multiple trips / decisions
  [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate, // Two separate tallies/rounds
  [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate, // First-round fragmentation can matter
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Coordination/alliances between rounds
};


export const useCases: UseCase[] = [
  {
    country: "France",
    bodies: ["Presidential elections (nationwide two rounds)", "National Assembly (runoffs in constituencies)"],
  },
  {
    country: "Brazil",
    bodies: ["Presidential elections", "Gubernatorial and mayoral elections (for larger cities)"],
  },
  {
    country: "Chile",
    bodies: ["Presidential elections (majority runoff)"],
  },
  {
    country: "Poland",
    bodies: ["Presidential elections (two-round system)"],
  },
  {
    country: "Georgia (USA)",
    bodies: ["Statewide and congressional elections in some cycles (majority-runoff variant)"],
  },
];
