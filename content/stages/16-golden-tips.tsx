import { Eye, EyeOff, X as XIcon, FolderOpen, Users, CalendarClock, Home as HomeIcon, Search, LifeBuoy } from "lucide-react";
import type { StageContent } from "./types";
import { DemoCard, Btn } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

function Otp({ boxes }: { boxes: boolean }) {
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">تحقق من بريدك</span>
      <span className="demo-muted demo-block">أرسلنا رمزاً من ٤ أرقام إلى بريدك.</span>
      {boxes ? (
        <span className="demo-otp" dir="ltr">
          {["8", "4", "1", ""].map((d, i) => (
            <span key={i} className={`demo-otp-box ${i === 3 ? "is-focus" : ""}`}>
              {d}
            </span>
          ))}
        </span>
      ) : (
        <span className="demo-input" style={{ marginTop: 12 }} dir="ltr">
          841
        </span>
      )}
      <span className="demo-block" style={{ marginTop: 12 }}>
        <Btn variant="primary" full>
          تحقق
        </Btn>
      </span>
    </DemoCard>
  );
}

function CardForm({ fitted }: { fitted: boolean }) {
  const f = (label: string, ph: string, w?: string) => (
    <span className="demo-block" style={{ marginTop: 8, width: w }}>
      <span className="demo-label">{label}</span>
      <span className="demo-input demo-input--sm" dir="ltr" style={{ lineHeight: "24px", fontSize: 11, color: "#999" }}>
        {ph}
      </span>
    </span>
  );
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">بيانات الدفع</span>
      {f("رقم البطاقة", "1234 1234 1234 1234")}
      {fitted ? (
        <span className="demo-row demo-row--flush" style={{ gap: 8, alignItems: "flex-start" }}>
          {f("تاريخ الانتهاء", "MM/YY", "50%")}
          {f("CVC", "123", "50%")}
        </span>
      ) : (
        <Mark note="٣ أرقام في حقل بعرض بطاقة">
          <span className="demo-block">
            {f("تاريخ الانتهاء", "MM/YY")}
            {f("CVC", "123")}
          </span>
        </Mark>
      )}
      {f("الاسم على البطاقة", "Name Surname")}
    </DemoCard>
  );
}

function Password({ modern }: { modern: boolean }) {
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">اختر كلمة مرور قوية</span>
      <span className="demo-label demo-block" style={{ marginTop: 10 }}>
        كلمة المرور
      </span>
      <span className="demo-amount" style={{ marginTop: 6 }}>
        <bdi dir="ltr">{modern ? "W$25Amcxw" : "•••••••••"}</bdi>
        {modern && <EyeOff size={14} style={{ marginInlineStart: "auto" }} aria-hidden />}
        {!modern && <Eye size={14} color="#bbb" style={{ marginInlineStart: "auto", visibility: "hidden" }} aria-hidden />}
      </span>
      {modern ? (
        <span className="demo-strength">
          <span className="is-on" />
          <span className="is-on" />
          <span className="is-on" />
          <span />
          <em>قوية</em>
        </span>
      ) : (
        <Mark note="خطوة إضافية وخطأ محتمل" side="bottom">
          <span className="demo-block">
            <span className="demo-label demo-block" style={{ marginTop: 10 }}>
              تأكيد كلمة المرور
            </span>
            <span className="demo-amount" style={{ marginTop: 6 }}>
              <bdi dir="ltr">•••••••••</bdi>
            </span>
          </span>
        </Mark>
      )}
      <span className="demo-block" style={{ marginTop: 14 }}>
        <Btn variant="primary" full>
          إنشاء الحساب
        </Btn>
      </span>
    </DemoCard>
  );
}

