import { LayoutDashboard, BarChart3, Ticket, Users, Package, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import type { StageContent } from "./types";
import { DemoCard, Btn } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const NAV: { group: string; items: { icon: ReactNode; label: string }[] }[] = [
  { group: "التحليلات", items: [{ icon: <LayoutDashboard size={14} aria-hidden />, label: "لوحة التحكم" }, { icon: <BarChart3 size={14} aria-hidden />, label: "الأداء" }] },
  { group: "الدعم", items: [{ icon: <Ticket size={14} aria-hidden />, label: "التذاكر" }, { icon: <Users size={14} aria-hidden />, label: "العملاء" }] },
  { group: "المتجر", items: [{ icon: <Package size={14} aria-hidden />, label: "المنتجات" }, { icon: <ShoppingBag size={14} aria-hidden />, label: "الطلبات" }] },
];

function Sidebar({ airy }: { airy: boolean }) {
  const groups = (
    <div style={{ display: "grid", gap: airy ? 18 : 2 }}>
      {NAV.map((g) => (
        <div key={g.group}>
          <span className="demo-group-h" style={{ marginTop: 0, marginBottom: airy ? 6 : 0 }}>
            {g.group}
          </span>
          <div style={{ display: "grid", gap: airy ? 4 : 0 }}>
            {g.items.map((it, i) => (
              <span
                key={it.label}
                className={`demo-nav-item demo-nav-item--light ${g.group === "التحليلات" && i === 0 ? "is-active" : ""}`}
                style={{ paddingBlock: airy ? 7 : 2 }}
              >
                {it.icon}
                {it.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <DemoCard className="demo-sidebar" style={{ padding: airy ? 18 : 8 }}>
      <span className="demo-h" style={{ marginBottom: airy ? 18 : 4, display: "block" }}>
        مهامي
      </span>
      {airy ? groups : <Mark note="لا مكان للعين لتستريح">{groups}</Mark>}
    </DemoCard>
  );
}

function StatCard({ padding, gap }: { padding: number; gap: number }) {
  return (
    <DemoCard className="demo-narrow" style={{ padding }}>
      <span className="demo-muted">نمو العملاء</span>
      <span className="demo-stat-big" dir="ltr" style={{ marginTop: gap }}>
        12,480
      </span>
      <svg className="demo-spark demo-spark--purple" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden style={{ marginTop: gap, height: 40 }}>
        <path d="M0,26 C10,22 18,10 28,14 S44,28 54,18 S70,4 80,9 S94,14 100,6" fill="none" stroke="#5B4BDB" strokeWidth="2.5" />
      </svg>
      <div style={{ marginTop: gap }}>
        <Btn variant="primary" full small>
          عرض التقرير
        </Btn>
      </div>
    </DemoCard>
  );
}

function SpacedForm({ gaps, specs }: { gaps: number[]; specs: boolean }) {
  const fields = ["الاسم", "البريد الإلكتروني", "رسالتك"];
  return (
    <DemoCard className="demo-form">
      <span className="demo-h">تواصل معنا</span>
      {fields.map((f, i) => (
        <div key={f} className="demo-field" style={{ marginTop: gaps[i] }}>
          {specs && (
            <span className="spec spec--field" style={{ height: gaps[i], top: -gaps[i] }}>
              <span dir="ltr">{gaps[i]}</span>
            </span>
          )}
          <span className="demo-label">{f}</span>
          <span className="demo-input" style={{ marginTop: 6, height: i === 2 ? 56 : undefined }} />
        </div>
      ))}
      <div style={{ marginTop: gaps[3], position: "relative" }}>
        {specs && (
          <span className="spec spec--field" style={{ height: gaps[3], top: -gaps[3] }}>
            <span dir="ltr">{gaps[3]}</span>
          </span>
        )}
        <Btn variant="primary" full>
          إرسال
        </Btn>
      </div>
    </DemoCard>
  );
}

function ArticleCard() {
  return (
    <DemoCard className="demo-narrow" style={{ padding: 16 }}>
      <Hotspot id="tag" label="وسم التصنيف">
        <span className="demo-chip">تصميم</span>
      </Hotspot>
      <Hotspot id="title" label="عنوان المقال">
        <span className="demo-h" style={{ marginTop: 10, display: "block" }}>
          كيف تبني نظام مسافات لفريقك
        </span>
      </Hotspot>
      <Hotspot id="body" label="ملخص المقال">
        <p className="demo-p demo-muted">نظام بسيط بمضاعفات الرقم ٤ ينهي الجدل حول «كم بكسل؟» ويجعل كل الشاشات متناغمة.</p>
      </Hotspot>
      <Hotspot id="cta" label="زر القراءة">
        <span style={{ display: "block", marginTop: 0 }}>
          <Btn variant="dark" full small>
            اقرأ المقال
          </Btn>
        </span>
      </Hotspot>
    </DemoCard>
  );
}

const onGrid = (n: number) => n % 4 === 0;

export const whitespace: StageContent = {
  slug: "whitespace",
  intro: (
    <p>
      المساحة البيضاء — أو السلبية — هي كل ما ليس نصاً ولا صورة ولا زراً. قد تكون بيضاء أو ملونة أو حتى صورة خلفية؛ المهم أنها خالية. هي ما يفصل
      الأفكار عن بعضها، ويوجه العين، ويجعل الواجهة تتنفس. وكثيراً ما يكون الفرق بين واجهة «رخيصة» وأخرى «فاخرة» مجرد فراغ مدروس.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "breathe",
      heading: "دع الواجهة تتنفس",
      body: (
        <p>
          القائمتان التاليتان بنفس الخط والألوان والعناصر بالضبط. الفرق الوحيد هو الفراغ: في الأولى تتلاصق العناصر فيصعب أن تجد ما تبحث عنه، وفي الثانية
          تفصل المسافات المجموعات ويصبح لكل عنصر مساحة يُقرأ فيها.
        </p>
      ),
      example: { bad: <Sidebar airy={false} />, good: <Sidebar airy />, caption: "لم يتغير شيء سوى المسافات." },
    },
    {
      type: "lesson",
      id: "start-big",
      heading: "ابدأ بمساحة أكثر مما تظن",
      body: (
        <p>
          أسلوب عملي: ابدأ بمسافات سخية، ثم قلّصها تدريجياً حتى تصل للتوازن. حين تبدأ بفراغ كثير ترى بوضوح متى صار زائداً. أما حين تبدأ ضيقاً، فقد لا
          تلاحظ الازدحام أصلاً — لأن عينك اعتادته أثناء العمل.
        </p>
      ),
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "stat-cards",
        prompt: "بطاقتان بنفس المحتوى. أيّهما أسهل في القراءة وأكثر احترافية؟",
        options: { a: <StatCard padding={20} gap={14} />, b: <StatCard padding={6} gap={2} /> },
        correct: "a",
        hint: "انظر إلى الحواف: هل يلتصق المحتوى بإطار البطاقة؟",
        explain: "في (أ) هوامش داخلية كافية ومسافات بين العناصر، فيُقرأ كل جزء وحده. في (ب) يلتصق كل شيء بالإطار وببعضه.",
      },
    },
    {
      type: "lesson",
      id: "system",
      heading: "نظام مسافات بدل أرقام عشوائية",
      body: (
        <>
          <p>
            اختر وحدة أساسية — الأشهر هي <strong>٤ بكسل</strong> — واستخدم مضاعفاتها فقط: ٤، ٨، ١٢، ١٦، ٢٤، ٣٢... قرار بسيط ينهي سؤال «كم مسافة هنا؟»
            ويجعل كل الشاشات متناغمة دون جهد.
          </p>
          <p>تجنب الأرقام الغريبة مثل ٧ أو ١٣ أو ١٩. إنها تكسر الإيقاع، ويصعب تذكرها وتكرارها، وتنتهي بواجهة لا تبدو متماسكة دون سبب واضح.</p>
        </>
      ),
      example: {
        bad: <SpacedForm gaps={[7, 19, 13, 21]} specs />,
        good: <SpacedForm gaps={[16, 16, 16, 24]} specs />,
        caption: "الأرقام بالبكسل: عشوائية مقابل نظام بمضاعفات ٤.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "article-card",
        prompt: "في هذه البطاقة عنصر يختنق لأنه بلا أي مسافة. انقر عليه.",
        scene: <ArticleCard />,
        target: "cta",
        misses: {
          tag: "الوسم له مسافة كافية عن العنوان.",
          title: "العنوان منفصل عن الوسم بمسافة مريحة.",
          body: "الملخص في مكانه — لكن انظر إلى ما يلتصق به من الأسفل.",
        },
        explain: "زر «اقرأ المقال» ملتصق بالنص فوقه بلا أي مسافة، فيبدو جزءاً من الفقرة. مسافة ١٦ بكسل تفصله وتمنحه حضوره كإجراء.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-stat-spacing",
        prompt: "امنح البطاقة مساحة تتنفس فيها، والتزم بنظام الـ٤: هامش داخلي ١٦ بكسل على الأقل، ومسافة بين العناصر ٨ على الأقل.",
        controls: [
          { type: "range", key: "padding", label: "الهامش الداخلي", min: 0, max: 40, step: 1, unit: "px", initial: 5 },
          { type: "range", key: "gap", label: "المسافة بين العناصر", min: 0, max: 32, step: 1, unit: "px", initial: 3 },
        ],
        render: (v) => <StatCard padding={Number(v.padding)} gap={Number(v.gap)} />,
        meter: (v) => {
          const ok = onGrid(Number(v.padding)) && onGrid(Number(v.gap));
          return { label: "على نظام الـ٤؟", value: ok ? "✓" : "✗", ok: ok && Number(v.padding) >= 16 && Number(v.gap) >= 8 };
        },
        validate: (v) => {
          const p = Number(v.padding);
          const g = Number(v.gap);
          if (p < 16) return { ok: false, hint: "المحتوى ما زال قريباً جداً من حافة البطاقة. اجعل الهامش ١٦ أو أكثر." };
          if (g < 8) return { ok: false, hint: "العناصر متلاصقة. افصلها بمسافة ٨ بكسل على الأقل." };
          if (!onGrid(p) || !onGrid(g)) return { ok: false, hint: `المسافة قريبة من الصحيح، لكن ${!onGrid(p) ? p : g} ليس من مضاعفات ٤. جرّب أقرب رقم مثل ${Math.round((!onGrid(p) ? p : g) / 4) * 4}.` };
          if (p > 32) return { ok: false, hint: "الآن صار الفراغ أكبر من المحتوى. قلّصه قليلاً حتى يتوازن." };
          return { ok: true };
        },
        explain: "هامش سخي ومسافات من نظام واحد. البطاقة تبدو أهدأ وأغلى، دون أن يتغير محتواها.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "أي مجموعة مسافات تتبع نظام الـ٤؟",
          options: ["٥، ١٠، ١٥", "٤، ٨، ١٦، ٢٤", "٧، ١٣، ١٩", "٣، ٩، ٢١"],
          correct: 1,
          explain: "كلها مضاعفات للرقم ٤، فتتناغم مع بعضها ومع أغلب الشبكات.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "لماذا يُنصح بالبدء بمساحات واسعة ثم تقليصها؟",
          options: ["لأن الفراغ مجاني", "لأن رؤية الفراغ الزائد أسهل من ملاحظة الازدحام", "لأن الشاشات كبيرة اليوم", "لأن المطورين يفضلونها"],
          correct: 1,
          explain: "العين تعتاد الازدحام أثناء العمل، لكنها تلاحظ الفراغ الزائد بسهولة.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "المساحة البيضاء يجب أن تكون:",
          options: ["بيضاء اللون حرفياً", "خالية من العناصر — بأي لون أو خلفية", "أقل ما يمكن لتوفير المكان", "في أطراف الصفحة فقط"],
          correct: 1,
          explain: "قد تكون ملونة أو صورة خلفية؛ ما يجعلها «بيضاء» هو خلوها من المحتوى.",
        },
      ],
    },
  ],
  keyRules: [
    "الفراغ أداة تصميم، لا مساحة ضائعة.",
    "ابدأ بمسافات سخية ثم قلّص حتى التوازن.",
    "استخدم نظاماً واحداً: مضاعفات ٤ بكسل.",
    "لا أرقام عشوائية مثل ٧ أو ١٣ أو ١٩.",
    "لا شيء يلتصق بحافة بطاقته أو بالعنصر المجاور.",
  ],
};
