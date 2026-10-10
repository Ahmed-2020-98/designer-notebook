import { Bell, Mail, Eye, MapPin, Lock, Moon } from "lucide-react";
import type { ReactNode } from "react";
import type { StageContent } from "./types";
import { DemoCard, Btn, Toggle, FormDemo, Price } from "@/components/demo/Demo";
import { Mark } from "@/components/ui/Mark";
import { Hotspot } from "@/components/ui/Hotspot";

const SETTINGS: { icon: ReactNode; label: string; on: boolean }[] = [
  { icon: <Bell size={14} aria-hidden />, label: "إشعارات التطبيق", on: true },
  { icon: <Mail size={14} aria-hidden />, label: "رسائل البريد", on: false },
  { icon: <Moon size={14} aria-hidden />, label: "عدم الإزعاج ليلاً", on: true },
  { icon: <Eye size={14} aria-hidden />, label: "إظهار حالة الاتصال", on: true },
  { icon: <MapPin size={14} aria-hidden />, label: "مشاركة الموقع", on: false },
  { icon: <Lock size={14} aria-hidden />, label: "حساب خاص", on: false },
];

function SettingRow({ s }: { s: (typeof SETTINGS)[number] }) {
  return (
    <div className="demo-row demo-setting">
      <span className="demo-icon-line">
        {s.icon} {s.label}
      </span>
      <Toggle on={s.on} />
    </div>
  );
}

function SettingsList({ grouped }: { grouped: boolean }) {
  if (!grouped) {
    return (
      <DemoCard className="demo-narrow">
        <span className="demo-h">الإعدادات</span>
        <div className="demo-even">
          {SETTINGS.map((s) => (
            <SettingRow key={s.label} s={s} />
          ))}
        </div>
      </DemoCard>
    );
  }
  return (
    <DemoCard className="demo-narrow">
      <span className="demo-h">الإعدادات</span>
      <span className="demo-group-h">الإشعارات</span>
      <div className="demo-tight">
        {SETTINGS.slice(0, 3).map((s) => (
          <SettingRow key={s.label} s={s} />
        ))}
      </div>
      <span className="demo-group-h">الخصوصية</span>
      <div className="demo-tight">
        {SETTINGS.slice(3).map((s) => (
          <SettingRow key={s.label} s={s} />
        ))}
      </div>
    </DemoCard>
  );
}

function Profile({ good }: { good: boolean }) {
  if (good) {
    return (
      <DemoCard className="demo-profile">
        <span className="demo-avatar" aria-hidden>
          ن
        </span>
        <span className="demo-col demo-col--tight">
          <span className="demo-h">نورة السالم</span>
          <span className="demo-muted">مصممة منتجات · جدة</span>
        </span>
        <div className="demo-btn-row">
          <Btn variant="primary" small>
            متابعة
          </Btn>
          <Btn variant="soft" small>
            مراسلة
          </Btn>
        </div>
      </DemoCard>
    );
  }
  return (
    <DemoCard className="demo-profile demo-profile--loose">
      <span className="demo-avatar" aria-hidden>
        ن
      </span>
      <hr className="demo-hr" />
      <span className="demo-h">نورة السالم</span>
      <hr className="demo-hr" />
      <Mark note="الاسم والمسمى منفصلان كأنهما غريبان">
        <span className="demo-muted demo-pad-y">مصممة منتجات · جدة</span>
      </Mark>
      <hr className="demo-hr" />
      <Btn variant="primary" small>
        متابعة
      </Btn>
      <hr className="demo-hr" />
      <Btn variant="soft" small>
        مراسلة
      </Btn>
    </DemoCard>
  );
}

