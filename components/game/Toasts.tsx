"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, Sparkles, TrendingUp } from "lucide-react";
import { onGameEvent, type GameEvent } from "@/lib/game/events";
import { ar } from "@/lib/format";

type Toast = { id: number; event: GameEvent };
let seq = 0;

export function Toasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(
    () =>
      onGameEvent((event) => {
        const id = ++seq;
        setToasts((t) => [...t.slice(-3), { id, event }]);
        const ttl = event.type === "xp" ? 2200 : 5200;
        window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
      }),
    [],
  );

  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map(({ id, event }) => (
        <div key={id} className={`toast toast--${event.type}`}>
          {event.type === "xp" && (
            <>
              <Sparkles size={16} aria-hidden /> <strong>+{ar(event.amount)} XP</strong>
            </>
          )}
          {event.type === "badge" && (
            <>
              <Award size={20} aria-hidden />
              <span>
                <strong>شارة جديدة: {event.badge.title}</strong>
                <small>{event.badge.description}</small>
              </span>
              <Link href="/badges/" className="toast-link">
                دفتر الشارات
              </Link>
            </>
          )}
          {event.type === "stage" && (
            <>
              <span className="toast-seal" aria-hidden>
                ✓
              </span>
              <span>
                <strong>خُتمت مرحلة «{event.title}»</strong>
                <small>أُضيف الختم إلى خريطتك.</small>
              </span>
            </>
          )}
          {event.type === "level" && (
            <>
              <TrendingUp size={20} aria-hidden />
              <span>
                <strong>ترقية! أصبحت «{event.title}»</strong>
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
