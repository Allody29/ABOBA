import { productGroups } from "@/data/products";
import { getProductDescription } from "@/data/product-descriptions";
import { descriptionSections } from "@/lib/description-sections";

// Описание одного препарата для окна быстрого просмотра в каталоге.
// Генерируется статически при сборке, чтобы описания не попадали в JS каталога.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return productGroups
    .filter((g) => getProductDescription(g.slug))
    .map((g) => ({ slug: g.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sections = descriptionSections(getProductDescription(slug));
  if (!sections.length) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json({ sections });
}
