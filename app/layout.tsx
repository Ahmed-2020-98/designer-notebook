import type { Metadata, Viewport } from "next";
import { Alexandria, Vazirmatn, Playpen_Sans_Arabic, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/game/SiteHeader";
import { Toasts } from "@/components/game/Toasts";
import "./globals.css";

const display = Alexandria({ subsets: ["arabic", "latin"], variable: "--font-display", display: "swap" });
const body = Vazirmatn({ subsets: ["arabic", "latin"], variable: "--font-body", display: "swap" });
const hand = Playpen_Sans_Arabic({ subsets: ["arabic", "latin"], variable: "--font-hand", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "دفتر المصمم — مسار تعليمي في مبادئ UI/UX", template: "%s · دفتر المصمم" },
  description: "١٦ مبدأ في تصميم الواجهات، تتعلمها بالتصحيح لا بالحفظ: أمثلة حيّة قبل وبعد، تمارين تفاعلية، نقاط وشارات وشهادة.",
};

export const viewport: Viewport = {
  themeColor: "#FBF8F2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          تخطَّ إلى المحتوى
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>
              دفتر المصمم — مسار مبني على قراءة كتاب <span lang="en" dir="ltr">The UI/UX Playbook</span> من uxpeak، بشرح عربي وأمثلة أصلية.
            </p>
            <p className="site-footer-note">تقدّمك محفوظ في هذا المتصفح فقط.</p>
          </div>
        </footer>
        <Toasts />
      </body>
    </html>
  );
}
