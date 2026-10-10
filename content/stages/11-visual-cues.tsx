import { ShoppingBasket, Bike, PackageCheck, FileText, FileImage, Film } from "lucide-react";
import type { ReactNode } from "react";
import type { StageContent } from "./types";
import { DemoCard } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const STEPS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: <ShoppingBasket size={22} aria-hidden />, title: "اطلب", text: "اختر من القائمة وأكّد طلبك." },
  { icon: <Bike size={22} aria-hidden />, title: "في الطريق", text: "يستلمه المندوب ويتجه إليك." },
  { icon: <PackageCheck size={22} aria-hidden />, title: "استلم", text: "يصل طلبك ساخناً إلى بابك." },
];

function Steps({ icons, progress, numbers, decor = false }: { icons: boolean; progress: boolean; numbers: boolean; decor?: boolean }) {
  return (
    <DemoCard className={`demo-wide ${decor ? "demo-decor" : ""}`}>
      <span className="demo-h">كيف يعمل التوصيل؟</span>
      <div className="demo-steps">
        {STEPS.map((s, i) => (
          <span key={s.title} className="demo-step">
            {icons && <span className={`demo-step-icon tone-${i}`}>{s.icon}</span>}
            {numbers && <span className="demo-step-n">الخطوة {["١", "٢", "٣"][i]}</span>}
            {progress && <span className={`demo-step-bar ${i === 0 ? "is-done" : ""}`} />}
            <strong>{s.title}</strong>
            <span className="demo-muted">{s.text}</span>
          </span>
        ))}
      </div>
    </DemoCard>
  );
}

const MAILS = [
  { from: "سارة الأحمد", subject: "نلتقي هذا الأسبوع؟", preview: "مرّ وقت طويل منذ آخر مرة…", date: "١٠ أبريل", color: "#E0447A" },
  { from: "مقهى البن", subject: "قهوتك المجانية بانتظارك", preview: "زرنا في أقرب فرع واستمتع…", date: "٧ أبريل", color: "#1E7F4A" },
  { from: "خالد يوسف", subject: "ملاحظات على التصميم", preview: "أهلاً يا فريق، أتمنى أن…", date: "٦ أبريل", color: "#5B4BDB" },
  { from: "تطبيق رحلات", subject: "خصم على رحلتك القادمة", preview: "يسعدنا أن نقدم لك…", date: "٢ أبريل", color: "#E07A2E" },
];

