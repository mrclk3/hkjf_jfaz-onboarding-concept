export interface NavSubItem {
  title: string;
  href: string;
  isExternal?: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
  dropdown?: NavSubItem[];
}

export const navigationItems: NavItem[] = [
  {
    title: "Start",
    href: "/",
  },
  {
    title: "Über uns",
    href: "https://www.hkjf.de/ueber-uns/",
    hasDropdown: true,
    dropdown: [
      { title: "Über uns", href: "https://www.hkjf.de/ueber-uns/", isExternal: true },
      { title: "Team & Landesjugendfeuerwehrleitung", href: "https://www.hkjf.de/ueber-uns/team/", isExternal: true },
      { title: "Jugendforum", href: "https://www.hkjf.de/ueber-uns/jugendforum/", isExternal: true },
      { title: "Gremien & Vorstand", href: "https://www.hkjf.de/ueber-uns/vorstand/", isExternal: true },
      { title: "Fachbereiche", href: "https://www.hkjf.de/ueber-uns/fachbereiche/", isExternal: true },
      { title: "Satzung & Richtlinien", href: "https://www.hkjf.de/ueber-uns/satzung-richtlinien/", isExternal: true },
    ],
  },
  {
    title: "Ausbildungszentrum",
    href: "#campus",
    hasDropdown: true,
    dropdown: [
      { title: "Das KJFAZ", href: "#campus" },
      { title: "🎓 Lehrgangsplan & Dresscode", href: "#lehrgangs-finder" },
      { title: "Lehrgangsbeschreibungen (HKJF)", href: "https://www.hkjf.de/ausbildungszentrum/lehrgangsbeschreibungen", isExternal: true },
      { title: "Veranstaltungsplan (Florix)", href: "https://www.hkjf.de/ausbildungszentrum/veranstaltungsplan", isExternal: true },
      { title: "Last Minute Plätze", href: "https://www.hkjf.de/ausbildungszentrum/last-minute-plaetze", isExternal: true },
      { title: "Anreise, Parken & Check-in", href: "#anreise" },
      { title: "Cappel-Guide (Nahversorgung)", href: "#umgebung" },
      { title: "Interaktive Packliste", href: "#packliste" },
      { title: "FAQ & Notfall-Hilfe", href: "#faq" },
      { title: "Startklar-Quiz", href: "#quiz" },
    ],
  },
  {
    title: "Unsere Arbeit",
    href: "https://www.hkjf.de/unsere-arbeit/",
    hasDropdown: true,
    dropdown: [
      { title: "Kinderfeuerwehr", href: "https://www.hkjf.de/kinderfeuerwehr/", isExternal: true },
      { title: "Jugendfeuerwehr", href: "https://www.hkjf.de/jugendfeuerwehr/", isExternal: true },
      { title: "Tatze Hessen", href: "https://www.hkjf.de/kinderfeuerwehr/tatze-hessen/", isExternal: true },
      { title: "Wettbewerbe & Auszeichnungen", href: "https://www.hkjf.de/jugendfeuerwehr/wettbewerbe/", isExternal: true },
    ],
  },
  {
    title: "Schwerpunkte",
    href: "https://www.hkjf.de/schwerpunkte/",
    hasDropdown: true,
    dropdown: [
      { title: "Vielfalt & Integration", href: "https://www.hkjf.de/schwerpunkte/vielfalt/", isExternal: true },
      { title: "Kindeswohl & Prävention", href: "https://www.hkjf.de/schwerpunkte/kindeswohl/", isExternal: true },
      { title: "Demokratiebildung", href: "https://www.hkjf.de/schwerpunkte/demokratie/", isExternal: true },
    ],
  },
  {
    title: "Zeltplatzgelände",
    href: "https://www.hkjf.de/zeltplatzgelaende/",
  },
  {
    title: "Service",
    href: "https://www.hkjf.de/service/",
    hasDropdown: true,
    dropdown: [
      { title: "Downloads & Formulare", href: "https://www.hkjf.de/service/downloads/", isExternal: true },
      { title: "Muster-Dienstkleidung", href: "https://www.hkjf.de/service/dienstkleidung/", isExternal: true },
      { title: "Förderverein", href: "https://www.hkjf.de/service/foerderverein/", isExternal: true },
      { title: "Kontakt zur Bildungsstätte", href: "#footer" },
    ],
  },
];
