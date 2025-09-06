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
 * Data for the majority bonus system.
 *
 * In a majority bonus system, the party or coalition that wins the largest
 * share of votes is awarded an extra “bonus” of seats to ensure a stable
 * majority. This bonus is non-compensatory: seats are given to the leading
 * party regardless of its exact vote margin, so the overall seat distribution
 * diverges from pure proportionality. The goal is to avoid fragmented
 * legislatures and hung parliaments by guaranteeing a working majority for
 * the election winner.
 */
export const slug = "majority-bonus-system";
export const name = "Majority Bonus System";
export const aka = ["Majority Jackpot", "Majority Premium", "Premio di maggioranza"];

export const introParagraph: string = `
  The majority bonus system adds extra seats to the leading party or
  coalition to ensure it holds an absolute majority in the legislature.
  After votes are counted and seats are allocated proportionally, a block
  of bonus seats is awarded to the party with the highest vote share. This
  can guarantee a majority even if the winner received far less than 50% of
  the votes. The approach aims to produce stable governments but at the cost
  of proportionality for voters supporting other parties.
`;

export const strengths: ProsCons[] = [
  {
    title: "Ensures stable majorities",
    summary: "Avoids hung parliaments and fragile coalitions.",
    details: `By awarding bonus seats to the leading party, the system
      guarantees a clear legislative majority. This can streamline
      governance, improve policy coherence, and reduce the likelihood of
      frequent elections.`,
  },
  {
    title: "Clear accountability",
    summary: "Creates decisive winners.",
    details: `Because the bonus tends to produce single-party or dominant
      coalition governments, voters know which party is responsible for
      governing. This clarity may enhance accountability compared with
      complex coalition agreements that diffuse responsibility.`,
  },
  {
    title: "Discourages extreme fragmentation",
    summary: "Reduces the power of minor parties.",
    details: `Parties that cannot realistically lead the vote receive no
      bonus and remain proportionally small. This can discourage the
      proliferation of micro-parties and limit the influence of extremist
      groups.`,
  },
];

export const weaknesses: ProsCons[] = [
  {
    title: "Distorts proportionality",
    summary: "Seat shares diverge from vote shares.",
    details: `Because bonus seats are not tied to the vote margin, a party
      with a minority of votes can secure a majority of seats. This
      deviation from proportionality may be viewed as unfair and can
      disenfranchise voters who supported other parties.`,
  },
  {
    title: "Unconditional nature may seem arbitrary",
    summary: "Bonus often does not depend on the size of the lead.",
    details: `In many majority bonus systems the extra seats are awarded
      regardless of how small the winning party’s vote advantage is. As
      a result, even narrow leads can produce outsized seat bonuses,
      sparking accusations of manipulation.`,
  },
  {
    title: "Marginalises opposition and smaller parties",
    summary: "Bonus reduces pluralism.",
    details: `By artificially inflating the dominant party’s seat count,
      majority bonus systems reduce the influence of opposition and minor
      parties. This can limit debate, concentrate power, and discourage
      cross-party cooperation.`,
  },
];

export const keyFeatures: Partial<FeatureChoices> = {
  [FeatureId.Seats]: SeatType.MultiWinner, // Governing majority guaranteed by bonus seats
  [FeatureId.BallotType]: BallotType.List, // Typically party lists
  [FeatureId.MajorityGuarantee]: MajorityGuarantee.Yes, // By design, winner bonus ensures majority
  [FeatureId.VoterComplexity]: VoterComplexity.Low, // Choose a party list
  [FeatureId.TallyingComplexity]: TallyingComplexity.Moderate, // Proportional allocation + bonus formula
  [FeatureId.SpoilerRisk]: SpoilerRisk.Moderate, // Some distortion, but bonus dominates
  [FeatureId.StrategicPressure]: StrategicPressure.Moderate, // Incentives to back large parties
};

export const useCases: UseCase[] = [
  {
    country: "Greece",
    bodies: ["Hellenic Parliament (sliding-scale bonus in effect since June 2023; previously used in earlier periods)"],
  },
  {
    country: "France",
    bodies: ["Municipal councils (communes ≥ 1,000 inhabitants) and regional councils — list PR with a majority bonus"],
  },
  {
    country: "Italy",
    bodies: ["Regional councils (various regions under Legge Tatarella and subsequent regional laws with majority premium mechanisms)"],
  },
  {
    country: "Andorra",
    bodies: ["Parish (comuns) council elections — mixed system with a majority bonus component"],
  },
];
