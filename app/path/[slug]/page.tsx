import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STAGES, stageBySlug } from "@/content/stages/meta";
import { StageView } from "@/components/stage/StageView";

export const dynamicParams = false;

export function generateStaticParams() {
  return STAGES.filter((s) => s.status === "ready").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/path/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const stage = stageBySlug(slug);
  return stage ? { title: `${stage.n}. ${stage.title}`, description: stage.tagline } : {};
}

export default async function StagePage({ params }: PageProps<"/path/[slug]">) {
  const { slug } = await params;
  const stage = stageBySlug(slug);
  if (!stage || stage.status !== "ready") notFound();
  return (
    <div className="wrap">
      <StageView slug={slug} />
    </div>
  );
}
