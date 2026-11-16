import type { ProductDescription } from "@/data/product-descriptions";

/** Порядок и подписи разделов описания препарата. */
export function descriptionSections(d: ProductDescription | undefined) {
  if (!d) return [];
  return [
    { id: "description", label: "Описание", value: d.description },
    { id: "composition", label: "Состав / Действующие вещества", value: d.composition },
    { id: "indications", label: "Показания к применению", value: d.indications },
    { id: "contraindications", label: "Противопоказания", value: d.contraindications },
    { id: "dosage", label: "Способ применения и дозировка", value: d.dosage },
    { id: "pharmacology", label: "Фармакологические свойства", value: d.pharmacology },
    { id: "sideEffects", label: "Побочные реакции", value: d.sideEffects },
    { id: "waitPeriod", label: "Период ожидания", value: d.waitPeriod },
    { id: "storage", label: "Условия хранения", value: d.storage },
    { id: "extra", label: "Дополнительная информация", value: d.extra },
  ].filter((s): s is { id: string; label: string; value: string } => !!s.value);
}