function ProductOptions() {
  return (
    <DemoCard className="demo-product">
      <Hotspot id="title" label="اسم المنتج">
        <span className="demo-h">قميص قطني كلاسيكي</span>
      </Hotspot>
      <Hotspot id="price" label="السعر">
        <Price>$39.00</Price>
      </Hotspot>
      <Hotspot id="color-label" label="تسمية اللون">
        <span className="demo-label demo-gap-top">اللون</span>
      </Hotspot>
      <div className="demo-swatches" style={{ marginTop: 8 }}>
        <span className="swatch" style={{ background: "#1F2A44" }} />
        <span className="swatch" style={{ background: "#B8BFC9" }} />
        <span className="swatch" style={{ background: "#8C3B2E" }} />
      </div>
      <Hotspot id="size-label" label="تسمية المقاس">
        <span className="demo-label" style={{ display: "block", marginTop: 6 }}>
          المقاس
        </span>
      </Hotspot>
      <div className="demo-chips" style={{ marginTop: 30 }}>
        {["S", "M", "L", "XL"].map((s) => (
          <span key={s} className="demo-size" dir="ltr">
            {s}
          </span>
        ))}
      </div>
      <Hotspot id="cta" label="زر الإضافة للسلة">
        <span style={{ display: "block", marginTop: 20 }}>
          <Btn variant="primary" full>
            أضف إلى السلة
          </Btn>
        </span>
      </Hotspot>
    </DemoCard>
  );
}

