// lib/systems/load-search.ts
import type { FeatureChoices } from "@/lib/features/types";
import type { SystemSlug } from "./registry";

/** Shape we need for the gallery row */
export type GallerySystem = {
  id: string;
  name: string;
  slug: SystemSlug;
  taxonomyId: string;
  // Anything else you already show in the card/table…
  keyFeatures?: Partial<FeatureChoices>; // <- used for filtering
};

/** Import only /data for a slug (fast; no React components). */
export async function loadSystemData(slug: SystemSlug) {
  try {
    const mod = await import(`@/app/voting-system/${slug}/data`);
    return {
      name: mod.name as string | undefined,
      keyFeatures: mod.keyFeatures as Partial<FeatureChoices> | undefined,
    };
  } catch {
    // No data.ts yet
    return { name: undefined, keyFeatures: undefined };
  }
}
