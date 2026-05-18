import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteLayout } from "@/components/Layout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2eff37ab-5af1-4954-9a8a-22c734ac97e5/id-preview-835bb99c--c1e056f8-7cc1-4eca-97bc-e1f9bb3c7b31.lovable.app-1776936796474.png";

const SITE_DESCRIPTION =
  "Pet Pharma Hub is a website for a veterinary drug supplier, featuring product categorization and filtering.";

export const metadata: Metadata = {
  title: "ECOgrad — Ветеринарные препараты",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "ECOgrad — Ветеринарные препараты",
    description: SITE_DESCRIPTION,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary",
    site: "@Lovable",
    title: "ECOgrad — Ветеринарные препараты",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
