import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { categories, products, type Category } from "@/data/products";

const WHATSAPP_URL = "https://wa.me/77479033135";

export const metadata: Metadata = {
  title: "ECOgrad — Ветеринарные препараты для животноводства",
  description:
    "Антибиотики, вакцины, витамины и дезсредства от ECOgrad. Прямые поставки на фермы и птицефабрики.",
};

const stats = [
  { value: products.length + "+", label: "Препаратов в каталоге" },
  { value: "10+", label: "Лет на рынке" },
  { value: "24/7", label: "Поддержка клиентов" },
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

export default function HomePage() {
  const catList = Object.entries(categories) as [Category, (typeof categories)[Category]][];
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,_var(--sky)_28%,_transparent),_transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--sky-soft)_0%,transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:pb-16 md:pt-12">
          <div className="mb-6 w-full">
            <Image
              src="/logo-horizontal.png"
              alt="ECOgrad — ветеринарные препараты"
              width={1600}
              height={320}
              priority
              className="block w-full h-auto"
            />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Поставщик №1 для ферм и птицефабрик
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] text-secondary md:text-5xl">
              Здоровое стадо — <span className="text-primary">здоровый бизнес</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
              ECOgrad поставляет проверенные ветпрепараты, вакцины Nobilis и Porcilis, витамины
              и средства биобезопасности напрямую от производителей.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
              >
                Открыть каталог →
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-secondary/20 bg-white px-5 py-2.5 text-sm font-semibold text-secondary hover:bg-accent"
              >
                Запросить прайс
              </a>
            </div>
            <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-extrabold text-secondary md:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Нам доверяют
          </div>
        </div>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-16 pr-16">
            {[...clientLogos, ...clientLogos].map((c, i) => (
              <div key={i} className="relative flex h-20 w-40 shrink-0 items-center justify-center">
                <Image
                  src={c.src}
                  alt={c.name}
                  fill
                  sizes="160px"
                  className="object-contain opacity-80 transition hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">
              Категории
            </div>
            <h2 className="mt-2 text-4xl font-extrabold text-secondary md:text-5xl">
              Всё для здоровья поголовья
            </h2>
          </div>
          <Link href="/catalog" className="hidden text-sm font-semibold text-primary hover:underline md:inline">
            Весь каталог →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {catList.map(([key, cat]) => {
            const count = products.filter((p) => p.category === key).length;
            return (
              <Link
                key={key}
                href={{ pathname: "/catalog", query: { category: key } }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CategoryIcon category={key} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-secondary">{cat.label}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{cat.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="font-semibold text-secondary">{count} препаратов</span>
                  <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">
            Почему ECOgrad
          </div>
          <h2 className="mt-2 max-w-2xl text-4xl font-extrabold md:text-5xl">
            Прозрачные поставки и понятный сервис
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Прямые контракты", d: "Работаем напрямую с производителями: MSD, Альба, Lovet и другими." },
              { n: "02", t: "Холодовая цепь", d: "Соблюдаем температурный режим хранения и доставки вакцин. Предоставляем данные по температуре на протяжении всей логистики." },
              { n: "03", t: "Поддержка ветврача", d: "Подберём схему лечения и профилактики под ваше поголовье." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="text-2xl font-bold text-primary">{b.n}</div>
                <h3 className="mt-3 text-xl font-bold">{b.t}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/70">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[oklch(0.55_0.17_240)] p-12 text-primary-foreground md:p-16">
          <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">
            Нужен индивидуальный прайс или подбор препаратов?
          </h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">
            Оставьте заявку — менеджер свяжется в течение часа в рабочее время.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d={paths[category]} />
    </svg>
  );
}
