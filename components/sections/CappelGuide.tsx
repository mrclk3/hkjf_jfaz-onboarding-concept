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
} from "lucide-react";
import { cappelLocations, cappelCategories, CappelLocation } from "@/data/cappelLocations";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CappelGuide() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
          <Badge variant="gold" className="mb-3">
            Einkauf &amp; Fußnähe
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Cappel-Guide: Alles in Fußnähe rund ums JFAZ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Duschgel vergessen, Heißhunger auf Pizza oder Snacks für den Abend gesucht? In 7 bis 12 Gehminuten erreichst du alle wichtigen Geschäfte in Cappel.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cappelCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? "bg-hkjf-red text-white border-hkjf-red shadow-md scale-[1.02]"
                  : "bg-hkjf-sand/70 text-hkjf-navy border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => (
            <Card
              key={loc.id}
              className="flex flex-col justify-between border-2 border-slate-200/90 hover:border-hkjf-red/50 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm shrink-0">
                    {getIcon(loc.iconName)}
                  </div>
                  <div className="text-right">
                    <Badge variant="cream" className="text-[11px] font-bold">
                      <Footprints className="w-3 h-3 mr-1 inline" />
                      {loc.badge}
                    </Badge>
                  </div>
                </div>

                <CardTitle className="text-lg text-hkjf-navy leading-snug">
                  {loc.name}
                </CardTitle>
                <span className="text-xs font-semibold text-hkjf-red">
                  {loc.categoryLabel}
                </span>
              </CardHeader>

              <CardContent className="space-y-3.5 text-xs sm:text-sm text-slate-600 flex-grow">
                <p className="leading-relaxed text-slate-600">{loc.description}</p>

                <div className="bg-slate-50 p-3 rounded-xl space-y-2 border border-slate-100 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-emerald-800 font-bold">{loc.hours}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full font-bold justify-center gap-1.5 hover:bg-hkjf-red hover:text-white"
                >
                  <a
                    href={`https://maps.google.com/?q=${loc.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Route in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
