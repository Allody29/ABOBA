import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { ADDRESS, whatsappUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "О компании ECOgrad — поставщик ветеринарных препаратов в Казахстане",
  description:
    "ECOgrad — команда ветеринарных специалистов и логистов, обеспечивающая фермы и птицефабрики Казахстана качественными препаратами и вакцинами.",
  path: "/about",
});

// TODO(владелец): подтвердить цифры «150+ клиентов» и «98% заказов в срок»,
// дать год основания, юридическое название и БИН (см. docs/owner-questions.md).
const stats = [
  { v: "150+", l: "Постоянных клиентов" },
  { v: String(products.length), l: "Препаратов в каталоге" },
  { v: "98%", l: "Заказов в срок" },
  { v: "10+", l: "Лет опыта команды" },
];

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Главная", path: "/" },
          { name: "О нас", path: "/about" },
        ]}
      />
      <section className="border-b border-border bg-gradient-to-b from-[var(--sky-soft)] to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary-strong">О нас</div>
          <h1 className="mt-2 max-w-3xl break-words text-3xl font-extrabold leading-tight text-secondary sm:text-4xl md:text-6xl">
            Поставляем здоровье животноводству
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            ECOgrad — оптовый поставщик ветеринарных препаратов, вакцин и средств биобезопасности
            из {ADDRESS.city}. Мы работаем с агрохолдингами, фермами и птицефабриками по всему
            Казахстану.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">Наша миссия</h2>
            <p className="mt-5 text-muted-foreground">
              Делать качественные ветеринарные препараты доступными — без сложных тендерных
              процедур, без долгого ожидания, без риска подделок. Мы выстраиваем прозрачную цепочку
              от производителя до фермы.
            </p>
            <p className="mt-4 text-muted-foreground">
              В портфеле — продукция Альба, Lovet, Ringpu, CID Lines и других производителей.
              Все препараты проходят регистрацию и хранятся в условиях, предписанных
              производителем.
            </p>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col-reverse rounded-3xl border border-border bg-card p-6 shadow-card">
                <dt className="mt-2 text-sm text-muted-foreground">{s.l}</dt>
                <dd className="text-4xl font-extrabold text-primary-strong">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-secondary py-16 text-secondary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Как мы работаем</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Заявка", d: "Принимаем заявку по телефону или в WhatsApp." },
              { n: "02", t: "Подбор", d: "Ветврач помогает с подбором препарата и схемы." },
              { n: "03", t: "Отгрузка", d: "Формируем заказ с соблюдением температурного режима." },
              { n: "04", t: "Доставка", d: "Доставляем своим транспортом или ТК до фермы." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="text-3xl font-extrabold text-primary">{s.n}</div>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 md:py-20">
        <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl md:text-5xl">
          Готовы стать клиентом?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Напишите нам — пришлём актуальный прайс и условия сотрудничества.
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-track-place="about-cta"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
        >
          Связаться с нами
        </a>
      </section>
    </div>
  );
}
