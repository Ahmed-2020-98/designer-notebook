import { ChevronDown, Minus, Plus, Clock, X as XIcon, Mail } from "lucide-react";
import type { StageContent, FixValues } from "./types";
import { DemoCard, Btn, Price } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const SWATCHES = ["#8BC34A", "#C9A227", "#E07A5F"];

function Chair() {
  return (
    <span className="demo-chair" aria-hidden>
      <span className="demo-chair-back" />
      <span className="demo-chair-seat" />
      <span className="demo-chair-leg is-a" />
      <span className="demo-chair-leg is-b" />
    </span>
  );
}

function ChairPage({ swatches, stepper, near, buyNow = false, popup = false, mark = false }: { swatches: boolean; stepper: boolean; near: boolean; buyNow?: boolean; popup?: boolean; mark?: boolean }) {
  const clicks = (swatches ? 1 : 3) + (stepper ? 1 : 3) + (near ? 1 : 2) + (popup ? 1 : 0);
  const controls = (
    <div className="demo-col" style={{ gap: 8, width: "100%" }}>
      <span className="demo-label">اللون</span>
      {swatches ? (
        <span className="demo-swatches">
          {SWATCHES.map((c, i) => (
            <span key={c} className="swatch" style={{ background: c, boxShadow: i === 0 ? "0 0 0 2px #fff, 0 0 0 4px #1a1a1a" : undefined }} />
          ))}
        </span>
      ) : (
        <span className="demo-select">
          أخضر <ChevronDown size={12} aria-hidden />
        </span>
      )}
      <span className="demo-label">الكمية</span>
      <span className="demo-row demo-row--flush" style={{ justifyContent: near ? "flex-start" : "space-between", gap: 10 }}>
        {stepper ? (
          <span className="demo-qty demo-qty--lg">
            <Minus size={12} aria-hidden /> 1 <Plus size={12} aria-hidden />
          </span>
        ) : (
          <span className="demo-select">
            1 <ChevronDown size={12} aria-hidden />
          </span>
        )}
        {near && (
          <Btn variant="primary" small>
            أضف إلى السلة
          </Btn>
        )}
      </span>
    </div>
  );
  return (
    <DemoCard className="demo-narrow" style={{ position: "relative", overflow: "hidden" }}>
      <span className="demo-center">
        <Chair />
      </span>
      <span className="demo-h">كرسي إرغو المريح</span>
      <Price>$199</Price>
      <div style={{ marginTop: 10 }}>{mark ? <Mark note="قائمتان منسدلتان = نقرات وتمرير">{controls}</Mark> : controls}</div>
      {!near && (
        <span className="demo-block" style={{ marginTop: 24 }}>
          <Btn variant="primary" full>
            أضف إلى السلة
          </Btn>
        </span>
      )}
      {buyNow && (
        <span className="demo-block" style={{ marginTop: 8 }}>
          <Btn variant="dark" full>
            اشترِ الآن
          </Btn>
        </span>
      )}
      {popup && (
        <span className="demo-popup">
          <XIcon size={12} aria-hidden className="demo-popup-x" />
          <Mail size={16} aria-hidden />
          <strong>اشترك في نشرتنا!</strong>
          <span className="demo-muted">خصم ١٠٪ على طلبك الأول</span>
        </span>
      )}
      <span className="demo-clicks">
        نقرات للإضافة: <strong>{clicks}</strong>
      </span>
    </DemoCard>
  );
}

function Recipes({ exposed }: { exposed: boolean }) {
  if (!exposed) {
    return (
      <DemoCard className="demo-narrow">
        <span className="demo-h">اكتشف</span>
        <span className="demo-group-h">وصفات مقترحة</span>
        <span className="demo-promo">
          <strong>اكتشف أكثر من ١٠٠ وصفة اختارها طهاتنا</strong>
          <Btn variant="dark" small>
            استكشف الآن
          </Btn>
        </span>
        <span className="demo-group-h">أطعمة مقترحة</span>
        <span className="demo-promo demo-promo--blue">
          <strong>اكتشف ٤٠ طعاماً مفيداً لصحتك</strong>
          <Btn variant="dark" small>
            استكشف الآن
          </Btn>
        </span>
      </DemoCard>
    );
  }
  const dishes = [
    { n: "نودلز بالخضار", c: "#E9B872" },
    { n: "دجاج مشوي", c: "#9CC69B" },
    { n: "أرز بالبط", c: "#C68B59" },
  ];
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">اكتشف</span>
      <span className="demo-row demo-row--flush">
        <span className="demo-group-h" style={{ marginTop: 10 }}>
          وصفات مقترحة
        </span>
        <span className="demo-link">عرض الكل</span>
      </span>
      <div className="demo-dishes">
        {dishes.map((d) => (
          <span key={d.n} className="demo-dish">
            <span className="demo-dish-img" style={{ background: `radial-gradient(circle, ${d.c} 0 45%, #fff 46% 58%, #eee 59%)` }} />
            <strong>{d.n}</strong>
            <span className="demo-muted demo-icon-line">
              <Clock size={10} aria-hidden /> ٢٠ د
            </span>
          </span>
        ))}
      </div>
    </DemoCard>
  );
}

