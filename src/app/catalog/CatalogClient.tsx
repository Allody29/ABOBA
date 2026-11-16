"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Info, MessageCircle, Phone, SlidersHorizontal, X } from "lucide-react";
import { categories, isCategory, type Category, type CategoryFilter, type ProductForm } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackEvent } from "@/components/Analytics";
import { ITEM_FORMS, PRODUCT_FORMS, plural } from "@/lib/plural";
import { matchesQuery } from "@/lib/search";
import { PHONE_HREF, priceRequestText, whatsappUrl } from "@/lib/site";

export interface CatalogItem {
  slug: string;
  name: string;
  packaging?: string;
  category: Category;
  form: ProductForm;
  image?: string;
  hasDescription: boolean;
  search: string;
}

const PAGE_SIZE = 24;

/** Формы, совпадающие по смыслу с категориями, в общем списке не показываем. */
const FORMS_DUPLICATING_CATEGORIES = new Set<string>(["Дезсредство", "Вакцина", "Витаминный комплекс"]);

/** Обновление адреса без запроса к серверу (Next синхронизирует useSearchParams). */
function writeUrl(next: { category: CategoryFilter; form: string; q: string }, mode: "push" | "replace") {
  const params = new URLSearchParams();
  if (next.category !== "all") params.set("category", next.category);
  if (next.form !== "all") params.set("form", next.form);
  if (next.q) params.set("q", next.q);
  const qs = params.toString();
  const url = qs ? `/catalog?${qs}` : "/catalog";
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
}

export function CatalogClient({ items }: { items: CatalogItem[] }) {
  const sp = useSearchParams();
  const rawCategory = sp.get("category");
  const category: CategoryFilter = isCategory(rawCategory) ? rawCategory : "all";
  const rawForm = sp.get("form") ?? "all";
  const form = rawForm !== "all" && items.some((i) => i.form === rawForm) ? rawForm : "all";
  const q = sp.get("q") ?? "";
  return <CatalogView items={items} category={category} form={form} urlQuery={q} interactive />;
}

