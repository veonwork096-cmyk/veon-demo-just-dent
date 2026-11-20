// All facts here come from veon/client.json and audit/raw/prajs-lyst.txt (only prices equal in every table).

export const phones = {
  main: { href: "tel:+380950863631", label: "095 086 36 31", full: "+380 95 086 36 31" },
  second: { href: "tel:+380979704096", label: "097 970 40 96", full: "+380 97 970 40 96" },
} as const;

export const email = { href: "mailto:info@just-dent.com", label: "info@just-dent.com" } as const;

export type ChannelIcon = "phone" | "telegram" | "viber" | "whatsapp" | "instagram" | "facebook" | "mail";
export interface Channel { id: string; label: string; note: string; href: string; icon: ChannelIcon; external: boolean; }

export const channels: Channel[] = [
  { id: "call-095", label: "Подзвонити", note: phones.main.label, href: phones.main.href, icon: "phone", external: false },
  { id: "call-097", label: "Подзвонити", note: phones.second.label, href: phones.second.href, icon: "phone", external: false },
  { id: "telegram", label: "Telegram", note: phones.main.label, href: "https://t.me/+380950863631", icon: "telegram", external: true },
  { id: "viber", label: "Viber", note: phones.main.label, href: "viber://chat?number=%2B380950863631", icon: "viber", external: false },
  { id: "whatsapp", label: "WhatsApp", note: phones.main.label, href: "https://wa.me/380950863631", icon: "whatsapp", external: true },
  { id: "instagram", label: "Instagram Direct", note: "@just_dent_clinic", href: "https://www.instagram.com/just_dent_clinic/", icon: "instagram", external: true },
];

// Confirmed social pages (client.json socials). Facebook is not a booking channel, so it is not in the sheet.
export const facebook: Channel = { id: "facebook", label: "Facebook", note: "сторінка Just Dent", href: "https://www.facebook.com/KarpovichRostislav/", icon: "facebook", external: true };
export const instagramUrl = "https://www.instagram.com/just_dent_clinic/";

const mapDir = (q: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

export const clinics = [
  {
    id: "uzhhorod",
    city: "Ужгород",
    address: "вул. Заньковецької, 38",
    region: "м. Ужгород",
    hours: "Пн–Сб 9:00–21:00",
    hoursKnown: true,
    map: mapDir("Ужгород, вул. Заньковецької, 38"),
  },
  {
    id: "richka",
    city: "с. Річка",
    address: "буд. 137-а",
    region: "Хустський (Міжгірський) р-н",
    hours: "Графік уточнюйте за телефоном",
    hoursKnown: false,
    map: mapDir("с. Річка, 137-а, Міжгірська громада, Закарпатська область"),
  },
] as const;

export interface ServiceRow {
  name: string;
  what: string;
  price: string;        // shown big, e.g. "900 грн"
  from?: boolean;       // prefix «від»
  priceNote?: string;   // what exactly the price is for
  extra?: string;       // second undisputed price
  slug: string;         // future page (FutureLink)
}
export interface ServiceGroup { id: string; title: string; lead: string; rows: ServiceRow[]; }

export const serviceGroups: ServiceGroup[] = [
  {
    id: "now",
    title: "Болить або турбує зараз",
    lead: "Приймаємо з понеділка по суботу до 21:00.",
    rows: [
      { name: "Ендодонтія", what: "Лікування кореневих каналів, зняття гострого стану", price: "900 грн", from: true, priceNote: "1-канальний зуб", slug: "endodontiya" },
      { name: "Хірургія", what: "Видалення зубів, у тому числі зубів мудрості", price: "600 грн", from: true, priceNote: "видалення", slug: "khirurgiya" },
    ],
  },
  {
    id: "family",
    title: "Планово, для всієї родини",
    lead: "Огляд, лікування і профілактика для дорослих і дітей.",
    rows: [
      { name: "Огляд і консультація", what: "Огляд, прицільний знімок, фото-план лікування", price: "300 грн", priceNote: "консультація", slug: "oglyad-i-konsultatsiya" },
      { name: "Лікування карієсу та реставрація", what: "Фотополімерні пломби, реставрація фронтальних зубів", price: "1 300 грн", from: true, priceNote: "пломба фотополімерна", slug: "likuvannya-kariyesu" },
      { name: "Профілактика і гігієна", what: "Професійна гігієна, фторування, герметизація фісур", price: "за телефоном", priceNote: "вартість гігієни", slug: "profilaktyka-i-gigiyena" },
      { name: "Дитяча стоматологія", what: "Молочні пломби, дитяча гігієна, видалення молочних зубів", price: "600 грн", from: true, priceNote: "пломба молочна", extra: "дитяча гігієна — 800 грн", slug: "dytyacha-stomatologiya" },
    ],
  },
  {
    id: "restore",
    title: "Відновити або замінити зуб",
    lead: "Коронки, вініри та імплантація.",
    rows: [
      { name: "Ортопедія", what: "Коронки, вініри, вкладки, протези", price: "6 300 грн", priceNote: "цирконієва коронка", extra: "вініри, коронки E-MAX — 7 000 грн", slug: "ortopediya" },
      { name: "Імплантологія", what: "Встановлення імпланта і коронки на імплантах", price: "14 500 грн", priceNote: "встановлення імпланта", slug: "implantologiya" },
    ],
  },
];

export const firstVisit = [
  { value: "300", unit: "грн", from: false, label: "консультація" },
  { value: "100", unit: "грн", from: true, label: "прицільний знімок" },
  { value: "600", unit: "грн", from: false, label: "фото-план лікування" },
] as const;