function ReorderScene() {
  return (
    <DemoCard className="demo-narrow">
      <Hotspot id="title" label="العنوان">
        <span className="demo-h">أعد طلبك السابق</span>
      </Hotspot>
      <Hotspot id="field" label="حقل رقم الطلب">
        <span className="demo-block" style={{ marginTop: 10 }}>
          <span className="demo-label">أدخل رقم طلبك السابق</span>
          <span className="demo-input" style={{ marginTop: 6 }} dir="ltr">
            #
          </span>
          <span className="demo-muted demo-block" style={{ fontSize: 11.5, marginTop: 4 }}>
            تجده في رسالة التأكيد على بريدك
          </span>
        </span>
      </Hotspot>
      <Hotspot id="cta" label="زر إعادة الطلب">
        <span className="demo-block" style={{ marginTop: 12 }}>
          <Btn variant="primary" full>
            أعد الطلب
          </Btn>
        </span>
      </Hotspot>
      <Hotspot id="help" label="رابط المساعدة">
        <span className="demo-link demo-block demo-center-text" style={{ marginTop: 8 }}>
          تحتاج مساعدة؟
        </span>
      </Hotspot>
    </DemoCard>
  );
}

const clicksFor = (v: FixValues) => (v.swatches ? 1 : 3) + (v.stepper ? 1 : 3) + (v.near ? 1 : 2) + (v.popup ? 1 : 0);

