"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Аналитика и цели обращений.
 *
 * Счётчики подключаются только если заданы переменные окружения (в Vercel →
 * Project → Settings → Environment Variables):
 *   NEXT_PUBLIC_YM_ID  — номер счётчика Яндекс Метрики;
 *   NEXT_PUBLIC_GA_ID  — идентификатор Google Analytics 4 (G-XXXXXXX).
 *
 * Цели (одинаковые имена в обеих системах):
 *   whatsapp_click, phone_click, description_open, catalog_search.
 * Клики по ссылкам WhatsApp и tel: отслеживаются автоматически на всём сайте,
 * параметр place берётся из data-track-place, product — из data-track-product.
 */

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Params = Record<string, string | undefined>;

declare global {
  interface Window {
    ym?: (id: number, action: string, goal: string, params?: Params) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(goal: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (YM_ID && window.ym) window.ym(Number(YM_ID), "reachGoal", goal, params);
    if (GA_ID && window.gtag) window.gtag("event", goal, params);
  } catch {
    // аналитика не должна ломать сайт
  }
}

export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params: Params = {
        place: link.dataset.trackPlace,
        product: link.dataset.trackProduct,
        page: window.location.pathname,
      };
      if (href.startsWith("https://wa.me/")) trackEvent("whatsapp_click", params);
      else if (href.startsWith("tel:")) trackEvent("phone_click", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      {YM_ID && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(YM_ID)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
        </Script>
      )}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
          </Script>
        </>
      )}
    </>
  );
}
