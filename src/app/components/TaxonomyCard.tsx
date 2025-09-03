// File: src/app/components/TaxonomyCard.tsx
"use client";

import * as React from "react";
import { TaxonomySystem } from "../types";
import { SystemCard } from "./SystemCard";

export default function TaxonomyCard({ system }: { system: TaxonomySystem }) {
    return (
        <SystemCard
            title={system.name}
            description={system.shortDescription}
            className="h-full"
        />
    );
}
