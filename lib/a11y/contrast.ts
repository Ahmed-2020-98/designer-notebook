/** WCAG 2.x relative luminance & contrast ratio for #rrggbb colors. */
function channel(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** Grey of a given lightness (0–100) as #rrggbb. */
export function grey(lightness: number): string {
  const v = Math.round((Math.min(100, Math.max(0, lightness)) / 100) * 255);
  const h = v.toString(16).padStart(2, "0");
  return `#${h}${h}${h}`;
}
