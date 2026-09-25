"use client";

import React, { useState } from "react";
import {
  Navigation,
  Car,
  Key,
  Home,
  MapPin,
  ExternalLink,
  Check,
  Clock,
  Laptop,
  Mail,
  Headphones,
  Video,
  Wifi,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ArrivalGuideProps {
  isOnline?: boolean;
  courseTitle?: string;
  platform?: string;
}

export function ArrivalGuide({
  isOnline = false,
  courseTitle,
  platform = "Microsoft Teams / BigBlueButton",
}: ArrivalGuideProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showPhysicalArrival, setShowPhysicalArrival] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const handleSimulateTechCheck = () => {
    setTestSuccess(true);
    if (!completedSteps.includes(2)) {
      setCompletedSteps((prev) => [...prev, 2]);
    }
  };

  const onlineSteps = [
    {
      num: 1,
      title: "Einladung & Meeting-Link",
      subtitle: "Zugangsdaten 3–5 Tage vorab",
      icon: Mail,
      content: (
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
          <p>
            Der Einwahllink für deine Online-Schulung wird ca. <strong>3 bis 5 Tage vor Beginn</strong> an deine bei der Anmeldung angegebene E-Mail-Adresse verschickt.
          </p>
          <div className="bg-indigo-50/80 border border-indigo-200/80 p-2.5 rounded-xl text-indigo-900 text-xs flex items-start gap-2">
            <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>Spam-Ordner checken:</strong> Solltest du bis 48h vor dem Termin keinen Link erhalten haben, melde dich kurz bei der Bildungsstätte.
            </div>
          </div>
        </div>
      ),
    },
    {
      num: 2,
      title: "Audio, Video & Technik-Check",
      subtitle: "Headset & Kamera bereitmachen",
      icon: Headphones,
      content: (
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
          <p>
            Für anerkannte Seminare ist eine <strong>Webcam</strong> und ein <strong>Headset</strong> (verhindert Rückkopplung) zwingend erforderlich.
          </p>
          <div className="pt-1">
            <Button
              type="button"
              size="sm"
              onClick={handleSimulateTechCheck}
              className={`w-full text-xs font-bold gap-1.5 transition-all ${
                testSuccess
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {testSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Audio &amp; Kamera bereit!</span>
                </>
              ) : (
                <>
                  <Laptop className="w-4 h-4" />
                  <span>Technik-Check simulieren</span>
                </>
              )}
            </Button>
          </div>
        </div>
      ),
    },
    {
      num: 3,
      title: "Virtueller Check-in (15 Min. vor Beginn)",
      subtitle: "Namensformat & Warteraum",
      icon: Clock,
      content: (
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
          <p>
            Der virtuelle Seminarraum öffnet <strong>15 Minuten vor Beginn</strong>. Nutze die Zeit für den Ton- und Videotest.
          </p>
          <div className="bg-amber-50 border border-amber-200/80 p-2.5 rounded-xl text-amber-900 text-xs">
            <strong>Wichtig fürs Teilnahmezertifikat:</strong> Trage dich beim Beitreten mit vollem Namen ein (z. B. <em>&quot;Max Mustermann – JF Kassel&quot;</em>).
          </div>
        </div>
      ),
    },
    {
      num: 4,
      title: "Digitaler Arbeitsplatz einrichten",
      subtitle: "Ruhige Umgebung & Verpflegung",
      icon: Home,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <p>
            Schließe die Zimmertür und informiere Familie/Mitbewohner über deinen Lehrgang.
          </p>
          <p>
            Stelle dir eine große Flasche Wasser, Kaffee/Tee sowie Schreibzeug und deine Florix-Notizen griffbereit an deinen Schreibtisch.
          </p>
        </div>
      ),
    },
  ];

  const physicalSteps = [
    {
      num: 1,
      title: "Navigation & Anfahrt",
      subtitle: "Navi-Ziel: Lintzingsweg 1a, 35043 Marburg-Cappel",
      icon: Navigation,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600">
          <p>
            Gib in dein Navi <strong>Lintzingsweg 1a, 35043 Marburg-Cappel</strong> ein.
            Die Zufahrt zum JFAZ-Campus ist vor Ort gut ausgeschildert.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              asChild
              size="sm"
              className="bg-hkjf-red hover:bg-hkjf-redDark text-white font-bold gap-1.5"
            >
              <a
                href="https://maps.google.com/?q=Lintzingsweg+1a,+35043+Marburg"
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

  const activeSteps = isOnline ? onlineSteps : physicalSteps;

  return (
    <section id="anreise" className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {isOnline ? (
            <>
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200 font-extrabold flex items-center gap-1.5 mx-auto w-fit">
                <Laptop className="w-3.5 h-3.5" />
                <span>100% Digitales Online-Seminar</span>
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Virtueller Check-in &amp; Technik-Vorbereitung
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Für diesen Lehrgang musst du <strong>nicht nach Marburg anreisen</strong>! Dein Unterricht findet digital via <strong>{platform}</strong> statt.
              </p>
            </>
          ) : (
            <>
              <Badge variant="default" className="mb-3">
                Schritt-für-Schritt
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Deine stressfreie Anreise &amp; der Check-in
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Von der Autobahn bis ins bezugsfertige Zimmer – diese 4 einfachen Schritte bringen dich sicher an.
              </p>
            </>
          )}
        </div>

        {/* Online Special Alert Banner */}
        {isOnline && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shrink-0">
                <Wifi className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-indigo-950">
                <strong className="block font-black">Reines Online-Format: Kein Kofferpacken, keine Fahrzeit!</strong>
                <span>Plattform: {platform}. Halte dein Headset und Notizen bereit.</span>
              </div>
            </div>
            <button
              onClick={() => setShowPhysicalArrival(!showPhysicalArrival)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>{showPhysicalArrival ? "Anreise verbergen" : "Campus-Anreise anzeigen"}</span>
              {showPhysicalArrival ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeSteps.map((step) => {
            const Icon = step.icon;
            const isDone = completedSteps.includes(step.num);

            return (
              <Card
                key={step.num}
                className={`relative transition-all duration-200 border-2 ${
                  isDone
                    ? "border-emerald-500/80 bg-emerald-50/20"
                    : isOnline
                    ? "border-indigo-100 hover:border-indigo-400"
                    : "border-slate-200/90 hover:border-hkjf-red/50"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-sm ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : isOnline
                          ? "bg-indigo-600 text-white"
                          : "bg-hkjf-red text-white"
                      }`}
                    >
                      {step.num}
                    </div>
                    
                    {/* Checkbox button */}
                    <button
                      onClick={() => toggleStep(step.num)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
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
                    <Icon className={`w-5 h-5 shrink-0 ${isOnline ? "text-indigo-600" : "text-hkjf-red"}`} />
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

        {/* Optional Collapsible Physical Arrival for Online Learners */}
        {isOnline && showPhysicalArrival && (
          <div className="mt-12 p-6 bg-slate-50 rounded-3xl border-2 border-slate-200">
            <div className="mb-6 text-center">
              <Badge variant="outline" className="mb-2">Info für spätere Präsenzkurse</Badge>
              <h3 className="text-lg font-bold text-hkjf-navy">
                So funktioniert die Anreise nach Marburg-Cappel
              </h3>
              <p className="text-xs text-slate-600">
                Falls du in Zukunft einen Präsenzlehrgang im JFAZ besuchst, kannst du dir hier die Anfahrt ansehen:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {physicalSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-hkjf-navy">
                      <Icon className="w-4 h-4 text-hkjf-red" />
                      <span>{step.title}</span>
                    </div>
                    {step.content}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Banner for Emergency Contact */}
        <div className="mt-10 bg-hkjf-cream rounded-2xl p-6 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isOnline ? "bg-indigo-100 text-indigo-700" : "bg-red-100 text-hkjf-red"
            }`}>
              {isOnline ? <PhoneCall className="w-6 h-6" /> : <Navigation className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="font-bold text-hkjf-navy text-sm sm:text-base">
                {isOnline
                  ? "Technische Probleme oder Einwahllink fehlt?"
                  : "Stau oder Verspätung auf der Autobahn?"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {isOnline
                  ? "Keine Panik! Die HLFS/HKJF-Seminarbetreuung hilft dir sofort weiter: (06421) 800-0 oder per Mail an bildungsstaette@hkjf.de."
                  : "Keine Panik! Ein kurzer Anruf bei der Pforte genügt: (06421) 800-0. Dein Zimmer wird für dich freigehalten."}
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 font-bold">
            <a href="tel:064218000">Support anrufen</a>
          </Button>
        </div>

      </div>
    </section>
  );
}
