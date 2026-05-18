"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Info } from "lucide-react";
import { categories, products, type Category, type Product } from "@/data/products";
import { getProductImage } from "@/data/product-images";
import { getProductDescription, type ProductDescription } from "@/data/product-descriptions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const categoryValues = ["all", "antibiotics", "disinfectants", "vaccines", "vitamins"] as const;
type CategoryFilter = (typeof categoryValues)[number];

export function CatalogClient({
  initialCategory,
  initialQuery,
}: {
  initialCategory: CategoryFilter;
  initialQuery: string;
}) {
  const router = useRouter();
  const [category, setCategoryState] = useState<CategoryFilter>(initialCategory);
  const [q, setQ] = useState<string>(initialQuery);
  const [form, setForm] = useState<string>("all");
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  const openDescription = openProduct ? getProductDescription(openProduct.name) : undefined;

  // sync state if URL changes externally (e.g. via footer links)
  useEffect(() => {
    setCategoryState(initialCategory);
    setQ(initialQuery);
  }, [initialCategory, initialQuery]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (form !== "all" && p.form !== form) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [category, form, q]);

  const formsForCategory = useMemo(() => {
    const list = products
      .filter((p) => category === "all" || p.category === category)
      .map((p) => p.form);
    return Array.from(new Set(list));
  }, [category]);

  const pushSearch = useCallback(
    (next: { category: CategoryFilter; q: string }, replace: boolean) => {
      const params = new URLSearchParams();
      if (next.category !== "all") params.set("category", next.category);
      if (next.q) params.set("q", next.q);
      const url = params.toString() ? `/catalog?${params.toString()}` : "/catalog";
      if (replace) router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    },
    [router]
  );

  const setCategory = (c: CategoryFilter) => {
    setForm("all");
    setCategoryState(c);
    pushSearch({ category: c, q }, false);
  };
  const setQuery = (v: string) => {
    setQ(v);
    pushSearch({ category, q: v }, true);
  };

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-[var(--sky-soft)] to-background">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">Каталог</div>
          <h1 className="mt-2 text-5xl font-extrabold text-secondary md:text-6xl">
            Препараты ECOgrad
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {products.length} наименований в 4 категориях. Цены — по запросу у менеджера.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          {/* SIDEBAR FILTERS */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Поиск
              </div>
              <input
                value={q}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Название препарата…"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Категории
              </div>
              <div className="mt-3 space-y-1">
                <FilterPill active={category === "all"} onClick={() => setCategory("all")} count={products.length}>
                  Все препараты
                </FilterPill>
                {(Object.keys(categories) as Category[]).map((key) => {
                  const count = products.filter((p) => p.category === key).length;
                  return (
                    <FilterPill key={key} active={category === key} onClick={() => setCategory(key)} count={count}>
                      {categories[key].label}
                    </FilterPill>
                  );
                })}
              </div>
            </div>

            {formsForCategory.length > 1 && (
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Форма выпуска
                </div>
                <div className="mt-3 space-y-1">
                  <FilterPill active={form === "all"} onClick={() => setForm("all")}>
                    Все формы
                  </FilterPill>
                  {formsForCategory.map((f) => (
                    <FilterPill key={f} active={form === f} onClick={() => setForm(f)}>
                      {f}
                    </FilterPill>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* RESULTS */}
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground">
                Найдено <span className="font-semibold text-secondary">{filtered.length}</span>{" "}
                препаратов
                {category !== "all" && (
                  <>
                    {" в категории "}
                    <span className="font-semibold text-secondary">
                      {categories[category as Category].label}
                    </span>
                  </>
                )}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
                <div className="text-2xl font-bold text-secondary">Ничего не найдено</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Попробуйте изменить фильтры или сбросить поиск.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => {
                  const img = getProductImage(p.name);
                  return (
                    <article
                      key={i}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[var(--sky-soft)] to-accent">
                        {img ? (
                          <Image
                            src={img}
                            alt={p.name}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            Фото по запросу
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {p.form}
                        </div>
                        <h3 className="mt-2 text-lg font-bold leading-tight text-secondary">
                          {p.name}
                        </h3>
                        {p.packaging && (
                          <div className="mt-1.5 text-sm text-muted-foreground">
                            Фасовка: {p.packaging}
                          </div>
                        )}
                        {getProductDescription(p.name) && (
                          <button
                            type="button"
                            onClick={() => setOpenProduct(p)}
                            className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            <Info className="h-3.5 w-3.5" />
                            Описание
                          </button>
                        )}
                        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                            {categories[p.category].label}
                          </span>
                          <Link
                            href="/contacts"
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Узнать цену →
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductDescriptionDialog
        product={openProduct}
        description={openDescription}
        onClose={() => setOpenProduct(null)}
      />
    </div>
  );
}

function ProductDescriptionDialog({
  product,
  description,
  onClose,
}: {
  product: Product | null;
  description?: ProductDescription;
  onClose: () => void;
}) {
  const sections: Array<{ label: string; value?: string }> = [
    { label: "Описание", value: description?.description },
    { label: "Состав / Действующие вещества", value: description?.composition },
    { label: "Показания к применению", value: description?.indications },
    { label: "Способ применения и дозировка", value: description?.dosage },
    { label: "Фармакологические свойства", value: description?.pharmacology },
    { label: "Побочные реакции", value: description?.sideEffects },
    { label: "Период ожидания", value: description?.waitPeriod },
    { label: "Условия хранения", value: description?.storage },
    { label: "Дополнительная информация", value: description?.extra },
  ].filter((s) => s.value);

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-secondary">{product?.name}</DialogTitle>
          {product?.form && (
            <DialogDescription className="text-xs font-semibold uppercase tracking-wider text-primary">
              {product.form}
              {product.packaging ? ` · ${product.packaging}` : ""}
            </DialogDescription>
          )}
        </DialogHeader>
        <ScrollArea className="max-h-[65vh] pr-4">
          <div className="space-y-5">
            {sections.map((s) => (
              <div key={s.label}>
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  {s.label}
                </div>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function FilterPill({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors " +
        (active
          ? "bg-secondary text-secondary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-secondary")
      }
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={"text-xs " + (active ? "text-secondary-foreground/70" : "text-muted-foreground")}>
          {count}
        </span>
      )}
    </button>
  );
}
