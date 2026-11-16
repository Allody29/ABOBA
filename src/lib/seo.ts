import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

/** Картинка превью ссылки по умолчанию (1200×630). */
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "ECOgrad — ветеринарные препараты оптом, Алматы",
};

/**
 * Метаданные страницы: title, description, canonical и Open Graph/Twitter,
 * совпадающие с заголовком и описанием страницы.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ru_KZ",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Сериализация JSON-LD с экранированием `<` (защита от XSS). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
