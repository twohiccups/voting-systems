// File: src/app/components/TaxonomyCard.tsx
"use client";

import * as React from "react";
import { TaxonomySystem } from "@/lib/taxonomy/types";
import { Card } from "./primitives";

export default function TaxonomyCard({ system }: { system: TaxonomySystem }) {
    return (<><Card title={system.id} children={undefined}></Card></>
    );
}
