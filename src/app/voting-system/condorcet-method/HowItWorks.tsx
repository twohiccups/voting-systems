"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters <strong>rank all candidates</strong> in order of preference.</> },
        { text: <>The system compares every pair of candidates head-to-head: on each ballot, whichever of the two is ranked higher earns that voter’s support in the matchup.</> },
        { text: <>For each matchup, the candidate preferred by more voters wins that pairing.</> },
        { text: <>If a candidate wins against <strong>all others</strong> one-on-one, they are the Condorcet winner.</> },
        { text: <>If no Condorcet winner exists, a tiebreak method (like Ranked Pairs or Schulze) is applied.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
