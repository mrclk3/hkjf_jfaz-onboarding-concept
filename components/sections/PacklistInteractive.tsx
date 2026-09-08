"use client";

import React, { useState, useEffect } from "react";
import { CheckSquare, Square, RotateCcw, CheckCheck, Sparkles, Check } from "lucide-react";
import { initialPackItems, packCategories, PackItem } from "@/data/packlistData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PacklistInteractive() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMounted, setIsMounted] = useState(false);

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
    const allIds = initialPackItems.map((item) => item.id);
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

  const totalItems = initialPackItems.length;
  const packedCount = checkedIds.length;
  const progressPercent = isMounted ? Math.round((packedCount / totalItems) * 100) : 0;

  const filteredItems =
    selectedCategory === "all"
      ? initialPackItems
      : initialPackItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="packliste" className="py-16 sm:py-20 bg-white border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="green" className="mb-3">
            Interaktive Checkliste
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkjf-navy tracking-tight">
            Deine interaktive JFAZ-Packliste
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Nichts mehr zuhause vergessen! Hake deine Sachen direkt auf dem Smartphone oder Laptop ab.
            Dein Fortschritt wird automatisch gespeichert.
          </p>
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
              <span>Perfekt! Deine Tasche ist vollständig gepackt. Du bist startklar fürs JFAZ!</span>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {packCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                selectedCategory === cat.id
                  ? "bg-hkjf-navy text-white border-hkjf-navy shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
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
                    : "bg-white border-slate-200 hover:border-hkjf-red/60 hover:shadow-sm"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white" />
                  )}
                </div>

                <div className="flex-grow text-xs sm:text-sm">
                  <span
                    className={`font-semibold ${
                      isChecked ? "line-through text-slate-400" : "text-hkjf-navy"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.recommended && !isChecked && (
                    <span className="ml-2 inline-block text-[10px] uppercase font-extrabold text-hkjf-red bg-red-50 px-1.5 py-0.5 rounded">
                      Wichtig
                    </span>
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
