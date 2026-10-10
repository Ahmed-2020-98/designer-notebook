import { Send, ArrowDownToLine, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";
import type { StageContent, FixValues } from "./types";
import { DemoCard } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const PINK = "#D6246E";

function Wallet({ overused }: { overused: boolean }) {
  const accent = (on: boolean) => (overused || on ? PINK : undefined);
  const body = (
    <>
      <div className="demo-bank-card" style={{ background: `linear-gradient(135deg, ${PINK}, #8e1450)` }}>
        <span>البطاقة الرئيسية</span>
        <strong dir="ltr">$32,987.05</strong>
      </div>
      <div className="demo-btn-row" style={{ marginTop: 10 }}>
        <span className="demo-wallet-btn" style={{ background: overused ? PINK : "#f1f1f4", color: overused ? "#fff" : "#1a1a1a" }}>
          <Send size={13} aria-hidden /> إرسال
        </span>
        <span className="demo-wallet-btn" style={{ background: overused ? PINK : "#f1f1f4", color: overused ? "#fff" : "#1a1a1a" }}>
          <ArrowDownToLine size={13} aria-hidden /> طلب
        </span>
      </div>
      <div className="demo-row demo-row--flush" style={{ marginTop: 12 }}>
        <span className="demo-h" style={{ color: accent(false), fontSize: 13 }}>
          جهات الاتصال
        </span>
        <span className="demo-link" style={{ color: PINK }}>
          عرض الكل
        </span>
      </div>
      <div className="demo-avatars">
        {["س", "م", "ل", "ن"].map((c) => (
          <span key={c} className="demo-mini-avatar" style={{ background: overused ? PINK : "#e9e7ef", color: overused ? "#fff" : "#4a4458" }}>
            {c}
          </span>
        ))}
      </div>
      <div className="demo-row demo-row--flush" style={{ marginTop: 12 }}>
        <span className="demo-h" style={{ color: accent(false), fontSize: 13 }}>
          المعاملات
        </span>
        <span className="demo-link" style={{ color: PINK }}>
          عرض الكل
        </span>
      </div>
      <div className="demo-row demo-row--flush" style={{ marginTop: 6, fontSize: 12 }}>
        <span style={{ color: accent(false) }}>مقهى البن</span>
        <bdi dir="ltr" style={{ color: accent(false) }}>
          -$13.20
        </bdi>
      </div>
    </>
  );
  return <DemoCard className="demo-narrow">{overused ? <Mark note="عندما يكون كل شيء ورديًا، لا شيء مهم">{body}</Mark> : body}</DemoCard>;
}

function Portfolio({ vivid }: { vivid: boolean }) {
  return (
    <DemoCard className="demo-narrow demo-center-text" style={vivid ? { background: "#4B1FD1", color: "#fff" } : undefined}>
      <span className="demo-h">المحفظة الاستثمارية</span>
      <span className="demo-muted" style={vivid ? { color: "#cfc4ff" } : undefined}>
        توزيع أصولك حسب الفئة
      </span>
      <span className="demo-center" style={{ marginTop: 10 }}>
        <span className="demo-donut" style={{ background: `conic-gradient(#F5B301 0 25%, #29C27F 25% 40%, #FF4F8B 40% 100%)` }}>
          <span style={{ background: vivid ? "#4B1FD1" : "#fff" }}>
            <bdi dir="ltr">$129,987</bdi>
          </span>
        </span>
      </span>
      <span className="demo-legend" style={vivid ? { color: "#e4ddff" } : undefined}>
        <span>
          <i style={{ background: "#F5B301" }} /> نقد ٢٥٪
        </span>
        <span>
          <i style={{ background: "#29C27F" }} /> سندات ١٥٪
        </span>
        <span>
          <i style={{ background: "#FF4F8B" }} /> أسهم ٦٠٪
        </span>
      </span>
    </DemoCard>
  );
}

function AmountField({ icon, message, mark }: { icon: boolean; message: boolean; mark?: boolean }) {
  const field = (
    <span className="demo-amount demo-amount--error">
      <bdi dir="ltr">$ 0.01</bdi>
      <span className="demo-icon-line" style={{ marginInlineStart: "auto" }}>
        {icon && <AlertCircle size={14} color="#C0392B" aria-hidden />}
        <span className="demo-muted">USD</span>
        <ChevronDown size={12} aria-hidden />
      </span>
    </span>
  );
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-label">مبلغ البيع</span>
      <span className="demo-block" style={{ marginTop: 6 }}>
        {mark ? <Mark note="أحمر فقط — ما المشكلة؟">{field}</Mark> : field}
      </span>
      {message && (
        <span className="demo-error" dir="rtl">
          أدخل مبلغاً أكبر من <bdi dir="ltr">$1</bdi>
        </span>
      )}
    </DemoCard>
  );
}

