"use client";

import { exerciseKey, useHydrated, useProgress } from "@/lib/progress/context";
import { ar } from "@/lib/format";

export function StageProgress({ slug, ids }: { slug: string; ids: string[] }) {
  const progress = useProgress();
  const hydrated = useHydrated();
  const results = ids.map((id) => progress.exercises[exerciseKey(slug, id)]).filter(Boolean);
  const done = hydrated ? results.length : 0;
  const xp = results.reduce((s, r) => s + r.xp, 0);

  return (
    <div className="stage-progress">
      <span className="stage-progress-label">
        {ar(done)} من {ar(ids.length)} تمارين
      </span>
      <span className="stage-dots" aria-hidden>
        {ids.map((id, i) => (
          <span key={id} className={`stage-dot ${i < done ? "is-done" : ""}`} />
        ))}
      </span>
      {hydrated && xp > 0 && <span className="stage-progress-xp">+{ar(xp)} XP</span>}
    </div>
  );
}
