"use client";

import { totalXp, useHydrated, useProgress } from "@/lib/progress/context";
import { levelFor } from "@/lib/game/levels";
import { ar } from "@/lib/format";

export function XpMeter() {
  const progress = useProgress();
  const hydrated = useHydrated();
  const xp = totalXp(progress);
  const { current, next, progress: ratio } = levelFor(xp);

  return (
    <div className="xp" aria-label={`المستوى ${current.title}، ${xp} نقطة خبرة`}>
      <span className="xp-level">{current.title}</span>
      <span className="xp-bar" aria-hidden>
        <span className="xp-fill" style={{ transform: `scaleX(${hydrated ? ratio : 0})` }} />
      </span>
      <span className="xp-num">
        <strong>{hydrated ? ar(xp) : "—"}</strong> XP
        {next && hydrated && <span className="xp-next"> / {ar(next.min)}</span>}
      </span>
    </div>
  );
}
