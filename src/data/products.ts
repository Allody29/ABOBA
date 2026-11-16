export type Category = "antibiotics" | "disinfectants" | "vaccines" | "vitamins";

export type ProductForm =
  | "Оральный раствор"
  | "Оральный порошок"
  | "Инъекционный раствор"
  | "Внутриматочный раствор"
  | "Инфузионный раствор"
  | "Противомаститный препарат"
  | "Дезсредство"
  | "Витаминный комплекс"
  | "Вакцина"
  | "Расходный материал";

export interface Product {
  /** Уникальный латинский идентификатор, используется в адресе /catalog/{slug}. Общий у фасовок одного препарата. */
  slug: string;
  name: string;
  packaging?: string;
  category: Category;
  form: ProductForm;
  /** Путь к фото в /public/products. */
  image?: string;
}

export const categories: Record<Category, { label: string; description: string }> = {
  antibiotics: {
    label: "Антибиотики",
    description: "Оральные растворы и порошки, инъекционные, внутриматочные и противомаститные препараты для лечения бактериальных инфекций.",
  },
  disinfectants: {
    label: "Моющие и дезинфицирующие средства",
    description: "Профессиональная биобезопасность ферм: дезинфекция помещений, оборудования и систем поения.",
  },
  vaccines: {
    label: "Вакцины",
    description: "Вакцины RinBio и RinVac для птицы и расходные материалы для вакцинации.",
  },
  vitamins: {
    label: "Витамины",
    description: "Витаминные и энергетические комплексы для поддержки продуктивности и здоровья животных.",
  },
};

