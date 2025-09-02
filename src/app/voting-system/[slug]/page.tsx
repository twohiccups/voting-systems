// app/voting-system/[slug]/page.tsx
import { notFound } from "next/navigation";
import { allSystemSlugs, type SystemSlug } from "@/lib/systems/registry";
import { loadSystem } from "@/lib/systems/load";
import SystemPage from "../components/SystemPage";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return allSystemSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug as SystemSlug;
  if (!allSystemSlugs.includes(slug)) return notFound();

  const systemContent = await loadSystem(slug);
  return <SystemPage content={systemContent} />;
}

