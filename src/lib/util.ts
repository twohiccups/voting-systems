// lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// merge Tailwind + conditional classes
export function cn(...inputs: unknown[]) {
    return twMerge(clsx(inputs));
}

