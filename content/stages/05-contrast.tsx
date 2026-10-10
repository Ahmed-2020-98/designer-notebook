import type { StageContent } from "./types";
import { DemoCard, Btn } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";
import { contrastRatio, grey } from "@/lib/a11y/contrast";

/** Isolate an LTR fragment (like 4.5:1) inside an Arabic string. */
const ltr = (t: string) => `\u2066${t}\u2069`;

type Tone = { label: string; fg: string; bg: string };

const WEAK: Tone[] = [
  { label: "متوقف", fg: "#F08A8A", bg: "#FDECEC" },
  { label: "قيد التنفيذ", fg: "#F2B36B", bg: "#FFF3E3" },
  { label: "مكتمل", fg: "#7FCB98", bg: "#E9F7EE" },
];
const STRONG: Tone[] = [
  { label: "متوقف", fg: "#B42318", bg: "#FDECEC" },
  { label: "قيد التنفيذ", fg: "#93500B", bg: "#FFF3E3" },
  { label: "مكتمل", fg: "#1D6B3A", bg: "#E9F7EE" },
];
const TICKETS = ["أفكار لميزة جديدة", "تصميم الشاشة الرئيسية", "تحليل آراء المستخدمين"];

function Tickets({ strong }: { strong: boolean }) {
  const tones = strong ? STRONG : WEAK;
  const list = (
    <div className="demo-tickets">
      {TICKETS.map((t, i) => {
        const tone = tones[i];
        const ratio = contrastRatio(tone.fg, tone.bg);
        return (
          <div key={t} className="demo-ticket">
            <span className="demo-muted" dir="ltr">
              #{121 + i * 47}
            </span>
            <span className="demo-ticket-title">{t}</span>
            <span className="demo-tag" style={{ color: tone.fg, background: tone.bg }}>
              {tone.label}
            </span>
            <span className={`demo-ratio ${ratio >= 4.5 ? "is-pass" : "is-fail"}`} dir="ltr">
              {ratio.toFixed(2)}:1
            </span>
          </div>
        );
      })}
    </div>
  );
  return (
    <DemoCard className="demo-wide">
      <span className="demo-h">لوحة المهام</span>
      {strong ? list : <Mark note="الحالة بالكاد تُقرأ">{list}</Mark>}
    </DemoCard>
  );
}

function Photo({ overlay, light }: { overlay: boolean; light: boolean }) {
  return (
    <div className={`demo-photo ${light ? "is-light" : ""}`}>
      {overlay && <span className="demo-photo-overlay" />}
      <span className="demo-photo-text">
        <strong>رحلة إلى الشمال</strong>
        <small>تصوير: ليلى منصور</small>
      </span>
    </div>
  );
}

function PhotoPair({ fixed }: { fixed: boolean }) {
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-group-h">نفس البطاقة على صورتين مختلفتين</span>
      <div className="demo-photo-pair">
        <Photo overlay={fixed} light={false} />
        {fixed ? (
          <Photo overlay light />
        ) : (
          <Mark note="على صورة فاتحة يختفي النص">
            <Photo overlay={false} light />
          </Mark>
        )}
      </div>
    </DemoCard>
  );
}

function SecondaryButtons({ outlined }: { outlined: boolean }) {
  return (
    <DemoCard className="demo-narrow demo-tinted">
      <span className="demo-h">هل تريد حفظ التغييرات؟</span>
      <p className="demo-p demo-muted">ستُطبَّق الإعدادات الجديدة على كل أجهزتك.</p>
      <div className="demo-btn-row" style={{ justifyContent: "flex-start", marginTop: 12 }}>
        <Btn variant="primary">حفظ</Btn>
        {outlined ? (
          <Btn variant="outline">لاحقاً</Btn>
        ) : (
          <Mark note="أين الزر الثاني؟" inline>
            <span className="demo-btn demo-btn--ghostly">لاحقاً</span>
          </Mark>
        )}
      </div>
    </DemoCard>
  );
}

