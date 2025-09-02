// app/voting-system/[slug]/page.tsx
import { notFound } from "next/navigation";
import { allSystemSlugs, type SystemSlug } from "@/lib/systems/registry";
import { loadSystem } from "@/lib/systems/load";
import SystemPage from "../components/SystemPage";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return allSystemSlugs.map((slug) => ({ slug }));
}

// ✅ params is a Promise in Next 15's generated types
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <-- await the promise
  const s = slug as SystemSlug;

  if (!allSystemSlugs.includes(s)) return notFound();

  const systemContent = await loadSystem(s);
  return <SystemPage content={systemContent} />;
}
