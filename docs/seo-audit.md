# Технический SEO-аудит проекта Ecograd

**Дата:** 2026-05-17
**Аудитор:** Claude (Opus 4.7)
**Базовая стратегия:** [seo-strategy.md](../seo-strategy.md)
**Сравниваемый проект:** `C:\Users\arnur\Desktop\CODE\petparade-next` (Next.js 16, App Router)

> **Замечание о входных данных.** Стратегия найдена в корне проекта (`seo-strategy.md`), не в `docs/`. Файл `CLAUDE.md` содержит только `@AGENTS.md` и не несёт контекста про Ecograd — это шаблонная заметка create-next-app про Next.js 16. Папки `supabase/` нет: данные не из БД, а из статических TS-файлов в [src/data/](../src/data). Это влияет на разделы 7 (Supabase) и 3 (динамические метаданные).

---

## 🚨 Блокеры — без этого SEO не работает

Перечислены проблемы, которые делают невозможным выполнение целей стратегии (Раздел 1: «50+ запросов в ТОП-10», 8–15 тыс. трафика/мес). Их нельзя решить пост-фактум — они меняют архитектуру.

1. **Нет slug-маршрутов и индексируемых страниц товаров.** Весь каталог из 134 SKU рендерится на единственной странице [src/app/catalog/page.tsx](../src/app/catalog/page.tsx), фильтры передаются через `?category=` query params. Это значит:
   - У товара «Bravecto», «Нобивак», «Энроксол» **нет отдельного URL** — Google нечего ранжировать под запросы Уровня 3 (стратегия §3.1: «купить Нобивак оптом», «Мультикан оптом цена»).
   - У категорий «вакцины», «антибиотики» **нет полноценной landing-страницы** — есть только параметр `?category=vaccines`, который Google индексирует слабо и склонен схлопывать в каноникал родительской страницы.
   - Целевая структура из §4.1 стратегии (`/catalog/{category}/{subcategory}/{product-slug}/`, `/brands/{brand-slug}/`, `/dlya/{animal-type}/`, `/gorod/{city-slug}/`) **отсутствует полностью**.
   - **Без этого SEO-стратегия не выполнима в принципе.** P0.

2. **Нет источника данных (Supabase / CMS).** Все 134 товара захардкожены в [src/data/products.ts](../src/data/products.ts), описания — в [src/data/product-descriptions.ts](../src/data/product-descriptions.ts). SEO-стратегия §4.3 требует: «name, description, brand, manufacturer, sku, gtin, регистрационное удостоверение РК, цена, складские остатки, schema-разметка Product». Текущая модель не содержит ни одного из полей `brand`, `slug`, `seo_title`, `seo_description`, `manufacturer`, `gtin`, `animal_type`, `reg_certificate`. Каждое изменение требует деплоя. P0.

3. **Нет `sitemap.xml` и `robots.txt`.** Поиск файлов в [src/app/](../src/app) и [public/](../public) подтверждает: `sitemap.ts`/`robots.ts` не созданы. Без sitemap Google не получит карту сайта; без robots.txt в результаты выдачи могут попасть служебные URL и мусорные комбинации фильтров (стратегия §6.1 явно требует sitemap_index.xml с разделением на products/categories/blog/static). P0.

4. **Нет JSON-LD / Schema.org разметки.** Ни в [src/app/layout.tsx](../src/app/layout.tsx), ни в страницах не найдено `<script type="application/ld+json">`. Для ветеринарной (медицинской по классификации Google) тематики Schema критична: Organization на главной, Product на карточках, LocalBusiness на региональных, Article на блоге, BreadcrumbList везде (стратегия §6.1). Без неё E-E-A-T не работает. P0.

5. **Нет i18n (RU + KK).** Стратегия §3.3 явно требует казахскую версию с `hreflang`. В проекте нет ни `next-intl`, ни `[locale]` сегмента, ни `i18n` в [next.config.ts](../next.config.ts). Это значит отказ от ~15-25% годового роста казахского трафика и упущенная ниша с минимальной конкуренцией. P1 (после P0).

6. **Каталог рендерит товары в клиентском компоненте.** [src/app/catalog/CatalogClient.tsx](../src/app/catalog/CatalogClient.tsx:1) помечен `"use client"` (строка 1) — это значит HTML карточек товаров приходит с сервера (RSC payload), но фильтрация в URL и инициализация состояния идут через React, а **сам HTML карточек уже хорош**. Однако в текущей реализации Google видит **все 134 товара в DOM на каждый запрос `/catalog`** — это даёт «one big page» каталог без уникальности URL. Это переплетается с блокером №1 и решается им. P0 (как часть №1).

---

## 1. Стек и базовая конфигурация

### Что есть

- **Next.js 16.2.6** (App Router) — [package.json:46](../package.json), [src/app/](../src/app). Turbopack включён по умолчанию в dev.
- **React 19.2.4**, **TypeScript 5** — [package.json:48,64](../package.json), [tsconfig.json](../tsconfig.json).
- **Tailwind v4** (`@tailwindcss/postcss`) + кастомные `oklch`-токены — [src/app/globals.css](../src/app/globals.css), [postcss.config.mjs](../postcss.config.mjs).
- **Рендеринг.** Все страницы по умолчанию статические Server Components, при наличии `searchParams` (Promise) — динамические. Конкретно:
  - [src/app/page.tsx](../src/app/page.tsx) — серверная, статическая.
  - [src/app/about/page.tsx](../src/app/about/page.tsx) — серверная, статическая.
  - [src/app/contacts/page.tsx](../src/app/contacts/page.tsx) — серверная, статическая.
  - [src/app/catalog/page.tsx](../src/app/catalog/page.tsx) — серверная, **динамическая** (использует `await searchParams`), рендерится на каждый запрос.
