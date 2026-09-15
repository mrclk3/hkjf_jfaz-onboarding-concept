"use client";

import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OnboardingStep } from "@/hooks/useOnboardingFlow";

interface StepFlowFooterProps {
  currentStep: OnboardingStep;
  nextStep?: OnboardingStep;
  prevStep?: OnboardingStep;
  isCompleted: boolean;
  onNext: () => void;
  onPrev?: () => void;
}

export function StepFlowFooter({
  currentStep,
  nextStep,
  prevStep,
  isCompleted,
  onNext,
  onPrev,
}: StepFlowFooterProps) {
  return (
    <div className="mt-12 sm:mt-16 bg-gradient-to-r from-hkjf-navy via-slate-900 to-hkjf-navyDark rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-slate-700/50">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="gold" className="text-[11px] font-black uppercase tracking-wider text-slate-950">
              Schritt {currentStep.id} abgeschlossen?
            </Badge>
            {isCompleted && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Erledigt
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white">
            {nextStep
              ? `Als Nächstes: Schritt ${nextStep.id} – ${nextStep.title}`
              : "Letzter Schritt erreicht: Startklar-Quiz & Nachweis"}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {nextStep
              ? nextStep.description
              : "Teste dein Wissen in 3 kurzen Fragen und erhalte deinen offiziellen Startklar-Nachweis!"}
          </p>

          {nextStep && (
            <div className="flex items-center gap-2 text-xs text-blue-200 font-semibold pt-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Geschätzte Dauer: ca. {nextStep.estimatedTime}</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {prevStep && onPrev && (
            <Button
              variant="outline"
              onClick={onPrev}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold text-xs sm:text-sm h-12 px-4 gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Zurück ({prevStep.shortTitle})</span>
            </Button>
          )}

          <Button
            onClick={onNext}
            className="bg-hkjf-red hover:bg-hkjf-redDark text-white font-black text-sm sm:text-base h-12 px-6 rounded-2xl shadow-lg hover:shadow-red-500/20 gap-2.5 group transition-all"
          >
            <span>{nextStep ? `Weiter zu Schritt ${nextStep.id}` : "Quiz starten"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </div>
  );
}