function SignupForm() {
  return (
    <DemoCard className="demo-narrow">
      <Hotspot id="title" label="عنوان النموذج">
        <span className="demo-h">أنشئ حسابك</span>
      </Hotspot>
      <Hotspot id="label" label="تسمية الحقل">
        <span className="demo-label" style={{ display: "block", marginTop: 12 }}>
          كلمة المرور
        </span>
      </Hotspot>
      <span className="demo-input" style={{ marginTop: 6 }} dir="ltr">
        ••••••••
      </span>
      <Hotspot id="hint" label="نص المساعدة تحت الحقل">
        <span className="demo-hint-faint">٨ أحرف على الأقل، وتحتوي رقماً ورمزاً</span>
      </Hotspot>
      <Hotspot id="cta" label="زر إنشاء الحساب">
        <span style={{ display: "block", marginTop: 14 }}>
          <Btn variant="primary" full>
            إنشاء الحساب
          </Btn>
        </span>
      </Hotspot>
    </DemoCard>
  );
}

function ReadableCard({ lightness }: { lightness: number }) {
  const color = grey(lightness);
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">الشعاب المرجانية</span>
      <p className="demo-p" style={{ color }}>
        الشعاب المرجانية ليست صخوراً ولا نباتات، بل مستعمرات من كائنات دقيقة تعيش متلاصقة وتبني معاً واحدة من أغنى البيئات على الأرض.
      </p>
    </DemoCard>
  );
}