function Inbox({ avatars }: { avatars: boolean }) {
  const list = (
    <div className="demo-mails">
      {MAILS.map((m) => (
        <span key={m.from} className="demo-mail">
          {avatars && (
            <span className="demo-mail-avatar" style={{ background: m.color }}>
              {m.from[0]}
            </span>
          )}
          <span className="demo-col" style={{ flex: 1, minWidth: 0 }}>
            <span className="demo-row demo-row--flush">
              <strong>{m.from}</strong>
              <span className="demo-muted">{m.date}</span>
            </span>
            <span>{m.subject}</span>
            <span className="demo-muted demo-ellipsis">{m.preview}</span>
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">البريد الوارد</span>
      {avatars ? list : <Mark note="جدار من النص — من أرسل ماذا؟">{list}</Mark>}
    </DemoCard>
  );
}

function FilesScene() {
  const files = [
    { id: "doc", icon: <FileText size={18} aria-hidden />, tone: "#2B59C3", name: "عقد المشروع.pdf", meta: "٢٫٤ م.ب" },
    { id: "img", icon: <FileImage size={18} aria-hidden />, tone: "#1E7F4A", name: "غلاف الحملة.png", meta: "٨٫١ م.ب" },
    { id: "sheet", icon: null, tone: "", name: "ميزانية الربع الثالث.xlsx", meta: "٦٤٠ ك.ب" },
    { id: "video", icon: <Film size={18} aria-hidden />, tone: "#E0447A", name: "إعلان قصير.mp4", meta: "٤٢ م.ب" },
  ];
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">الملفات الأخيرة</span>
      <div className="demo-tight" style={{ marginTop: 8 }}>
        {files.map((f) => (
          <Hotspot key={f.id} id={f.id} label={`الملف ${f.name}`}>
            <span className="demo-file">
              {f.icon ? (
                <span className="demo-file-icon" style={{ color: f.tone, background: f.tone + "1a" }}>
                  {f.icon}
                </span>
              ) : (
                <span className="demo-file-icon demo-file-icon--none" />
              )}
              <span className="demo-col">
                <strong>{f.name}</strong>
                <span className="demo-muted">{f.meta}</span>
              </span>
            </span>
          </Hotspot>
        ))}
      </div>
    </DemoCard>
  );
}

export const visualCues: StageContent = {
  slug: "visual-cues",
  intro: (
    <p>
      لاحظ أن هذا المسار كله مبني على أمثلة مرئية لا على نص فقط — لأن الصورة تُفهم أسرع وتُتذكر أطول. في الواجهات، الإشارات البصرية — أيقونة،
      صورة، لون، رقم، خط تقدم — تختصر على المستخدم القراءة وتخبره بالمعنى قبل أن يصل إلى الكلمات.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "steps",
      heading: "صورة تختصر سطراً",
      body: (
        <p>
          شرح خطوات التوصيل بالنص وحده يؤدي الغرض، لكنه لا يُمسح بالعين. أضف أيقونة لكل خطوة، وترقيماً، وخطاً يوضح التقدم — فيفهم المستخدم الرحلة كلها
          بنظرة، ويقرأ التفاصيل فقط إن أراد.
        </p>
      ),
      example: {
        bad: <Steps icons={false} progress={false} numbers={false} />,
        good: <Steps icons progress numbers />,
        caption: "نفس النص تماماً — الإشارات جعلته يُفهم قبل أن يُقرأ.",
      },
    },
    {
      type: "lesson",
      id: "senders",
      heading: "الوجوه والشعارات أسرع من الأسماء",
      body: (
        <p>
          في صندوق بريد طويل، المستخدم يبحث عن مُرسل بعينه. صورة الشخص أو شعار الشركة — أو على الأقل دائرة ملونة بأول حرف — تجعل البحث بصرياً بدل أن
          يكون قراءة سطراً سطراً.
        </p>
      ),
      example: { bad: <Inbox avatars={false} />, good: <Inbox avatars /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "inbox",
        prompt: "تبحث عن رسالة من «خالد يوسف». في أي صندوق تجدها أسرع؟",
        options: { a: <Inbox avatars /> , b: <Inbox avatars={false} /> },
        correct: "a",
        hint: "هل تمسح بعينك الأسماء واحداً واحداً، أم تقفز إلى علامة مميزة؟",
        explain: "الدائرة الملونة بأول حرف في (أ) تعمل كمرساة بصرية: العين تقفز إليها مباشرة. في (ب) يجب قراءة كل اسم.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "files",
        prompt: "في قائمة الملفات هذه عنصر ينقصه إشارة يعتمد عليها المستخدم. انقر عليه.",
        scene: <FilesScene />,
        target: "sheet",
        misses: {
          doc: "ملف PDF له أيقونة ولون يميزانه.",
          img: "الصورة لها أيقونتها الخاصة.",
          video: "الفيديو مميز بأيقونته ولونه.",
        },
        explain: "ملف الميزانية بلا أيقونة، فيضطر المستخدم لقراءة الامتداد ليعرف نوعه — بينما يعرف نوع البقية من النظرة الأولى. الإشارة يجب أن تكون للجميع أو لا تكون.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-steps",
        prompt: "اجعل شرح الخطوات يُفهم بنظرة: أضف الإشارات التي تخدم الفهم، وتخلّص مما يزيّن فقط.",
        controls: [
          { type: "toggle", key: "icons", label: "أيقونة لكل خطوة", initial: false },
          { type: "toggle", key: "numbers", label: "ترقيم الخطوات", initial: false },
          { type: "toggle", key: "progress", label: "خط يوضح التقدم", initial: false },
          { type: "toggle", key: "decor", label: "خلفية مزخرفة ملونة", initial: true },
        ],
        render: (v) => <Steps icons={Boolean(v.icons)} numbers={Boolean(v.numbers)} progress={Boolean(v.progress)} decor={Boolean(v.decor)} />,
        validate: (v) => {
          if (!v.icons) return { ok: false, hint: "الأيقونات هي الإشارة الأقوى هنا: تقول «سلة، دراجة، طرد» قبل أي كلمة." };
          if (!v.progress && !v.numbers) return { ok: false, hint: "المستخدم لا يرى أن هذه رحلة متتابعة. أضف ترقيماً أو خط تقدم." };
          if (v.decor) return { ok: false, hint: "الزخرفة لا تحمل معنى، وتزاحم الإشارات المفيدة. أطفئها." };
          return { ok: true };
        },
        explain: "كل إشارة الآن تحمل معنى: ماذا يحدث، وبأي ترتيب، وأين وصلت. والزينة التي لا تقول شيئاً خرجت.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما الفائدة الأساسية للإشارات البصرية؟",
          options: ["تزيين الواجهة", "تختصر القراءة وتوصل المعنى بنظرة", "زيادة وقت البقاء في الصفحة", "تعويض ضعف النص"],
          correct: 1,
          explain: "العين تلتقط الأيقونة واللون قبل أن تقرأ الكلمة.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "مستخدمون بلا صور في صندوق البريد — ما البديل الجيد؟",
          options: ["ترك المكان فارغاً", "دائرة ملونة بأول حرف من الاسم", "أيقونة ظرف موحدة للجميع", "تكبير الاسم"],
          correct: 1,
          explain: "الحرف واللون يصنعان علامة مميزة لكل مُرسل.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "متى تصبح الإشارة البصرية ضارة؟",
          options: ["حين تكون ملونة", "حين لا تحمل معنى أو تُطبق على بعض العناصر دون الأخرى", "حين تكون صغيرة", "لا تكون ضارة أبداً"],
          correct: 1,
          explain: "الإشارة غير المتسقة أو الزخرفية تشتت بدل أن توضح.",
        },
      ],
    },
  ],
  keyRules: [
    "صورة أو أيقونة تختصر سطراً كاملاً.",
    "الخطوات المتتابعة تحتاج ترقيماً أو خط تقدم.",
    "الوجوه والشعارات والحروف الملونة أسرع من الأسماء.",
    "الإشارة تُطبق على كل العناصر المتشابهة أو لا تُطبق.",
    "الزينة التي لا تحمل معنى ليست إشارة.",
  ],
};
