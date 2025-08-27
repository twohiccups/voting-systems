// components/FullBleed.tsx
import { cn } from "@/lib/util";

export function FullBleed({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return (
        <div className={cn("relative left-1/2 right-1/2 -mx-[50vw] w-screen", className)}>
            {children}
        </div>
    );
}
