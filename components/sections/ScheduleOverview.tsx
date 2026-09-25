import React from "react";
import { Clock, Coffee, BookOpen, Utensils, Moon, Sun, CheckCircle2, Laptop, Monitor, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScheduleOverviewProps {
  isOnline?: boolean;
  scheduleNote?: string;
}

export function ScheduleOverview({ isOnline = false, scheduleNote }: ScheduleOverviewProps) {
  const physicalScheduleItems = [
    {
      time: "07:00 – 08:00 Uhr",
      title: "Gemeinsames Frühstück",
      desc: "Großes Frühstücksbuffet in der Mensa. Pünktlich stärken vor Unterrichtsbeginn.",
      icon: Coffee,
      color: "text-amber-600 bg-amber-50",
    },
    {
      time: "08:15 – 12:00 Uhr",
      title: "Unterrichtsblock 1 (Vormittag)",
      desc: "Theorie, Gruppenarbeiten und Fallbeispiele in deinem Lehrsaal (inkl. Kaffeepause).",
      icon: BookOpen,
      color: "text-hkjf-navy bg-blue-50",
    },
    {
      time: "12:00 – 13:00 Uhr",
      title: "Mittagspause & Warmes Essen",
      desc: "Frisches 3-Gänge-Mittagessen mit Salatbar und Dessert in der JFAZ-Mensa.",
      icon: Utensils,
      color: "text-hkjf-red bg-red-50",
    },
    {
      time: "13:00 – 17:30 Uhr",
      title: "Unterrichtsblock 2 (Nachmittag)",
      desc: "Praxisübungen, Workshops, Präsentationen oder Lehrproben.",
      icon: Sun,
      color: "text-orange-600 bg-orange-50",
    },
    {
      time: "18:00 – 19:00 Uhr",
      title: "Abendessen",
      desc: "Klassische Abendbrot-Zeit in der Mensa mit warmen Extras.",
      icon: Utensils,
      color: "text-slate-700 bg-slate-100",
    },
    {
      time: "ab 19:00 Uhr",
      title: "Freizeit & Kameradschaft",
      desc: "Gemütlicher Austausch im Bistro, Kickerturniere, Spaziergang oder Ausflug nach Marburg.",
      icon: Moon,
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  const onlineScheduleItems = [
    {
      time: "15 Min. vor Beginn",
      title: "Virtueller Einlass & Soundcheck",
      desc: "Der Warteraum öffnet. Prüfe Bild & Ton, richte dein Headset aus und stelle Kaffee bereit.",
      icon: Laptop,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      time: "Erster Block (ca. 90 Min.)",
      title: "Theorie & Fachinput",
      desc: "Impulsvortrag der Dozenten, Präsentationen und Klärung von Grundlagen via Screensharing.",
      icon: BookOpen,
      color: "text-hkjf-navy bg-blue-50",
    },
    {
      time: "10–15 Minuten",
      title: "☕ Bildschirmpause & Lüften",
      desc: "Regelmäßige Bildschirmpause: Aufstehen, Augen entspannen, durchlüften und Glas Wasser auffüllen.",
      icon: Coffee,
      color: "text-amber-600 bg-amber-50",
    },
    {
      time: "Zweiter Block (ca. 75 Min.)",
      title: "Breakout-Rooms & Praxis",
      desc: "Interaktive Gruppenarbeiten in digitalen Kleingruppenräumen für Fallbeispiele und Übungen.",
      icon: Sun,
      color: "text-orange-600 bg-orange-50",
    },
    {
      time: "ca. 60 Minuten",
      title: "🥗 Mittagspause (bei Tageskursen)",
      desc: "Zeit für ein warmes Mittagessen am heimischen Herd und Bewegung an der frischen Luft.",
      icon: Utensils,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      time: "Abschlussblock",
      title: "Ergebnisse & Seminarabschluss",
      desc: "Vorstellung der Gruppenarbeiten im Plenum, offene Fragerunde und Infos zum Zertifikaterhalt.",
      icon: Moon,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  const items = isOnline ? onlineScheduleItems : physicalScheduleItems;

  return (
    <section id="ablauf" className="py-16 sm:py-20 bg-hkjf-cream border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {isOnline ? (
            <>
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200 font-extrabold flex items-center gap-1.5 mx-auto w-fit">
                <Laptop className="w-3.5 h-3.5" />
                <span>Online-Ablauf &amp; Bildschirmpausen</span>
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Typischer Ablauf eines Online-Seminars
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Lernen am Bildschirm erfordert Rhythmus: Feste Bildschirmpausen, abwechslungsreiche Kleingruppenphasen und Verpflegung in der eigenen Küche.
              </p>
              {scheduleNote && (
                <div className="mt-4 inline-block bg-white border border-indigo-200 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-900 shadow-2xs">
                  ⏰ Zeitformat dieses Lehrgangs: {scheduleNote}
                </div>
              )}
            </>
          ) : (
            <>
              <Badge variant="default" className="mb-3">
                Tagesablauf &amp; Zeiten
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Typischer Lehrgangstag im JFAZ
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Damit du dich sofort orientieren kannst: So sieht ein regulärer Seminartag aus.
              </p>
            </>
          )}
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="border-slate-200/90 hover:border-hkjf-navy/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className={`p-2.5 rounded-xl ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold bg-white border border-slate-200 text-hkjf-navy px-2.5 py-1 rounded-full shadow-2xs">
                      {item.time}
                    </span>
                  </div>
                  <CardTitle className="text-base sm:text-lg text-hkjf-navy">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  {item.desc}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Golden Rule Note */}
        <div className="mt-10 bg-white rounded-2xl p-6 border border-border shadow-sm flex items-start gap-3.5">
          <CheckCircle2 className={`w-6 h-6 shrink-0 mt-0.5 ${isOnline ? "text-indigo-600" : "text-emerald-600"}`} />
          <div className="text-xs sm:text-sm text-slate-700 space-y-1">
            <h4 className="font-bold text-hkjf-navy">
              {isOnline ? "Die goldene Online-Regel:" : "Die goldene JFAZ-Regel:"}
            </h4>
            <p>
              {isOnline
                ? "Regelmäßige Bildschirmpausen sind fest eingeplant, damit die Konzentration hoch bleibt. Nutze die Pausen, um kurz aufzustehen und den Blick in die Ferne schweifen zu lassen!"
                : "Pünktlichkeit zu den Mahlzeiten und Unterrichtszeiten wird von allen sehr geschätzt. Die Lehrgangsleitung gibt dir am ersten Vormittag alle seminarbezogenen Feinheiten und eventuelle Raumwechsel bekannt!"}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
