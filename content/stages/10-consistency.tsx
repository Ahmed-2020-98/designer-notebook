import { User, Search, Heart, Share2, Bell, Settings } from "lucide-react";
import type { ReactNode } from "react";
import type { StageContent, FixValues } from "./types";
import { DemoCard } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

type Animal = { name: string; text: string; emoji: string; tone: string; btn: string };

const ANIMALS: Animal[] = [
  { name: "تجربة الأسد", text: "شاهد ملك الغابة عن قرب في جولة مسائية.", emoji: "أ", tone: "#F6C77B", btn: "#E07A2E" },
  { name: "تجربة فرس النهر", text: "مغامرة مائية مع أضخم سكان النهر.", emoji: "ف", tone: "#B9A8A0", btn: "#7A5C55" },
  { name: "تجربة الفيلة", text: "تعرّف على ذكاء الفيلة وروحها اللطيفة.", emoji: "ل", tone: "#B88BC9", btn: "#7D3F98" },
];

function AnimalCard({ a, imgRound, btnRound, unified, extraLines = 0 }: { a: Animal; imgRound: boolean; btnRound: boolean; unified: boolean; extraLines?: number }) {
  return (
    <div className="demo-animal">
      <span className="demo-animal-img" style={{ background: a.tone, borderRadius: imgRound ? 999 : 6 }}>
        {a.emoji}
      </span>
      <strong>{a.name}</strong>
      <span className="demo-muted">
        {a.text}
        {extraLines > 0 && " تتضمن الجولة مرشداً متخصصاً، ومشروبات، ونقطة تصوير خاصة عند الغروب."}
      </span>
      <span className="demo-animal-btns">
        <span className="demo-mini-btn demo-mini-btn--soft" style={{ borderRadius: btnRound ? 99 : 3, ...(unified ? {} : { background: a.tone + "55", color: a.btn }) }}>
          المزيد
        </span>
        <span className="demo-mini-btn" style={{ borderRadius: btnRound ? 99 : 3, background: unified ? "#1C1B22" : a.btn }}>
          احجز
        </span>
      </span>
    </div>
  );
}

function Animals({ imgRound, btnRound, unified, mark, uneven = false }: { imgRound: boolean[]; btnRound: boolean[]; unified: boolean; mark?: string; uneven?: boolean }) {
  const row = (
    <div className={`demo-animals ${uneven ? "is-uneven" : ""}`}>
      {ANIMALS.map((a, i) => (
        <AnimalCard key={a.name} a={a} imgRound={imgRound[i]} btnRound={btnRound[i]} unified={unified} extraLines={uneven && i === 1 ? 1 : 0} />
      ))}
    </div>
  );
  return mark ? <Mark note={mark}>{row}</Mark> : row;
}

const ICONS: { icon: (filled: boolean) => ReactNode; label: string; mixed: boolean }[] = [
  { icon: (f) => <User size={15} fill={f ? "currentColor" : "none"} aria-hidden />, label: "إدارة حسابك", mixed: false },
  { icon: (f) => <Search size={15} strokeWidth={f ? 3 : 2} aria-hidden />, label: "ابحث عن موسيقاك", mixed: true },
  { icon: (f) => <Heart size={15} fill={f ? "currentColor" : "none"} aria-hidden />, label: "أضف أغنية للمفضلة", mixed: true },
  { icon: () => <Share2 size={15} aria-hidden />, label: "شارك مع أصدقائك", mixed: false },
  { icon: (f) => <Bell size={f ? 19 : 15} fill={f ? "currentColor" : "none"} aria-hidden />, label: "إشعارات الأغاني الجديدة", mixed: true },
];

function IconList({ mixed }: { mixed: boolean }) {
  const list = (
    <div className="demo-tight">
      {ICONS.map((it) => (
        <span key={it.label} className="demo-icon-row">
          <span className="demo-icon-wrap">{it.icon(mixed && it.mixed)}</span>
          {it.label}
        </span>
      ))}
    </div>
  );
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">مزايا الحساب</span>
      {mixed ? <Mark note="مُفرغة، ممتلئة، عريضة، أكبر…">{list}</Mark> : list}
    </DemoCard>
  );
}

