import React from "react";
import { Clock, Coffee, BookOpen, Utensils, Moon, Sun, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ScheduleOverview() {
  const scheduleItems = [
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
      desc: "Frisches 3-Gänge-Mittagessen mit Salatbar und Dessert.",
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

  return (
    <section id="ablauf" className="py-16 sm:py-20 bg-hkjf-cream border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-3">
            Tagesablauf &amp; Zeiten
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Typischer Lehrgangstag im JFAZ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Damit du dich sofort orientieren kannst: So sieht ein regulärer Seminartag aus.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleItems.map((item, idx) => {
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
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 space-y-1">
            <h4 className="font-bold text-hkjf-navy">Die goldene JFAZ-Regel:</h4>
            <p>
              Pünktlichkeit zu den Mahlzeiten und Unterrichtszeiten wird von allen sehr geschätzt. Die Lehrgangsleitung gibt dir am ersten Vormittag alle seminarbezogenen Feinheiten und eventuelle Raumwechsel bekannt!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
