import Link from "next/link";
import Image from "next/image";
import { categories, products, type Category } from "@/data/products";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { ITEM_FORMS, PRODUCT_FORMS, plural } from "@/lib/plural";
import { SITE_NAME, SITE_URL, whatsappUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "ECOgrad — Ветеринарные препараты оптом для ферм и птицефабрик Казахстана",
  description:
    "Антибиотики, вакцины, витамины и дезсредства от ECOgrad. Прямые поставки на фермы и птицефабрики Казахстана, офис в Алматы.",
  path: "/",
});

const stats = [
  { value: String(products.length), label: "Препаратов в каталоге" },
  { value: "10+", label: "Лет опыта команды" },
  { value: "1 час", label: "Ответ в рабочее время" },
];

const clientLogos = [
  { src: "/clients/baron.png", name: "Baron" },
  { src: "/clients/volynsky.png", name: "ТОО АПК Волынский" },
  { src: "/clients/ukpf.png", name: "Усть-Каменогорская птицефабрика" },
  { src: "/clients/mpf.png", name: "Макинская птицефабрика" },
  { src: "/clients/alel-agro.png", name: "АО Алель Агро" },
  { src: "/clients/rubikom.png", name: "Рубиком" },
  { src: "/clients/emc-agro.png", name: "EMC Agro" },
  { src: "/clients/karatal-agro.png", name: "Каратал Агро" },
  { src: "/clients/nauryz-agro.png", name: "Nauryz Agro LTD" },
  { src: "/clients/alsad.png", name: "ALSAD" },
  { src: "/clients/kurochka-ryaba.png", name: "Курочка Ряба" },
  { src: "/clients/chickodelli.png", name: "Chickodelli" },
  { src: "/clients/prima-kus.png", name: "ТОО Прима Кус" },
  { src: "/clients/aimar-kus.png", name: "АйМар Құс" },
  { src: "/clients/shymkent-kus.png", name: "Шымкент Құс" },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ru",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function HomePage() {
  const catList = Object.entries(categories) as [Category, (typeof categories)[Category]][];
  return (
    <div>
      <JsonLd data={websiteJsonLd} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,_var(--sky)_28%,_transparent),_transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--sky-soft)_0%,transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Здоровое стадо — здоровый бизнес
            </div>
            <h1 className="mt-5 break-words text-3xl font-extrabold leading-[1.1] text-secondary sm:text-4xl md:text-6xl">
              Ветеринарные препараты оптом{" "}
              <span className="text-primary-strong">для ферм и птицефабрик Казахстана</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              ECOgrad поставляет ветпрепараты, вакцины, витамины и средства биобезопасности
              напрямую от производителей. Офис в Алматы, цены — по запросу у менеджера.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
              >
                Открыть каталог →
              </Link>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-track-place="home-hero"
                className="inline-flex min-h-12 items-center rounded-full border border-secondary/20 bg-white px-6 text-sm font-semibold text-secondary hover:bg-accent"
              >
                Запросить прайс
              </a>
            </div>
            <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="text-2xl font-extrabold text-secondary md:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-border bg-white py-12" aria-labelledby="clients-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2
            id="clients-title"
            className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary-strong"
          >
            Нам доверяют
          </h2>
        </div>
        <div className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-6 pr-6 md:gap-16 md:pr-16">
            {[...clientLogos, ...clientLogos].map((c, i) => {
              const duplicate = i >= clientLogos.length;
              return (
                <div
                  key={i}
                  aria-hidden={duplicate ? "true" : undefined}
                  className="relative flex h-14 w-24 shrink-0 items-center justify-center md:h-20 md:w-40"
                >
                  <Image
                    src={c.src}
                    alt={duplicate ? "" : c.name}
                    fill
                    sizes="(max-width: 768px) 96px, 160px"
                    className="object-contain opacity-90 transition hover:opacity-100"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary-strong">
              Категории
            </div>
            <h2 className="mt-2 break-words text-3xl font-extrabold text-secondary sm:text-4xl md:text-5xl">
              Всё для здоровья поголовья
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden min-h-11 items-center text-sm font-semibold text-primary-strong hover:underline md:inline-flex"
          >
            Весь каталог →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {catList.map(([key, cat]) => {
            const items = products.filter((p) => p.category === key);
            const count = items.length;
            const forms = items.some((p) => p.form === "Расходный материал") ? ITEM_FORMS : PRODUCT_FORMS;
            return (
              <Link
                key={key}
                href={{ pathname: "/catalog", query: { category: key } }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-strong">
                  <CategoryIcon category={key} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-secondary">{cat.label}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{cat.description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="font-semibold text-secondary">
                    {count} {plural(count, forms)}
                  </span>
                  <span className="text-primary-strong transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href="/catalog"
          className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-primary-strong hover:underline md:hidden"
        >
          Весь каталог →
        </Link>
      </section>

      {/* WHY US */}
      <section className="bg-secondary py-16 text-secondary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">
            Почему ECOgrad
          </div>
          <h2 className="mt-2 max-w-2xl break-words text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Прозрачные поставки и понятный сервис
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Прямые контракты", d: "Работаем напрямую с производителями: Альба, Lovet, Ringpu, CID Lines и другими." },
              { n: "02", t: "Холодовая цепь", d: "Соблюдаем температурный режим хранения и доставки вакцин. Предоставляем данные по температуре на протяжении всей логистики." },
              { n: "03", t: "Поддержка ветврача", d: "Подберём схему лечения и профилактики под ваше поголовье." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="text-2xl font-bold text-primary">{b.n}</div>
                <h3 className="mt-3 text-xl font-bold">{b.t}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/80">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-strong to-[oklch(0.42_0.13_245)] p-6 text-white sm:p-12 md:rounded-[2.5rem] md:p-16">
          <h2 className="max-w-2xl break-words text-2xl font-extrabold sm:text-4xl md:text-5xl">
            Нужен индивидуальный прайс или подбор препаратов?
          </h2>
          <p className="mt-4 max-w-xl text-white">
            Напишите нам — менеджер ответит в течение часа в рабочее время.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-track-place="home-cta"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            Написать в WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

function CategoryIcon({ category }: { category: Category }) {
  const paths: Record<Category, string> = {
    antibiotics: "M9 3v2H7a2 2 0 0 0-2 2v3l4 4-4 4v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3l-4-4 4-4V7a2 2 0 0 0-2-2h-2V3",
    disinfectants: "M12 2 6 9a8 8 0 1 0 12 0z",
    vaccines: "m18 2-4 4 6 6 4-4zM3 21l8-8m-2-2 5 5",
    vitamins: "M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d={paths[category]} />
    </svg>
  );
}
