"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  CheckCircle,
  MapPin,
  Compass,
  ArrowRight,
  BedDouble,
  GraduationCap,
  ChevronRight,
  Shirt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { officialCourses } from "@/data/coursesData";

interface HeroProps {
  persona: "newcomer" | "returner";
  setPersona: (p: "newcomer" | "returner") => void;
  selectedCourseId: string;
}

export function Hero({ persona, setPersona, selectedCourseId }: HeroProps) {
  const activeCourse =
    officialCourses.find((c) => c.id === selectedCourseId) || officialCourses[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-hkjf-cream to-hkjf-sand/40 pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges & Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-red-50 text-hkjf-red border border-red-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Offizielles Onboarding-Portal der HKJF</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hkjf-navy tracking-tight leading-[1.15] mb-4">
            Willkommen an deiner Bildungsstätte im{" "}
            <span className="text-hkjf-red underline decoration-hkjf-red/30 decoration-4 underline-offset-4">
              JFAZ Marburg
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-5">
            Dein interaktiver Wegbegleiter für eine entspannte Anreise, den Check-in,
            Zimmer &amp; Verpflegung sowie alle lehrgangsspezifischen Infos.
          </p>

          {/* Lehrgang Quick Badge Anchor */}
          <a
            href="#lehrgangs-finder"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-hkjf-navy border-2 border-slate-200 px-4 py-2 rounded-2xl shadow-sm hover:border-hkjf-red transition-all group max-w-xl text-left"
          >
            <div className="p-1.5 rounded-lg bg-red-50 text-hkjf-red shrink-0 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-slate-500 font-medium block">Aktuell ausgewählter Lehrgang:</span>
              <span className="font-extrabold text-hkjf-navy group-hover:text-hkjf-red transition-colors">
                {activeCourse.title} ({activeCourse.duration})
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-hkjf-red shrink-0 ml-1 transition-colors" />
          </a>
        </div>

        {/* Interactive Persona Selector Card */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border-2 border-slate-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-2">
            
            {/* Persona 1: Erstes Mal hier */}
            <button
              onClick={() => setPersona("newcomer")}
              className={`flex items-start gap-3.5 p-4 rounded-xl text-left transition-all duration-200 ${
                persona === "newcomer"
                  ? "bg-hkjf-red text-white shadow-md scale-[1.01]"
                  : "hover:bg-slate-50 text-hkjf-navy"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 ${
                  persona === "newcomer" ? "bg-white/20 text-white" : "bg-red-50 text-hkjf-red"
                }`}
              >
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base">Ich bin das 1. Mal hier</span>
                  {persona === "newcomer" && <CheckCircle className="w-4 h-4 text-amber-300" />}
                </div>
                <p className={`text-xs mt-1 leading-snug ${persona === "newcomer" ? "text-red-100" : "text-slate-500"}`}>
                  Schritt-für-Schritt-Führung: Von Anfahrt über Zimmerkarte bis zur Packliste.
                </p>
              </div>
            </button>

            {/* Persona 2: Bereits dagewesen */}
            <button
              onClick={() => setPersona("returner")}
              className={`flex items-start gap-3.5 p-4 rounded-xl text-left transition-all duration-200 ${
                persona === "returner"
                  ? "bg-hkjf-navy text-white shadow-md scale-[1.01]"
                  : "hover:bg-slate-50 text-hkjf-navy"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 ${
                  persona === "returner" ? "bg-white/20 text-white" : "bg-blue-50 text-hkjf-navy"
                }`}
              >
                <BedDouble className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base">Ich kenne mich schon aus</span>
                  {persona === "returner" && <CheckCircle className="w-4 h-4 text-amber-300" />}
                </div>
                <p className={`text-xs mt-1 leading-snug ${persona === "returner" ? "text-blue-200" : "text-slate-500"}`}>
                  Schnellzugriff auf Essenszeiten, Cappel-Guide (Einkauf/Spätimbiss) &amp; WLAN.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Hero Media & Dynamic Guidance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Image Card Banner */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/assets/jfaz_hero.jpg"
                alt="Jugendfeuerwehrausbildungszentrum Marburg"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hkjf-navyDark/85 via-transparent to-black/20" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                <Badge variant="gold" className="font-bold">
                  Standort Marburg-Cappel
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                  Modern lernen, zusammenwachsen und Freizeit genießen.
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-hkjf-red" />
                  <span>Lintzingsweg 1a, 35043 Marburg-Cappel</span>
                </p>
              </div>
            </div>

            {/* Float Highlight Badge */}
            <div className="absolute -bottom-4 -right-2 sm:right-6 bg-white rounded-xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-hkjf-red flex items-center justify-center font-black text-lg">
                24h
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-hkjf-navy block">Pforte &amp; Schlüssel</span>
                <span className="text-[11px] text-slate-500">Spätanreise jederzeit möglich</span>
              </div>
            </div>
          </div>

          {/* Persona-Adaptive Quick Actions */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-border/80 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {persona === "newcomer" ? "Empfohlener Leitfaden" : "Schnellübersicht"}
                </span>
                <Badge variant={persona === "newcomer" ? "default" : "secondary"}>
                  {persona === "newcomer" ? "Neuling-Modus" : "Erfahren"}
                </Badge>
              </div>

              {persona === "newcomer" ? (
                <div className="space-y-3">
                  <h4 className="font-bold text-hkjf-navy text-base">
                    Keine Sorge – so startest du ohne Stress:
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-hkjf-red font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span><strong>Lehrgang wählen:</strong> Sieh dir Dresscode und Rauminfos an.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-hkjf-red font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span><strong>Anfahrt &amp; Parken:</strong> Kostenfreie Parkplätze direkt hinter der Schranke.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-hkjf-red font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span><strong>Check-in:</strong> Schlüsselkarte an der Pforte abholen (auch sonntags).</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <Button asChild className="w-full bg-hkjf-red hover:bg-hkjf-redDark text-white font-bold">
                      <a href="#lehrgangs-finder" className="flex items-center justify-center gap-2">
                        <span>Lehrgang &amp; Dresscode prüfen</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="font-bold text-hkjf-navy text-base">
                    Direkte Abkürzungen für deinen Aufenthalt:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href="#lehrgangs-finder"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-hkjf-red font-bold text-slate-700 transition-colors border border-slate-100 block"
                    >
                      🎓 Lehrgangsplan &rarr;
                    </a>
                    <a
                      href="#packliste"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-hkjf-red font-bold text-slate-700 transition-colors border border-slate-100 block"
                    >
                      🎒 Personalisierte Packliste &rarr;
                    </a>
                    <a
                      href="#ablauf"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-hkjf-red font-bold text-slate-700 transition-colors border border-slate-100 block"
                    >
                      ⏰ Essenszeiten &amp; Ablauf &rarr;
                    </a>
                    <a
                      href="#umgebung"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-hkjf-red font-bold text-slate-700 transition-colors border border-slate-100 block"
                    >
                      🛒 Cappel-Guide (Einkauf) &rarr;
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
