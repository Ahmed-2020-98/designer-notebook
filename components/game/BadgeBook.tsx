"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Lock, RotateCcw } from "lucide-react";
import { BADGES } from "@/lib/game/badges";
import { LEVELS, levelFor } from "@/lib/game/levels";
import { STAGES } from "@/content/stages/meta";
import { resetProgress, totalXp, useHydrated, useProgress } from "@/lib/progress/context";
import { Stamp } from "../ui/Stamp";
import { ar, arDate } from "@/lib/format";

export function BadgeBook() {
  const progress = useProgress();
  const hydrated = useHydrated();
  const [confirming, setConfirming] = useState(false);
  const xp = totalXp(progress);
  const { current } = levelFor(xp);
  const stamped = Object.keys(progress.completedStages).length;

  return (
    <>
      <section className="ledger" aria-label="ملخص التقدم">
        <div>
          <span className="ledger-k">المستوى</span>
          <strong>{hydrated ? current.title : "—"}</strong>
        </div>
        <div>
          <span className="ledger-k">نقاط الخبرة</span>
          <strong>{hydrated ? ar(xp) : "—"}</strong>
        </div>
        <div>
          <span className="ledger-k">أختام المراحل</span>
          <strong>
            {hydrated ? ar(stamped) : "—"} / {ar(STAGES.length)}
          </strong>
        </div>
      </section>

      <h2 className="section-h section-h--sm">أختام المراحل</h2>
      <ol className="stamps-grid">
        {STAGES.map((s) => {
          const at = hydrated ? progress.completedStages[s.slug] : undefined;
          return (
            <li key={s.slug} className={`stamp-slot ${at ? "is-earned" : ""}`}>
              {at ? <Stamp label={ar(s.n)} size={64} /> : <span className="stamp-empty">{ar(s.n)}</span>}
              <span className="stamp-slot-title">{s.title}</span>
              {at && <span className="stamp-slot-date">{arDate(at)}</span>}
            </li>
          );
        })}
      </ol>

      <h2 className="section-h section-h--sm">شارات الإنجاز</h2>
      <ul className="badges-grid" role="list">
        {BADGES.map((b) => {
          const at = hydrated ? progress.badges[b.id] : undefined;
          return (
            <li key={b.id} className={`badge ${at ? "is-earned" : ""}`}>
              <span className="badge-icon" aria-hidden>
                {at ? <Award size={26} /> : <Lock size={20} />}
              </span>
              <span>
                <strong>{b.title}</strong>
                <span className="badge-desc">{b.description}</span>
                {at && <span className="badge-date">نلتها في {arDate(at)}</span>}
              </span>
            </li>
          );
        })}
      </ul>

      <h2 className="section-h section-h--sm">سلّم المستويات</h2>
      <ol className="levels">
        {LEVELS.map((l) => (
          <li key={l.id} className={hydrated && l.id === current.id ? "is-current" : ""}>
            <strong>{l.title}</strong>
            <span>من {ar(l.min)} XP</span>
          </li>
        ))}
      </ol>

      <div className="reset">
        {!confirming ? (
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirming(true)}>
            <RotateCcw size={14} aria-hidden /> ابدأ الدفتر من جديد
          </button>
        ) : (
          <div className="reset-confirm" role="alert">
            <p>سيُمسح كل تقدمك ونقاطك وشاراتك من هذا المتصفح. لا يمكن التراجع.</p>
            <button
              type="button"
              className="btn btn--red btn--sm"
              onClick={() => {
                resetProgress();
                setConfirming(false);
              }}
            >
              نعم، امسح كل شيء
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirming(false)}>
              تراجع
            </button>
          </div>
        )}
        <Link href="/#map" className="btn btn--ink btn--sm">
          عُد إلى الخريطة
        </Link>
      </div>
    </>
  );
}
