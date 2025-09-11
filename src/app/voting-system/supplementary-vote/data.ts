// app/voting-system/supplementary-vote/data.ts
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

export const name = "Supplementary Vote";
export const aka = ["Contingent Vote (two-round-in-one)", "SV"];

export const introParagraph: string = `
  Supplementary Vote is a single-winner ranked method where voters mark a 1st and (optionally) a 2nd choice.
  If no one has a majority of first-choice votes, only the top two candidates remain; all other ballots are
  examined and any 2nd choices for one of the finalists are transferred to them. The finalist with the higher
  total after transfers wins. It aims to secure majority-backed winners with ballots that are simpler than full IRV.
`;

export const strengths: ProsCons[] = [
  {
    title: "Majority-backed winners without a separate runoff day.",
    summary: "Transfers from eliminated candidates push one finalist over 50%.",
    details:
      "Like a two-round runoff but completed in one count, reducing cost and turnout drop-off between rounds.",
  },
  {
    title: "Simple voter experience.",
    summary: "Only 1st and 2nd choices—no full rankings required.",
    details:
      "Clear instructions, familiar to voters who’ve used runoffs; easier education than full preferential ballots.",
  },
  {
    title: "Encourages broader appeal.",
    summary: "Finalists seek second-choice support from other camps.",
    details:
      "Since second preferences from eliminated candidates matter, campaigns have incentives to be palatable beyond their base.",
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Limited ranking can exclude consensus candidates.",
    summary: "Only top two advance—earlier eliminations can ‘lock out’ a broadly acceptable third candidate.",
    details:
      "Because only two remain for transfers, a compromise candidate outside the top two on first preferences can’t benefit from later-round support.",
  },
  {
    title: "Some strategic pressure remains.",
    summary: "Voters may feel they must pick a ‘viable’ first choice.",
    details:
      "Supporters of smaller candidates might worry about missing the top-two cut and adjust their first-choice to avoid wasting influence.",
  },
  {
    title: "Transfer step adds modest admin complexity.",
    summary: "Slightly more complex than plurality counting.",
    details:
      "Requires separating non-finalist ballots and redistributing valid second choices while handling undervotes and invalid marks.",
  },
];

// supplementary-vote (top-two with limited preferences)
export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.SingleWinner,
  [FeatureId.BallotType]: BallotType.Ranked, // First + (optional) second preference
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // Winner after transfers has majority of valid votes
  [FeatureId.VoterComplexity]: VoterComplexity.Low, // Mark 1st and (optionally) 2nd
  [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate, // Eliminate to top two, then transfer seconds
  [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate, // Reduced vs. plurality; not as robust as full IRV
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Some insincere ranking incentives
};

export const useCases: UseCase[] = [
  {
    country: "United Kingdom",
    note: " historical",
    bodies: [
      "London Mayor and many English mayoral/PCC elections (2000–2021/22, replaced by FPTP from 2023)",
    ],
  },
  {
    country: "Sri Lanka",
    bodies: [
      "Presidential elections (contingent/preferential variant with transfers to top two)",
    ],
  },
  {
    country: "Australia",
    note: "historical, state level",
    bodies: [
      "Queensland state elections (early 20th century contingent vote periods)",
    ],
  },
];
