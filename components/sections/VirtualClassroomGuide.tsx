"use client";

import React, { useState } from "react";
import {
  Laptop,
  Users,
  MessageSquare,
  FileDown,
  Video,
  Mic,
  MicOff,
  Hand,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VirtualClassroomGuideProps {
  platform?: string;
  onExplorePhysicalCampus?: () => void;
}

export function VirtualClassroomGuide({
  platform = "Microsoft Teams / BigBlueButton",
}: VirtualClassroomGuideProps) {
  const [activeTab, setActiveTab] = useState<"plenum" | "breakout" | "netiquette" | "docs">("plenum");

  return (
    <div className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200 font-extrabold flex items-center gap-1.5 mx-auto w-fit">
            <Laptop className="w-3.5 h-3.5" />
            <span>Digitaler Campus &amp; Netiquette</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Dein virtueller Seminarraum &amp; die Zusammenarbeit
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Auch im Online-Format steht der persönliche Austausch an erster Stelle. So funktioniert der Unterricht in <strong>{platform}</strong>:
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Plenum */}
          <Card
            onClick={() => setActiveTab("plenum")}
            className={`border-2 cursor-pointer transition-all duration-200 ${
              activeTab === "plenum"
                ? "border-indigo-600 shadow-md ring-2 ring-indigo-500/10 bg-indigo-50/20"
                : "border-slate-200 hover:border-indigo-300"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                <Laptop className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold text-hkjf-navy">
                1. Hauptraum (Plenum)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-slate-600 space-y-1.5">
              <p>Gemeinsame Theorie, Impulsvorträge der Dozenten &amp; Foliensätze per Bildschirmübertragung.</p>
              <span className="text-[11px] font-bold text-indigo-700 block pt-1">
                Mikrofon stumm bei Vortrag
              </span>
            </CardContent>
          </Card>

          {/* Card 2: Breakout Rooms */}
          <Card
            onClick={() => setActiveTab("breakout")}
            className={`border-2 cursor-pointer transition-all duration-200 ${
              activeTab === "breakout"
                ? "border-indigo-600 shadow-md ring-2 ring-indigo-500/10 bg-indigo-50/20"
                : "border-slate-200 hover:border-indigo-300"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold text-hkjf-navy">
                2. Breakout-Rooms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-slate-600 space-y-1.5">
              <p>Automatische Einteilung in Kleingruppen (3–5 Personen) für Fallbeispiele &amp; Praxisübungen.</p>
              <span className="text-[11px] font-bold text-emerald-700 block pt-1">
                Intensiver Erfahrungsaustausch
              </span>
            </CardContent>
          </Card>

          {/* Card 3: Netiquette */}
          <Card
            onClick={() => setActiveTab("netiquette")}
            className={`border-2 cursor-pointer transition-all duration-200 ${
              activeTab === "netiquette"
                ? "border-indigo-600 shadow-md ring-2 ring-indigo-500/10 bg-indigo-50/20"
                : "border-slate-200 hover:border-indigo-300"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                <Hand className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold text-hkjf-navy">
                3. Online-Netiquette
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-slate-600 space-y-1.5">
              <p>Kamera an für lebendiges Miteinander. Virtuelles Melden bei Fragen und reger Chat-Austausch.</p>
              <span className="text-[11px] font-bold text-amber-800 block pt-1">
                Kamera-Pflicht bei HKJF-Kursen
              </span>
            </CardContent>
          </Card>

          {/* Card 4: Downloads */}
          <Card
            onClick={() => setActiveTab("docs")}
            className={`border-2 cursor-pointer transition-all duration-200 ${
              activeTab === "docs"
                ? "border-indigo-600 shadow-md ring-2 ring-indigo-500/10 bg-indigo-50/20"
                : "border-slate-200 hover:border-indigo-300"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                <FileDown className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold text-hkjf-navy">
                4. Skripte &amp; Vorlagen
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-slate-600 space-y-1.5">
              <p>Alle Seminarunterlagen, Gesetzestexte &amp; Vorlagen werden digital bereitgestellt.</p>
              <span className="text-[11px] font-bold text-purple-700 block pt-1">
                Direkter Download im Chat
              </span>
            </CardContent>
          </Card>

        </div>

        {/* Detailed Interactive Tab Explanation */}
        <div className="bg-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-indigo-800/80 px-3 py-1 rounded-full text-xs font-black uppercase text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Praxistipp für dein Online-Seminar</span>
            </div>

            {activeTab === "plenum" && (
              <div className="space-y-2 animate-in fade-in-50 duration-200">
                <h3 className="text-xl sm:text-2xl font-black">
                  Im Hauptraum: Stummschaltung &amp; Mitverfolgen
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  Damit alle Teilnehmer die Referenten glasklar verstehen, bleiben Mikrofone im Plenum stummgeschaltet. Wenn du eine Frage hast, hebe einfach kurz virtuell die Hand oder schreibe ins Chat-Fenster – die Dozenten moderieren alle Fragen live an.
                </p>
              </div>
            )}

            {activeTab === "breakout" && (
              <div className="space-y-2 animate-in fade-in-50 duration-200">
                <h3 className="text-xl sm:text-2xl font-black">
                  In den Breakout-Rooms: Teamwork wie im echten Seminarraum
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  In den Kleingruppen schalten alle ihr Mikrofon ein! Ihr erarbeitet gemeinsam Lösungen, könnt euren eigenen Bildschirm teilen und Notizen auf virtuellen Whiteboards (z. B. Padlet) sammeln. Am Ende kehrt ihr automatisch ins Plenum zurück.
                </p>
              </div>
            )}

            {activeTab === "netiquette" && (
              <div className="space-y-2 animate-in fade-in-50 duration-200">
                <h3 className="text-xl sm:text-2xl font-black">
                  Kamera-Regel: Warum das Bild so wichtig ist
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  Jugendarbeit lebt vom Miteinander! Bei anerkannten Jugendfeuerwehr-Lehrgängen ist die aktive Teilnahme mit Webcam Pflicht. So siehst du die Reaktionen der anderen und die Referenten wissen, ob alle mitkommen. Wähle einfach einen neutralen Hintergrund oder nutze den Weichzeichner.
                </p>
              </div>
            )}

            {activeTab === "docs" && (
              <div className="space-y-2 animate-in fade-in-50 duration-200">
                <h3 className="text-xl sm:text-2xl font-black">
                  Seminarunterlagen &amp; Teilnahmebescheinigung
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  Keine Sorge um schwere Ordner: Alle Skripte erhältst du als PDF zum Speichern auf deinem Rechner. Nach dem Kurs wird dein Leistungsnachweis digital bestätigt und in Florix Hessen für deine Heimatfeuerwehr hinterlegt.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
