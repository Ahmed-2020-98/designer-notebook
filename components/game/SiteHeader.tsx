import Link from "next/link";
import { Award, ScrollText } from "lucide-react";
import { XpMeter } from "./XpMeter";
import { LogoMark } from "../ui/Logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href="/" className="brand" aria-label="دفتر المصمم — الرئيسية">
          <LogoMark />
          <span className="brand-name">
            دفتر <span className="brand-accent">المصمم</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="روابط رئيسية">
          <Link href="/badges/" className="nav-link">
            <Award size={18} aria-hidden />
            <span>الشارات</span>
          </Link>
          <Link href="/certificate/" className="nav-link">
            <ScrollText size={18} aria-hidden />
            <span>الشهادة</span>
          </Link>
        </nav>
        <XpMeter />
      </div>
    </header>
  );
}
