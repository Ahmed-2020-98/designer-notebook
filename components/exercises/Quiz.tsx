"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import type { QuizQuestion } from "@/content/stages/types";
import { ExerciseCard } from "./ExerciseCard";
import { useExercise } from "./useExercise";
import { ar } from "@/lib/format";

function Question({ q, index }: { q: QuizQuestion; index: number }) {
  const { solved, saved, fail, succeed, retry } = useExercise(q.id, "quiz");
  const [wrong, setWrong] = useState<number[]>([]);

  const choose = (i: number) => {
    if (solved || wrong.includes(i)) return;
    if (i === q.correct) succeed();
    else {
      setWrong((w) => [...w, i]);
      fail();
    }
  };

  const feedback = solved
    ? { tone: "right" as const, text: q.explain }
    : wrong.length
      ? { tone: "wrong" as const, text: "ليست هذه. فكّر مرة أخرى — الخيار المشطوب خرج من الحساب." }
      : null;

  return (
    <ExerciseCard
      kind="quiz"
      prompt={`${ar(index + 1)}. ${q.question}`}
      solved={solved}
      earnedXp={saved?.xp}
      feedback={feedback}
      onRetry={() => {
        retry();
        setWrong([]);
      }}
    >
      <ul className="quiz-opts" role="list">
        {q.options.map((opt, i) => {
          const isWrong = wrong.includes(i);
          const isRight = solved && i === q.correct;
          return (
            <li key={i}>
              <button
                type="button"
                className={`quiz-opt ${isWrong ? "is-wrong" : ""} ${isRight ? "is-right" : ""}`}
                onClick={() => choose(i)}
                aria-disabled={solved || isWrong}
              >
                <span className="quiz-dot" aria-hidden>
                  {isRight ? <Check size={14} /> : isWrong ? <X size={14} /> : null}
                </span>
                <span className="quiz-text">{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </ExerciseCard>
  );
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  return (
    <div className="quiz">
      <h2 className="quiz-title">اختبر نفسك</h2>
      {questions.map((q, i) => (
        <Question key={q.id} q={q} index={i} />
      ))}
    </div>
  );
}
