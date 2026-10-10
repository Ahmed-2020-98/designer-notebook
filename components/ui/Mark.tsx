"use client";

import { createContext, useContext, type ReactNode } from "react";

const MarksContext = createContext(false);

export function MarksOn({ on, children }: { on: boolean; children: ReactNode }) {
  return <MarksContext.Provider value={on}>{children}</MarksContext.Provider>;
}

/** Hand-drawn ring path, drawn with stroke-dashoffset when its panel is visible. */
export function PenRing({ className = "" }: { className?: string }) {
  return (
    <svg className={`pen-ring ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <path
        pathLength={1}
        d="M10,58 C4,30 30,7 58,8 C84,9 98,30 95,54 C92,80 66,95 40,93 C16,91 2,72 8,46 C10,36 16,28 24,22"
      />
    </svg>
  );
}

/**
 * Wraps part of a "bad" example and circles it in red pen with a margin note.
 * Renders children untouched when marks are off (e.g. in the "good" panel).
 */
export function Mark({
  note,
  children,
  inline = false,
  side = "top",
}: {
  note: string;
  children: ReactNode;
  inline?: boolean;
  side?: "top" | "bottom";
}) {
  const on = useContext(MarksContext);
  if (!on) return <>{children}</>;
  return (
    <span className={`mark ${inline ? "mark--inline" : ""}`}>
      {children}
      <PenRing />
      <span className={`mark-note mark-note--${side}`} aria-hidden>
        {note}
      </span>
      <span className="sr-only">ملاحظة المصحّح: {note}</span>
    </span>
  );
}
