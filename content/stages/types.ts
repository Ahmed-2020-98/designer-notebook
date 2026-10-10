import type { ReactNode } from "react";

export type PickExercise = {
  kind: "pick";
  id: string;
  prompt: string;
  /** `a` is shown first (right side in RTL). */
  options: { a: ReactNode; b: ReactNode };
  correct: "a" | "b";
  explain: string;
  hint: string;
};

export type SpotExercise = {
  kind: "spot";
  id: string;
  prompt: string;
  /** Scene built with <Hotspot id> elements. */
  scene: ReactNode;
  target: string;
  /** Feedback for wrong hotspots, keyed by hotspot id. */
  misses: Record<string, string>;
  explain: string;
};

export type FixControl =
  | { type: "range"; key: string; label: string; min: number; max: number; step: number; unit?: string; initial: number }
  | { type: "select"; key: string; label: string; options: { value: string; label: string }[]; initial: string }
  | { type: "toggle"; key: string; label: string; initial: boolean };

export type FixValues = Record<string, number | string | boolean>;

export type FixExercise = {
  kind: "fix";
  id: string;
  prompt: string;
  controls: FixControl[];
  render: (values: FixValues) => ReactNode;
  /** Live readout shown under the preview (e.g. a ratio). */
  meter?: (values: FixValues) => { label: string; value: string; ok: boolean };
  validate: (values: FixValues) => { ok: true } | { ok: false; hint: string };
  explain: string;
};

export type QuizQuestion = {
  kind: "quiz";
  id: string;
  question: string;
  options: string[];
  correct: number;
  explain: string;
};

export type Exercise = PickExercise | SpotExercise | FixExercise | QuizQuestion;

export type Lesson = {
  type: "lesson";
  id: string;
  heading: string;
  body: ReactNode;
  example?: {
    bad: ReactNode;
    good: ReactNode;
    caption?: string;
  };
};

export type Block = Lesson | { type: "exercise"; exercise: Exercise } | { type: "quiz"; questions: QuizQuestion[] };

export type StageContent = {
  slug: string;
  intro: ReactNode;
  blocks: Block[];
  keyRules: string[];
};

export function exerciseIds(content: StageContent): string[] {
  return content.blocks.flatMap((b) =>
    b.type === "exercise" ? [b.exercise.id] : b.type === "quiz" ? b.questions.map((q) => q.id) : [],
  );
}