function DeleteDialog({ good, scene = false }: { good: boolean; scene?: boolean }) {
  const cancel = <Btn variant="soft">إلغاء</Btn>;
  const del = good ? <Btn variant="danger">حذف</Btn> : <Btn variant="success">حذف</Btn>;
  if (scene) {
    return (
      <DemoCard className="demo-dialog demo-dialog--dark">
        <Hotspot id="close" label="زر الإغلاق" className="demo-dialog-close">
          <XIcon size={14} aria-hidden />
        </Hotspot>
        <Hotspot id="title" label="سؤال التأكيد">
          <span className="demo-h">هل تريد حذف بياناتك؟</span>
        </Hotspot>
        <Hotspot id="note" label="تنبيه لا يمكن التراجع">
          <span className="demo-muted demo-block">لا يمكن التراجع عن هذا الإجراء.</span>
        </Hotspot>
        <div className="demo-dialog-actions">
          <Hotspot id="cancel" label="زر الإلغاء">
            {cancel}
          </Hotspot>
          <Hotspot id="delete" label="زر الحذف">
            <Btn variant="success">حذف</Btn>
          </Hotspot>
        </div>
      </DemoCard>
    );
  }
  return (
    <DemoCard className="demo-dialog demo-dialog--dark">
      <span className="demo-dialog-close">
        <XIcon size={14} aria-hidden />
      </span>
      <span className="demo-h">هل تريد حذف بياناتك؟</span>
      <span className="demo-muted demo-block">لا يمكن التراجع عن هذا الإجراء.</span>
      <div className="demo-dialog-actions" style={{ flexDirection: good ? "row" : "row-reverse", justifyContent: good ? "flex-end" : "flex-start" }}>
        {good ? (
          <>
            {cancel}
            {del}
          </>
        ) : (
          <Mark note="أخضر يقول «آمن» — وهو العكس">
            <span className="demo-btn-row">
              {del}
              {cancel}
            </span>
          </Mark>
        )}
      </div>
    </DemoCard>
  );
}

function Phone({ ctaBottom }: { ctaBottom: boolean }) {
  return (
    <span className="demo-phone">
      {!ctaBottom && (
        <span className="demo-phone-top">
          <Mark note="خارج متناول الإبهام">
            <Btn variant="dark" small>
              تسجيل الدخول
            </Btn>
          </Mark>
        </span>
      )}
      <span className="demo-phone-hero" />
      <strong>بيتك المثالي على بُعد بحث</strong>
      <span className="demo-muted">آلاف العقارات بين يديك.</span>
      <span className="demo-phone-actions">
        {ctaBottom && (
          <Btn variant="outline" full>
            تسجيل الدخول
          </Btn>
        )}
        <Btn variant="dark" full>
          إنشاء حساب
        </Btn>
      </span>
    </span>
  );
}

function EmptyState({ illustration, tips, cta }: { illustration: boolean; tips: boolean; cta: boolean }) {
  return (
    <DemoCard className="demo-narrow demo-center-text demo-empty">
      <span className="demo-row demo-row--flush">
        <span className="demo-h">المشاريع</span>
      </span>
      {illustration && (
        <span className="demo-empty-art">
          <FolderOpen size={40} aria-hidden />
        </span>
      )}
      <strong className="demo-block" style={{ marginTop: illustration ? 6 : 40 }}>
        {tips || cta ? "ابدأ بتنظيم مشاريعك في مكان واحد" : "لا توجد مشاريع!"}
      </strong>
      {tips && (
        <span className="demo-empty-tips">
          <span>
            <Users size={12} aria-hidden /> ادعُ فريقك للتعاون على المشروع
          </span>
          <span>
            <CalendarClock size={12} aria-hidden /> حدد مواعيد نهائية لتبقى على المسار
          </span>
        </span>
      )}
      {cta && (
        <span className="demo-block" style={{ marginTop: 12 }}>
          <Btn variant="danger" full>
            أنشئ مشروعاً جديداً
          </Btn>
        </span>
      )}
      {!tips && !cta && <span className="demo-block" style={{ height: 40 }} />}
    </DemoCard>
  );
}

function NotFound({ helpful }: { helpful: boolean }) {
  if (!helpful) {
    return (
      <DemoCard className="demo-narrow">
        <span className="demo-404">404</span>
        <span className="demo-block">خطأ. الرابط المطلوب غير موجود على هذا الخادم.</span>
        <Mark note="ثم ماذا؟">
          <span className="demo-muted demo-block">هذا كل ما نعرفه.</span>
        </Mark>
      </DemoCard>
    );
  }
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-404 demo-404--fun">أوبس!</span>
      <span className="demo-block">لم نجد الصفحة التي تبحث عنها — لكن لا تقلق، هذه طرق للعودة:</span>
      <span className="demo-404-links">
        <span>
          <HomeIcon size={12} aria-hidden /> الصفحة الرئيسية
        </span>
        <span>
          <Search size={12} aria-hidden /> ابحث في الموقع
        </span>
        <span>
          <LifeBuoy size={12} aria-hidden /> مركز المساعدة
        </span>
      </span>
    </DemoCard>
  );
}

