import { SystemFeature } from "../types";

export const systemFeatures: SystemFeature[] = [
    {
        id: "seats",
        title: "Seats",
        description:
            "Whether the election selects a single officeholder or fills multiple seats in a council or legislature.",
        items: [
            { label: "Single-winner", detail: "Produces one winner, such as a president, mayor, or district representative." },
            { label: "Multi-winner", detail: "Produces several winners, as in parliaments, councils, or corporate boards." },
        ],
    },
    {
        id: "ballot-type",
        title: "Ballot type",
        description: "The way voters are asked to express their preferences on the ballot.",
        items: [
            { label: "Single-choice", detail: "Voters mark only one candidate or party." },
            { label: "Multi-choice", detail: "Voters may select more than one option, as in block voting or approval systems." },
            { label: "Ranked", detail: "Voters list candidates in order of preference: first, second, third, and so on." },
            { label: "Scored", detail: "Voters assign numerical ratings, such as from 0 to 5 or 0 to 10." },
            { label: "Approval", detail: "Voters mark every candidate they find acceptable; all approvals count equally." },
            { label: "List", detail: "Voters choose a party list, or sometimes both a party and a preferred candidate within that list." },
        ],
    },
    {
        id: "majority-guarantee",
        title: "Majority guarantee",
        description: "Whether the rules ensure the winner commands support from more than half the voters.",
        items: [
            { label: "Yes", detail: "The winner must secure over 50% of votes or effective support, as in two-round or ranked-choice elections." },
            { label: "No", detail: "A candidate may win with less than half the vote, as in first-past-the-post, approval voting, or proportional lists." },
        ],
    },
    {
        id: "counting",
        title: "Counting rule",
        description: "The algorithm that translates ballots into winners or seat allocations.",
        items: [
            { label: "Plurality", detail: "The candidate with the most votes wins, even if they lack a majority." },
            { label: "Majority runoff", detail: "A winner is chosen by requiring over 50%, either through a second round or through instant runoffs." },
            { label: "Transferable", detail: "Votes are transferred from eliminated or surplus candidates, as in ranked-choice or single transferable vote." },
            { label: "Proportional formula", detail: "Seats are distributed in proportion to vote share, using formulas such as D’Hondt, Sainte-Laguë, or the Hare quota." },
            { label: "Pairwise comparisons", detail: "Candidates are compared head-to-head, as in Condorcet methods or Ranked Pairs." },
        ],
    },
    {
        id: "proportionality",
        title: "Proportionality",
        description: "How closely the final seat distribution reflects the overall share of votes.",
        items: [
            { label: "Low", detail: "Seat shares can be heavily distorted—for example, 40% of votes may yield 60% of seats under first-past-the-post." },
            { label: "Medium", detail: "Results adjust somewhat toward fairness, but are not fully proportional, as in limited vote or parallel systems." },
            { label: "High", detail: "Seat shares mirror vote shares closely, as in single transferable vote or party-list proportional representation." },
        ],
    },
    {
        id: "voter-complexity",
        title: "Voter complexity",
        description: "The level of effort required from voters to express their preferences accurately.",
        items: [
            { label: "Very low", detail: "Marking a single ‘X’ on the ballot, as in first-past-the-post." },
            { label: "Low", detail: "Selecting several options or marking approvals and disapprovals." },
            { label: "Moderate", detail: "Ranking or scoring requires more thought about candidate order or numerical values." },
            { label: "High", detail: "Detailed rankings or scores for many candidates, such as in large multi-seat ranked-choice elections." },
        ],
    },
    {
        id: "tallying-complexity",
        title: "Tallying complexity",
        description: "The administrative difficulty of counting votes and verifying results.",
        items: [
            { label: "Simple", detail: "Counting straightforward marks and declaring the highest total as winner." },
            { label: "Moderate", detail: "Requires formulas or multiple rounds, as in approval, cumulative, or two-round elections." },
            { label: "Complex", detail: "Involves iterative transfers, quotas, or head-to-head matrices, as in ranked-choice, Condorcet, or dual member proportional systems." },
        ],
    },
    {
        id: "ballot-error-handling",
        title: "Ballot error handling",
        description: "How the system treats ballots with mistakes, ambiguities, or incomplete preferences.",
        items: [
            { label: "Strict", detail: "A ballot is spoiled by overvotes or invalid marks, as in first-past-the-post, block voting, or two-round elections." },
            { label: "Moderate", detail: "Some errors are tolerated, but ballots may truncate or exhaust early, as in ranked-choice or single transferable vote." },
            { label: "High tolerance", detail: "Most partial or ambiguous ballots still count, as in approval, score, Condorcet, or party-list systems." },
        ],
    },
    {
        id: "spoiler-risk",
        title: "Spoiler risk",
        description: "The chance that similar candidates split the vote and change the outcome.",
        items: [
            { label: "High", detail: "Frequent under first-past-the-post or block voting." },
            { label: "Medium", detail: "Reduced but still possible in systems like two-round or ranked-choice." },
            { label: "Low", detail: "Largely eliminated in approval, score, or proportional systems." },
        ],
    },
    {
        id: "strategic-pressure",
        title: "Strategic voting pressure",
        description: "How strongly voters feel pushed to vote insincerely to avoid worse outcomes.",
        items: [
            { label: "High", detail: "Common, as in lesser-evil voting under first-past-the-post." },
            { label: "Medium", detail: "Sometimes advantageous in two-round or ranked-choice systems." },
            { label: "Low", detail: "Voters can usually vote sincerely in approval, score, or proportional systems." },
        ],
    },
    {
        id: "representation-style",
        title: "Representation style",
        description: "The overall philosophy of governance implied by the rule.",
        items: [
            { label: "Majoritarian", detail: "Aims to produce a single clear winner or majority government." },
            { label: "Proportional", detail: "Seeks to reflect the diversity of preferences across parties and candidates." },
            { label: "Mixed", detail: "Combines both approaches, as in mixed-member proportional or parallel systems." },
        ],
    },
];
