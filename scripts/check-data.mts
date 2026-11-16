// Проверка данных каталога: npm run check:data
// Запуск: node --experimental-strip-types scripts/check-data.mts (Node 22.6+)
import fs from "node:fs";
import path from "node:path";
import { products, productGroups } from "../src/data/products.ts";
import { descriptions } from "../src/data/product-descriptions.ts";

const errors: string[] = [];
const warnings: string[] = [];
const root = path.resolve(import.meta.dirname, "..");

const seen = new Set<string>();
const slugName = new Map<string, string>();
for (const p of products) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) errors.push(`Некорректный slug «${p.slug}» у «${p.name}»`);
  const key = `${p.slug}|${p.packaging ?? ""}`;
  if (seen.has(key)) errors.push(`Дубль товара: ${p.name} ${p.packaging ?? ""}`);
  seen.add(key);
  const prev = slugName.get(p.slug);
  if (prev && prev !== p.name) errors.push(`slug «${p.slug}» используется у «${prev}» и «${p.name}»`);
  slugName.set(p.slug, p.name);
  if (p.image) {
    if (!fs.existsSync(path.join(root, "public", p.image))) errors.push(`Нет файла фото ${p.image} у «${p.name}»`);
  } else warnings.push(`Нет фото: ${p.name}`);
  if (!p.packaging) warnings.push(`Нет фасовки: ${p.name}`);
}
for (const g of productGroups) {
  const d = descriptions[g.slug];
  if (!d) warnings.push(`Нет описания: ${g.name}`);
  else if (d.indications && /^(запрещ|противопоказ|не допуска|не следует|нельзя)/i.test(d.indications.trim()))
    errors.push(`В «Показаниях» у «${g.name}» записаны противопоказания`);
}
for (const slug of Object.keys(descriptions)) {
  if (!slugName.has(slug)) errors.push(`Описание «${slug}» не соответствует ни одному товару`);
}

for (const w of warnings) console.log("предупреждение:", w);
for (const e of errors) console.error("ОШИБКА:", e);
console.log(`Товаров: ${products.length}, страниц препаратов: ${productGroups.length}, описаний: ${Object.keys(descriptions).length}`);
if (errors.length) process.exit(1);
