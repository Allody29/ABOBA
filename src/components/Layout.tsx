"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/77479033135";

const nav = [
  { href: "/", label: "Главная", exact: true },
  { href: "/catalog", label: "Каталог", exact: false },
  { href: "/about", label: "О нас", exact: false },
  { href: "/contacts", label: "Контакты", exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center" aria-label="ECOgrad — на главную">
          <Image
            src="/logo-horizontal.png"
            alt="ECOgrad — ветеринарные препараты"
            width={280}
            height={56}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-accent text-secondary"
                    : "text-muted-foreground hover:text-secondary")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-elegant transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Связаться
        </a>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 pb-3 md:hidden">
        {nav.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "rounded-full px-4 py-2 text-sm font-medium " +
                (active ? "bg-accent text-secondary" : "text-muted-foreground")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/logo-horizontal.png"
            alt="ECOgrad"
            width={280}
            height={56}
            className="h-14 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-md text-sm text-secondary-foreground/70">
            Поставщик ветеринарных препаратов, дезсредств и вакцин для промышленного животноводства и птицеводства.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">Каталог</div>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
            <li><Link href={{ pathname: "/catalog", query: { category: "antibiotics" } }} className="hover:text-primary">Антибиотики</Link></li>
            <li><Link href={{ pathname: "/catalog", query: { category: "disinfectants" } }} className="hover:text-primary">Дезсредства</Link></li>
            <li><Link href={{ pathname: "/catalog", query: { category: "vaccines" } }} className="hover:text-primary">Вакцины</Link></li>
            <li><Link href={{ pathname: "/catalog", query: { category: "vitamins" } }} className="hover:text-primary">Витамины</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">Контакты</div>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
            <li>
              <a href="https://wa.me/77479033135" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                +7 (747) 903-31-35
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%A2%D0%B0%D1%82%D0%B8%D0%B1%D0%B5%D0%BA%D0%BE%D0%B2%D0%B0+10,+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B/@43.2789487,76.9651263,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                г. Алматы, Татибекова 10, офис 4
              </a>
            </li>
            <li>пн–пт 9:00–18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} ECOgrad. Все права защищены.
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showBack = pathname !== "/";
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {showBack && (
          <div className="mx-auto max-w-7xl px-6 pt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-secondary shadow-card transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Возврат на главную страницу
            </Link>
          </div>
        )}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