export const contrast: StageContent = {
  slug: "contrast",
  intro: (
    <p>
      التباين هو الفرق بين العنصر وما حوله: بين النص وخلفيته، بين الزر والمساحة التي يجلس فيها. هو ما يجعل الشيء مقروءاً أولاً، ثم ما يوجه الانتباه
      إلى المهم. والأهم أنه مسألة وصول: ملايين المستخدمين يعانون ضعفاً في النظر أو يستخدمون هواتفهم تحت الشمس.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "readable",
      heading: "الجميل الذي لا يُقرأ ليس جميلاً",
      body: (
        <>
          <p>
            الألوان الباستيل الهادئة تبدو أنيقة في ملف التصميم، لكن حين يكون النص الوردي على خلفية وردية فاتحة، يصبح التمييز بين «متوقف» و«مكتمل»
            مهمة شاقة. المعيار المعتمد (WCAG) يطلب نسبة تباين لا تقل عن <strong>4.5:1</strong> للنص العادي.
          </p>
          <p>لا تحتاج أن تتخلى عن ألوانك: احتفظ بالخلفية الفاتحة، واجعل النص درجة أغمق بكثير من نفس اللون.</p>
        </>
      ),
      example: { bad: <Tickets strong={false} />, good: <Tickets strong />, caption: "نفس الألوان، لكن النص بدرجة أغمق. الأرقام هي نسبة التباين الفعلية." },
    },
    {
      type: "lesson",
      id: "tools",
      heading: "خمس أدوات للتباين",
      body: (
        <p>
          اللون ليس أداتك الوحيدة. <strong>الوزن</strong>: عريض مقابل عادي. <strong>الحجم</strong>: كبير مقابل صغير. <strong>الإطار</strong>: حين يتشابه
          لون العنصر مع خلفيته، يفصله إطار رفيع. <strong>الظل</strong>: يرفع العنصر عن سطحه. اجمع بينها بحساب، فزر ثانوي بلا لون ولا إطار يختفي
          تماماً.
        </p>
      ),
      example: { bad: <SecondaryButtons outlined={false} />, good: <SecondaryButtons outlined /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-text-grey",
        prompt: `النص رمادي فاتح أكثر من اللازم. اسحب المؤشر حتى يصبح مقروءاً وفق معيار WCAG — نسبة ${ltr("4.5:1")} على الأقل.`,
        controls: [{ type: "range", key: "lightness", label: "سطوع لون النص", min: 0, max: 90, step: 1, unit: "%", initial: 78 }],
        render: (v) => <ReadableCard lightness={Number(v.lightness)} />,
        meter: (v) => {
          const r = contrastRatio(grey(Number(v.lightness)), "#ffffff");
          return { label: "نسبة التباين مع الأبيض", value: `${r.toFixed(2)}:1`, ok: r >= 4.5 };
        },
        validate: (v) => {
          const r = contrastRatio(grey(Number(v.lightness)), "#ffffff");
          if (r < 4.5) return { ok: false, hint: `النسبة الآن ${ltr(r.toFixed(2) + ":1")} — أقل من ${ltr("4.5:1")}. اجعل النص أغمق.` };
          if (Number(v.lightness) < 8) return { ok: false, hint: "أسود تماماً على أبيض قاسٍ على العين. اترك النص رمادياً داكناً لا أسود خالصاً." };
          return { ok: true };
        },
        explain: "مقروء ومريح: رمادي داكن بتباين كافٍ، دون قسوة الأسود الخالص على الأبيض.",
      },
    },
    {
      type: "lesson",
      id: "images",
      heading: "النص فوق الصور",
      body: (
        <p>
          نص أبيض فوق صورة داكنة يبدو رائعاً — حتى تُستبدل الصورة بأخرى فاتحة. المكوّن الجيد يعمل مع أي صورة. الحل: طبقة متدرجة داكنة خلف النص، أو
          ضبابية خلفه، أو وضع النص في شريط بخلفية ثابتة.
        </p>
      ),
      example: { bad: <PhotoPair fixed={false} />, good: <PhotoPair fixed />, caption: "الطبقة المتدرجة تضمن قراءة النص مهما تغيرت الصورة." },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "photo-cards",
        prompt: "سيستخدم فريق المحتوى هذه البطاقة مع مئات الصور المختلفة. أي تصميم أضمن؟",
        options: {
          a: (
            <DemoCard className="demo-narrow">
              <Photo overlay={false} light />
            </DemoCard>
          ),
          b: (
            <DemoCard className="demo-narrow">
              <Photo overlay light />
            </DemoCard>
          ),
        },
        correct: "b",
        hint: "تخيّل الصورة أفتح ما يمكن. أي نص سيبقى مقروءاً؟",
        explain: "الطبقة المتدرجة في (ب) تحمي النص مهما كانت الصورة. في (أ) النجاح يعتمد على حظ اختيار صورة داكنة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "signup-hint",
        prompt: "في هذا النموذج معلومة مهمة لن يراها كثير من المستخدمين. انقر عليها.",
        scene: <SignupForm />,
        target: "hint",
        misses: {
          title: "العنوان داكن وواضح.",
          label: "التسمية مقروءة بتباين جيد.",
          cta: "الزر الأزرق بنص أبيض يحقق تباينًا كافياً.",
        },
        explain: `شروط كلمة المرور مكتوبة برمادي فاتح جداً (نحو ${ltr("1.6:1")}). المستخدم سيكتشفها فقط بعد أن يخطئ. المعلومة المهمة تستحق تبايناً كاملاً.`,
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما أقل نسبة تباين يطلبها معيار WCAG (مستوى AA) للنص العادي؟",
          options: ["2:1", "3:1", "4.5:1", "10:1"],
          correct: 2,
          explain: `${ltr("4.5:1")} للنص العادي، و${ltr("3:1")} للنص الكبير جداً والعناصر الرسومية.`,
        },
        {
          kind: "quiz",
          id: "q2",
          question: "زر ثانوي بلا خلفية ولا إطار على خلفية رمادية فاتحة. ما الحل الأبسط؟",
          options: ["تكبير النص فقط", "إضافة إطار رفيع واضح", "تغييره إلى أحمر", "حذفه"],
          correct: 1,
          explain: "الإطار يفصل الزر عن خلفيته ويبقيه ثانوياً دون أن ينافس الزر الأساسي.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "كيف تضمن قراءة نص أبيض فوق صور متغيرة؟",
          options: ["تختار صوراً داكنة دائماً", "طبقة متدرجة داكنة أو ضبابية خلف النص", "تكبير الخط", "تقليل عدد الكلمات"],
          correct: 1,
          explain: "الطبقة تجعل النتيجة مستقلة عن الصورة — المكوّن يعمل مع أي محتوى.",
        },
      ],
    },
  ],
  keyRules: [
    `نسبة ${ltr("4.5:1")} على الأقل لأي نص يجب أن يُقرأ.`,
    "احتفظ بالخلفية الفاتحة وأغمق النص من نفس اللون.",
    "اللون ليس وحده: الوزن والحجم والإطار والظل أدوات تباين.",
    "النص فوق الصور يحتاج طبقة تحميه من أي صورة.",
    "المعلومة المهمة لا تُكتب أبداً برمادي باهت.",
  ],
};
