// app/voting-system/cumulative-voting/data.ts
import { ProsCons, UseCase } from "@/app/types";
import {
    BallotErrorHandling, BallotType, CountingRule, FeatureChoices, FeatureId,
    MajorityGuarantee, Proportionality, RepresentationStyle, SeatType,
    SpoilerRisk, StrategicPressure, TallyingComplexity, VoterComplexity
} from "@/lib/features/types";


export const name = "Cumulative Voting";
export const aka = ["Weighted Voting", "Multi-vote Plurality"];

export const introParagraph: string = `
  Cumulative voting is a multi-winner method that gives voters multiple votes—
  usually equal to the number of seats to be filled.  Voters may distribute these
  votes however they choose, including giving more than one vote to the same
  candidate.  This flexibility allows minority groups to concentrate support and
  improve their chances of electing preferred candidates, while still being simple
  to understand and implement.
`;

export const strengths: ProsCons[] = [
    {
        title: "Helps minority groups win representation.",
        summary: "Concentrated votes can secure seats even without majority support.",
        details: "By pooling votes on one candidate, cohesive groups can win seats proportional to their size, improving inclusivity in diverse communities.",
    },
    {
        title: "Simple ballots with flexible voter choice.",
        summary: "Voters allocate their votes as they wish across candidates.",
        details: "The method retains the familiarity of marking names while introducing choice in distribution, without requiring ranked preferences or complex transfers.",
    },
    {
        title: "Supports proportional outcomes without complicated tabulation.",
        summary: "Basic arithmetic: add up each candidate’s total votes.",
        details: "Results can be tallied quickly using straightforward counting procedures—no elimination rounds or transfer algorithms required.",
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Strategic voting is common.",
        summary: "Voters often must concentrate votes instead of spreading them.",
        details: "Optimal strategy usually means allocating all votes to one or two candidates, limiting the expressive value of distributing votes broadly.",
    },
    {
        title: "Can over- or under-represent fragmented groups.",
        summary: "Dispersed voting may waste ballots.",
        details: "If a group splits its votes across too many candidates, it risks failing to elect any, while disciplined groups concentrating votes may be advantaged.",
    },
    {
        title: "Less familiar to the public than plurality systems.",
        summary: "Explaining multiple votes per voter may require outreach.",
        details: "Some voters may be confused about whether they can (or should) cast all votes for one candidate, increasing the risk of miscast or undervoted ballots.",
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.MultiWinner,
    [FeatureId.BallotType]: BallotType.MultiChoice,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Plurality, // totals only
    [FeatureId.Proportionality]: Proportionality.Moderate,
    [FeatureId.VoterComplexity]: VoterComplexity.Low,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Simple,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Lenient,
    [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate,
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate,
    [FeatureId.RepresentationStyle]: RepresentationStyle.Proportional,
};

export const useCases: UseCase[] = [
    {
        country: "United States of America",
        bodies: [
            "Certain local school boards and city councils (especially under voting rights settlements)",
            "Corporate shareholder elections",
        ],
    },
    {
        country: "United Kingdom",
        bodies: ["Some private organizations and company boards"],
    },
    {
        country: "South Africa",
        bodies: ["Community and organizational elections in some sectors"],
    },
    {
        country: "Germany",
        bodies: ["Supervisory boards of companies (employee representatives)"],
    },
];
