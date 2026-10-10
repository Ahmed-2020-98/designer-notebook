"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { Download, Lock } from "lucide-react";
import { STAGES, TOTAL_STAGES } from "@/content/stages/meta";
import { setCertificateName, totalXp, useHydrated, useProgress } from "@/lib/progress/context";
import { levelFor } from "@/lib/game/levels";
import { renderCertificate } from "@/lib/certificate/render";
import { ar, arDate } from "@/lib/format";

export function CertificateStudio() {
  const progress = useProgress();
  const hydrated = useHydrated();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputId = useId();

  const stamped = Object.keys(progress.completedStages).length;
  const complete = stamped >= TOTAL_STAGES;
  const name = progress.certificateName ?? "";
  const xp = totalXp(progress);
  const level = levelFor(xp).current.title;
  const finishedAt = Math.max(0, ...Object.values(progress.completedStages));

  useEffect(() => {
    if (!hydrated || !canvasRef.current) return;
    renderCertificate(canvasRef.current, {
      name,
      xp,
      level,
      date: arDate(finishedAt || Date.now()),
      stamped,
      total: TOTAL_STAGES,
      preview: !complete,
    });
  }, [hydrated, name, xp, level, finishedAt, stamped, complete]);

  const download = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "designer-notebook-certificate.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const remaining = STAGES.filter((s) => !progress.completedStages[s.slug]);

  return (
    <div className="cert">
      <div className="cert-side">
        {hydrated && !complete && (
          <div className="cert-locked">
            <p className="cert-locked-h">
              <Lock size={18} aria-hidden /> الشهادة تُفتح بعد ختم المراحل الـ{ar(TOTAL_STAGES)}
            </p>
            <p>
              ختمت حتى الآن <strong>{ar(stamped)}</strong> من {ar(TOTAL_STAGES)}. هذه معاينة لما ستحصل عليه.
            </p>
            <details>
              <summary>المراحل المتبقية ({ar(remaining.length)})</summary>
              <ul>
                {remaining.map((s) => (
                  <li key={s.slug}>
                    {s.status === "ready" ? <Link href={`/path/${s.slug}/`}>{s.title}</Link> : <span>{s.title} — قريباً</span>}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}
        <label htmlFor={inputId} className="cert-label">
          اسمك كما تريده على الشهادة
        </label>
        <input
          id={inputId}
          className="cert-input"
          type="text"
          maxLength={40}
          autoComplete="name"
          placeholder="مثال: سارة عبد الله"
          value={name}
          onChange={(e) => setCertificateName(e.target.value)}
        />
        <button type="button" className="btn btn--red" onClick={download} disabled={!complete || !name.trim()}>
          <Download size={18} aria-hidden /> نزّل الشهادة (PNG)
        </button>
        {complete && !name.trim() && <p className="cert-help">اكتب اسمك أولاً لتفعيل التنزيل.</p>}
      </div>
      <div className="cert-preview">
        <canvas ref={canvasRef} role="img" aria-label={`معاينة شهادة إتمام المسار باسم ${name || "اسمك"}`} />
      </div>
    </div>
  );
}
