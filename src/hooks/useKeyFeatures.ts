"use client";

import * as React from "react";
import { loadSystemData } from "@/lib/systems/load-search";
import type { SystemSlug } from "@/lib/systems/registry";
import type { FeatureChoices } from "@/lib/features/types";

export function useKeyFeatures(
    systems: { slug: string; keyFeatures?: Partial<FeatureChoices> }[]
) {
    const [bySlug, setBySlug] = React.useState<Record<string, Partial<FeatureChoices> | undefined>>({});

    React.useEffect(() => {
        let cancelled = false;

        (async () => {
            const missing = systems.filter((s) => !s.keyFeatures);
            if (missing.length === 0) return;

            const entries = await Promise.all(
                missing.map(async (s) => {
                    try {
                        const data = await loadSystemData(s.slug as SystemSlug);
                        return [s.slug, data.keyFeatures] as const;
                    } catch {
                        return [s.slug, undefined] as const;
                    }
                })
            );

            if (!cancelled) {
                setBySlug((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [systems]);

    return bySlug;
}