export const products: Product[] = [
  // ANTIBIOTICS — Oral solutions
  { slug: "galofur", name: "Галофур", packaging: "500 мл", category: "antibiotics", form: "Оральный раствор", image: "/products/galofur.jpg" },
  { slug: "doksikol-akva", name: "Доксикол Аква", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/doksikol_akva.jpg" },
  { slug: "doksikol-akva", name: "Доксикол Аква", packaging: "20 мл", category: "antibiotics", form: "Оральный раствор", image: "/products/doksikol_akva.jpg" },
  { slug: "kolimiksin", name: "Колимиксин", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/kolimiksin.jpg" },
  { slug: "levoloks", name: "Леволокс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/levoloks.jpg" },
  { slug: "levoloks-20pct", name: "Леволокс 20%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/levoloks_20pct.jpg" },
  { slug: "norflok-akva", name: "Норфлок Аква", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/norflok_akva.jpg" },
  { slug: "paratsetamol-30pct", name: "Парацетамол 30%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/paratsetamol_30_pct.jpg" },
  { slug: "prokoks", name: "Прококс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/prokoks.jpg" },
  { slug: "pulmonol-st", name: "Пульмонол СТ", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/pulmonol_st.jpg" },
  { slug: "reseyv", name: "Ресэйв", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/reseyv.jpg" },
  { slug: "sulfaprim", name: "Сульфаприм", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/sulfaprim.jpg" },
  { slug: "sulfaprim-36pct", name: "Сульфаприм 36%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/sulfaprim_36pct.jpg" },
  { slug: "tilmitrim", name: "Тилмитрим", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/tilmitrim.jpg" },
  { slug: "tilmitrim", name: "Тилмитрим", packaging: "20 мл", category: "antibiotics", form: "Оральный раствор", image: "/products/tilmitrim.jpg" },
  { slug: "tolutroks-2-5pct", name: "Толутрокс 2,5%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/tolutroks_25pct.jpg" },
  { slug: "tolutroks-5pct", name: "Толутрокс 5%", packaging: "500 мл", category: "antibiotics", form: "Оральный раствор", image: "/products/tolutroks_5pct.jpg" },
  { slug: "trifloks", name: "Трифлокс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/trifloks.jpg" },
  { slug: "flosan-4pct", name: "Флосан 4%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/flosan_4pct.jpg" },
  { slug: "flosol-30pct", name: "Флосол 30%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/flosol_30pct.jpg" },
  { slug: "tsipromet", name: "Ципромет", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/tsipromet.jpg" },
  { slug: "tsiprofloks", name: "Ципрофлокс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/tsiprofloks.jpg" },
  { slug: "enrokol", name: "Энрокол", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/enrokol.jpg" },
  { slug: "enroksol", name: "Энроксол", packaging: "1 л", category: "antibiotics", form: "Оральный раствор", image: "/products/enroksol.jpg" },

  // ANTIBIOTICS — Oral powders
  { slug: "ayvazol", name: "Айвазол", packaging: "0,25 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/ayvazol.jpg" },
  { slug: "albendazim-20pct", name: "Альбендазим 20%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/albendazim_20pct.jpg" },
  { slug: "amoksikar-50pct", name: "Амоксикар 50%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/amoksikar_50pct.jpg" },
  { slug: "amoksikar-80pct", name: "Амоксикар 80%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/amoksikar_80pct.jpg" },
  { slug: "amoksikol-al", name: "Амоксикол АЛ", packaging: "0,5 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/amoksikol_al.jpg" },
  { slug: "aspiron", name: "Аспирон", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/aspiron.jpg" },
  { slug: "gentan-ws", name: "Гентан WS", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/gentan_ws_20_pct.jpg" },
  { slug: "doksikar", name: "Доксикар", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/doksikar.jpg" },
  { slug: "ivermektin", name: "Ивермектин", packaging: "1 л", category: "antibiotics", form: "Оральный порошок", image: "/products/ivermektin_4_pct.jpg" },
  { slug: "klavumoks-62-5pct", name: "Клавумокс 62,5%", packaging: "0,5 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/klavumoks_625pct.jpg" },
  { slug: "kloksamoks", name: "Клоксамокс", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/kloksamoks.jpg" },
  { slug: "levamizol-100", name: "Левамизол 100", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/levamizol_75pct.jpg" },
  { slug: "levoloks-poroshok", name: "Леволокс порошок", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/levoloks_poroshok.jpg" },
  { slug: "linspekt-100", name: "Линспект 100", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/linspekt_100.jpg" },
  { slug: "linspekt-44", name: "Линспект 44", packaging: "10 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/linspekt_44.jpg" },
  { slug: "norflotinat", name: "Норфлотинат", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/norflotinat.jpg" },
  { slug: "streptomitsidin", name: "Стрептомицидин", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/streptomitsidin.jpg" },
  { slug: "sulfaprim-poroshok", name: "Сульфаприм порошок", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/sulfaprim_poroshok.jpg" },
  { slug: "start-alb", name: "Старт Альб", packaging: "10 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/start_alb.jpg" },
  { slug: "tetrasept", name: "Тетрасепт", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/tetrasept.jpg" },
  { slug: "tiamutin-ws", name: "Тиамутин WS", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/tiamutin_ws.jpg" },
  { slug: "tilmitrim-poroshok", name: "Тилмитрим порошок", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/tilmitrim_poroshok.jpg" },
  { slug: "tifarm", name: "Тифарм", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/tifarm.jpg" },
  { slug: "fenbeks-22-2pct", name: "Фенбекс 22,2%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/fenbeks_222pct.jpg" },
  { slug: "fenoksitel-10pct", name: "Феноксител 10%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/fenoksitil_10pct.jpg" },
  { slug: "fenoksitel-32-5pct", name: "Феноксител 32,5%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/fenoksitil_325_pct.jpg" },
  { slug: "eymosan", name: "Эймосан", packaging: "25 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/eymosan.jpg" },
  { slug: "enroks-80pct", name: "Энрокс 80%", packaging: "0,5 кг", category: "antibiotics", form: "Оральный порошок", image: "/products/enroks-80.jpg" },

  // ANTIBIOTICS — Injectable
  { slug: "azalitsin", name: "Азалицин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/azalitsin.jpg" },
  { slug: "amoksol-la", name: "Амоксол LA", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/amoksol_la.jpg" },
  { slug: "buserol", name: "Бусерол", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/buserol.jpg" },
  { slug: "vizel", name: "Визел", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/vizel.jpg" },
  { slug: "virusid", name: "Вирусид", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/virusid.jpg" },
  { slug: "gamitron", name: "Гамитрон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/gamitron.jpg" },
  { slug: "gentan-10pct", name: "Гентан 10%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/gentan_10_pct.jpg" },
  { slug: "gentan-4pct", name: "Гентан 4%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/gentan_4_pct.jpg" },
  { slug: "gonaderil", name: "Гонадерил", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/gonaderil.jpg" },
  { slug: "deksamet", name: "Дексамет", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/deksamet.jpg" },
  { slug: "doksifloks", name: "Доксифлокс", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/doksifloks.jpg" },
  { slug: "dormek", name: "Дормек", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/dormek.jpg" },
  { slug: "drakson", name: "Драксон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/drakson.jpg" },
  { slug: "ketoprofen-long", name: "Кетопрофен Лонг", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/ketoprofen_long.jpg" },
  { slug: "kontrapain-10", name: "Контрапаин 10", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/kontrapain-10.jpg" },
  { slug: "koristar", name: "Користар", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/koristar.jpg" },
  { slug: "levamizol-7-5pct", name: "Левамизол 7,5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/levamizol_75pct.jpg" },
  { slug: "levit-100", name: "Левит 100", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/levit_100.jpg" },
  { slug: "levit-50", name: "Левит 50", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/levit_100.jpg" },
  { slug: "levovirin", name: "Левовирин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/levovirin.jpg" },
  { slug: "linkomitsin-10pct", name: "Линкомицин 10%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/linkomitsin_10pct.jpg" },
  { slug: "marbofloksatsin-10pct", name: "Марбофлоксацин 10%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/marbofloksatsin_10pct.jpg" },
  { slug: "marbofloksatsin-2pct", name: "Марбофлоксацин 2%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/marbofloksatsin_2pct.jpg" },
  { slug: "meloksidin", name: "Мелоксидин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/meloksidin.jpg" },
  { slug: "metasulf", name: "Метасульф", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/metasulf.jpg" },
  { slug: "mikozin", name: "Микозин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/mikozin.jpg" },
  { slug: "oksiton", name: "Окситон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/oksiton.jpg" },
  { slug: "piralgon", name: "Пиралгон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/piralgon.jpg" },
  { slug: "prednizol-25", name: "Преднизол 25", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/prednizol_25.jpg" },
  { slug: "respiron", name: "Респирон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/respiron.jpg" },
  { slug: "respiron-pig", name: "Респирон ПИГ", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/respiron_pig.jpg" },
  { slug: "selevit-e", name: "Селевит Е", packaging: "1 л", category: "antibiotics", form: "Инъекционный раствор", image: "/products/selevit_e.jpg" },
  { slug: "spetsin-la", name: "Специн ЛА", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/spetsin_la.jpg" },
  { slug: "tiamol", name: "Тиамол", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/tiamol.jpg" },
  { slug: "tiam-til", name: "Тиам-Тил", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/tiam-til.jpg" },
  { slug: "tilostin", name: "Тилостин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/tilostin.jpg" },
  { slug: "ferrum-200", name: "Феррум 200", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/ferrum_200.jpg" },
  { slug: "ferrum-b12", name: "Феррум В12", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/ferrum_b12.jpg" },
  { slug: "florinol", name: "Флоринол", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/florinol.jpg" },
  { slug: "floritil", name: "Флоритил", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/floritil.jpg" },
  { slug: "ftormaks", name: "Фтормакс", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/ftormaks.jpg" },
  { slug: "tsefapik-la", name: "Цефапик LA", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/tsefapik_la.jpg" },
  { slug: "tsefkinol-2-5pct", name: "Цефкинол 2,5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/tsefkinol_25pct.jpg" },
  { slug: "tsefkinol-7-5pct", name: "Цефкинол 7,5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/tsefkinol_75pct.jpg" },
  { slug: "tseftofur-5pct", name: "Цефтофур 5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/tseftofur_5pct.jpg" },
  { slug: "eleoprost-d", name: "Элеопрост D", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/eleoprost_d.jpg" },
  { slug: "enramoks", name: "Энрамокс", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/enramoks.jpg" },
  { slug: "estrovet-dl", name: "Эстровет DL", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор", image: "/products/estrovet_dl.jpg" },

  // ANTIBIOTICS — Intrauterine
  { slug: "endovazol", name: "Эндовазол", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор", image: "/products/endovazol.jpg" },
  { slug: "endoleks", name: "Эндолекс", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор", image: "/products/endoleks.jpg" },
  { slug: "endovit", name: "Эндовит", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор", image: "/products/endovit.jpg" },
  { slug: "endogen", name: "Эндоген", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор", image: "/products/endogen.jpg" },
  { slug: "endoyodol", name: "Эндойодол", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор", image: "/products/endoyodol.jpg" },
  { slug: "endotrim", name: "Эндотрим", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор", image: "/products/endotrim.jpg" },

  // ANTIBIOTICS — Infusion
  { slug: "rastvor-natriya-khlorida-0-9pct", name: "Раствор натрия хлорида 0,9%", packaging: "200 мл", category: "antibiotics", form: "Инфузионный раствор", image: "/products/rastvor_natriya_khlorida_09pct.jpg" },
  { slug: "rastvor-glyukozy-5pct", name: "Раствор глюкозы 5%", packaging: "400 мл", category: "antibiotics", form: "Инфузионный раствор", image: "/products/rastvor_glyukozy_5pct.jpg" },
  { slug: "rastvor-glyukozy-40pct", name: "Раствор глюкозы 40%", packaging: "400 мл", category: "antibiotics", form: "Инфузионный раствор", image: "/products/rastvor_glyukozy_40pct.jpg" },

  // ANTIBIOTICS — Mastitis
  { slug: "tsefkinom-lc", name: "Цефкином LC", packaging: "Шприц 8 г", category: "antibiotics", form: "Противомаститный препарат", image: "/products/tsefkinom_lc.jpg" },
  { slug: "ultramast", name: "Ультрамаст", packaging: "Шприц 5 г", category: "antibiotics", form: "Противомаститный препарат", image: "/products/ultramast.jpg" },
  { slug: "tsefkinom-dc", name: "Цефкином DC", packaging: "Шприц 8 г", category: "antibiotics", form: "Противомаститный препарат", image: "/products/tsefkinom_dc.jpg" },

  // DISINFECTANTS
  { slug: "virutek", name: "Virutek", packaging: "20 кг", category: "disinfectants", form: "Дезсредство", image: "/products/virutek.jpg" },
  { slug: "virotsid", name: "Вироцид", packaging: "20 кг", category: "disinfectants", form: "Дезсредство", image: "/products/virotsid.jpg" },
  { slug: "dm-sid", name: "ДМ Сид", packaging: "25 кг", category: "disinfectants", form: "Дезсредство", image: "/products/dm_sid.jpg" },
  { slug: "dm-sid-s", name: "ДМ Сид С", packaging: "24 кг", category: "disinfectants", form: "Дезсредство", image: "/products/dm_sid_s.jpg" },
  { slug: "khachonet", name: "Хачонет", packaging: "22 кг", category: "disinfectants", form: "Дезсредство", image: "/products/hachonet.jpg" },
  { slug: "tornaks-s", name: "Торнакс С", packaging: "24 кг", category: "disinfectants", form: "Дезсредство", image: "/products/tornaks_s.jpg" },
  { slug: "sid-2000", name: "Сид 2000", packaging: "10 кг", category: "disinfectants", form: "Дезсредство", image: "/products/sid_2000.png" },

  // VITAMINS
  { slug: "lovit-ad3e", name: "Ловит АД3Е", category: "vitamins", form: "Витаминный комплекс", image: "/products/lovit_ad3e.png" },
  { slug: "lovit-fos", name: "Ловит Фос", category: "vitamins", form: "Витаминный комплекс", image: "/products/lovit_fos.png" },
  { slug: "lovit-lc-energy", name: "Ловит LC Energy", category: "vitamins", form: "Витаминный комплекс", image: "/products/lovit_lc_energy.png" },
  { slug: "e-selen", name: "Е-селен", category: "vitamins", form: "Витаминный комплекс", image: "/products/e_selen.png" },
  { slug: "amino-plyus", name: "Амино Плюс", category: "vitamins", form: "Витаминный комплекс", image: "/products/amino_plus.png" },

  // VACCINES

  { slug: "rinbio-nd-ts", name: "RinBio ND (TS)", packaging: "1000 доз / флакон", category: "vaccines", form: "Вакцина", image: "/products/rinbio_nd_ts.png" },
  { slug: "rinbio-ib-ts", name: "RinBio IB (TS)", packaging: "1000 доз / флакон", category: "vaccines", form: "Вакцина", image: "/products/rinbio_ib_ts.png" },
  { slug: "rinvac-rec-nd-ai", name: "RinVac Rec ND+AI", packaging: "500 мл / флакон", category: "vaccines", form: "Вакцина", image: "/products/rinvac_rec_nd_ai.png" },
  { slug: "rinvac-nd-ai-fad", name: "RinVac ND+AI+FAD", packaging: "500 мл / флакон", category: "vaccines", form: "Вакцина", image: "/products/rinvac_nd_ai_fad.png" },
  { slug: "igly-odnorazovye-0-90-25-mm", name: "Иглы одноразовые 0,90×25 мм", category: "vaccines", form: "Расходный материал" },
];

/** Допустимые значения фильтра категории в каталоге (`?category=`). */
export const categoryFilterValues = ["all", ...(Object.keys(categories) as Category[])] as const;
export type CategoryFilter = "all" | Category;

export function isCategory(value: string | null | undefined): value is Category {
  return !!value && Object.prototype.hasOwnProperty.call(categories, value);
}

/** Препарат со всеми фасовками — одна страница /catalog/{slug}. */
export interface ProductGroup {
  slug: string;
  name: string;
  category: Category;
  form: ProductForm;
  image?: string;
  packagings: string[];
}

export const productGroups: ProductGroup[] = (() => {
  const map = new Map<string, ProductGroup>();
  for (const p of products) {
    const g = map.get(p.slug);
    if (g) {
      if (p.packaging) g.packagings.push(p.packaging);
      continue;
    }
    map.set(p.slug, {
      slug: p.slug,
      name: p.name,
      category: p.category,
      form: p.form,
      image: p.image,
      packagings: p.packaging ? [p.packaging] : [],
    });
  }
  return [...map.values()];
})();

export function getProductGroup(slug: string): ProductGroup | undefined {
  return productGroups.find((g) => g.slug === slug);
}
