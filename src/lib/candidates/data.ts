import { Candidate, Party } from "@/app/types";

export const fiveCandidates: Candidate[] = [
    { id: 'a', label: 'Alice Johnson', sublabel: 'Conservative' },
    { id: 'b', label: 'Brian Smith', sublabel: 'Conservative Party' },
    { id: 'c', label: 'Carla Nguyen', sublabel: 'Liberal Party' },
    { id: 'd', label: 'Derek Sanchez', sublabel: 'Liberal Party' },
    { id: 'в', label: 'Erika Novak', sublabel: 'Independent' },
];


export const fourCandidates: Candidate[] = [
    { id: 'a', label: 'Alice Johnson', sublabel: 'Conservative' },
    { id: 'b', label: 'Brian Smith', sublabel: 'Conservative Party' },
    { id: 'c', label: 'Carla Nguyen', sublabel: 'Liberal Party' },
    { id: 'd', label: 'Derek Sanchez', sublabel: 'Liberal Party' },
];


export const defaultParties: Party[] = [
    {
        id: 'party-green',
        name: 'Green Alliance',
        tagline: 'Environmental & social justice',
        candidates: [
            { id: 'ga-1', label: 'Avery Kim', sublabel: 'Climate Policy Expert' },
            { id: 'ga-2', label: 'Jordan Singh', sublabel: 'Urban Planner' },
            { id: 'ga-3', label: 'Morgan Diaz', sublabel: 'Public Health' },
        ],
    },
    {
        id: 'party-liberty',
        name: 'Liberty Coalition',
        tagline: 'Civil liberties & open markets',
        candidates: [
            { id: 'lc-1', label: 'Riley Chen', sublabel: 'Constitutional Lawyer' },
            { id: 'lc-2', label: 'Casey O’Neill', sublabel: 'Small Business Owner' },
            { id: 'lc-3', label: 'Sasha Novak', sublabel: 'Economist' },
        ],
    },
    {
        id: 'party-forward',
        name: 'Forward Futures',
        tagline: 'Tech & pragmatic governance',
        candidates: [
            { id: 'ff-1', label: 'Taylor Brooks', sublabel: 'Data Scientist' },
            { id: 'ff-2', label: 'Noah Park', sublabel: 'Educator' },
            { id: 'ff-3', label: 'Emery Santos', sublabel: 'Transit Advocate' },
        ],
    },
]

export const defaultPartiesClosed: Party[] = [
    {
        id: 'party-green',
        name: 'Green Alliance',
        tagline: 'Environmental & social justice',
        candidates: [
            { id: 'ga-1', label: 'Avery Kim', sublabel: 'Climate Policy Expert' },
            { id: 'ga-2', label: 'Jordan Singh', sublabel: 'Urban Planner' },
            { id: 'ga-3', label: 'Morgan Diaz', sublabel: 'Public Health' },
        ],
    },
    {
        id: 'party-liberty',
        name: 'Liberty Coalition',
        tagline: 'Civil liberties & open markets',
        candidates: [
            { id: 'lc-1', label: 'Riley Chen', sublabel: 'Constitutional Lawyer' },
            { id: 'lc-2', label: 'Casey O’Neill', sublabel: 'Small Business Owner' },
            { id: 'lc-3', label: 'Sasha Novak', sublabel: 'Economist' },
        ],
    },
    {
        id: 'party-forward',
        name: 'Forward Futures',
        tagline: 'Tech & pragmatic governance',
        candidates: [
            { id: 'ff-1', label: 'Taylor Brooks', sublabel: 'Data Scientist' },
            { id: 'ff-2', label: 'Noah Park', sublabel: 'Educator' },
            { id: 'ff-3', label: 'Emery Santos', sublabel: 'Transit Advocate' },
        ],
    },
];



export const mmpLocalCandidates: Candidate[] = [
    { id: "c1", label: "Alice Johnson", sublabel: "Conservative Party" },
    { id: "c2", label: "Brian Smith", sublabel: "Conservative Party" },
    { id: "c3", label: "Carla Nguyen", sublabel: "Liberal Party" },
    { id: "c4", label: "Derek Sanchez", sublabel: "Liberal Party" },
    { id: "c5", label: "Erika Novak", sublabel: "Green Alliance" },
    { id: "c6", label: "Farid Khan", sublabel: "Liberty Coalition" },
    { id: "c7", label: "Grace Liu", sublabel: "Forward Futures" },
];

