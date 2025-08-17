import { Party } from "@/app/types";

export const candidates = [
    { id: 'cand-a', label: 'Alex Johnson', sublabel: 'Independent' },
    { id: 'cand-b', label: 'Bailey Rivera', sublabel: 'Green' },
    { id: 'cand-c', label: 'Cameron Lee', sublabel: 'Liberty' },
    { id: 'cand-d', label: 'Devin Patel', sublabel: 'Forward' },
]


export const parties = [
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

export const partiesClosed: Party[] = [
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