// Schematic overview only – positions are illustrative, not to scale.
// Facts are taken from hlfs.hessen.de/standort-marburg and hkjf.de (as of 10/2026).
// Anything not published there is deliberately left out; the official site plan is OFFICIAL_SITE_PLAN_URL.

export const OFFICIAL_SITE_PLAN_URL =
  "https://hlfs.hessen.de/sites/hlfs.hessen.de/files/2024-04/hlfs_marburg_lageplan_2024_neueeinfahrt.pdf";

export const HLFS_MARBURG_INFO_URL = "https://hlfs.hessen.de/standort-marburg";

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
  details: string[];
  accessHours: string;
  tips: string;
}

export const campusBuildings: CampusBuilding[] = [
  {
    id: "verwaltung",
    name: "Verwaltung & Anmeldung",
    tagline: "Erste Anlaufstelle am Anreisetag",
    category: "verwaltung",
    badgeColor: "red",
    iconName: "Shield",
    coordinates: { x: 380, y: 180, width: 220, height: 140 },
    entrance: "Den Weg zur Anmeldung findest du vor Ort ausgeschildert bzw. im offiziellen Lageplan.",
    details: [
      "Anmeldung am Anreisetag (unter der Woche) in der Regel 08:30 – 09:15 Uhr, bei Wochenendlehrgängen freitags 17:00 – 17:45 Uhr.",
      "Hier erhältst du deinen Transponder für Zimmer, Seiteneingänge und Zufahrtstor.",
    ],
    accessHours: "Außenstelle erreichbar Mo 07:00 – 16:30 Uhr, Di – Fr 07:00 – 16:15 Uhr (06421 389 0311). Außerhalb dieser Zeiten wird zum Hausmeister weitergeleitet.",
    tips: "Abweichende Zeiten stehen immer in deiner Einberufung – die geht vor.",
  },
  {
    id: "lehrsaele",
    name: "Lehrsäle & Gruppenräume",
    tagline: "Unterricht und Gruppenarbeit",
    category: "unterricht",
    badgeColor: "blue",
    iconName: "BookOpen",
    coordinates: { x: 630, y: 150, width: 260, height: 160 },
    entrance: "Welchen Raum dein Lehrgang nutzt, erfährst du bei der Anmeldung bzw. von der Lehrgangsleitung.",
    details: [
      "Unterrichtsbeginn am Anreisetag in der Regel 09:40 Uhr.",
      "Unterricht endet täglich in der Regel um 15:55 Uhr, am Abreisetag spätestens 14:30 Uhr.",
    ],
    accessHours: "Während der Unterrichtszeiten deines Lehrgangs.",
    tips: "Eine eigene Trinkflasche und Schreibzeug sind im Unterricht praktisch.",
  },
  {
    id: "unterkunft",
    name: "Unterkunft",
    tagline: "Einzelzimmer mit eigener Nasszelle",
    category: "wohnen",
    badgeColor: "green",
    iconName: "Bed",
    coordinates: { x: 120, y: 160, width: 230, height: 210 },
    entrance: "Zugang mit deinem Transponder (öffnet Zimmer und Seiteneingänge).",
    details: [
      "Einzelzimmer mit integrierter Nasszelle, Bett, Kleiderschrank, Arbeitstisch und Stühlen.",
      "Bettwäsche wird gestellt. Am Abreisetag bitte das Bett abziehen.",
    ],
    accessHours: "Transponder am Abreisetag bis 14:00 Uhr zurückgeben.",
    tips: "Handtücher sind nicht als gestellt angegeben – bring sicherheitshalber eigene mit.",
  },
  {
    id: "speisesaal",
    name: "Speisesaal",
    tagline: "Frühstück, Mittag- und Abendessen",
    category: "verpflegung",
    badgeColor: "amber",
    iconName: "Utensils",
    coordinates: { x: 420, y: 360, width: 240, height: 130 },
    entrance: "Der Speisesaal ist vor Ort ausgeschildert.",
    details: [
      "Frühstück 06:40 – 07:30 Uhr (montags 09:00 – 09:30 Uhr)",
      "Kaffeepause 09:20 – 09:40 Uhr",
      "Mittagessen 12:15 – 12:50 Uhr",
      "Abendessen 16:15 – 17:45 Uhr (freitags 17:00 – 17:45 Uhr)",
    ],
    accessHours: "Zeiten laut HLFS – maßgeblich ist der Plan vor Ort bzw. deine Einberufung.",
    tips: "Wünsche wie vegetarische Kost am Anmeldungstag in der Küche melden.",
  },
  {
    id: "parkplatz",
    name: "Zufahrt & Parken",
    tagline: "Einfahrt aktuell über die Umgehungsstraße",
    category: "parken",
    badgeColor: "slate",
    iconName: "Car",
    coordinates: { x: 380, y: 30, width: 340, height: 90 },
    entrance: "Wegen Bauarbeiten erfolgt die Einfahrt aufs Gelände über die Umgehungsstraße – bitte der Beschilderung folgen.",
    details: [
      "Das Zufahrtstor öffnet mit deinem Transponder.",
      "Wo du parken kannst, zeigt der offizielle Lageplan bzw. die Beschilderung vor Ort.",
    ],
    accessHours: "Plane wegen der geänderten Zufahrt etwas mehr Zeit ein.",
    tips: "Den aktuellen Lageplan mit der neuen Einfahrt findest du als PDF auf hlfs.hessen.de.",
  },
  {
    id: "zeltplatz",
    name: "Zeltplatzgelände",
    tagline: "Gelände der HKJF für Zeltlager",
    category: "freizeit",
    badgeColor: "green",
    iconName: "Tent",
    coordinates: { x: 920, y: 170, width: 170, height: 260 },
    entrance: "Infos zum Gelände und zur Buchung gibt es auf hkjf.de unter „Zeltplatzgelände“.",
    details: [],
    accessHours: "Nutzung nach Absprache mit der HKJF.",
    tips: "Für Lehrgangsteilnehmende in der Regel nicht relevant.",
  },
];
