import { Sprout, LayoutGrid, Palette, PenTool, Image as ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { StageContent, FixValues } from "./types";
import { DemoCard, Btn, Price } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

function PlantCard({ good, titleOffset = 0, button = "start" }: { good: boolean; titleOffset?: number; button?: string }) {
  const off = good ? 0 : titleOffset;
  const btnAlign = good ? "start" : button;
  const content = (
    <>
      <div className="demo-row demo-row--flush" style={{ paddingInlineStart: off, justifyContent: "flex-start" }}>
        <span className="demo-badge-icon">
          <Sprout size={16} aria-hidden />
        </span>
        <span className="demo-h">نباتات الصبّار</span>
      </div>
      <p className="demo-p demo-muted">نباتات قليلة العناية تتحمّل الجفاف، وتعيش داخل المنزل بسهولة إذا وجدت ضوءاً كافياً.</p>
      <div className="demo-align-btn" style={{ justifyContent: btnAlign === "start" ? "flex-start" : btnAlign === "center" ? "center" : "flex-end" }}>
        <Btn variant="primary" small>
          اعرف أكثر
        </Btn>
      </div>
    </>
  );
  return <DemoCard className="demo-narrow">{content}</DemoCard>;
}

function BadPlant() {
  return (
    <DemoCard className="demo-narrow">
      <Mark note="ثلاث حواف مختلفة!">
        <div>
          <div className="demo-row demo-row--flush" style={{ paddingInlineStart: 30, justifyContent: "flex-start" }}>
            <span className="demo-badge-icon">
              <Sprout size={16} aria-hidden />
            </span>
            <span className="demo-h">نباتات الصبّار</span>
          </div>
          <p className="demo-p demo-muted" style={{ paddingInlineStart: 14 }}>
            نباتات قليلة العناية تتحمّل الجفاف، وتعيش داخل المنزل بسهولة إذا وجدت ضوءاً كافياً.
          </p>
          <div className="demo-align-btn" style={{ justifyContent: "center" }}>
            <Btn variant="primary" small>
              اعرف أكثر
            </Btn>
          </div>
        </div>
      </Mark>
    </DemoCard>
  );
}

const RESOURCES: { icon: ReactNode; label: string; shift: number }[] = [
  { icon: <LayoutGrid size={15} aria-hidden />, label: "كل الموارد", shift: 0 },
  { icon: <ImageIcon size={15} aria-hidden />, label: "رسوم توضيحية", shift: 18 },
  { icon: <Palette size={15} aria-hidden />, label: "موارد الواجهات", shift: 8 },
  { icon: <PenTool size={15} aria-hidden />, label: "أيقونات", shift: 28 },
];

function Resources({ aligned }: { aligned: boolean }) {
  return (
    <DemoCard className="demo-narrow demo-dark">
      <span className="demo-group-h">الموارد</span>
      <div className="demo-tight">
        {RESOURCES.map((r, i) => (
          <span key={r.label} className={`demo-nav-item ${i === 0 ? "is-active" : ""}`} style={{ paddingInlineStart: 10 + (aligned ? 0 : r.shift) }}>
            {r.icon}
            <span style={{ marginInlineStart: aligned ? 0 : r.shift / 2 }}>{r.label}</span>
          </span>
        ))}
      </div>
    </DemoCard>
  );
}

const PRICES: [string, string][] = [
  ["الخطة الأساسية", "$9.00"],
  ["الخطة المتقدمة", "$129.00"],
  ["خطة الفِرق", "$1,249.00"],
  ["إضافة تخزين", "$4.50"],
];

function PriceTable({ good }: { good: boolean }) {
  const table = (
    <div className="demo-table">
      {PRICES.map(([k, v]) => (
        <div key={k} className="demo-table-row">
          <span>{k}</span>
          <span className="demo-table-num" style={{ textAlign: good ? "left" : "center" }}>
            <Price>{v}</Price>
          </span>
        </div>
      ))}
    </div>
  );
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">الفاتورة الشهرية</span>
      {good ? table : <Mark note="الأرقام تتراقص — صعب مقارنتها">{table}</Mark>}
    </DemoCard>
  );
}

