import { Shield, Lightbulb, Wind, Flame, Footprints, Clock, Heart, Droplets, Moon, Activity } from "lucide-react";
import type { ReactNode } from "react";
import type { StageContent } from "./types";
import { DemoCard, Btn, Toggle } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const DEVICES: { icon: ReactNode; label: string; on: boolean }[] = [
  { icon: <Shield size={18} aria-hidden />, label: "نظام الأمان", on: true },
  { icon: <Lightbulb size={18} aria-hidden />, label: "الإضاءة", on: false },
  { icon: <Wind size={18} aria-hidden />, label: "التكييف", on: true },
];

function SmartHome({ labels, state, extras = false, mark = false }: { labels: boolean; state: boolean; extras?: boolean; mark?: boolean }) {
  const tiles = (
    <div className="demo-tiles">
      {DEVICES.map((d) => (
        <div key={d.label} className="demo-tile">
          <span className="demo-tile-icon">{d.icon}</span>
          {labels && <span className="demo-tile-label">{d.label}</span>}
          {state && <span className={`demo-tile-state ${d.on ? "is-on" : ""}`}>{d.on ? "يعمل" : "متوقف"}</span>}
          <Toggle on={d.on} />
        </div>
      ))}
    </div>
  );
  return (
    <DemoCard>
      <span className="demo-h">المنزل الذكي</span>
      {mark ? <Mark note="ماذا يشغّل كل مفتاح؟">{tiles}</Mark> : tiles}
      {extras && (
        <div className="demo-extras">
          {["٢٢° داخل", "٣٤° خارج", "رطوبة ٤٥٪", "استهلاك ١٢ ك.و", "٣ أجهزة متصلة", "آخر تحديث ٢د"].map((t) => (
            <span key={t} className="demo-mini-stat">
              {t}
            </span>
          ))}
        </div>
      )}
    </DemoCard>
  );
}

function Dashboard({ focused }: { focused: boolean }) {
  if (focused) {
    return (
      <DemoCard className="demo-dash demo-dash--focus">
        <span className="demo-muted">اليوم</span>
        <div className="demo-ring" aria-hidden>
          <span dir="ltr">652</span>
          <small>سعرة محروقة</small>
        </div>
        <div className="demo-stat-row">
          <span>
            <Footprints size={14} aria-hidden />
            <strong dir="ltr">6,540</strong>
            خطوة
          </span>
          <span>
            <Clock size={14} aria-hidden />
            <strong dir="ltr">45</strong>
            دقيقة
          </span>
          <span>
            <Heart size={14} aria-hidden />
            <strong dir="ltr">72</strong>
            نبضة
          </span>
        </div>
      </DemoCard>
    );
  }
  const stats: [ReactNode, string, string][] = [
    [<Flame key="f" size={12} />, "652", "سعرة"],
    [<Footprints key="s" size={12} />, "6540", "خطوة"],
    [<Clock key="c" size={12} />, "45", "دقيقة"],
    [<Heart key="h" size={12} />, "72", "نبضة"],
    [<Droplets key="d" size={12} />, "1.2", "لتر"],
    [<Moon key="m" size={12} />, "6.5", "نوم"],
    [<Activity key="a" size={12} />, "3/5", "عادات"],
    [<Flame key="f2" size={12} />, "12", "سلسلة"],
    [<Clock key="c2" size={12} />, "19%", "إنجاز"],
  ];
  return (
    <DemoCard className="demo-dash">
      <span className="demo-h">لوحة العادات — آخر ٣٠ يوماً</span>
      <Mark note="من أين أبدأ؟">
        <div className="demo-dash-grid">
          {stats.map(([icon, v, l], i) => (
            <span key={i} className="demo-dash-cell">
              {icon}
              <strong dir="ltr">{v}</strong>
              <small>{l}</small>
            </span>
          ))}
        </div>
      </Mark>
      <div className="demo-btn-row demo-btn-row--wrap">
        {["أضف عادة", "تتبّع", "مزاج", "إنتاجية"].map((b) => (
          <Btn key={b} variant="loud" small>
            {b}
          </Btn>
        ))}
      </div>
    </DemoCard>
  );
}

function ErrorMessage({ clear }: { clear: boolean }) {
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-label">كلمة المرور</span>
      <span className={`demo-input demo-input--error`} style={{ marginTop: 6 }} dir="ltr">
        ••••
      </span>
      {clear ? (
        <span className="demo-error">كلمة المرور قصيرة — استخدم ٨ أحرف على الأقل.</span>
      ) : (
        <span className="demo-error" dir="ltr">
          Error 0x80042: invalid input
        </span>
      )}
      <span style={{ display: "block", marginTop: 12 }}>
        <Btn variant="primary" full>
          إنشاء الحساب
        </Btn>
      </span>
    </DemoCard>
  );
}

