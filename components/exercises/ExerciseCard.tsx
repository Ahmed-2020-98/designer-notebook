"use client";

import type { ReactNode } from "react";
import { Eye, MousePointerClick, Wrench, ListChecks, Check, RotateCcw } from "lucide-react";
import type { ExerciseKind } from "@/lib/progress/types";
import { XP_BY_KIND } from "@/lib/game/xp";
import { ar } from "@/lib/format";

const KIND_LABEL: Record<ExerciseKind, { label: string; Icon: typeof Eye }> = {
  pick: { label: "أيّهما أفضل؟", Icon: Eye },
  spot: { label: "اكتشف الخطأ", Icon: MousePointerClick },
  fix: { label: "أصلحه بنفسك", Icon: Wrench },
  quiz: { label: "اختبار سريع", Icon: ListChecks },
};

export type Feedback = { tone: "wrong" | "right"; text: string } | null;

export function ExerciseCard({
  kind,
  prompt,
  solved,
  earnedXp,
  feedback,
  onRetry,
  children,
}: {
  kind: ExerciseKind;
  prompt: string;
  solved: boolean;
  earnedXp?: number;
  feedback: Feedback;
  onRetry?: () => void;
  children: ReactNode;
}) {
  const { label, Icon } = KIND_LABEL[kind];
  return (
    <section className={`ex ex--${kind} ${solved ? "is-solved" : ""}`} aria-label={label}>
      <header className="ex-head">
        <span className="ex-kind">
          <Icon size={16} aria-hidden /> {label}
        </span>
        <span className={`ex-xp ${solved ? "is-earned" : ""}`}>
          {solved ? <Check size={14} aria-hidden /> : null}
          {solved && earnedXp !== undefined ? `+${ar(earnedXp)}` : `+${ar(XP_BY_KIND[kind])}`} XP
        </span>
      </header>
      <p className="ex-prompt">{prompt}</p>
      {children}
      <div className="ex-feedback" aria-live="polite">
        {feedback && (
          <p className={`ex-msg ex-msg--${feedback.tone}`}>
            {feedback.tone === "right" && <Check size={18} aria-hidden />}
            <span>{feedback.text}</span>
          </p>
        )}
      </div>
      {solved && onRetry && (
        <button type="button" className="btn btn--ghost btn--sm ex-retry" onClick={onRetry}>
          <RotateCcw size={14} aria-hidden /> تدرّب مرة أخرى
        </button>
      )}
    </section>
  );
}
