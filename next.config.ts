import type { NextConfig } from "next";

// Заголовки безопасности для всех страниц (аудит T-21).
// CSP пока в режиме Report-Only: Next.js добавляет встроенные скрипты,
// а домены счётчиков (Яндекс Метрика, GA4) должны быть разрешены явно.
// После проверки отчётов в консоли браузера заголовок можно перевести
// в обязательный режим (Content-Security-Policy).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://mc.yandex.ru https://www.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://mc.yandex.ru https://www.google-analytics.com https://*.google-analytics.com",
  "frame-src https://mc.yandex.ru",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
