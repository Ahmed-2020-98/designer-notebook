const nf = new Intl.NumberFormat("ar-EG");

/** Arabic-Indic digits for display numerals. */
export const ar = (n: number) => nf.format(n);

export const arDate = (ts: number) =>
  new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long", year: "numeric" }).format(ts);