function StatusFields({ successColor, icon, message }: { successColor: string; icon: boolean; message: boolean }) {
  const success = successColor === "green" ? "#1E7F4A" : successColor === "yellow" ? "#E0A800" : "#E0447A";
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-label">مبلغ البيع</span>
      <span className="demo-amount demo-amount--error" style={{ marginTop: 6 }}>
        <bdi dir="ltr">$ 0.01</bdi>
        <span className="demo-icon-line" style={{ marginInlineStart: "auto" }}>
          {icon && <AlertCircle size={14} color="#C0392B" aria-hidden />}
          <span className="demo-muted">USD</span>
        </span>
      </span>
      {message && (
        <span className="demo-error">
          أدخل مبلغاً أكبر من <bdi dir="ltr">$1</bdi>
        </span>
      )}
      <span className="demo-label demo-block" style={{ marginTop: 14 }}>
        البريد الإلكتروني
      </span>
      <span className="demo-amount" style={{ marginTop: 6, borderColor: success }}>
        <bdi dir="ltr">olivia@mail.com</bdi>
        <CheckCircle2 size={14} color={success} style={{ marginInlineStart: "auto" }} aria-hidden />
      </span>
    </DemoCard>
  );
}

function StatusScene() {
  return (
    <DemoCard className="demo-narrow">
      <Hotspot id="title" label="عنوان النموذج">
        <span className="demo-h">بيانات الشحن</span>
      </Hotspot>
      <Hotspot id="name" label="حقل الاسم">
        <span className="demo-block" style={{ marginTop: 10 }}>
          <span className="demo-label">الاسم</span>
          <span className="demo-amount" style={{ marginTop: 4 }}>
            ريم عادل
          </span>
        </span>
      </Hotspot>
      <Hotspot id="phone" label="حقل الهاتف مع رسالة خطأ">
        <span className="demo-block" style={{ marginTop: 10 }}>
          <span className="demo-label">الهاتف</span>
          <span className="demo-amount demo-amount--error" style={{ marginTop: 4 }}>
            <bdi dir="ltr">05</bdi>
            <AlertCircle size={14} color="#C0392B" style={{ marginInlineStart: "auto" }} aria-hidden />
          </span>
          <span className="demo-error">الرقم ناقص — ١٠ أرقام</span>
        </span>
      </Hotspot>
      <Hotspot id="email" label="حقل البريد بعد التحقق">
        <span className="demo-block" style={{ marginTop: 10 }}>
          <span className="demo-label">البريد</span>
          <span className="demo-amount" style={{ marginTop: 4, borderColor: "#D6246E", background: "#fdeef4" }}>
            <bdi dir="ltr">reem@mail.com</bdi>
            <CheckCircle2 size={14} color="#D6246E" style={{ marginInlineStart: "auto" }} aria-hidden />
          </span>
          <span className="demo-block" style={{ fontSize: 12, color: "#D6246E", marginTop: 4 }}>
            تم التحقق من البريد
          </span>
        </span>
      </Hotspot>
    </DemoCard>
  );
}

const statusOk = (v: FixValues) => v.successColor === "green" && v.icon && v.message;

