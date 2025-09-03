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
    try {
        const data = await import(`@/app/voting-system/${slug}/data`);
        const hwMod: unknown = await import(`@/app/voting-system/${slug}/HowItWorks`);
        const balMod: unknown = await import(`@/app/voting-system/${slug}/Ballot`);
        const walkMod: unknown | null = await import(`@/app/voting-system/${slug}/Walkthrough`).catch(() => null);
        const useMod: unknown | null = await import(`@/app/voting-system/${slug}/UseCases`).catch(() => null);

        const HowItWorks = pickExport<HowItWorksModule>(hwMod, "HowItWorks") ?? ComingSoon;
        const Ballot = pickExport<BallotModule>(balMod, "Ballot") ?? ComingSoon;
        const Walkthrough = walkMod ? pickExport<WalkthroughModule>(walkMod, "Walkthrough") : undefined;
        const UseCases = useMod ? pickExport<UseCasesModule>(useMod, "UseCases") : undefined;

        return {
            slug,
            name: (data as { name?: string }).name ?? titleFromSlug(slug),
            aka: (data as { aka?: string[] }).aka ?? [],
            introParagraph: (data as { introParagraph?: string }).introParagraph ?? "coming soon",
            strengths: (data as { strengths?: SystemContent["strengths"] }).strengths ?? ([] as SystemContent["strengths"]),
            weaknesses: (data as { weaknesses?: SystemContent["weaknesses"] }).weaknesses ?? ([] as SystemContent["weaknesses"]),
            keyFeatures:
                (data as { keyFeatures?: SystemContent["keyFeatures"] }).keyFeatures ??
                ({} as SystemContent["keyFeatures"]),
            useCases: (data as { useCases?: SystemContent["useCases"] }).useCases ?? ([] as SystemContent["useCases"]),
            components: {
                HowItWorks,
                Ballot,
                Walkthrough,
                UseCases,
            },
        } satisfies SystemContent;
    } catch {
        // No unused var, no-explicit-any safe
        return comingSoonContent(slug);
    }
}