- **`"use client"` компоненты:**
  - [src/components/Layout.tsx:1](../src/components/Layout.tsx:1) — Header/Footer/SiteLayout. Из-за `usePathname()`. Сидит на каждой странице через layout.tsx, добавляет ~20-30 KB в JS-бандл.
  - [src/app/catalog/CatalogClient.tsx:1](../src/app/catalog/CatalogClient.tsx:1) — UI каталога с фильтрами.
  - [src/hooks/use-mobile.tsx](../src/hooks/use-mobile.tsx), все 45 файлов в [src/components/ui/](../src/components/ui) — shadcn, клиентские.

### Что должно быть по стратегии (§6)

- SSG / ISR для категорий и товаров (нечастые изменения, частый трафик).
- SSR-стриминг для каталога с большим количеством товаров.
- Клиентских компонентов — минимум в критическом пути, чтобы LCP < 2.5s.

### Разрыв и приоритет

| Пункт | Текущее | Целевое | Приоритет |
|---|---|---|---|
| Версия Next.js | 16.2.6 (latest) | ≥14, App Router | ✅ ОК |
| App Router | да | да | ✅ ОК |
| Стратегия рендера | mix SSG + SSR | SSG + ISR для товаров | Важно |
| Layout как клиентский компонент | да | server (split header в server, активность считать через children-ключ или CSS) | Важно — раздувает JS на каждой странице |

---

## 2. Структура роутинга

### Что есть

```
src/app/
├── layout.tsx              → root layout (/)
├── page.tsx                → /
├── about/page.tsx          → /about
├── contacts/page.tsx       → /contacts
└── catalog/
    ├── page.tsx            → /catalog (server)
    └── CatalogClient.tsx   → клиент-компонент, не маршрут
```

**Динамических маршрутов нет.** Нет `[slug]`, `[id]`, `[...slug]`. Нет route groups, нет parallel routes.

### Что должно быть (стратегия §4.1)

```
/
/catalog/
/catalog/{category}/                          ← напр. vakciny, antibiotiki, antiparazitarnye
/catalog/{category}/{subcategory}/            ← vakciny-dlya-sobak
/catalog/{category}/{subcategory}/{product-slug}/
/brands/{brand-slug}/                         ← bayer, msd, zoetis, nobivac
/dlya/{animal-type}/                          ← krs, ptica, svini, sobaki, koshki
/gorod/{city-slug}/                           ← almaty, astana, shymkent + ещё 12
/blog/
/blog/{article-slug}/
/optom/{segment}/                             ← vetkliniki, pitomniki, fermery, zooapteki
```

Плюс посадочные:
- `/about`, `/contacts` (уже есть)
- `/o-kompanii/litsenzii` (E-E-A-T, стратегия §5.3)
- `/o-kompanii/eksperty` (CV ветеринарных консультантов)

### Разрыв

| Целевой маршрут | Статус | Приоритет | Действие |
|---|---|---|---|
| `/catalog/[category]/page.tsx` | ❌ нет | **P0** | Создать. Категории: `vakciny`, `antibiotiki`, `antiparazitarnye`, `vitaminy`, `gormonalnye`, `dezinfektanty`, `instrumenty`. Сейчас в БД (точнее в TS) только 4 категории. |
| `/catalog/[category]/[subcategory]/page.tsx` | ❌ нет | P1 | Двойная навигация по §4.2. |
| `/catalog/[category]/[subcategory]/[slug]/page.tsx` | ❌ нет | **P0** | Карточки товара. 134 SKU × индивидуальная посадка. |
| `/brands/[slug]/page.tsx` | ❌ нет | **P0** | Бренд-страницы. Стратегия §5.1 даёт 800–1200 слов на бренд. Имеющиеся бренды в данных: Nobilis, Porcilis, Innovax, MSD — но в [products.ts](../src/data/products.ts) поля `brand` нет, придётся вытащить из имени. |
| `/dlya/[animal]/page.tsx` | ❌ нет | P1 | КРС, МРС, свиньи, птица, лошади, собаки, кошки, пушные, пчёлы, рыбы (§4.2). |
| `/gorod/[city]/page.tsx` | ❌ нет | P1 | 14 городов РК + Бишкек/Ташкент/Самарканд/Душанбе (§7.2). |
| `/blog/page.tsx`, `/blog/[slug]/page.tsx` | ❌ нет | **P0** | 30+ статей по §5.2. |
| `/optom/[segment]/page.tsx` | ❌ нет | P1 | 5–7 лендингов: ветклиники, питомники, фермеры, зооаптеки. |
| `/o-kompanii/litsenzii` | ❌ нет | P1 | E-E-A-T (§5.3). |
| `/o-kompanii/eksperty` | ❌ нет | P1 | E-E-A-T. |

**Маршрутов, которые надо закрыть от индексации:** пока нечего — параметризованных служебных URL (корзина, поиск, фильтры) ещё нет. После реализации каталога — закрывать в `robots.txt` фильтры и сортировки (§6.2).

### Дополнительный риск

Фильтр «форма выпуска» в каталоге ([CatalogClient.tsx:131](../src/app/catalog/CatalogClient.tsx:131)) использует локальный `useState`, не URL — это **хорошо** с точки зрения SEO (нет мусорных URL), но **плохо** для UX и расшаривания. По §6.2 для популярных комбинаций фильтров нужно создавать отдельные SEO-посадочные.

---

## 3. Метаданные (title, description, OG)

### Что есть

