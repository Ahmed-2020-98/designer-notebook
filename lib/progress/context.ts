"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "./localStore";
import type { ProgressStore } from "./store";
import { emptyProgress, type ExerciseKind, type Progress } from "./types";
import { xpFor } from "../game/xp";
import { newlyEarned } from "../game/badges";
import { levelFor } from "../game/levels";
import { emitGameEvent } from "../game/events";

let store: ProgressStore | null = null;
let state: Progress = emptyProgress();
let loaded = false;
const SERVER_SNAPSHOT = emptyProgress();
const listeners = new Set<() => void>();

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  store = createLocalStore();
  state = store.load();
  loaded = true;
}

function commit(next: Progress) {
  state = next;
  store?.save(next);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === "dn-progress-v1" && store) {
      state = store.load();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

/** Progress for rendering. Empty during SSR and hydration, real data right after. */
export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
}

const noopSubscribe = () => () => {};
/** True only after hydration — use to gate UI that depends on saved progress. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export const totalXp = (p: Progress) =>
  Object.values(p.exercises).reduce((sum, r) => sum + r.xp, 0);

export const exerciseKey = (stage: string, id: string) => `${stage}:${id}`;

export function recordSolve(args: {
  stage: string;
  stageTitle: string;
  exerciseId: string;
  kind: ExerciseKind;
  firstTry: boolean;
  stageExerciseIds: string[];
}) {
  ensureLoaded();
  const key = exerciseKey(args.stage, args.exerciseId);
  if (state.exercises[key]) return;

  const now = Date.now();
  const xp = xpFor(args.kind, args.firstTry);
  const levelBefore = levelFor(totalXp(state)).current.id;

  let next: Progress = {
    ...state,
    exercises: {
      ...state.exercises,
      [key]: { kind: args.kind, stage: args.stage, firstTry: args.firstTry, xp, solvedAt: now },
    },
  };

  const stageDone = args.stageExerciseIds.every((id) => next.exercises[exerciseKey(args.stage, id)]);
  const justCompleted = stageDone && !next.completedStages[args.stage];
  if (justCompleted) {
    next = { ...next, completedStages: { ...next.completedStages, [args.stage]: now } };
  }

  const earned = newlyEarned(next);
  if (earned.length) {
    const badges = { ...next.badges };
    earned.forEach((b) => (badges[b.id] = now));
    next = { ...next, badges };
  }

  commit(next);

  emitGameEvent({ type: "xp", amount: xp });
  if (justCompleted) emitGameEvent({ type: "stage", slug: args.stage, title: args.stageTitle });
  earned.forEach((badge) => emitGameEvent({ type: "badge", badge }));
  const levelAfter = levelFor(totalXp(next)).current;
  if (levelAfter.id !== levelBefore) emitGameEvent({ type: "level", title: levelAfter.title });
}

export function setCertificateName(name: string) {
  ensureLoaded();
  commit({ ...state, certificateName: name });
}

export function resetProgress() {
  ensureLoaded();
  store?.clear();
  commit(emptyProgress());
}
