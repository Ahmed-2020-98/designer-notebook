"use client";

import { useId, useState } from "react";
import { Wrench } from "lucide-react";
import type { FixExercise, FixValues } from "@/content/stages/types";
import { ExerciseCard, type Feedback } from "./ExerciseCard";
import { useExercise } from "./useExercise";

const initialValues = (ex: FixExercise): FixValues =>
  Object.fromEntries(ex.controls.map((c) => [c.key, c.initial]));

export function FixIt({ ex }: { ex: FixExercise }) {
  const { solved, saved, fail, succeed, retry } = useExercise(ex.id, "fix");
  const [values, setValues] = useState<FixValues>(() => initialValues(ex));
  const [feedback, setFeedback] = useState<Feedback>(null);
  const uid = useId();

  const set = (key: string, v: number | string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (feedback?.tone === "wrong") setFeedback(null);
  };

  const check = () => {
    const result = ex.validate(values);
    if (result.ok) {
      setFeedback({ tone: "right", text: ex.explain });
      succeed();
    } else {
      setFeedback({ tone: "wrong", text: result.hint });
      fail();
    }
  };

  // after a reload the preview shows the starting values, so a stale red meter would mislead
  const meter = solved && !feedback ? undefined : ex.meter?.(values);
  const shownFeedback = solved && !feedback ? { tone: "right" as const, text: ex.explain } : feedback;

  return (
    <ExerciseCard
      kind="fix"
      prompt={ex.prompt}
      solved={solved}
      earnedXp={saved?.xp}
      feedback={shownFeedback}
      onRetry={() => {
        retry();
        setValues(initialValues(ex));
        setFeedback(null);
      }}
    >
      <div className="fix">
        <div className="fix-preview">
          {ex.render(values)}
          {meter && (
            <p className={`fix-meter ${meter.ok ? "is-ok" : ""}`}>
              <span>{meter.label}</span>
              <strong dir="ltr">{meter.value}</strong>
            </p>
          )}
        </div>
        <div className="fix-panel" aria-label="لوحة التحكم">
          <p className="fix-panel-title">
            <Wrench size={14} aria-hidden /> الخصائص
          </p>
          {ex.controls.map((c) => {
            const id = `${uid}-${c.key}`;
            const v = values[c.key];
            if (c.type === "range") {
              return (
                <div key={c.key} className="fix-ctl">
                  <label htmlFor={id}>
                    {c.label}
                    <output htmlFor={id} dir="ltr">
                      {Number.isInteger(Number(v)) ? String(v) : Number(v).toFixed(1)}
                      {c.unit}
                    </output>
                  </label>
                  <input
                    id={id}
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.step}
                    value={Number(v)}
                    disabled={solved}
                    onChange={(e) => set(c.key, Number(e.target.value))}
                  />
                </div>
              );
            }
            if (c.type === "select") {
              return (
                <div key={c.key} className="fix-ctl">
                  <label htmlFor={id}>{c.label}</label>
                  <select id={id} value={String(v)} disabled={solved} onChange={(e) => set(c.key, e.target.value)}>
                    {c.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
            return (
              <div key={c.key} className="fix-ctl fix-ctl--toggle">
                <label htmlFor={id}>{c.label}</label>
                <input
                  id={id}
                  type="checkbox"
                  role="switch"
                  className="switch"
                  checked={Boolean(v)}
                  disabled={solved}
                  onChange={(e) => set(c.key, e.target.checked)}
                />
              </div>
            );
          })}
          {!solved && (
            <button type="button" className="btn btn--ink fix-check" onClick={check}>
              تحقّق من التصحيح
            </button>
          )}
        </div>
      </div>
    </ExerciseCard>
  );
}
