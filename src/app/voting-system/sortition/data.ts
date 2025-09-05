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
 * Data for sortition (selection by lot).
 *
 * Sortition allocates office by random selection rather than by voting.
 * In classical Athens, many magistracies were chosen by lot to embody
 * equality and to limit corruption and factionalism. Modern juries and
 * some citizens’ assemblies also use random selection to achieve fair
 * representation and independence from electoral pressures.
 */
export const slug = "sortition";
export const name = "Sortition";
export const aka = ["Selection by Lot", "Allotment"];

export const introParagraph: string = `
Sortition is the practice of selecting officeholders at random from an eligible
pool. In classical Athens, citizens drew lots to determine who would hold many
public offices, with the idea that random selection promoted equality and
reduced opportunities for corruption or oligarchy. Today, juries and some
deliberative citizens’ panels use sortition to create bodies that are broadly
representative and insulated from electoral campaigning.
`;

export const strengths: ProsCons[] = [
    {
        title: "Ensures equality of opportunity",
        summary: "Every eligible person has an equal chance to be selected.",
        details: `
By eliminating elections, sortition removes advantages tied to wealth, name
recognition, or campaigning. Each eligible citizen faces the same probability
of selection, which many theorists regard as a strong expression of democratic
equality.
    `,
    },
    {
        title: "Reduces corruption and factionalism",
        summary: "Random selection resists strategic manipulation.",
        details: `
Because offices are allocated by lot rather than vote-seeking, incentives for
bribery, clientelism, and permanent factional competition are reduced. Selected
members owe their position to chance rather than to donors or party machines.
    `,
    },
    {
        title: "Promotes diverse representation",
        summary: "Random samples can mirror the population.",
        details: `
A sufficiently large random sample tends to reflect community demographics more
closely than many elected bodies. This diversity can improve deliberation and
ensure a wider range of perspectives.
    `,
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Accountability and expertise concerns",
        summary: "Randomly chosen officials may be unprepared.",
        details: `
Because selection is not based on merit or public approval, some members may be
unwilling or lack relevant expertise. With no electoral constituency, external
accountability mechanisms must be designed explicitly.
    `,
    },
    {
        title: "Policy alignment is not guaranteed",
        summary: "Outcomes may diverge from majority opinion.",
        details: `
A random body can differ from public preferences on specific issues, even if it
matches demographics well. Without elections, there is no direct mandate on
policy platforms.
    `,
    },
    {
        title: "Practical limits on scope",
        summary: "Not suited for all roles or scales.",
        details: `
Sortition works best for juries or citizens’ panels with defined mandates.
Assigning major executive or legislative authority purely by lot is unlikely to
be publicly acceptable and could undermine perceived legitimacy.
    `,
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.MultiWinner, // Panels/juries typically have multiple members.
    [FeatureId.BallotType]: BallotType.SingleChoice, // No real ballot; using the closest schema fit.
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Other, // Random selection, not vote counting.
    [FeatureId.Proportionality]: Proportionality.High, // High representativeness when sampling is done well.
    [FeatureId.VoterComplexity]: VoterComplexity.VeryLow, // Public does not fill out a ballot.
    [FeatureId.TallyingComplexity]: TallyingComplexity.Simple, // Simple random draw / stratified sampling.
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // No candidates; spoiler dynamics largely irrelevant.
    [FeatureId.StrategicPressure]: StrategicPressure.Low, // Minimal campaign pressure by design.
    [FeatureId.RepresentationStyle]: RepresentationStyle.Other,
};

export const useCases: UseCase[] = [
    {
        country: "Ancient Greece",
        bodies: ["Athenian magistracies and the Council of Five Hundred"],
    },
    {
        country: "United States and other common-law countries",
        bodies: ["Juries in criminal and civil trials"],
    },
    {
        country: "Ireland, Iceland, and others",
        bodies: ["Citizens’ assemblies on constitutional or policy issues"],
    },
];
