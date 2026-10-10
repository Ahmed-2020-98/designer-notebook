export type ExerciseKind = "pick" | "spot" | "fix" | "quiz";

export type ExerciseResult = {
  kind: ExerciseKind;
  stage: string;
  firstTry: boolean;
  xp: number;
  solvedAt: number;
};

export type Progress = {
  version: 1;
  /** keyed by `${stage}:${exerciseId}` */
  exercises: Record<string, ExerciseResult>;
  /** stage slug → completion timestamp */
  completedStages: Record<string, number>;
  /** badge id → unlock timestamp */
  badges: Record<string, number>;
  certificateName?: string;
};

export const emptyProgress = (): Progress => ({
  version: 1,
  exercises: {},
  completedStages: {},
  badges: {},
});
