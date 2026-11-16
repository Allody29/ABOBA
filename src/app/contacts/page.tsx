import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import {
  ADDRESS,
  MAPS_URL,
  OPENING_HOURS_DISPLAY,
  PHONE_DISPLAY,
  PHONE_HREF,
  whatsappUrl,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: "Контакты ECOgrad — ветеринарные препараты в Алматы",
  description: "Свяжитесь с ECOgrad: телефон, WhatsApp, адрес офиса в Алматы, режим работы.",
  path: "/contacts",
});

// TODO(владелец): email, юридическое название, БИН, Telegram, карточка в 2ГИС —
// добавить сюда и в src/lib/site.ts после получения данных (docs/owner-questions.md).

export default function ContactsPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Главная", path: "/" },
          { name: "Контакты", path: "/contacts" },
        ]}
      />
      <section className="border-b border-border bg-gradient-to-b from-[var(--sky-soft)] to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary-strong">Контакты</div>
          <h1 className="mt-2 break-words text-3xl font-extrabold text-secondary sm:text-4xl md:text-6xl">
            Свяжитесь с нами
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Менеджер ответит в течение часа в рабочее время ({OPENING_HOURS_DISPLAY}). Один номер
            для звонков и WhatsApp.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:hidden">
            <a
              href={PHONE_HREF}
              data-track-place="contacts-top"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-secondary/20 bg-white px-4 text-sm font-semibold text-secondary"
            >
              Позвонить
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-track-place="contacts-top"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-secondary px-4 text-sm font-semibold text-secondary-foreground"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="sr-only">Способы связи</h2>
        <div className="space-y-4">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-track-place="contacts-card"
            className="block rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-elegant"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">WhatsApp</div>
            <div className="mt-2 text-xl font-bold text-secondary">{PHONE_DISPLAY}</div>
            <div className="mt-1 text-sm text-muted-foreground">написать в один клик →</div>
          </a>
          <a href={PHONE_HREF} data-track-place="contacts-card" className="block">
            <ContactCard label="Телефон" value={PHONE_DISPLAY} sub={OPENING_HOURS_DISPLAY} />
          </a>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="block">
            <ContactCard label="Офис" value={ADDRESS.display} sub="открыть на карте →" />
          </a>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-elegant">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">{label}</div>
      <div className="mt-2 text-xl font-bold text-secondary">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
    </div>
  );
}