function RemoveList({ inverted }: { inverted: boolean }) {
  const items = ["توت", "مانجو", "فستق", "كيوي"];
  const checked = inverted ? [true, false, true, false] : [false, true, false, true];
  const heading = <span className="demo-h">{inverted ? "ألغِ تحديد العناصر التي تريد حذفها" : "حدّد العناصر التي تريد حذفها"}</span>;
  return (
    <DemoCard className="demo-narrow">
      {inverted ? <Mark note="عكس ما يتوقعه أي شخص">{heading}</Mark> : heading}
      <div className="demo-checks">
        {items.map((it, i) => (
          <span key={it} className="demo-check-row">
            <span className={`demo-check ${checked[i] ? "is-checked" : ""}`} aria-hidden />
            {it}
          </span>
        ))}
      </div>
      <Btn variant="primary" full>
        {inverted ? "حفظ" : "حذف العنصرين"}
      </Btn>
    </DemoCard>
  );
}

function CancelDialog() {
  return (
    <DemoCard className="demo-dialog">
      <Hotspot id="title" label="عنوان النافذة">
        <span className="demo-h">إلغاء الاشتراك الشهري</span>
      </Hotspot>
      <Hotspot id="body" label="نص الشرح">
        <p className="demo-p demo-muted">سيبقى حسابك فعّالاً حتى نهاية الفترة المدفوعة، ثم يتحول إلى الخطة المجانية.</p>
      </Hotspot>
      <Hotspot id="checkbox" label="خانة الاختيار">
        <span className="demo-check-row">
          <span className="demo-check" aria-hidden />
          لا تمتنع عن عدم إرسال العروض إليّ
        </span>
      </Hotspot>
      <div className="demo-dialog-actions">
        <Hotspot id="back" label="زر التراجع">
          <Btn variant="soft">تراجع</Btn>
        </Hotspot>
        <Hotspot id="confirm" label="زر تأكيد الإلغاء">
          <Btn variant="dark">تأكيد الإلغاء</Btn>
        </Hotspot>
      </div>
    </DemoCard>
  );
}

