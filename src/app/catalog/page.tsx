import type { Metadata } from "next";
import { z } from "zod";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог препаратов — ECOgrad",
  description:
    "Каталог ветеринарных препаратов ECOgrad: антибиотики, вакцины, витамины и дезсредства с фильтром по категориям и форме выпуска.",
};

const categoryValues = ["all", "antibiotics", "disinfectants", "vaccines", "vitamins"] as const;

const searchSchema = z.object({
  category: z.enum(categoryValues).catch("all"),
  q: z.string().catch(""),
});

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const raw = await searchParams;
  const parsed = searchSchema.parse({
    category: typeof raw.category === "string" ? raw.category : undefined,
    q: typeof raw.q === "string" ? raw.q : undefined,
  });
  return <CatalogClient initialCategory={parsed.category} initialQuery={parsed.q} />;
}
