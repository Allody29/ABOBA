/** Нормализация строки для поиска: регистр, ё→е, лишние пробелы и знаки. */
export function normalizeSearch(s: string): string {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9%,.]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const LAT_MULTI: Array<[string, string]> = [
  ["shch", "щ"], ["sch", "щ"], ["zh", "ж"], ["kh", "х"], ["ts", "ц"], ["ch", "ч"],
  ["sh", "ш"], ["yu", "ю"], ["ya", "я"], ["yo", "е"], ["ph", "ф"],
];
const LAT_SINGLE: Record<string, string> = {
  a: "а", b: "б", c: "к", d: "д", e: "е", f: "ф", g: "г", h: "х", i: "и", j: "дж",
  k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", q: "к", r: "р", s: "с", t: "т",
  u: "у", v: "в", w: "в", x: "кс", y: "й", z: "з",
};

/** Грубая транслитерация латиницы в кириллицу: enrokol → энрокол. */
export function latinToCyrillic(s: string): string {
  let out = s;
  for (const [lat, cyr] of LAT_MULTI) out = out.split(lat).join(cyr);
  out = out.replace(/[a-z]/g, (c) => LAT_SINGLE[c] ?? c);
  // «е» в начале слова латиницей обычно означает «э»: enrokol → энрокол
  return out.replace(/(^|\s)е/g, "$1э");
}

/** Совпадает ли запрос с индексом товара: каждое слово запроса должно найтись. */
export function matchesQuery(haystack: string, query: string): boolean {
  const q = normalizeSearch(query);
  if (!q) return true;
  const variants = [q];
  if (/[a-z]/.test(q)) {
    const cyr = latinToCyrillic(q);
    variants.push(cyr, cyr.replace(/(^|\s)э/g, "$1е"));
  }
  return variants.some((v) => v.split(" ").every((w) => haystack.includes(w)));
}
