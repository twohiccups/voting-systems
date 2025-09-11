// app/voting-system/instant-runoff-voting/data.ts
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

export const name = "Instant-Runoff Voting";
export const aka = ["Ranked Choice Voting", "Alternative Vote", "IRV"];

export const introParagraph: string = `
  Instant-Runoff Voting (IRV) is a ranked voting system for single-winner elections. 
  Voters rank candidates in order of preference. If no candidate has a majority of first-choice votes, 
  the candidate with the fewest votes is eliminated and their ballots are transferred to the next ranked choice. 
  This process repeats until a candidate achieves a majority. IRV seeks to ensure winners have broad support 
  while reducing the impact of vote-splitting.
`;

export const strengths: ProsCons[] = [
    {
        title: "Majority support for winners.",
        summary: "Ensures the winner has over 50% after transfers.",
        details:
            "Even if the leading candidate starts below 50%, successive eliminations consolidate support until someone commands a true majority, avoiding plurality-only outcomes.",
    },
    {
        title: "Reduces spoiler effect and strategic pressure.",
        summary: "Voters can rank sincerely without ‘wasting’ their vote.",
        details:
            "Supporters of smaller candidates can safely rank them first, knowing their ballot will still count for a major contender if their top choice is eliminated.",
    },
    {
        title: "Encourages civility and coalition-building.",
        summary: "Candidates seek second-choice support from rivals’ bases.",
        details:
            "Because transfers matter, campaigns often try to appeal to a broader audience, not just a narrow plurality, which can reward consensus candidates.",
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "More complex to explain and count.",
        summary: "Ranked ballots and iterative tallies can confuse some voters.",
        details:
            "Some voters may find ranking multiple candidates unfamiliar. Election administrators need robust counting software and clear public education.",
    },
    {
        title: "Doesn’t guarantee proportionality.",
        summary: "Still a single-winner system with majoritarian outcomes.",
        details:
            "While it avoids split votes, IRV doesn’t translate minority vote share into seats in multi-party settings—coalitions may still be underrepresented overall.",
    },
    {
        title: "Ballot exhaustion may occur.",
        summary: "Ballots that don’t rank continuing candidates drop out.",
        details:
            "If a voter ranks only one or two candidates and those are eliminated, their ballot is set aside, lowering the total active ballots in later rounds.",
    },
];

// instant-runoff-voting (IRV / ranked-choice, single-winner)
export const keyFeatures: Partial<FeatureChoices> = {
    [FeatureId.Seats]: SeatType.SingleWinner,            // Single-office election
    [FeatureId.BallotType]: BallotType.Ranked,           // Voters rank candidates
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes,// Final-round winner has a majority of continuing ballots
    [FeatureId.VoterComplexity]: VoterComplexity.Moderate,// Ranking multiple options
    [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate,// Sequential eliminations & transfers
    [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate,       // Reduced vs. plurality, but not eliminated (center-squeeze, nonmonotonicity)
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Some incentives remain; less than plurality/Borda
};


export const useCases: UseCase[] = [
    {
        country: "Australia",
        bodies: ["House of Representatives (federal)", "Most state lower houses"],
    },
    {
        country: "United States",
        bodies: [
            "Maine statewide elections (since 2018)",
            "Alaska statewide elections (since 2022, with a top-four primary)",
            "Dozens of cities (e.g. New York City, San Francisco, Minneapolis)",
        ],
    },
    {
        country: "Ireland",
        bodies: ["Presidential elections (single-winner, distinct from STV for parliament)"],
    },
    {
        country: "United Kingdom",
        bodies: ["Mayoral elections in London and some English cities (until 2021 reforms)"],
    },
    {
        country: "New Zealand",
        bodies: ["Local council and mayoral elections in several jurisdictions"],
    },
];
