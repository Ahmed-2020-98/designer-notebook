"use client";

import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { CHAPTERS, STAGES, type StageMeta } from "@/content/stages/meta";
import { useHydrated, useProgress } from "@/lib/progress/context";
import { ar } from "@/lib/format";

/** Suggested next stage: first ready stage not yet stamped. */
export function useNextStage(): StageMeta | undefined {
  const progress = useProgress();
  return STAGES.find((s) => s.status === "ready" && !progress.completedStages[s.slug]);
}

export function PathMap() {
  const progress = useProgress();
  const hydrated = useHydrated();
  const next = useNextStage();

  return (
    <div className="map">
      {CHAPTERS.map((chapter) => (
        <section key={chapter.n} className="map-chapter" aria-labelledby={`ch-${chapter.n}`}>
          <header className="map-chapter-head">
            <span className="map-chapter-n">الباب {ar(chapter.n)}</span>
            <h3 id={`ch-${chapter.n}`} className="map-chapter-title">
              {chapter.title}
            </h3>
            <p className="map-chapter-sub">{chapter.subtitle}</p>
          </header>
          <ol className="map-trail">
            {STAGES.filter((s) => s.chapter === chapter.n).map((s) => {
              const done = hydrated && !!progress.completedStages[s.slug];
              const isNext = hydrated && next?.slug === s.slug;
              const state = done ? "done" : isNext ? "next" : s.status === "soon" ? "soon" : "open";
              const body = (
                <>
                  <span className="node" aria-hidden>
                    {done ? <Check size={22} strokeWidth={3} /> : ar(s.n)}
                  </span>
                  <span className="node-card">
                    <span className="node-title">
                      {s.title}
                      <span className="node-en" lang="en" dir="ltr">
                        {s.en}
                      </span>
                    </span>
                    <span className="node-tagline">{s.tagline}</span>
                    {state === "next" && <span className="node-flag">ابدأ من هنا</span>}
                    {state === "done" && <span className="node-flag node-flag--done">مختومة</span>}
                    {state === "soon" && (
                      <span className="node-flag node-flag--soon">
                        <Lock size={12} aria-hidden /> قريباً
                      </span>
                    )}
                  </span>
                </>
              );
              return (
                <li key={s.slug} className={`map-stop is-${state}`}>
                  {s.status === "ready" ? (
                    <Link href={`/path/${s.slug}/`} className="map-link" aria-label={`المرحلة ${s.n}: ${s.title}${done ? " — مختومة" : ""}`}>
                      {body}
                    </Link>
                  ) : (
                    <div className="map-link" aria-label={`المرحلة ${s.n}: ${s.title} — قريباً`}>
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
