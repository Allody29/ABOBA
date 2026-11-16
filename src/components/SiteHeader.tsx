"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/site";

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 md:h-20">
        <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label="ECOgrad — на главную">
          <Image
            src="/logo-horizontal.png"
            alt="ECOgrad — ветеринарные препараты"
            width={280}
            height={84}
            priority
            sizes="(max-width: 768px) 140px, 185px"
            className="h-9 w-auto sm:h-10 md:h-14"
          />
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors " +
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

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
           
            data-track-place="header"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-3 text-sm sm:px-4 font-semibold text-secondary-foreground shadow-elegant transition-transform hover:-translate-y-0.5 md:px-5"
          >
            <MessageCircle className="hidden h-4 w-4 min-[360px]:block md:hidden" aria-hidden="true" />
            <span className="md:hidden">Написать</span>
            <span className="hidden md:inline">Связаться</span>
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-secondary md:hidden"
              aria-label="Открыть меню"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]" aria-describedby={undefined}>
              <SheetTitle className="text-lg font-bold text-secondary">Меню</SheetTitle>
              <nav aria-label="Мобильная навигация" className="mt-6">
                <ul className="space-y-1">
                  {nav.map((item) => {
                    const active = isActive(pathname, item.href, item.exact);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                          className={
                            "flex min-h-12 items-center rounded-xl px-4 text-base font-medium " +
                            (active ? "bg-accent text-secondary" : "text-muted-foreground hover:text-secondary")
                          }
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <a
                href={PHONE_HREF}
               
                data-track-place="mobile-menu"
                className="mt-6 flex min-h-12 items-center gap-3 rounded-xl border border-border px-4 text-base font-semibold text-secondary"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
