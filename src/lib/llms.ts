import { categories, productGroups, type Category } from "@/data/products";
import { getProductDescription } from "@/data/product-descriptions";
import {
  ADDRESS,
  OPENING_HOURS_DISPLAY,
  PHONE_DISPLAY,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "@/lib/site";

function intro(): string {
  return `# ECOgrad

> ECOgrad — оптовый (B2B) поставщик ветеринарных препаратов, вакцин, витаминов и дезинфицирующих средств для ферм, птицефабрик и агрохолдингов. Офис в Алматы, поставки по Казахстану. Цены — по запросу у менеджера.

## Контакты

- Телефон: ${PHONE_DISPLAY}
- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}
- Адрес: ${ADDRESS.display}
- Режим работы: ${OPENING_HOURS_DISPLAY}
- Сайт: ${SITE_URL}

## Разделы сайта

- [Каталог препаратов](${SITE_URL}/catalog): ${productGroups.length} наименований с фото, формой выпуска и фасовкой
- [О компании](${SITE_URL}/about)
- [Контакты](${SITE_URL}/contacts)
`;
}

function categoryLinks(): string {
  return (Object.keys(categories) as Category[])
    .map((c) => `- [${categories[c].label}](${SITE_URL}/catalog?category=${c}): ${categories[c].description}`)
    .join("\n");
}

export function llmsTxt(): string {
  return `${intro()}
## Категории

${categoryLinks()}

## Дополнительно

- [Полный перечень препаратов](${SITE_URL}/llms-full.txt)
`;
}

function firstSentence(s: string | undefined, max = 220): string {
  if (!s) return "";
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max).replace(/\s\S*$/, "") + "…" : t;
}

export function llmsFullTxt(): string {
  const byCat = (Object.keys(categories) as Category[]).map((c) => {
    const items = productGroups
      .filter((g) => g.category === c)
      .map((g) => {
        const d = getProductDescription(g.slug);
        const lines = [
          `### ${g.name}`,
          `- Страница: ${SITE_URL}/catalog/${g.slug}`,
          `- Форма выпуска: ${g.form}`,
        ];
        if (g.packagings.length) lines.push(`- Фасовка: ${g.packagings.join("; ")}`);
        const comp = firstSentence(d?.composition);
        if (comp) lines.push(`- Состав: ${comp}`);
        return lines.join("\n");
      })
      .join("\n\n");
    return `## ${categories[c].label}\n\n${items}`;
  });
  return `${intro()}\n${byCat.join("\n\n")}\n`;
}
