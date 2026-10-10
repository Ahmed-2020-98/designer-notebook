import { Star } from "lucide-react";
import type { StageContent } from "./types";
import { DemoCard, Btn } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

function IceCream({ size = 96, tinted = false }: { size?: number; tinted?: boolean }) {
  return (
    <span className="icecream" style={{ width: size, height: size, background: tinted ? "#cfe8a3" : undefined }} aria-hidden>
      <span className="icecream-scoop" />
      <span className="icecream-cone" />
    </span>
  );
}

function Rating() {
  return (
    <span className="demo-icon-line demo-muted" style={{ fontSize: 11.5 }}>
      <Star size={12} fill="#F5B301" color="#F5B301" aria-hidden /> 4.8 (12.6 ألف تقييم)
    </span>
  );
}

function DessertCard({
  imageSize = 96,
  button = "medium",
  allGreen = false,
  mark = false,
}: {
  imageSize?: number;
  button?: string;
  allGreen?: boolean;
  mark?: boolean;
}) {
  const btn = (
    <span className={`demo-block demo-btn-size--${button}`}>
      <Btn variant={allGreen ? "success" : "dark"} full={button !== "small"} small={button === "small"}>
        اطلبه الآن
      </Btn>
    </span>
  );
  const img = (
    <span className="demo-center">
      <IceCream size={imageSize} tinted={allGreen} />
    </span>
  );
  return (
    <DemoCard className={`demo-narrow demo-stack-gap demo-center-text ${allGreen ? "demo-all-green" : ""}`}>
      {mark ? <Mark note="الصورة والزر يبتلعان البطاقة">{img}</Mark> : img}
      <span className="demo-h">آيس كريم الكيوي في سلة وافل</span>
      <p className="demo-p demo-muted">آيس كريم بنكهة الكيوي الطازج في سلة وافل مقرمشة، بين الحلاوة والحموضة.</p>
      <span className="demo-center">
        <Rating />
      </span>
      {btn}
    </DemoCard>
  );
}

function Hero({ balanced }: { balanced: boolean }) {
  return (
    <DemoCard className="demo-wide demo-hero">
      <div className={`demo-hero-grid ${balanced ? "" : "is-lopsided"}`}>
        <span className="demo-col">
          <span className="demo-h" style={{ fontSize: balanced ? 16 : 13 }}>
            تعلّم التصميم من الصفر
          </span>
          <span className="demo-muted">مسار عملي في ١٢ أسبوعاً.</span>
          <span style={{ marginTop: 8 }}>
            <Btn variant="primary" small>
              ابدأ الآن
            </Btn>
          </span>
        </span>
        <span className="demo-hero-art" style={{ height: balanced ? 92 : 150 }} />
      </div>
    </DemoCard>
  );
}

function BadgeScene() {
  return (
    <DemoCard className="demo-narrow demo-stack-gap">
      <Hotspot id="badge" label="شارة جديد">
        <span className="demo-huge-badge">جديد!</span>
      </Hotspot>
      <Hotspot id="image" label="صورة المنتج">
        <span className="demo-center">
          <IceCream size={84} />
        </span>
      </Hotspot>
      <Hotspot id="title" label="اسم المنتج">
        <span className="demo-h demo-center-text">آيس كريم الكيوي</span>
      </Hotspot>
      <Hotspot id="rating" label="التقييم">
        <span className="demo-center">
          <Rating />
        </span>
      </Hotspot>
      <Hotspot id="cta" label="زر الطلب">
        <Btn variant="dark" full>
          اطلبه الآن
        </Btn>
      </Hotspot>
    </DemoCard>
  );
}

