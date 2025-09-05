import { ProsCons, UseCase } from "@/app/types";
import { FeatureChoices, FeatureId, SeatType, BallotType, MajorityGuarantee, CountingRule, Proportionality, VoterComplexity, TallyingComplexity, BallotErrorHandling, SpoilerRisk, StrategicPressure, RepresentationStyle } from "@/lib/features/types";

/**
 * Data for approval voting.
 *
 * Approval voting allows each voter to select (approve) any number of
 * candidates on the ballot; there is no need to rank or limit approvals to a
 * single choice. The candidate with the most approvals wins the contest.
 * Because voters can support all candidates they find acceptable, the system
 * aims to eliminate vote splitting and elect broadly acceptable winners.
 */
export const slug = "approval-voting";
export const name = "Approval Voting";
export const aka: string[] = [];

export const introParagraph: string = `
  Approval voting is a simple yet powerful single-winner method. Instead of
  marking just one name, voters place a mark beside every candidate they
  approve of. After all ballots are counted, the candidate with the most
  approvals wins. By letting electors support multiple candidates, approval
  voting reduces the spoiler effect, encourages broad appeal and retains
  simple ballots and tallying.
`;

export const strengths: ProsCons[] = [
    {
        title: "Eliminates vote splitting",
        summary: "Voters can support all acceptable candidates.",
        details: `
      Because voters may approve of as many contenders as they wish,
      there is no need to choose between like-minded candidates. This
      removes the spoiler effect and allows minor or independent candidates
      to compete without harming ideologically similar front-runners.
    `,
    },
    {
        title: "Simple ballots and counting",
        summary: "Marking approvals is intuitive and tallying is easy.",
        details: `
      The approval ballot looks much like a standard plurality ballot,
      but voters may mark more than one name. Counting is straightforward —
      you simply add up approvals — and results are available after a single
      round.
    `,
    },
    {
        title: "Encourages positive campaigning and broad appeal",
        summary: "Candidates seek approval from a majority of voters.",
        details: `
      Research suggests approval voting can increase voter
      participation, reduce negative campaigning and elect candidates
      preferred by a majority of voters, since contenders aim to be
      approved by as many people as possible.
    `,
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: "Limited expressiveness",
        summary: "Approvals are binary—no ranking or scoring.",
        details: `
      Some critics argue that approval ballots force voters to make
      a yes/no decision on each candidate rather than expressing varying
      levels of support. This simple format may fail to capture
      intensity of preference and can feel blunt.
    `,
    },
    {
        title: "Potential strategic “bullet” voting",
        summary: "Voters might approve only one favourite to maximise influence.",
        details: `
      Because approving additional candidates could help rivals, some
      voters may choose to approve only their top choice (bullet voting),
      reducing the system’s ability to identify broadly acceptable
      candidates. Strategic considerations can therefore creep back in.
    `,
    },
    {
        title: "Majority not guaranteed",
        summary: "The winner may lack majority approval.",
        details: `
      Approval voting elects the candidate with the most approvals,
      but this total may still be well under 50% of voters if the field is
      fragmented. As a result, the system does not guarantee that the
      winner is supported by a majority of all voters.
    `,
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.Approval,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Approval,
    [FeatureId.Proportionality]: Proportionality.Low,
    [FeatureId.VoterComplexity]: VoterComplexity.VeryLow,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Simple,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.Low,
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate,
    [FeatureId.RepresentationStyle]: RepresentationStyle.Majoritarian,
};

export const useCases: UseCase[] = [
    {
        country: "Latvia",
        bodies: [
            "Saeima (open-list PR with plus/minus candidate marks—functionally similar to approval within party lists)",
        ],
    },
    {
        country: "United States",
        bodies: [
            "Local elections in St. Louis, Missouri (nonpartisan approval primary; top two advance) and Fargo, North Dakota",
        ],
    },
    {
        country: "Various organizations",
        bodies: ["Professional societies, scientific bodies and corporate boards"],
    },
];
