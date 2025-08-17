

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


export type Candidate = { id: string; label: string; sublabel?: string };

export type Party = {
    id: string;
    name: string;
    tagline?: string; // short descriptor (e.g., ideology)
    candidates: Candidate[]; // party list (closed list)
};

