// components/SectionHeading.tsx
interface SectionHeadingProps {
    id?: string;
    title: string;
    className?: string;
}

export default function SectionHeading({ id, title, className }: SectionHeadingProps) {
    return (
        <h2
            id={id}
            className={
                'scroll-mt-28 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-center ' +
                (className ?? '')
            }
        >
            {title}
        </h2>
    );
}
