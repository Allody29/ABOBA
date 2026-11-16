import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** Хлебные крошки + разметка BreadcrumbList. Последний элемент — текущая страница. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Хлебные крошки" className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-medium text-secondary">
                    {it.name}
                  </span>
                ) : (
                  <>
                    <Link href={it.path} className="inline-flex min-h-11 items-center hover:text-secondary hover:underline">
                      {it.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
