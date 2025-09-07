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

/**
 * Data definitions for the exhaustive ballot.
 *
 * The exhaustive ballot is a majority‑seeking system in which voters cast a single vote
 * for their preferred candidate.  If no candidate secures an outright majority,
 * the candidate with the fewest votes is eliminated and a fresh round of voting is held.
 * Balloting continues, with the weakest candidate removed each time, until one candidate
 * garners a majority of the votes.  Because electors have the opportunity to revise
 * their choice between rounds, candidates must appeal to a broad cross‑section of the
 * electorate and build consensus【312072163993559†L738-L744】.  The multi‑round nature
 * makes the system unsuitable for large‑scale public elections but well‑suited to small
 * deliberative bodies or high‑stakes selections such as the Swiss Federal Council or
 * the presidents of certain parliaments【312072163993559†L348-L381】.
 */
export const slug = 'exhaustive-ballot';
export const name = 'Exhaustive Ballot';
export const aka: string[] = ['Repeated Elimination', 'Multiple‑Round Voting'];

export const introParagraph: string = `
  The exhaustive ballot is a majoritarian method used for electing a single
  candidate from a field of contenders.  Voters cast one vote for their
  favourite candidate; if no one achieves an outright majority, only the
  candidate with the fewest votes is removed and the electorate votes again.
  This process repeats until a candidate has more than half of the votes.
  Each round gives voters a chance to shift their support, encouraging
  contenders to appeal to a wide audience and build consensus.
  Because it requires multiple rounds of balloting it is rarely used for mass
  elections, but it remains common in parliaments and committees where
  consensus and legitimacy are paramount.
`;

export const strengths: ProsCons[] = [
    {
        title: 'Encourages consensus candidates',
        summary: 'Successive rounds push candidates to broaden their appeal.',
        details: `As the least‑popular candidates are eliminated, their supporters can
          reallocate their votes.  Candidates hoping to survive must appeal to a
          broad cross‑section of voters and negotiate with rivals, fostering a
          consensus choice rather than a polarising plurality winner【312072163993559†L738】.`,
    },
    {
        title: 'Allows voters to adjust preferences between rounds',
        summary: 'Electors are not locked into their initial choice.',
        details: `Unlike ranked or single‑round systems, the exhaustive ballot
          lets voters reassess the field after each elimination.  This reduces
          wasted votes and permits deliberation, as supporters of eliminated
          candidates can coalesce around an alternative without having had to
          anticipate the order of elimination in advance.`
    },
    {
        title: 'Simple ballot and transparent counting',
        summary: 'Each round uses straightforward single‑choice ballots.',
        details: `Because voters mark only one name per round and the lowest
          vote‑getter is eliminated, the method is easy for participants to
          understand and for officials to tally.  There is no need to compute
          complex transfer quotas or point totals.`
    },
];

export const weaknesses: ProsCons[] = [
    {
        title: 'Logistically burdensome for large electorates',
        summary: 'Multiple rounds require time and resources.',
        details: `Holding repeated rounds of voting increases administrative costs and
          can lead to voter fatigue.  For this reason the exhaustive ballot
          is typically confined to small assemblies or committees.`,
    },
    {
        title: 'Vulnerable to tactical voting',
        summary: 'Compromising and push‑over strategies can distort results.',
        details: `Voters may engage in strategic behaviour such as “compromising”
          (supporting a less‑preferred viable candidate to prevent their
          favourite from being eliminated) or the “push‑over” tactic (voting
          for a weak candidate to face an easier opponent later).  These
          strategies rely on anticipating others’ behaviour and can backfire【312072163993559†L610-L640】.`
    },
    {
        title: 'Time‑consuming and potentially exhausting',
        summary: 'Repeated voting can delay the outcome and lower turnout.',
        details: `Because several ballots may be needed, elections can stretch
          over hours or days.  The necessity to reconvene reduces
          participation and may deter voters from taking part in all rounds.'`
    },
];

export const keyFeatures: Partial<FeatureChoices> = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.SingleChoice, // One vote per round
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // Process continues until someone has majority
    [FeatureId.VoterComplexity]: VoterComplexity.Moderate, // Multiple rounds, evolving preferences
    [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate, // Repeat elimination rounds
    [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate, // Elimination sequencing matters
    [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Incentives for coordination across rounds
};

export const useCases: UseCase[] = [
    {
        country: 'Switzerland',
        bodies: ['Federal Council elections'],
    },
    {
        country: 'European Union',
        bodies: ['President of the European Parliament'],
    },
    {
        country: 'United Kingdom and Canada',
        bodies: ['Election of the Speaker of the House of Commons'],
    },
    {
        country: 'International',
        bodies: ['Selection of Olympic Games and FIFA World Cup hosts'],
    },
];
