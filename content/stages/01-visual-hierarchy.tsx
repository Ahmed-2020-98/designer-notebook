import { Bed, Bath, Ruler, MapPin, X as XIcon } from "lucide-react";
import type { StageContent, FixValues } from "./types";
import { DemoCard, Btn, Fruit, Price, Spark, House, type BtnVariant, type FruitKind } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const ITEMS: { kind: FruitKind; name: string; price: string }[] = [
  { kind: "avocado", name: "أفوكادو", price: "$4.50" },
  { kind: "lime", name: "ليمون أخضر", price: "$4.20" },
  { kind: "orange", name: "برتقال", price: "$2.50" },
];

function Cart({
  remove,
  cont,
  checkout,
  markButtons = false,
  imageSize = 36,
  nameWeight = 600,
}: {
  remove: BtnVariant;
  cont: BtnVariant;
  checkout: BtnVariant;
  markButtons?: boolean;
  imageSize?: number;
  nameWeight?: number;
}) {
  const actions = (
    <div className="demo-stack">
      <Btn variant={cont} full>
        متابعة التسوق
      </Btn>
      <Btn variant={checkout} full>
        إتمام الشراء
      </Btn>
    </div>
  );
  return (
    <DemoCard className="demo-cart">
      <span className="demo-h">سلة المشتريات</span>
      {ITEMS.map((it) => (
        <div key={it.name} className="demo-row">
          <Fruit kind={it.kind} size={imageSize} />
          <span className="demo-col">
            <span style={{ fontWeight: nameWeight }}>{it.name}</span>
            <span className="demo-muted">قطعة واحدة</span>
            <Btn variant={remove} small>
              حذف
            </Btn>
          </span>
          <Price>{it.price}</Price>
        </div>
      ))}
      <div className="demo-row demo-total">
        <span>الإجمالي</span>
        <Price>$11.20</Price>
      </div>
      {markButtons ? <Mark note="الكل يصرخ بنفس الصوت!">{actions}</Mark> : actions}
    </DemoCard>
  );
}

function Metric({ label, value, labelBig }: { label: string; value: string; labelBig: boolean }) {
  return (
    <div className="demo-metric">
      <span className={labelBig ? "demo-metric-big" : "demo-metric-small"}>{label}</span>
      <span className={labelBig ? "demo-metric-small" : "demo-metric-big"} dir="ltr">
        {value}
      </span>
      <Spark />
    </div>
  );
}

function Metrics({ labelBig }: { labelBig: boolean }) {
  const cards = (
    <div className="demo-metrics">
      <Metric label="الأرباح" value="$4,981" labelBig={labelBig} />
      <Metric label="المبيعات" value="591" labelBig={labelBig} />
      <Metric label="الزيارات" value="2,121" labelBig={labelBig} />
    </div>
  );
  return labelBig ? <Mark note="العنوان أعلى صوتاً من الرقم؟">{cards}</Mark> : cards;
}

function ServiceCard({ inverted }: { inverted: boolean }) {
  const title = (
    <span className="demo-h" style={{ color: inverted ? "#9A9A9A" : "#1A1A1A" }}>
      استشارات قانونية للشركات
    </span>
  );
  return (
    <DemoCard className="demo-narrow">
      {inverted ? <Mark note="العنوان باهت والتفاصيل داكنة">{title}</Mark> : title}
      <p className="demo-p" style={{ color: inverted ? "#1A1A1A" : "#6B6B6B", fontWeight: inverted ? 600 : 400 }}>
        فريق متخصص يرافقك في تأسيس الشركة، صياغة العقود، وحل النزاعات التجارية.
      </p>
    </DemoCard>
  );
}

