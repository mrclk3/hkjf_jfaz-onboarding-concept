export interface FaqItem {
  id: string;
  category: "allgemein" | "unterkunft" | "anreise" | "orga";
  question: string;
  answer: string;
  keywords: string[];
}

export const faqCategories = [
  { id: "all", label: "Alle Fragen" },
  { id: "unterkunft", label: "Zimmer & Verpflegung" },
  { id: "anreise", label: "Anreise & Parken" },
  { id: "orga", label: "Dienstkleidung & Ablauf" },
  { id: "allgemein", label: "WLAN & Freizeit" },
] as const;

export const faqList: FaqItem[] = [
  {
    id: "wlan",
    category: "allgemein",
    question: "Gibt es kostenloses WLAN auf dem gesamten Campus?",
    answer: "Ja! Im JFAZ-Gebäude und den Unterkünften steht kostenfreies Gäste-WLAN zur Verfügung. Die Zugangsdaten hängen gut sichtbar an den Infotafeln im Foyer und in den Zimmern aus.",
    keywords: ["wlan", "wifi", "internet", "passwort", "netzwerk"],
  },
  {
    id: "bettwaesche",
    category: "unterkunft",
    question: "Muss ich eigene Bettwäsche und Handtücher mitbringen?",
    answer: "Nein, frische Bettwäsche ist auf den Zimmern vorhanden und bezogen. Du musst lediglich deine persönlichen Handtücher, Duschtuch und deine Kulturtasche mit Hygieneartikeln mitbringen.",
    keywords: ["bettwäsche", "handtücher", "duschen", "kissen", "decken", "zimmer"],
  },
  {
    id: "dienstkleidung",
    category: "orga",
    question: "Welche Dienstkleidung bzw. Kleidung wird benötigt?",
    answer: "Für den Unterricht reicht saubere, gepflegte Alltagskleidung. Sofern in deiner Einladung nicht ausdrücklich die Feuerwehr-Dienstkleidung (z. B. für offizielle Prüfungen, Praxistage oder Seminare) gefordert ist, ist bequeme Freizeitkleidung absolut ausreichend.",
    keywords: ["dienstkleidung", "uniform", "klamotten", "kleiderordnung", "anzug"],
  },
  {
    id: "essen-allergien",
    category: "unterkunft",
    question: "Wie läuft die Verpflegung bei Allergien, Unverträglichkeiten oder vegetarischer/veganer Ernährung?",
    answer: "Die Mensa bietet zu allen Mahlzeiten vegetarische Alternativen. Wenn du Allergien, Unverträglichkeiten oder spezielle Speisevorschriften hast, gib dies bitte vorab bei deiner Lehrgangsanmeldung an oder sprich das freundliche Küchenteam am ersten Tag direkt an.",
    keywords: ["essen", "vegetarisch", "vegan", "allergie", "laktose", "gluten", "küche", "mensa", "frühstück", "mittagessen", "abendessen"],
  },
  {
    id: "parken",
    category: "anreise",
    question: "Wo kann ich mein Auto oder den Feuerwehr-MTW parken?",
    answer: "Auf dem Gelände stehen ausreichend kostenfreie Parkplätze für Lehrgangsteilnehmer zur Verfügung. Die Zufahrt erfolgt über den Lintzingsweg 1a in Marburg-Cappel.",
    keywords: ["parken", "parkplatz", "auto", "pkw", "mtw", "schranke", "anfahrt"],
  },
  {
    id: "spaetanreise",
    category: "anreise",
    question: "Was mache ich, wenn ich am Sonntagabend nach 20:00 Uhr anreise?",
    answer: "Kein Problem! Der Pförtnerdienst am Haupteingang ist rund um die Uhr bzw. zu den offiziellen Anreisezeiten besetzt. Bei sehr später Ankunft erhältst du deinen Schlüssel direkt an der Pforte.",
    keywords: ["spätanreise", "sonntag", "schlüssel", "pforte", "spät", "uhrzeit"],
  },
  {
    id: "freizeit",
    category: "allgemein",
    question: "Welche Freizeitmöglichkeiten gibt es abends auf dem Gelände?",
    answer: "Es gibt gemütliche Aufenthaltsräume, Tischkicker, Tischtennisplatten und TV-Räume. Marburgs historische Altstadt ist zudem in ca. 15 Minuten per Stadtbus oder Auto erreichbar.",
    keywords: ["freizeit", "abend", "bier", "kicker", "tischtennis", "altstadt", "kneipe"],
  },
  {
    id: "kosten",
    category: "orga",
    question: "Wer übernimmt die Kosten für Unterkunft und Verpflegung?",
    answer: "Für Teilnehmer von Lehrgängen der Hessischen Jugendfeuerwehr und des Landesfeuerwehrverbandes Hessen sind Unterkunft und Verpflegung im Rahmen der Lehrgangsgebühren bzw. Landesförderung vollständig abgedeckt.",
    keywords: ["kosten", "gebühren", "erstattung", "bezahlung", "fahrtkosten"],
  },
];
