
export default function Section({ children }: { children: React.ReactNode }) {
    return (
        <section className="space-y-6 sm:space-y-8 lg:space-y-10">
            {children}
        </section>
    );
}
