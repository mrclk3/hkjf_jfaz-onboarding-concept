export interface FaqItem {
  id: string;
  category: "allgemein" | "unterkunft" | "anreise" | "orga" | "online";
  question: string;
  answer: string;
  keywords: string[];
}

export const faqCategories = [
  { id: "all", label: "Alle Fragen" },
  { id: "online", label: "💻 Online-Seminare & Technik" },
  { id: "unterkunft", label: "Zimmer & Verpflegung" },
  { id: "anreise", label: "Anreise & Parken" },
  { id: "orga", label: "Dienstkleidung & Ablauf" },
  { id: "allgemein", label: "WLAN & Abends" },
] as const;

export const faqList: FaqItem[] = [
  {
    id: "wlan",
    category: "allgemein",
    question: "Gibt es WLAN auf dem Gelände?",
    answer: "Ob und wie du vor Ort ins WLAN kommst, erfährst du bei der Anmeldung bzw. in der Informationsmappe der HLFS. Plane für Wichtiges sicherheitshalber mobile Daten ein.",
    keywords: ["wlan", "wifi", "internet", "passwort", "netzwerk"],
  },
  {
    id: "bettwaesche",
    category: "unterkunft",
    question: "Muss ich eigene Bettwäsche und Handtücher mitbringen?",
    answer: "Bettwäsche wird von der HLFS gestellt – am Abreisetag ziehst du dein Bett selbst ab. Handtücher, Duschtuch und Kulturtasche bringst du mit. Falls du doch etwas vergisst, hilft dir die Geschäftsstelle der HKJF vor Ort.",
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
    answer: "Wünsche wie vegetarische Kost meldest du am Anmeldungstag in der Küche. Allergien und Unverträglichkeiten gibst du am besten zusätzlich schon bei der Lehrgangsanmeldung an.",
    keywords: ["essen", "vegetarisch", "vegan", "allergie", "laktose", "gluten", "küche", "mensa", "frühstück", "mittagessen", "abendessen"],
  },
  {
    id: "parken",
    category: "anreise",
    question: "Wo kann ich mein Auto oder den Feuerwehr-MTW parken?",
    answer: "Wegen Bauarbeiten erfolgt die Einfahrt aufs Gelände aktuell über die Umgehungsstraße. Wo du parken kannst, zeigen die Beschilderung vor Ort und der Lageplan der HLFS.",
    keywords: ["parken", "parkplatz", "auto", "pkw", "mtw", "schranke", "anfahrt"],
  },
  {
    id: "spaetanreise",
    category: "anreise",
    question: "Was mache ich, wenn ich später ankomme?",
    answer: "Gib der HLFS-Außenstelle vorher Bescheid: 06421 389 0311 (Mo 07:00 – 16:30, Di – Fr 07:00 – 16:15 Uhr; außerhalb dieser Zeiten wird zum Hausmeister weitergeleitet). Ob eine Anreise am Vorabend möglich ist, steht in deiner Einberufung.",
    keywords: ["spätanreise", "sonntag", "schlüssel", "pforte", "spät", "uhrzeit"],
  },
  {
    id: "freizeit",
    category: "allgemein",
    question: "Was kann ich abends machen?",
    answer: "Nach dem Abendessen hast du frei – ideal, um die anderen Teilnehmenden kennenzulernen. Welche Freizeitangebote es auf dem Gelände gibt, steht in der Informationsmappe der HLFS. Die Marburger Oberstadt erreichst du mit Bus oder Auto.",
    keywords: ["freizeit", "abend", "bier", "kicker", "tischtennis", "altstadt", "kneipe"],
  },
  {
    id: "kosten",
    category: "orga",
    question: "Wer übernimmt die Kosten für Unterkunft und Verpflegung?",
    answer: "Welche Kosten auf dich bzw. deine Feuerwehr zukommen, steht in der Lehrgangsausschreibung und in deiner Einberufung. Bei Fragen hilft dir die Geschäftsstelle der HKJF (06421 / 968 789 0, info@hkjf.de).",
    keywords: ["kosten", "gebühren", "erstattung", "bezahlung", "fahrtkosten"],
  },
  {
    id: "online-kamera",
    category: "online",
    question: "Muss meine Kamera während des Online-Seminars eingeschaltet sein?",
    answer: "Das legt die Lehrgangsleitung fest – die Vorgaben stehen in deiner Einladung. Für Gruppenarbeiten ist eine eingeschaltete Kamera auf jeden Fall hilfreich.",
    keywords: ["online", "kamera", "webcam", "video", "pflicht", "anwesenheit"],
  },
  {
    id: "online-link",
    category: "online",
    question: "Wann und wie erhalte ich meinen Zugangslink zum Online-Seminar?",
    answer: "Den Einwahllink bekommst du vor Beginn per E-Mail an die Adresse, die du bei der Anmeldung angegeben hast. Kontrolliere auch deinen Spam-Ordner. Fehlt der Link kurz vor dem Termin noch, melde dich bei der HKJF.",
    keywords: ["online", "link", "zugang", "einladung", "teams", "bigbluebutton", "einwahl"],
  },
  {
    id: "online-software",
    category: "online",
    question: "Muss ich spezielle Software installieren?",
    answer: "Meist nicht – Microsoft Teams und BigBlueButton laufen auch im aktuellen Browser (z. B. Chrome, Edge oder Firefox). Ein Headset und eine Webcam sind sehr empfehlenswert.",
    keywords: ["online", "software", "download", "teams", "browser", "installation"],
  },
  {
    id: "online-zertifikat",
    category: "online",
    question: "Erhalte ich auch für Online-Seminare eine Teilnahmebescheinigung?",
    answer: "Wie und wann du deine Teilnahmebescheinigung erhältst, erklärt dir die Lehrgangsleitung. Voraussetzung ist in der Regel die vollständige Teilnahme.",
    keywords: ["online", "zertifikat", "bescheinigung", "nachweis", "florix", "juleica"],
  },
  {
    id: "online-abbruch",
    category: "online",
    question: "Was mache ich, wenn meine Internetverbindung abbricht oder die Technik streikt?",
    answer: "Lade zuerst den Browser-Tab neu. Klappt es nicht, starte Router oder Rechner neu oder nutze den Hotspot deines Smartphones. Kommst du gar nicht mehr rein, melde dich bei der HKJF (06421 / 968 789 0).",
    keywords: ["online", "internet", "abbruch", "problem", "hilfe", "support", "notfall"],
  },
  {
    id: "online-pausen",
    category: "online",
    question: "Gibt es während des Online-Unterrichts regelmäßige Bildschirmpausen?",
    answer: "Ja, Pausen sind eingeplant. Wann genau, gibt die Lehrgangsleitung zu Beginn bekannt.",
    keywords: ["online", "pausen", "mittagessen", "unterricht", "zeiten", "bildschirm"],
  },
];
