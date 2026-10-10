"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { STAGES, CHAPTERS, type StageMeta } from "@/content/stages/meta";
import { exerciseIds, type StageContent } from "@/content/stages/types";
import { STAGE_CONTENT } from "@/content/stages/registry";
import { StageContext } from "../exercises/useExercise";
import { PickBetter } from "../exercises/PickBetter";
import { SpotMistake } from "../exercises/SpotMistake";
import { FixIt } from "../exercises/FixIt";
import { Quiz } from "../exercises/Quiz";
import { BeforeAfter } from "../compare/BeforeAfter";
import { StageProgress } from "./StageProgress";
import { StageComplete } from "./StageComplete";
import { ar } from "@/lib/format";

function Blocks({ content }: { content: StageContent }) {
  return (
    <>
      {content.blocks.map((block) => {
        if (block.type === "lesson") {
          return (
            <section key={block.id} className="lesson reveal" aria-labelledby={`h-${block.id}`}>
              <h2 id={`h-${block.id}`} className="lesson-h">
                {block.heading}
              </h2>
              <div className="lesson-body">{block.body}</div>
              {block.example && <BeforeAfter {...block.example} />}
            </section>
          );
        }
        if (block.type === "quiz") return <Quiz key="quiz" questions={block.questions} />;
        const ex = block.exercise;
        const el =
          ex.kind === "pick" ? <PickBetter ex={ex} /> : ex.kind === "spot" ? <SpotMistake ex={ex} /> : ex.kind === "fix" ? <FixIt ex={ex} /> : null;
        return (
          <div key={ex.id} className="reveal">
            {el}
          </div>
        );
      })}
    </>
  );
}

export function StageView({ slug }: { slug: string }) {
  const meta = STAGES.find((s) => s.slug === slug) as StageMeta;
  const content = STAGE_CONTENT[slug];
  const chapter = CHAPTERS.find((c) => c.n === meta.chapter)!;
  const ids = exerciseIds(content);
  const index = STAGES.indexOf(meta);
  const prev = STAGES[index - 1];
  const next = STAGES[index + 1];

  return (
    <StageContext.Provider value={{ slug, title: meta.title, exerciseIds: ids }}>
      <article className="stage">
        <header className="stage-head">
          <p className="stage-crumb">
            <Link href="/#map">الخريطة</Link> <span aria-hidden>←</span> الباب {ar(chapter.n)}: {chapter.title}
          </p>
          <div className="stage-title-row">
            <span className="stage-num" aria-hidden>
              {ar(meta.n).padStart(2, "٠")}
            </span>
            <div>
              <h1 className="stage-title">
                {meta.title}
                <span className="stage-en" lang="en" dir="ltr">
                  {meta.en}
                </span>
              </h1>
              <p className="stage-tagline">{meta.tagline}</p>
            </div>
          </div>
          <StageProgress slug={slug} ids={ids} />
        </header>

        <div className="stage-intro lesson-body">{content.intro}</div>

        <Blocks content={content} />

        <aside className="rules" aria-labelledby="rules-h">
          <h2 id="rules-h" className="rules-h">
            القواعد في سطر
          </h2>
          <ol>
            {content.keyRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </aside>

        <StageComplete slug={slug} ids={ids} next={next} />

        <nav className="stage-nav" aria-label="التنقل بين المراحل">
          {prev ? (
            <Link href={`/path/${prev.slug}/`} className="stage-nav-link">
              <ArrowRight size={18} aria-hidden />
              <span>
                <small>المرحلة السابقة</small>
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && next.status === "ready" ? (
            <Link href={`/path/${next.slug}/`} className="stage-nav-link is-next">
              <span>
                <small>المرحلة التالية</small>
                {next.title}
              </span>
              <ArrowLeft size={18} aria-hidden />
            </Link>
          ) : next ? (
            <span className="stage-nav-link is-soon">
              <span>
                <small>المرحلة التالية — قريباً</small>
                {next.title}
              </span>
            </span>
          ) : null}
        </nav>
      </article>
    </StageContext.Provider>
  );
}
