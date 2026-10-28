// No individual shops on purpose: names, addresses and opening hours change and could not be verified.
// Each entry opens a live Google Maps search around the JFAZ, so results are always current.

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
  { id: "all", label: "Alle Kategorien" },
  { id: "supermarkt", label: "Supermärkte" },
  { id: "drogerie", label: "Drogerie" },
  { id: "essen", label: "Essen" },
  { id: "notfall", label: "Apotheke & Tankstelle" },
] as const;

const NEAR_JFAZ = "+in+der+N%C3%A4he+von+Lintzingsweg+1a,+35043+Marburg";
const AREA = "Rund um Marburg-Cappel";
const HOURS_HINT = "Aktuelle Öffnungszeiten in Google Maps prüfen";

export const cappelLocations: CappelLocation[] = [
  {
    id: "supermarkt",
    name: "Supermärkte & Discounter",
    category: "supermarkt",
    categoryLabel: "Lebensmittel & Getränke",
    badge: "In der Nähe",
    iconName: "ShoppingCart",
    description: "Für Getränke, Obst und Snacks am Abend.",
    address: AREA,
    hours: HOURS_HINT,
    mapsQuery: `Supermarkt${NEAR_JFAZ}`,
  },
  {
    id: "drogerie",
    name: "Drogerie",
    category: "drogerie",
    categoryLabel: "Hygiene & Pflege",
    badge: "In der Nähe",
    iconName: "Sparkles",
    description: "Duschgel, Zahnbürste oder Sonnencreme vergessen? Hier bekommst du Ersatz.",
    address: AREA,
    hours: HOURS_HINT,
    mapsQuery: `Drogerie${NEAR_JFAZ}`,
  },
  {
    id: "baeckerei",
    name: "Bäckereien",
    category: "essen",
    categoryLabel: "Kaffee & Backwaren",
    badge: "In der Nähe",
    iconName: "Store",
    description: "Für einen Kaffee oder ein Brötchen zwischendurch.",
    address: AREA,
    hours: HOURS_HINT,
    mapsQuery: `B%C3%A4ckerei${NEAR_JFAZ}`,
  },
  {
    id: "essen",
    name: "Restaurants & Imbisse",
    category: "essen",
    categoryLabel: "Essen gehen",
    badge: "In der Nähe",
    iconName: "Utensils",
    description: "Pizza, Döner und mehr – falls du abends noch Hunger hast.",
    address: AREA,
    hours: HOURS_HINT,
    mapsQuery: `Restaurant${NEAR_JFAZ}`,
  },
  {
    id: "apotheke",
    name: "Apotheken",
    category: "notfall",
    categoryLabel: "Medikamente & Notdienst",
    badge: "In der Nähe",
    iconName: "Pill",
    description: "Außerhalb der Öffnungszeiten zeigt dir aponet.de die nächste Notdienst-Apotheke.",
    address: AREA,
    hours: HOURS_HINT,
    mapsQuery: `Apotheke${NEAR_JFAZ}`,
  },
  {
    id: "tankstelle",
    name: "Tankstellen",
    category: "notfall",
    categoryLabel: "Tanken & Kleinigkeiten",
    badge: "In der Nähe",
    iconName: "Fuel",
    description: "Für die Heimfahrt oder Kleinigkeiten am späten Abend.",
    address: AREA,
    hours: HOURS_HINT,
    mapsQuery: `Tankstelle${NEAR_JFAZ}`,
  },
];
