import type { ProgressStore } from "./store";
import { emptyProgress, type Progress } from "./types";

const KEY = "dn-progress-v1";

/** localStorage-backed store. Falls back to memory when storage is unavailable. */
export function createLocalStore(): ProgressStore {
  let memory: Progress = emptyProgress();

  return {
    load() {
      try {
        const raw = window.localStorage.getItem(KEY);
        if (!raw) return memory;
        const parsed = JSON.parse(raw) as Progress;
        if (parsed?.version !== 1) return memory;
        memory = { ...emptyProgress(), ...parsed };
        return memory;
      } catch {
        return memory;
      }
    },
    save(progress) {
      memory = progress;
      try {
        window.localStorage.setItem(KEY, JSON.stringify(progress));
      } catch {
        // storage blocked or full — progress lives in memory for this visit
      }
    },
    clear() {
      memory = emptyProgress();
      try {
        window.localStorage.removeItem(KEY);
      } catch {
        // ignore
      }
    },
  };
}
