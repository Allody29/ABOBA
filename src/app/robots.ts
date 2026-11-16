import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Политика: сайт открыт для поисковых и ИИ-краулеров (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended, YandexBot и др.) — правило "*" разрешает всё.
// Если владелец решит запретить использование контента для обучения моделей,
// добавьте отдельные правила с disallow: "/" для нужных user-agent.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
