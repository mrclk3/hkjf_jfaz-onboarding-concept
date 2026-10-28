import React from "react";
import { Clock, Coffee, BookOpen, Utensils, Moon, Sun, CheckCircle2, Laptop, Monitor, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScheduleOverviewProps {
  isOnline?: boolean;
  scheduleNote?: string;
}

export function ScheduleOverview({ isOnline = false, scheduleNote }: ScheduleOverviewProps) {
  // Times as published by the HLFS for Marburg-Cappel (Mon–Thu); the invitation takes precedence
  const physicalScheduleItems = [
    {
      time: "06:40 – 07:30 Uhr",
      title: "Frühstück",
      desc: "Im Speisesaal. Montags gibt es Frühstück von 09:00 – 09:30 Uhr.",
      icon: Coffee,
      color: "text-amber-600 bg-amber-50",
    },
    {
      time: "07:40 – 09:20 Uhr",
      title: "Unterrichtsblock 1",
      desc: "Danach Kaffeepause von 09:20 – 09:40 Uhr. Am Anreisetag stattdessen Anmeldung (08:30 – 09:15 Uhr).",
      icon: BookOpen,
      color: "text-hkjf-navy bg-blue-50",
    },
    {
      time: "09:40 – 12:15 Uhr",
      title: "Unterrichtsblock 2",
      desc: "Am Anreisetag beginnt hier dein Lehrgang.",
      icon: BookOpen,
      color: "text-hkjf-navy bg-blue-50",
    },
    {
      time: "12:15 – 12:50 Uhr",
      title: "Mittagessen",
      desc: "Im Speisesaal. Vegetarische Kost oder andere Wünsche am Anmeldungstag melden.",
      icon: Utensils,
      color: "text-hkjf-red bg-red-50",
    },
    {
      time: "13:10 – 15:55 Uhr",
      title: "Unterrichtsblock 3",
      desc: "Am Abreisetag endet der Unterricht spätestens um 14:30 Uhr.",
      icon: Sun,
      color: "text-orange-600 bg-orange-50",
    },
    {
      time: "16:15 – 17:45 Uhr",
      title: "Abendessen & Feierabend",
      desc: "Freitags 17:00 – 17:45 Uhr. Danach hast du frei.",
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
      desc: "Input der Lehrgangsleitung, Präsentationen und Klärung von Grundlagen per Bildschirmfreigabe.",
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
      desc: "Vorstellung der Gruppenarbeiten im Plenum, offene Fragerunde und Infos zur Teilnahmebescheinigung.",
      icon: Moon,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  const items = isOnline ? onlineScheduleItems : physicalScheduleItems;

  return (
    <section id="ablauf" className="py-16 sm:py-20 bg-hkjf-cream border-b border-border/70">
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
                So sieht ein regulärer Lehrgangstag in Marburg-Cappel laut HLFS aus. Wochenendlehrgänge und abweichende Zeiten stehen in deiner Einberufung.
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
                : "Sei pünktlich zu den Mahlzeiten und Unterrichtsblöcken. Die Lehrgangsleitung erklärt dir zum Start Ablauf, Ziele und eventuelle Raumwechsel."}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
