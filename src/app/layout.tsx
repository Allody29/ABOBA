import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteLayout } from "@/components/Layout";
import { JsonLd } from "@/components/JsonLd";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import {
  ADDRESS,
  OPENING_HOURS_SCHEMA,
  PHONE_E164,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const DEFAULT_TITLE = "ECOgrad — Ветеринарные препараты оптом в Казахстане";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "ru_KZ",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-horizontal.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
  telephone: PHONE_E164,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressCountry: ADDRESS.country,
  },
  openingHours: OPENING_HOURS_SCHEMA,
  areaServed: { "@type": "Country", name: "Казахстан" },
  currenciesAccepted: "KZT",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-secondary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-secondary-foreground"
        >
          Перейти к содержимому
        </a>
        <SiteLayout>{children}</SiteLayout>
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
