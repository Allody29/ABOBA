import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании ECOgrad — поставщик ветеринарных препаратов",
  description:
    "ECOgrad — команда ветеринарных специалистов и логистов, обеспечивающая фермы и птицефабрики качественными препаратами и вакцинами.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-[var(--sky-soft)] to-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">О нас</div>
          <h1 className="mt-2 max-w-3xl text-5xl font-extrabold leading-tight text-secondary md:text-6xl">
            Поставляем здоровье животноводству — с 2014 года
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            ECOgrad — оптовый поставщик ветеринарных препаратов, вакцин и средств биобезопасности.
            Мы работаем с агрохолдингами, фермами и птицефабриками по всему региону.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold text-secondary">Наша миссия</h2>
            <p className="mt-5 text-muted-foreground">
              Делать качественные ветеринарные препараты доступными — без сложных тендерных
              процедур, без долгого ожидания, без риска подделок. Мы выстраиваем прозрачную цепочку
              от производителя до фермы.
            </p>
            <p className="mt-4 text-muted-foreground">
              В портфеле — продукция MSD Animal Health, Альба, Lovet и других ведущих
              производителей. Все препараты проходят регистрацию и хранятся в условиях,
              предписанных производителем.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { v: "150+", l: "Постоянных клиентов" },
              { v: "100+", l: "Препаратов в наличии" },
              { v: "98%", l: "Заказов в срок" },
              { v: "10+", l: "Лет опыта команды" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <div className="text-4xl font-extrabold text-primary">{s.v}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-extrabold md:text-5xl">Как мы работаем</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Заявка", d: "Принимаем заявку по телефону, email или через форму." },
              { n: "02", t: "Подбор", d: "Ветврач помогает с подбором препарата и схемы." },
              { n: "03", t: "Отгрузка", d: "Формируем заказ с соблюдением температурного режима." },
              { n: "04", t: "Доставка", d: "Доставляем своим транспортом или ТК до фермы." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="text-3xl font-extrabold text-primary">{s.n}</div>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-secondary md:text-5xl">
          Готовы стать клиентом?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Оставьте контакты — пришлём актуальный прайс и условия сотрудничества.
        </p>
        <a
          href="https://wa.me/77479033135"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
        >
          Связаться с нами
        </a>
      </section>
    </div>
  );
}