export const mmpParties: Party[] = [
    {
        id: "party-conservative",
        name: "Conservative Party",
        tagline: "Tradition & fiscal responsibility",
        candidates: [
            { id: "con-1", label: "Henry Adams", sublabel: "Party Leader" },
            { id: "con-2", label: "Isabel Romero", sublabel: "Lawyer" },
            { id: "con-3", label: "James Patel", sublabel: "Economist" },
        ],
    },
    {
        id: "party-liberal",
        name: "Liberal Party",
        tagline: "Progress & equal opportunity",
        candidates: [
            { id: "lib-1", label: "Karen Douglas", sublabel: "Party Leader" },
            { id: "lib-2", label: "Leo Zhang", sublabel: "Educator" },
            { id: "lib-3", label: "Maya Singh", sublabel: "Health Policy Expert" },
        ],
    },
    {
        id: "party-green",
        name: "Green Alliance",
        tagline: "Environmental & social justice",
        candidates: [
            { id: "grn-1", label: "Nina Alvarez", sublabel: "Party Leader" },
            { id: "grn-2", label: "Oscar Turner", sublabel: "Climate Scientist" },
            { id: "grn-3", label: "Priya Mehta", sublabel: "Community Organizer" },
        ],
    },
    {
        id: "party-liberty",
        name: "Liberty Coalition",
        tagline: "Civil liberties & open markets",
        candidates: [
            { id: "libc-1", label: "Quinn Harper", sublabel: "Party Leader" },
            { id: "libc-2", label: "Ravi Kapoor", sublabel: "Entrepreneur" },
            { id: "libc-3", label: "Sofia Rossi", sublabel: "Constitutional Lawyer" },
        ],
    },
    {
        id: "party-forward",
        name: "Forward Futures",
        tagline: "Tech & pragmatic governance",
        candidates: [
            { id: "ff-1", label: "Taylor Brooks", sublabel: "Party Leader" },
            { id: "ff-2", label: "Uma Patel", sublabel: "Data Scientist" },
            { id: "ff-3", label: "Victor Lee", sublabel: "Transit Advocate" },
        ],
    },
];


export const panachageParties: Party[] = [
    {
        id: 'p1',
        name: 'List A — Greens',
        tagline: 'Climate & communities',
        candidates: [
            { id: 'a1', label: 'Z. Baumgartner', sublabel: 'Urban planner' },
            { id: 'a2', label: 'E. Keller', sublabel: 'Teacher' },
            { id: 'a3', label: 'S. Roth', sublabel: 'Engineer' },
            { id: 'a4', label: 'M. Vogel', sublabel: 'Nurse' },
        ],
    },
    {
        id: 'p2',
        name: 'List B — Liberals',
        tagline: 'Growth & opportunity',
        candidates: [
            { id: 'b1', label: 'L. Schmid', sublabel: 'Entrepreneur' },
            { id: 'b2', label: 'C. Frei', sublabel: 'Economist' },
            { id: 'b3', label: 'J. Maurer', sublabel: 'Attorney' },
            { id: 'b4', label: 'N. Steiner', sublabel: 'Developer' },
        ],
    },
    {
        id: 'p3',
        name: 'List C — Social',
        tagline: 'Care & fairness',
        candidates: [
            { id: 'c1', label: 'R. Tanner', sublabel: 'Social worker' },
            { id: 'c2', label: 'Y. Bühler', sublabel: 'Researcher' },
            { id: 'c3', label: 'T. Graf', sublabel: 'Councillor' },
            { id: 'c4', label: 'U. Marti', sublabel: 'Accountant' },
        ],
    },
];

export const studentCandidates: Candidate[] = [
    { id: 'a', label: 'Priya Patel', sublabel: 'Students for Sustainability' },
    { id: 'b', label: 'Liam O’Connor', sublabel: 'Campus Conservatives' },
    { id: 'c', label: 'Sofia Rossi', sublabel: 'Progressive Students Union' },
    { id: 'd', label: 'Daniel Kim', sublabel: 'Independent' },
];


export const professionalCandidates: Candidate[] = [
    { id: 'a1', label: 'Zachary Baumgartner', sublabel: 'Urban planner' },
    { id: 'a2', label: 'Elon Keller', sublabel: 'Teacher' },
    { id: 'a3', label: 'Sam Roth', sublabel: 'Engineer' },
    { id: 'a4', label: 'Mark Vogel', sublabel: 'Nurse' },
];