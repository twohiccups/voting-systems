// app/voting-system/block-vote/data.ts
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

export const slug = "block-vote";
export const name = "Block Voting";
export const aka = ["Plurality-at-Large", "Block Plurality", "Multiple-Member Plurality"];

export const introParagraph: string = `
  Block Voting elects multiple winners at once in a single district.
  Each voter can support up to as many candidates as there are seats, (for example, mark up to 3 names for 3 seats.
  The candidates with the most votes fill the seats. It’s essentially plurality extended to multi-member contests:
  simple to administer and quick to count. However, because cohesive majorities can often sweep every seat,
  minorities and dispersed blocs can be significantly under-represented compared to their share of the vote.
`;

export const strengths: ProsCons[] = [
    {
        title: "Simple ballots and straightforward counting.",
        summary: "Voters mark up to S candidates; top S vote-getters win.",
        details:
            "Election workers can reuse familiar plurality processes. Audits and recounts are uncomplicated, and preliminary results arrive quickly even for large fields.",
    },
    {
        title: "Decisive outcomes and unified mandates.",
        summary: "Cohesive majorities can secure clear control.",
        details:
            "When a majority of voters aligns on a slate, governance can be more decisive because one coalition often wins most or all seats in the district.",
    },
    {
        title: "One round for multiple seats.",
        summary: "No runoffs or separate ward maps needed.",
        details:
            "Jurisdictions can fill several positions at once without designing multiple single-member districts, which can simplify logistics and reduce costs.",
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Tends to sweep seats and under-represent minorities.",
        summary: "A 51% majority can win 100% of seats.",
        details:
            "Because the rule is plurality-at-large, coordinated majorities often elect full slates while sizable minority groups may gain no representation at all.",
    },
    {
        title: "Encourages strategic coordination and ‘bullet voting’.",
        summary: "Voters may cast fewer than S marks to boost favorites.",
        details:
            "Campaigns push slate discipline; voters often withhold extra marks (‘plumping’) to avoid helping rivals, reducing sincerity and complicating voter behavior.",
    },
    {
        title: "Low proportionality and susceptibility to slate effects.",
        summary: "Seat shares can diverge sharply from vote shares.",
        details:
            "Even with multiple winners, dispersed support rarely translates into seats. Well-organized slates, name recognition, and ballot position can dominate outcomes.",
    },
];


export const keyFeatures: Partial<FeatureChoices> = {
    [FeatureId.Seats]: SeatType.MultiWinner, // Elects multiple seats
    [FeatureId.BallotType]: BallotType.MultiChoice, // Voter can pick up to k candidates
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // Cohesive majority can sweep all seats
    [FeatureId.VoterComplexity]: VoterComplexity.Low, // Just ticking k names
    [FeatureId.TallyingComplexity]: TallyingComplexity.Simple, // Count votes, top k win
    [FeatureId.SpoilerRisk]: SpoilerRisk.High, // Vote-splitting within groups
    [FeatureId.StrategicPressure]: StrategicPressure.High, // Bullet voting & slate discipline
};

export const useCases: UseCase[] = [
    {
        country: "United States",
        bodies: [
            "Many at-large city councils and school boards (varies by jurisdiction)",
        ],
    },
    {
        country: "United Kingdom",
        bodies: [
            "Many multi-member local council wards in England & Wales (plurality block vote)",
        ],
    },
    {
        country: "Canada",
        bodies: ["Numerous municipal councils that use at-large elections"],
    },
    {
        country: "Philippines",
        bodies: ["Senate (nationwide plurality-at-large for 12 seats per election)"],
    },
    {
        country: "Singapore",
        bodies: ["Group Representation Constituencies (Party Block Vote variant)"],
    },
];
