import { Eye, Minus, Plus, Smartphone, MapPin, Star } from "lucide-react";
import type { StageContent } from "./types";
import { DemoCard, Btn, Price } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

function Suit({ size = 52 }: { size?: number }) {
  return (
    <span className="demo-suit" style={{ width: size, height: size * 1.15 }} aria-hidden>
      <span />
    </span>
  );
}

function CartItem({
  image = true,
  imageSize = 52,
  views = false,
  sku = false,
  returns = false,
  rating = false,
}: {
  image?: boolean;
  imageSize?: number;
  views?: boolean;
  sku?: boolean;
  returns?: boolean;
  rating?: boolean;
}) {
  return (
    <div className="demo-row demo-row--top demo-cart-item">
      {image && <Suit size={imageSize} />}
      <span className="demo-col" style={{ flex: 1 }}>
        <strong>بدلة رمادية كلاسيكية</strong>
        <span className="demo-muted">المقاس: M · اللون: رمادي</span>
        {sku && (
          <span className="demo-noise" dir="ltr">
            SKU: GS-2291-M-GRY · Poly 65%
          </span>
        )}
        {rating && (
          <span className="demo-noise demo-icon-line">
            <Star size={11} aria-hidden /> 4.6 (312 تقييم) · الأكثر مبيعاً
          </span>
        )}
        {views && (
          <span className="demo-noise demo-icon-line">
            <Eye size={11} aria-hidden /> شاهده ٣٢١ شخصاً اليوم
          </span>
        )}
        {returns && <span className="demo-noise">الإرجاع مجاني خلال ٣٠ يوماً بشرط عدم الاستخدام والاحتفاظ بالفاتورة الأصلية.</span>}
        <span className="demo-row demo-row--flush" style={{ marginTop: 6 }}>
          <Price>$699</Price>
          <span className="demo-qty">
            <Minus size={11} aria-hidden /> 1 <Plus size={11} aria-hidden />
          </span>
        </span>
      </span>
    </div>
  );
}

function Cart({ busy }: { busy: boolean }) {
  const items = (
    <>
      <CartItem imageSize={busy ? 76 : 52} views={busy} sku={busy} returns={busy} rating={busy} />
      <CartItem imageSize={busy ? 76 : 52} views={busy} sku={busy} returns={busy} rating={busy} />
    </>
  );
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">السلة</span>
      {busy ? <Mark note="هذه سلة شراء، لا صفحة منتج">{items}</Mark> : items}
      <div className="demo-row demo-total">
        <span>الإجمالي (٢ قطعة)</span>
        <Price>$1,398</Price>
      </div>
      <div style={{ marginTop: 12 }}>
        <Btn variant="dark" full>
          إتمام الشراء
        </Btn>
      </div>
    </DemoCard>
  );
}

