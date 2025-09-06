// lib/systems/load.ts
import type { SystemContent } from "@/lib/systems/types";
import type { SystemSlug } from "./registry";
import * as React from "react";

function titleFromSlug(slug: string) {
    return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/** Shapes for the lazily loaded component modules */
type Comp = React.ComponentType;
type ModuleWithDefault = { default: Comp };
type HowItWorksModule = { HowItWorks: Comp } | ModuleWithDefault;
type BallotModule = { Ballot: Comp } | ModuleWithDefault;
type WalkthroughModule = { Walkthrough: Comp } | ModuleWithDefault;
type UseCasesModule = { UseCases: Comp } | ModuleWithDefault;

/** Type guard helpers (no `any`) */
function isKey<T extends string>(k: string, obj: Record<string, unknown>): k is T {
    return Object.prototype.hasOwnProperty.call(obj, k);
}
function pickExport<M extends Record<string, unknown>>(
    mod: unknown,
    named: string
): Comp | undefined {
    if (mod && typeof mod === "object") {
        const obj = mod as Record<string, unknown>;
        if (isKey<typeof named>(named, obj) && typeof obj[named] === "function") {
            return obj[named] as Comp;
        }
        if ("default" in obj && typeof obj.default === "function") {
            return obj.default as Comp;
        }
    }
    return undefined;
}

/** Minimal “Coming soon” component (works in .ts without JSX) */
const ComingSoon: Comp = () => React.createElement("p", null, "coming soon");

/** Build a fully typed fallback that satisfies SystemContent */
function comingSoonContent(slug: SystemSlug): SystemContent {
    return {
        slug,
        name: titleFromSlug(slug),
        aka: [],
        introParagraph: "coming soon",
        strengths: [] as SystemContent["strengths"],
        weaknesses: [] as SystemContent["weaknesses"],
        // Important: keyFeatures is a structured object in your types, not an array.
        // Use a typed assertion to an empty value that still satisfies the field.
        keyFeatures: {} as SystemContent["keyFeatures"],
        useCases: [] as SystemContent["useCases"],
        components: {
            HowItWorks: ComingSoon,
            Ballot: ComingSoon,
            Walkthrough: undefined,
            UseCases: undefined,
        },
    };
}

export async function loadSystem(slug: SystemSlug): Promise<SystemContent> {
    // 1) Load data first; if that fails, fall back to a minimal placeholder.
    let data: unknown = {};
    try {
        data = await import(`@/app/voting-system/${slug}/data`);
    } catch {
        return comingSoonContent(slug);
    }

    // 2) Try each component import independently; never let a component failure
    //    cause the whole system to fall back. Each failed import → undefined.
    const HowItWorks = await import(`@/app/voting-system/${slug}/HowItWorks`)
        .then((mod: unknown) => pickExport<HowItWorksModule>(mod, "HowItWorks"))
        .catch(() => undefined);

    const Ballot = await import(`@/app/voting-system/${slug}/Ballot`)
        .then((mod: unknown) => pickExport<BallotModule>(mod, "Ballot"))
        .catch(() => undefined);

    const Walkthrough = await import(`@/app/voting-system/${slug}/Walkthrough`)
        .then((mod: unknown) => pickExport<WalkthroughModule>(mod, "Walkthrough"))
        .catch(() => undefined);

    const UseCases = await import(`@/app/voting-system/${slug}/UseCases`)
        .then((mod: unknown) => pickExport<UseCasesModule>(mod, "UseCases"))
        .catch(() => undefined);

    // 3) Build the content from data, with components optional.
    const d = data as {
        name?: string;
        aka?: string[];
        introParagraph?: string;
        strengths?: SystemContent["strengths"];
        weaknesses?: SystemContent["weaknesses"];
        keyFeatures?: SystemContent["keyFeatures"];
        useCases?: SystemContent["useCases"];
    };

    return {
        slug,
        name: d.name ?? titleFromSlug(slug),
        aka: d.aka ?? [],
        introParagraph: d.introParagraph ?? "coming soon",
        strengths: d.strengths ?? ([] as SystemContent["strengths"]),
        weaknesses: d.weaknesses ?? ([] as SystemContent["weaknesses"]),
        keyFeatures: d.keyFeatures ?? ({} as SystemContent["keyFeatures"]),
        useCases: d.useCases ?? ([] as SystemContent["useCases"]),
        components: {
            HowItWorks,  // may be undefined
            Ballot,      // may be undefined
            Walkthrough, // may be undefined
            UseCases,    // may be undefined
        },
    } satisfies SystemContent;
}