| Файл | `metadata`? | `generateMetadata`? | OG | Twitter | Canonical |
|---|---|---|---|---|---|
| [src/app/layout.tsx:21](../src/app/layout.tsx:21) | ✅ статика | ❌ | ✅ ([:25-30](../src/app/layout.tsx:25)) | ✅ ([:31-37](../src/app/layout.tsx:31)) | ❌ |
| [src/app/page.tsx:9](../src/app/page.tsx:9) | ✅ статика | ❌ | ❌ (наследует) | ❌ | ❌ |
| [src/app/about/page.tsx:3](../src/app/about/page.tsx:3) | ✅ статика | ❌ | ❌ | ❌ | ❌ |
| [src/app/contacts/page.tsx:6](../src/app/contacts/page.tsx:6) | ✅ статика | ❌ | ❌ | ❌ | ❌ |
| [src/app/catalog/page.tsx:5](../src/app/catalog/page.tsx:5) | ✅ статика | ❌ | ❌ | ❌ | ❌ |

**OG-картинка** в layout.tsx ([:13-14](../src/app/layout.tsx:13)) — это URL на R2-домен Lovable (`pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev`). Это **внешний ресурс, ничей**: домен Lovable, картинка может исчезнуть. Нужно перенести себе.

### Что должно быть

- `generateMetadata` на динамических маршрутах: `/catalog/[category]`, `/catalog/[...]/[slug]`, `/brands/[slug]`, `/blog/[slug]`, `/gorod/[city]`.
- Источник данных — Supabase (когда появится), сейчас — `src/data/`.
- Поля per page: `seo_title`, `seo_description`, `seo_keywords`, `og_image`, `canonical_url`.
- `metadataBase: new URL("https://ecograd.kz")` в layout — без него `Image` для OG и canonical работают неверно.
- `alternates.canonical` на каждой странице, чтобы исключить дубли (§6.2).

### Разрыв

| Пункт | Приоритет |
|---|---|
| Нет `metadataBase` в layout — относительные пути OG некорректны | **P0** |
| Нет canonical на статических страницах | **P0** |
| Нет `generateMetadata` для будущих slug-маршрутов | **P0** (вместе с маршрутами) |
| OG-картинка на чужом домене | P1 |
| Title главной слабый под коммерческие запросы: «ECOgrad — Ветеринарные препараты для животноводства» вместо «Ветеринарные препараты оптом в Алматы и Казахстане — Ecograd» | P1 |
| Description главной не содержит ключи «оптом», «оптовый поставщик», «Алматы» | P1 |
| Twitter `site: "@Lovable"` ([layout.tsx:32](../src/app/layout.tsx:32)) — наследие шаблона, не аккаунт Ecograd | P2 |

### Конкретные правки

- В [src/app/layout.tsx](../src/app/layout.tsx) добавить `metadataBase: new URL("https://ecograd.kz")`, заменить `twitter.site` на актуальный, перенести OG-картинку в `/public/og-default.png`.
- Title главной: переписать с фокусом на оптовый сегмент + ГЕО.
- Описание категории «vakciny» (после создания маршрута): тянуть из `categories[key].description`, но переписывать через `seo_description`.

---

## 4. Структурированные данные (Schema.org / JSON-LD)

### Что есть

**Ничего.** Поиск по проекту:
- `application/ld+json` — не найдено.
- `schema.org` — не найдено.
- Нет компонента типа `<JsonLd>`, нет утилиты генерации Schema.

### Что должно быть (стратегия §6.1)

| Тип Schema | Где | Источник данных |
|---|---|---|
| `Organization` | layout.tsx (рендерится на всех) | name, logo, url, sameAs (соцсети), contactPoint, address |
| `LocalBusiness` (`VeterinaryCare`?) | главная + /contacts | юр.адрес, БИН, телефон, hours |
| `Product` | `/catalog/[...]/[slug]` | name, description, brand, sku, gtin, image, offers{price, priceCurrency:KZT, availability, priceValidUntil}, aggregateRating |
| `BreadcrumbList` | везде кроме главной | путь из URL |
| `FAQPage` | карточка товара + статьи блога | блок FAQ |
| `Article` | `/blog/[slug]` | headline, author (ветврач!), datePublished, image |
| `WebSite` + `SearchAction` | layout.tsx | для sitelinks-search |
| `ItemList` | `/catalog/[category]` | список ProductSummary |

### Где рендерить

**Только на сервере**, в Server Component, через `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />`. В клиентских компонентах не рендерить — Google индексирует серверный HTML, клиентский JS-исполнение ненадёжно.

### Приоритет: **P0** для Organization+WebSite (главная), Product (карточки), BreadcrumbList (везде). **P1** для FAQPage, Article, LocalBusiness. Объём — M (одна сессия на каркас + по типу за раз).

---

## 5. Sitemap и robots

### Что есть

- `app/sitemap.ts` — **нет**.
- `app/robots.ts` — **нет**.
- `public/sitemap.xml` — **нет**.
- `public/robots.txt` — **нет**.

Подтверждается `find` по `src/app/` и `public/` (см. [Glob по src/app/](../src/app)).

### Что должно быть (§6.1)

