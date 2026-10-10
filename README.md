# دفتر المصمم

مسار تعليمي عربي تفاعلي في مبادئ UI/UX (16 مرحلة، تمارين، نقاط وشارات وشهادة).

## النشر

الموقع يُنشر تلقائياً على GitHub Pages مع كل push على `main` عبر `.github/workflows/deploy.yml`،
على الدومين https://ui-ux.codexacademy.online/ (سجل CNAME من `ui-ux` إلى `<user>.github.io`).
للنشر تحت مسار فرعي بدل دومين، اضبط `BASE_PATH` في خطوة البناء.

## التشغيل

```bash
npm install
npm run dev      # تطوير على http://localhost:3000
npm run build    # تصدير ثابت إلى out/ — ارفع محتواه على أي استضافة
```

## إضافة مرحلة جديدة

1. أنشئ `content/stages/NN-slug.tsx` على نمط المراحل الموجودة (`StageContent`).
2. سجّلها في `content/stages/registry.ts`.
3. غيّر حالتها إلى `"ready"` في `content/stages/meta.ts`.

التقدّم محفوظ في `localStorage` عبر `lib/progress/` (واجهة `ProgressStore` قابلة للاستبدال بخادم لاحقاً).