export const goldenTips: StageContent = {
  slug: "golden-tips",
  intro: (
    <p>
      وصلت إلى آخر صفحة في الدفتر. هنا مجموعة نصائح عملية تظهر في كل منتج تقريباً — النماذج، كلمات المرور، نوافذ التأكيد، شاشات الجوال، الحالات
      الفارغة، وصفحات الخطأ. تفاصيل صغيرة، لكنها بالضبط ما يفرّق بين واجهة «تعمل» وواجهة يحبها الناس.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "fields",
      heading: "صمّم الحقل على مقاس ما سيُكتب فيه",
      body: (
        <p>
          شكل الحقل يخبر المستخدم بما يُتوقع منه. رمز تحقق من ٤ أرقام؟ أربعة مربعات كبيرة تجعل الإدخال واضحاً وتقلل الخطأ. رمز CVC من ٣ أرقام؟ حقل قصير
          بجوار تاريخ الانتهاء، لا حقل بعرض البطاقة. التطابق بين الحقل والمحتوى يزيل الغموض ويوفر المساحة.
        </p>
      ),
      example: { bad: <CardForm fitted={false} />, good: <CardForm fitted />, caption: "حقول بأطوال تشبه البيانات المتوقعة." },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "otp",
        prompt: "شاشة إدخال رمز تحقق من ٤ أرقام. أي تصميم أوضح وأقل عرضة للخطأ؟",
        options: { a: <Otp boxes={false} />, b: <Otp boxes /> },
        correct: "b",
        hint: "في أيهما يعرف المستخدم كم رقماً بقي عليه إدخاله؟",
        explain: "المربعات الأربعة تقول بوضوح: الرمز ٤ أرقام، وأنت عند الرقم الرابع. الحقل الواحد لا يخبرك إن نقص رقم أو زاد.",
      },
    },
    {
      type: "lesson",
      id: "password",
      heading: "وداعاً لحقل «تأكيد كلمة المرور»",
      body: (
        <p>
          حقل التأكيد يضاعف الجهد، ويُفشل التسجيل كله إن اختلف حرف، ويعطي أماناً زائفاً لأن المستخدم قد يخطئ بنفس الطريقة مرتين. البديل الحديث: زر
          <strong> إظهار/إخفاء</strong> ليتحقق المستخدم بعينه مما كتب، مع <strong>مؤشر قوة</strong> فوري يرشده لكلمة مرور أفضل.
        </p>
      ),
      example: { bad: <Password modern={false} />, good: <Password modern /> },
    },
    {
      type: "lesson",
      id: "delete",
      heading: "نوافذ الحذف: اللون والموضع",
      body: (
        <>
          <p>
            زر الحذف في نافذة تأكيد إجراء مُدمّر يكون <strong>أحمر</strong>؛ الأخضر يعني «آمن ومستحب» فيدفع المستخدم للضغط دون تفكير. وزر
            <strong> الإلغاء</strong> حاضر دائماً كشبكة أمان.
          </p>
          <p>
            والموضع: في الواجهات العربية تُقرأ الأزرار من اليمين، فيأتي «إلغاء» أولاً (يميناً) كخروج سريع، ثم «حذف» يساراً كخطوة إلى الأمام — وهو عكس
            ترتيب الواجهات الإنجليزية تماماً، لأن اتجاه «التقدم» نفسه معكوس.
          </p>
        </>
      ),
      example: { bad: <DeleteDialog good={false} />, good: <DeleteDialog good /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "delete-scene",
        prompt: "في نافذة الحذف هذه عنصر قد يدفع المستخدم لخطأ لا رجعة فيه. انقر عليه.",
        scene: <DeleteDialog good scene />,
        target: "delete",
        misses: {
          close: "زر الإغلاق مخرج إضافي آمن.",
          title: "السؤال واضح ومباشر.",
          note: "التنبيه بأن الإجراء نهائي ضروري.",
          cancel: "الإلغاء هادئ وفي مكانه الصحيح يميناً.",
        },
        explain: "زر الحذف أخضر — اللون الذي يعني «آمن، استمر». في إجراء مُدمّر، الأحمر يجعل المستخدم يتوقف لحظة قبل أن يضغط.",
      },
    },
    {
      type: "lesson",
      id: "thumb",
      heading: "صمّم لمنطقة الإبهام",
      body: (
        <p>
          أغلب الناس يمسكون الهاتف بيد واحدة ويستخدمون الإبهام. أسفل الشاشة ووسطها في المتناول، وأعلاها صعب الوصول. ضع الإجراءات الأساسية والتنقل في
          النصف السفلي، واترك الأعلى للعناوين والمعلومات.
        </p>
      ),
      example: { bad: <Phone ctaBottom={false} />, good: <Phone ctaBottom /> },
    },
    {
      type: "lesson",
      id: "empty",
      heading: "الحالة الفارغة فرصة لا طريق مسدود",
      body: (
        <p>
          «لا توجد مشاريع!» جملة صحيحة لكنها تترك المستخدم أمام جدار. الحالة الفارغة الجيدة تشرح القيمة، وتعطي خطوات عملية، وتنتهي بزر واضح لأول إجراء.
          وكذلك صفحات الخطأ 404: لا تكتفِ بإعلان الخطأ؛ قدّم روابط تعيد المستخدم إلى الطريق، وبلمسة من شخصية علامتك.
        </p>
      ),
      example: { bad: <NotFound helpful={false} />, good: <NotFound helpful /> },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-empty",
        prompt: "حوّل هذه الشاشة الفارغة من طريق مسدود إلى بداية واضحة.",
        controls: [
          { type: "toggle", key: "illustration", label: "رسم توضيحي", initial: false },
          { type: "toggle", key: "tips", label: "نصائح عملية لما يمكن فعله", initial: false },
          { type: "toggle", key: "cta", label: "زر «أنشئ مشروعاً جديداً»", initial: false },
        ],
        render: (v) => <EmptyState illustration={Boolean(v.illustration)} tips={Boolean(v.tips)} cta={Boolean(v.cta)} />,
        validate: (v) => {
          if (!v.cta) return { ok: false, hint: "المستخدم يعرف الآن أن المكان فارغ — لكن كيف يبدأ؟ أضف زراً لأول إجراء." };
          if (!v.tips) return { ok: false, hint: "أضف نصائح قصيرة تشرح ما يمكن فعله هنا وقيمته." };
          if (!v.illustration) return { ok: false, hint: "رسم بسيط يخفف قسوة الشاشة الفارغة ويجعلها ودودة. أضفه." };
          return { ok: true };
        },
        explain: "رسم يخفف الفراغ، نصائح تشرح القيمة، وزر يبدأ الرحلة. الشاشة الفارغة صارت أول خطوة في الاستخدام.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "ما البديل الأفضل لحقل «تأكيد كلمة المرور»؟",
          options: ["حقل ثالث للتأكيد مرة أخرى", "زر إظهار/إخفاء مع مؤشر قوة", "إرسال كلمة المرور بالبريد", "منع النسخ واللصق"],
          correct: 1,
          explain: "يتحقق المستخدم بعينه دون جهد إضافي أو خطأ محتمل.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "في نافذة حذف عربية، أين يُوضع زر «إلغاء»؟",
          options: ["يساراً", "يميناً، قبل زر الحذف", "تحت زر الحذف", "لا حاجة له"],
          correct: 1,
          explain: "اليمين بداية القراءة بالعربية، فيأتي الخروج الآمن أولاً، والخطوة إلى الأمام يساراً.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "أين تضع زر الإجراء الأساسي في تطبيق جوال؟",
          options: ["أعلى الشاشة", "في منطقة الإبهام أسفل الشاشة", "في قائمة جانبية", "في منتصف النص"],
          correct: 1,
          explain: "النصف السفلي في متناول الإبهام عند الإمساك بيد واحدة.",
        },
      ],
    },
  ],
  keyRules: [
    "شكل الحقل يشبه البيانات المتوقعة.",
    "إظهار/إخفاء كلمة المرور بدل حقل التأكيد.",
    "الحذف أحمر، والإلغاء حاضر — يميناً في الواجهات العربية.",
    "الإجراءات الأساسية في منطقة الإبهام.",
    "الحالات الفارغة وصفحات الخطأ تعطي طريقاً للأمام.",
  ],
};