export const interactionCost: StageContent = {
  slug: "interaction-cost",
  intro: (
    <p>
      كل تفاعل له ثمن يدفعه المستخدم: <strong>جهد ذهني</strong> ليفهم، و<strong>جهد بدني</strong> لينقر ويكتب ويمرر، و<strong>وقت</strong> ينتظره ويقضيه.
      الهدف المثالي تكلفة صفر: يجد المستخدم ما يريد فور وصوله. هذا مستحيل غالباً، لكن كل نقرة نحذفها وكل تفكير نوفره يقرّبنا منه.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "count",
      heading: "عُدّ النقرات",
      body: (
        <>
          <p>
            مستخدم يريد كرسيين باللون الأخضر. في التصميم الأول: يفتح قائمة الألوان، يمرر، يختار؛ يفتح قائمة الكمية، يمرر، يختار؛ ثم يحرك الماوس بعيداً إلى
            زر الإضافة. والأسوأ أنه لا يرى الألوان المتاحة إلا بعد أن يفتح القائمة.
          </p>
          <p>
            في التصميم الثاني: الألوان ظاهرة كدوائر — نقرة واحدة، وتعرض الخيارات مسبقاً. عداد الكمية يغير بنقرة. وزر الإضافة بجوار الكمية مباشرة —
            وفق <strong>قانون فيتس</strong>: الأهداف الأقرب والأكبر أسرع في الوصول.
          </p>
        </>
      ),
      example: {
        bad: <ChairPage swatches={false} stepper={false} near={false} mark />,
        good: <ChairPage swatches stepper near />,
        caption: "نفس المنتج — من ٨ نقرات إلى ٣.",
      },
    },
    {
      type: "lesson",
      id: "strategies",
      heading: "سبع طرق لتخفيض التكلفة",
      body: (
        <ol className="lesson-list">
          <li>
            <strong>قرّب الإجراءات المرتبطة:</strong> أزرار تشغيل الموسيقى ثابتة أسفل الشاشة، لا في صفحة أخرى.
          </li>
          <li>
            <strong>قلّل الخيارات:</strong> فلاتر واضحة ومحدودة بدل جدار من الخيارات.
          </li>
          <li>
            <strong>احترم الذاكرة العاملة:</strong> الإنسان يحمل في ذهنه نحو سبعة عناصر — قسّم المعلومات إلى مجموعات بعناوين.
          </li>
          <li>
            <strong>أزل المشتتات:</strong> لا نوافذ منبثقة ولا إعلانات متحركة أثناء المهمة.
          </li>
          <li>
            <strong>التعرّف أسهل من التذكر:</strong> «تابع المشاهدة» بدل أن يتذكر المستخدم أين توقف.
          </li>
          <li>
            <strong>اختصر الخطوات:</strong> املأ العنوان وبيانات الدفع تلقائياً إن أُدخلت سابقاً.
          </li>
          <li>
            <strong>قلّل التكرار:</strong> طبّق الإجراء على عدة عناصر دفعة واحدة، كما في الجداول — أو زر «اشترِ الآن» الذي يختصر السلة والدفع لمن يملك بيانات محفوظة.
          </li>
        </ol>
      ),
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "recipes",
        prompt: "شاشة «اكتشف» في تطبيق وصفات. أيّهما تقدّم القيمة أسرع؟",
        options: { a: <Recipes exposed={false} />, b: <Recipes exposed /> },
        correct: "b",
        hint: "في أيهما ترى وصفة فعلية دون أن تنقر على أي شيء؟",
        explain: "(ب) تعرض الوصفات نفسها مباشرة: قيمة فورية، احتكاك أقل، وفرصة أن يجد المستخدم ما يعجبه من النظرة الأولى. (أ) تخفي المحتوى خلف لافتات تتطلب نقرة إضافية.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "reorder",
        prompt: "هذه الشاشة تطلب من المستخدم جهداً لا داعي له. انقر على مصدره.",
        scene: <ReorderScene />,
        target: "field",
        misses: {
          title: "العنوان يوضح المهمة.",
          cta: "الزر واضح — المشكلة فيما يسبقه.",
          help: "رابط المساعدة صغير وفي مكانه.",
        },
        explain: "مطالبة المستخدم بتذكر رقم طلبه — أو البحث عنه في بريده — تعتمد على التذكر بدل التعرّف. التطبيق يعرف طلباته السابقة؛ اعرضها كقائمة بصورها ليختار منها بنقرة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-chair",
        prompt: "خفّض تكلفة إضافة الكرسي إلى السلة إلى أقل عدد ممكن من النقرات — وتخلّص مما يعترض الطريق.",
        controls: [
          { type: "toggle", key: "swatches", label: "الألوان كدوائر ظاهرة بدل قائمة منسدلة", initial: false },
          { type: "toggle", key: "stepper", label: "عداد كمية +/− بدل قائمة", initial: false },
          { type: "toggle", key: "near", label: "زر الإضافة بجوار الكمية", initial: false },
          { type: "toggle", key: "popup", label: "نافذة الاشتراك في النشرة", initial: true },
        ],
        render: (v) => <ChairPage swatches={Boolean(v.swatches)} stepper={Boolean(v.stepper)} near={Boolean(v.near)} popup={Boolean(v.popup)} />,
        meter: (v) => ({ label: "نقرات للإضافة", value: String(clicksFor(v)), ok: clicksFor(v) === 3 }),
        validate: (v) => {
          if (v.popup) return { ok: false, hint: "النافذة المنبثقة تقاطع المهمة وتكلّف نقرة إغلاق. أطفئها." };
          if (!v.swatches) return { ok: false, hint: "القائمة المنسدلة تخفي الألوان وتكلّف نقرات وتمريراً. اعرضها كدوائر." };
          if (!v.stepper) return { ok: false, hint: "لتغيير الكمية من ١ إلى ٢، عداد بزر + أسرع من فتح قائمة." };
          if (!v.near) return { ok: false, hint: "زر الإضافة بعيد عن آخر قرار اتخذه المستخدم. قرّبه من الكمية." };
          return { ok: true };
        },
        explain: "ثلاث نقرات بدل تسع: لون ظاهر، كمية بنقرة، وزر في متناول اليد. هذه هي تكلفة التفاعل حين تُحترم.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما المكونات الثلاثة لتكلفة التفاعل؟",
          options: ["اللون والخط والمسافة", "الجهد الذهني والبدني والوقت", "النقر والتمرير والكتابة", "التصميم والتطوير والاختبار"],
          correct: 1,
          explain: "كل ما يدفعه المستخدم من تفكير وحركة وانتظار.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "ماذا يقول قانون فيتس؟",
          options: ["الناس يتذكرون ٧ عناصر", "الأهداف الأقرب والأكبر أسرع في النقر", "الألوان الدافئة تجذب أكثر", "الخيارات الكثيرة تبطئ القرار"],
          correct: 1,
          explain: "لذلك يوضع الزر قرب آخر قرار ويُعطى مساحة نقر كافية.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "ميزة «تابع المشاهدة» مثال على:",
          options: ["التذكر بدل التعرّف", "التعرّف بدل التذكر", "تقليل الألوان", "زيادة الخيارات"],
          correct: 1,
          explain: "المستخدم يتعرف على ما كان يشاهده بدل أن يتذكر الحلقة والدقيقة.",
        },
      ],
    },
  ],
  keyRules: [
    "عُدّ النقرات والتمريرات — ثم احذف ما تستطيع.",
    "اعرض الخيارات بدل إخفائها في قوائم منسدلة.",
    "ضع الإجراء قرب آخر قرار (قانون فيتس).",
    "التعرّف أسهل من التذكر.",
    "لا مقاطعات أثناء المهمة.",
  ],
};
