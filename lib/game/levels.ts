export type Level = { id: string; title: string; min: number };

export const LEVELS: Level[] = [
  { id: "trainee", title: "متدرّب", min: 0 },
  { id: "designer", title: "مصمم", min: 150 },
  { id: "senior", title: "مصمم أول", min: 500 },
  { id: "mentor", title: "مرشد", min: 1000 },
];

export function levelFor(xp: number) {
  let index = 0;
  LEVELS.forEach((level, i) => {
    if (xp >= level.min) index = i;
  });
  const current = LEVELS[index];
  const next = LEVELS[index + 1];
  const progress = next ? (xp - current.min) / (next.min - current.min) : 1;
  return { current, next, progress: Math.min(1, Math.max(0, progress)) };
}
