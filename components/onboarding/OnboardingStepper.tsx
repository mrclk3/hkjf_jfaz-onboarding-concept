"use client";

import React from "react";
import {
  GraduationCap,
  Navigation,
  MapPin,
  Clock,
  Package,
  ShoppingBag,
  Award,
  Check,
  Sparkles,
  Compass,
  Layers,
  RotateCcw,
} from "lucide-react";
import { OnboardingStep, FlowMode } from "@/hooks/useOnboardingFlow";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface OnboardingStepperProps {
  steps: OnboardingStep[];
  currentStepId: number;
  completedSteps: number[];
  progressPercentage: number;
  flowMode: FlowMode;
  onSelectStep: (stepId: number) => void;
  onSwitchMode: (mode: FlowMode) => void;
  onResetProgress: () => void;
  onOpenCourseModal?: () => void;
}

const STEP_ICONS: Record<string, React.ElementType> = {
  GraduationCap,
  Navigation,
  MapPin,
  Clock,
  Package,
  ShoppingBag,
  Award,
};

export function OnboardingStepper({
  steps,
  currentStepId,
  completedSteps,
  progressPercentage,
  flowMode,
  onSelectStep,
  onSwitchMode,
  onResetProgress,
  onOpenCourseModal,
}: OnboardingStepperProps) {
  const currentStep = steps.find((s) => s.id === currentStepId) || steps[0];

  return (
    <div className="bg-white border-b-2 border-slate-200 shadow-sm sticky top-[68px] z-30 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
        
        {/* Top Header: Progress & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hkjf-red text-white text-xs font-black shadow-xs">
                {currentStepId}
              </span>
              <span className="text-xs sm:text-sm font-black text-hkjf-navy">
                Schritt {currentStepId} von {steps.length}:
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-hkjf-red hidden sm:inline truncate max-w-[200px] md:max-w-none">
                {currentStep.title}
              </span>
            </div>

            <Badge variant="outline" className="text-[11px] font-bold border-slate-300 text-slate-600 shrink-0">
              {completedSteps.length}/{steps.length} fertig ({progressPercentage}%)
            </Badge>

            {onOpenCourseModal && (
              <button
                onClick={onOpenCourseModal}
                className="text-[11px] font-bold text-hkjf-navy bg-slate-100 hover:bg-red-50 hover:text-hkjf-red px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                title="Lehrgangsauswahl im Modal ändern"
              >
                <GraduationCap className="w-3.5 h-3.5 text-hkjf-red" />
                <span>Lehrgang wechseln</span>
              </button>
            )}
          </div>

          {/* Mode Switcher & Reset */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold shadow-2xs">
              <button
                onClick={() => onSwitchMode("guided")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                  flowMode === "guided"
                    ? "bg-white text-hkjf-navy shadow-sm font-extrabold"
                    : "text-slate-500 hover:text-hkjf-navy"
                }`}
                title="Geführter Tour-Modus (Schritt für Schritt)"
              >
                <Compass className="w-3.5 h-3.5 text-hkjf-red" />
                <span className="hidden xs:inline">Geführte Tour</span>
                <span className="xs:hidden">Tour</span>
              </button>

              <button
                onClick={() => onSwitchMode("overview")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                  flowMode === "overview"
                    ? "bg-white text-hkjf-navy shadow-sm font-extrabold"
                    : "text-slate-500 hover:text-hkjf-navy"
                }`}
                title="Gesamtübersicht (Alle Sektionen frei scrollbar)"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden xs:inline">Gesamtansicht</span>
                <span className="xs:hidden">Alle</span>
              </button>
            </div>

            {/* Reset Button (subtle) */}
            {completedSteps.length > 0 && (
              <button
                onClick={onResetProgress}
                className="text-[11px] font-medium text-slate-400 hover:text-red-500 flex items-center gap-1 p-1 rounded-md transition-colors"
                title="Fortschritt zurücksetzen"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-3">
          <Progress value={progressPercentage} className="h-1.5 bg-slate-100" />
        </div>

        {/* Interactive Step Pills / Horizontal Stepper Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
          {steps.map((step) => {
            const Icon = STEP_ICONS[step.iconName] || GraduationCap;
            const isCurrent = step.id === currentStepId;
            const isCompleted = completedSteps.includes(step.id);

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border select-none group ${
                  isCurrent
                    ? "bg-hkjf-navy text-white border-hkjf-navy shadow-md scale-[1.02] ring-2 ring-blue-900/20"
                    : isCompleted
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/70"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {/* Step Number / Completed Check */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-colors ${
                    isCurrent
                      ? "bg-hkjf-red text-white"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : step.id}
                </div>

                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isCurrent
                      ? "text-amber-300"
                      : isCompleted
                      ? "text-emerald-700"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />

                <span className="whitespace-nowrap font-extrabold">{step.shortTitle}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
