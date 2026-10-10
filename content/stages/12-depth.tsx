import { Megaphone, Code2, HeartHandshake, ChevronDown, Plus, Minus } from "lucide-react";
import type { StageContent } from "./types";
import { DemoCard, Btn } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

function Dropdown({ shadow }: { shadow: boolean }) {
  const items = [
    { icon: <Megaphone size={14} aria-hidden />, t: "التسويق", s: "آخر الأخبار والتحديثات" },
    { icon: <Code2 size={14} aria-hidden />, t: "الهندسة", s: "كيف نبني منتجاتنا" },
    { icon: <HeartHandshake size={14} aria-hidden />, t: "تجربة العملاء", s: "ابدأ مع الميزات الجديدة" },
  ];
  const menu = (
    <div className="demo-menu" style={{ boxShadow: shadow ? "0 18px 40px -12px rgba(40,30,90,.28), 0 2px 6px rgba(40,30,90,.08)" : "none" }}>
      {items.map((i) => (
        <span key={i.t} className="demo-menu-item">
          <span className="demo-menu-icon">{i.icon}</span>
          <span className="demo-col">
            <strong>{i.t}</strong>
            <span className="demo-muted">{i.s}</span>
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="demo-page">
      <div className="demo-topnav">
        <span>الموارد</span>
        <span className="demo-icon-line" style={{ fontWeight: 700 }}>
          الحلول <ChevronDown size={12} aria-hidden />
        </span>
        <span>الأسعار</span>
      </div>
      <div className="demo-page-lines" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>
      {shadow ? menu : <Mark note="القائمة ذائبة في الصفحة">{menu}</Mark>}
    </div>
  );
}

function ShadowCard({ css, bg = "#F1EEFB", tint = "" }: { css: string; bg?: string; tint?: string }) {
  return (
    <div className="demo-shadow-stage" style={{ background: bg }}>
      <DemoCard className="demo-narrow demo-center-text" style={{ boxShadow: css, maxWidth: 200 }}>
        <span className="demo-serum" aria-hidden style={tint ? { background: tint } : undefined} />
        <span className="demo-h">مكونات طبيعية فقط</span>
        <p className="demo-p demo-muted">كل مكوّن نختاره بعناية لأجل بشرتك.</p>
        <span className="demo-block" style={{ marginTop: 8 }}>
          <Btn variant="primary" small>
            اعرف المزيد
          </Btn>
        </span>
      </DemoCard>
    </div>
  );
}

function MapCard({ shadow }: { shadow: boolean }) {
  const sh = shadow ? "0 8px 20px -4px rgba(30,30,70,.45), 0 0 0 1px rgba(30,30,70,.06)" : "none";
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">المستخدمون النشطون</span>
      <span className="demo-muted">الأسبوع الماضي</span>
      <div className="demo-map">
        <span className="demo-map-label" style={{ boxShadow: sh }}>
          <bdi dir="ltr">128,200</bdi>
        </span>
        <span className="demo-map-zoom" style={{ boxShadow: sh }}>
          <Plus size={12} aria-hidden />
          <Minus size={12} aria-hidden />
        </span>
      </div>
    </DemoCard>
  );
}

function OrdersTable({ heavy }: { heavy: boolean }) {
  const rows = [
    ["#1234", "جود", "مدفوع", "$25"],
    ["#5672", "ريم", "قيد الانتظار", "$30"],
    ["#9087", "سامي", "قيد الانتظار", "$45"],
  ];
  const table = (
    <div className={`demo-orders ${heavy ? "is-heavy" : ""}`}>
      <div className="demo-orders-row demo-orders-head">
        <span>الطلب</span>
        <span>العميل</span>
        <span>الحالة</span>
        <span>المبلغ</span>
      </div>
      {rows.map((r) => (
        <div key={r[0]} className="demo-orders-row">
          {r.map((c, i) => (
            <span key={i} dir={i === 0 || i === 3 ? "ltr" : undefined}>
              {c}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <DemoCard className="demo-wide">
      <span className="demo-h">آخر الطلبات</span>
      {heavy ? <Mark note="الإطارات أعلى صوتاً من البيانات">{table}</Mark> : table}
    </DemoCard>
  );
}

function ShadowScene() {
  const items = [
    { id: "a", t: "تقرير المبيعات", css: "0 8px 24px -10px rgba(30,30,70,.25)" },
    { id: "b", t: "طلبات جديدة", css: "6px 6px 0 #000" },
    { id: "c", t: "رسائل العملاء", css: "0 8px 24px -10px rgba(30,30,70,.25)" },
  ];
  return (
    <div className="demo-shadow-stage demo-shadow-stage--list">
      {items.map((it) => (
        <Hotspot key={it.id} id={it.id} label={`بطاقة ${it.t}`}>
          <span className="demo-tile-card" style={{ boxShadow: it.css }}>
            <strong>{it.t}</strong>
            <span className="demo-muted">آخر تحديث قبل ساعة</span>
          </span>
        </Hotspot>
      ))}
    </div>
  );
}

const shadowCss = (y: number, blur: number, alpha: number) => `0 ${y}px ${blur}px rgba(91, 75, 219, ${(alpha / 100).toFixed(2)})`;

export const depth: StageContent = {
  slug: "depth",
  intro: (
    <p>
      الشاشة مسطحة، لكن العين تبحث عن العمق: ما الذي فوق ماذا؟ ما الذي يمكن لمسه؟ الظلال والطبقات والإطارات وألوان الخلفيات تجيب عن هذه الأسئلة
      بصمت. والسر في الاعتدال — عمق خفيف يرتب الواجهة، وعمق مبالغ فيه يجعلها ثقيلة وقديمة.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "shadows",
      heading: "الظل يقول: أنا فوق",
      body: (
        <p>
          القائمة المنسدلة بلا ظل تذوب في محتوى الصفحة خلفها، فلا يعرف المستخدم أين تنتهي. ظل ناعم واحد يرفعها فوق الصفحة ويفصلها، فتتركز العين على
          خياراتها. نفس المنطق ينطبق على النوافذ المنبثقة والتلميحات والعناصر العائمة فوق الخرائط والصور.
        </p>
      ),
      example: { bad: <Dropdown shadow={false} />, good: <Dropdown shadow /> },
    },
    {
      type: "lesson",
      id: "soft",
      heading: "ظلال ناعمة بلون الخلفية",
      body: (
        <>
          <p>
            الظل القاسي — قريب وداكن وحاد — يبدو كملصق قديم. الظل الجيد بعيد قليلاً، واسع الانتشار، خفيف الشفافية. وهذه نصيحة يجهلها كثيرون: لا تستخدم
            ظلاً رمادياً على خلفية ملونة؛ <strong>لوّن الظل بدرجة من لون الخلفية</strong> فيبدو طبيعياً كأنه ظل حقيقي.
          </p>
        </>
      ),
      example: {
        bad: <ShadowCard css="0 4px 6px rgba(0,0,0,.55)" />,
        good: <ShadowCard css="0 18px 44px -14px rgba(91,75,219,.38)" />,
        caption: "ظل أسود قريب وحاد، مقابل ظل بنفسجي ناعم يناسب الخلفية.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "map-shadow",
        prompt: "عناصر عائمة فوق خريطة متغيرة. أي نسخة تجعلها أوضح؟",
        options: { a: <MapCard shadow={false} />, b: <MapCard shadow /> },
        correct: "b",
        hint: "الخريطة مليئة بالألوان والأشكال. ما الذي يفصل الرقم وأزرار التكبير عنها؟",
        explain: "الظل الخفيف في (ب) يرفع الرقم وأزرار التكبير فوق الخريطة، فلا تضيع وسط تفاصيلها مهما تغيرت.",
      },
    },
    {
      type: "lesson",
      id: "borders",
      heading: "الإطارات رفيعة وفاتحة — أو لا تكون",
      body: (
        <p>
          الإطارات وألوان الخلفيات تصنع عمقاً هادئاً: بطاقات بيضاء على خلفية رمادية فاتحة، أو خط رفيع يفصل الصفوف. لكن الإطارات السميكة الداكنة حول كل
          شيء تجعل الواجهة مزدحمة وقديمة، وتصرخ أعلى من البيانات نفسها. القاعدة: أقل ما يكفي للفصل، وغالباً الفراغ وحده يكفي.
        </p>
      ),
      example: { bad: <OrdersTable heavy />, good: <OrdersTable heavy={false} /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "shadow-scene",
        prompt: "بطاقة واحدة تستخدم ظلاً من عالم آخر. انقر عليها.",
        scene: <ShadowScene />,
        target: "b",
        misses: {
          a: "ظل هذه البطاقة ناعم ومتسق مع جارتها.",
          c: "ظل ناعم مثل الأولى — متسق.",
        },
        explain: "بطاقة «طلبات جديدة» بظل أسود صلب وحاد، بينما البقية بظلال ناعمة. الخلط بين أسلوبين للعمق يكسر الاتساق، والظل الصلب يجعلها تبدو كخطأ لا كتمييز.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-shadow",
        prompt: "هذا الظل قاسٍ. اضبطه ليصبح ناعماً: انتشار واسع، شفافية خفيفة، وإزاحة معتدلة للأسفل.",
        controls: [
          { type: "range", key: "y", label: "الإزاحة للأسفل (Y)", min: 0, max: 40, step: 2, unit: "px", initial: 4 },
          { type: "range", key: "blur", label: "الانتشار (Blur)", min: 0, max: 64, step: 2, unit: "px", initial: 4 },
          { type: "range", key: "alpha", label: "الشفافية", min: 5, max: 90, step: 5, unit: "%", initial: 80 },
        ],
        render: (v) => <ShadowCard css={shadowCss(Number(v.y), Number(v.blur), Number(v.alpha))} />,
        meter: (v) => {
          const ok = Number(v.blur) >= 24 && Number(v.alpha) <= 35 && Number(v.y) >= 6 && Number(v.y) <= 24;
          return { label: "box-shadow", value: `0 ${v.y}px ${v.blur}px · ${v.alpha}%`, ok };
        },
        validate: (v) => {
          const y = Number(v.y);
          const blur = Number(v.blur);
          const a = Number(v.alpha);
          if (blur < 24) return { ok: false, hint: "حافة الظل حادة. زد الانتشار إلى ٢٤ بكسل أو أكثر." };
          if (a > 35) return { ok: false, hint: "الظل داكن جداً ويبدو كبقعة. خفّف الشفافية إلى ٣٥٪ أو أقل." };
          if (y < 6) return { ok: false, hint: "بلا إزاحة يبدو الظل كهالة حول البطاقة. أزحه للأسفل قليلاً كأن الضوء من الأعلى." };
          if (y > 24) return { ok: false, hint: "البطاقة تبدو طائرة بعيداً عن سطحها. قلّل الإزاحة." };
          return { ok: true };
        },
        explain: "ظل ناعم بلون الخلفية: يرفع البطاقة بهدوء دون أن يلفت الانتباه لنفسه.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما لون الظل الأنسب لبطاقة على خلفية بنفسجية فاتحة؟",
          options: ["أسود", "رمادي محايد", "درجة بنفسجية شفافة", "أبيض"],
          correct: 2,
          explain: "الظل الملون بلون الخلفية يبدو طبيعياً ومنسجماً.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "أي العناصر يستفيد أكثر من الظل؟",
          options: ["فقرات النص", "القوائم المنسدلة والنوافذ العائمة", "العناوين", "خلفية الصفحة"],
          correct: 1,
          explain: "العناصر التي تطفو فوق المحتوى تحتاج ما يفصلها عنه.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "ما المشكلة في الإطارات السميكة الداكنة حول كل قسم؟",
          options: ["تبطئ الموقع", "تزحم الواجهة وتنافس المحتوى على الانتباه", "لا تظهر على الشاشات الصغيرة", "لا مشكلة"],
          correct: 1,
          explain: "الفصل يحتاج أقل قدر ممكن: خط رفيع فاتح، أو لون خلفية، أو فراغ.",
        },
      ],
    },
  ],
  keyRules: [
    "الظل يقول «أنا فوق» — استخدمه للعناصر العائمة.",
    "ظلال ناعمة: انتشار واسع وشفافية خفيفة.",
    "لوّن الظل بدرجة من لون الخلفية.",
    "الإطارات رفيعة وفاتحة، والفراغ غالباً يكفي.",
    "أسلوب عمق واحد في كل الواجهة.",
  ],
};
