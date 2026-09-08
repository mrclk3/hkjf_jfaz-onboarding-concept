"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Utensils, BedDouble, Smile, Map, Wifi, Coffee, Tv, ShieldCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CampusExplorer() {
  return (
    <section id="campus" className="py-16 sm:py-20 bg-hkjf-cream border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            Campus &amp; Gebäude
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Entdecke das JFAZ Gelände
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Kurze Wege, moderne Unterrichtsräume und Wohlfühlatmosphäre für deine Lehrgangstage.
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
                <span>Mensa &amp; Verpflegung</span>
              </TabsTrigger>
              <TabsTrigger value="freizeit" className="py-2.5 text-xs sm:text-sm flex items-center gap-2">
                <Smile className="w-4 h-4 text-hkjf-red" />
                <span>Freizeit &amp; Lounge</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Zimmer & Unterkunft */}
          <TabsContent value="zimmer" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <Badge variant="green">Komfortabler Rückzugsort</Badge>
                <h3 className="text-2xl font-bold text-hkjf-navy">
                  Deine Unterkunft im Jugendgästehaus
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Die Zimmer im JFAZ sind zweckmäßig und freundlich eingerichtet. Nach einem intensiven Lerntag kannst du dich hier erholen und Kraft tanken.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-hkjf-navy">Bettwäsche inklusive</h4>
                      <p className="text-[11px] text-slate-500">Frisch bezogen bei deiner Anreise. Handtücher bitte mitbringen!</p>
                    </div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm flex items-start gap-3">
                    <Wifi className="w-5 h-5 text-hkjf-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-hkjf-navy">Freies Gäste-WLAN</h4>
                      <p className="text-[11px] text-slate-500">Schnelles WLAN im gesamten Gebäude verfügbar.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900">
                  💡 <strong>Tipp:</strong> Eine eigene Mehrfachsteckdose im Gepäck ist Gold wert, falls du Handy, Laptop und Powerbank gleichzeitig laden möchtest.
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src="/assets/jfaz_room.jpg"
                    alt="Zimmer im JFAZ Marburg"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold">
                    Beispiel-Unterkunft JFAZ Marburg
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
                  <CardTitle className="text-lg">Moderne Medientechnik</CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Alle Lehrsäle sind mit interaktiven Smartboards, Beamern, Flipcharts und Moderationskoffern ausgestattet. Perfekt für interaktive Gruppenarbeiten.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-hkjf-navy flex items-center justify-center mb-2">
                    <Map className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">Digitale Infotafeln</CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Im Foyer siehst du auf den Monitoren genau, in welchem Raum (z. B. Raum Lahn, Raum Marburg, etc.) dein Lehrgang stattfindet.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">Pausenzonen</CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Zwischen den Lerneinheiten gibt es kurze Kaffeepausen. Wasserspender und Heißgetränkeautomaten stehen direkt vor den Seminarräumen.
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 3: Mensa */}
          <TabsContent value="mensa" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="text-lg">Frühstücksbuffet</CardTitle>
                  <span className="text-xs font-bold text-amber-700">07:00 – 08:00 Uhr</span>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Frische Brötchen, Wurst, Käse, Müsli, Joghurt, Saft, Kaffee und Tee. Die perfekte Stärkung vor dem Unterrichtsbeginn.
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-hkjf-red">
                <CardHeader>
                  <CardTitle className="text-lg">Mittagessen (Warm)</CardTitle>
                  <span className="text-xs font-bold text-hkjf-red">12:00 – 13:00 Uhr</span>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Täglich frisch gekochtes Hauptgericht inklusive vegetarischer Option, großer Salatbar und leckerem Dessert.
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-hkjf-navy">
                <CardHeader>
                  <CardTitle className="text-lg">Abendessen</CardTitle>
                  <span className="text-xs font-bold text-hkjf-navy">18:00 – 19:00 Uhr</span>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600">
                  Klassische Brotzeit mit verschiedenen Brotsorten, Aufschnitt, Käse, Salaten und oft einer warmen Ergänzung (Suppe/Snack).
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 4: Freizeit */}
          <TabsContent value="freizeit" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tv className="w-5 h-5 text-hkjf-red" />
                    <span>Aufenthaltsräume &amp; Gemeinschaft</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <p>
                    Nach dem Abendessen ist Zeit zum Kennenlernen und Austauschen. Im Haus gibt es TV-Räume, Tischkicker und gemütliche Sitzecken.
                  </p>
                  <p>
                    Für den kleinen Durst am Abend stehen Getränkeautomaten mit kühlen Softdrinks und Snacks bereit.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smile className="w-5 h-5 text-hkjf-navy" />
                    <span>Außenbereich &amp; Marburg Altstadt</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <p>
                    Das Außengelände lädt im Frühjahr und Sommer zum Verweilen ein.
                  </p>
                  <p>
                    Wer noch Marburg erkunden möchte: Mit dem Stadtbus gelangt man in ca. 12–15 Minuten direkt zum Marktplatz der historischen Oberstadt mit ihren berühmten Fachwerkhäusern.
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
