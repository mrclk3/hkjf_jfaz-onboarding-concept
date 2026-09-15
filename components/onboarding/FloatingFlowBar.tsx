"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Award,
} from "lucide-react";
import { OnboardingStep } from "@/hooks/useOnboardingFlow";
import { Button } from "@/components/ui/button";

interface FloatingFlowBarProps {
  steps: OnboardingStep[];
  currentStepId: number;
  completedSteps: number[];
  progressPercentage: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToStep: (id: number) => void;
  onCompleteTour?: () => void;
}

export function FloatingFlowBar({
  steps,
  currentStepId,
  completedSteps,
  progressPercentage,
  onNext,
  onPrev,
  onGoToStep,
  onCompleteTour,
}: FloatingFlowBarProps) {
  const currentStep = steps.find((s) => s.id === currentStepId) || steps[0];
  const nextStep = steps.find((s) => s.id === currentStepId + 1);
  const isFirstStep = currentStepId === 1;
  const isLastStep = currentStepId === steps.length;
  const isCompleted = completedSteps.includes(currentStepId);

  const handleLastStepClick = () => {
    if (onCompleteTour) {
      onCompleteTour();
    } else {
      onNext();
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl border-2 border-slate-300 shadow-2xl p-2.5 sm:p-3 pointer-events-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Previous Button & Current Step Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrev}
            disabled={isFirstStep}
            className="text-xs font-bold text-slate-600 hover:text-hkjf-navy hover:bg-slate-100 disabled:opacity-30 px-2 sm:px-3 h-9 shrink-0 gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Zurück</span>
          </Button>

          <div className="border-l border-slate-200 pl-2 sm:pl-3 min-w-0 hidden xs:block">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Schritt {currentStepId}/{steps.length}</span>
              {isCompleted && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
              )}
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-hkjf-navy truncate max-w-[160px] sm:max-w-[280px]">
              {currentStep.title}
            </p>
          </div>
        </div>

        {/* Right: Next Step Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          {!isLastStep ? (
            <Button
              onClick={onNext}
              className="bg-hkjf-red hover:bg-hkjf-redDark text-white font-extrabold text-xs sm:text-sm px-4 sm:px-6 h-10 rounded-xl shadow-md gap-2 group transition-all cursor-pointer"
            >
              <span>Weiter</span>
              {nextStep && (
                <span className="hidden md:inline font-normal opacity-90">
                  zu: {nextStep.shortTitle}
                </span>
              )}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          ) : (
            <Button
              onClick={handleLastStepClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 sm:px-6 h-10 rounded-xl shadow-md gap-2 group cursor-pointer animate-pulse hover:animate-none"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Tour abschließen 🎉</span>
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
