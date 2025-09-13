// lib/systems/registry.ts

import { votingSystems } from "../taxonomy/catalog";
import { VotingSystemSlug } from "../taxonomy/types";

export const allSystemSlugs =
    votingSystems.map(s => s.slug) as readonly VotingSystemSlug[];

export type SystemSlug = VotingSystemSlug;