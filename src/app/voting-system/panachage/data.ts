// app/voting-system/panachage/data.ts
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

export const name = "Panachage";
export const aka = ["Open-List with Cross-Party Voting", "Free List Voting"];

export const introParagraph: string = `
  Panachage lets voters pick individual candidates across different party lists in the same
  multi-member district—mixing and matching their preferred slate. In many implementations,
  voters can also give multiple votes to the same candidate (“cumulation”) and reorder
  candidates within lists. Seats are allocated proportionally at the party/list level using
  the sum of candidate votes, and those candidate totals determine who actually fills the
  seats. The system blends proportional outcomes with strong voter-level control.
`;

export const strengths: ProsCons[] = [
  {
    title: "Fine-grained voter choice across party lines.",
    summary: "Voters select people, not just parties—mix, match, and reorder.",
    details:
      "Panachage empowers voters to craft a personal slate across lists and reward individual candidates, increasing accountability and encouraging cross-party consensus candidates.",
  },
  {
    title: "Proportional-ish outcomes with reduced spoiler effects.",
    summary: "Multiple seats dampen ‘winner-take-all’ distortions.",
    details:
      "Because seats are distributed in proportion to aggregated candidate/list support, smaller groups can earn representation and ideological vote-splitting is less punishing than in single-winner systems.",
  },
  {
    title: "Encourages local and personal representation.",
    summary: "Well-known community figures can outperform party rankings.",
    details:
      "Candidate-centric voting can elevate responsive, popular individuals and foster stronger constituency links within proportional frameworks.",
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Ballot complexity and potential for voter error.",
    summary: "Many names, multiple marks, possible cumulation rules.",
    details:
      "Long candidate lists and flexible marking increase cognitive load. Clear instructions and ballot design are critical to keep error rates low.",
  },
  {
    title: "Counting, auditing, and communication are more complex.",
    summary: "Tally rules and thresholds are harder to explain.",
    details:
      "Summing candidate votes to party totals, handling cumulation, and then filling seats by candidate rank require robust procedures and voter education.",
  },
  {
    title: "Weaker party cohesion; intra-party competition.",
    summary: "Candidates compete with allies for preference votes.",
    details:
      "Open competition inside lists can fragment party messaging and encourage personalistic campaigns, sometimes at the expense of coordinated platforms.",
  },
];

export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.MultiWinner, // Multi-member districts
  [FeatureId.BallotType]: BallotType.List, // Voters may reorder and mix candidates across lists (panachage)
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.No, // No guaranteed majority winner
  [FeatureId.VoterComplexity]: VoterComplexity.High, // Many choices; sometimes cumulation allowed
  [FeatureId.TallyingComplexity]: TallyingComplexity.Complex, // Aggregate candidate votes to lists; fill seats by candidate rank
  [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // Proportional allocation mitigates spoilers
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // List management, vote distribution, and personal vote strategies
};

export const useCases: UseCase[] = [
  {
    country: "Switzerland",
    bodies: [
      "Many cantonal and communal councils (open lists with panachage and often cumulation)",
    ],
  },
  {
    country: "Luxembourg",
    bodies: ["Chamber of Deputies", "Communal councils"],
  },
  {
    country: "Liechtenstein",
    bodies: ["Landtag (national parliament)"],
  },
  {
    country: "Germany",
    bodies: [
      "Local elections in several Länder (e.g., Baden-Württemberg, Bavaria) with panachage/cumulation variants",
    ],
  },
  {
    country: "Czech Republic",
    bodies: ["Municipal elections (open lists with panachage-style candidate votes)"],
  },
  {
    country: "Belgium (select municipalities)",
    bodies: ["Certain local councils with list-open features allowing cross-list choices"],
  },
];
