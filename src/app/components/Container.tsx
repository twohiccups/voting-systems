// components/Container.tsx
import { cn } from "@/lib/util";

export function Container({
    children,
    className,
}: React.PropsWithChildren<{ className?: string }>) {
    return (
        <div className={cn("container mx-auto max-w-7xl  space-y-12 sm:space-y-16 lg:space-y-24 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8", className)}>
            {children}
        </div>
    );
}
