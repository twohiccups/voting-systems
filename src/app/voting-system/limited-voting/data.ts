// app/voting-system/limited-voting/data.ts
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

export const name = "Limited Voting";
export const aka = ["Limited Vote", "Semi-Proportional Plurality"];

export const introParagraph: string = `
  Limited Voting is a multi-winner system where voters receive fewer votes than the
  number of seats to be filled (e.g., 2 votes for 3 seats). Candidates with the most
  votes win. By restricting each voter’s total votes, cohesive minority groups can
  concentrate support and win at least one seat, producing semi-proportional outcomes
  while keeping ballots and counting simple.
`;

export const strengths: ProsCons[] = [
    {
        title: "Improves minority representation versus block voting.",
        summary: "Fewer votes per voter let cohesive groups secure a seat.",
        details:
            "Because majority voters can’t fill every seat on the slate, disciplined minorities can focus on one or two candidates and break winner-take-all sweeps.",
    },
    {
        title: "Simple ballots and tabulation.",
        summary: "Voters mark up to a small number of names; tally is add-up-the-votes.",
        details:
            "No ranking or transfers. Counting can be conducted quickly using standard plurality totals across candidates.",
    },
    {
        title: "Flexible design knob.",
        summary: "Administrators can tune the votes-per-voter ratio to target fairness goals.",
        details:
            "Choosing how many votes each voter gets (relative to seats) adjusts the balance between majority control and minority access.",
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Strategic 'bullet voting' is common.",
        summary: "Voters may cast fewer than their allowed votes to help a favorite.",
        details:
            "Casting a single vote for a preferred candidate can be rational if splitting votes risks aiding rivals, reducing the method’s intended expressiveness.",
    },
    {
        title: "Not fully proportional.",
        summary: "Large groups can still dominate most seats.",
        details:
            "While minorities can gain access, outcomes need not track overall vote shares closely—especially if the majority coordinates well.",
    },
    {
        title: "Design sensitivity.",
        summary: "Small parameter changes can swing representation.",
        details:
            "Altering the number of votes per voter (or district magnitude) can meaningfully change who wins, so rule choices must be justified and stable.",
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.MultiWinner,
    [FeatureId.BallotType]: BallotType.MultiChoice, // voters have fewer votes than seats
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Plurality, // highest vote-getters win
    [FeatureId.Proportionality]: Proportionality.Moderate, // semi-proportional
    [FeatureId.VoterComplexity]: VoterComplexity.Low,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Simple,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict, // overvoting is a common issue to guard against
    [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate,
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // bullet-voting incentives
    [FeatureId.RepresentationStyle]: RepresentationStyle.SemiProportional,
};

export const useCases: UseCase[] = [
    {
        country: "Spain",
        bodies: [
            "Senate (voters typically have up to 3 votes in 4-seat provincial constituencies)",
        ],
    },
    {
        country: "United Kingdom (historical)",
        bodies: [
            "19th-century multi-member constituencies (Limited Vote used in some periods)",
        ],
    },
    {
        country: "United States of America",
        bodies: [
            "Various local jurisdictions (school boards, city councils) using limited voting under voting-rights settlements or local charters",
        ],
    },
];
