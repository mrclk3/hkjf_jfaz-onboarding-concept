export interface PackItem {
  id: string;
  label: string;
  category: "dokumente" | "kleidung" | "hygiene" | "elektronik" | "feuerwehr";
  recommended?: boolean;
  forPersona?: "all" | "newcomer" | "returner";
}

export const packCategories = [
  { id: "all", label: "Alle Kategorien" },
  { id: "dokumente", label: "Unterlagen & Ausweis" },
  { id: "kleidung", label: "Kleidung & Freizeit" },
  { id: "hygiene", label: "Hygiene & Handtücher" },
  { id: "elektronik", label: "Elektronik & Lernen" },
  { id: "feuerwehr", label: "Feuerwehr-Bedarf" },
] as const;

export const initialPackItems: PackItem[] = [
  { id: "doc-1", label: "Personalausweis oder Führerschein", category: "dokumente", recommended: true },
  { id: "doc-2", label: "Lehrgangseinladung / Anmeldebestätigung", category: "dokumente", recommended: true },
  { id: "doc-3", label: "Krankenkassenkarte / Notfalldaten", category: "dokumente", recommended: true },
  { id: "doc-4", label: "Ggf. Entsendungsnachweis deiner Feuerwehr / Kommune", category: "dokumente" },

  { id: "hyg-1", label: "Großes Duschtuch & Handtuch (Bettwäsche ist vorhanden!)", category: "hygiene", recommended: true },
  { id: "hyg-2", label: "Duschgel, Shampoo & Deo", category: "hygiene", recommended: true },
  { id: "hyg-3", label: "Zahnbürste & Zahnpasta", category: "hygiene", recommended: true },
  { id: "hyg-4", label: "Persönliche Medikamente & Pflaster", category: "hygiene" },
  { id: "hyg-5", label: "Badelatschen / Hausschuhe für das Zimmer", category: "hygiene" },

  { id: "cloth-1", label: "Bequeme Freizeitkleidung für Unterricht & Abend", category: "kleidung", recommended: true },
  { id: "cloth-2", label: "Ausreichend Wechselkleidung für die Lehrgangsdauer", category: "kleidung", recommended: true },
  { id: "cloth-3", label: "Wetterfeste Jacke für den Weg zwischen den Gebäuden", category: "kleidung", recommended: true },
  { id: "cloth-4", label: "Sportbekleidung & Turnschuhe (falls Sport geplant ist)", category: "kleidung" },

  { id: "elec-1", label: "Smartphone & Ladekabel", category: "elektronik", recommended: true },
  { id: "elec-2", label: "Mehrfachsteckdose / Verlängerungskabel (Geheimtipp!)", category: "elektronik", recommended: true },
  { id: "elec-3", label: "Schreibblock & Stifte für Notizen", category: "elektronik", recommended: true },
  { id: "elec-4", label: "Laptop oder Tablet (optional für digitale Unterlagen)", category: "elektronik" },
  { id: "elec-5", label: "Powerbank für unterwegs", category: "elektronik" },

  { id: "fw-1", label: "Dienstkleidung (nur falls in Einladung gefordert)", category: "feuerwehr" },
  { id: "fw-2", label: "Feuerwehrausweis / Jugendleiter-Card (Juleica)", category: "feuerwehr" },
  { id: "fw-3", label: "Eigener Helm & Handschuhe (nur bei Praxisseminaren)", category: "feuerwehr" },
];
