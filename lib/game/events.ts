import type { Badge } from "./badges";

export type GameEvent =
  | { type: "xp"; amount: number }
  | { type: "badge"; badge: Badge }
  | { type: "stage"; slug: string; title: string }
  | { type: "level"; title: string };

type Listener = (e: GameEvent) => void;
const listeners = new Set<Listener>();

export function onGameEvent(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function emitGameEvent(e: GameEvent) {
  listeners.forEach((l) => l(e));
}
