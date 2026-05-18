import type { Metadata } from "next";

const MAPS_URL =
  "https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%A2%D0%B0%D1%82%D0%B8%D0%B1%D0%B5%D0%BA%D0%BE%D0%B2%D0%B0+10,+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B/@43.2789487,76.9651263,17z";

export const metadata: Metadata = {
  title: "Контакты — ECOgrad",
  description: "Свяжитесь с ECOgrad: телефон, WhatsApp, адрес офиса в Алматы.",
};

export default function ContactsPage() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-[var(--sky-soft)] to-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">Контакты</div>
          <h1 className="mt-2 text-5xl font-extrabold text-secondary md:text-6xl">
            Свяжитесь с нами
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Менеджер ответит в течение часа в рабочее время. Для срочных вопросов — звоните.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4">
          <a
            href="https://wa.me/77479033135"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-elegant"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">WhatsApp</div>
            <div className="mt-2 text-xl font-bold text-secondary">+7 (747) 903-31-35</div>
            <div className="mt-1 text-sm text-muted-foreground">написать в один клик →</div>
          </a>
          <a href="tel:+77479033135" className="block">
            <ContactCard label="Телефон" value="+7 (747) 903-31-35" sub="пн–пт 9:00–18:00" />
          </a>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="block">
            <ContactCard
              label="Офис"
              value="г. Алматы, Татибекова 10, офис 4"
              sub="открыть на карте →"
            />
          </a>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-elegant">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</div>
      <div className="mt-2 text-xl font-bold text-secondary">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
    </div>
  );
}
