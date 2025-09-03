import { TaxonomySystem, VotingSystem } from "./types";

export const TaxonomySystems: TaxonomySystem[] = [
    {
        id: 'Plurality',
        name: "Plurality Systems",
        shortDescription: "Most votes wins – not necessarily a majority"
    },
    {
        id: 'Majority',
        name: "Majority Systems",
        shortDescription: "Candidates must win over 50%",
    },
    {
        id: 'Proportional',
        name: "Proportional Representation",
        shortDescription: "Seats allocated to reflect vote share"
    },
    {
        id: 'Mixed',
        name: "Mixed Systems",
        shortDescription: "Blend of plurality and proportional systems"
    },
    {
        id: 'Condorcet',
        name: "Condorcet Systems",
        shortDescription: "Compare candidates head-to-head"
    },
    {
        id: 'Other',
        name: "Other / Special",
        shortDescription: "Rare, theoretical, or non-electoral"
    }
]

export const VotingSystems: VotingSystem[] = [
    // 🟨 Plurality / Bloc systems
    {
        id: "fptp",
        name: "First-Past-the-Post",
        shortDescription: "Candidate with the most votes wins, even without a majority",
        taxonomyId: "Plurality",
        slug: "first-past-the-post"
    },
    {
        id: "block",
        name: "Block Voting",
        shortDescription: "Voters choose multiple candidates; top vote-getters win",
        taxonomyId: "Plurality",
        slug: "block-voting"
    },
    {
        id: "sntv",
        name: "Single Non-Transferable Vote",
        shortDescription: "Each voter casts one vote in a multi-winner race; top candidates win",
        taxonomyId: "Plurality",
        slug: "single-non-transferable-vote"
    },
    {
        id: "limited",
        name: "Limited Voting",
        shortDescription: "Voters have fewer votes than seats available; increases minority representation",
        taxonomyId: "Plurality",
        slug: "limited-voting"
    },
    {
        id: "cumulative",
        name: "Cumulative Voting",
        shortDescription: "Voters can give multiple votes to one or more candidates",
        taxonomyId: "Plurality",
        slug: "cumulative-voting"
    },

    // 🟨 Majority systems
    {
        id: "two-round",
        name: "Two-Round System",
        shortDescription: "If no one gets 50%, top two face off in a runoff",
        taxonomyId: "Majority",
        slug: "two-round-system"
    },
    {
        id: "irv",
        name: "Instant-Runoff Voting",
        shortDescription: "Voters rank candidates; lowest eliminated until majority is reached",
        taxonomyId: "Majority",
        slug: "instant-runoff-voting"
    },
    {
        id: "supplementary",
        name: "Supplementary Vote",
        shortDescription: "Voters rank top two choices; if no majority, second choices added to top two",
        taxonomyId: "Majority",
        slug: "supplementary-vote"
    },
    {
        id: "exhaustive",
        name: "Exhaustive Ballot",
        shortDescription: "One-round-at-a-time elimination until a majority is reached",
        taxonomyId: "Majority",
        slug: "exhaustive-ballot"
    },
    {
        id: "borda",
        name: "Borda Count",
        shortDescription: "Voters rank candidates; points awarded by ranking position",
        taxonomyId: "Majority",
        slug: "borda-count"
    },
    {
        id: "approval",
        name: "Approval Voting",
        shortDescription: "Voters approve of as many candidates as they like; most approvals win",
        taxonomyId: "Majority",
        slug: "approval-voting"
    },
    {
        id: "score",
        name: "Score Voting",
        shortDescription: "Voters score candidates (e.g., 0–5); highest average wins",
        taxonomyId: "Majority",
        slug: "score-voting"
    },

    // 🟩 Proportional Representation
    {
        id: "party-list",
        name: "Party-List PR",
        shortDescription: "Parties win seats based on vote share; candidates taken from lists",
        taxonomyId: "Proportional",
        slug: "party-list-pr"
    },
    {
        id: "stv",
        name: "Single Transferable Vote",
        shortDescription: "Voters rank candidates in multi-member districts; votes transfer for proportionality",
        taxonomyId: "Proportional",
        slug: "single-transferable-vote"
    },
    {
        id: "panachage",
        name: "Panachage",
        shortDescription: "Voters can mix candidates across different party lists",
        taxonomyId: "Proportional",
        slug: "panachage"
    },

    // 🟧 Mixed Systems
    {
        id: "mmp",
        name: "Mixed-Member Proportional",
        shortDescription: "Combines district winners with proportional party lists",
        taxonomyId: "Mixed",
        slug: "mixed-member-proportional"
    },
    {
        id: "parallel",
        name: "Parallel Voting",
        shortDescription: "FPTP and proportional run side-by-side, but independently",
        taxonomyId: "Mixed",
        slug: "parallel-voting"
    },
    {
        id: "dmp",
        name: "Dual Member Proportional",
        shortDescription: "Each district elects two members: one FPTP, one adjusted for proportionality",
        taxonomyId: "Mixed",
        slug: "dual-member-proportional"
    },
    {
        id: "majority-bonus",
        name: "Majority Bonus System",
        shortDescription: "Extra seats awarded to leading party to ensure majority",
        taxonomyId: "Mixed",
        slug: "majority-bonus-system"
    },

    // 🟪 Condorcet & Ranked-Pair Systems
    {
        id: "condorcet",
        name: "Condorcet Method",
        shortDescription: "Winner beats every other candidate in direct head-to-head matchups",
        taxonomyId: "Condorcet",
        slug: "condorcet-method"
    },
    {
        id: "ranked-pairs",
        name: "Ranked Pairs",
        shortDescription: "Locks in strongest pairwise victories without cycles",
        taxonomyId: "Condorcet",
        slug: "ranked-pairs"
    },
    {
        id: "copeland",
        name: "Copeland’s Method",
        shortDescription: "Each candidate gets points for every head-to-head win",
        taxonomyId: "Condorcet",
        slug: "copelands-method"
    },

    // 🟥 Other / Special Systems
    {
        id: "sortition",
        name: "Sortition",
        shortDescription: "Officials selected randomly, like a jury",
        taxonomyId: "Other",
        slug: "sortition"
    },
    {
        id: "exhaustive-papal",
        name: "Exhaustive Ballot (Papal Style)",
        shortDescription: "Repeated secret ballots until one candidate gains consensus",
        taxonomyId: "Other",
        slug: "exhaustive-ballot-papal-style"
    }
];

