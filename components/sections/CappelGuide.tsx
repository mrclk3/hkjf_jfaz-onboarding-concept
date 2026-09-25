"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Sparkles,
  Utensils,
  Pill,
  Fuel,
  Store,
  MapPin,
  Clock,
  ExternalLink,
  Footprints,
  Laptop,
  PhoneCall,
  WifiOff,
  Headphones,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cappelLocations, cappelCategories, CappelLocation } from "@/data/cappelLocations";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CappelGuideProps {
  isOnline?: boolean;
}

export function CappelGuide({ isOnline = false }: CappelGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showLocations, setShowLocations] = useState(!isOnline);

  const filteredLocations =
    selectedCategory === "all"
      ? cappelLocations
      : cappelLocations.filter((loc) => loc.category === selectedCategory);

  const getIcon = (iconName: CappelLocation["iconName"]) => {
    switch (iconName) {
      case "ShoppingCart":
        return <ShoppingCart className="w-5 h-5 text-hkjf-red" />;
      case "Store":
        return <Store className="w-5 h-5 text-hkjf-red" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case "Pill":
        return <Pill className="w-5 h-5 text-emerald-600" />;
      case "Utensils":
        return <Utensils className="w-5 h-5 text-orange-600" />;
      case "Fuel":
        return <Fuel className="w-5 h-5 text-blue-600" />;
      default:
        return <MapPin className="w-5 h-5 text-hkjf-red" />;
    }
  };

  return (
    <section id="umgebung" className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {isOnline ? (
            <>
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200 font-extrabold flex items-center gap-1.5 mx-auto w-fit">
                <Laptop className="w-3.5 h-3.5" />
                <span>Online-Support &amp; Notfallhilfe</span>
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Technischer Support &amp; Hilfe während des Online-Seminars
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Verbindung abgebrochen, Ton streikt oder Unterlagen fehlen? Hier findest du schnelle Soforthilfe für dein Online-Seminar.
              </p>
            </>
          ) : (
            <>
              <Badge variant="gold" className="mb-3">
                Einkauf &amp; Fußnähe
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Cappel-Guide: Alles in Fußnähe rund ums JFAZ
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Duschgel vergessen, Heißhunger auf Pizza oder Snacks für den Abend gesucht? In 7 bis 12 Gehminuten erreichst du alle wichtigen Geschäfte in Cappel.
              </p>
            </>
          )}
        </div>

        {/* Online-Only Emergency Help Grid */}
        {isOnline && (
          <div className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-all bg-gradient-to-b from-indigo-50/50 to-white">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold text-hkjf-navy">
                  Hotline der Seminarleitung
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm text-slate-600 space-y-2">
                <p>
                  Bei akuten Einwahlproblemen oder plötzlichem Internetausfall erreichst du unser Bildungsstätten-Team direkt:
                </p>
                <div className="p-3 bg-white border border-indigo-200 rounded-xl font-bold text-indigo-900 text-xs">
                  📞 Telefon: 06421 / 800-0<br />
                  ✉️ E-Mail: bildungsstaette@hkjf.de
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-all bg-gradient-to-b from-indigo-50/50 to-white">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2">
                  <WifiOff className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold text-hkjf-navy">
                  Verbindungs-Abbruch?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm text-slate-600 space-y-2">
                <p>
                  1. Browser-Tab neu laden (F5 oder Strg+R).<br />
                  2. Router / WLAN kurz trennen &amp; neu verbinden.<br />
                  3. Notfalls per Smartphone-Hotspot oder Telefon-Einwahl einwählen.
                </p>
                <p className="text-[11px] text-slate-500 pt-1">
                  Die Dozenten lassen dich sofort wieder aus dem Warteraum ein!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-all bg-gradient-to-b from-indigo-50/50 to-white">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold text-hkjf-navy">
                  Skripte &amp; Florix-Eintrag
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm text-slate-600 space-y-2">
                <p>
                  Alle Präsentationen und Gesetzestexte werden im Meeting-Chat und per Downloadlink geteilt.
                </p>
                <p>
                  Deine offizielle Teilnahmebescheinigung wird nach Kursende automatisch in Florix Hessen eingetragen.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Toggle Cappel Neighborhood Locations */}
        {isOnline && (
          <div className="text-center mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLocations(!showLocations)}
              className="text-xs font-bold gap-2 text-slate-600 hover:text-hkjf-navy border-slate-300"
            >
              <span>{showLocations ? "Cappel-Ortsguide verbergen" : "Planst du spätere Präsenzkurse? Cappel-Orte anzeigen"}</span>
              {showLocations ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </Button>
          </div>
        )}

        {/* Cappel Locations Content */}
        {showLocations && (
          <>
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {cappelCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-hkjf-red text-white border-hkjf-red shadow-md scale-[1.02]"
                      : "bg-hkjf-sand/70 text-hkjf-navy border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Location Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((loc) => (
                <Card
                  key={loc.id}
                  className="flex flex-col justify-between border-slate-200/90 hover:border-hkjf-red/50 hover:shadow-lg transition-all duration-200 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-red-50 transition-colors">
                        {getIcon(loc.iconName)}
                      </div>
                      <Badge variant="outline" className="text-xs font-semibold text-slate-600 bg-white">
                        <Footprints className="w-3.5 h-3.5 mr-1 text-hkjf-red" />
                        {loc.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-base sm:text-lg text-hkjf-navy group-hover:text-hkjf-red transition-colors">
                      {loc.name}
                    </CardTitle>
                    <span className="text-xs font-medium text-slate-400">
                      {loc.categoryLabel}
                    </span>
                  </CardHeader>

                  <CardContent className="space-y-3 flex-grow">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {loc.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{loc.hours}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 border-t border-slate-100">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs font-bold text-hkjf-navy hover:text-hkjf-red hover:bg-red-50 gap-1.5"
                    >
                      <a
                        href={`https://maps.google.com/?q=${loc.mapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>In Google Maps öffnen</span>
                        <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
