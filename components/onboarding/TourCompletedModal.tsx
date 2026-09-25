"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Award,
  Sparkles,
  CheckCircle2,
  Package,
  RotateCcw,
  ArrowRight,
  Laptop,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TourCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  isOnline?: boolean;
  onGoToPacklist: () => void;
  onRestartTour: () => void;
}

export function TourCompletedModal({
  isOpen,
  onClose,
  courseTitle,
  isOnline = false,
  onGoToPacklist,
  onRestartTour,
}: TourCompletedModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.55 },
          });
        } catch (e) {}
      }, 30);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = "";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md transition-all duration-300 ease-out select-none overflow-y-auto ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ease-out transform ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Top Header */}
        <div
          className={`p-6 sm:p-8 text-white text-center relative overflow-hidden ${
            isOnline
              ? "bg-gradient-to-br from-slate-950 via-indigo-950 to-hkjf-navy"
              : "bg-gradient-to-br from-slate-900 via-hkjf-navy to-hkjf-navyDark"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Trophy Icon */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white/20 animate-bounce">
            <Award className="w-10 h-10 text-slate-950 stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-300/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isOnline ? "Digital 100% Startklar" : "Offiziell 100% Startklar"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isOnline ? "Dein Online-Seminar kann kommen!" : "Glückwunsch! Du bist bereit!"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-md mx-auto leading-relaxed">
            {isOnline
              ? "Du hast alle 7 Etappen des digitalen Onboardings für dein Online-Seminar erfolgreich abgeschlossen."
              : "Du hast alle 7 Etappen des JFAZ Onboardings für dein Seminar durchlaufen."}
          </p>
        </div>

        {/* Body Checklist & Summary */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Active Course Banner */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
            <div
              className={`p-2 rounded-xl shrink-0 ${
                isOnline ? "bg-indigo-100 text-indigo-700" : "bg-red-100 text-hkjf-red"
              }`}
            >
              {isOnline ? <Laptop className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Dein Lehrgang:
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-hkjf-navy truncate">
                {courseTitle}
              </p>
              {isOnline && (
                <span className="text-[11px] font-bold text-indigo-600 block">
                  100% Digital – Teilnahme bequem von zu Hause
                </span>
              )}
            </div>
          </div>

          {/* Key Checklist Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {isOnline ? (
              <>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Technik- &amp; Audio-Check geklärt</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Virtueller Check-in bekannt</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Online-Ablauf &amp; Pausen parat</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Schreibtisch-Checkliste komplett</span>
                </div>
              </>
            ) : (
              <>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dresscode &amp; Saal bekannt</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Anreise &amp; Pforte gecheckt</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Campus &amp; Zimmer erkundet</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Koffer-Packliste vollständig</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onClose();
              onRestartTour();
            }}
            className="text-xs text-slate-500 hover:text-hkjf-navy gap-1.5 cursor-pointer w-full sm:w-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tour neu starten</span>
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onGoToPacklist();
              }}
              className="text-xs font-bold gap-1.5 border-slate-300 hover:bg-slate-100 text-hkjf-navy cursor-pointer flex-1 sm:flex-initial"
            >
              <Package className="w-4 h-4 text-hkjf-red" />
              <span>{isOnline ? "Schreibtisch-Checkliste" : "Zur Packliste"}</span>
            </Button>

            <Button
              onClick={onClose}
              className="bg-hkjf-navy hover:bg-hkjf-navyDark text-white font-extrabold text-xs sm:text-sm px-5 rounded-xl shadow-md gap-1.5 cursor-pointer flex-1 sm:flex-initial"
            >
              <span>Fertig</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
