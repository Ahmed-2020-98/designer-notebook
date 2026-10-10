"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useHydrated, useProgress } from "@/lib/progress/context";
import { useNextStage } from "./PathMap";
import { ar } from "@/lib/format";

export function ContinueButton() {
  const hydrated = useHydrated();
  const progress = useProgress();
  const next = useNextStage();
  const started = hydrated && Object.keys(progress.exercises).length > 0;

  if (hydrated && !next) {
    return (
      <Link href="/certificate/" className="btn btn--red btn--lg">
        أتممت الدفتر كله — استلم شهادتك <ArrowLeft size={20} aria-hidden />
      </Link>
    );
  }
  const target = next ?? { slug: "visual-hierarchy", n: 1, title: "التسلسل البصري" };
  return (
    <Link href={`/path/${target.slug}/`} className="btn btn--red btn--lg">
      {started ? `تابع: المرحلة ${ar(target.n)} — ${target.title}` : "ابدأ المسار من المرحلة ١"}
      <ArrowLeft size={20} aria-hidden />
    </Link>
  );
}
