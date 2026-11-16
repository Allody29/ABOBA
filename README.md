# ECOgrad — сайт-каталог

Сайт [ecograd.com.kz](https://www.ecograd.com.kz) — каталог оптового поставщика ветеринарных препаратов, вакцин и дезсредств (Алматы, Казахстан). Заявки принимаются в WhatsApp и по телефону, цены по запросу.

Стек: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, хостинг Vercel. Базы данных нет: каталог хранится в файлах `src/data/`.

> В этой версии Next.js есть несовместимые изменения. Перед правками кода читайте документацию в `node_modules/next/dist/docs/` (см. `AGENTS.md`).

## Запуск

```bash
npm install
```

```bash
npm run dev
```

Сайт откроется на http://localhost:3000.

Проверки перед коммитом:

```bash
npm run lint
```

```bash
npm run typecheck
```

```bash
npm run check:data
```

```bash
npm run build
```

## Структура

| Путь | Что там |
|---|---|
| `src/app/` | Страницы: главная, `catalog/`, `catalog/[slug]/` (страница препарата), `about/`, `contacts/`, `not-found.tsx`; служебные `robots.ts`, `sitemap.ts`, `llms.txt/`, `api/descriptions/` |
| `src/components/` | Шапка, подвал, хлебные крошки, JSON-LD, аналитика; `ui/` — диалог и выезжающая панель |
| `src/data/products.ts` | Товары и категории |
| `src/data/product-descriptions.ts` | Описания препаратов (ключ — slug). Только для серверного кода |
| `src/lib/site.ts` | Телефон, WhatsApp, адрес, режим работы, базовый URL — менять здесь |
| `public/products/` | Фото товаров |
| `docs/owner-questions.md` | Данные, которые нужны от владельца |

## Как добавить товар

1. Положите фото в `public/products/` (JPEG или PNG, длинная сторона до 1200 px, до 300 КБ).
2. Добавьте строку в `products` в `src/data/products.ts`:

   ```ts
   { slug: "enrokol", name: "Энрокол", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/enrokol.jpg" },
   ```

   `slug` — латиница, цифры и дефисы, адрес страницы будет `/catalog/enrokol`. У разных фасовок одного препарата slug общий: они показываются на одной странице.
3. Если есть описание, добавьте его в `descriptions` в `src/data/product-descriptions.ts` под тем же slug. Противопоказания пишите в `contraindications`, а не в `indications`.
4. Запустите `npm run check:data`: проверка найдёт дубли, неверные slug, отсутствующие файлы фото и противопоказания в поле «Показания».

## Аналитика

Счётчики подключаются переменными окружения в Vercel: `NEXT_PUBLIC_YM_ID` (Яндекс Метрика) и `NEXT_PUBLIC_GA_ID` (Google Analytics 4). Цели: `whatsapp_click`, `phone_click`, `description_open`, `catalog_search`. См. `src/components/Analytics.tsx`.