export function CatalogView({
  items,
  category,
  form,
  urlQuery,
  interactive = false,
}: {
  items: CatalogItem[];
  category: CategoryFilter;
  form: string;
  urlQuery: string;
  interactive?: boolean;
}) {
  const [q, setQ] = useState(urlQuery);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openItem, setOpenItem] = useState<CatalogItem | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const lastWrittenQ = useRef(urlQuery);

  // Синхронизация поля поиска при внешней смене адреса («Назад/Вперёд», ссылки),
  // но не при собственном replaceState во время набора.
  useEffect(() => {
    if (urlQuery !== lastWrittenQ.current) {
      lastWrittenQ.current = urlQuery;
      setQ(urlQuery);
    }
  }, [urlQuery]);

  // Новый набор фильтров — снова показываем первую страницу.
  const filterKey = `${category}|${form}|${q}`;
  const [paging, setPaging] = useState({ key: filterKey, limit: PAGE_SIZE });
  const limit = paging.key === filterKey ? paging.limit : PAGE_SIZE;

  // Цель аналитики «поиск» — после паузы в наборе.
  useEffect(() => {
    if (!q.trim()) return;
    const t = setTimeout(() => trackEvent("catalog_search", { q: q.trim() }), 1200);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(
    () =>
      items.filter((p) => {
        if (category !== "all" && p.category !== category) return false;
        if (form !== "all" && p.form !== form) return false;
        return matchesQuery(p.search, q);
      }),
    [items, category, form, q],
  );

  const formsForCategory = useMemo(() => {
    const list = items
      .filter((p) => category === "all" || p.category === category)
      .map((p) => p.form as string)
      .filter((f) => category !== "all" || !FORMS_DUPLICATING_CATEGORIES.has(f));
    return Array.from(new Set(list));
  }, [items, category]);

  const setCategory = (c: CategoryFilter) => {
    writeUrl({ category: c, form: "all", q }, "push");
  };
  const setForm = (f: string) => {
    writeUrl({ category, form: f, q }, "push");
  };
  const setQuery = (v: string) => {
    setQ(v);
    lastWrittenQ.current = v;
    writeUrl({ category, form, q: v }, "replace");
  };
  const resetAll = () => {
    setQ("");
    lastWrittenQ.current = "";
    writeUrl({ category: "all", form: "all", q: "" }, "push");
  };

  const openDescription = useCallback((item: CatalogItem, opener: HTMLElement) => {
    openerRef.current = opener;
    setOpenItem(item);
    trackEvent("description_open", { product: item.name });
  }, []);

  const hasConsumables = filtered.some((p) => p.form === "Расходный материал");
  const nounForms = hasConsumables ? ITEM_FORMS : PRODUCT_FORMS;
  const n = filtered.length;
  const foundWord = n % 10 === 1 && n % 100 !== 11 ? "Найден" : "Найдено";
  const visible = filtered.slice(0, limit);
  const activeFilters =
    (category !== "all" ? 1 : 0) + (form !== "all" ? 1 : 0) + (q.trim() ? 1 : 0);

  const categoryCount = (key: Category) => items.filter((p) => p.category === key).length;

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-[var(--sky-soft)] to-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-14">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary-strong">Каталог</div>
          <h1 className="mt-2 break-words text-3xl font-extrabold text-secondary sm:text-4xl md:text-6xl">
            Ветеринарные препараты ECOgrad
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground md:mt-4">
            {items.length} наименований в {Object.keys(categories).length} категориях. Цены — по
            запросу у менеджера.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-12">
        <div className="grid gap-6 md:grid-cols-[280px_1fr] md:gap-10">
          {/* FILTERS */}
          <aside className="min-w-0 space-y-4 md:space-y-6" aria-label="Фильтры каталога">
            <div className="md:rounded-2xl md:border md:border-border md:bg-card md:p-5 md:shadow-card">
              <label
                htmlFor="catalog-search"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Поиск
              </label>
              <input
                id="catalog-search"
                name="q"
                type="search"
                value={q}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Название или действующее вещество…"
                autoComplete="off"
                disabled={!interactive}
                className="mt-2 min-h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 md:text-sm"
              />
            </div>

            {/* Категории: горизонтальная лента на мобильном, список на десктопе */}
            <div className="md:rounded-2xl md:border md:border-border md:bg-card md:p-5 md:shadow-card">
              <div
                id="filter-categories"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Категории
              </div>
              <div
                role="group"
                aria-labelledby="filter-categories"
                className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:mt-3 md:block md:space-y-1 md:overflow-visible md:px-0 md:pb-0"
              >
                <FilterPill active={category === "all"} onClick={() => setCategory("all")} count={items.length}>
                  Все препараты
                </FilterPill>
                {(Object.keys(categories) as Category[]).map((key) => (
                  <FilterPill
                    key={key}
                    active={category === key}
                    onClick={() => setCategory(key)}
                    count={categoryCount(key)}
                  >
                    {categories[key].label}
                  </FilterPill>
                ))}
              </div>
            </div>

            {formsForCategory.length > 1 && (
              <div className="md:rounded-2xl md:border md:border-border md:bg-card md:p-5 md:shadow-card">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-secondary md:hidden"
                  aria-expanded={filtersOpen}
                  aria-controls="filter-forms"
                  onClick={() => setFiltersOpen((v) => !v)}
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Форма выпуска{form !== "all" ? `: ${form}` : ""}
                </button>
                <div
                  id="filter-forms-title"
                  className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground md:block"
                >
                  Форма выпуска
                </div>
                <div
                  id="filter-forms"
                  role="group"
                  aria-labelledby="filter-forms-title"
                  className={(filtersOpen ? "mt-2 grid grid-cols-1 gap-1" : "hidden") + " md:mt-3 md:block md:space-y-1"}
                >
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
          <div className="min-w-0">
            <h2 className="sr-only">Список препаратов</h2>
            <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-6">
              <p className="mr-2 text-sm text-muted-foreground" aria-live="polite">
                {foundWord} <span className="font-semibold text-secondary">{n}</span>{" "}
                {plural(n, nounForms)}
              </p>
              {category !== "all" && (
                <ActiveChip label={categories[category].label} onRemove={() => setCategory("all")} />
              )}
              {form !== "all" && <ActiveChip label={form} onRemove={() => setForm("all")} />}
              {q.trim() && <ActiveChip label={`«${q.trim()}»`} onRemove={() => setQuery("")} />}
              {activeFilters > 1 && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-primary-strong hover:underline"
                >
                  Сбросить всё
                </button>
              )}
            </div>

            {n === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center md:p-16">
                <div className="text-2xl font-bold text-secondary">Ничего не найдено</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Попробуйте изменить фильтры — или спросите менеджера: возможно, препарат есть под
                  другим названием или его можно привезти под заказ.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex min-h-11 items-center rounded-full border border-secondary/20 bg-white px-5 text-sm font-semibold text-secondary hover:bg-accent"
                  >
                    Сбросить фильтры
                  </button>
                  <a
                    href={whatsappUrl(
                      q.trim()
                        ? `Здравствуйте! Ищу на сайте ecograd.com.kz: «${q.trim()}». Есть ли у вас этот препарат?`
                        : undefined,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-place="catalog-empty"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-secondary px-5 text-sm font-semibold text-secondary-foreground"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Спросить у менеджера в WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                  {visible.map((p) => (
                    <li key={`${p.slug}-${p.packaging ?? ""}`}>
                      <ProductCard item={p} onOpenDescription={openDescription} />
                    </li>
                  ))}
                </ul>
                {n > limit && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setPaging({ key: filterKey, limit: limit + PAGE_SIZE })}
                      className="inline-flex min-h-12 items-center rounded-full border border-secondary/20 bg-white px-6 text-sm font-semibold text-secondary hover:bg-accent"
                    >
                      Показать ещё {Math.min(PAGE_SIZE, n - limit)} из {n - limit}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <ProductDescriptionDialog
        item={openItem}
        onClose={() => setOpenItem(null)}
        returnFocusTo={openerRef}
      />
    </div>
  );
}

function ProductCard({
  item: p,
  onOpenDescription,
}: {
  item: CatalogItem;
  onOpenDescription: (item: CatalogItem, opener: HTMLElement) => void;
}) {
  const href = `/catalog/${p.slug}`;
  return (
    <article className="group flex h-full flex-row overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:border-primary/40 hover:shadow-elegant sm:flex-col sm:hover:-translate-y-0.5">
      <Link
        href={href}
        prefetch={false}
        tabIndex={-1}
        aria-hidden="true"
        className="relative w-28 shrink-0 overflow-hidden border-r border-border bg-white sm:aspect-[4/3] sm:w-full sm:border-b sm:border-r-0"
      >
        {p.image ? (
          <Image
            src={p.image}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 640px) 112px, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105 sm:p-3"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
            Фото по запросу
          </div>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">{p.form}</div>
        <h3 className="mt-1 text-base font-bold leading-tight text-secondary sm:mt-2 sm:text-lg">
          <Link href={href} prefetch={false} className="-my-3 block py-3 hover:underline">
            {p.name}
          </Link>
        </h3>
        {p.packaging && (
          <div className="mt-1 text-sm text-muted-foreground">Фасовка: {p.packaging}</div>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3">
          {p.hasDescription && (
            <button
              type="button"
              onClick={(e) => onOpenDescription(p, e.currentTarget)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 text-xs font-semibold text-primary-strong transition-colors hover:bg-primary-strong hover:text-white"
            >
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
              Описание
            </button>
          )}
          <a
            href={whatsappUrl(priceRequestText(p.name, p.packaging))}
            target="_blank"
            rel="noopener noreferrer"
            data-track-place="catalog-card"
            data-track-product={p.name}
            className="inline-flex min-h-11 items-center whitespace-nowrap text-sm font-semibold text-primary-strong hover:underline"
          >
            Узнать цену →
          </a>
        </div>
      </div>
    </article>
  );
}

type Section = { id: string; label: string; value: string };

function ProductDescriptionDialog({
  item,
  onClose,
  returnFocusTo,
}: {
  item: CatalogItem | null;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLElement | null>;
}) {
  const [state, setState] = useState<{ slug: string; sections: Section[] | null; error: boolean } | null>(null);

  useEffect(() => {
    if (!item) return;
    let cancelled = false;
    fetch(`/api/descriptions/${item.slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { sections: Section[] }) => {
        if (!cancelled) setState({ slug: item.slug, sections: data.sections, error: false });
      })
      .catch(() => {
        if (!cancelled) setState({ slug: item.slug, sections: null, error: true });
      });
    return () => {
      cancelled = true;
    };
  }, [item]);

  const loaded = state && item && state.slug === item.slug ? state : null;

  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="flex max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl flex-col gap-0 overflow-hidden rounded-2xl p-0"
        onCloseAutoFocus={(e) => {
          if (returnFocusTo.current) {
            e.preventDefault();
            returnFocusTo.current.focus();
          }
        }}
      >
        <DialogHeader className="border-b border-border px-5 pb-4 pr-14 pt-5 text-left sm:px-6">
          <DialogTitle className="text-xl leading-tight text-secondary sm:text-2xl">{item?.name}</DialogTitle>
          {item && (
            <DialogDescription className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
              {item.form}
              {item.packaging ? ` · ${item.packaging}` : ""}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {!loaded || (!loaded.sections && !loaded.error) ? (
            <p className="text-sm text-muted-foreground">Загрузка описания…</p>
          ) : loaded.error ? (
            <p className="text-sm text-muted-foreground">
              Не удалось загрузить описание. Откройте страницу препарата или спросите менеджера.
            </p>
          ) : (
            <div className="space-y-5">
              {loaded.sections!.map((s) => (
                <div key={s.id}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary-strong">{s.label}</h3>
                  <p className="mt-1.5 whitespace-pre-line break-words text-sm leading-relaxed text-foreground">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {item && (
          <div className="flex flex-wrap items-center gap-2 border-t border-border bg-card px-5 py-3 sm:px-6">
            <a
              href={whatsappUrl(priceRequestText(item.name, item.packaging))}
              target="_blank"
              rel="noopener noreferrer"
              data-track-place="description-dialog"
              data-track-product={item.name}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-semibold text-secondary-foreground"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Запросить цену в WhatsApp
            </a>
            <a
              href={PHONE_HREF}
              data-track-place="description-dialog"
              data-track-product={item.name}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-secondary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Позвонить
            </a>
            <Link
              href={`/catalog/${item.slug}`}
              prefetch={false}
              className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-primary-strong hover:underline"
            >
              Страница препарата →
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent pl-3 text-sm font-medium text-accent-foreground">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Убрать фильтр ${label}`}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-secondary"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </span>
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
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={
        "flex min-h-11 shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full border px-4 text-left text-sm font-medium transition-colors md:w-full md:whitespace-normal md:rounded-xl md:border-transparent md:px-3 " +
        (active
          ? "border-secondary bg-secondary text-secondary-foreground"
          : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-secondary")
      }
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={"text-xs " + (active ? "text-secondary-foreground/80" : "text-muted-foreground")}>
          {count}
        </span>
      )}
    </button>
  );
}