function Listing({ good }: { good: boolean }) {
  if (!good) {
    const rows: [string, string][] = [
      ["النوع", "للبيع"],
      ["السعر", "$3,273,279"],
      ["الموقع", "حي الياسمين، الرياض"],
      ["المساحة", "1634 قدم²"],
      ["غرف النوم", "5"],
      ["الحمّامات", "3"],
    ];
    return (
      <DemoCard className="demo-listing">
        <House />
        <span className="demo-h">فيلا فاخرة بخمس غرف</span>
        <Mark note="كل سطر بنفس الوزن — أين السعر؟">
          <dl className="demo-dl">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}:</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Mark>
      </DemoCard>
    );
  }
  return (
    <DemoCard className="demo-listing">
      <House />
      <div className="demo-row demo-row--top">
        <Price>
          <span className="demo-price-xl">$3,273,279</span>
        </Price>
        <span className="demo-chip">للبيع</span>
      </div>
      <span className="demo-h">فيلا فاخرة بخمس غرف</span>
      <span className="demo-muted demo-icon-line">
        <MapPin size={13} aria-hidden /> حي الياسمين، الرياض
      </span>
      <div className="demo-icons">
        <span>
          <Ruler size={14} aria-hidden /> 1634 قدم²
        </span>
        <span>
          <Bed size={14} aria-hidden /> 5 غرف
        </span>
        <span>
          <Bath size={14} aria-hidden /> 3 حمّامات
        </span>
      </div>
    </DemoCard>
  );
}

function DraftDialog() {
  return (
    <DemoCard className="demo-dialog">
      <Hotspot id="close" label="زر الإغلاق" className="demo-dialog-close">
        <XIcon size={16} aria-hidden />
      </Hotspot>
      <Hotspot id="title" label="عنوان النافذة">
        <span className="demo-h">حفظ المسودة قبل الخروج؟</span>
      </Hotspot>
      <Hotspot id="body" label="نص الشرح">
        <p className="demo-p demo-muted">لديك تعديلات لم تُحفظ على المقال. إذا خرجت الآن ستفقدها.</p>
      </Hotspot>
      <div className="demo-dialog-actions">
        <Hotspot id="save" label="رابط حفظ المسودة">
          <Btn variant="text" small>
            حفظ المسودة
          </Btn>
        </Hotspot>
        <Hotspot id="cancel" label="زر خروج بدون حفظ">
          <Btn variant="loud">خروج بدون حفظ</Btn>
        </Hotspot>
      </div>
    </DemoCard>
  );
}

const styleOptions = [
  { value: "filled", label: "ممتلئ (أساسي)" },
  { value: "soft", label: "هادئ (ثانوي)" },
  { value: "text", label: "نص فقط (ثالثي)" },
];

const toVariant = (style: string, role: "checkout" | "continue" | "remove"): BtnVariant => {
  if (style === "filled") return role === "checkout" ? "success" : "dark";
  if (style === "soft") return "soft";
  return role === "remove" ? "danger-text" : "text";
};

const filledCount = (v: FixValues) => ["checkout", "continue", "remove"].filter((k) => v[k] === "filled").length;

