export interface CampusBuilding {
  id: string;
  name: string;
  tagline: string;
  category: "verwaltung" | "unterricht" | "wohnen" | "verpflegung" | "freizeit" | "parken";
  badgeColor: "red" | "blue" | "green" | "amber" | "purple" | "slate";
  iconName: "Shield" | "BookOpen" | "Bed" | "Utensils" | "Smile" | "Car" | "Tent";
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  entrance: string;
  floors: {
    level: string;
    description: string;
  }[];
  roomNumbers?: string;
  accessibility: {
    hasElevator: boolean;
    hasRamp: boolean;
    accessibleWc: boolean;
    notes: string;
  };
  accessHours: string;
  tips: string;
}

export const campusBuildings: CampusBuilding[] = [
  {
    id: "hauptgebaeude",
    name: "Hauptgebäude & Pforte",
    tagline: "Erstanlaufstelle, Schlüsselabholung & Information",
    category: "verwaltung",
    badgeColor: "red",
    iconName: "Shield",
    coordinates: { x: 380, y: 180, width: 220, height: 140 },
    entrance: "Haupteingang direkt am Vorplatz (Cappeler Str. / Lintzingsweg Zufahrt).",
    floors: [
      { level: "EG", description: "Zentrale Pforte / Rezeption, digitales Foyer-Infosystem, Postfächer, Verwaltungsbüros" },
      { level: "1. OG", description: "Lehrgangsleitung, Dozentenzimmer, Besprechungsräume" },
    ],
    accessibility: {
      hasElevator: true,
      hasRamp: true,
      accessibleWc: true,
      notes: "Ebenerdiger Haupteingang mit automatischer Schiebetür und Aufzug zu allen Ebenen.",
    },
    accessHours: "Pforte zu den Anreisezeiten durchgehend besetzt (sonntags bis 22:00 Uhr, danach Notfall-Schlüsselsafe).",
    tips: "Hier holst du als Erstes deine Zimmerkarte ab und siehst auf dem Monitor deinen zugewiesenen Lehrsaal.",
  },
  {
    id: "lehrsaaltrakt",
    name: "Lehrsaaltrakt & Seminarräume",
    tagline: "Moderne Unterrichts- und Gruppenarbeitsräume",
    category: "unterricht",
    badgeColor: "blue",
    iconName: "BookOpen",
    coordinates: { x: 630, y: 150, width: 260, height: 160 },
    entrance: "Direkter Übergang vom Foyer des Hauptgebäudes oder über den Innenhof.",
    floors: [
      { level: "EG", description: "Großer Plenarsaal 'Marburg' (bis 120 Personen), Kaffeebar & Wasserspender" },
      { level: "1. OG", description: "Seminarräume 'Lahn', 'Elisabeth', 'Kassel' & 4 Gruppenarbeitsräume" },
      { level: "2. OG", description: "Medienwerkstatt & PC-Schulungsraum" },
    ],
    accessibility: {
      hasElevator: true,
      hasRamp: true,
      accessibleWc: true,
      notes: "Vollständig barrierefrei mit Aufzug und induktiver Höranlage im Plenarsaal.",
    },
    accessHours: "Während der Unterrichtszeiten (07:30 – 21:00 Uhr) geöffnet.",
    tips: "Vor den Seminarräumen stehen kostenlose Wasserspender bereit – nimm gerne eine wiederverwendbare Trinkflasche mit!",
  },
  {
    id: "gaestehaus",
    name: "Gästehaus & Unterkünfte",
    tagline: "Zimmer 101–230, Wohlfühlbereich & Ruhezonen",
    category: "wohnen",
    badgeColor: "green",
    iconName: "Bed",
    coordinates: { x: 120, y: 160, width: 230, height: 210 },
    entrance: "Zugang über den Innenhof oder wettergeschützten Verbindungsgang im EG.",
    floors: [
      { level: "EG", description: "Zimmer 101–115 (u. a. barrierefreie Einzelzimmer), Teeküche, Waschraum" },
      { level: "1. OG", description: "Zimmer 116–140 (Einzel- & Zweibettzimmer), Aufenthaltsbereich mit TV" },
      { level: "2. OG", description: "Zimmer 201–230 (Zweibettzimmer mit eigenem Bad/Dusche)" },
    ],
    roomNumbers: "Zimmer 101–140 (EG/1. OG) und 201–230 (2. OG)",
    accessibility: {
      hasElevator: true,
      hasRamp: true,
      accessibleWc: true,
      notes: "Barrierefreie Zimmer im EG mit rollstuhlgerechter Dusche und Haltegriffen.",
    },
    accessHours: "24h Zugang mit deiner persönlichen Zimmerkarte (Keycard).",
    tips: "Bettwäsche ist bezogen! Bitte vergiss dein Duschhandtuch und persönliche Pflegeartikel nicht.",
  },
  {
    id: "mensa",
    name: "Mensa & Speisesaal",
    tagline: "Frühstück, warmes Mittagessen & Abendbrot",
    category: "verpflegung",
    badgeColor: "amber",
    iconName: "Utensils",
    coordinates: { x: 420, y: 360, width: 240, height: 130 },
    entrance: "Haupteingang über die Terrasse oder über den zentralen Campusflur.",
    floors: [
      { level: "EG", description: "Speisesaal, Speisenausgabe, Salatbar, Getränkestation und Außenterrasse" },
    ],
    accessibility: {
      hasElevator: false,
      hasRamp: true,
      accessibleWc: true,
      notes: "Komplett ebenerdig zugänglich mit breiten Gängen an der Essensausgabe.",
    },
    accessHours: "Frühstück 07:00–08:00 | Mittagessen 12:00–13:00 | Abendessen 18:00–19:00 Uhr.",
    tips: "Vegetarische Alternativen gibt es zu jeder Mahlzeit ohne Voranmeldung.",
  },
  {
    id: "freizeit",
    name: "Bistro & TV-Lounge",
    tagline: "Kameradschaft, Kicker, Billard & TV-Abende",
    category: "freizeit",
    badgeColor: "purple",
    iconName: "Smile",
    coordinates: { x: 690, y: 340, width: 200, height: 130 },
    entrance: "Im Untergeschoss/EG des Gästehaustraktes mit Ausgang zum Grillplatz.",
    floors: [
      { level: "EG", description: "Bistro, Tischkicker, Billardtisch, TV-Ecke, Snack- und Kaltgetränkeautomaten" },
    ],
    accessibility: {
      hasElevator: true,
      hasRamp: true,
      accessibleWc: true,
      notes: "Über den Aufzug im Gästehaus schwellenlos erreichbar.",
    },
    accessHours: "Geöffnet bis 23:00 Uhr (ab 22:00 Uhr Zimmerlautstärke / Nachtruhe beachten).",
    tips: "Perfekt, um nach dem Unterricht mit Lehrgangskollegen aus ganz Hessen ins Gespräch zu kommen.",
  },
  {
    id: "parkplatz",
    name: "Parkplätze P1 & P2 (Schranke)",
    tagline: "Kostenfreie Stellplätze für PKW & Feuerwehr-MTW",
    category: "parken",
    badgeColor: "slate",
    iconName: "Car",
    coordinates: { x: 380, y: 30, width: 340, height: 90 },
    entrance: "Zufahrt über Lintzingsweg 1a (Schrankenanlage öffnet tagsüber automatisch).",
    floors: [
      { level: "P1", description: "Hauptparkplatz für Teilnehmer-PKW direkt vor dem Hauptgebäude" },
      { level: "P2", description: "Ausgewiesene Stellflächen für Feuerwehr-Mannschaftstransportwagen (MTW) und E-Ladesäulen" },
    ],
    accessibility: {
      hasElevator: false,
      hasRamp: true,
      accessibleWc: false,
      notes: "Ebenerdige Asphaltflächen mit markierten Behindertenparkplätzen direkt vor der Pforte.",
    },
    accessHours: "Rund um die Uhr befahrbar.",
    tips: "Bitte parke platzsparend, damit auch größere Feuerwehrfahrzeuge problemlos rangieren können.",
  },
  {
    id: "zeltplatz",
    name: "Zeltplatzgelände & Wiese",
    tagline: "Großveranstaltungen, Zeltlager & Lagerfeuerplatz",
    category: "freizeit",
    badgeColor: "green",
    iconName: "Tent",
    coordinates: { x: 920, y: 170, width: 170, height: 260 },
    entrance: "Hinter dem Lehrsaaltrakt über den Verbindungsweg.",
    floors: [
      { level: "Gelände", description: "Große Zeltwiese, feste Sanitärstation, überdachte Grillpavillons, Sportfeld" },
    ],
    accessibility: {
      hasElevator: false,
      hasRamp: true,
      accessibleWc: true,
      notes: "Feste Wege vorhanden, Rasenfläche bei Trockenheit befahrbar.",
    },
    accessHours: "Für Zeltlagergruppen nach Absprache nutzbar.",
    tips: "Im Sommer Treffpunkt für gemütliche Abende am Lagerfeuer.",
  },
];
