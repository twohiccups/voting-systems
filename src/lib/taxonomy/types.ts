import { VotingSystems } from "./data";


export interface TaxonomySystem {
    id: string,
    name: string,
    shortDescription: string,
}


export interface VotingSystem {
    id: string,
    name: string,
    shortDescription: string,
    taxonomyId: string,
    slug: string
}

export type VotingSystemSlug = typeof VotingSystems[number]["slug"];