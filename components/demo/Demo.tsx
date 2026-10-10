import type { CSSProperties, ReactNode } from "react";

/**
 * Tiny illustration kit for the before/after examples.
 * Everything renders as non-interactive spans/divs: these are pictures of UIs.
 */

export function DemoCard({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`demo-card ${className}`} style={style}>
      {children}
    </div>
  );
}

export type BtnVariant = "primary" | "success" | "danger" | "soft" | "dark" | "text" | "danger-text" | "outline" | "loud";

export function Btn({ variant = "primary", children, full = false, small = false }: { variant?: BtnVariant; children: ReactNode; full?: boolean; small?: boolean }) {
  return <span className={`demo-btn demo-btn--${variant} ${full ? "is-full" : ""} ${small ? "is-small" : ""}`}>{children}</span>;
}

export type FruitKind = "avocado" | "lime" | "orange" | "berry" | "mango";

export function Fruit({ kind, size = 40 }: { kind: FruitKind; size?: number }) {
  return <span className={`fruit fruit--${kind}`} style={{ width: size, height: size }} aria-hidden />;
}

export function Price({ children }: { children: ReactNode }) {
  return (
    <bdi className="demo-price" dir="ltr">
      {children}
    </bdi>
  );
}

export function Toggle({ on }: { on: boolean }) {
  return <span className={`demo-toggle ${on ? "is-on" : ""}`} aria-hidden />;
}

export function Spark({ tone = "#7FE0B0" }: { tone?: string }) {
  return (
    <svg className="demo-spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden>
      <path d="M0,24 C8,20 12,8 20,12 S32,26 40,18 S52,4 60,10 S74,24 82,14 S94,6 100,8" fill="none" stroke={tone} strokeWidth="2.5" />
    </svg>
  );
}

export function House() {
  return (
    <svg className="demo-house" viewBox="0 0 200 110" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="200" height="110" fill="#BFD7EA" />
      <circle cx="160" cy="26" r="12" fill="#F7E7A6" />
      <rect y="84" width="200" height="26" fill="#9CC59A" />
      <polygon points="52,52 100,20 148,52" fill="#4A4E69" />
      <rect x="60" y="50" width="80" height="40" fill="#F2E9E4" />
      <rect x="92" y="64" width="16" height="26" fill="#9A8C98" />
      <rect x="68" y="58" width="16" height="12" fill="#C9ADA7" />
      <rect x="116" y="58" width="16" height="12" fill="#C9ADA7" />
    </svg>
  );
}

/** Label + input pair with explicit spacing, optionally showing spacing specs. */
export function FormDemo({
  labelGap,
  fieldGap,
  specs = false,
  markLabel,
}: {
  labelGap: number;
  fieldGap: number;
  specs?: boolean;
  markLabel?: (label: ReactNode) => ReactNode;
}) {
  const fields = ["الاسم الأول", "اسم العائلة", "البريد الإلكتروني"];
  return (
    <DemoCard className="demo-form">
      <span className="demo-h">بيانات التواصل</span>
      {fields.map((f, i) => {
        const label = <span className="demo-label">{f}</span>;
        return (
          <div key={f} className="demo-field" style={{ marginTop: i === 0 ? 12 : fieldGap }}>
            {specs && i > 0 && (
              <span className="spec spec--field" style={{ height: fieldGap, top: -fieldGap }}>
                <span dir="ltr">{fieldGap}</span>
              </span>
            )}
            {i === 1 && markLabel ? markLabel(label) : label}
            <span className="demo-input" style={{ marginTop: labelGap }}>
              {specs && (
                <span className="spec spec--label" style={{ height: labelGap, top: -labelGap }}>
                  <span dir="ltr">{labelGap}</span>
                </span>
              )}
            </span>
          </div>
        );
      })}
    </DemoCard>
  );
}
