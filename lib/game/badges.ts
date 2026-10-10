import type { Progress } from "../progress/types";
import { TOTAL_STAGES } from "@/content/stages/meta";

export type Badge = {
  id: string;
  title: string;
  description: string;
  test: (p: Progress) => boolean;
};

const solved = (p: Progress) => Object.values(p.exercises);

export const BADGES: Badge[] = [
  {
    id: "first-mark",
    title: "أول علامة",
    description: "حللت أول تمرين في الدفتر.",
    test: (p) => solved(p).length >= 1,
  },
  {
    id: "first-stage",
    title: "أول ختم",
    description: "أنهيت مرحلة كاملة من المسار.",
    test: (p) => Object.keys(p.completedStages).length >= 1,
  },
  {
    id: "sharp-eye",
    title: "عين ثاقبة",
    description: "اكتشفت الخطأ من أول محاولة في ٣ تمارين.",
    test: (p) => solved(p).filter((r) => r.kind === "spot" && r.firstTry).length >= 3,
  },
  {
    id: "fixer",
    title: "يد المصلّح",
    description: "أصلحت ٣ تصاميم بنفسك.",
    test: (p) => solved(p).filter((r) => r.kind === "fix").length >= 3,
  },
  {
    id: "flawless",
    title: "بلا شطب",
    description: "أنهيت مرحلة كل تمارينها من أول محاولة.",
    test: (p) =>
      Object.keys(p.completedStages).some((stage) => {
        const results = solved(p).filter((r) => r.stage === stage);
        return results.length > 0 && results.every((r) => r.firstTry);
      }),
  },
  {
    id: "half-notebook",
    title: "نصف الدفتر",
    description: "أنهيت ٨ مراحل.",
    test: (p) => Object.keys(p.completedStages).length >= 8,
  },
  {
    id: "notebook-seal",
    title: "خاتم الدفتر",
    description: "أنهيت المراحل الـ١٦ كلها — الشهادة بانتظارك.",
    test: (p) => Object.keys(p.completedStages).length >= TOTAL_STAGES,
  },
];

export function newlyEarned(p: Progress): Badge[] {
  return BADGES.filter((b) => !p.badges[b.id] && b.test(p));
}
