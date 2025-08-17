
interface SectionHeadingProps {
    title: string
}

export default function SectionHeading({ title }: SectionHeadingProps) {
    return (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
        </h2>
    )
}