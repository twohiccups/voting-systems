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
 * Data for the Borda count voting system.
 *
 * The Borda count is a ranked voting method in which voters list candidates
 * in order of preference.  Points are awarded according to position on each
 * ballot—if there are \(n\) candidates, the top choice receives \(n−1\)
 * points, the second choice \(n−2\), and so on.  The candidate with the
 * highest total wins.  By taking all preferences into account, the Borda count
 * seeks to elect broadly acceptable candidates and minimise wasted votes【988933867106631†L238-L251】.
 */
export const slug = 'borda-count';
export const name = 'Borda Count';
export const aka = ['Borda Voting'];

export const introParagraph: string = `
  Invented by French mathematician Jean‑Charles de Borda in the 18th century,
  the Borda count asks voters to rank all candidates.  Each position on the
  ballot is worth a set number of points, with higher ranks earning more
  points.  When all points are tallied, the candidate with the most points
  overall is declared the winner.  Because every ranking counts, the Borda
  count rewards candidates who enjoy broad support rather than those who
  merely top the largest plurality【988933867106631†L238-L251】.
`;

export const strengths: ProsCons[] = [
    {
        title: 'Captures full preference orderings',
        summary: 'Voters can express nuanced preferences among all candidates.',
        details: `The Borda count allows voters to rank candidates rather than
          picking just one.  As a result, points from lower preferences still
          contribute to a candidate’s total, reducing the fear of wasting
          votes and reflecting a more complete picture of voter sentiment.`
    },
    {
        title: 'Encourages consensus outcomes',
        summary: 'Moderate candidates with broad appeal can prevail.',
        details: `Because points accrue from being consistently ranked near the
          top, candidates who are acceptable to many voters—rather than
          polarising figures—tend to score well.  This discourages extreme
          campaigning and rewards coalition‑building.`
    },
    {
        title: 'Low incentive for tactical voting',
        summary: 'Strategic manipulation yields little advantage.',
        details: `Analyses of the Borda count suggest that the payoff for
          insincere ranking is limited; voters can list their true
          preferences without worrying that doing so will dramatically hurt
          their favourite’s chances【988933867106631†L238-L251】.`
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: 'More complex to administer and understand',
        summary: 'Counting points and ranking all candidates takes effort.',
        details: `Compared with first‑past‑the‑post, tallying a Borda election
          requires calculating point totals across all ballots.  This
          complexity increases the risk of administrative errors and can slow
          the announcement of results.`
    },
    {
        title: 'Requires voters to rank every candidate',
        summary: 'Ballots are longer and may overwhelm voters.',
        details: `To function properly, the Borda count expects voters to
          assign a rank to each candidate.  In contests with many
          contenders, completing the ballot can be time‑consuming and may
          discourage participation or lead to arbitrary lower rankings【988933867106631†L253-L267】`
    },
    {
        title: 'Does not satisfy the Condorcet criterion',
        summary: 'A Condorcet winner may not top the points total.',
        details: `The Borda count can sometimes elect a candidate who would
          lose a head‑to‑head contest against another candidate.  When
          strategic nomination occurs (introducing additional candidates to
          siphon points), the outcome can be distorted.'`
    },
];

export const keyFeatures: FeatureChoices = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.Ranked,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Scoring,
    [FeatureId.Proportionality]: Proportionality.Medium,
    [FeatureId.VoterComplexity]: VoterComplexity.Moderate,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.Medium,
    [FeatureId.StrategicPressure]: StrategicPressure.Low,
    [FeatureId.RepresentationStyle]: RepresentationStyle.Majoritarian,
};

export const useCases: UseCase[] = [
    {
        country: 'Slovenia',
        bodies: ['Reserved seats for ethnic minorities in the National Assembly'],
    },
    {
        country: 'Nauru',
        bodies: ['Parliamentary elections (modified Borda system)'],
    },
    {
        country: 'Kiribati',
        bodies: ['Presidential candidate nomination'],
    },
    {
        country: 'Various',
        bodies: ['University senate, professional society, and sports awards elections'],
    },
];