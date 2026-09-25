"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Sparkles,
  Check,
  Search,
  Clock,
  Shirt,
  ArrowRight,
  ShieldCheck,
  Compass,
  X,
  Laptop,
  Building,
} from "lucide-react";
import { officialCourses, courseCategories, courseFormatOptions, Course } from "@/data/coursesData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseSelectionModalProps {
  isOpen: boolean;
  selectedCourseId: string;
  onSelectAndConfirm: (courseId: string) => void;
  canDismiss?: boolean;
  onClose?: () => void;
}

export function CourseSelectionModal({
  isOpen,
  selectedCourseId,
  onSelectAndConfirm,
  canDismiss = false,
  onClose,
}: CourseSelectionModalProps) {
  const [tempSelectedId, setTempSelectedId] = useState<string>(selectedCourseId);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeFormat, setActiveFormat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Smooth animation mounting states
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTempSelectedId(selectedCourseId);
      setIsRendered(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
      };
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      document.body.style.overflow = "";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, selectedCourseId]);

  if (!isRendered) return null;

  const currentCourse =
    officialCourses.find((c) => c.id === tempSelectedId) || officialCourses[0];

  const filteredCourses = officialCourses.filter((course) => {
    const isOnlineCourse = course.format === "online";
    const matchesFormat =
      activeFormat === "all" ||
      (activeFormat === "online" && isOnlineCourse) ||
      (activeFormat === "praesenz" && !isOnlineCourse);

    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isOnlineCourse && "online webinar digital".includes(searchQuery.toLowerCase()));

    return matchesFormat && matchesCategory && matchesSearch;
  });

  const handleConfirm = () => {
    onSelectAndConfirm(tempSelectedId);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md transition-all duration-300 ease-out select-none overflow-y-auto ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 ease-out transform ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-hkjf-navy via-slate-900 to-hkjf-navyDark p-4 sm:p-6 text-white shrink-0 relative">
          {canDismiss && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pr-8">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-amber-300 border border-white/20 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Willkommen im JFAZ Marburg</span>
            </div>

            <Badge variant="gold" className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-950">
              Schritt 1: Lehrgang wählen
            </Badge>
          </div>

          <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
            Welchen Lehrgang besuchst du?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Wähle dein Seminar aus, damit wir dein Onboarding (Dresscode, Lehrsäle und Packliste) perfekt anpassen.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 space-y-2.5 shrink-0">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Lehrgang suchen (z. B. JuLeiCa, Wertungsrichter, Kinderfeuerwehr)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-16 py-2 rounded-xl bg-white border-2 border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-hkjf-red shadow-2xs placeholder:text-slate-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded hover:bg-slate-200"
              >
                Löschen
              </button>
            )}
          </div>

          {/* Format Tabs (Präsenz vs Online) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl max-w-fit">
            {courseFormatOptions.map((fmt) => {
              const isActive = activeFormat === fmt.id;
              const count =
                fmt.id === "all"
                  ? officialCourses.length
                  : fmt.id === "online"
                  ? officialCourses.filter((c) => c.format === "online").length
                  : officialCourses.filter((c) => c.format !== "online").length;

              return (
                <button
                  key={fmt.id}
                  onClick={() => setActiveFormat(fmt.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-hkjf-navy shadow-xs font-black"
                      : "text-slate-600 hover:text-hkjf-navy"
                  }`}
                >
                  <span>{fmt.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-slate-100 text-hkjf-navy" : "bg-slate-300/60 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {courseCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-hkjf-navy text-white border-hkjf-navy shadow-xs scale-[1.02]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Selection Body */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-grow space-y-2.5 max-h-[360px]">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block px-1">
            Verfügbare Lehrgänge ({filteredCourses.length}) – Bitte anklicken:
          </span>

          {filteredCourses.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
              Kein Lehrgang passend zu &quot;{searchQuery}&quot; gefunden.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
              {filteredCourses.map((course) => {
                const isSelected = course.id === tempSelectedId;
                const isOnline = course.format === "online";

                return (
                  <button
                    key={course.id}
                    onClick={() => setTempSelectedId(course.id)}
                    className={`text-left p-3 rounded-xl sm:rounded-2xl border-2 transition-all duration-150 flex items-start gap-2.5 sm:gap-3 group relative cursor-pointer ${
                      isSelected
                        ? isOnline
                          ? "bg-indigo-50/60 border-indigo-600 shadow-md ring-2 ring-indigo-500/20"
                          : "bg-red-50/50 border-hkjf-red shadow-md ring-2 ring-red-500/15"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isSelected
                          ? isOnline
                            ? "bg-indigo-600 text-white"
                            : "bg-hkjf-red text-white"
                          : isOnline
                          ? "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100"
                          : "bg-slate-100 text-slate-500 group-hover:text-hkjf-navy"
                      }`}
                    >
                      {isOnline ? (
                        <Laptop className="w-4 h-4" />
                      ) : (
                        <GraduationCap className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                        {isOnline ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-indigo-100 text-indigo-700 border border-indigo-200">
                            💻 Online-Seminar
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-slate-100 text-slate-600">
                            🏫 Präsenz
                          </span>
                        )}
                        <Badge
                          variant="secondary"
                          className="text-[9px] px-1.5 py-0 font-bold bg-slate-100 text-slate-600"
                        >
                          {course.categoryLabel}
                        </Badge>
                        <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5 text-slate-400" />
                          {course.duration}
                        </span>
                      </div>

                      <h4
                        className={`text-xs sm:text-sm font-bold leading-snug transition-colors line-clamp-2 ${
                          isSelected ? "text-hkjf-navy font-black" : "text-slate-800"
                        }`}
                      >
                        {course.title}
                      </h4>

                      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                        {isOnline ? (
                          <>
                            <Laptop className="w-3 h-3 text-indigo-500 shrink-0" />
                            <span className="truncate text-indigo-900 font-medium">
                              100% digital (Teams / BBB)
                            </span>
                          </>
                        ) : (
                          <>
                            <Shirt className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{course.clothingBadge}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? isOnline
                              ? "bg-indigo-600 text-white shadow-xs scale-110"
                              : "bg-hkjf-red text-white shadow-xs scale-110"
                            : "border-2 border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Course Preview Summary Banner & Responsive Confirm Button */}
        <div className="p-3 sm:p-4 md:p-5 bg-white border-t-2 border-slate-200 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            {/* Left Course Summary */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  currentCourse.format === "online"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-red-100 text-hkjf-red"
                }`}
              >
                {currentCourse.format === "online" ? (
                  <Laptop className="w-5 h-5" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                  Ausgewähltes Seminar:
                </span>
                <p className="text-xs sm:text-sm font-black text-hkjf-navy truncate">
                  {currentCourse.title}
                </p>
                {currentCourse.format === "online" ? (
                  <span className="text-[11px] font-extrabold text-indigo-700 block truncate">
                    💻 Reines Online-Seminar – Keine Anreise nach Marburg nötig! ({currentCourse.duration})
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-600 block truncate">
                    Dresscode: {currentCourse.clothingBadge} ({currentCourse.duration})
                  </span>
                )}
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              {canDismiss && onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-hkjf-navy h-10 px-3"
                >
                  Abbrechen
                </Button>
              )}

              <Button
                onClick={handleConfirm}
                className="flex-1 md:flex-initial w-full md:w-auto bg-hkjf-red hover:bg-hkjf-redDark text-white font-black text-xs sm:text-sm h-11 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-red-500/20 gap-2 group transition-all justify-center"
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Lehrgang bestätigen &amp; Starten</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
