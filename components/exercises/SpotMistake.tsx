"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { SpotExercise } from "@/content/stages/types";
import { ExerciseCard, type Feedback } from "./ExerciseCard";
import { useExercise } from "./useExercise";
import { HotspotContext } from "../ui/Hotspot";

export function SpotMistake({ ex }: { ex: SpotExercise }) {
  const { solved, saved, fail, succeed, retry } = useExercise(ex.id, "spot");
  const [wrong, setWrong] = useState<string | undefined>();
  const [feedback, setFeedback] = useState<Feedback>(null);

  const onPick = (id: string) => {
    if (id === ex.target) {
      setWrong(undefined);
      setFeedback({ tone: "right", text: ex.explain });
      succeed();
    } else {
      setWrong(id);
      setFeedback({ tone: "wrong", text: ex.misses[id] ?? "ليس هذا العنصر. انظر مرة أخرى." });
      fail();
    }
  };

  const shownFeedback = solved && !feedback ? { tone: "right" as const, text: ex.explain } : feedback;

  return (
    <ExerciseCard
      kind="spot"
      prompt={ex.prompt}
      solved={solved}
      earnedXp={saved?.xp}
      feedback={shownFeedback}
      onRetry={() => {
        retry();
        setWrong(undefined);
        setFeedback(null);
      }}
    >
      <p className="spot-hint">
        <Search size={14} aria-hidden /> وضع التفتيش: مرّر على عناصر التصميم وانقر على موضع الخطأ — أو تنقّل بـ Tab واضغط Enter.
      </p>
      <HotspotContext.Provider value={{ active: !solved, found: solved ? ex.target : undefined, wrong, onPick }}>
        <div className="spot-scene">{ex.scene}</div>
      </HotspotContext.Provider>
    </ExerciseCard>
  );
}