function SettingsRows() {
  const rows = [
    { id: "row1", label: "الصف الأول: الحساب", title: "الحساب", sub: "الاسم، البريد، كلمة المرور", shift: 0 },
    { id: "row2", label: "الصف الثاني: الإشعارات", title: "الإشعارات", sub: "ما يصلك ومتى", shift: 20 },
    { id: "row3", label: "الصف الثالث: الخصوصية", title: "الخصوصية", sub: "من يرى نشاطك", shift: 0 },
  ];
  return (
    <DemoCard className="demo-narrow">
      <Hotspot id="title" label="عنوان القائمة">
        <span className="demo-h">الإعدادات</span>
      </Hotspot>
      <div className="demo-list">
        {rows.map((r) => (
          <Hotspot key={r.id} id={r.id} label={r.label}>
            <span className="demo-list-row" style={{ paddingInlineStart: r.shift }}>
              <strong>{r.title}</strong>
              <span className="demo-muted">{r.sub}</span>
            </span>
          </Hotspot>
        ))}
      </div>
    </DemoCard>
  );
}

const edges = (v: FixValues) => new Set([Number(v.titleOffset), 0, v.button === "start" ? 0 : String(v.button)]).size;

export const alignment: StageContent = {
  slug: "alignment",
  intro: (
    <p>
      حين تنظر إلى واجهة مرتبة، أنت لا ترى الخطوط التي تنتظم عليها العناصر — لكنك تشعر بها. المحاذاة هي أن تصطف النصوص والصور والأزرار على حواف
      مشتركة، فتبدو الواجهة متماسكة ومصممة بعناية. وحين تختل، يبدو كل شيء «تقريباً صحيحاً»، وهذا أسوأ من الخطأ الواضح.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "edges",
      heading: "حافة واحدة بدل ثلاث",
      body: (
        <>
          <p>
            في البطاقة الأولى يبدأ العنوان من نقطة، والفقرة من نقطة أخرى، والزر في المنتصف. كل اختلاف صغير وحده، لكن العين تلتقطها كلها معاً فتشعر
            بالفوضى دون أن تعرف السبب.
          </p>
          <p>
            القاعدة: اختر حافة البداية — وهي <strong>اليمين</strong> في الواجهات العربية — واجعل كل عناصر البطاقة تبدأ منها. التوسيط استثناء له مكانه، لا
            حلاً افتراضياً.
          </p>
        </>
      ),
      example: { bad: <BadPlant />, good: <PlantCard good />, caption: "نفس المحتوى، لكن في النسخة الصحيحة يبدأ كل شيء من خط واحد." },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "resources-list",
        prompt: "قائمتان للتنقل بنفس العناصر. أيّهما تبدو مرتبة ومصممة بعناية؟",
        options: { a: <Resources aligned />, b: <Resources aligned={false} /> },
        correct: "a",
        hint: "تتبّع بعينك بداية كل أيقونة وكل تسمية من الأعلى إلى الأسفل. هل يتشكل خط مستقيم؟",
        explain: "في (أ) تصطف الأيقونات على خط واحد، والتسميات على خط ثانٍ. في (ب) يتغير الموضع من صف لآخر بفروق صغيرة، فتبدو القائمة مهتزة.",
      },
    },
    {
      type: "lesson",
      id: "which",
      heading: "لكل محتوى محاذاته",
      body: (
        <>
          <p>
            <strong>محاذاة البداية</strong> (اليمين بالعربية) للفقرات والقوائم: كل سطر يبدأ من نفس النقطة فلا تبحث العين عن السطر التالي.
            <strong> التوسيط</strong> للعناوين القصيرة والرسائل المنفردة فقط؛ في الفقرات الطويلة يجعل القراءة مرهقة لأن بداية كل سطر تتغير.
          </p>
          <p>
            أما <strong>الأرقام</strong> في الجداول فتُحاذى بحيث تتطابق خاناتها — الآحاد تحت الآحاد — حتى يقارنها المستخدم بنظرة. توسيط الأرقام
            يجعلها تتراقص.
          </p>
        </>
      ),
      example: { bad: <PriceTable good={false} />, good: <PriceTable good />, caption: "محاذاة الأرقام إلى جهة واحدة تجعل المقارنة فورية." },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "settings-rows",
        prompt: "في قائمة الإعدادات هذه صف خرج عن الصف. انقر عليه.",
        scene: <SettingsRows />,
        target: "row2",
        misses: {
          title: "العنوان يبدأ من نفس حافة القائمة. ابحث في الصفوف.",
          row1: "هذا الصف يبدأ من الحافة الصحيحة. قارنه بجاره.",
          row3: "هذا الصف مصطف مع الأول. أحدهما بينهما مختلف.",
        },
        explain: "صف «الإشعارات» مُزاح قليلاً إلى الداخل. فرق ٢٠ بكسل فقط يكفي لكسر الخط الذي تتبعه العين ويجعل القائمة تبدو غير متقنة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-plant-card",
        prompt: "أعد عناصر البطاقة إلى حافة واحدة: أزل إزاحة العنوان، وضع الزر حيث يبدأ النص.",
        controls: [
          { type: "range", key: "titleOffset", label: "إزاحة العنوان عن الحافة", min: 0, max: 24, step: 2, unit: "px", initial: 18 },
          {
            type: "select",
            key: "button",
            label: "محاذاة الزر",
            options: [
              { value: "start", label: "البداية (يمين)" },
              { value: "center", label: "المنتصف" },
              { value: "end", label: "النهاية (يسار)" },
            ],
            initial: "center",
          },
        ],
        render: (v) => <PlantCard good={false} titleOffset={Number(v.titleOffset)} button={String(v.button)} />,
        meter: (v) => ({ label: "عدد حواف المحاذاة", value: String(edges(v)), ok: edges(v) === 1 }),
        validate: (v) => {
          if (Number(v.titleOffset) !== 0) return { ok: false, hint: "العنوان ما زال مُزاحاً عن حافة الفقرة. أرجعه إلى صفر." };
          if (v.button !== "start") return { ok: false, hint: "الزر وحده خارج الخط. ضعه في البداية، حيث يبدأ العنوان والفقرة." };
          return { ok: true };
        },
        explain: "حافة واحدة يبدأ منها كل شيء. البطاقة الآن تُقرأ كوحدة واحدة متماسكة.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما المحاذاة الافتراضية الأنسب لفقرة عربية طويلة؟",
          options: ["التوسيط", "محاذاة البداية (اليمين)", "محاذاة النهاية (اليسار)", "الضبط من الجهتين دائماً"],
          correct: 1,
          explain: "اليمين هو بداية القراءة بالعربية، فثبات بداية كل سطر يريح العين.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "لماذا لا نوسّط الأرقام في عمود جدول؟",
          options: ["لأن التوسيط قبيح دائماً", "لأن الخانات لا تتطابق فتصعب المقارنة", "لأن الأرقام لا تُقرأ وسط الجدول", "لا مانع من توسيطها"],
          correct: 1,
          explain: "حين تتطابق الآحاد تحت الآحاد يقارن المستخدم القيم بنظرة واحدة.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "أي أداة تساعدك على الحفاظ على المحاذاة عبر الشاشات كلها؟",
          options: ["شبكة تخطيط (Grid) ثابتة", "تكبير الخطوط", "زيادة الألوان", "الصور الكبيرة"],
          correct: 0,
          explain: "الشبكة تعطيك خطوطاً ثابتة تصطف عليها العناصر في كل شاشة، و«Auto layout» في أدوات التصميم يحافظ عليها تلقائياً.",
        },
      ],
    },
  ],
  keyRules: [
    "اختر حافة واحدة وابدأ منها كل عناصر المجموعة.",
    "البداية (اليمين) للنصوص، والتوسيط للعناوين القصيرة فقط.",
    "الأرقام في الجداول تُحاذى لتتطابق خاناتها.",
    "الفروق الصغيرة في المحاذاة أسوأ من الكبيرة — العين تلتقطها كخطأ.",
    "استخدم الشبكة وAuto layout بدل الضبط باليد.",
  ],
};