export const visualHierarchy: StageContent = {
  slug: "visual-hierarchy",
  intro: (
    <p>
      افتح أي تطبيق تحبه وراقب عينك: هي لا تقرأ الشاشة سطراً سطراً، بل تقفز. تقفز إلى الأكبر، ثم الأغمق، ثم الملوّن. التسلسل البصري هو أن تقرر أنت
      مسار هذه القفزات بدل أن تتركه للصدفة. إذا تساوت كل العناصر في الحجم واللون، فأنت تتحدث بكل شيء في نفس الوقت — ولن يسمعك أحد.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "what",
      heading: "زر أساسي واحد يكفي",
      body: (
        <>
          <p>
            في سلة المشتريات ثلاثة إجراءات: <strong>حذف منتج</strong>، <strong>متابعة التسوق</strong>، و<strong>إتمام الشراء</strong>. الثلاثة مفيدة، لكنها
            ليست متساوية. إتمام الشراء هو سبب وجود الشاشة، ومتابعة التسوق بديل مقبول، والحذف إجراء جانبي قد يندم عليه المستخدم.
          </p>
          <p>حين تعطي الثلاثة نفس اللون والحجم، يضطر المستخدم لقراءة كل زر قبل أن يقرر. أما حين تختلف أوزانها، فالقرار يحدث قبل القراءة.</p>
        </>
      ),
      example: {
        bad: <Cart remove="dark" cont="dark" checkout="dark" markButtons />,
        good: <Cart remove="danger-text" cont="soft" checkout="success" />,
        caption: "نفس الأزرار ونفس النصوص — الفرق فقط في الوزن البصري لكل إجراء.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "cart-focus",
        prompt: "النسختان تعرضان نفس السلة. أيّهما توجّه العين إلى ما يهم المستخدم فعلاً؟",
        options: {
          a: <Cart remove="danger-text" cont="soft" checkout="success" imageSize={64} nameWeight={400} />,
          b: <Cart remove="danger-text" cont="soft" checkout="success" imageSize={34} nameWeight={700} />,
        },
        correct: "b",
        hint: "انظر إلى حجم الصور مقارنة بأسماء المنتجات وأسعارها. من يسرق المشهد؟",
        explain: "في النسخة (ب) الصور بحجم معقول، والاسم والسعر واضحان. الصور الضخمة في (أ) تخطف الانتباه من المعلومة التي يحتاجها المستخدم ليقرر.",
      },
    },
    {
      type: "lesson",
      id: "rank",
      heading: "رتّب قبل أن ترسم",
      body: (
        <>
          <p>
            قبل أن تفتح أداة التصميم، اكتب قائمة بكل ما يجب أن يظهر على الشاشة، ثم رتّبها حسب أهميتها <em>للمستخدم</em> لا لك. هذه القائمة هي خريطة
            التسلسل: الأول يأخذ الحجم الأكبر، والأخير يأخذ أهدأ معاملة.
          </p>
          <p>
            خطأ شائع في لوحات البيانات: تكبير اسم المقياس وتصغير الرقم. المستخدم يعرف أن هذه بطاقة «المبيعات» من النظرة الأولى — ما جاء ليعرفه هو
            <strong> كم</strong>.
          </p>
        </>
      ),
      example: {
        bad: <Metrics labelBig />,
        good: <Metrics labelBig={false} />,
        caption: "القيمة هي المعلومة. العنوان مجرد لافتة صغيرة تشرح ما هي.",
      },
    },
    {
      type: "lesson",
      id: "color",
      heading: "اللون الداكن يقول: اقرأني أولاً",
      body: (
        <p>
          على الخلفية الفاتحة، كلما كان النص أغمق جذب العين أسرع. فإذا جعلت العنوان رمادياً فاتحاً والفقرة سوداء، تكون قد عكست الترتيب دون أن تقصد.
          القاعدة البسيطة: العناوين بلون داكن، والنص المساند بلون أهدأ — مع الحفاظ على تباين كافٍ للقراءة.
        </p>
      ),
      example: {
        bad: <ServiceCard inverted />,
        good: <ServiceCard inverted={false} />,
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "draft-dialog",
        prompt: "في هذه النافذة عنصر يأخذ انتباهاً لا يستحقه، وقد يدفع المستخدم لخسارة عمله. انقر عليه.",
        scene: <DraftDialog />,
        target: "cancel",
        misses: {
          save: "هذا هو الإجراء الآمن الذي يريده أغلب المستخدمين — لكنه مختبئ كرابط صغير. المشكلة في جاره.",
          title: "العنوان واضح ويطرح السؤال مباشرة. ابحث في الأزرار.",
          body: "النص يشرح العاقبة بوضوح. المشكلة في طريقة عرض الخيارات.",
          close: "زر الإغلاق صغير وهادئ كما ينبغي.",
        },
        explain:
          "«خروج بدون حفظ» إجراء مُدمّر، ومع ذلك أخذ أقوى معاملة بصرية: لون صارخ وحجم كبير. الصحيح أن يكون «حفظ المسودة» هو الزر الأساسي، وأن يتراجع الخروج إلى زر هادئ.",
      },
    },
    {
      type: "lesson",
      id: "size",
      heading: "الحجم والإشارات يفرّقان المعلومات",
      body: (
        <p>
          قائمة من «عنوان: قيمة» تبدو مرتبة، لكنها تساوي بين السعر وعدد الحمّامات. استخدم الحجم لما هو أهم (السعر)، وشارة ملوّنة للحالة (للبيع)،
          وأيقونات صغيرة للتفاصيل المتكررة التي يمسحها المستخدم بعينه بسرعة.
        </p>
      ),
      example: {
        bad: <Listing good={false} />,
        good: <Listing good />,
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-cart",
        prompt: "هذه السلة كل أزرارها ممتلئة. غيّر نمط كل زر حتى يصبح «إتمام الشراء» هو الإجراء الأساسي الوحيد، و«حذف» أهدأ عنصر.",
        controls: [
          { type: "select", key: "checkout", label: "زر «إتمام الشراء»", options: styleOptions, initial: "filled" },
          { type: "select", key: "continue", label: "زر «متابعة التسوق»", options: styleOptions, initial: "filled" },
          { type: "select", key: "remove", label: "زر «حذف»", options: styleOptions, initial: "filled" },
        ],
        render: (v) => (
          <Cart
            checkout={toVariant(String(v.checkout), "checkout")}
            cont={toVariant(String(v.continue), "continue")}
            remove={toVariant(String(v.remove), "remove")}
          />
        ),
        meter: (v) => ({ label: "الأزرار الممتلئة", value: `${filledCount(v)} / 1`, ok: filledCount(v) === 1 }),
        validate: (v) => {
          const n = filledCount(v);
          if (n === 0) return { ok: false, hint: "لا يوجد أي زر أساسي الآن. المستخدم يحتاج إجراءً واحداً واضحاً يعرف أنه الطريق المتوقع." };
          if (n > 1) return { ok: false, hint: "ما زال هناك أكثر من زر ممتلئ — العين لا تعرف أين تذهب. أبقِ زراً أساسياً واحداً." };
          if (v.checkout !== "filled") return { ok: false, hint: "الزر الممتلئ الوحيد يجب أن يكون «إتمام الشراء»، فهو هدف هذه الشاشة." };
          if (v.remove !== "text") return { ok: false, hint: "«حذف» إجراء جانبي وقد يندم عليه المستخدم — يكفيه نص صغير بلون تحذيري." };
          return { ok: true };
        },
        explain: "ممتاز. إجراء أساسي واحد ممتلئ، بديل هادئ، وإجراء مُدمّر يتراجع إلى نص. هكذا يُتخذ القرار قبل أن تُقرأ الأزرار.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما أول خطوة قبل بناء التسلسل البصري لشاشة جديدة؟",
          options: ["اختيار لوحة الألوان", "ترتيب العناصر حسب أهميتها للمستخدم", "اختيار الخط المناسب", "إضافة الصور التوضيحية"],
          correct: 1,
          explain: "الترتيب يسبق الشكل. حين تعرف ما الأهم، تعرف لمن يذهب الحجم واللون.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "في بطاقة إحصائية مثل «المبيعات: 591»، ما الذي يجب أن يكون الأكبر؟",
          options: ["اسم المقياس", "الأيقونة", "القيمة الرقمية", "يتساويان في الحجم"],
          correct: 2,
          explain: "المستخدم جاء ليعرف الرقم. الاسم يكفيه حجم صغير كلافتة توضيحية.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "أي إجراء يأخذ أهدأ معاملة بصرية في سلة المشتريات؟",
          options: ["إتمام الشراء", "متابعة التسوق", "حذف منتج"],
          correct: 2,
          explain: "الحذف إجراء جانبي ومُدمّر، فيُعرض كنص صغير — متاح لمن يبحث عنه دون أن يغري بالضغط عليه.",
        },
      ],
    },
  ],
  keyRules: [
    "رتّب العناصر حسب أهميتها للمستخدم قبل أن تصمم.",
    "زر أساسي واحد في كل شاشة.",
    "الأكبر والأغمق يُقرأ أولاً — استخدمهما للأهم.",
    "القيمة أهم من عنوانها.",
    "الإجراء المُدمّر لا يأخذ أبداً أقوى معاملة بصرية.",
  ],
};