- **`app/sitemap.ts`** — динамический, экспортирует функцию, возвращающую `MetadataRoute.Sitemap`. Тянет URL из БД (когда появится Supabase). Сейчас можно генерить из `src/data/products.ts`.
- **`sitemap_index.xml`** ссылается на:
  - `static-sitemap.xml` — главная, about, contacts, optom/*, gorod/*
  - `categories-sitemap.xml` — категории и подкатегории
  - `products-sitemap.xml` — карточки (134 SKU сейчас, потом 500+)
  - `brands-sitemap.xml` — бренды
  - `blog-sitemap.xml` — статьи
- В Next 16: один файл `app/sitemap.ts` может возвращать массив, либо несколько `app/(group)/sitemap.ts` через group routes (новая фича App Router).

- **`app/robots.ts`** — закрыть:
  - `/api/*`
  - `?utm_*`, `?fbclid`, `?gclid` через `Disallow` или canonical
  - после реализации фильтров — комбинации с `?form=*`, `?sort=*`
  - страницы со `noindex` ставить через `metadata.robots`
- В `robots.txt` указать `Sitemap: https://ecograd.kz/sitemap.xml`.

### Разрыв и приоритет

| Файл | Текущее | Целевое | Приоритет |
|---|---|---|---|
| `app/sitemap.ts` | нет | динамический | **P0** |
| `app/robots.ts` | нет | есть | **P0** |
| Sitemap-индекс | нет | разделение на 5 файлов | P1 (когда контента станет много) |

---

## 6. Двуязычность (i18n)

### Что есть

- `next-intl`, `next-i18next`, `next-translate` — **не установлены** (нет в [package.json](../package.json)).
- Сегмента `[locale]` или `[lang]` в `src/app/` — **нет**.
- `hreflang` в метаданных — **нет** (`alternates.languages` не задан).
- В [layout.tsx:42](../src/app/layout.tsx:42) `lang="ru"` хардкодом.
- Тексты по-русски, перевода на казахский нет ни одного.

### Что должно быть (§3.3, §5)

- Структура `/ru/...` и `/kk/...`, либо разделение `ecograd.kz` (ru, по умолчанию) и `kk.ecograd.kz`.
- `alternates: { languages: { ru: "...", kk: "..." } }` в metadata.
- `hreflang` для каждой пары страница ↔ перевод.
- Стратегия §3.3 даёт топ казахских запросов: «мал дәрі-дәрмектері көтерме», «жануарларға вакцина көтерме».

### Разрыв и приоритет

- **P1** — реализовать после P0-блока (структура, БД, sitemap). Без казахской версии запросы по `мал ... көтерме` не получить, но конкуренция там низкая, и можно подключить во второй фазе (Дорожная карта §10, Фаза 3, месяцы 6–8).
- Объём — **L**: либо `next-intl` + словари, либо middleware + Server Components с `params.locale`.

---

## 7. Структура данных в Supabase

### Что есть

**Supabase в проекте отсутствует.** Все данные — статические TS-файлы:

| Файл | Содержит | Размер |
|---|---|---|
| [src/data/products.ts](../src/data/products.ts) | `Category`, `ProductForm`, `Product`, `categories`, `products[]` (134 записи) | ~10 KB |
| [src/data/product-images.ts](../src/data/product-images.ts) | `imageMap` (slug → /public path), `nameToSlug` (RU name → slug), `getProductImage()` | ~12 KB |
| [src/data/product-descriptions.ts](../src/data/product-descriptions.ts) | `ProductDescription`, описания препаратов | ? |

Тип `Product` сейчас:
```ts
interface Product {
  name: string;
  packaging?: string;
  category: Category;          // 4 значения
  form: ProductForm;           // 10 значений
}
```

### Что должно быть (§4.3, §5.2)

Для SEO нужны таблицы:

#### `products`
- `id`, `slug` (уникальный URL-сегмент), `name`, `name_kk`
- `category_id`, `subcategory_id`, `brand_id`
- `description` (заводское), `expert_comment` (собственный текст 300-500 слов, требование §4.3)
- `active_ingredient`, `dosage_form`, `dosage`, `packaging`
- `indications`, `contraindications`, `application_scheme` (per animal type)
- `storage_conditions`
- `reg_certificate` (номер регистрационного удостоверения РК — обязательное поле §4.3)
- `manufacturer`, `country_of_origin`
- `gtin`, `sku`
- `price_per_unit`, `min_order_qty`, `currency` (KZT)
- `availability` (in_stock / on_order / out_of_stock)
- `images[]` (минимум 3-5 ракурсов §4.3)
- `seo_title`, `seo_description`, `seo_keywords`, `canonical_url`, `og_image`
- `created_at`, `updated_at`, `published_at`

#### `categories`
- `id`, `slug`, `name`, `name_kk`, `parent_id` (для подкатегорий)
- `description` (длинный текст 1500-2000 слов, §5.1)
- `seo_title`, `seo_description`, `og_image`

#### `brands`
- `id`, `slug`, `name`, `logo_url`, `country`
- `description` (800-1200 слов, §5.1)
- `seo_title`, `seo_description`, `og_image`

#### `animal_types`
- `id`, `slug`, `name` (КРС, МРС, свиньи, птица, лошади, собаки, кошки, пушные, пчёлы, рыбы), `name_kk`, `icon`

#### `product_animal_types` (m2m)
- какие препараты для каких животных

#### `regions` (для `/gorod/[city]/`)
- `id`, `slug`, `name`, `name_kk`, `name_local`
- `country` (kz, kg, uz, tj)
- `delivery_info`, `delivery_days`, `delivery_price`
- `regional_manager_id` (FK на staff)
- `seo_title`, `seo_description`

#### `articles` (для блога)
- `id`, `slug`, `title`, `title_kk`, `excerpt`, `body`
- `author_id` (FK на authors)
- `category` (klinika / pitomnik / krs / ptitsa / svini / obzor)
- `cover_image`, `og_image`
- `seo_title`, `seo_description`, `seo_keywords`
- `published_at`, `updated_at`, `read_time`

#### `authors` (критично для E-E-A-T, §5.3)
- `id`, `slug`, `name`, `position`, `photo_url`
- `bio` (CV — обязательно для медицинской тематики)
- `diplomas[]`, `certifications[]`
- `email`, `linkedin`

#### `segments` (для `/optom/[segment]/`)
- `vetklinika`, `pitomnik`, `fermer`, `zooapteka`, `agroholding`
- `description`, `pain_points[]`, `benefits[]`, `cases[]`

#### Дополнительные таблицы
- `faqs` (faq_id, page_type, question, answer) — для FAQPage Schema
- `reviews` (отзывы клиентов с указанием названия клиники, §5.3)
- `cases` (кейсы клиентов, §5.1, 2 в месяц)

### Разрыв и приоритет

- **P0** — спроектировать схему БД, поднять Supabase (или Postgres), мигрировать 134 SKU из `src/data/products.ts` с обогащением полями `slug`, `brand`, `seo_*`, `reg_certificate`.
- **P0** — добавить `manufacturer`, `brand`, `animal_types`, `expert_comment` для каждого товара.
- Объём миграции — **L**: контентная работа на 100+ часов (одно описание препарата с экспертным комментарием на 500 слов × 134 = много).

---

## 8. Изображения и медиа

### Что есть

- **`next/image`** используется. Подтверждено в:
  - [src/app/page.tsx:50, 119](../src/app/page.tsx:50) — hero-логотип и client-лого
  - [src/components/Layout.tsx:26, 95](../src/components/Layout.tsx:26) — лого в header/footer
  - [src/app/catalog/CatalogClient.tsx:168](../src/app/catalog/CatalogClient.tsx:168) — карточки товара (с `fill` и `sizes`)
- **Хранение:** `/public/products/*.{jpg,png,webp}` (134 файла), `/public/clients/*.png` (15), `/public/logo-horizontal.png`. **Локально**, не CDN, не Supabase Storage.
- **Форматы:** mix JPG/PNG/WEBP. WEBP только у вакцин Nobilis/Porcilis (7 файлов). AVIF — нет.
- **Lazy loading:** `next/image` по умолчанию ленив (кроме `priority`). На карточках товара явно `loading="lazy"` ([CatalogClient.tsx:171](../src/app/catalog/CatalogClient.tsx:171)). На главном логотипе `priority` ([page.tsx:54](../src/app/page.tsx:54), [Layout.tsx:32](../src/components/Layout.tsx:32)) — корректно.
- **`alt`-атрибуты:** на всех `<Image>` есть, проверил каждый случай — `alt={p.name}` для товаров, `alt="ECOgrad — ..."` для логотипов, `alt={c.name}` для клиент-лого. ✅

### Что должно быть (§4.3, §6.1, §6.3)

- Хранилище: Supabase Storage или CDN (Cloudflare R2 / BunnyCDN, ближе к Центральной Азии — стратегия §6.1 явно требует CDN с локацией в Азии).
- WebP + AVIF — Next/Image это даёт автоматически через `next.config.ts` (`images.formats: ['image/avif', 'image/webp']`), но **в текущем [next.config.ts](../next.config.ts) пусто** — формат-преобразование при сборке у `next/image` работает, но AVIF не приоритезирован.
- 3-5 ракурсов на товар (§4.3) — сейчас у каждого товара по 1 фото.
- Sertifikat, lab-отчёты, фото склада — отсутствуют.

### Разрыв и приоритет

| Пункт | Приоритет |
|---|---|
| Несколько ракурсов на товар (3-5) | P1 |
| Включить AVIF в `next.config.ts` (`images.formats`) | P2 |
| `next.config.ts` пуст — для производительности добавить `images.minimumCacheTTL`, `images.remotePatterns` (когда появится CDN) | P1 |
| Sertifikat, лицензии — E-E-A-T (§5.3) | P1 |
| Перенос на CDN/Storage (когда вырастет каталог) | P1 |

---

## 9. Core Web Vitals потенциал

### Что есть

- **`next/font/google`** — используется. Manrope в [src/app/layout.tsx:2,5-9](../src/app/layout.tsx:2), с `display: "swap"`, `subsets: ["latin", "cyrillic"]`, CSS-переменная `--font-manrope`. ✅ Хорошо. Поддержки казахских символов (как «Қ», «Ң», «Ғ», «Ұ», «Ү», «І», «Һ», «Ә», «Ө») в подсете `cyrillic` достаточно, но **проверить через PageSpeed** при добавлении KK-страниц.
- **Клиентские компоненты в критическом пути:**
  - [src/components/Layout.tsx](../src/components/Layout.tsx) — целиком клиент, оборачивает всё.
  - [src/app/catalog/CatalogClient.tsx](../src/app/catalog/CatalogClient.tsx) — клиент, ~6 KB.
  - 45 shadcn-компонентов в [src/components/ui/](../src/components/ui) — клиентские, импортируются по требованию (tree-shaking). Реально используются: `dialog`, `scroll-area` в каталоге.
- **Бандл-размер** (приблизительно, по [package.json](../package.json) deps): risk-факторы:
  - `recharts@3.8.1` — 230+ KB, если попадёт в бандл. Сейчас **не используется**, только импортируется в `chart.tsx` из shadcn. Tree-shaking должен убрать, проверить через `npm run build` + bundle-analyzer.
  - `embla-carousel-react@8.6.0` — 30+ KB, не используется.
  - `react-day-picker@10` — 80+ KB, не используется.
  - `cmdk@1.1.1` — 20+ KB, не используется.
  - `vaul@1.1.2` — 10+ KB, не используется.
  - **Все** установлены, но если они не импортируются в реальных страницах (а они не импортируются вне `components/ui/`), tree-shaking уберёт их из бандла. Это надо подтвердить bundle-analyzer'ом.
- **CLS-риски:**
  - [src/app/page.tsx:50](../src/app/page.tsx:50) — hero-логотип, `width={1600} height={320}` + `className="w-full h-auto"` — может дать CLS, потому что Next/Image использует width/height для аспекта, но `h-auto` его перебивает. **Проверить через Lighthouse.**
  - Маркиз клиентских лого ([page.tsx:115-127](../src/app/page.tsx:115)) — fixed-size контейнеры `h-20 w-40` с `Image fill`. Нет CLS. ✅
  - Карточки товара ([CatalogClient.tsx:163-186](../src/app/catalog/CatalogClient.tsx:163)) — `aspect-square` + `Image fill`. Нет CLS. ✅
- **Шрифт.** `Manrope` через next/font self-host, нет FOUT/FOIT. ✅

### Что должно быть (§6.1, §6.3)

- **LCP < 2.5s.** Текущий LCP скорее всего будет HERO-изображение `/logo-horizontal.png` (priority). Размер логотипа сейчас 280 KB? — нужно проверить и оптимизировать в WebP/AVIF.
- **INP < 200ms.** Каталог с 134 карточками рендерится одной страницей — потенциальный риск INP при фильтрации (`useMemo` на 134 элементов — норм, но при росте до 500+ потребует виртуализации).
- **CLS < 0.1.** Все Image должны иметь явные размеры. Проверить hero-логотип.

### Разрыв и приоритет

| Пункт | Приоритет |
|---|---|
| Bundle-analyzer прогон + удаление неиспользуемых shadcn-компонентов | P1 |
| Hero-логотип: проверить размер и формат, перевести в AVIF | P1 |
| Виртуализация каталога при росте >500 SKU | P2 |
| Расщепить Layout на server header + client active-nav | P2 |

---

## 10. Аналитика и инструменты

### Что есть

**Ничего.**
- Нет GA4, нет Яндекс.Метрики, нет GTM.
- Нет верификации Google Search Console / Яндекс.Вебмастер.
- Нет `@next/third-parties` в [package.json](../package.json).

### Что должно быть (§9.2)

1. **Google Analytics 4** через `@next/third-parties/google` `<GoogleAnalytics gaId="G-..." />` в [layout.tsx](../src/app/layout.tsx).
2. **Яндекс.Метрика** (приоритет в СНГ, с вебвизором) — через `<Script />` в layout.
3. **Google Search Console** — верификация через `metadata.verification.google` или meta-тег.
4. **Яндекс.Вебмастер** — верификация через `metadata.verification.yandex`.
5. **Google Tag Manager** (опционально, если будут пиксели рекламы) — через `@next/third-parties/google`.
6. **Conversion tracking** — события: WhatsApp-клик, открытие диалога описания, переход на /contacts, отправка формы.

### Разрыв и приоритет

**P0** — без аналитики невозможно отслеживать KPI (§9.1: трафик, позиции, лиды). Объём — **S** (одна сессия на 4 счётчика + verification + базовые события).

---

## 11. Прочее

### 11.1. Спец-страницы

| Файл | Статус | Приоритет |
|---|---|---|
| `app/not-found.tsx` | ❌ нет | **P0** — используется встроенная Next.js 404, не оптимизирована, нет навигации обратно |
| `app/error.tsx` | ❌ нет | P1 — клиентский error boundary, для production |
| `app/global-error.tsx` | ❌ нет | P1 — root-level errors |
| `app/loading.tsx` | ❌ нет | P2 — пока страницы быстрые, не нужно |
| `app/catalog/loading.tsx` | ❌ нет | P1 — каталог самый тяжёлый, нужен skeleton |

### 11.2. Прочие SEO-проблемы, замеченные при чтении

1. **`metadataBase` не задан.** [layout.tsx](../src/app/layout.tsx) не имеет `metadataBase: new URL("https://ecograd.kz")`. Без него все относительные пути в `openGraph.images`, canonical и т.д. некорректны. **P0**.

2. **OG-картинка — на внешнем R2 Lovable.** [layout.tsx:13](../src/app/layout.tsx:13). Может в любой момент исчезнуть. **P1**.

3. **`<a>` для WhatsApp на главной и в шапке** ([page.tsx:81](../src/app/page.tsx:81), [Layout.tsx:46](../src/components/Layout.tsx:46), [Layout.tsx:84](../src/components/Layout.tsx:84)) — корректно `target="_blank" rel="noopener noreferrer"`. ✅

4. **Twitter `@Lovable`** ([layout.tsx:32](../src/app/layout.tsx:32)) — наследие шаблона, заменить на @ecograd_kz. P2.

5. **Slug алгоритма у товаров пока только через `nameToSlug`** ([product-images.ts](../src/data/product-images.ts)) — латинизация русских названий, например, «Феррум В12» → `ferrum+v12`. Это **не SEO-slug**: символ `+`, регистр inconsistent (`ferrum_200` vs `ferrum+v12`), нет понятности для пользователя. Когда дойдёт до маршрутов `/catalog/.../[slug]`, нужны slug вида `ferrum-v12-injektsionnyy-rastvor`. P0 (вместе с маршрутами).

6. **Footer-меню каталога указывает на `/catalog?category=...`** ([Layout.tsx:106-109](../src/components/Layout.tsx:106)) — после реализации структуры заменить на `/catalog/vakciny/`, `/catalog/antibiotiki/` и т.д.

7. **Контакты не размечены `Person`/`PostalAddress`.** Адрес «г. Алматы, Татибекова 10, офис 4» в [Layout.tsx:114](../src/components/Layout.tsx:114) — простой текст. Нужна Schema `LocalBusiness` с `address` (PostalAddress: streetAddress, addressLocality, addressCountry).

8. **Нет страницы политики обработки персональных данных.** Требование казахстанского законодательства (закон РК «О персональных данных и их защите»), плюс важно для Google Ads, если будут лиды через формы. P1.

9. **Категория «Моющие и дезинфицирующие средства»** ([products.ts:28](../src/data/products.ts:28)) на 1 SKU («Хачонет» и пр., всего 7) — это **нормально**, но в категорийной странице важно не оставлять её полупустой. Стратегия §5.1 требует 1500-2000 слов в категории.

10. **`title` шаблона у Lovable** в layout — заменён, ✅. Но `description` ([layout.tsx:17-18](../src/app/layout.tsx:17)) до сих пор шаблонный «Pet Pharma Hub is a website...» — **на английском!** Надо переписать на русском под коммерческие ключи: «Оптовые поставки ветеринарных препаратов в Казахстане — вакцины, антибиотики, витамины, дезсредства для ферм и птицефабрик». **P0**.

---

## Сводная таблица приоритетов

| # | Задача | Приоритет | Трудоёмкость | Зависимости |
|---|---|---|---|---|
| 1 | Спроектировать схему БД (Supabase или Postgres), мигрировать 134 SKU | P0 | L | — |
| 2 | Создать динамические маршруты `/catalog/[category]/[subcategory]/[slug]` | P0 | L | #1 |
| 3 | Создать `/brands/[slug]` | P0 | M | #1 |
| 4 | Создать `/blog`, `/blog/[slug]` + первые 5-8 статей | P0 | L | #1, авторы-ветврачи |
| 5 | `app/sitemap.ts` (динамический, разделение sitemap_index) | P0 | M | #2, #3, #4 |
| 6 | `app/robots.ts` | P0 | S | — |
| 7 | JSON-LD: Organization, WebSite, BreadcrumbList в layout + страницах | P0 | M | — |
| 8 | JSON-LD: Product Schema на карточке | P0 | M | #2 |
| 9 | `metadataBase`, canonical на каждой странице | P0 | S | — |
| 10 | `generateMetadata` для slug-маршрутов | P0 | M | #2 |
| 11 | `not-found.tsx` + переписать description главной/каталога на коммерческие ключи | P0 | S | — |
| 12 | Подключить GA4 + Яндекс.Метрика + verification GSC/Я.Вебмастер | P0 | S | домен закреплён |
| 13 | Свежий next.config.ts: `metadataBase`, `images.formats`, `images.remotePatterns` | P0 | S | — |
| 14 | Создать `/dlya/[animal-type]` (КРС, птица, свиньи и т.д.) | P1 | M | #1 |
| 15 | Создать `/gorod/[city]` × 14 городов РК | P1 | M | #1, контент |
| 16 | Создать `/optom/[segment]` × 5-7 сегментов | P1 | M | контент |
| 17 | `/o-kompanii/eksperty`, `/o-kompanii/litsenzii` (E-E-A-T) | P1 | M | контент, фото лицензий |
| 18 | JSON-LD: FAQPage в карточках товара | P1 | S | #2, FAQ-контент |
| 19 | JSON-LD: Article на статьях блога с author | P1 | S | #4, #17 |
| 20 | JSON-LD: LocalBusiness (`VeterinaryCare`?) на главной + /contacts + /gorod/* | P1 | S | — |
| 21 | i18n (next-intl), `/ru/...`, `/kk/...`, hreflang | P1 | L | переводчик |
| 22 | Расщепить `Layout.tsx` на server header + client active-nav | P1 | S | — |
| 23 | Заменить OG-картинку на свою, в `/public/og-default.png` | P1 | S | дизайнер |
| 24 | Перевести Hero-логотип в AVIF + аудит CLS | P1 | S | — |
| 25 | Добавить «3-5 ракурсов на товар» в фотобанк | P1 | L | фотограф |
| 26 | Bundle-analyzer + удалить неиспользуемые shadcn-компоненты | P1 | S | — |
| 27 | `error.tsx`, `global-error.tsx`, `loading.tsx` (catalog) | P1 | S | — |
| 28 | Footer/Header: заменить `/catalog?category=...` на новые URL | P1 | S | #2 |
| 29 | Страница «Политика обработки персональных данных» | P1 | S | юрист |
| 30 | Twitter handle на @ecograd_kz | P2 | S | соцсети |
| 31 | Виртуализация каталога (при >500 SKU) | P2 | M | #1 |
| 32 | Подключить CDN для медиа | P2 | M | бюджет |
| 33 | Регистрация в Google Business, Яндекс.Бизнес, 2GIS | P1 | M | — (вне кода) |

**Итог:** ~13 задач P0, ~17 задач P1, ~3 задачи P2. P0-блок — реальный фундамент, без него можно не начинать; P1 — наполнение и расширение.

---

## Рекомендуемая последовательность сессий

Опираясь на дорожную карту §10 стратегии (Фаза 1: «фундамент, месяцы 1–2») и текущее состояние:

### Сессия 1. Схема БД и контент-модель (4–6 ч)
**Цель:** спроектировать таблицы Postgres/Supabase, определить все SEO-поля.
**Задачи:** ER-диаграмма (`products`, `categories`, `brands`, `animal_types`, `regions`, `articles`, `authors`, `segments`, `faqs`, `reviews`). Миграция Supabase. Скрипт импорта 134 SKU из [src/data/products.ts](../src/data/products.ts) с обогащением полем `slug` (через ручную транслитерацию), `brand` (из имени), `seo_title`, `seo_description` (генерация на основе шаблона).
**Зависимости:** ничего.

### Сессия 2. Динамические маршруты каталога (4–5 ч)
**Цель:** перейти с `?category=...` на `/catalog/[category]/[subcategory]/[slug]/`.
**Задачи:** создать `app/catalog/[category]/page.tsx` (server, ISR), `app/catalog/[category]/[subcategory]/page.tsx`, `app/catalog/[category]/[subcategory]/[slug]/page.tsx`. `generateStaticParams` для 4 категорий и 134 товаров. `generateMetadata` тянет `seo_title`/`seo_description` из БД. Старый `/catalog` оставить как обзор/посадку категории «всё». Старые ссылки `?category=` через 301 на новые URL.
**Зависимости:** #1.

### Сессия 3. Sitemap, robots, метаданные базовые (2–3 ч)
**Цель:** дать поисковикам корректную карту и инструкции.
**Задачи:** `app/sitemap.ts` (динамический, из БД), `app/robots.ts`, `metadataBase` в [layout.tsx](../src/app/layout.tsx), canonical на каждой странице (`alternates: { canonical: ... }`), переписать description главной/каталога/about/contacts на коммерческие ключи.
**Зависимости:** #1, #2 (sitemap опирается на маршруты).

### Сессия 4. JSON-LD каркас + Product Schema (3–4 ч)
**Цель:** разметить ключевые типы.
**Задачи:** утилита `lib/json-ld.ts` для генерации Schema. В layout — `Organization`, `WebSite + SearchAction`. В каждой странице — `BreadcrumbList`. На карточке товара — `Product` с `offers{price:KZT, availability}`. Рендерится в Server Component через `<script type="application/ld+json">`.
**Зависимости:** #2.

### Сессия 5. Бренд-страницы + posadochnye /dlya и /optom (4–5 ч)
**Цель:** покрыть запросы Уровня 3 (бренды) и B2B-сегменты (стратегия §3.1, §5.1).
**Задачи:** `app/brands/[slug]/page.tsx`, `app/dlya/[animal]/page.tsx`, `app/optom/[segment]/page.tsx`. Каждой странице — 800-1500 слов через копирайтера. Slug-список брендов из БД.
**Зависимости:** #1, #2.

### Сессия 6. Аналитика + GSC/Я.Вебмастер verification (1–2 ч)
**Цель:** подключить все измерительные инструменты до старта индексации.
**Задачи:** `@next/third-parties/google` для GA4, Яндекс.Метрика через `next/script` (strategy `afterInteractive`), `metadata.verification.{google,yandex}` в layout. Создать события для WhatsApp-клика, открытия диалога, перехода на /contacts.
**Зависимости:** аккаунты GA/GSC/Я.Вебмастер у владельца.

### Сессия 7. Блог: каркас + первые 8 статей (5–8 ч за каркас, контент отдельно)
**Цель:** запустить раздел `/blog/` и опубликовать первые статьи по приоритетным темам §5.2.
**Задачи:** `app/blog/page.tsx` (список + пагинация), `app/blog/[slug]/page.tsx` (статья + `Article` schema + author), `app/o-kompanii/eksperty/page.tsx` (E-E-A-T страница экспертов). Статьи Фазы 1: «Программа вакцинации кур-несушек», «План ветобработок КРС на год», «Хранение вакцин и холодовая цепь», «Биобезопасность фермы», 4 ещё.
**Зависимости:** #1 (таблицы articles, authors), автор-ветврач.

### Сессия 8. Региональные посадочные (Алматы + 5 городов) (4–5 ч)
**Цель:** запустить /gorod/almaty/, /gorod/astana/, /gorod/shymkent/, /gorod/karaganda/, /gorod/atyrau/, /gorod/aktobe/ (стратегия §10, Фаза 2, месяцы 3–5; вынес сюда раньше — города критично-стартовые).
**Задачи:** `app/gorod/[city]/page.tsx` с `generateStaticParams`, `LocalBusiness` schema на каждой, уникальный контент per city (доставка, локальные клиенты).
**Зависимости:** #1, #4 (schema).

### Сессия 9. Изображения, перфоманс, CWV (3–4 ч)
**Цель:** довести Core Web Vitals до зелёных значений.
**Задачи:** прогон `next build` + `@next/bundle-analyzer`, удаление неиспользуемых shadcn (chart, calendar, carousel и т.д. — около 10-15 файлов из 45), переключение `images.formats: ['image/avif', 'image/webp']` в [next.config.ts](../next.config.ts), Hero-логотип в AVIF, Lighthouse-аудит главной и каталога с фиксом CLS, `loading.tsx` для каталога. Расщепить [Layout.tsx](../src/components/Layout.tsx) на server-header + tiny client-island для active state.
**Зависимости:** #2 (новые маршруты влияют на бандл).

### Сессия 10. i18n: казахская версия (6–10 ч)
**Цель:** добавить `/kk/` ключевых страниц, hreflang.
**Задачи:** установить `next-intl`, перенести роуты в `app/[locale]/`, словари ru/kk, переводы для главной, каталога и 4 категорий, `alternates.languages` + `hreflang` в metadata.
**Зависимости:** #1, #2, переводчик-носитель.

---

**Общий план в часах (только разработка, без контентной работы):** ~45-55 часов на сессии 1-10. Контентная работа (тексты категорий, бренд-страниц, городов, блога, экспертные комментарии к товарам) — отдельно, ~150-250 часов с привлечением копирайтера и ветврачей-консультантов.

После сессий 1-10 проект соответствует §10 стратегии «Фаза 1. Фундамент» и большей части «Фазы 2. Контентная база» — можно переходить к линкбилдингу и масштабированию.
