// lib/systems/types.ts
import type { ComponentType } from "react";
import type { ProsCons } from "@/app/types";
import type {
    FeatureChoices,
} from "@/lib/features/types";

export interface SystemContent {
    name: string;
    aka?: string[];
    slug: string;
    introParagraph: string;                     // your introParagraph
    strengths: ProsCons[];
    weaknesses: ProsCons[];
    keyFeatures: FeatureChoices;  // your fptpRatings
    components: {
        Ballot: ComponentType;           // bespoke per system
        HowItWorks: ComponentType;
        Walkthrough?: ComponentType;
        FeaturesSide?: ComponentType;    // optional override
        UseCases?: ComponentType;
    };
}

