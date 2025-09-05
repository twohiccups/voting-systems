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

/**
 * Data for the exhaustive ballot (Papal style).
 *
 * The papal conclave uses a special form of an exhaustive ballot to elect
 * the Pope of the Roman Catholic Church. Cardinal electors repeatedly cast
 * secret ballots until one candidate receives a two-thirds supermajority.
 * Between rounds, electors may reflect, pray, and discuss. Ballots are
 * burned after each round, and the smoke color signals whether a Pope was
 * elected. The procedure is designed to emphasize consensus and spiritual
 * deliberation.
 */
export const slug = "exhaustive-ballot-papal-style";
export const name = "Exhaustive Ballot (Papal Style)";
export const aka = ["Papal Conclave"];

export const introParagraph: string = `
The papal conclave employs a variant of the exhaustive ballot. In each round,
cardinal electors vote by secret ballot for one of their number. If no
candidate reaches the required two-thirds supermajority, another round is
held. This continues—typically up to four ballots per day—until a candidate
achieves the threshold. Ballots are burned after each round, with smoke
signaling the outcome. The process is intended to encourage reflection and
consensus, yielding a Pope acceptable to a supermajority of electors.
`;

export const strengths: ProsCons[] = [
    {
        title: "Supermajority consensus",
        summary: "Two-thirds support fosters broad acceptance.",
        details: `
Unlike standard majority elections, the conclave’s fixed two-thirds threshold
aims to ensure the elected pontiff commands very broad support among the
cardinals, reinforcing legitimacy and unity.
    `,
    },
    {
        title: "Secret ballot and confidentiality",
        summary: "Encourages sincere voting and flexibility between rounds.",
        details: `
Votes are cast in secret and ballots are destroyed, shielding electors from
external pressure and allowing them to change preferences across rounds without
public scrutiny.
    `,
    },
    {
        title: "Deliberative and iterative",
        summary: "Multiple rounds enable negotiation and consensus-building.",
        details: `
Electors can reassess, discuss, and coalesce around compromise candidates over
successive ballots, promoting a broadly acceptable outcome.
    `,
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Time-consuming and uncertain",
        summary: "Multiple rounds can extend the process.",
        details: `
Repeated balloting and deliberation can prolong conclaves and make timing
unpredictable, delaying the announcement of a new Pope.
    `,
    },
    {
        title: "Limited transparency",
        summary: "Secrecy reduces public insight and ex-post accountability.",
        details: `
The confidentiality that protects electors also obscures the decision process,
inviting speculation and limiting outside scrutiny.
    `,
    },
    {
        title: "Not a general template",
        summary: "Religious and ceremonial context is unique.",
        details: `
The conclave’s spiritual aims and rituals make it ill-suited as a model for
secular public elections, restricting broader applicability.
    `,
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.SingleChoice,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No, // Simple majority is not sufficient; two-thirds required.
    [FeatureId.Counting]: CountingRule.Runoff, // Iterated secret ballots until threshold met.
    [FeatureId.Proportionality]: Proportionality.Low,
    [FeatureId.VoterComplexity]: VoterComplexity.Low, // Single name per round.
    [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate, // Multiple rounds with strict procedures.
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate, // Vote-splitting can delay convergence.
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Internal bargaining/bloc dynamics matter.
    [FeatureId.RepresentationStyle]: RepresentationStyle.Majoritarian,
};

export const useCases: UseCase[] = [
    {
        country: "Vatican City",
        bodies: ["Election of the Pope by the College of Cardinals"],
    },
];
