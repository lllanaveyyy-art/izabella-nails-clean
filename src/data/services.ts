// Service catalog — structured for future CRM / YClients sync.
// Each entry maps cleanly to a booking system record.

export type Service = {
  id: string;
  name: string;
  duration: string;
  durationMinutes: number;
  price: string;
  priceFrom: boolean;
  description: string;
  category: "manicure" | "extension";
};

export const services: Service[] = [
  {
    id: "classic",
    name: "Классический маникюр",
    duration: "30 мин.",
    durationMinutes: 30,
    price: "400 ₽",
    priceFrom: false,
    description:
      "Аккуратная обработка кутикулы и придание формы. База для ухоженных рук без покрытия.",
    category: "manicure",
  },
  {
    id: "men",
    name: "Мужской маникюр",
    duration: "30 мин.",
    durationMinutes: 30,
    price: "500 ₽",
    priceFrom: false,
    description:
      "Уход за мужскими руками: чистая кутикула, аккуратная форма, лёгкая полировка.",
    category: "manicure",
  },
  {
    id: "gel",
    name: "Маникюр с покрытием гель-лаком",
    duration: "1 ч 30 мин.",
    durationMinutes: 90,
    price: "850 ₽",
    priceFrom: false,
    description:
      "Маникюр + стойкое покрытие гель-лаком. Глянцевый блеск, который держится до 3-4 недель.",
    category: "manicure",
  },
  {
    id: "strengthening",
    name: "Укрепление гелем",
    duration: "1 ч 15 мин.",
    durationMinutes: 75,
    price: "1 100 ₽",
    priceFrom: false,
    description:
      "Укрепление натуральных ногтей биогелем – для прочности, длины и красивой формы.",
    category: "manicure",
  },
  {
    id: "correction",
    name: "Коррекция наращённых ногтей",
    duration: "1 ч 30 мин.",
    durationMinutes: 90,
    price: "1 300 ₽",
    priceFrom: false,
    description:
      "Поддержание формы и обновление покрытия на наращённых ногтях каждые 3-4 недели.",
    category: "extension",
  },
  {
    id: "extension",
    name: "Наращивание ногтей",
    duration: "2 ч 30 мин.",
    durationMinutes: 150,
    price: "1 500 ₽",
    priceFrom: false,
    description:
      "Наращивание любой длины и формы. Прочное основание под трендовые дизайны.",
    category: "extension",
  },
];
