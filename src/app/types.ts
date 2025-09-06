
export type Candidate = { id: string; label: string; sublabel?: string, total?: number, color?: string };



export type Party = {
    id: string;
    name: string;
    tagline?: string; // short descriptor (e.g., ideology)
    candidates: Candidate[]; // party list (closed list)
};



export type ProsCons = {
    title: string,
    summary: string,
    details: string
}


export type UseCase = {
    country: string;
    bodies: string[];
    notes?: string;
};


export type FlowStep = {
    num?: number;
    text: React.ReactNode;
};
