import { Music, Search, Play } from "lucide-react";
import type { StageContent } from "./types";
import { DemoCard } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const FONTS = {
  display: "var(--font-display-stack)",
  body: "var(--font-body-stack)",
  hand: "var(--font-hand-stack)",
  serif: "'Times New Roman', 'Noto Naskh Arabic', serif",
};

function MusicCard({ mixed }: { mixed: boolean }) {
  const f = (k: keyof typeof FONTS) => (mixed ? FONTS[k] : FONTS.body);
  const tracks = ["أبراج من ضوء", "مدينة رقمية", "هدوء الليل", "إيقاع المستقبل"];
  const body = (
    <>
      <div className="demo-row demo-row--flush">
        <span style={{ fontFamily: f("display"), fontWeight: 800, fontSize: 18 }}>
          <Music size={14} aria-hidden /> موسيقى
        </span>
        <Search size={14} aria-hidden />
      </div>
      <span className="demo-muted" style={{ fontFamily: f("hand") }}>
        إصدار خاص
      </span>
      <div className="demo-tracks">
        {tracks.map((t, i) => (
          <span key={t} className="demo-track">
            <span className={`demo-track-art art-${i}`}>
              <Play size={12} aria-hidden />
            </span>
            <strong style={{ fontFamily: i % 2 ? f("serif") : f("body") }}>{t}</strong>
          </span>
        ))}
      </div>
      <span className="demo-dark-btn" style={{ fontFamily: f("display"), letterSpacing: mixed ? 2 : 0 }}>
        اكتشف المزيد
      </span>
    </>
  );
  return <DemoCard className="demo-narrow">{mixed ? <Mark note="أربعة خطوط في بطاقة واحدة">{body}</Mark> : body}</DemoCard>;
}

const LONG =
  "يحب الناس الكلاب لأسباب كثيرة، أولها الوفاء الذي لا يتغير، ثم الفرح الصافي الذي تجلبه إلى البيت. صحبتها ترفع المزاج، ولعبها يملأ اليوم بالحركة، وولاؤها يلهم أصحابها. ولها فوائد عملية أيضاً: تُدرَّب لمساعدة ضعاف البصر، وتشارك في البحث والإنقاذ، وتعمل رفيقاً علاجياً في المستشفيات.";

function Article({ narrow, lh = 1.75, size = 13.5, mark = false }: { narrow: boolean; lh?: number; size?: number; mark?: boolean }) {
  const p = (
    <p className="demo-p" style={{ maxWidth: narrow ? "32em" : "none", lineHeight: lh, fontSize: size, color: "#333" }}>
      {LONG}
    </p>
  );
  return (
    <DemoCard className={narrow ? "demo-narrow" : "demo-article-wide"}>
      <span className="demo-h">لماذا يحب الناس الكلاب؟</span>
      {mark ? <Mark note="سطر طويل — تضيع العين في العودة">{p}</Mark> : p}
    </DemoCard>
  );
}

function CoffeeCard({ lh, mark = false }: { lh: number; mark?: boolean }) {
  const p = (
    <p className="demo-p" style={{ lineHeight: lh, color: "#444" }}>
      القهوة أكثر من مشروب؛ إنها طقس يومي لكثيرين. كوب دافئ يوقظ الصباح، ويرافق العمل، ويجمع الأصدقاء على حديث طويل.
    </p>
  );
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">سحر القهوة</span>
      {mark ? <Mark note="أسطر مضغوطة فوق بعضها">{p}</Mark> : p}
    </DemoCard>
  );
}

function WatchCard({ hierarchy }: { hierarchy: boolean }) {
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-watch" aria-hidden />
      <span style={{ display: "block", fontWeight: hierarchy ? 800 : 400, fontSize: hierarchy ? 20 : 13, lineHeight: 1.3, color: hierarchy ? "#16213E" : "#555", marginTop: 8 }}>
        أناقة لا تنتهي
      </span>
      <p className="demo-p" style={{ color: "#555", fontSize: 13 }}>
        إصدار محدود من ساعة تجمع بين الدقة والجمال — قطعة تعبّر عن صاحبها.
      </p>
    </DemoCard>
  );
}

