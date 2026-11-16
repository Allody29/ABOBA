import Link from "next/link";
import type { Metadata } from "next";
import { categories, type Category } from "@/data/products";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Страница не найдена — ECOgrad",
  description: "Такой страницы нет. Перейдите в каталог ветеринарных препаратов ECOgrad или напишите менеджеру.",
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <div className="text-sm font-semibold uppercase tracking-wider text-primary-strong">Ошибка 404</div>
      <h1 className="mt-2 text-3xl font-extrabold text-secondary sm:text-4xl md:text-5xl">
        Страница не найдена
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        Возможно, ссылка устарела или в адресе опечатка. Найдите нужный препарат в каталоге или
        спросите менеджера — подскажем.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/catalog"
          className="inline-flex min-h-11 items-center rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground shadow-elegant"
        >
          Перейти в каталог
        </Link>
        <a
          href={whatsappUrl("Здравствуйте! Пишу с сайта ecograd.com.kz, не нашёл нужную страницу.")}
          target="_blank"
          rel="noopener noreferrer"
          data-track-place="404"
          className="inline-flex min-h-11 items-center rounded-full border border-secondary/20 bg-white px-6 text-sm font-semibold text-secondary hover:bg-accent"
        >
          Написать в WhatsApp
        </a>
      </div>
      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {(Object.keys(categories) as Category[]).map((c) => (
          <li key={c}>
            <Link
              href={{ pathname: "/catalog", query: { category: c } }}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground hover:text-secondary"
            >
              {categories[c].label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
