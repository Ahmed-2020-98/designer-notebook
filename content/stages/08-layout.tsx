import { ImagePlus, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import type { StageContent, FixValues } from "./types";
import { DemoCard, Btn, Price } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

function Pizza({ size = 120 }: { size?: number }) {
  return <span className="pizza" style={{ width: size, height: size }} aria-hidden />;
}

const NAME = "بيتزا إيطالية بالطماطم والسلامي";
const DESC = "عجينة تُخبز على الحطب، صلصة طماطم طازجة وجبن موزاريلا.";

function PizzaRow() {
  return (
    <DemoCard className="demo-wide">
      <span className="demo-h">{NAME}</span>
      <Mark note="الصورة أصغر من أن تُشهّي">
        <div className="demo-row">
          <Pizza size={44} />
          <Price>$12</Price>
          <span style={{ marginInlineStart: "auto" }}>
            <Btn variant="loud" small>
              اطلب
            </Btn>
          </span>
        </div>
      </Mark>
      <p className="demo-p demo-muted">{DESC}</p>
    </DemoCard>
  );
}

function PizzaCard({ order = ["image", "name", "desc", "price", "cta"] }: { order?: string[] }) {
  const parts: Record<string, ReactNode> = {
    image: (
      <span key="image" className="demo-center">
        <Pizza size={118} />
      </span>
    ),
    name: (
      <span key="name" className="demo-h demo-center-text">
        {NAME}
      </span>
    ),
    desc: (
      <p key="desc" className="demo-p demo-muted demo-center-text">
        {DESC}
      </p>
    ),
    price: (
      <span key="price" className="demo-center-text demo-block">
        <Price>$12</Price> <span className="demo-muted">/ للقطعة</span>
      </span>
    ),
    cta: (
      <span key="cta" className="demo-block">
        <Btn variant="loud" full>
          اطلب الآن
        </Btn>
      </span>
    ),
  };
  return <DemoCard className="demo-narrow demo-stack-gap">{order.map((k) => parts[k])}</DemoCard>;
}

function Plans({ cards }: { cards: boolean }) {
  const plans = [
    { name: "أساسي", credits: 10, price: "$5" },
    { name: "اقتصادي", credits: 50, price: "$10" },
    { name: "احترافي", credits: 100, price: "$15" },
  ];
  if (!cards) {
    return (
      <DemoCard className="demo-narrow">
        <span className="demo-h">اختر باقتك</span>
        <div className="demo-checks">
          {plans.map((p, i) => (
            <span key={p.name} className="demo-check-row">
              <span className={`demo-radio ${i === 1 ? "is-on" : ""}`} aria-hidden />
              {p.name} — {p.credits} رصيد ({p.price} شهرياً)
            </span>
          ))}
        </div>
      </DemoCard>
    );
  }
  return (
    <div className="demo-plan-row">
      {plans.map((p, i) => (
        <span key={p.name} className={`demo-plan ${i === 1 ? "is-on" : ""}`}>
          <span className="demo-plan-tag">{p.name}</span>
          <strong dir="ltr">{p.credits}</strong>
          <span className="demo-muted">رصيد</span>
          <span className="demo-plan-price">
            <bdi dir="ltr">{p.price}</bdi> / شهر
          </span>
        </span>
      ))}
    </div>
  );
}

function ListingForm({ mirrored }: { mirrored: boolean }) {
  if (!mirrored) {
    return (
      <DemoCard className="demo-narrow">
        <span className="demo-h">إعلان جديد</span>
        {["العنصر", "السعر", "الوصف", "التصنيف", "الموقع", "الصور"].map((f) => (
          <span key={f} className="demo-block" style={{ marginTop: 8 }}>
            <span className="demo-label">{f}</span>
            <span className="demo-input demo-input--sm" />
          </span>
        ))}
      </DemoCard>
    );
  }
  return (
    <DemoCard className="demo-narrow" style={{ padding: 0, overflow: "hidden" }}>
      <span className="demo-upload">
        <ImagePlus size={20} aria-hidden />
        أضف صورة
      </span>
      <div style={{ padding: 14 }}>
        <div className="demo-row demo-row--flush" style={{ alignItems: "flex-start" }}>
          <span className="demo-ghost-field">ماذا تبيع؟</span>
          <span className="demo-ghost-field demo-ghost-field--sm" dir="ltr">
            $0
          </span>
        </div>
        <span className="demo-ghost-field demo-ghost-field--area">صف ما تبيعه بالتفصيل…</span>
        <span className="demo-ghost-field demo-icon-line">
          <MapPin size={12} aria-hidden /> أدخل موقعك
        </span>
      </div>
    </DemoCard>
  );
}

function OrderScene() {
  return (
    <DemoCard className="demo-narrow demo-stack-gap">
      <Hotspot id="cta" label="زر اطلب الآن">
        <Btn variant="loud" full>
          اطلب الآن
        </Btn>
      </Hotspot>
      <Hotspot id="image" label="صورة البيتزا">
        <span className="demo-center">
          <Pizza size={100} />
        </span>
      </Hotspot>
      <Hotspot id="name" label="اسم المنتج">
        <span className="demo-h demo-center-text">{NAME}</span>
      </Hotspot>
      <Hotspot id="desc" label="الوصف">
        <p className="demo-p demo-muted demo-center-text">{DESC}</p>
      </Hotspot>
      <Hotspot id="price" label="السعر">
        <span className="demo-center-text demo-block">
          <Price>$12</Price>
        </span>
      </Hotspot>
    </DemoCard>
  );
}

const orderFor = (v: FixValues) => {
  const first = String(v.first);
  const rest = ["image", "name", "desc", "price"].filter((k) => k !== first);
  const seq = [first, ...rest];
  return v.cta === "top" ? ["cta", ...seq] : [...seq, "cta"];
};

export const layout: StageContent = {
  slug: "layout",
  intro: (
    <p>
      التخطيط هو الإطار الذي يجمع كل ما تعلمناه: أين يوضع كل عنصر، وبأي ترتيب، وكم مساحة يأخذ. التخطيط الجيد يجذب العين أولاً، ثم يقود المستخدم خطوة
      بخطوة نحو ما جاء من أجله. والسؤال الذي يحكم كل قرار: ما الذي يهم <strong>هذا</strong> المستخدم في <strong>هذا</strong> المنتج؟
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "matters",
      heading: "اعرض ما يبيع",
      body: (
        <>
          <p>
            في مطعم، الطعام يُشترى بالعين أولاً. التخطيط الأفقي المضغوط يضع صورة صغيرة بجانب السعر والزر، فيبدو كقائمة أسعار. أما التخطيط العمودي فيعطي
            الصورة مساحتها، ويجعل الطبق يبدو أشهى وأغلى.
          </p>
          <p>القاعدة ليست «الصور الكبيرة دائماً»؛ القاعدة أن تعطي المساحة الأكبر لما يقرر عليه المستخدم.</p>
        </>
      ),
      example: { bad: <PizzaRow />, good: <PizzaCard />, caption: "نفس المحتوى بتخطيطين: قائمة أسعار مقابل طبق يُشتهى." },
    },
    {
      type: "lesson",
      id: "order",
      heading: "رتّب كما يفكر المستخدم",
      body: (
        <p>
          حتى بنفس العناصر والأحجام، الترتيب يغير القراءة. ابدأ بما يجذب (الصورة)، ثم ما يعرّف (الاسم والوصف)، ثم ما يقرر (السعر)، وأخيراً الإجراء
          (الزر). عرض السعر أولاً قبل أن يعرف المستخدم ما الذي يدفع مقابله يقلب التسلسل الطبيعي للتفكير.
        </p>
      ),
      example: {
        bad: <PizzaCard order={["price", "image", "name", "cta", "desc"]} />,
        good: <PizzaCard />,
        caption: "الخطأ: السعر أولاً والزر قبل الوصف. الصح: جذب ← تعريف ← قرار ← إجراء.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "plans",
        prompt: "صفحة اختيار باقة. أي تخطيط يجعل المقارنة والاختيار أسهل وأمتع؟",
        options: { a: <Plans cards={false} />, b: <Plans cards /> },
        correct: "b",
        hint: "في أيهما ترى الفرق بين الباقات بنظرة واحدة دون أن تقرأ كل سطر؟",
        explain: "البطاقات القابلة للاختيار تبرز الرقم المهم (الرصيد) وتضع الباقات جنباً إلى جنب للمقارنة. القائمة النصية واضحة لكنها تجبر المستخدم على قراءة كل سطر.",
      },
    },
    {
      type: "lesson",
      id: "form",
      heading: "نموذج يشبه نتيجته",
      body: (
        <p>
          النماذج غالباً قوائم حقول مملة. فكرة ذكية: صمم النموذج على شكل النتيجة النهائية. إذا كان المستخدم ينشئ إعلان بيع، اجعل الحقول في نفس أماكنها
          في بطاقة الإعلان: الصورة أعلى، الاسم والسعر في صف، ثم الوصف والموقع. هكذا يرى إعلانه يتشكل وهو يكتب.
        </p>
      ),
      example: { bad: <ListingForm mirrored={false} />, good: <ListingForm mirrored />, caption: "النموذج الصحيح يبدو كالإعلان الذي سيُنشر." },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "order-scene",
        prompt: "عناصر هذه البطاقة صحيحة، لكن واحداً منها في المكان الخطأ من التسلسل. انقر عليه.",
        scene: <OrderScene />,
        target: "cta",
        misses: {
          image: "الصورة في مكان مناسب لجذب العين. لكن ماذا يأتي قبلها؟",
          name: "الاسم بعد الصورة — ترتيب طبيعي.",
          desc: "الوصف يشرح المنتج قبل السعر، وهذا صحيح.",
          price: "السعر يأتي بعد أن يعرف المستخدم ما الذي يشتريه — ممتاز.",
        },
        explain: "زر «اطلب الآن» في الأعلى يطلب القرار قبل أن يرى المستخدم المنتج أو سعره. الإجراء يأتي في نهاية التسلسل، بعد أن تكتمل الصورة في ذهنه.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-order",
        prompt: "أعد ترتيب البطاقة: ابدأ بما يجذب، وأنهِ بالإجراء.",
        controls: [
          {
            type: "select",
            key: "first",
            label: "أول عنصر في البطاقة",
            options: [
              { value: "price", label: "السعر" },
              { value: "name", label: "الاسم" },
              { value: "image", label: "الصورة" },
            ],
            initial: "price",
          },
          {
            type: "select",
            key: "cta",
            label: "موضع زر الطلب",
            options: [
              { value: "top", label: "أعلى البطاقة" },
              { value: "bottom", label: "آخر البطاقة" },
            ],
            initial: "top",
          },
        ],
        render: (v) => <PizzaCard order={orderFor(v)} />,
        validate: (v) => {
          if (v.first === "price") return { ok: false, hint: "المستخدم لا يعرف بعد ما الذي يدفع مقابله. لا تبدأ بالسعر." };
          if (v.first === "name") return { ok: false, hint: "قريب! لكن في الطعام العين تقرر قبل القراءة. ابدأ بما يجذبها." };
          if (v.cta === "top") return { ok: false, hint: "الزر يطلب القرار مبكراً جداً. ضعه حيث ينتهي التفكير: آخر البطاقة." };
          return { ok: true };
        },
        explain: "صورة تجذب، اسم ووصف يعرّفان، سعر يقرر، وزر ينفّذ. هذا هو التسلسل الذي يمشي فيه ذهن المستخدم.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "في بطاقة طعام، ما العنصر الذي يستحق غالباً المساحة الأكبر؟",
          options: ["السعر", "زر الطلب", "صورة الطبق", "الوصف"],
          correct: 2,
          explain: "في الطعام القرار بصري أولاً. أعطِ المساحة لما يبيع.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "ما الترتيب الطبيعي لعناصر بطاقة منتج؟",
          options: ["زر ← سعر ← صورة", "صورة ← اسم ← سعر ← زر", "سعر ← زر ← صورة", "اسم ← زر ← صورة ← سعر"],
          correct: 1,
          explain: "جذب، ثم تعريف، ثم قرار، ثم إجراء.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "ما فائدة تصميم النموذج على شكل النتيجة النهائية؟",
          options: ["يقلل عدد الحقول", "يرى المستخدم نتيجته تتشكل فيصبح الإدخال أوضح وأمتع", "يسرّع تحميل الصفحة", "لا فائدة حقيقية"],
          correct: 1,
          explain: "حين يعرف المستخدم أين ستظهر كل معلومة، يكتبها بشكل أفضل.",
        },
      ],
    },
  ],
  keyRules: [
    "أعطِ المساحة الأكبر لما يقرر عليه المستخدم.",
    "رتّب: جذب ← تعريف ← قرار ← إجراء.",
    "الزر في نهاية التسلسل، لا في بدايته.",
    "البطاقات القابلة للاختيار أوضح من قوائم النص للمقارنة.",
    "صمم النموذج على شكل نتيجته.",
  ],
};