export const clarity: StageContent = {
  slug: "clarity",
  intro: (
    <p>
      الوضوح يعني أن يفهم المستخدم ماذا يرى، وماذا يستطيع أن يفعل، وماذا سيحدث بعدها — من غير أن يخمّن. والغريب أن الوضوح يضيع من طريقين متعاكسين:
      حين نحذف أكثر من اللازم، وحين نضيف أكثر من اللازم. وهناك طريق ثالث أخطر: أن تقول الواجهة شيئاً وتقصد عكسه.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "oversimplify",
      heading: "الخطأ الأول: تبسيط يحذف المعنى",
      body: (
        <p>
          البساطة جميلة، لكن حين تحذف التسميات وتكتفي بالأيقونات، تطلب من المستخدم أن يحفظ معنى كل رمز. الأيقونة المألوفة (بحث، إغلاق) تكفي وحدها؛ أما
          الأيقونات الخاصة بتطبيقك فتحتاج كلمة تشرحها. وحالة المفتاح نفسها — يعمل أم متوقف؟ — يجب أن تُقرأ، لا أن تُستنتج من لون صغير.
        </p>
      ),
      example: {
        bad: <SmartHome labels={false} state={false} mark />,
        good: <SmartHome labels state />,
      },
    },
    {
      type: "lesson",
      id: "overcomplex",
      heading: "الخطأ الثاني: تعقيد يدفن المهم",
      body: (
        <p>
          على الطرف الآخر، شاشة تعرض كل رقم وكل خيار دفعة واحدة تبدو «غنية»، لكنها ترمي على المستخدم عبء الفرز. اسأل: ما الرقم الواحد الذي جاء من أجله؟
          اجعله بطل الشاشة، وضع البقية في الخلفية أو في شاشة أخرى.
        </p>
      ),
      example: {
        bad: <Dashboard focused={false} />,
        good: <Dashboard focused />,
        caption: "تسعة أرقام بنفس الوزن وأربعة أزرار صارخة، مقابل رقم بطل وثلاثة أرقام مساندة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "error-message",
        prompt: "المستخدم كتب كلمة مرور من ٤ أحرف. أي رسالة خطأ تساعده على المتابعة؟",
        options: {
          a: <ErrorMessage clear={false} />,
          b: <ErrorMessage clear />,
        },
        correct: "b",
        hint: "هل تخبرك الرسالة ماذا حدث وماذا تفعل الآن؟",
        explain: "رسالة الخطأ الواضحة تقول ما المشكلة وكيف تُحل، بلغة المستخدم. رمز الخطأ التقني مفيد للمطوّر، لا لمن يحاول إنشاء حساب.",
      },
    },
    {
      type: "lesson",
      id: "misleading",
      heading: "الخطأ الثالث: واجهة تقول عكس ما تقصد",
      body: (
        <p>
          قد يكون التصميم متوازناً تماماً، ومع ذلك يضلل المستخدم. صياغة معكوسة مثل «ألغِ تحديد ما تريد حذفه» تخالف كل ما اعتاده الناس، فيحذفون عكس ما
          أرادوا. وأسوأ منها النفي المزدوج الذي يُستخدم أحياناً عمداً لخداع المستخدم. الوضوح يعني أن يكون الفعل المتوقع هو الفعل الحقيقي.
        </p>
      ),
      example: {
        bad: <RemoveList inverted />,
        good: <RemoveList inverted={false} />,
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "cancel-dialog",
        prompt: "هذه النافذة تبدو عادية، لكن فيها عنصراً مضللاً. انقر عليه.",
        scene: <CancelDialog />,
        target: "checkbox",
        misses: {
          title: "العنوان يقول ما يحدث بالضبط. ابحث عن صياغة تحتاج إعادة قراءة.",
          body: "النص يشرح العاقبة بوضوح — هذا جيد.",
          back: "زر «تراجع» واضح ومتوقع.",
          confirm: "زر التأكيد يقول ما سيفعله تماماً.",
        },
        explain: "«لا تمتنع عن عدم إرسال العروض» نفي مزدوج يجعل المستخدم لا يعرف هل التحديد يعني الموافقة أم الرفض. الصياغة الواضحة: «أرسلوا لي العروض» — مع ترك الخانة فارغة افتراضياً.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-smart-home",
        prompt: "لوحة المنزل الذكي هذه تعاني من الخطأين معاً. شغّل وأطفئ الخيارات حتى تصبح واضحة: تسميات مفهومة، حالة مقروءة، ولا ضجيج زائد.",
        controls: [
          { type: "toggle", key: "labels", label: "إظهار اسم كل جهاز", initial: false },
          { type: "toggle", key: "state", label: "إظهار الحالة نصاً (يعمل / متوقف)", initial: false },
          { type: "toggle", key: "extras", label: "إظهار ٦ إحصاءات إضافية", initial: true },
        ],
        render: (v) => <SmartHome labels={Boolean(v.labels)} state={Boolean(v.state)} extras={Boolean(v.extras)} />,
        validate: (v) => {
          if (!v.labels) return { ok: false, hint: "الأيقونات وحدها لا تكفي هنا — هذه أجهزة خاصة بمنزل المستخدم. أظهر اسم كل جهاز." };
          if (!v.state) return { ok: false, hint: "هل الإضاءة تعمل الآن؟ لون المفتاح وحده لا يجيب بوضوح. اكتب الحالة نصاً." };
          if (v.extras) return { ok: false, hint: "الإحصاءات الست تزاحم ما جاء المستخدم لأجله: التحكم في أجهزته. أخفها." };
          return { ok: true };
        },
        explain: "الآن كل جهاز له اسم وحالة مقروءة، ولا شيء يزاحمه. لم تُضف أو تحذف إلا ما يخدم مهمة المستخدم — هذا هو الوضوح.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "أيقونات خاصة بالتطبيق بلا أي تسميات في شاشة الإعدادات — هذا مثال على:",
          options: ["التعقيد الزائد", "التبسيط الزائد", "التسلسل البصري الجيد", "الاتساق"],
          correct: 1,
          explain: "حُذف المعنى مع النص. التبسيط لا يعني حذف ما يحتاجه المستخدم ليفهم.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "ما المشكلة الأساسية في شاشة تعرض كل الأرقام والخيارات دفعة واحدة؟",
          options: ["تحتاج ألواناً أكثر", "عبء ذهني يجعل القرار أصعب", "تستهلك بطارية أكثر", "لا توجد مشكلة إن كانت مرتبة في شبكة"],
          correct: 1,
          explain: "كل عنصر إضافي يطالب بجزء من الانتباه. حين يتساوى كل شيء، يضيع المهم.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "صياغة «ألغِ تحديد ما تريد حذفه» مثال على:",
          options: ["تجربة مضللة", "تبسيط زائد", "رسالة خطأ واضحة", "تقارب جيد"],
          correct: 0,
          explain: "تعكس الصياغة السلوك المعتاد، فيفعل المستخدم عكس ما يريد. الواجهة يجب أن تعني ما تقول.",
        },
      ],
    },
  ],
  keyRules: [
    "الأيقونة غير المألوفة تحتاج كلمة تشرحها.",
    "الحالة تُكتب، لا تُستنتج من لون صغير.",
    "رقم بطل واحد أوضح من تسعة أرقام متساوية.",
    "رسالة الخطأ تقول ما حدث وكيف يُصلح.",
    "لا نفي مزدوج ولا صياغة معكوسة — أبداً.",
  ],
};
