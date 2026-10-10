"use client";

import { useState, type ReactNode } from "react";
import { X, Check } from "lucide-react";
import { MarksOn } from "../ui/Mark";
import { Stamp } from "../ui/Stamp";
import { useInView } from "@/lib/useInView";

export function BeforeAfter({ bad, good, caption }: { bad: ReactNode; good: ReactNode; caption?: string }) {
  const [show, setShow] = useState<"bad" | "good">("bad");
  const [ref, inView] = useInView<HTMLElement>(0.35);

  return (
    <figure ref={ref} className={`ba ${inView ? "is-visible" : ""}`}>
      <div className="ba-switch" role="group" aria-label="اختر النسخة">
        <button type="button" aria-pressed={show === "bad"} onClick={() => setShow("bad")} className="ba-switch-btn is-bad">
          <X size={16} aria-hidden /> قبل التصحيح
        </button>
        <button type="button" aria-pressed={show === "good"} onClick={() => setShow("good")} className="ba-switch-btn is-good">
          <Check size={16} aria-hidden /> بعد التصحيح
        </button>
      </div>
      <div className="ba-grid" data-show={show}>
        <div className="ba-panel ba-bad">
          <span className="ba-tag ba-tag--bad">
            <X size={14} aria-hidden /> خطأ
          </span>
          <div className="ba-stage">
            <MarksOn on>{bad}</MarksOn>
          </div>
        </div>
        <div className="ba-panel ba-good">
          <span className="ba-tag ba-tag--good">
            <Check size={14} aria-hidden /> صح
          </span>
          <Stamp className="ba-stamp" />
          <div className="ba-stage">{good}</div>
        </div>
      </div>
      {caption && <figcaption className="ba-caption">{caption}</figcaption>}
    </figure>
  );
}
