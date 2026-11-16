import { Suspense } from "react";
import { categories, productGroups, products } from "@/data/products";
import { getProductDescription } from "@/data/product-descriptions";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { normalizeSearch } from "@/lib/search";
import { CatalogClient, CatalogView, type CatalogItem } from "./CatalogClient";

export const metadata = pageMetadata({
  title: "Каталог ветеринарных препаратов — ECOgrad, Казахстан",
  description:
    "Каталог ветеринарных препаратов ECOgrad: антибиотики, вакцины, витамины и дезсредства оптом. Фильтр по категориям и форме выпуска, цены по запросу.",
  path: "/catalog",
});

/** Короткий поисковый индекс: название, форма, категория и начало состава. */
function searchIndex(p: (typeof products)[number]): string {
  const d = getProductDescription(p.slug);
  const composition = (d?.composition ?? "").slice(0, 400);
  return normalizeSearch(
    [p.name, p.packaging, p.form, categories[p.category].label, composition].filter(Boolean).join(" "),
  );
}

const items: CatalogItem[] = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  packaging: p.packaging,
  category: p.category,
  form: p.form,
  image: p.image,
  hasDescription: !!getProductDescription(p.slug),
  search: searchIndex(p),
}));

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Каталог ветеринарных препаратов ECOgrad",
  numberOfItems: productGroups.length,
  itemListElement: productGroups.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: absoluteUrl(`/catalog/${g.slug}`),
    name: g.name,
  })),
};

export default function CatalogPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Главная", path: "/" },
          { name: "Каталог", path: "/catalog" },
        ]}
      />
      <JsonLd data={itemListJsonLd} />
      {/* Страница статическая: параметры ?category, ?form и ?q читаются на клиенте.
          До гидратации показывается полный каталог без фильтров. */}
      <Suspense fallback={<CatalogView items={items} category="all" form="all" urlQuery="" />}>
        <CatalogClient items={items} />
      </Suspense>
    </div>
  );
}
