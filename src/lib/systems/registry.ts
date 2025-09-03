// lib/systems/registry.ts

import { VotingSystems } from "../taxonomy/data";
import { VotingSystemSlug } from "../taxonomy/types";

export const allSystemSlugs =
    VotingSystems.map(s => s.slug) as readonly VotingSystemSlug[];

export type SystemSlug = VotingSystemSlug;