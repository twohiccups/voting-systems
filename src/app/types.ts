

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


