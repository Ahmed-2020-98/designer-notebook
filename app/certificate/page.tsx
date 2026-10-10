import type { Metadata } from "next";
import { CertificateStudio } from "@/components/game/CertificateStudio";

export const metadata: Metadata = { title: "شهادة الدفتر" };

export default function CertificatePage() {
  return (
    <div className="wrap page">
      <h1 className="page-title">شهادة الدفتر</h1>
      <CertificateStudio />
    </div>
  );
}
