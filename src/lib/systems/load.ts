// lib/systems/load.ts
import type { SystemContent } from "@/lib/systems/types";
import type { SystemSlug } from "./registry";

function titleFromSlug(slug: string) {
    return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export async function loadSystem(slug: SystemSlug): Promise<SystemContent> {
    // console.log(data)
    const data = await import(`@/app/voting-system/${slug}/data`);
    const hw = await import(`@/app/voting-system/${slug}/HowItWorks`);
    const bal = await import(`@/app/voting-system/${slug}/Ballot`);
    const walk = await import(`@/app/voting-system/${slug}/Walkthrough`).catch(() => null);
    const use = await import(`@/app/voting-system/${slug}/UseCases`).catch(() => null);

    const content = {
        slug,
        name: data.name ?? titleFromSlug(slug),
        aka: data.aka ?? [],
        introParagraph: data.introParagraph,
        strengths: data.strengths,
        weaknesses: data.weaknesses,
        keyFeatures: data.keyFeatures,
        components: {
            HowItWorks: hw.HowItWorks ?? hw.default,
            Ballot: bal.Ballot ?? bal.default,
            Walkthrough: walk ? (walk.Walkthrough ?? walk.default) : undefined,
            UseCases: use ? (use.UseCases ?? use.default) : undefined,
        },
    } satisfies SystemContent;

    return content;
}