export const proximity: StageContent = {
  slug: "proximity",
  intro: (
    <p>
      العقل البشري يجمّع الأشياء المتقاربة تلقائياً ويعاملها كوحدة واحدة، ويفصل الأشياء المتباعدة. هذا ما يسميه علم نفس الجشطالت «قانون التقارب».
      في الواجهات، المسافة ليست مجرد راحة للعين — إنها لغة تقول للمستخدم: هذا مع ذاك، وهذا شيء آخر.
    </p>
  ),
  blocks: [
    {
      type: "lesson",
      id: "law",
      heading: "التسمية تلتصق بحقلها",
      body: (
        <>
          <p>
            انظر إلى النموذج الأول: تسمية «اسم العائلة» تبعد نفس المسافة عن الحقل الذي فوقها والحقل الذي تحتها. النتيجة؟ المستخدم يتوقف لحظة ليسأل:
            لأي حقل تنتمي هذه الكلمة؟ لحظة صغيرة، لكنها تتكرر مع كل حقل.
          </p>
          <p>
            الحل لا يحتاج لوناً ولا خطاً فاصلاً: قرّب التسمية من حقلها، وأبعد كل زوج عن الزوج التالي. المسافة وحدها تكفي لترسم المجموعات.
          </p>
        </>
      ),
      example: {
        bad: <FormDemo labelGap={20} fieldGap={20} specs markLabel={(l) => <Mark note="لمن تنتمي؟" inline>{l}</Mark>} />,
        good: <FormDemo labelGap={6} fieldGap={26} specs />,
        caption: "الأرقام بالبكسل. في النسخة الصحيحة مسافة التسمية أصغر بكثير من المسافة بين الحقول.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "pick",
        id: "settings-groups",
        prompt: "القائمتان تحتويان نفس الإعدادات الستة. أيّهما تساعد المستخدم على إيجاد ما يبحث عنه أسرع؟",
        options: {
          a: <SettingsList grouped={false} />,
          b: <SettingsList grouped />,
        },
        correct: "b",
        hint: "حين تتساوى كل المسافات، هل تستطيع أن ترى أين تنتهي فكرة وتبدأ أخرى؟",
        explain: "في (ب) تجمع المسافة الإعدادات المتشابهة في مجموعتين، مع عنوان صغير لكل منهما. العين تقفز إلى المجموعة الصحيحة بدل قراءة القائمة كلها.",
      },
    },
    {
      type: "lesson",
      id: "space-not-lines",
      heading: "الفراغ قبل الخطوط",
      body: (
        <p>
          عندما تبدو العناصر مبعثرة، يلجأ كثير من المصممين إلى الخطوط الفاصلة والإطارات. لكن الخطوط تضيف ضجيجاً، وأحياناً تفصل ما يجب أن يبقى معاً. جرّب
          أولاً أن تقرّب العناصر المرتبطة وتبعد غير المرتبطة. ستندهش كم مرة يحل الفراغ المشكلة وحده.
        </p>
      ),
      example: {
        bad: <Profile good={false} />,
        good: <Profile good />,
        caption: "بلا أي خط فاصل: الاسم والمسمى مجموعة، والزرّان مجموعة.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "fix",
        id: "fix-form-gaps",
        prompt: "حرّك المؤشرين حتى تلتصق كل تسمية بحقلها، وينفصل كل حقل بوضوح عن الحقل الذي يليه.",
        controls: [
          { type: "range", key: "labelGap", label: "المسافة بين التسمية وحقلها", min: 2, max: 40, step: 2, unit: "px", initial: 22 },
          { type: "range", key: "fieldGap", label: "المسافة بين الحقول", min: 2, max: 48, step: 2, unit: "px", initial: 22 },
        ],
        render: (v) => <FormDemo labelGap={Number(v.labelGap)} fieldGap={Number(v.fieldGap)} specs />,
        meter: (v) => {
          const ratio = Number(v.fieldGap) / Number(v.labelGap);
          return { label: "نسبة الفصل (بين الحقول ÷ التسمية)", value: `${ratio.toFixed(1)}×`, ok: ratio >= 2 && Number(v.labelGap) <= 12 };
        },
        validate: (v) => {
          const label = Number(v.labelGap);
          const field = Number(v.fieldGap);
          if (label > 12) return { ok: false, hint: "التسمية ما زالت بعيدة عن حقلها. قرّبها إلى ١٢ بكسل أو أقل." };
          if (field < label * 2) return { ok: false, hint: "المسافة بين الحقول يجب أن تكون ضعف مسافة التسمية على الأقل، حتى ينفصل كل زوج عن الآخر." };
          if (field < 16) return { ok: false, hint: "الحقول متلاصقة أكثر من اللازم. امنحها مسافة لا تقل عن ١٦ بكسل." };
          return { ok: true };
        },
        explain: "هذا هو قانون التقارب في سطر واحد: المسافة داخل المجموعة أصغر بوضوح من المسافة بين المجموعات.",
      },
    },
    {
      type: "exercise",
      exercise: {
        kind: "spot",
        id: "product-options",
        prompt: "في صفحة المنتج هذه تسمية تبدو وكأنها تنتمي للمجموعة الخطأ. انقر عليها.",
        scene: <ProductOptions />,
        target: "size-label",
        misses: {
          "color-label": "تسمية «اللون» قريبة من دوائر الألوان كما ينبغي. انظر إلى ما تحتها.",
          title: "اسم المنتج في مكانه، فوق سعره مباشرة.",
          price: "السعر ملاصق لاسم المنتج — هذا تقارب صحيح.",
          cta: "الزر منفصل عن الخيارات بمسافة واضحة، وهذا صحيح.",
        },
        explain: "تسمية «المقاس» ملتصقة بدوائر الألوان وبعيدة عن أزرار المقاسات، فتبدو للعين جزءاً من مجموعة الألوان. يجب أن تبتعد عن الألوان وتقترب من المقاسات.",
      },
    },
    {
      type: "quiz",
      questions: [
        {
          kind: "quiz",
          id: "q1",
          question: "تسمية تبعد ٢٤ بكسل عن حقلها و٢٤ بكسل عن الحقل السابق. ما المشكلة؟",
          options: ["الخط صغير جداً", "لا يُعرف بسهولة لأي حقل تنتمي", "المسافة كبيرة على الشاشات الصغيرة", "لا توجد مشكلة"],
          correct: 1,
          explain: "تساوي المسافتين يمحو العلاقة. المستخدم يضطر للتخمين.",
        },
        {
          kind: "quiz",
          id: "q2",
          question: "ما أبسط وأهدأ وسيلة لتجميع عناصر مرتبطة؟",
          options: ["إطار سميك حول كل مجموعة", "لون خلفية مختلف لكل عنصر", "التحكم في المسافات بينها", "خط فاصل بين كل عنصرين"],
          correct: 2,
          explain: "المسافة ترسم المجموعات بلا أي ضجيج بصري. الإطارات والخطوط أدوات مساعدة، لا البداية.",
        },
        {
          kind: "quiz",
          id: "q3",
          question: "من أين جاء «قانون التقارب»؟",
          options: ["علم نفس الجشطالت", "قانون فيتس", "قانون هيك", "قاعدة الأثلاث"],
          correct: 0,
          explain: "الجشطالت مدرسة في علم النفس درست كيف ندرك الأشكال كمجموعات، والتقارب أحد أشهر قوانينها.",
        },
      ],
    },
  ],
  keyRules: [
    "المسافة داخل المجموعة أصغر بوضوح من المسافة بين المجموعات.",
    "التسمية تلتصق بحقلها، لا تقف في المنتصف.",
    "جرّب الفراغ قبل أن تضيف خطاً أو إطاراً.",
    "عناوين صغيرة للمجموعات تختصر على المستخدم قراءة القائمة كلها.",
  ],
};