function ReefScene() {
  return (
    <DemoCard className="demo-narrow" style={{ padding: 0, overflow: "hidden" }}>
      <span className="demo-reef" aria-hidden />
      <div style={{ padding: 14 }}>
        <Hotspot id="title" label="العنوان">
          <span className="demo-h">الشعاب المرجانية مدهشة</span>
        </Hotspot>
        <Hotspot id="body" label="الفقرة">
          <p className="demo-p" style={{ fontWeight: 200, color: "#8a8a8a", letterSpacing: 0.2 }}>
            ليست صخوراً ولا نباتات، بل كائنات دقيقة تعيش متلاصقة وتبني معاً واحدة من أغنى البيئات البحرية.
          </p>
        </Hotspot>
        <Hotspot id="link" label="رابط اقرأ المزيد">
          <span className="demo-link demo-block" style={{ marginTop: 8 }}>
            اقرأ المزيد
          </span>
        </Hotspot>
      </div>
    </DemoCard>
  );
}

export const typography: StageContent = {
  slug: "typography",
  intro: (
    <p>
      الخط هو صوت الواجهة. نفس الجملة تُقرأ رسمية أو ودودة أو فاخرة بحسب خطها. لكن قبل الجمال تأتي القراءة: حجم مريح، أسطر بطول معقول، مسافات
      تتنفس، وتباين واضح. الطباعة الجيدة لا يلاحظها أحد — يلاحظ الجميع الطباعة السيئة.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "fonts",
      heading: "خطّان على الأكثر",
      body: (
        <>
          <p>
            كل خط إضافي يضيف صوتاً جديداً، وبعد الخط الثاني تتحول الواجهة إلى حوار بين أصوات لا تعرف بعضها. الأسلم: <strong>خط واحد متعدد الأوزان</strong>
            ، تبني التسلسل فيه بالحجم والوزن. وإن أردت التنويع، فخط للعناوين وآخر للنص — وهذا هو الحد.
          </p>
          <p>واختر خطاً يناسب طبيعة المنتج: الخطوط الهندسية الحديثة للتقنية، والنسخية الكلاسيكية للقانون والثقافة، والودودة للتعليم والأطفال.</p>
        </>
      ),
      example: { bad: <MusicCard mixed />, good: <MusicCard mixed={false} />, caption: "خط واحد بأوزان مختلفة يبني تسلسلاً واضحاً ونظيفاً." },
    },
    {
      type: "lesson",
      id: "length",
      heading: "طول السطر: بين ٤٥ و٧٥ حرفاً",
      body: (
        <p>
          حين يمتد السطر على عرض الشاشة كلها، تقطع العين مسافة طويلة ثم تبحث عن بداية السطر التالي — فتتعب وتفقد مكانها. النطاق المريح على الشاشات
          الكبيرة بين ٤٥ و٧٥ حرفاً في السطر، وعلى الجوال بين ٣٠ و٤٠. لا تحتاج أن تعدّ الحروف: حدد عرضاً أقصى لفقرات النص، وانتهى الأمر.
        </p>
      ),
      example: { bad: <Article narrow={false} mark />, good: <Article narrow />, caption: "نفس الفقرة، بعرض أقصى يناسب القراءة." },
    },
    {
      type: "lesson",
      id: "line-height",
      heading: "ارتفاع السطر سلاحك السري",
      body: (
        <p>
          للنص العادي، اجعل ارتفاع السطر بين <strong>١٫٥ و١٫٦</strong> من حجم الخط — والعربية تحب أكثر قليلاً لأن حروفها تمتد للأعلى والأسفل. أما العناوين
          الكبيرة فتحتاج ارتفاعاً أقل (نحو ١٫٢–١٫٣) حتى لا تتفكك. القاعدة: كلما كبر الخط صغر ارتفاع السطر، والعكس.
        </p>
      ),
      example: { bad: <CoffeeCard lh={1.05} mark />, good: <CoffeeCard lh={1.8} /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "watch-hierarchy",
        prompt: "بطاقتان لإعلان ساعة. أيّهما تخبرك فوراً بما هو مهم؟",
        options: { a: <WatchCard hierarchy={false} />, b: <WatchCard hierarchy /> },
        correct: "b",
        hint: "هل تستطيع التمييز بين العنوان والوصف دون أن تقرأ؟",
        explain: "في (ب) العنوان أكبر وأثقل وأغمق — ثلاث إشارات تقول «ابدأ هنا». في (أ) العنوان بحجم النص ووزنه فيضيع.",
      },
    },
    {
      type: "lesson",
      id: "weight-color",
      heading: "الوزن واللون يرتبان النص",
      body: (
        <p>
          العناوين بأوزان ثقيلة (عريض أو شبه عريض)، والفقرات بوزن عادي. العناوين بلون أغمق، والنص المساند برمادي داكن. وتجنب الأسود الخالص على الأبيض
          الخالص — حبر داكن مثل <span dir="ltr">#1A1A1A</span> أريح للعين. وتجنب الأوزان الرفيعة جداً (Thin / ExtraLight) في النصوص: تبدو أنيقة في التصميم
          وتختفي على الشاشات الصغيرة.
        </p>
      ),
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "reef-scene",
        prompt: "في هذه البطاقة نص سيصعب على كثيرين قراءته. انقر عليه.",
        scene: <ReefScene />,
        target: "body",
        misses: {
          title: "العنوان بوزن ثقيل ولون داكن — واضح.",
          link: "الرابط بلون مميز ومسطّر — مفهوم.",
        },
        explain: "الفقرة مكتوبة بوزن رفيع جداً ولون رمادي فاتح. اجتماع الاثنين يجعل الحروف تذوب في الخلفية، خاصة على الشاشات الصغيرة وتحت الإضاءة القوية.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-type",
        prompt: "اضبط النص ليكون مريحاً للقراءة: حجم مناسب، وارتفاع سطر يترك للحروف مساحتها.",
        controls: [
          { type: "range", key: "size", label: "حجم الخط", min: 9, max: 24, step: 1, unit: "px", initial: 10 },
          { type: "range", key: "lh", label: "ارتفاع السطر", min: 1, max: 2.4, step: 0.1, unit: "×", initial: 1.1 },
        ],
        render: (v) => <Article narrow size={Number(v.size)} lh={Number(v.lh)} />,
        meter: (v) => {
          const ok = Number(v.size) >= 14 && Number(v.size) <= 18 && Number(v.lh) >= 1.5 && Number(v.lh) <= 1.9;
          return { label: "الحجم / الارتفاع", value: `${v.size}px / ${Number(v.lh).toFixed(1)}`, ok };
        },
        validate: (v) => {
          const size = Number(v.size);
          const lh = Number(v.lh);
          if (size < 14) return { ok: false, hint: "الخط صغير جداً للقراءة المريحة. ابدأ من ١٤ بكسل على الأقل — والمعيار الذهبي ١٦." };
          if (size > 18) return { ok: false, hint: "هذا حجم عنوان، لا فقرة. أعده بين ١٤ و١٨." };
          if (lh < 1.5) return { ok: false, hint: "الأسطر متلاصقة. ارفع ارتفاع السطر إلى ١٫٥ على الأقل." };
          if (lh > 1.9) return { ok: false, hint: "الأسطر متباعدة حتى صارت كأنها تطفو. خفّضه قليلاً." };
          return { ok: true };
        },
        explain: "حجم مقروء وارتفاع سطر مريح — النص يُقرأ بلا جهد، وهذا كل المطلوب من الطباعة الجيدة.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "كم خطاً يُنصح باستخدامه في واجهة واحدة؟",
          options: ["خط واحد أو اثنان على الأكثر", "ثلاثة: عنوان ونص وأزرار", "خط لكل قسم", "لا يهم العدد"],
          correct: 0,
          explain: "خط واحد بأوزانه يكفي غالباً، واثنان كحد أقصى.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "ما طول السطر المريح على شاشة كبيرة؟",
          options: ["٢٠–٣٠ حرفاً", "٤٥–٧٥ حرفاً", "١٠٠–١٢٠ حرفاً", "عرض الشاشة كاملاً"],
          correct: 1,
          explain: "هذا النطاق يوازن بين الإيقاع وسهولة العودة لبداية السطر.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "ما العلاقة الصحيحة بين حجم الخط وارتفاع السطر؟",
          options: ["كلما كبر الخط زاد ارتفاع السطر", "كلما كبر الخط قلّ ارتفاع السطر", "ثابت دائماً ٢", "لا علاقة بينهما"],
          correct: 1,
          explain: "العناوين الكبيرة بارتفاع ١٫٢–١٫٣، والفقرات بنحو ١٫٥–١٫٦ أو أكثر قليلاً للعربية.",
        },
      ],
    },
  ],
  keyRules: [
    "خط واحد بأوزانه، أو اثنان كحد أقصى.",
    "سطر النص بين ٤٥ و٧٥ حرفاً (٣٠–٤٠ على الجوال).",
    "ارتفاع السطر ١٫٥–١٫٦ للنص، وأقل للعناوين.",
    "١٦ بكسل للنص الأساسي، ولا شيء أقل من ١٢.",
    "عناوين أثقل وأغمق، ولا أوزان رفيعة جداً في الفقرات.",
  ],
};
