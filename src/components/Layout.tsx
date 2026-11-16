import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "./SiteHeader";
import { Analytics } from "./Analytics";
import { categories, type Category } from "@/data/products";
import {
  ADDRESS,
  MAPS_URL,
  OPENING_HOURS_DISPLAY,
  PHONE_DISPLAY,
  PHONE_HREF,
  whatsappUrl,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/logo-horizontal-white.png"
            alt="ECOgrad"
            width={280}
            height={84}
            sizes="185px"
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-md text-sm text-secondary-foreground/80">
            Поставщик ветеринарных препаратов, дезсредств и вакцин для промышленного животноводства и птицеводства.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Каталог</h2>
          <ul className="mt-2 text-sm text-secondary-foreground/85">
            {(Object.keys(categories) as Category[]).map((key) => (
              <li key={key}>
                <Link
                  href={{ pathname: "/catalog", query: { category: key } }}
                  className="inline-flex min-h-11 items-center hover:text-primary"
                >
                  {categories[key].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Контакты</h2>
          <ul className="mt-2 text-sm text-secondary-foreground/85">
            <li>
              <a
                href={PHONE_HREF}
               
                data-track-place="footer"
                className="inline-flex min-h-11 items-center hover:text-primary"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
               
                data-track-place="footer"
                className="inline-flex min-h-11 items-center hover:text-primary"
              >
                Написать в WhatsApp
              </a>
            </li>
            <li>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-primary"
              >
                {ADDRESS.display}
              </a>
            </li>
            <li className="py-2">{OPENING_HOURS_DISPLAY}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-secondary-foreground/75">
        © {new Date().getFullYear()} ECOgrad. Все права защищены.
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
      <Analytics />
    </div>
  );
}
