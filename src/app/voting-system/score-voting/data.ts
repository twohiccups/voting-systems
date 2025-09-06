import { ProsCons, UseCase } from "@/app/types";
import { FeatureChoices, FeatureId, SeatType, BallotType, MajorityGuarantee, VoterComplexity, TallyingComplexity, SpoilerRisk, StrategicPressure } from "@/lib/features/types";

/**
 * Data for score (range) voting.
 *
 * Score voting—also called range voting—asks voters to rate each candidate on
 * a numerical scale. The candidate with the highest average or total score
 * wins. This system generalises approval voting by allowing partial
 * approval, letting electors express how strongly they support each
 * contender.
 */
export const slug = "score-voting";
export const name = "Score Voting";
export const aka: string[] = ["Range Voting"];

export const introParagraph: string = `
  In score voting, each voter assigns every candidate a score within a
  predefined range (for example 0–5 or 0–10). All scores are
  aggregated—typically by averaging—and the candidate with the highest
  overall score wins. Allowing voters to express varying degrees of
  approval means that strong support and mild approval both count, making
  this method more expressive than approval voting.
`;

export const strengths: ProsCons[] = [
  {
    title: "Expressive ratings",
    summary: "Voters can indicate intensity of support or opposition.",
    details: `
      Unlike binary approval, score voting lets voters assign
      intermediate scores, reflecting how strongly they favour each
      candidate. This nuance accommodates partial approval and gives
      minor candidates credit for broad but tepid support.
    `,
  },
  {
    title: "Reduces spoiler effect; monotonic and participation-friendly",
    summary: "Voters need not fear wasting their vote.",
    details: `
      Score voting is monotonic (rating a candidate higher cannot hurt them),
      and common formulations satisfy the participation criterion (showing up
      and scoring honestly won't make you worse off). These properties help
      reduce spoiler dynamics and encourage sincere expression of preferences
     .
    `,
  },
  {
    title: "Generalises approval voting",
    summary: "Approval voting is a special case of score voting.",
    details: `
      If the scoring scale effectively allows only the minimum and maximum
      values, score voting collapses to approval voting. This makes the
      system flexible and easy to implement by adjusting the score range.
    `,
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Potential for strategic exaggeration",
    summary: "Voters might bullet vote with extreme scores.",
    details: `
      While score voting invites honest expression, strategic voters
      can game the system by giving maximum scores to favoured candidates
      and minimum scores to all others. In practice, such bullet-style rating
      tends to reduce the system to approval-like behaviour and undermines
      nuance.
    `,
  },
  {
    title: "Counting is more complex than plurality",
    summary: "Scores must be summed or averaged.",
    details: `
      Election officials must compute the total or average score for
      each candidate, which is more involved than simply counting votes.
      Though still straightforward, this additional arithmetic can slow
      reporting and complicate manual recounts.
    `,
  },
  {
    title: "Lacks Condorcet compliance (and IIA)",
    summary: "A Condorcet winner may not win under score voting.",
    details: `
      Score voting does not satisfy the Condorcet criterion; a
      candidate who would win every head-to-head matchup might not have
      the highest average score. It also does not satisfy Arrow’s IIA,
      so outcomes can depend on the presence of non-winning alternatives
     .
    `,
  },
];

// score-voting (range voting)
export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.SingleWinner,
  [FeatureId.BallotType]: BallotType.Scored, // Assign scores on a fixed scale
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.No, // Can fail the strict majority criterion
  [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // Calibrating scores takes thought
  [FeatureId.TallyingComplexity]: TallyingComplexity.Simple, // Sum scores
  [FeatureId.SpoilerRisk]: SpoilerRisk.Low, // Much less vote-splitting than plurality
  [FeatureId.StrategicPressure]: StrategicPressure.High, // Strong incentive to exaggerate (max/min)
};



export const useCases: UseCase[] = [
  {
    country: "United States",
    bodies: ["Internal elections for the Green Party of Utah and other organisations"],
  },
  {
    country: "International",
    bodies: ["Non-binding straw polls for United Nations Secretary-General selection"],
  },
  {
    country: "Various organisations",
    bodies: ["Professional societies, scientific bodies and corporate boards"],
  },
];
