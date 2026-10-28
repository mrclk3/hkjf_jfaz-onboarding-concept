"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Utensils, BedDouble, Smile, Map, KeyRound, Coffee, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CampusExplorer() {
  return (
    <section id="campus" className="py-16 sm:py-20 bg-hkjf-cream border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            Campus &amp; Gebäude
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Unterkunft, Unterricht &amp; Verpflegung
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Das Wichtigste für deinen Aufenthalt auf dem Gelände der HLFS-Außenstelle in Marburg-Cappel.
          </p>
        </div>

        {/* Interactive Tabs */}
        <Tabs defaultValue="zimmer" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-2xl h-auto p-1.5 gap-1">
              <TabsTrigger value="zimmer" className="py-2.5 text-xs sm:text-sm flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-hkjf-red" />
                <span>Unterkunft &amp; Zimmer</span>
              </TabsTrigger>
              <TabsTrigger value="lehrsaal" className="py-2.5 text-xs sm:text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-hkjf-red" />
                <span>Lehrsäle &amp; Unterricht</span>
              </TabsTrigger>
              <TabsTrigger value="mensa" className="py-2.5 text-xs sm:text-sm flex items-center gap-2">
                <Utensils className="w-4 h-4 text-hkjf-red" />
                <span>Verpflegung</span>
              </TabsTrigger>
              <TabsTrigger value="freizeit" className="py-2.5 text-xs sm:text-sm flex items-center gap-2">
                <Smile className="w-4 h-4 text-hkjf-red" />
                <span>Abends</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Zimmer & Unterkunft */}
          <TabsContent value="zimmer" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <Badge variant="green">Unterkunft</Badge>
                <h3 className="text-2xl font-bold text-hkjf-navy">
                  Dein Zimmer
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Du übernachtest in einem Einzelzimmer mit integrierter Nasszelle. Ausgestattet ist es mit Bett, Kleiderschrank, Arbeitstisch und Stühlen.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-hkjf-navy">Bettwäsche wird gestellt</h4>
                      <p className="text-[11px] text-slate-500">Am Abreisetag bitte das Bett abziehen. Handtücher selbst mitbringen.</p>
                    </div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm flex items-start gap-3">
                    <KeyRound className="w-5 h-5 text-hkjf-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-hkjf-navy">Transponder statt Schlüssel</h4>
                      <p className="text-[11px] text-slate-500">Öffnet Zimmer, Seiteneingänge und Zufahrtstor. Rückgabe am Abreisetag bis 14:00 Uhr.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900">
                  💡 <strong>Etwas vergessen?</strong> Fehlen dir Handtuch oder Duschgel, hilft dir die Geschäftsstelle der HKJF vor Ort weiter.
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src="/assets/jfaz_room.jpg"
                    alt="Symbolbild: Jugendfeuerwehr bei einer Gruppenarbeit"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold">
                    Symbolbild – kein Foto aus Marburg-Cappel
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Lehrsäle */}
          <TabsContent value="lehrsaal" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-hkjf-red flex items-center justify-center mb-2">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">Unterrichtszeiten</CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Am Anreisetag beginnt der Unterricht in der Regel um 09:40 Uhr. Er endet täglich meist um 15:55 Uhr, am Abreisetag spätestens um 14:30 Uhr.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-hkjf-navy flex items-center justify-center mb-2">
                    <Map className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">Dein Lehrsaal</CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  In welchem Raum dein Lehrgang stattfindet, erfährst du bei der Anmeldung. Zum Start gibt es meist eine Vorstellungsrunde, in der die Lehrgangsleitung Ablauf und Ziele erklärt.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">Pausen</CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Vormittags gibt es eine Kaffeepause (09:20 – 09:40 Uhr), mittags die Mittagspause. Abweichungen gibt die Lehrgangsleitung bekannt.
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 3: Mensa */}
          <TabsContent value="mensa" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="text-lg">Frühstück</CardTitle>
                  <span className="text-xs font-bold text-amber-700">06:40 – 07:30 Uhr (montags 09:00 – 09:30 Uhr)</span>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Im Speisesaal vor dem ersten Unterrichtsblock.
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-hkjf-red">
                <CardHeader>
                  <CardTitle className="text-lg">Mittagessen</CardTitle>
                  <span className="text-xs font-bold text-hkjf-red">12:15 – 12:50 Uhr</span>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Der Speiseplan wechselt über viele Wochen, Wiederholungen gibt es kaum.
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-hkjf-navy">
                <CardHeader>
                  <CardTitle className="text-lg">Abendessen</CardTitle>
                  <span className="text-xs font-bold text-hkjf-navy">16:15 – 17:45 Uhr (freitags 17:00 – 17:45 Uhr)</span>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Vegetarische Kost oder andere Wünsche bitte am Anmeldungstag melden.
                </CardContent>
              </Card>
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-500">
              Zeiten laut HLFS Marburg-Cappel. Maßgeblich ist der Plan vor Ort bzw. deine Einberufung.
            </p>
          </TabsContent>

          {/* TAB 4: Freizeit */}
          <TabsContent value="freizeit" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smile className="w-5 h-5 text-hkjf-red" />
                    <span>Nach dem Unterricht</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <p>
                    Die Abende sind ideal, um die anderen Teilnehmenden aus ganz Hessen kennenzulernen.
                    Welche Freizeitangebote es auf dem Gelände gibt, erfährst du in der Informationsmappe der HLFS.
                  </p>
                  <a
                    href="https://hlfs.hessen.de/standort-marburg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-hkjf-navy hover:text-hkjf-red"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Informationsmappe auf hlfs.hessen.de</span>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-hkjf-navy" />
                    <span>Marburg erkunden</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <p>
                    Cappel ist ein Stadtteil von Marburg. Die historische Oberstadt erreichst du mit dem Stadtbus oder dem Auto.
                  </p>
                  <p>
                    Für Minderjährige gelten die Regeln der Lehrgangsleitung – bitte vorher absprechen, bevor du das Gelände verlässt.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>

      </div>
    </section>
  );
}
