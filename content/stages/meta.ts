export type Chapter = { n: 1 | 2 | 3 | 4; title: string; subtitle: string };

export type StageMeta = {
  slug: string;
  n: number;
  chapter: Chapter["n"];
  title: string;
  en: string;
  tagline: string;
  status: "ready" | "soon";
};

export const CHAPTERS: Chapter[] = [
  { n: 1, title: "الأساسيات", subtitle: "كيف تقرأ العين الشاشة" },
  { n: 2, title: "التنظيم", subtitle: "الفراغ والترتيب والتباين" },
  { n: 3, title: "الهوية البصرية", subtitle: "الانسجام والاتساق والعمق" },
  { n: 4, title: "التجربة", subtitle: "اللون والخط وجهد المستخدم" },
];

export const STAGES: StageMeta[] = [
  { slug: "visual-hierarchy", n: 1, chapter: 1, title: "التسلسل البصري", en: "Visual hierarchy", tagline: "ليست كل العناصر بنفس الأهمية — أخبر العين من أين تبدأ.", status: "ready" },
  { slug: "proximity", n: 2, chapter: 1, title: "التقارب", en: "Proximity", tagline: "ما يتجاور يُفهم كمجموعة واحدة.", status: "ready" },
  { slug: "clarity", n: 3, chapter: 1, title: "الوضوح", en: "Clarity", tagline: "الواجهة الواضحة لا تحتاج دليل استخدام.", status: "ready" },
  { slug: "alignment", n: 4, chapter: 1, title: "المحاذاة", en: "Alignment", tagline: "خطوط خفية تجعل الفوضى نظاماً.", status: "ready" },
  { slug: "contrast", n: 5, chapter: 2, title: "التباين", en: "Contrast", tagline: "ما لا يتميز عن خلفيته لا يُرى.", status: "ready" },
  { slug: "simplicity", n: 6, chapter: 2, title: "البساطة", en: "Simplicity", tagline: "كل عنصر إضافي يطالب بجزء من انتباه المستخدم.", status: "ready" },
  { slug: "whitespace", n: 7, chapter: 2, title: "المساحات البيضاء", en: "Whitespace", tagline: "الفراغ ليس هدراً، إنه تنفّس التصميم.", status: "ready" },
  { slug: "layout", n: 8, chapter: 2, title: "التخطيط", en: "Layout", tagline: "أين تضع العنصر يحدد متى يُقرأ.", status: "ready" },
  { slug: "balance", n: 9, chapter: 3, title: "التوازن والانسجام", en: "Balance & harmony", tagline: "لا عنصر يطغى على الباقين.", status: "ready" },
  { slug: "consistency", n: 10, chapter: 3, title: "الاتساق", en: "Consistency", tagline: "ما يتشابه في الوظيفة يتشابه في الشكل.", status: "ready" },
  { slug: "visual-cues", n: 11, chapter: 3, title: "الإشارات البصرية", en: "Visual cues", tagline: "صورة أو أيقونة تختصر سطراً كاملاً.", status: "ready" },
  { slug: "depth", n: 12, chapter: 3, title: "العمق والملمس", en: "Depth & texture", tagline: "ظلال وطبقات تخبر المستخدم ما يمكن لمسه.", status: "ready" },
  { slug: "color", n: 13, chapter: 4, title: "الألوان", en: "Color", tagline: "اللون الأساسي يُستخدم بحساب، لا بإسراف.", status: "ready" },
  { slug: "typography", n: 14, chapter: 4, title: "الطباعة", en: "Typography", tagline: "الخط هو صوت الواجهة.", status: "ready" },
  { slug: "interaction-cost", n: 15, chapter: 4, title: "تكلفة التفاعل", en: "Interaction cost", tagline: "كل نقرة وكل تفكير ثمن يدفعه المستخدم.", status: "ready" },
  { slug: "golden-tips", n: 16, chapter: 4, title: "نصائح ذهبية", en: "Bonus tips", tagline: "النماذج، الحذف، منطقة الإبهام، الحالات الفارغة وصفحات الخطأ.", status: "ready" },
];

export const TOTAL_STAGES = STAGES.length;

export const stageBySlug = (slug: string) => STAGES.find((s) => s.slug === slug);
