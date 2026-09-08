"use client";

import React, { useState } from "react";
import { Navigation, Car, Key, Home, MapPin, ExternalLink, Check, Clock, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ArrivalGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const steps = [
    {
      num: 1,
      title: "Navigation & Anfahrt",
      subtitle: "Navi-Ziel: Cappeler Str. 130, 35043 Marburg",
      icon: Navigation,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600">
          <p>
            Gib in dein Navi <strong>Cappeler Straße 130, 35043 Marburg</strong> ein.
            Die Zufahrt ist über die Hauptstraße gut beschildert (&bdquo;Hessische Landesfeuerwehrschule / JFAZ&ldquo;).
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              asChild
              size="sm"
              className="bg-hkjf-red hover:bg-hkjf-redDark text-white font-bold gap-1.5"
            >
              <a
                href="https://maps.google.com/?q=Cappeler+Str.+130,+35043+Marburg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>In Google Maps öffnen</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      num: 2,
      title: "Schrankenanlage & Parkplatz",
      subtitle: "Kostenfreies Parken für Lehrgangsgäste",
      icon: Car,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <p>
            Fahre bis vor die Schranke an der Einfahrt. Die Schranke öffnet sich tagsüber automatisch oder per Gegensprechanlage.
          </p>
          <p>
            Dahinter stehen dir <strong>kostenfreie Parkplätze</strong> direkt auf dem Campusgelände zur Verfügung. Bitte parke platzsparend auf den markierten PKW- bzw. MTW-Flächen.
          </p>
        </div>
      ),
    },
    {
      num: 3,
      title: "Pforte & Zimmerschlüssel",
      subtitle: "Check-in & Begrüßung",
      icon: Key,
      content: (
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
          <p>
            Gehe direkt ins Hauptgebäude zur <strong>Pforte / Rezeption</strong>. Dort nennst du deinen Namen und deinen Lehrgang.
          </p>
          <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl flex items-start gap-2.5 text-amber-900 text-xs">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Spätanreise (z. B. Sonntagabend):</strong> Die Pforte ist besetzt. Du erhältst deine Zimmerkarte und den Gebäudeplan auch außerhalb der normalen Bürozeiten.
            </div>
          </div>
        </div>
      ),
    },
    {
      num: 4,
      title: "Zimmer beziehen & Foyer-Info",
      subtitle: "Einrichten & Infowand checken",
      icon: Home,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <p>
            Die Zimmerkarte schließt dein Zimmer sowie die Außentüren auf.
          </p>
          <p>
            Im Zimmer ist das Bett bereits frisch mit Bettwäsche bezogen. Wirf einen Blick auf die digitale Infotafel im Foyer: Hier siehst du deinen Lehrsaal und den Beginn der ersten Einheit!
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="anreise" className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-3">
            Schritt-für-Schritt
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Deine stressfreie Anreise &amp; der Check-in
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Von der Autobahn bis ins bezugsfertige Zimmer – diese 4 einfachen Schritte bringen dich sicher an.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const isDone = completedSteps.includes(step.num);

            return (
              <Card
                key={step.num}
                className={`relative transition-all duration-200 border-2 ${
                  isDone
                    ? "border-emerald-500/80 bg-emerald-50/20"
                    : "border-slate-200/90 hover:border-hkjf-red/50"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-sm ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : "bg-hkjf-red text-white"
                      }`}
                    >
                      {step.num}
                    </div>
                    
                    {/* Checkbox button */}
                    <button
                      onClick={() => toggleStep(step.num)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                        isDone
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:text-hkjf-navy"
                      }`}
                      title="Schritt als erledigt markieren"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isDone ? "Erledigt" : "Abhaken"}</span>
                    </button>
                  </div>

                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Icon className="w-5 h-5 text-hkjf-red shrink-0" />
                    <span>{step.title}</span>
                  </CardTitle>
                  <span className="text-xs font-medium text-slate-400">
                    {step.subtitle}
                  </span>
                </CardHeader>

                <CardContent>
                  {step.content}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Banner for Emergency Contact */}
        <div className="mt-10 bg-hkjf-cream rounded-2xl p-6 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-hkjf-red flex items-center justify-center shrink-0">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-hkjf-navy text-sm sm:text-base">
                Stau oder Verspätung auf der Autobahn?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Keine Panik! Ein kurzer Anruf bei der Pforte genügt: <strong>(06421) 800-0</strong>. Dein Zimmer wird für dich freigehalten.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 font-bold">
            <a href="tel:064218000">Pforte anrufen</a>
          </Button>
        </div>

      </div>
    </section>
  );
}