function Checkout({ clean }: { clean: boolean }) {
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">الدفع</span>
      {!clean && (
        <div className="demo-banner">
          <strong>عرض خاص!</strong> اشترك في النشرة واحصل على خصم ٥٪ على طلبك القادم
        </div>
      )}
      <div className="demo-summary">
        <span className="demo-row demo-row--flush">
          <span className="demo-muted">التوصيل إلى</span>
          <span>جدة، حي الروضة</span>
        </span>
        <span className="demo-row demo-row--flush">
          <span className="demo-muted">الإجمالي</span>
          <Price>$1,398</Price>
        </span>
      </div>
      {!clean && (
        <div className="demo-extras">
          {["تابعنا على إنستغرام", "قيّم تجربتك", "ادعُ صديقاً", "الأسئلة الشائعة"].map((t) => (
            <span key={t} className="demo-mini-stat">
              {t}
            </span>
          ))}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <Btn variant="dark" full>
          ادفع الآن
        </Btn>
      </div>
    </DemoCard>
  );
}

function CheckoutScene() {
  return (
    <DemoCard className="demo-narrow">
      <Hotspot id="title" label="عنوان الشاشة">
        <span className="demo-h">تأكيد الطلب</span>
      </Hotspot>
      <Hotspot id="address" label="عنوان التوصيل">
        <span className="demo-row demo-row--flush" style={{ paddingBlock: 6 }}>
          <span className="demo-icon-line">
            <MapPin size={13} aria-hidden /> جدة، حي الروضة
          </span>
          <span className="demo-link">تغيير</span>
        </span>
      </Hotspot>
      <Hotspot id="app" label="إعلان تحميل التطبيق">
        <span className="demo-banner demo-banner--app">
          <Smartphone size={16} aria-hidden />
          <span>
            <strong>حمّل تطبيقنا!</strong> تجربة أسرع وإشعارات بالعروض
          </span>
          <span className="demo-store">App Store</span>
        </span>
      </Hotspot>
      <Hotspot id="total" label="الإجمالي">
        <span className="demo-row demo-total">
          <span>الإجمالي</span>
          <Price>$1,398</Price>
        </span>
      </Hotspot>
      <Hotspot id="pay" label="زر تأكيد الدفع">
        <span style={{ display: "block", marginTop: 12 }}>
          <Btn variant="dark" full>
            تأكيد ودفع
          </Btn>
        </span>
      </Hotspot>
    </DemoCard>
  );
}

export const simplicity: StageContent = {
  slug: "simplicity",
  intro: (
    <p>
      البساطة لا تعني الفراغ ولا الشكل البسيط؛ تعني أن تبقى على الشاشة العناصر التي تخدم ما جاء المستخدم ليفعله الآن — وأن يرحل الباقي. كل زر
      إضافي، كل سطر، كل صورة، يأخذ جزءاً صغيراً من انتباه محدود. والشاشة البسيطة ليست أسهل في التصميم؛ هي نتيجة قرارات حذف صعبة.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "budget",
      heading: "الانتباه ميزانية محدودة",
      body: (
        <>
          <p>
            في شاشة السلة، المستخدم يراجع ما اختاره قبل أن يدفع. عدد المشاهدات، رمز المنتج، تفاصيل سياسة الإرجاع — كلها معلومات صحيحة، لكنها في
            المكان الخطأ. هنا تحوّل السلة إلى صفحة منتج مزدحمة وتؤخر القرار.
          </p>
          <p>اسأل عن كل عنصر: هل يساعد المستخدم على إتمام <strong>هذه</strong> المهمة؟ إن لم يكن، انقله إلى مكانه أو احذفه.</p>
        </>
      ),
      example: { bad: <Cart busy />, good: <Cart busy={false} />, caption: "نفس المنتجات ونفس الزر — الفرق فيما قررنا ألا نعرضه." },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "checkout-clutter",
        prompt: "المستخدم على بُعد نقرة من الدفع. أي شاشة تساعده أكثر؟",
        options: { a: <Checkout clean={false} />, b: <Checkout clean /> },
        correct: "b",
        hint: "ما الذي يحتاجه المستخدم ليضغط «ادفع» بثقة؟ وما الذي يلهيه عنه؟",
        explain: "في (ب) لا يوجد سوى العنوان والإجمالي والزر. العرض الترويجي والروابط في (أ) قد تكون مفيدة في مكان آخر، لكنها هنا تسرق لحظة القرار.",
      },
    },
    {
      type: "lesson",
      id: "important",
      heading: "افهم ما يهم المستخدم أولاً",
      body: (
        <p>
          البساطة تبدأ قبل التصميم: من يستخدم هذه الشاشة؟ ما المهمة الواحدة التي جاء لينجزها؟ حين تعرف الإجابة يصبح الحذف سهلاً. وحين لا تعرفها،
          ستضيف كل شيء «احتياطاً» — وهكذا تولد الواجهات المزدحمة.
        </p>
      ),
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "checkout-banner",
        prompt: "في شاشة تأكيد الطلب عنصر لا علاقة له بالمهمة. انقر عليه.",
        scene: <CheckoutScene />,
        target: "app",
        misses: {
          title: "العنوان يخبر المستخدم أين هو — ضروري.",
          address: "عنوان التوصيل جزء من التأكيد، والمستخدم يحتاج مراجعته.",
          total: "الإجمالي هو آخر ما يراجعه المستخدم قبل الدفع.",
          pay: "هذا هو هدف الشاشة نفسه.",
        },
        explain: "إعلان تحميل التطبيق يقطع المستخدم في أحرج لحظة. مكانه بعد إتمام الطلب، في صفحة الشكر — حين يكون المستخدم راضياً ومتفرغاً.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-cart-item",
        prompt: "هذا عنصر في سلة الشراء. أبقِ فقط ما يحتاجه المستخدم ليراجع طلبه ويدفع.",
        controls: [
          { type: "toggle", key: "image", label: "صورة المنتج", initial: true },
          { type: "toggle", key: "rating", label: "التقييم وشارة «الأكثر مبيعاً»", initial: true },
          { type: "toggle", key: "views", label: "عدد المشاهدات اليوم", initial: true },
          { type: "toggle", key: "sku", label: "رمز المنتج ونسبة الخامة", initial: true },
          { type: "toggle", key: "returns", label: "نص سياسة الإرجاع كاملاً", initial: true },
        ],
        render: (v) => (
          <DemoCard className="demo-narrow">
            <span className="demo-h">السلة</span>
            <CartItem image={Boolean(v.image)} rating={Boolean(v.rating)} views={Boolean(v.views)} sku={Boolean(v.sku)} returns={Boolean(v.returns)} />
          </DemoCard>
        ),
        meter: (v) => {
          const extra = ["rating", "views", "sku", "returns"].filter((k) => v[k]).length;
          return { label: "عناصر لا تخدم المهمة", value: String(extra), ok: extra === 0 && Boolean(v.image) };
        },
        validate: (v) => {
          if (!v.image) return { ok: false, hint: "الصورة ليست زينة هنا: تساعد المستخدم على التعرف على ما اختاره بنظرة. أعدها." };
          if (v.views || v.rating) return { ok: false, hint: "التقييم والمشاهدات تُقنع بالشراء — والمستخدم اقتنع بالفعل. مكانها صفحة المنتج." };
          if (v.sku) return { ok: false, hint: "رمز المنتج ونسبة الخامة لا يحتاجهما أحد لمراجعة السلة." };
          if (v.returns) return { ok: false, hint: "سياسة الإرجاع تكفيها إشارة قصيرة أو رابط، لا فقرة كاملة في كل عنصر." };
          return { ok: true };
        },
        explain: "صورة، اسم، مقاس، سعر، كمية. هذا كل ما يحتاجه المستخدم في السلة — والباقي له مكان آخر.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما المعيار الأول لإبقاء عنصر على الشاشة؟",
          options: ["أن يكون جميلاً", "أن يخدم المهمة الحالية للمستخدم", "أن يكون جاهزاً من قبل", "أن يطلبه فريق التسويق"],
          correct: 1,
          explain: "العنصر الذي لا يخدم المهمة الحالية يأخذ من الانتباه دون أن يعطي.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "أين المكان الأنسب لإعلان «حمّل تطبيقنا»؟",
          options: ["داخل شاشة الدفع", "في صفحة الشكر بعد إتمام الطلب", "فوق زر الدفع مباشرة", "في نافذة منبثقة عند فتح السلة"],
          correct: 1,
          explain: "بعد إنجاز المهمة يكون المستخدم متفرغاً ومستعداً لسماع عرض إضافي.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "البساطة في التصميم تعني:",
          options: ["أقل عدد ممكن من الألوان", "حذف كل الصور", "إبقاء ما يحتاجه المستخدم الآن فقط", "استخدام خط واحد"],
          correct: 2,
          explain: "البساطة قرار عن المحتوى قبل أن تكون شكلاً.",
        },
      ],
    },
  ],
  keyRules: [
    "كل عنصر يأخذ من انتباه محدود — اجعله يستحق مكانه.",
    "اعرف المهمة الواحدة لكل شاشة قبل أن تصممها.",
    "المعلومة الصحيحة في المكان الخطأ تصبح ضجيجاً.",
    "انقل قبل أن تحذف: لكل معلومة مكان مناسب.",
    "لا إعلانات ولا روابط جانبية في لحظة القرار.",
  ],
};
