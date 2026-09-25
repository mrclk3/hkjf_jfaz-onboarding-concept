"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  RotateCcw,
  CheckCheck,
  Sparkles,
  Check,
  Shirt,
  Info,
  GraduationCap,
  ChevronDown,
  Printer,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import {
  initialPackItems,
  initialOnlinePackItems,
  packCategories,
  onlinePackCategories,
  PackItem,
} from "@/data/packlistData";
import { officialCourses } from "@/data/coursesData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PacklistInteractiveProps {
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
}

export function PacklistInteractive({
  selectedCourseId,
  onSelectCourse,
}: PacklistInteractiveProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMounted, setIsMounted] = useState(false);

  // Find active course details
  const activeCourse = useMemo(() => {
    return officialCourses.find((c) => c.id === selectedCourseId) || officialCourses[0];
  }, [selectedCourseId]);

  const isOnline = activeCourse.format === "online";

  // Combine standard pack items with course-specific special items
  const combinedPackItems = useMemo<PackItem[]>(() => {
    const baseItems = isOnline ? initialOnlinePackItems : initialPackItems;

    const courseItems: PackItem[] = activeCourse.specialPackItems.map((spec) => ({
      id: spec.id,
      label: spec.label,
      category: spec.category,
      recommended: spec.recommended,
      isCourseSpecific: true,
      courseReason: spec.reason,
    }));

    return [...courseItems, ...baseItems];
  }, [activeCourse, isOnline]);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const storageKey = isOnline ? "jfaz_packlist_online_checked" : "jfaz_packlist_checked";
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      } else {
        setCheckedIds([]);
      }
    } catch (e) {
      console.error("Could not load packlist from localStorage", e);
    }
  }, [isOnline]);

  // Save to localStorage when changed
  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        const storageKey = isOnline ? "jfaz_packlist_online_checked" : "jfaz_packlist_checked";
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {
        console.error("Could not save packlist to localStorage", e);
      }
      return next;
    });
  };

  const handleCheckAll = () => {
    const allIds = combinedPackItems.map((item) => item.id);
    setCheckedIds(allIds);
    try {
      const storageKey = isOnline ? "jfaz_packlist_online_checked" : "jfaz_packlist_checked";
      localStorage.setItem(storageKey, JSON.stringify(allIds));
    } catch (e) {}
  };

  const handleResetAll = () => {
    setCheckedIds([]);
    try {
      const storageKey = isOnline ? "jfaz_packlist_online_checked" : "jfaz_packlist_checked";
      localStorage.removeItem(storageKey);
    } catch (e) {}
  };

  const handlePrint = () => {
    window.print();
  };

  const totalItems = combinedPackItems.length;
  const packedCount = combinedPackItems.filter((item) =>
    checkedIds.includes(item.id)
  ).length;
  const progressPercent =
    isMounted && totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

  const currentCategories = isOnline ? onlinePackCategories : packCategories;

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return combinedPackItems;
    }
    if (selectedCategory === "lehrgang") {
      return combinedPackItems.filter((item) => item.isCourseSpecific);
    }
    return combinedPackItems.filter((item) => item.category === selectedCategory);
  }, [combinedPackItems, selectedCategory]);

  return (
    <section
      id="packliste"
      className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20 print:py-4 print:border-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
        
        {/* Dedicated Print-Only Header (visible on paper / PDF) */}
        <div className="hidden print:block mb-6 pb-4 border-b-2 border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10pt] font-bold uppercase tracking-wider text-slate-600 block">
                Hessische Kinder- und Jugendfeuerwehr | JFAZ Marburg
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                {isOnline ? "Offizielle Online-Seminar Checkliste" : "Offizielle Lehrgangs-Packliste"}
              </h1>
            </div>
            <div className="text-right text-[9pt] text-slate-600 space-y-0.5">
              {isOnline ? (
                <>
                  <p><strong>Format:</strong> 100% Digital / Online-Seminar</p>
                  <p><strong>Plattform:</strong> {activeCourse.platform || "Teams / BBB"}</p>
                </>
              ) : (
                <>
                  <p><strong>Standort:</strong> Lintzingsweg 1a, 35043 Marburg-Cappel</p>
                  <p><strong>Bettwäsche:</strong> Vor Ort vorhanden (Handtücher mitbringen)</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-3 p-3 bg-slate-50 rounded-lg text-[9.5pt] space-y-1.5 border border-slate-300">
            <p><strong>Ausgewählter Lehrgang:</strong> {activeCourse.title} ({activeCourse.duration})</p>
            <p><strong>Empfehlung:</strong> {activeCourse.clothingBadge} — {activeCourse.clothingAdvice}</p>
            <div className="pt-2 flex gap-8 border-t border-slate-200">
              <span><strong>Name:</strong> ____________________________________</span>
              <span><strong>Heimatfeuerwehr:</strong> ________________________</span>
              <span><strong>Datum:</strong> ______________</span>
            </div>
          </div>
        </div>

        {/* Screen Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 print:hidden">
          {isOnline ? (
            <>
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200 font-extrabold flex items-center gap-1.5 mx-auto w-fit">
                <Laptop className="w-3.5 h-3.5" />
                <span>Schreibtisch- &amp; Technik-Checkliste</span>
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Deine digitale Checkliste fürs Online-Seminar
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Kofferpacken entfällt! Hake hier deine Hardware, Headset, Zugangsdaten und Notizen ab, damit am Seminartag alles reibungslos läuft.
              </p>
            </>
          ) : (
            <>
              <Badge variant="green" className="mb-3">
                Interaktive Checkliste
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
                Deine personalisierte JFAZ-Packliste
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Nichts mehr zuhause vergessen! Hake deine Sachen direkt auf dem Smartphone oder Laptop
                ab oder drucke dir deine Kofferliste mit 1-Klick aus.
              </p>
            </>
          )}
        </div>

        {/* Course-Personalized Banner */}
        <div
          className={`max-w-3xl mx-auto mb-8 rounded-2xl p-5 sm:p-6 text-white shadow-xl space-y-4 print:hidden ${
            isOnline
              ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-hkjf-navy border border-indigo-500/30"
              : "bg-gradient-to-br from-hkjf-navy via-hkjf-navyDark to-[#18203d] border border-blue-900/50"
          }`}
        >
          {/* Top Row: Context Badge & Course Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                {isOnline ? <Laptop className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                {isOnline ? "Online-Seminar Checkliste" : "Lehrgangsspezifische Packliste"}
              </span>
              <span className="text-[11px] font-semibold bg-white/10 px-2 py-0.5 rounded-full text-slate-200">
                {activeCourse.duration}
              </span>
            </div>

            {/* Quick Course Switcher Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="course-select-packlist" className="text-xs font-semibold text-blue-200 shrink-0">
                Wechseln:
              </label>
              <div className="relative w-full sm:w-auto">
                <select
                  id="course-select-packlist"
                  value={selectedCourseId}
                  onChange={(e) => onSelectCourse(e.target.value)}
                  className="w-full sm:w-64 bg-white text-hkjf-navy text-xs font-bold py-2 pl-3 pr-8 rounded-xl border border-white/20 shadow-sm cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-amber-300 truncate"
                >
                  {officialCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.format === "online" ? "💻 " : "🏫 "}
                      {c.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-hkjf-navy absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Main Course Title */}
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
              {activeCourse.title}
            </h3>
          </div>

          {/* Clothing & Special Info Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 flex items-start gap-3.5 text-xs text-slate-100 border border-white/15">
            <div className="p-2 rounded-lg bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
              {isOnline ? <Laptop className="w-4 h-4" /> : <Shirt className="w-4 h-4" />}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-amber-200 uppercase text-[11px] tracking-wide">
                  {isOnline ? "Arbeitsplatz & Kamera:" : "Dresscode:"}
                </span>
                <span className="font-bold text-xs bg-white/20 text-white px-2 py-0.5 rounded-md">
                  {activeCourse.clothingBadge}
                </span>
                {activeCourse.specialPackItems.length > 0 && (
                  <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-900/60 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                    +{activeCourse.specialPackItems.length} Sonderausrüstung integriert
                  </span>
                )}
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed opacity-95">
                {activeCourse.clothingAdvice}
              </p>
            </div>
          </div>
        </div>

        {/* Progress & Action Card */}
        <div className="max-w-3xl mx-auto bg-hkjf-sand/40 border-2 border-slate-200/90 rounded-2xl p-6 mb-8 shadow-sm print:hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isOnline ? "Vorbereitungs-Fortschritt" : "Pack-Fortschritt"}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-black text-hkjf-navy">{progressPercent}%</span>
                <span className="text-xs font-semibold text-slate-600">
                  ({packedCount} von {totalItems} Punkten erledigt)
                </span>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="text-xs font-bold gap-1.5 bg-white text-slate-700 hover:bg-slate-100 hover:text-hkjf-navy shadow-xs border-slate-300 cursor-pointer"
                title="Liste als PDF speichern oder drucken"
              >
                <Printer className="w-3.5 h-3.5 text-hkjf-red" />
                <span>Drucken / PDF</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCheckAll}
                className="text-xs font-bold gap-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shadow-xs cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Alle</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetAll}
                className="text-xs text-slate-500 hover:text-hkjf-red gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            </div>
          </div>

          <Progress value={progressPercent} className="h-3" />

          {progressPercent === 100 && (
            <div className="mt-4 p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-emerald-900 text-xs font-bold animate-in fade-in-50 duration-300">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {isOnline
                  ? `Perfekt! Dein digitaler Arbeitsplatz ist vollständig startklar für "${activeCourse.title}". Gutes Gelingen im Seminar!`
                  : `Perfekt! Deine Tasche ist vollständig gepackt für "${activeCourse.title}". Gute Anreise nach Marburg-Cappel!`}
              </span>
            </div>
          )}
        </div>

        {/* Category Filters (Screen Only) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 print:hidden">
          {currentCategories.map((cat) => {
            let count = 0;
            if (cat.id === "all") count = combinedPackItems.length;
            else if (cat.id === "lehrgang")
              count = combinedPackItems.filter((i) => i.isCourseSpecific).length;
            else count = combinedPackItems.filter((i) => i.category === cat.id).length;

            if (cat.id === "lehrgang" && count === 0) return null;

            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-hkjf-navy text-white border-hkjf-navy shadow-sm scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Packlist Items Grid / Checkboxes */}
        <div className="max-w-3xl mx-auto space-y-2.5">
          {filteredItems.map((item) => {
            const isChecked = checkedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-start justify-between gap-3 cursor-pointer group select-none ${
                  isChecked
                    ? "bg-slate-50 border-slate-200 opacity-60 print:opacity-100"
                    : item.isCourseSpecific
                    ? "bg-amber-50/50 border-amber-200 hover:border-amber-400"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 bg-white group-hover:border-slate-400"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs sm:text-sm font-semibold transition-colors ${
                          isChecked ? "line-through text-slate-400 font-normal" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </span>

                      {item.isCourseSpecific && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded-md">
                          🎯 Nur für diesen Kurs
                        </span>
                      )}

                      {item.recommended && !item.isCourseSpecific && (
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md">
                          Empfohlen
                        </span>
                      )}
                    </div>

                    {item.courseReason && (
                      <p className="text-[11px] text-amber-800/90 leading-relaxed font-medium">
                        💡 Grund: {item.courseReason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
