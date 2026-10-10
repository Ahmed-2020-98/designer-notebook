import { ar } from "../format";

export const CERT_W = 1600;
export const CERT_H = 1130;

export type CertificateData = {
  name: string;
  xp: number;
  level: string;
  date: string;
  stamped: number;
  total: number;
  preview: boolean;
};

const C = {
  paper: "#FBF8F2",
  rule: "#E8E2D6",
  ink: "#16213E",
  ink2: "#4A5168",
  red: "#E0412F",
  green: "#1F7A55",
  yellow: "#FFD84D",
};

function fontVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Draws the certificate onto a canvas using the site's own (self-hosted) fonts. */
export async function renderCertificate(canvas: HTMLCanvasElement, d: CertificateData) {
  const display = fontVar("--font-display", "serif");
  const body = fontVar("--font-body", "sans-serif");
  const hand = fontVar("--font-hand", "serif");
  try {
    await Promise.all([
      document.fonts.load(`700 90px ${display}`, "شهادة"),
      document.fonts.load(`400 30px ${body}`, "دفتر"),
      document.fonts.load(`600 40px ${hand}`, "خاتم"),
    ]);
  } catch {
    // draw with fallbacks
  }

  canvas.width = CERT_W;
  canvas.height = CERT_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.direction = "rtl";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // paper + ruled lines + red margin
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, CERT_W, CERT_H);
  ctx.strokeStyle = C.rule;
  ctx.lineWidth = 1.5;
  for (let y = 150; y < CERT_H - 60; y += 52) {
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(CERT_W - 60, y);
    ctx.stroke();
  }
  ctx.strokeStyle = C.red;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CERT_W - 150, 0);
  ctx.lineTo(CERT_W - 150, CERT_H);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // double frame
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, CERT_W - 80, CERT_H - 80);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(56, 56, CERT_W - 112, CERT_H - 112);

  const cx = CERT_W / 2;

  ctx.fillStyle = C.ink2;
  ctx.font = `500 30px ${body}`;
  ctx.fillText("دفتر المصمم · مسار مبادئ UI/UX", cx, 160);

  ctx.fillStyle = C.ink;
  ctx.font = `800 92px ${display}`;
  ctx.fillText("شهادة إتمام المسار", cx, 290);

  ctx.fillStyle = C.ink2;
  ctx.font = `400 34px ${body}`;
  ctx.fillText("تشهد صفحات هذا الدفتر أن", cx, 390);

  // name with highlighter stroke
  const name = d.name.trim() || "اسمك هنا";
  ctx.font = `800 96px ${display}`;
  const nameW = Math.min(ctx.measureText(name).width, CERT_W - 360);
  ctx.fillStyle = C.yellow;
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.moveTo(cx - nameW / 2 - 30, 500);
  ctx.lineTo(cx + nameW / 2 + 30, 492);
  ctx.lineTo(cx + nameW / 2 + 26, 538);
  ctx.lineTo(cx - nameW / 2 - 26, 544);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = C.ink;
  ctx.fillText(name, cx, 520, CERT_W - 360);

  ctx.fillStyle = C.ink;
  ctx.font = `400 36px ${body}`;
  ctx.fillText(`أتمّ المراحل ${ar(d.total)} في مبادئ تصميم الواجهات وتجربة المستخدم،`, cx, 640);
  ctx.fillText(`وجمع ${ar(d.xp)} نقطة خبرة ليبلغ مستوى «${d.level}».`, cx, 700);

  // stage stamps row
  const gap = 66;
  const startX = cx + ((d.total - 1) * gap) / 2;
  for (let i = 0; i < d.total; i++) {
    const x = startX - i * gap;
    const done = i < d.stamped;
    ctx.beginPath();
    ctx.arc(x, 800, 24, 0, Math.PI * 2);
    ctx.strokeStyle = done ? C.green : C.rule;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = done ? C.green : C.ink2;
    ctx.font = `700 22px ${display}`;
    ctx.fillText(ar(i + 1), x, 808);
  }

  // date (start side = right in RTL)
  ctx.textAlign = "right";
  ctx.fillStyle = C.ink2;
  ctx.font = `400 28px ${body}`;
  ctx.fillText("حُررت بتاريخ", CERT_W - 200, 930);
  ctx.fillStyle = C.ink;
  ctx.font = `600 34px ${hand}`;
  ctx.fillText(d.date, CERT_W - 200, 985);

  // seal (end side)
  ctx.save();
  ctx.translate(290, 950);
  ctx.rotate(-0.18);
  ctx.strokeStyle = C.green;
  ctx.fillStyle = C.green;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 110, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 94, 0, Math.PI * 2);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.font = `700 46px ${display}`;
  ctx.fillText("خاتم", 0, -6);
  ctx.font = `700 46px ${display}`;
  ctx.fillText("الدفتر", 0, 46);
  ctx.restore();

  if (d.preview) {
    ctx.save();
    ctx.translate(cx, CERT_H / 2);
    ctx.rotate(-0.35);
    ctx.textAlign = "center";
    ctx.fillStyle = C.red;
    ctx.globalAlpha = 0.18;
    ctx.font = `700 220px ${display}`;
    ctx.fillText("معاينة", 0, 60);
    ctx.restore();
  }
}
