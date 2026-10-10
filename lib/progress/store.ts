import type { Progress } from "./types";

/**
 * Persistence boundary. Swap the implementation (e.g. a remote API)
 * without touching the UI or game rules.
 */
export interface ProgressStore {
  load(): Progress;
  save(progress: Progress): void;
  clear(): void;
}
