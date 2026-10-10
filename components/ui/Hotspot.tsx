"use client";

import { createContext, useContext, type ReactNode, type KeyboardEvent } from "react";
import { PenRing } from "./Mark";

type HotspotState = { active: boolean; found?: string; wrong?: string; onPick: (id: string) => void };

export const HotspotContext = createContext<HotspotState | null>(null);

/** A clickable region inside a SpotMistake scene. Inert outside an exercise. */
export function Hotspot({ id, label, children, className = "" }: { id: string; label: string; children: ReactNode; className?: string }) {
  const ctx = useContext(HotspotContext);
  if (!ctx) return <div className={className}>{children}</div>;

  const isFound = ctx.found === id;
  const isWrong = ctx.wrong === id;
  const pick = () => ctx.active && ctx.onPick(id);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={ctx.active ? 0 : -1}
      aria-label={label}
      aria-disabled={!ctx.active}
      className={`hotspot ${ctx.active ? "is-active" : ""} ${isFound ? "is-found" : ""} ${isWrong ? "is-wrong" : ""} ${className}`}
      onClick={pick}
      onKeyDown={onKey}
    >
      {children}
      {isFound && <PenRing className="is-drawn" />}
    </div>
  );
}
