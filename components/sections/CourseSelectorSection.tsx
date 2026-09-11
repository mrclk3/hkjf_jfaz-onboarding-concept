"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Shirt,
  MapPin,
  Clock,
  Users,
  Search,
  Check,
  ChevronRight,
  Info,
  Package,
  ArrowDown,
} from "lucide-react";
import { officialCourses, courseCategories, Course } from "@/data/coursesData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseSelectorSectionProps {
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
}

export function CourseSelectorSection({
  selectedCourseId,
  onSelectCourse,
}: CourseSelectorSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentCourse =
    officialCourses.find((c) => c.id === selectedCourseId) || officialCourses[0];

  const filteredCourses = officialCourses.filter((course) => {
    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getClothingBadgeClass = (color: Course["clothingBadgeColor"]) => {
    switch (color) {
      case "red":
        return "bg-red-50 text-hkjf-red border-red-200";
      case "green":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "purple":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "amber":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "blue":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <section
      id="lehrgangs-finder"
      className="py-14 sm:py-20 bg-slate-50 border-b border-border/80 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-hkjf-navy border border-blue-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <GraduationCap className="w-4 h-4 text-hkjf-red" />
            <span>Offizieller HKJF Lehrgangsplan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Welchen Lehrgang besuchst du?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Wähle dein Seminar aus dem offiziellen Jahresprogramm der Hessischen Kinder- und
            Jugendfeuerwehr. Dein Onboarding, der Dresscode und deine Packliste passen sich
            automatisch an.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Lehrgang suchen (z. B. Wertungsrichter, Juleica, Kinderfeuerwehr, Survival)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:border-hkjf-red shadow-sm placeholder:text-slate-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md hover:bg-slate-200"
              >
                Löschen
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {courseCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  activeCategory === cat.id
                    ? "bg-hkjf-navy text-white border-hkjf-navy shadow-sm scale-[1.02]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Course Picker & Detailed Course Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Course Selection List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1 mb-1">
              Verfügbare Lehrgänge ({filteredCourses.length})
            </span>

            {filteredCourses.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                Kein Lehrgang passend zu &quot;{searchQuery}&quot; gefunden.
              </div>
            ) : (
              filteredCourses.map((course) => {
                const isSelected = course.id === currentCourse.id;

                return (
                  <button
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3.5 group relative ${
                      isSelected
                        ? "bg-white border-hkjf-red shadow-md ring-2 ring-red-500/10"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isSelected
                          ? "bg-red-50 text-hkjf-red"
                          : "bg-slate-100 text-slate-500 group-hover:text-hkjf-navy"
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 font-bold bg-slate-100 text-slate-600"
                        >
                          {course.categoryLabel}
                        </Badge>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {course.duration}
                        </span>
                      </div>

                      <h4
                        className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${
                          isSelected ? "text-hkjf-navy" : "text-slate-800"
                        }`}
                      >
                        {course.title}
                      </h4>
                    </div>

                    <div className="shrink-0 pt-1">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-hkjf-red text-white flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right: Selected Course Profile & Requirements (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
              
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-hkjf-navy to-hkjf-navyDark p-6 sm:p-7 text-white relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <Badge variant="gold" className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ausgewählter Lehrgang</span>
                  </Badge>
                  <span className="text-xs font-semibold text-blue-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Dauer: {currentCourse.duration}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black leading-tight mb-2">
                  {currentCourse.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentCourse.description}
                </p>
              </div>

              {/* Profile Body */}
              <div className="p-6 sm:p-7 space-y-6">
                
                {/* 1. Dresscode & Clothing Banner */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-4 ${getClothingBadgeClass(
                    currentCourse.clothingBadgeColor
                  )}`}
                >
                  <div className="p-2.5 rounded-xl bg-white shadow-sm shrink-0 mt-0.5">
                    <Shirt className="w-5 h-5 text-current" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-wider">
                        Kleidungsempfehlung / Dresscode:
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white shadow-xs">
                        {currentCourse.clothingBadge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                      {currentCourse.clothingAdvice}
                    </p>
                  </div>
                </div>

                {/* 2. Key Facts: Room & Audience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-hkjf-red" />
                      <span>Ort &amp; Lehrsäle</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-hkjf-navy">
                      {currentCourse.typicalRooms}
                    </p>
                    <a
                      href="#campus"
                      className="text-[11px] font-bold text-hkjf-red hover:underline inline-block pt-1"
                    >
                      Im Campus-Finder anzeigen &rarr;
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Zielgruppe</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-hkjf-navy">
                      {currentCourse.targetAudience}
                    </p>
                    <span className="text-[11px] text-slate-500 block pt-1">
                      Anmeldung zentral über Florix
                    </span>
                  </div>
                </div>

                {/* 3. Course Specific Equipment / Pack Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-hkjf-red" />
                      <h4 className="text-xs sm:text-sm font-extrabold text-hkjf-navy uppercase tracking-wider">
                        Spezielle Ausrüstung für dieses Seminar ({currentCourse.specialPackItems.length})
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      In Packliste aktiv
                    </span>
                  </div>

                  {currentCourse.specialPackItems.length === 0 ? (
                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Keine spezielle Sonderausrüstung erforderlich. Die Standard-Packliste reicht
                        für diesen Lehrgang völlig aus!
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentCourse.specialPackItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-hkjf-navy">{item.label}</span>
                              {item.recommended && (
                                <span className="text-[9px] font-black uppercase bg-red-100 text-hkjf-red px-1.5 py-0.5 rounded">
                                  Wichtig
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">{item.reason}</p>
                          </div>
                          <span className="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            + Integriert
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Action to Packlist */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-hkjf-sand/30 p-4 rounded-2xl border border-slate-200">
                  <div className="text-left text-xs">
                    <span className="font-bold text-hkjf-navy block">
                      Bereit zum Kofferpacken?
                    </span>
                    <span className="text-slate-500">
                      Deine Packliste ist nun auf {currentCourse.title} abgestimmt.
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full sm:w-auto bg-hkjf-red hover:bg-hkjf-redDark text-white font-bold text-xs shadow-md shrink-0"
                  >
                    <a href="#packliste" className="flex items-center gap-1.5">
                      <span>Zur interaktiven Packliste</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
