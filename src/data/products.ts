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
  name: string;
  packaging?: string;
  category: Category;
  form: ProductForm;
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
    description: "Вакцины Nobilis, Porcilis и другие для птицы и свиней с расходным материалом.",
  },
  vitamins: {
    label: "Витамины",
    description: "Витаминные и энергетические комплексы для поддержки продуктивности и здоровья животных.",
  },
};

export const products: Product[] = [
  // ANTIBIOTICS — Oral solutions
  { name: "Галофур", packaging: "500 мл", category: "antibiotics", form: "Оральный раствор" },
  { name: "Доксикол Аква", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Доксикол Аква", packaging: "20 мл", category: "antibiotics", form: "Оральный раствор" },
  { name: "Колимиксин", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Леволокс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Леволокс 20%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Норфлок Аква", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Парацетамол 30%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Прококс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Пульмонол СТ", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Ресэйв", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Сульфаприм", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Сульфаприм 36%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Тилмитрим", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Тилмитрим", packaging: "20 мл", category: "antibiotics", form: "Оральный раствор" },
  { name: "Толутрокс 2,5%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Толутрокс 5%", packaging: "500 мл", category: "antibiotics", form: "Оральный раствор" },
  { name: "Трифлокс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Флосан 4%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Флосол 30%", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Ципромет", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Ципрофлокс", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Энрокол", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },
  { name: "Энроксол", packaging: "1 л", category: "antibiotics", form: "Оральный раствор" },

  // ANTIBIOTICS — Oral powders
  { name: "Айвазол", packaging: "0,25 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Альбендазим 20%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Амоксикар 50%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Амоксикар 80%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Амоксикол АЛ", packaging: "0,5 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Аспирон", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Гентан WS", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Доксикар", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Ивермектин", packaging: "1 л", category: "antibiotics", form: "Оральный порошок" },
  { name: "Клавумокс 62,5%", packaging: "0,5 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Клоксамокс", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Левамизол 100", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Леволокс порошок", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Линспект 100", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Линспект 44", packaging: "10 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Норфлотинат", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Стрептомицидин", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Сульфаприм порошок", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Старт Альб", packaging: "10 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Тетрасепт", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Тиамутин WS", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Тилмитрим порошок", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Тифарм", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Фенбекс 22,2%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Феноксител 10%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Феноксител 32,5%", packaging: "1 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Эймосан", packaging: "25 кг", category: "antibiotics", form: "Оральный порошок" },
  { name: "Энрокс 80%", packaging: "0,5 кг", category: "antibiotics", form: "Оральный порошок" },

  // ANTIBIOTICS — Injectable
  { name: "Азалицин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Амоксол LA", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Бусерол", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Визел", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Вирусид", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Гамитрон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Гентан 10%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Гентан 4%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Гонадерил", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Дексамет", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Доксифлокс", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Дормек", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Драксон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Кетопрофен Лонг", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Контрапаин 10", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Користар", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Левамизол 7,5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Левит 100", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Левит 50", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Левовирин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Линкомицин 10%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Марбофлоксацин 10%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Марбофлоксацин 2%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Мелоксидин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Метасульф", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Микозин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Окситон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Пиралгон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Преднизол 25", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Респирон", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Респирон ПИГ", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Селевит Е", packaging: "1 л", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Специн ЛА", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Тиамол", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Тиам-Тил", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Тилостин", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Феррум 200", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Феррум В12", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Флоринол", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Флоритил", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Фтормакс", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Цефапик LA", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Цефкинол 2,5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Цефкинол 7,5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Цефтофур 5%", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Элеопрост D", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Энрамокс", packaging: "100 мл", category: "antibiotics", form: "Инъекционный раствор" },
  { name: "Эстровет DL", packaging: "20 мл", category: "antibiotics", form: "Инъекционный раствор" },

  // ANTIBIOTICS — Intrauterine
  { name: "Эндовазол", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор" },
  { name: "Эндолекс", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор" },
  { name: "Эндовит", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор" },
  { name: "Эндоген", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор" },
  { name: "Эндойодол", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор" },
  { name: "Эндотрим", packaging: "1 л", category: "antibiotics", form: "Внутриматочный раствор" },

  // ANTIBIOTICS — Infusion
  { name: "Раствор натрия хлорида 0,9%", packaging: "200 мл", category: "antibiotics", form: "Инфузионный раствор" },
  { name: "Раствор глюкозы 5%", packaging: "400 мл", category: "antibiotics", form: "Инфузионный раствор" },
  { name: "Раствор глюкозы 40%", packaging: "400 мл", category: "antibiotics", form: "Инфузионный раствор" },

  // ANTIBIOTICS — Mastitis
  { name: "Цефкином LC", packaging: "Шприц 8 г", category: "antibiotics", form: "Противомаститный препарат" },
  { name: "Ультрамаст", packaging: "Шприц 5 г", category: "antibiotics", form: "Противомаститный препарат" },
  { name: "Цефкином DC", packaging: "Шприц 8 г", category: "antibiotics", form: "Противомаститный препарат" },

  // DISINFECTANTS
  { name: "Virutek", packaging: "20 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "Вироцид", packaging: "20 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "ДМ Сид", packaging: "25 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "ДМ Сид С", packaging: "24 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "Хачонет", packaging: "22 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "Торнакс С", packaging: "24 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "Сид 2000", packaging: "10 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "UCO DES P", packaging: "10 кг", category: "disinfectants", form: "Дезсредство" },
  { name: "UCO DES 3000", packaging: "20 Л", category: "disinfectants", form: "Дезсредство" },


  // VITAMINS
  { name: "Ловит АД3Е", category: "vitamins", form: "Витаминный комплекс" },
  { name: "Ловит Фос", category: "vitamins", form: "Витаминный комплекс" },
  { name: "Ловит LC Energy", category: "vitamins", form: "Витаминный комплекс" },
  { name: "Е-селен", category: "vitamins", form: "Витаминный комплекс" },
  { name: "Амино Плюс", category: "vitamins", form: "Витаминный комплекс" },

  // VACCINES
  { name: "Innovax-ND-IBD", packaging: "1×4000 доз / 2 мл", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis IB MA", packaging: "12×2500 доз", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis IB MA", packaging: "12×5000 доз", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis ND Clone 30", packaging: "12×5000 доз", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis ND Clone 30", packaging: "12×2500 доз", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis IB 4-91", packaging: "12×5000 доз", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis Гамборо 228Е", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis ILT", packaging: "10×2500 доз", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis AE+POX", packaging: "1×1000 доз + растворитель", category: "vaccines", form: "Вакцина" },
  { name: "Solvens Oculo/Nasal", packaging: "1×2500", category: "vaccines", form: "Вакцина" },
  { name: "Nobilis Diluent CA", packaging: "1×800 мл", category: "vaccines", form: "Вакцина" },
  { name: "Porcilis PCV MHyo", packaging: "100 доз", category: "vaccines", form: "Вакцина" },
  { name: "Porcilis PCV MHyo", packaging: "50 доз", category: "vaccines", form: "Вакцина" },
  { name: "Порцилис Ery+Parvo+Lepto", packaging: "25 доз / флакон", category: "vaccines", form: "Вакцина" },
  { name: "Porcilis ColiClos", packaging: "25 доз", category: "vaccines", form: "Вакцина" },
  { name: "Glesser", packaging: "25 доз", category: "vaccines", form: "Вакцина" },
  { name: "Роковак Нео", category: "vaccines", form: "Вакцина" },
  { name: "Иглы одноразовые 0,90×25 мм", category: "vaccines", form: "Расходный материал" },
  { name: "RinBio IB (TS)", packaging: "1000 доз\10 флаконов", category: "vaccines", form: "Вакцина" },
  { name: "RinBio ND (TS)", packaging: "1000 доз\10 флаконов", category: "vaccines", form: "Вакцина" },
  { name: "RinVac Rec ND AI", packaging: "500 МЛ", category: "vaccines", form: "Вакцина" },
  { name: "RinVac Rec ND AI FAD", packaging: "500 МЛ", category: "vaccines", form: "Вакцина" },
];
