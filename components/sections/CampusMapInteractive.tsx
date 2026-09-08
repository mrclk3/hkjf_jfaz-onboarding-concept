"use client";

import React, { useState } from "react";
import {
  MapPin,
  Compass,
  Building2,
  BookOpen,
  Bed,
  Utensils,
  Smile,
  Car,
  Tent,
  CheckCircle2,
  Layers,
  Clock,
  Lightbulb,
  Accessibility,
  Shield,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { campusBuildings, CampusBuilding } from "@/data/campusMapData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CampusMapInteractive() {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>("hauptgebaeude");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const selectedBuilding =
    campusBuildings.find((b) => b.id === selectedBuildingId) || campusBuildings[0];

  const getIcon = (iconName: CampusBuilding["iconName"]) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="w-5 h-5 text-[#dd0a35]" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case "Bed":
        return <Bed className="w-5 h-5 text-emerald-600" />;
      case "Utensils":
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case "Smile":
        return <Smile className="w-5 h-5 text-purple-600" />;
      case "Car":
        return <Car className="w-5 h-5 text-slate-700" />;
      case "Tent":
        return <Tent className="w-5 h-5 text-emerald-700" />;
      default:
        return <Building2 className="w-5 h-5 text-slate-700" />;
    }
  };

  const filterOptions = [
    { id: "all", label: "Alle Gebäude" },
    { id: "verwaltung", label: "🏛️ Pforte & Empfang" },
    { id: "unterricht", label: "📚 Lehrsäle" },
    { id: "wohnen", label: "🛏️ Unterkünfte" },
    { id: "verpflegung", label: "🍽️ Mensa" },
    { id: "parken", label: "🚗 Parken" },
  ];

  const filteredBuildings =
    activeFilter === "all"
      ? campusBuildings
      : campusBuildings.filter((b) => b.category === activeFilter);

  return (
    <section id="lageplan" className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="default" className="mb-3">
            Interaktiver Gebäude-Finder
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Schematischer Campus-Lageplan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Klicke auf ein Gebäude, um sofort Eingänge, Stockwerke, Zimmernummern und Barrierefreiheit einzusehen.
          </p>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                activeFilter === f.id
                  ? "bg-hkjf-navy text-white border-hkjf-navy shadow-sm scale-[1.02]"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Interactive Layout: Map on the left / Top, Details on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Area (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#fbf9f5] border-2 border-slate-200 rounded-3xl p-4 sm:p-6 shadow-md relative overflow-hidden">
            
            {/* Map Header with Compass */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#dd0a35]" />
                <span className="text-xs font-bold uppercase tracking-wider text-hkjf-navy">
                  JFAZ Campus Übersicht (Lintzingsweg 1a)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                Tipp: Klicke auf ein Gebäude
              </span>
            </div>

            {/* SVG Schematic Map Canvas */}
            <div className="relative w-full aspect-[16/10] bg-[#f2ece1] rounded-2xl border border-slate-300/80 overflow-hidden shadow-inner">
              
              <svg
                viewBox="0 0 1150 520"
                className="w-full h-full select-none"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.04))" }}
              >
                {/* Background Lawn & Walkways Pattern */}
                <rect x="0" y="0" width="1150" height="520" fill="#eae3d2" />

                {/* Campus Grass Areas */}
                <path
                  d="M 40,40 L 1110,40 L 1110,480 L 40,480 Z"
                  fill="#e5dfcb"
                  rx="16"
                />

                {/* Connecting Walkways / Asphalt Paths */}
                {/* Road from Top (Lintzingsweg Zufahrt) */}
                <path
                  d="M 540,0 L 540,150 L 350,150 L 350,420 L 750,420 L 750,150 L 540,150"
                  stroke="#cbd5e1"
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M 540,0 L 540,150 L 350,150 L 350,420 L 750,420 L 750,150 L 540,150"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  fill="none"
                />

                {/* Central Courtyard / Innenhof Plätzchen */}
                <circle cx="500" cy="270" r="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
                <text x="500" y="274" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
                  Innenhof
                </text>

                {/* Building SVG Elements */}
                {campusBuildings.map((b) => {
                  const isSelected = selectedBuildingId === b.id;
                  const isFiltered = activeFilter === "all" || b.category === activeFilter;

                  let rectFill = "#ffffff";
                  let rectStroke = isSelected ? "#dd0a35" : "#94a3b8";
                  let strokeW = isSelected ? 4 : 2;

                  if (b.category === "verwaltung") rectFill = isSelected ? "#fff1f2" : "#ffffff";
                  if (b.category === "unterricht") rectFill = isSelected ? "#eff6ff" : "#ffffff";
                  if (b.category === "wohnen") rectFill = isSelected ? "#f0fdf4" : "#ffffff";
                  if (b.category === "verpflegung") rectFill = isSelected ? "#fffbeb" : "#ffffff";
                  if (b.category === "freizeit") rectFill = isSelected ? "#faf5ff" : "#ffffff";
                  if (b.category === "parken") rectFill = isSelected ? "#f8fafc" : "#ffffff";

                  return (
                    <g
                      key={b.id}
                      onClick={() => setSelectedBuildingId(b.id)}
                      className={`cursor-pointer transition-all duration-200 ${
                        isFiltered ? "opacity-100" : "opacity-35"
                      }`}
                      style={{
                        transformOrigin: `${b.coordinates.x + b.coordinates.width / 2}px ${
                          b.coordinates.y + b.coordinates.height / 2
                        }px`,
                      }}
                    >
                      {/* Drop shadow for 3D building look */}
                      <rect
                        x={b.coordinates.x + 3}
                        y={b.coordinates.y + 4}
                        width={b.coordinates.width}
                        height={b.coordinates.height}
                        rx="14"
                        fill="#000000"
                        opacity="0.08"
                      />

                      {/* Main Building Box */}
                      <rect
                        x={b.coordinates.x}
                        y={b.coordinates.y}
                        width={b.coordinates.width}
                        height={b.coordinates.height}
                        rx="14"
                        fill={rectFill}
                        stroke={rectStroke}
                        strokeWidth={strokeW}
                        className="transition-colors duration-200"
                      />

                      {/* Selected Glow Ring */}
                      {isSelected && (
                        <rect
                          x={b.coordinates.x - 4}
                          y={b.coordinates.y - 4}
                          width={b.coordinates.width + 8}
                          height={b.coordinates.height + 8}
                          rx="18"
                          fill="none"
                          stroke="#dd0a35"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-pulse"
                        />
                      )}

                      {/* Building Header Tag in SVG */}
                      <rect
                        x={b.coordinates.x + 10}
                        y={b.coordinates.y + 10}
                        width={28}
                        height={28}
                        rx="8"
                        fill={isSelected ? "#dd0a35" : "#2b3467"}
                      />
                      <text
                        x={b.coordinates.x + 24}
                        y={b.coordinates.y + 28}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {b.name.charAt(0)}
                      </text>

                      {/* Building Title */}
                      <text
                        x={b.coordinates.x + 46}
                        y={b.coordinates.y + 24}
                        fill="#2b3467"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        {b.name.split("&")[0].trim()}
                      </text>

                      {/* Subtitle / Tag */}
                      <text
                        x={b.coordinates.x + 46}
                        y={b.coordinates.y + 38}
                        fill="#64748b"
                        fontSize="10"
                        fontWeight="500"
                      >
                        {b.category.toUpperCase()}
                      </text>

                      {/* Specific Badges inside Building */}
                      {b.roomNumbers && (
                        <text
                          x={b.coordinates.x + 14}
                          y={b.coordinates.y + b.coordinates.height - 14}
                          fill="#059669"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          🔑 {b.roomNumbers.split("(")[0]}
                        </text>
                      )}

                      {b.id === "hauptgebaeude" && (
                        <text
                          x={b.coordinates.x + 14}
                          y={b.coordinates.y + b.coordinates.height - 14}
                          fill="#dd0a35"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          ★ 1. Anlaufstelle &amp; Keycard
                        </text>
                      )}

                      {b.id === "mensa" && (
                        <text
                          x={b.coordinates.x + 14}
                          y={b.coordinates.y + b.coordinates.height - 14}
                          fill="#d97706"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          🍳 Frühstück, Mittag &amp; Abend
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Compass Rose Indicator in Top-Right */}
                <g transform="translate(1070, 70)">
                  <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                  <polygon points="0,-14 4,0 0,-4 -4,0" fill="#dd0a35" />
                  <polygon points="0,14 4,0 0,4 -4,0" fill="#64748b" />
                  <text x="0" y="-18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dd0a35">
                    N
                  </text>
                </g>
              </svg>

            </div>

            {/* Quick Map Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-red-100 border border-red-400 inline-block" />
                  <span>Verwaltung &amp; Pforte</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-100 border border-blue-400 inline-block" />
                  <span>Lehrsäle</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400 inline-block" />
                  <span>Zimmer / Wohnen</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-100 border border-amber-400 inline-block" />
                  <span>Mensa &amp; Bistro</span>
                </span>
              </div>
              <span className="text-[11px] font-semibold text-hkjf-navy">
                Klicke auf ein Feld für Details &rarr;
              </span>
            </div>

          </div>

          {/* Detailed Inspector Panel (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <Card className="border-2 border-slate-200 shadow-lg sticky top-24">
              <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 rounded-t-2xl">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200/80">
                    {getIcon(selectedBuilding.iconName)}
                  </div>
                  <Badge variant="default" className="uppercase tracking-wider font-extrabold text-[10px]">
                    {selectedBuilding.category}
                  </Badge>
                </div>

                <CardTitle className="text-xl text-hkjf-navy mt-2">
                  {selectedBuilding.name}
                </CardTitle>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedBuilding.tagline}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-5 text-xs sm:text-sm text-slate-700">
                
                {/* 1. Eingang & Orientierung */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-hkjf-navy uppercase tracking-wide">
                    <MapPin className="w-4 h-4 text-[#dd0a35]" />
                    <span>Eingang &amp; Zuwegung</span>
                  </div>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                    {selectedBuilding.entrance}
                  </p>
                </div>

                {/* 2. Stockwerke & Raumaufteilung */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-hkjf-navy uppercase tracking-wide">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Stockwerke &amp; Räume</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedBuilding.floors.map((floor, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 text-xs"
                      >
                        <span className="font-extrabold text-hkjf-navy bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                          {floor.level}
                        </span>
                        <span className="text-slate-600 leading-snug">{floor.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Barrierefreiheit & Aufzug */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-hkjf-navy uppercase tracking-wide">
                    <Accessibility className="w-4 h-4 text-emerald-600" />
                    <span>Barrierefreiheit</span>
                  </div>
                  <div className="bg-emerald-50/70 border border-emerald-200/80 p-2.5 rounded-xl text-xs space-y-1.5 text-emerald-950">
                    <div className="flex items-center gap-3 font-semibold">
                      <span>{selectedBuilding.accessibility.hasElevator ? "✓ Aufzug vorhanden" : "– Kein Aufzug"}</span>
                      <span>{selectedBuilding.accessibility.hasRamp ? "✓ Stufenloser Zugang" : ""}</span>
                    </div>
                    <p className="text-emerald-900/80 text-[11px] leading-relaxed">
                      {selectedBuilding.accessibility.notes}
                    </p>
                  </div>
                </div>

                {/* 4. Öffnungszeiten / Zugang */}
                <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-hkjf-navy block">Zugang &amp; Zeiten:</strong>
                    <span>{selectedBuilding.accessHours}</span>
                  </div>
                </div>

                {/* 5. Insider-Tipp */}
                <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-amber-900">JFAZ-Tipp: </strong>
                    <span>{selectedBuilding.tips}</span>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
}
