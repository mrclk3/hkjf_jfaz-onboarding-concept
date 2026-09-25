export interface PackItem {
  id: string;
  label: string;
  category: "dokumente" | "kleidung" | "hygiene" | "elektronik" | "feuerwehr";
  recommended?: boolean;
  forPersona?: "all" | "newcomer" | "returner";
  isCourseSpecific?: boolean;
  courseReason?: string;
}

export const packCategories = [
  { id: "all", label: "Alle Kategorien" },
  { id: "lehrgang", label: "🎯 Lehrgangs-Spezial" },
  { id: "dokumente", label: "Unterlagen & Ausweis" },
  { id: "kleidung", label: "Kleidung & Schuhe" },
  { id: "hygiene", label: "Hygiene & Handtücher" },
  { id: "elektronik", label: "Elektronik & Lernen" },
  { id: "feuerwehr", label: "Feuerwehr & Ausrüstung" },
] as const;

export const initialPackItems: PackItem[] = [
  // Dokumente
  { id: "doc-1", label: "Personalausweis oder Führerschein", category: "dokumente", recommended: true },
  { id: "doc-2", label: "Lehrgangseinladung / Anmeldebestätigung", category: "dokumente", recommended: true },
  { id: "doc-3", label: "Krankenkassenkarte / Notfalldaten", category: "dokumente", recommended: true },
  { id: "doc-4", label: "Ggf. Entsendungsnachweis deiner Feuerwehr / Kommune", category: "dokumente" },

  // Hygiene
  { id: "hyg-1", label: "Großes Duschtuch & Handtuch (Bettwäsche ist vorhanden!)", category: "hygiene", recommended: true },
  { id: "hyg-2", label: "Duschgel, Shampoo & Deo", category: "hygiene", recommended: true },
  { id: "hyg-3", label: "Zahnbürste & Zahnpasta", category: "hygiene", recommended: true },
  { id: "hyg-4", label: "Persönliche Medikamente & Pflaster", category: "hygiene" },
  { id: "hyg-5", label: "Badelatschen / Hausschuhe für das Zimmer", category: "hygiene" },

  // Kleidung & Schuhe
  { id: "cloth-1", label: "Bequeme Freizeitkleidung für Unterricht & Abend", category: "kleidung", recommended: true },
  { id: "cloth-2", label: "Ausreichend Wechselkleidung für die Lehrgangsdauer", category: "kleidung", recommended: true },
  { id: "cloth-3", label: "Wetterfeste Jacke für den Weg zwischen den Gebäuden", category: "kleidung", recommended: true },
  { id: "cloth-4", label: "Feste Alltagsschuhe", category: "kleidung", recommended: true },

  // Elektronik & Lernen
  { id: "elec-1", label: "Smartphone & Ladekabel", category: "elektronik", recommended: true },
  { id: "elec-2", label: "Mehrfachsteckdose / Verlängerungskabel (Geheimtipp!)", category: "elektronik", recommended: true },
  { id: "elec-3", label: "Schreibblock & Stifte für Notizen", category: "elektronik", recommended: true },
  { id: "elec-4", label: "Powerbank für unterwegs", category: "elektronik" },

  // Feuerwehr allgemein
  { id: "fw-2", label: "Feuerwehrausweis / Jugendleiter-Card (Juleica)", category: "feuerwehr" },
];

export const onlinePackCategories = [
  { id: "all", label: "Alle Kategorien" },
  { id: "lehrgang", label: "🎯 Lehrgangs-Spezial" },
  { id: "elektronik", label: "💻 Technik & Hardware" },
  { id: "dokumente", label: "🌐 Zugang & Software" },
  { id: "kleidung", label: "📝 Schreibtisch & Umgebung" },
  { id: "hygiene", label: "☕ Homeoffice-Verpflegung" },
] as const;

export const initialOnlinePackItems: PackItem[] = [
  // Technik & Hardware
  { id: "onl-tech-1", label: "Laptop oder PC mit Tastatur und Maus", category: "elektronik", recommended: true },
  { id: "onl-tech-2", label: "Funktionierendes Headset / Kopfhörer mit Mikrofon (Echo-Vermeidung)", category: "elektronik", recommended: true },
  { id: "onl-tech-3", label: "Webcam mit guter Ausleuchtung (Licht von vorne)", category: "elektronik", recommended: true },
  { id: "onl-tech-4", label: "Netzteil / Ladekabel dauerhaft eingesteckt", category: "elektronik", recommended: true },
  { id: "onl-tech-5", label: "Zweiter Monitor oder Tablet für Skripte / Florix (optional, aber top!)", category: "elektronik", recommended: false },

  // Zugang & Software
  { id: "onl-net-1", label: "Stabile Internetverbindung (LAN-Kabel oder starkes WLAN)", category: "dokumente", recommended: true },
  { id: "onl-net-2", label: "Einladungs-E-Mail mit Seminar-Link & Zugangsdaten griffbereit", category: "dokumente", recommended: true },
  { id: "onl-net-3", label: "Aktueller Webbrowser (Google Chrome, MS Edge oder Mozilla Firefox)", category: "dokumente", recommended: true },
  { id: "onl-net-4", label: "Ggf. Florix-Zugangsdaten der eigenen Feuerwehr", category: "dokumente", recommended: false },

  // Schreibtisch & Notizen
  { id: "onl-desk-1", label: "Ruhiger Arbeitsplatz ohne Störungen durch Mitbewohner / Haustiere", category: "kleidung", recommended: true },
  { id: "onl-desk-2", label: "Schreibblock & Kugelschreiber / Textmarker für Notizen", category: "kleidung", recommended: true },
  { id: "onl-desk-3", label: "Bequemer, ergonomischer Schreibtischstuhl", category: "kleidung", recommended: true },

  // Verpflegung & Wohlbefinden
  { id: "onl-food-1", label: "Große Flasche Wasser / Tee direkt am Arbeitsplatz", category: "hygiene", recommended: true },
  { id: "onl-food-2", label: "Kaffeebecher oder Nervennahrung für den Vormittag", category: "hygiene", recommended: false },
  { id: "onl-food-3", label: "Mittagessen für die 60-minütige Mittagspause vorplanen", category: "hygiene", recommended: true },
];
