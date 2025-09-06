"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Officials are chosen by <strong>lot (random selection)</strong> rather than voting.</> },
        { text: <>Define the <strong>eligible pool</strong> (e.g., citizens meeting criteria or pre-nominated candidates).</> },
        { text: <>Optionally apply <strong>stratification or quotas</strong> (e.g., by region or demographics) to ensure a representative sample.</> },
        { text: <>Run a <strong>transparent random draw</strong> to select members and alternates.</> },
        { text: <>Selected individuals may undergo <strong>verification and acceptance</strong> (e.g., conflicts, eligibility, consent).</> },
        { text: <>The draw is recorded and <strong>results are certified</strong>.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
