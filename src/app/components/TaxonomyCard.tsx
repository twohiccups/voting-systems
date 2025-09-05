// File: src/app/components/TaxonomyCard.tsx
"use client";

import * as React from "react";
import { SystemCard } from "./SystemCard";
import { TaxonomySystem } from "@/lib/taxonomy/types";

export default function TaxonomyCard({ system }: { system: TaxonomySystem }) {
    return (
        <SystemCard
            title={system.name}
            description={system.shortDescription}
            className="h-full"
        />
    );
}
