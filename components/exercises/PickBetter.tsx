"use client";

import { useState } from "react";
import type { PickExercise } from "@/content/stages/types";
import { ExerciseCard, type Feedback } from "./ExerciseCard";
import { useExercise } from "./useExercise";
import { Stamp } from "../ui/Stamp";

export function PickBetter({ ex }: { ex: PickExercise }) {
  const { solved, saved, fail, succeed, retry } = useExercise(ex.id, "pick");
  const [wrong, setWrong] = useState<"a" | "b" | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const choose = (side: "a" | "b") => {
    if (solved) return;
    if (side === ex.correct) {
      setWrong(null);
      setFeedback({ tone: "right", text: ex.explain });
      succeed();
    } else {
      setWrong(side);
      setFeedback({ tone: "wrong", text: ex.hint });
      fail();
    }
  };

  const shownFeedback = solved && !feedback ? { tone: "right" as const, text: ex.explain } : feedback;

  return (
    <ExerciseCard
      kind="pick"
      prompt={ex.prompt}
      solved={solved}
      earnedXp={saved?.xp}
      feedback={shownFeedback}
      onRetry={() => {
        retry();
        setWrong(null);
        setFeedback(null);
      }}
    >
      <div className="pick">
        {(["a", "b"] as const).map((side) => {
          const isCorrect = solved && side === ex.correct;
          return (
            <button
              key={side}
              type="button"
              className={`pick-opt ${wrong === side ? "is-wrong" : ""} ${isCorrect ? "is-right" : ""} ${solved && !isCorrect ? "is-dim" : ""}`}
              onClick={() => choose(side)}
              aria-disabled={solved}
              aria-label={`الخيار ${side === "a" ? "أ" : "ب"}`}
            >
              <span className="pick-letter" aria-hidden>
                {side === "a" ? "أ" : "ب"}
              </span>
              <span className="pick-body">{ex.options[side]}</span>
              {isCorrect && <Stamp className="pick-stamp" size={68} />}
            </button>
          );
        })}
      </div>
    </ExerciseCard>
  );
}