export const balance: StageContent = {
  slug: "balance",
  intro: (
    <p>
      قد تختار لوناً جميلاً وخطاً ممتازاً وتخطيطاً منطقياً، ومع ذلك تشعر أن التصميم «ثقيل» أو «مائل». التوازن والانسجام يتعلقان بالعلاقة بين العناصر:
      ألا يطغى أحدها على البقية، وأن تتحدث الألوان والأحجام والمسافات بلغة واحدة.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "proportion",
      heading: "النسبة: لا عنصر يبتلع البقية",
      body: (
        <p>
          في البطاقة الأولى كل الأساسيات موجودة، لكن الصورة الضخمة والزر العملاق يسحبان كل الانتباه، فيضيع الاسم والوصف والتقييم بينهما. ليس الهدف تصغير
          كل شيء، بل أن يأخذ كل عنصر حضوراً يناسب دوره: الصورة جذابة، الزر واضح، والنص مقروء — دون أن يصرخ أحدهم فوق الآخرين.
        </p>
      ),
      example: { bad: <DessertCard imageSize={150} button="huge" mark />, good: <DessertCard />, caption: "نفس العناصر، بأحجام تتناسب مع أدوارها." },
    },
    {
      type: "lesson",
      id: "color",
      heading: "انسجام الألوان: لون واحد ليس هوية",
      body: (
        <p>
          حين يتكرر لون واحد في الخلفية والزر والصورة والشارات، تصبح الواجهة رتيبة ومرهقة، ويفقد اللون قدرته على الإشارة إلى المهم. الحل: خلفيات محايدة،
          ولون مميز واحد للإجراء الأساسي، وتنويع خفيف من نفس العائلة اللونية حيث تحتاج.
        </p>
      ),
      example: { bad: <DessertCard allGreen />, good: <DessertCard />, caption: "حين يكون كل شيء أخضر، لا شيء يبرز." },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "hero-balance",
        prompt: "قسم ترحيبي بنص وصورة. أي نسخة تبدو متوازنة؟",
        options: { a: <Hero balanced={false} />, b: <Hero balanced /> },
        correct: "b",
        hint: "قارن ثقل الصورة بثقل النص. هل تميل البطاقة إلى جهة واحدة؟",
        explain: "في (ب) يتقاسم النص والصورة المساحة بوزن متقارب. في (أ) الصورة الضخمة تجرّ العين بعيداً عن العنوان والزر الصغير.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "badge-scene",
        prompt: "عنصر واحد في هذه البطاقة أكبر بكثير من أهميته، فكسر توازنها. انقر عليه.",
        scene: <BadgeScene />,
        target: "badge",
        misses: {
          image: "الصورة بحجم يجذب دون أن يطغى.",
          title: "الاسم واضح ومتناسب.",
          rating: "التقييم صغير كما يليق بمعلومة مساندة.",
          cta: "الزر واضح لكنه لا يصرخ.",
        },
        explain: "شارة «جديد!» معلومة ثانوية، لكنها أخذت حجم عنوان وأقوى لون في البطاقة. الشارة يكفيها حجم صغير في زاوية الصورة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-proportion",
        prompt: "أعد التوازن للبطاقة: صورة جذابة لا تبتلع المحتوى، وزر واضح لا يصرخ.",
        controls: [
          { type: "range", key: "imageSize", label: "حجم الصورة", min: 60, max: 170, step: 2, unit: "px", initial: 160 },
          {
            type: "select",
            key: "button",
            label: "حجم الزر",
            options: [
              { value: "small", label: "صغير" },
              { value: "medium", label: "متوسط" },
              { value: "huge", label: "ضخم" },
            ],
            initial: "huge",
          },
        ],
        render: (v) => <DessertCard imageSize={Number(v.imageSize)} button={String(v.button)} />,
        validate: (v) => {
          const img = Number(v.imageSize);
          if (img > 124) return { ok: false, hint: "الصورة ما زالت تبتلع البطاقة. صغّرها حتى يأخذ النص مساحته." };
          if (img < 76) return { ok: false, hint: "الآن صارت الصورة أصغر من أن تجذب. في الحلويات، الصورة تبيع — كبّرها قليلاً." };
          if (v.button === "huge") return { ok: false, hint: "الزر الضخم يصرخ فوق كل شيء. متوسط يكفي ليكون واضحاً." };
          if (v.button === "small") return { ok: false, hint: "الزر الصغير يضيع. هو الإجراء الأساسي — اجعله متوسطاً بعرض البطاقة." };
          return { ok: true };
        },
        explain: "لا عنصر يطغى: الصورة تجذب، النص يُقرأ، والزر واضح. هذا هو التوازن.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما المقصود بالتوازن في الواجهة؟",
          options: ["تماثل الجهتين دائماً", "ألا يطغى عنصر على البقية بما يتجاوز دوره", "أن تكون كل العناصر بنفس الحجم", "استخدام لونين فقط"],
          correct: 1,
          explain: "التوازن ليس تماثلاً حرفياً؛ هو تناسب حضور كل عنصر مع أهميته.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "ما مشكلة استخدام لون واحد في كل شيء؟",
          options: ["يزيد حجم الملفات", "رتابة، ويفقد اللون قدرته على إبراز المهم", "صعوبة الطباعة", "لا مشكلة إن كان لون العلامة التجارية"],
          correct: 1,
          explain: "اللون المميز يعمل لأنه نادر. حين يكون في كل مكان، لا يميز شيئاً.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "شارة «جديد» على منتج — أين مكانها الأنسب؟",
          options: ["عنوان كبير أعلى البطاقة", "صغيرة في زاوية الصورة", "بدل اسم المنتج", "داخل الزر"],
          correct: 1,
          explain: "معلومة مساندة تكفيها إشارة صغيرة واضحة.",
        },
      ],
    },
  ],
  keyRules: [
    "كل عنصر يأخذ حضوراً يناسب دوره، لا أكثر.",
    "خلفيات محايدة ولون مميز واحد للإجراء.",
    "التوازن ليس تماثلاً؛ هو تناسب الأوزان.",
    "المعلومات الثانوية تُعرض بحجم ثانوي.",
    "إذا شعرت أن التصميم «ثقيل»، ابحث عن العنصر الذي يصرخ.",
  ],
};
