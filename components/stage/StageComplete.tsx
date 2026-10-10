"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { exerciseKey, useHydrated, useProgress } from "@/lib/progress/context";
import type { StageMeta } from "@/content/stages/meta";
import { Stamp } from "../ui/Stamp";
import { ar, arDate } from "@/lib/format";

export function StageComplete({ slug, ids, next }: { slug: string; ids: string[]; next?: StageMeta }) {
  const progress = useProgress();
  const hydrated = useHydrated();
  if (!hydrated) return null;

  const completedAt = progress.completedStages[slug];
  const remaining = ids.filter((id) => !progress.exercises[exerciseKey(slug, id)]).length;

  if (!completedAt) {
    return (
      <div className="complete complete--pending">
        <p>
          باقي <strong>{ar(remaining)}</strong> {remaining === 1 ? "تمرين" : "تمارين"} لتحصل على ختم هذه المرحلة.
        </p>
      </div>
    );
  }

  return (
    <div className="complete">
      <Stamp label="تمّت" sub={arDate(completedAt)} size={128} className="complete-stamp" />
      <div>
        <h2 className="complete-h">خُتمت المرحلة</h2>
        <p>أُضيف ختم هذه المرحلة إلى خريطتك. ما تعلمته هنا ستحتاجه في كل شاشة تصممها.</p>
        {next && next.status === "ready" ? (
          <Link href={`/path/${next.slug}/`} className="btn btn--ink">
            انتقل إلى «{next.title}» <ArrowLeft size={18} aria-hidden />
          </Link>
        ) : (
          <Link href="/#map" className="btn btn--ink">
            عُد إلى الخريطة <ArrowLeft size={18} aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