function IconScene() {
  const items = [
    { id: "user", icon: <User size={16} aria-hidden />, label: "الحساب" },
    { id: "search", icon: <Search size={16} aria-hidden />, label: "البحث" },
    { id: "heart", icon: <Heart size={16} fill="currentColor" aria-hidden />, label: "المفضلة" },
    { id: "bell", icon: <Bell size={16} aria-hidden />, label: "الإشعارات" },
    { id: "settings", icon: <Settings size={16} aria-hidden />, label: "الإعدادات" },
  ];
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">القائمة</span>
      <div className="demo-tight" style={{ marginTop: 8 }}>
        {items.map((it) => (
          <Hotspot key={it.id} id={it.id} label={`عنصر ${it.label}`}>
            <span className="demo-icon-row">
              <span className="demo-icon-wrap">{it.icon}</span>
              {it.label}
            </span>
          </Hotspot>
        ))}
      </div>
    </DemoCard>
  );
}

const consistent = (v: FixValues) => v.img === v.btn && v.colors === "one";

export const consistency: StageContent = {
  slug: "consistency",
  intro: (
    <p>
      الاتساق يعني أن ما يتشابه في الوظيفة يتشابه في الشكل. زر أساسي هنا يشبه الزر الأساسي هناك، وزوايا البطاقات بنفس الاستدارة، والأيقونات من نفس
      العائلة. المستخدم يتعلم واجهتك مرة واحدة، ثم يتوقع. وكل خروج عن التوقع يكلّفه لحظة تفكير — ويكلّفك قليلاً من ثقته.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "radius",
      heading: "زوايا بنفس الروح",
      body: (
        <p>
          صورة دائرية بجانب زر حاد الزوايا، وبطاقة ثالثة بصورة مربعة… كل قرار منفرد قد يبدو مقبولاً، لكن مجتمعة تجعل التصميم يبدو مجمّعاً من مصادر
          مختلفة. اختر لغة شكلية — مستديرة أو حادة — وطبّقها على الصور والأزرار والبطاقات.
        </p>
      ),
      example: {
        bad: <Animals imgRound={[true, false, true]} btnRound={[false, true, false]} unified mark="دوائر ومربعات وزوايا حادة معاً" />,
        good: <Animals imgRound={[true, true, true]} btnRound={[true, true, true]} unified />,
      },
    },
    {
      type: "lesson",
      id: "buttons",
      heading: "ألوان الأزرار لغة، لا زينة",
      body: (
        <p>
          إعطاء كل بطاقة لون زر يناسب صورتها يبدو إبداعياً، لكنه يربك المستخدم: هل لكل لون وظيفة مختلفة؟ اجعل للأزرار نظاماً ثابتاً — مثلاً داكن للإجراء
          الأساسي ورمادي فاتح للثانوي — في كل بطاقة وكل شاشة.
        </p>
      ),
      example: {
        bad: <Animals imgRound={[true, true, true]} btnRound={[true, true, true]} unified={false} mark="هل لكل لون معنى مختلف؟" />,
        good: <Animals imgRound={[true, true, true]} btnRound={[true, true, true]} unified />,
      },
    },
    {
      type: "lesson",
      id: "icons",
      heading: "عائلة أيقونات واحدة",
      body: (
        <p>
          خلط أيقونات مُفرغة بأخرى ممتلئة، أو أحجام وسماكات مختلفة، يجعل القائمة تبدو غير متقنة. اختر مكتبة واحدة وأسلوباً واحداً والتزم به. الاستثناء
          المقبول: حين يحمل التغيير معنى — مثل أيقونة ممتلئة للتبويب المحدد في شريط التنقل.
        </p>
      ),
      example: { bad: <IconList mixed />, good: <IconList mixed={false} /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "card-length",
        prompt: "ثلاث بطاقات بنصوص مختلفة الطول. أي نسخة تبدو أكثر ترتيباً؟",
        options: {
          a: <Animals imgRound={[true, true, true]} btnRound={[true, true, true]} unified uneven />,
          b: (
            <div className="demo-equal">
              <Animals imgRound={[true, true, true]} btnRound={[true, true, true]} unified uneven />
            </div>
          ),
        },
        correct: "b",
        hint: "انظر إلى مواضع الأزرار. هل تقع على خط واحد؟",
        explain: "في (ب) البطاقات بارتفاع واحد والأزرار مثبتة في أسفلها، فيبدو الصف منتظماً رغم اختلاف طول النصوص. في (أ) تقفز الأزرار مع كل بطاقة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "icon-scene",
        prompt: "أيقونة واحدة في هذه القائمة لا تنتمي لعائلة البقية. انقر عليها.",
        scene: <IconScene />,
        target: "heart",
        misses: {
          user: "أيقونة الحساب مُفرغة مثل أغلب القائمة.",
          search: "البحث بنفس السماكة والأسلوب.",
          bell: "الجرس مُفرغ ومتسق مع البقية.",
          settings: "الإعدادات من نفس العائلة.",
        },
        explain: "أيقونة المفضلة ممتلئة وسط أيقونات مُفرغة. بلا سبب وظيفي، يبدو هذا الاختلاف خطأً — أو يوحي بأنها محددة أو مفعّلة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-consistency",
        prompt: "وحّد لغة البطاقات الثلاث: نفس استدارة الصور والأزرار، ونظام ألوان واحد للأزرار.",
        controls: [
          {
            type: "select",
            key: "img",
            label: "شكل الصور",
            options: [
              { value: "round", label: "دائري" },
              { value: "sharp", label: "حاد الزوايا" },
            ],
            initial: "round",
          },
          {
            type: "select",
            key: "btn",
            label: "شكل الأزرار",
            options: [
              { value: "round", label: "مستدير" },
              { value: "sharp", label: "حاد الزوايا" },
            ],
            initial: "sharp",
          },
          {
            type: "select",
            key: "colors",
            label: "ألوان الأزرار",
            options: [
              { value: "each", label: "لون لكل بطاقة" },
              { value: "one", label: "نظام موحد" },
            ],
            initial: "each",
          },
        ],
        render: (v) => {
          const r = (k: string) => [v[k] === "round", v[k] === "round", v[k] === "round"];
          return <Animals imgRound={r("img")} btnRound={r("btn")} unified={v.colors === "one"} />;
        },
        meter: (v) => ({ label: "لغة واحدة؟", value: consistent(v) ? "✓" : "✗", ok: consistent(v) }),
        validate: (v) => {
          if (v.img !== v.btn) return { ok: false, hint: "الصور والأزرار تتحدثان لغتين: واحدة مستديرة وأخرى حادة. اجعلهما بنفس الروح." };
          if (v.colors !== "one") return { ok: false, hint: "كل بطاقة بلون أزرار مختلف. وحّد النظام حتى يعرف المستخدم ما يعنيه كل زر." };
          return { ok: true };
        },
        explain: "شكل واحد ونظام ألوان واحد. البطاقات الآن تبدو عائلة، والمستخدم يعرف أين يضغط دون تفكير.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "لماذا يقلل الاتساق العبء على المستخدم؟",
          options: ["لأنه يقلل الألوان", "لأنه يتعلم النمط مرة ثم يتوقعه في كل مكان", "لأنه يجعل الصفحة أخف", "لا علاقة له بالعبء"],
          correct: 1,
          explain: "التوقع الصحيح يعني قرارات أسرع وأخطاء أقل.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "متى يكون خلط أيقونات مُفرغة وممتلئة مقبولاً؟",
          options: ["دائماً للتنويع", "حين يحمل معنى، كتمييز التبويب المحدد", "حين تكون من مكتبتين", "لا يكون مقبولاً أبداً"],
          correct: 1,
          explain: "الاختلاف المقصود الذي يحمل معلومة مفيد؛ الاختلاف العشوائي ضجيج.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "بطاقات بنصوص مختلفة الطول — كيف تبقيها منتظمة؟",
          options: ["تقصّ النصوص دائماً", "ارتفاع واحد للبطاقات والزر مثبت في الأسفل", "تصغّر الخط في البطاقة الطويلة", "تحذف البطاقة الطويلة"],
          correct: 1,
          explain: "الفراغ يُترك في المنتصف، فتصطف الأزرار على خط واحد.",
        },
      ],
    },
  ],
  keyRules: [
    "ما يتشابه في الوظيفة يتشابه في الشكل.",
    "لغة شكلية واحدة: الاستدارة نفسها للصور والأزرار والبطاقات.",
    "نظام ثابت لألوان الأزرار في كل الشاشات.",
    "مكتبة أيقونات واحدة وأسلوب واحد.",
    "البطاقات المتجاورة بارتفاع واحد وأزرار على خط واحد.",
  ],
};
