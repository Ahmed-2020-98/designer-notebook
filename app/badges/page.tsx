import type { Metadata } from "next";
import { BadgeBook } from "@/components/game/BadgeBook";

export const metadata: Metadata = { title: "دفتر الشارات" };

export default function BadgesPage() {
  return (
    <div className="wrap page">
      <h1 className="page-title">دفتر الشارات</h1>
      <p className="section-sub">أختام المراحل وشارات الإنجاز التي جمعتها في رحلتك.</p>
      <BadgeBook />
    </div>
  );
}