export const color: StageContent = {
  slug: "color",
  intro: (
    <p>
      اللون لا يجمّل فقط؛ إنه يصنع المزاج، ويحمل هوية العلامة، ويوجه السلوك. لكن قوته في ندرته: اللون الذي يُستخدم بحساب يقول «انظر هنا»، واللون
      المستخدم في كل مكان لا يقول شيئاً. وبعض الألوان لها معانٍ اتفق عليها الناس منذ زمن — لا تُعِد اختراعها.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "less",
      heading: "اللون الأساسي يُستخدم بحساب",
      body: (
        <p>
          حين تحب لون علامتك التجارية، يغريك أن تضعه في كل مكان: الأزرار والعناوين والأيقونات والصور الرمزية. النتيجة شاشة صاخبة لا يعرف فيها المستخدم ما
          الذي يمكن الضغط عليه. احتفظ باللون الأساسي للعناصر التفاعلية والمعلومة الأهم، ودع الباقي محايداً.
        </p>
      ),
      example: { bad: <Wallet overused />, good: <Wallet overused={false} />, caption: "في النسخة الصحيحة الوردي يعني: هذا قابل للضغط أو مهم." },
    },
    {
      type: "lesson",
      id: "background",
      heading: "خلفية هادئة تُبرز المحتوى",
      body: (
        <p>
          الخلفيات المحايدة — أبيض، رمادي فاتح، بيج، أو داكن هادئ — تترك المحتوى والألوان المهمة تتنفس. الخلفية الصارخة تبدو جريئة في البداية، لكنها
          تتصادم مع الرسوم والنصوص وتُتعب العين. استخدم الخلفيات الملونة في أماكن محسوبة: شاشة ترحيب، رأس صفحة، قسم مميز. أما الوضع الداكن فخيار ممتاز
          مريح للعين — طالما بقي هادئاً ومتبايناً.
        </p>
      ),
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "portfolio-bg",
        prompt: "شاشة محفظة استثمارية برسم بياني ملوّن. أي خلفية تخدم المحتوى؟",
        options: { a: <Portfolio vivid />, b: <Portfolio vivid={false} /> },
        correct: "b",
        hint: "أين تبرز ألوان الرسم البياني أكثر، وأين تتصادم مع الخلفية؟",
        explain: "الخلفية المحايدة في (ب) تجعل ألوان الرسم البياني هي البطل. البنفسجي الصارخ في (أ) ينافسها ويقلل وضوح النصوص.",
      },
    },
    {
      type: "lesson",
      id: "not-alone",
      heading: "لا تعتمد على اللون وحده",
      body: (
        <>
          <p>
            إطار أحمر حول الحقل قد يكفيك أنت، لكنه لا يكفي من لديه ضعف في تمييز الألوان، أو من يستخدم الهاتف تحت الشمس. اجمع اللون مع إشارة أخرى:
            <strong> أيقونة تحذير</strong> و<strong>رسالة نصية</strong> تقول ما المشكلة وكيف تُحل.
          </p>
          <p>
            وحين تستخدم اللون للحالات، التزم بالمتعارف عليه: <strong>الأحمر للخطأ، الأخضر للنجاح، الأصفر للتنبيه</strong>. حتى لو كان لون علامتك وردياً،
            لا تجعل النجاح وردياً — اضبط درجات الألوان المتعارفة لتنسجم مع هويتك بدلاً من استبدالها.
          </p>
        </>
      ),
      example: { bad: <AmountField icon={false} message={false} mark />, good: <AmountField icon message /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "status-scene",
        prompt: "في هذا النموذج حالة تكسر المعنى المتعارف للألوان. انقر عليها.",
        scene: <StatusScene />,
        target: "email",
        misses: {
          title: "العنوان محايد كما ينبغي.",
          name: "حقل عادي بلا حالة — صحيح.",
          phone: "الخطأ بالأحمر مع أيقونة ورسالة — هذا هو المطلوب تماماً.",
        },
        explain: "نجاح التحقق معروض بالوردي — قريب من لون الخطأ — فيظن المستخدم لحظة أن هناك مشكلة. النجاح أخضر، دائماً.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-status",
        prompt: "اجعل الحالات مفهومة للجميع: خطأ لا يعتمد على اللون وحده، ونجاح بلونه المتعارف.",
        controls: [
          { type: "toggle", key: "icon", label: "أيقونة تحذير في حقل الخطأ", initial: false },
          { type: "toggle", key: "message", label: "رسالة نصية تشرح الخطأ", initial: false },
          {
            type: "select",
            key: "successColor",
            label: "لون حالة النجاح",
            options: [
              { value: "pink", label: "وردي (لون العلامة)" },
              { value: "yellow", label: "أصفر" },
              { value: "green", label: "أخضر" },
            ],
            initial: "pink",
          },
        ],
        render: (v) => <StatusFields successColor={String(v.successColor)} icon={Boolean(v.icon)} message={Boolean(v.message)} />,
        meter: (v) => ({ label: "مفهوم بلا ألوان؟", value: v.icon && v.message ? "✓" : "✗", ok: Boolean(statusOk(v)) }),
        validate: (v) => {
          if (!v.icon) return { ok: false, hint: "من لا يميز الأحمر لن يرى أي فرق. أضف أيقونة تحذير." };
          if (!v.message) return { ok: false, hint: "المستخدم يعرف الآن أن هناك خطأ — لكن ما هو؟ أضف رسالة تشرحه." };
          if (v.successColor !== "green") return { ok: false, hint: "النجاح بغير الأخضر يربك المستخدم. التزم بالمتعارف عليه." };
          return { ok: true };
        },
        explain: "الخطأ يُفهم باللون والأيقونة والكلمة معاً، والنجاح أخضر كما يتوقعه الجميع.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "أين يُستخدم اللون الأساسي للعلامة بشكل صحيح؟",
          options: ["في كل العناوين والأيقونات", "في العناصر التفاعلية والمعلومة الأهم", "في الخلفية دائماً", "في النصوص الطويلة"],
          correct: 1,
          explain: "ندرة اللون هي ما يجعله إشارة.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "كيف تعرض خطأ في حقل بشكل يصل للجميع؟",
          options: ["إطار أحمر فقط", "لون أحمر + أيقونة + رسالة نصية", "اهتزاز الحقل فقط", "تغيير لون الخلفية للصفحة"],
          correct: 1,
          explain: "تعدد الإشارات يضمن الفهم لمن لا يميز الألوان أيضاً.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "علامتك التجارية وردية. ما لون رسالة النجاح؟",
          options: ["وردي للانسجام", "أخضر، بدرجة تنسجم مع الهوية", "أزرق", "رمادي"],
          correct: 1,
          explain: "المعاني المتعارفة أقوى من الهوية في الحالات. عدّل الدرجة لا اللون.",
        },
      ],
    },
  ],
  keyRules: [
    "اللون الأساسي للتفاعل والأهم فقط.",
    "خلفيات محايدة، والملونة في أماكن محسوبة.",
    "لا تعتمد على اللون وحده: أضف أيقونة وكلمة.",
    "أحمر للخطأ، أخضر للنجاح، أصفر للتنبيه.",
    "عدّل درجات الألوان المتعارفة لتناسب هويتك، لا تستبدلها.",
  ],
};
