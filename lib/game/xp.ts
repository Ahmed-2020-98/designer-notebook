import type { ExerciseKind } from "../progress/types";

export const XP_BY_KIND: Record<ExerciseKind, number> = {
  pick: 10,
  spot: 20,
  fix: 30,
  quiz: 10,
};

/** Full XP on a first-try solve, half (rounded up) after mistakes. */
export function xpFor(kind: ExerciseKind, firstTry: boolean): number {
  const base = XP_BY_KIND[kind];
  return firstTry ? base : Math.ceil(base / 2);
}
