import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import { categories, getProductGroup, productGroups } from "@/data/products";
import { getProductDescription } from "@/data/product-descriptions";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { descriptionSections } from "@/lib/description-sections";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { PHONE_DISPLAY, PHONE_HREF, SITE_URL, priceRequestText, whatsappUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return productGroups.map((g) => ({ slug: g.slug }));
}

function shorten(s: string, max = 160): string {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).replace(/\s\S*$/, "") + "…" : t;
}

function metaDescription(slug: string): string {
  const g = getProductGroup(slug)!;
  const d = getProductDescription(slug);
  const base = d?.description ?? d?.composition;
  const pack = g.packagings.length ? ` Фасовка: ${g.packagings.join(", ")}.` : "";
  return shorten(
    base
      ? `${g.name} — ${base}`
      : `${g.name}: ${g.form.toLowerCase()} для животноводства и птицеводства.${pack} Оптовые поставки по Казахстану, цена по запросу.`,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getProductGroup(slug);
  if (!g) return {};
  const meta = pageMetadata({
    title: `${g.name} — купить оптом в Казахстане | ECOgrad`,
    description: metaDescription(slug),
    path: `/catalog/${slug}`,
  });
  if (g.image) {
    meta.openGraph = { ...meta.openGraph, images: [{ url: g.image, alt: g.name }] };
    meta.twitter = { ...meta.twitter, images: [g.image] };
  }
  return meta;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getProductGroup(slug);
  if (!g) notFound();

  const d = getProductDescription(slug);
  const sections = descriptionSections(d);
  const cat = categories[g.category];
  const packagingText = g.packagings.join(", ");
  const related = productGroups
    .filter((x) => x.slug !== g.slug && x.form === g.form)
    .slice(0, 6);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: g.name,
    url: absoluteUrl(`/catalog/${g.slug}`),
    ...(g.image ? { image: absoluteUrl(g.image) } : {}),
    ...(d?.description || d?.composition
      ? { description: shorten((d.description ?? d.composition)!, 500) }
      : {}),
    category: `${cat.label} / ${g.form}`,
    seller: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Главная", path: "/" },
          { name: "Каталог", path: "/catalog" },
          { name: cat.label, path: `/catalog?category=${g.category}` },
          { name: g.name, path: `/catalog/${g.slug}` },
        ]}
      />
      <JsonLd data={productJsonLd} />

      <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-white">
            {g.image ? (
              <Image
                src={g.image}
                alt={g.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-6"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Фото по запросу
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary-strong">{g.form}</div>
            <h1 className="mt-2 break-words text-3xl font-extrabold leading-tight text-secondary sm:text-4xl md:text-5xl">
              {g.name}
            </h1>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-muted-foreground">Категория</dt>
                <dd className="mt-1 font-semibold text-secondary">
                  <Link href={`/catalog?category=${g.category}`} className="-my-3 inline-block py-3 hover:underline">
                    {cat.label}
                  </Link>
                </dd>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-muted-foreground">Фасовка</dt>
                <dd className="mt-1 font-semibold text-secondary">{packagingText || "уточняйте у менеджера"}</dd>
              </div>
            </dl>
            {d?.description && <p className="mt-6 text-muted-foreground">{d.description}</p>}

            <div className="mt-8 rounded-3xl bg-accent p-5 sm:p-6">
              <div className="font-semibold text-secondary">Цена — по запросу</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Пришлём актуальную цену и наличие в WhatsApp или ответим по телефону {PHONE_DISPLAY}.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl(priceRequestText(g.name, packagingText))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-place="product-page"
                  data-track-product={g.name}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-secondary px-5 text-sm font-semibold text-secondary-foreground"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Запросить цену в WhatsApp
                </a>
                <a
                  href={PHONE_HREF}
                  data-track-place="product-page"
                  data-track-product={g.name}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-secondary/20 bg-white px-5 text-sm font-semibold text-secondary"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>

        {sections.filter((s) => s.id !== "description").length > 0 ? (
          <div className="mt-12 max-w-3xl space-y-8">
            {sections
              .filter((s) => s.id !== "description")
              .map((s) => (
                <section key={s.id} aria-labelledby={`sec-${s.id}`}>
                  <h2 id={`sec-${s.id}`} className="text-xl font-bold text-secondary sm:text-2xl">
                    {s.label}
                  </h2>
                  <p className="mt-3 whitespace-pre-line break-words leading-relaxed text-foreground">
                    {s.value}
                  </p>
                </section>
              ))}
            <p className="text-sm text-muted-foreground">
              Информация приведена по инструкции производителя и носит справочный характер. Перед
              применением проконсультируйтесь с ветеринарным врачом.
            </p>
          </div>
        ) : (
          <p className="mt-12 max-w-3xl text-muted-foreground">
            Подробное описание и инструкцию по применению пришлёт менеджер по запросу.
          </p>
        )}

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-title">
            <h2 id="related-title" className="text-2xl font-extrabold text-secondary sm:text-3xl">
              Похожие препараты
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/catalog/${r.slug}`}
                    className="flex min-h-20 items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-card transition-all hover:border-primary/40"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                      {r.image && (
                        <Image src={r.image} alt="" fill sizes="64px" className="object-contain p-1" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-secondary">{r.name}</div>
                      <div className="text-sm text-muted-foreground">{r.packagings.join(", ")}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
