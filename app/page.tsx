import { Eye, MousePointerClick, Wrench, ListChecks } from "lucide-react";
import { PathMap } from "@/components/path/PathMap";
import { ContinueButton } from "@/components/path/ContinueButton";
import { MarksOn, Mark } from "@/components/ui/Mark";
import { Stamp } from "@/components/ui/Stamp";
import { DemoCard, Btn } from "@/components/demo/Demo";
import { STAGES, CHAPTERS } from "@/content/stages/meta";
import { ar } from "@/lib/format";

const HOW = [
  { Icon: Eye, title: "أيّهما أفضل؟", text: "تصميمان أمامك، تختار الصحيح ثم تعرف لماذا." },
  { Icon: MousePointerClick, title: "اكتشف الخطأ", text: "تفتّش في واجهة حقيقية وتنقر على موضع الخلل." },
  { Icon: Wrench, title: "أصلحه بنفسك", text: "تحرّك المسافات والأوزان والألوان حتى يستقيم التصميم." },
  { Icon: ListChecks, title: "اختبار سريع", text: "أسئلة قصيرة تثبّت الفكرة في نهاية كل مرحلة." },
];

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <p className="hero-kicker">مسار تعليمي في مبادئ UI/UX</p>
          <h1 className="hero-title">
            دفتر
            <br />
            المصمم
          </h1>
          <p className="hero-lede">
            {ar(16)} مبدأ في تصميم الواجهات، تتعلمها كما يتعلم المصمم في الاستوديو: <span className="hl">بالتصحيح لا بالحفظ</span>. كل مبدأ يبدأ بتصميم
            خاطئ عليه علامات القلم الأحمر، وينتهي بختم «صح».
          </p>
          <ContinueButton />
          <dl className="hero-stats">
            <div>
              <dt>مرحلة</dt>
              <dd>{ar(STAGES.length)}</dd>
            </div>
            <div>
              <dt>أبواب</dt>
              <dd>{ar(CHAPTERS.length)}</dd>
            </div>
            <div>
              <dt>أنواع تمارين</dt>
              <dd>{ar(4)}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-sheet is-visible" aria-hidden>
          <div className="sheet">
            <span className="sheet-pin" />
            <p className="sheet-label">مراجعة التصميم · صفحة ١</p>
            <MarksOn on>
              <DemoCard className="sheet-card">
                <span className="demo-h">سلة المشتريات</span>
                <span className="demo-muted">٣ منتجات · الإجمالي $11.20</span>
                <Mark note="الكل يصرخ بنفس الصوت!" side="bottom">
                  <div className="demo-stack">
                    <Btn variant="dark" full>
                      حذف الكل
                    </Btn>
                    <Btn variant="dark" full>
                      متابعة التسوق
                    </Btn>
                    <Btn variant="dark" full>
                      إتمام الشراء
                    </Btn>
                  </div>
                </Mark>
              </DemoCard>
            </MarksOn>
          </div>
          <div className="sheet sheet--fixed">
            <Stamp className="sheet-stamp" size={92} />
            <DemoCard className="sheet-card">
              <span className="demo-h">سلة المشتريات</span>
              <span className="demo-muted">٣ منتجات · الإجمالي $11.20</span>
              <div className="demo-stack">
                <Btn variant="success" full>
                  إتمام الشراء
                </Btn>
                <Btn variant="soft" full>
                  متابعة التسوق
                </Btn>
                <Btn variant="danger-text" small>
                  حذف الكل
                </Btn>
              </div>
            </DemoCard>
          </div>
        </div>
      </section>

      <section className="how wrap" aria-labelledby="how-h">
        <h2 id="how-h" className="section-h">
          كيف تتعلم هنا؟
        </h2>
        <ol className="how-grid">
          {HOW.map(({ Icon, title, text }, i) => (
            <li key={title} className="how-card">
              <span className="how-n" aria-hidden>
                {ar(i + 1)}
              </span>
              <Icon size={22} aria-hidden />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className="how-note">
          كل تمرين يمنحك نقاط خبرة (XP) — كاملة من أول محاولة، ونصفها بعد الخطأ. أنهِ تمارين المرحلة لتحصل على ختمها، واجمع الأختام الستة عشر لتنال
          شهادة الدفتر.
        </p>
      </section>

      <section id="map" className="wrap map-section" aria-labelledby="map-h">
        <h2 id="map-h" className="section-h">
          خريطة المسار
        </h2>
        <p className="section-sub">الترتيب مقترح لا إجباري — المراحل الستة عشر كلها مفتوحة لك. اختم مراحلها كلها لتنال شهادة الدفتر.</p>
        <PathMap />
      </section>
    </>
  );
}
