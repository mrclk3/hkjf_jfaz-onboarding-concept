export interface CappelLocation {
  id: string;
  name: string;
  category: "supermarkt" | "drogerie" | "essen" | "notfall";
  categoryLabel: string;
  badge: string;
  iconName: "ShoppingCart" | "Sparkles" | "Utensils" | "Pill" | "Fuel" | "Store";
  description: string;
  address: string;
  hours: string;
  mapsQuery: string;
}

export const cappelCategories = [
  { id: "all", label: "Alle Orte anzeigen" },
  { id: "supermarkt", label: "Supermärkte & Discounter" },
  { id: "drogerie", label: "Drogerie & Hygiene" },
  { id: "essen", label: "Essen & Spätimbiss" },
  { id: "notfall", label: "Apotheke & Tankstelle" },
] as const;

export const cappelLocations: CappelLocation[] = [
  {
    id: "aldi",
    name: "ALDI Nord Cappel",
    category: "supermarkt",
    categoryLabel: "Discounter & Backstation",
    badge: "🚶 ca. 7–9 Min. (800 m)",
    iconName: "ShoppingCart",
    description: "Großer Discounter mit Frischetheke und Backstation. Ideal für günstige Getränke, Snacks und Knabbereien für den Lehrgangsabend.",
    address: "Marburger Str. 100, 35043 Marburg-Cappel",
    hours: "Mo–Sa 08:00 – 20:00 Uhr",
    mapsQuery: "Aldi+Nord+Marburger+Str.+100+35043+Marburg-Cappel",
  },
  {
    id: "lidl",
    name: "Lidl Marburg-Cappel",
    category: "supermarkt",
    categoryLabel: "Discounter & Backshop",
    badge: "🚶 ca. 9–11 Min. (950 m)",
    iconName: "Store",
    description: "Moderne Lidl-Filiale mit riesiger Snackauswahl, Kaffeespezialitäten-Automat und frischen Backwaren zu Sparpreisen.",
    address: "Umgehungsstraße 9, 35043 Marburg-Cappel",
    hours: "Mo–Sa 07:00 – 21:00 Uhr",
    mapsQuery: "Lidl+Umgehungsstraße+9+35043+Marburg-Cappel",
  },
  {
    id: "tegut",
    name: "tegut... Supermarkt Cappel",
    category: "supermarkt",
    categoryLabel: "Vollsortimenter & Bio-Markt",
    badge: "🚶 ca. 10–12 Min. (1,1 km)",
    iconName: "ShoppingCart",
    description: "Großer Vollsortiment-Supermarkt mit regionalen Spezialitäten, riesiger Bio-Auswahl, Frische-Theken und separater Bäckereifiliale.",
    address: "Marburger Str. 65, 35043 Marburg-Cappel",
    hours: "Mo–Sa 07:00 – 21:00 Uhr",
    mapsQuery: "tegut+Marburger+Str.+65+35043+Marburg-Cappel",
  },
  {
    id: "dm",
    name: "dm-drogerie markt Cappel",
    category: "drogerie",
    categoryLabel: "Drogerie & Hygiene",
    badge: "🚶 ca. 8–10 Min. (850 m)",
    iconName: "Sparkles",
    description: "Perfekt, falls Duschgel, Zahnbürste, Deo, Kontaktlinsenmittel, Pflaster oder Energieriegel zuhause vergessen wurden.",
    address: "Marburger Str. 98, 35043 Marburg-Cappel",
    hours: "Mo–Sa 08:00 – 20:00 Uhr",
    mapsQuery: "dm-drogerie+markt+Marburger+Str.+98+35043+Marburg-Cappel",
  },
  {
    id: "apotheke",
    name: "Apotheke am Cappeler Tor",
    category: "notfall",
    categoryLabel: "Apotheke & Notfall",
    badge: "🚶 ca. 8 Min. (750 m)",
    iconName: "Pill",
    description: "Rezeptfreie Medikamente (Kopfschmerztabletten, Halspastillen, Blasenpflaster etc.) und Notdienst-Aushang am Schaufenster.",
    address: "Marburger Str. 82, 35043 Marburg-Cappel",
    hours: "Mo–Fr 08:30–18:30, Sa 08:30–13:00 Uhr",
    mapsQuery: "Apotheke+am+Cappeler+Tor+Marburger+Str.+82+35043+Marburg-Cappel",
  },
  {
    id: "pizzeria",
    name: "Pizzeria & Döner Imbiss Cappel",
    category: "essen",
    categoryLabel: "Spätanreise & Abendsnack",
    badge: "🚶 ca. 7–9 Min. (800 m)",
    iconName: "Utensils",
    description: "Warme Pizza, Döner, Dürüm und Falafel – ideal bei später Anreise nach Schließung der JFAZ-Küche oder für den gemütlichen Abend.",
    address: "Marburger Str. 90, 35043 Marburg-Cappel",
    hours: "Täglich geöffnet bis ca. 22:30 Uhr",
    mapsQuery: "Pizza+Döner+Marburger+Str.+35043+Marburg-Cappel",
  },
  {
    id: "aral",
    name: "Aral Tankstelle & REWE to Go",
    category: "notfall",
    categoryLabel: "24/7 Notfall & Tanken",
    badge: "🚗 2 Min. / 🚶 12 Min.",
    iconName: "Fuel",
    description: "24h geöffnet! Backwaren, gekühlte Getränke, Snacks, Geldautomat und KFZ-Bedarf zu jeder Tages- und Nachtzeit.",
    address: "Umgehungsstraße 15, 35043 Marburg",
    hours: "24 Stunden / Rund um die Uhr",
    mapsQuery: "Aral+Tankstelle+Umgehungsstraße+15+35043+Marburg",
  },
];
