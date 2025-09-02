// lib/systems/registry.ts
export const allSystemSlugs = [
    "first-past-the-post",
    // "instant-runoff-voting",
    // ...
] as const;
export type SystemSlug = typeof allSystemSlugs[number];
