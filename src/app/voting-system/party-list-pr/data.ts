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
 * Data for party-list proportional representation (PR).
 *
 * Party-list PR allocates seats to parties in proportion to their share of the
 * vote. Parties compile lists of candidates before the election; voters
 * either choose a party (closed lists) or vote for individual candidates on a
 * party’s list (open lists). Seats are then assigned to each party using an
 * apportionment formula, and the party’s candidates take the seats in list order
 * or according to personal vote totals.
 */
export const slug = "party-list-pr";
export const name = "Party-List Proportional Representation";
export const aka: string[] = ["List PR"];

export const introParagraph: string = `
  In party-list proportional representation, voters elect multi-member
  legislatures by casting their votes for parties rather than individuals.
  Each party presents a ranked list of candidates, and seats are
  distributed roughly in proportion to the party’s vote share. In closed
  lists, the order of candidates is fixed; in open lists, voters can
  influence which candidates from a party’s slate are elected by marking
  preferences for individuals. Apportionment methods
  such as D’Hondt or Sainte-Laguë and district magnitudes shape how closely
  the seat distribution mirrors the vote distribution.
`;

export const strengths: ProsCons[] = [
    {
        title: "Proportional results and few wasted votes",
        summary: "Seat totals reflect vote shares and minority voices are heard.",
        details: `By allocating seats in proportion to each party’s vote share,
      list PR ensures that most votes contribute to the outcome. This gives
      smaller parties and independents a better chance to win representation
      and reduces the number of wasted votes, making legislatures more
      reflective of the electorate.`,
    },
    {
        title: "Encourages diverse representation and higher turnout",
        summary: "Voters have more choice and feel their vote matters.",
        details: `List PR tends to produce parliaments composed of multiple parties.
      Voters can choose among a range of programmes knowing that their support
      is likely to translate into seats. This can motivate greater participation
      and encourage coalition and consensus-building politics.`,
    },
    {
        title: "Mitigates gerrymandering and geographic bias",
        summary: "Large districts reduce the impact of boundaries.",
        details: `Because representation is based on party vote totals rather than
      single-member constituencies, list PR lessens the effects of district
      boundary manipulation and ensures that parties with dispersed support can
      still win seats.`,
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Fragmentation and coalition governments",
        summary: "Many parties can lead to instability.",
        details: `Highly proportional systems often result in parliaments with
      numerous parties. While this diversity can be positive, it may produce
      unstable coalition governments and give small parties disproportionate
      bargaining power.`,
    },
    {
        title: "Weak constituency links and accountability",
        summary: "Voters elect parties, not individuals.",
        details: `Under closed-list PR voters cannot choose among candidates; party
      elites determine the ordering. Even in open lists, the connection between
      a representative and a specific geographic constituency is weaker than in
      district-based systems, reducing accountability.`,
    },
    {
        title: "Complex apportionment and thresholds",
        summary: "Seat allocation methods can be hard to understand.",
        details: `Apportionment formulas (such as D’Hondt or Sainte-Laguë) and
      varying district magnitudes determine how seats are distributed and may
      include vote thresholds. This complexity can confuse voters and cause
      disputes over fairness.`,
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.MultiWinner,
    [FeatureId.BallotType]: BallotType.SingleChoice, // party choice (closed) or candidate within party (open)
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Proportional,
    [FeatureId.Proportionality]: Proportionality.High,
    [FeatureId.VoterComplexity]: VoterComplexity.Low,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Medium,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.Low,
    [FeatureId.StrategicPressure]: StrategicPressure.Low,
    [FeatureId.RepresentationStyle]: RepresentationStyle.Proportional,
};

export const useCases: UseCase[] = [
    {
        country: "Netherlands",
        bodies: ["House of Representatives (Tweede Kamer)"],
    },
    {
        country: "Israel",
        bodies: ["Knesset"],
    },
    {
        country: "South Africa",
        bodies: ["National Assembly"],
    },
    {
        country: "Spain",
        bodies: ["Congress of Deputies (with province-based lists)"],
    },
];
