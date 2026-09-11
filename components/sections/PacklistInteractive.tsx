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
} from "lucide-react";
import { initialPackItems, packCategories, PackItem } from "@/data/packlistData";
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

  // Combine standard pack items with course-specific special items
  const combinedPackItems = useMemo<PackItem[]>(() => {
    const courseItems: PackItem[] = activeCourse.specialPackItems.map((spec) => ({
      id: spec.id,
      label: spec.label,
      category: spec.category,
      recommended: spec.recommended,
      isCourseSpecific: true,
      courseReason: spec.reason,
    }));

    return [...courseItems, ...initialPackItems];
  }, [activeCourse]);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("jfaz_packlist_checked");
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Could not load packlist from localStorage", e);
    }
  }, []);

  // Save to localStorage when changed
  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("jfaz_packlist_checked", JSON.stringify(next));
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
      localStorage.setItem("jfaz_packlist_checked", JSON.stringify(allIds));
    } catch (e) {}
  };

  const handleResetAll = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem("jfaz_packlist_checked");
    } catch (e) {}
  };

  const totalItems = combinedPackItems.length;
  const packedCount = combinedPackItems.filter((item) =>
    checkedIds.includes(item.id)
  ).length;
  const progressPercent =
    isMounted && totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

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
      className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge variant="green" className="mb-3">
            Interaktive Checkliste
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Deine personalisierte JFAZ-Packliste
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Nichts mehr zuhause vergessen! Hake deine Sachen direkt auf dem Smartphone oder Laptop
            ab. Dein Fortschritt wird automatisch auf diesem Gerät gespeichert.
          </p>
        </div>

        {/* Course-Personalized Banner */}
        <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-br from-hkjf-navy via-hkjf-navyDark to-[#18203d] rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-blue-900/50 space-y-4">
          
          {/* Top Row: Context Badge & Course Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Lehrgangsspezifische Packliste
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
              <Shirt className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-amber-200 uppercase text-[11px] tracking-wide">
                  Dresscode:
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

        {/* Progress Card */}
        <div className="max-w-3xl mx-auto bg-hkjf-sand/40 border-2 border-slate-200/90 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pack-Fortschritt
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-black text-hkjf-navy">{progressPercent}%</span>
                <span className="text-xs font-semibold text-slate-600">
                  ({packedCount} von {totalItems} Gegenständen eingepackt)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCheckAll}
                className="text-xs font-bold gap-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Alle abhaken</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetAll}
                className="text-xs text-slate-500 hover:text-hkjf-red gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Zurücksetzen</span>
              </Button>
            </div>
          </div>

          <Progress value={progressPercent} className="h-3" />

          {progressPercent === 100 && (
            <div className="mt-4 p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-emerald-900 text-xs font-bold animate-in fade-in-50 duration-300">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Perfekt! Deine Tasche ist vollständig gepackt für &quot;{activeCourse.title}&quot;.
                Gute Anreise nach Marburg-Cappel!
              </span>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {packCategories.map((cat) => {
            // Count items in this category
            const count =
              cat.id === "all"
                ? combinedPackItems.length
                : cat.id === "lehrgang"
                ? combinedPackItems.filter((i) => i.isCourseSpecific).length
                : combinedPackItems.filter((i) => i.category === cat.id).length;

            if (cat.id === "lehrgang" && count === 0) return null;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-hkjf-navy text-white border-hkjf-navy shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredItems.map((item) => {
            const isChecked = isMounted && checkedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? "bg-emerald-50/50 border-emerald-400/80 text-slate-500"
                    : item.isCourseSpecific
                    ? "bg-amber-50/40 border-amber-300 hover:border-amber-400 hover:shadow-sm"
                    : "bg-white border-slate-200 hover:border-hkjf-red/60 hover:shadow-sm"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-md border-2 bg-white ${
                        item.isCourseSpecific ? "border-amber-400" : "border-slate-300"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-grow text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`font-semibold ${
                        isChecked ? "line-through text-slate-400" : "text-hkjf-navy"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.isCourseSpecific && (
                      <span className="text-[9px] uppercase font-black text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded">
                        Lehrgangs-Bedarf
                      </span>
                    )}
                    {item.recommended && !isChecked && (
                      <span className="text-[9px] uppercase font-black text-hkjf-red bg-red-100 px-1.5 py-0.5 rounded">
                        Wichtig
                      </span>
                    )}
                  </div>

                  {item.courseReason && (
                    <p
                      className={`text-[11px] mt-1 leading-snug ${
                        isChecked ? "text-slate-400" : "text-amber-800/80"
                      }`}
                    >
                      💡 {item.courseReason}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
