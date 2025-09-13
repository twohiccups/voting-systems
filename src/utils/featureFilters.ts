import {
    FeatureId,
    SeatType,
    BallotType,
    MajorityGuarantee,
    VoterComplexity,
    TallyingComplexity,
    SpoilerRisk,
    StrategicPressure,
    type FeatureChoices,
} from "@/lib/features/types";
import type { VotingSystem } from "@/lib/taxonomy/types";

/** ---------- Public types ---------- */
export type Any = "Any";
export const ANY: Any = "Any";

export const FEATURES_UI = {
    [FeatureId.Seats]: [SeatType.SingleWinner, SeatType.MultiWinner, SeatType.Both],
    [FeatureId.BallotType]: [
        BallotType.SingleChoice,
        BallotType.MultiChoice,
        BallotType.Ranked,
        BallotType.Scored,
        BallotType.Approval,
        BallotType.List,
    ],
    [FeatureId.MajorityGuarantee]: [MajorityGuarantee.Yes, MajorityGuarantee.No],
    [FeatureId.VoterComplexity]: [VoterComplexity.Low, VoterComplexity.Moderate, VoterComplexity.High],
    [FeatureId.TallyingComplexity]: [TallyingComplexity.Simple, TallyingComplexity.Moderate, TallyingComplexity.Complex],
    [FeatureId.SpoilerRisk]: [SpoilerRisk.Low, SpoilerRisk.Moderate, SpoilerRisk.High],
    [FeatureId.StrategicPressure]: [StrategicPressure.Low, StrategicPressure.Moderate, StrategicPressure.High],
} as const;

export type EnabledFeatureKey = keyof typeof FEATURES_UI;

/** Facet key for category (taxonomy) */
export const CATEGORY_KEY = "Category" as const;
export type CategoryKey = typeof CATEGORY_KEY;

/** “Feature” filters + Category in one record */
export type UnifiedFilters = Partial<
    {
        [K in EnabledFeatureKey]: Any | string | number;
    } & {
        [CATEGORY_KEY]: Any | string; // taxonomy id as string
    }
>;

export type GallerySystem = VotingSystem & { keyFeatures?: Partial<FeatureChoices> };

/** ---------- Helpers ---------- */

/** Get the options for a feature facet key (ANY first), same order you render. */
export function facetOptions<K extends EnabledFeatureKey>(key: K) {
    return [ANY, ...FEATURES_UI[key]] as const;
}

/** Build options for Category from taxonomy list. */
export function categoryOptionsFrom<T extends { id: string }>(taxonomy: T[]) {
    return [ANY, ...taxonomy.map((t) => t.id)] as const;
}

/** Return the real option (enum value) that stringifies to `raw`, or ANY if none. */
/** Return the real option (enum value) that stringifies to `raw`, or ANY if none. */
export function coerceFromString(
    options: readonly (Any | string | number)[],
    raw: string | null
): Any | string | number {
    if (!raw) return options[0] as Any; // ANY
    const hit = options.find((opt) => String(opt) === raw);
    return (hit ?? options[0]) as Any | string | number;
}


export function parseFiltersFromQuery(q: URLSearchParams): UnifiedFilters {
    const out: UnifiedFilters = {};
    (Object.keys(FEATURES_UI) as EnabledFeatureKey[]).forEach((k) => {
        out[k] = coerceFromString(facetOptions(k), q.get(k));
    });
    // Category: leave as string; we don't know the taxonomy list here
    const cat = q.get(CATEGORY_KEY);
    out[CATEGORY_KEY] = (cat ?? ANY) as Any | string;
    return out;
}

export function putFiltersInQuery(q: URLSearchParams, filters: UnifiedFilters) {
    (Object.keys(FEATURES_UI) as EnabledFeatureKey[]).forEach((k) => {
        const v = filters[k];
        if (!v || v === ANY) q.delete(k);
        else q.set(k, String(v));
    });

    const cat = filters[CATEGORY_KEY];
    if (!cat || cat === ANY) q.delete(CATEGORY_KEY);
    else q.set(CATEGORY_KEY, String(cat));
}

/** Get a facet value in a type-safe-ish way for both features and category */
export function getFacetValue(filters: UnifiedFilters, key: EnabledFeatureKey | CategoryKey) {
    return (filters[key] ?? ANY) as Any | string | number;
}

/** Check if a system matches all chosen facets (features + category) */
export function matchesUnifiedFilters(
    system: { taxonomyId?: string; keyFeatures?: Partial<FeatureChoices> },
    filters: UnifiedFilters
) {
    // 1) Category match
    const desiredCategory = filters[CATEGORY_KEY];
    if (desiredCategory && desiredCategory !== ANY) {
        if (!system.taxonomyId || system.taxonomyId !== desiredCategory) return false;
    }

    // 2) Feature facets match
    const fc = system.keyFeatures ?? {};
    for (const key of Object.keys(FEATURES_UI) as EnabledFeatureKey[]) {
        const desired = filters[key];
        if (!desired || desired === ANY) continue;
        const actual = fc[key as keyof FeatureChoices];
        if (actual === undefined) return false; // or `continue` to ignore missing data
        if (actual !== desired) return false;
    }
    return true;
}
