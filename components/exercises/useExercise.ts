"use client";

import { createContext, useContext, useState } from "react";
import { exerciseKey, recordSolve, useProgress } from "@/lib/progress/context";
import type { ExerciseKind } from "@/lib/progress/types";

export type StageInfo = { slug: string; title: string; exerciseIds: string[] };
export const StageContext = createContext<StageInfo | null>(null);

export function useExercise(id: string, kind: ExerciseKind) {
  const stage = useContext(StageContext);
  if (!stage) throw new Error("useExercise must be used inside a stage");

  const progress = useProgress();
  const saved = progress.exercises[exerciseKey(stage.slug, id)];
  const [attempts, setAttempts] = useState(0);
  const [solvedNow, setSolvedNow] = useState(false);
  const [replay, setReplay] = useState(false);

  const solved = solvedNow || (!!saved && !replay);

  return {
    saved,
    solved,
    attempts,
    fail: () => setAttempts((a) => a + 1),
    succeed: () => {
      setSolvedNow(true);
      recordSolve({
        stage: stage.slug,
        stageTitle: stage.title,
        exerciseId: id,
        kind,
        firstTry: attempts === 0,
        stageExerciseIds: stage.exerciseIds,
      });
    },
    /** Practice again without earning XP twice. */
    retry: () => {
      setReplay(true);
      setSolvedNow(false);
      setAttempts(0);
    },
  };
}
