import { ProsCons } from "@/app/types";
import { BallotErrorHandling, BallotType, CountingRule, FeatureChoices, FeatureId, MajorityGuarantee, Proportionality, RepresentationStyle, SeatType, SpoilerRisk, StrategicPressure, TallyingComplexity, VoterComplexity } from "@/lib/features/types";
import { SystemContent } from "@/lib/systems/types";
import UseCases from "./UseCases";
import Walkthrough from "./Walkthrough";
import { HowItWorks } from "./HowItWorks";
import { Ballot } from "./Ballot";



export const introParagraph: string = `
    First Past the Post is one of the simplest ways to run an election.
    Each voter chooses one candidate, and the candidate with the most votes wins.
    Its appeal lies in its speed and straightforwardness: results are easy to count and quick to announce.
    However, FPTP can also produce outcomes where a candidate wins without securing a majority of votes,
    raising questions about how well it reflects the overall preferences of voters.
`

export const strengths: ProsCons[] = [
    {
        title: "Very simple ballots and counting; easy to explain.",
        summary: "Voters mark one name and you add up the marks—fewer steps, fewer mistakes.",
        details:
            "Poll  need minimal training, audit trails are straightforward, and error rates tend to stay low because there are fewer places to go wrong.",
    },
    {
        title: "Fast results and low administrative cost.",
        summary: "Single-mark tallies produce quick preliminaries and uncomplicated recounts.",
        details:
            "Even in large jurisdictions, preliminary results can be reported quickly and recounts are comparatively simple, keeping election-night logistics and budgets lean.",
    },
    {
        title: "Clear single representative per district (with single-member districts).",
        summary: "Accountability is direct—constituents know exactly who represents them.",
        details:
            "Each area elects a single winner who is easy to identify and contact. If voters are unhappy, there’s a clear person to hold to account in the next election.",
    },
]

export const weaknesses: ProsCons[] = [
    {
        title: "Winners may have <50% support in multi-candidate races.",
        summary: "Plurality winners can take office without majority backing in crowded fields.",
        details:
            "When three or more credible candidates split the vote, the winner may be opposed by most voters, which can feel counter-majoritarian—especially when margins are tight.",
    },
    {
        title: "Encourages strategic voting; minor-party ‘spoiler’ effects.",
        summary: "Voters may pick a viable second choice to avoid ‘wasting’ their vote.",
        details:
            "Smaller parties can split ideologically similar blocs and unintentionally help an opponent win. This dynamic can also discourage sincere voting and depress minor-party growth.",
    },
    {
        title: "Often disproportional seat outcomes vs. vote share.",
        summary: "Seat totals can amplify regional strongholds and under-represent dispersed voters.",
        details:
            "A party can secure a majority of seats without a majority of votes if its support is efficiently distributed across districts, producing mismatches between votes and seats.",
    },
]

export const keyFeatures: Partial<FeatureChoices> = {
    [FeatureId.Seats]: SeatType.SingleWinner,
    [FeatureId.BallotType]: BallotType.SingleChoice,
    [FeatureId.MajorityGuarantee]: MajorityGuarantee.No,
    [FeatureId.Counting]: CountingRule.Plurality,
    [FeatureId.Proportionality]: Proportionality.Low,
    [FeatureId.VoterComplexity]: VoterComplexity.VeryLow,
    [FeatureId.TallyingComplexity]: TallyingComplexity.Simple,
    [FeatureId.BallotErrorHandling]: BallotErrorHandling.Strict,
    [FeatureId.SpoilerRisk]: SpoilerRisk.High,
    [FeatureId.StrategicPressure]: StrategicPressure.High,
    [FeatureId.RepresentationStyle]: RepresentationStyle.Majoritarian,
};



export const fptp = {
    slug: "fptp",
    name: "First-Past-the-Post",
    aka: ["Plurality"],
    introParagraph,
    strengths,
    weaknesses,
    keyFeatures,
    components: {
        Ballot,
        HowItWorks,
        Walkthrough,
        UseCases,
        // FeaturesSide: KeyFacts, // if you want a custom sidebar
    },
} satisfies SystemContent;

