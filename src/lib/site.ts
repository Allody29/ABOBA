// Единый источник контактных данных и адресов сайта.

export const SITE_URL = "https://www.ecograd.com.kz";
export const SITE_NAME = "ECOgrad";
export const SITE_DESCRIPTION =
  "Антибиотики, вакцины, витамины и дезсредства от ECOgrad. Прямые поставки на фермы и птицефабрики Казахстана.";

export const PHONE_E164 = "+77479033135";
export const PHONE_DISPLAY = "+7 (747) 903-31-35";
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const WHATSAPP_NUMBER = "77479033135";

export const ADDRESS = {
  city: "Алматы",
  street: "ул. Татибекова 10, офис 4",
  display: "г. Алматы, Татибекова 10, офис 4",
  country: "KZ",
};

export const OPENING_HOURS_DISPLAY = "пн–пт 9:00–18:00";
export const OPENING_HOURS_SCHEMA = "Mo-Fr 09:00-18:00";

export const MAPS_URL =
  "https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%A2%D0%B0%D1%82%D0%B8%D0%B1%D0%B5%D0%BA%D0%BE%D0%B2%D0%B0+10,+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B/@43.2789487,76.9651263,17z";

export const DEFAULT_WHATSAPP_TEXT =
  "Здравствуйте! Пишу с сайта ecograd.com.kz, прошу прислать прайс.";

/** Ссылка на WhatsApp с предзаполненным сообщением. */
export function whatsappUrl(text: string = DEFAULT_WHATSAPP_TEXT): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Сообщение для запроса цены конкретного товара. */
export function priceRequestText(name: string, packaging?: string): string {
  return `Здравствуйте! Интересует цена: ${name}${packaging ? `, ${packaging}` : ""}.`;
}
