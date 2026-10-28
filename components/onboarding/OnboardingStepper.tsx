"use client";

import React, { useEffect, useRef } from "react";
import {
  GraduationCap,
  Navigation,
  MapPin,
  Clock,
  Package,
  ShoppingBag,
  Award,
  Check,
  Compass,
  Layers,
  RotateCcw,
  ChevronDown,
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
  const stepperRef = useRef<HTMLDivElement>(null);

  // Publish navbar + stepper height as --sticky-offset (used for scroll-padding-top)
  useEffect(() => {
    const stepper = stepperRef.current;
    const headerBar = document.querySelector<HTMLElement>("[data-header-bar]");
    const header = headerBar?.closest("header");
    if (!stepper) return;
    const update = () => {
      // Only the header bar (+ its top border) counts, not the open mobile drawer
      const headerHeight = headerBar && header
        ? headerBar.offsetHeight + (header.offsetHeight - header.clientHeight)
        : 0;
      document.documentElement.style.setProperty(
        "--sticky-offset",
        `${headerHeight + stepper.offsetHeight}px`
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stepper);
    if (headerBar) observer.observe(headerBar);
    return () => observer.disconnect();
  }, []);

  const modeToggle = (
    <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold shadow-2xs shrink-0">
      <button
        onClick={() => onSwitchMode("guided")}
        aria-pressed={flowMode === "guided"}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
          flowMode === "guided"
            ? "bg-white text-hkjf-navy shadow-sm font-extrabold"
            : "text-slate-500 hover:text-hkjf-navy"
        }`}
        title="Geführter Tour-Modus (Schritt für Schritt)"
      >
        <Compass className="w-3.5 h-3.5 text-hkjf-red" />
        <span className="hidden md:inline">Geführte Tour</span>
        <span className="md:hidden">Tour</span>
      </button>

      <button
        onClick={() => onSwitchMode("overview")}
        aria-pressed={flowMode === "overview"}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
          flowMode === "overview"
            ? "bg-white text-hkjf-navy shadow-sm font-extrabold"
            : "text-slate-500 hover:text-hkjf-navy"
        }`}
        title="Gesamtübersicht (alle Sektionen frei scrollbar, ohne Tour-Leisten)"
      >
        <Layers className="w-3.5 h-3.5 text-blue-600" />
        <span className="hidden md:inline">Gesamtansicht</span>
        <span className="md:hidden">Alle</span>
      </button>
    </div>
  );

  return (
    <div
      ref={stepperRef}
      className="print:hidden bg-white border-b-2 border-slate-200 shadow-sm sticky top-[68px] lg:top-[84px] z-30 transition-all"
    >
      {/* Mobile: one compact row (step picker + actions) and a thin progress bar */}
      <div className="sm:hidden px-3 py-2 space-y-2">
        <div className="flex items-center gap-2">
          <label className="relative flex-1 min-w-0">
            <span className="sr-only">Schritt auswählen</span>
            <select
              value={currentStepId}
              onChange={(e) => onSelectStep(Number(e.target.value))}
              className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 pl-3 pr-8 py-1.5 text-xs font-extrabold text-hkjf-navy truncate"
            >
              {steps.map((step) => (
                <option key={step.id} value={step.id}>
                  {completedSteps.includes(step.id) ? "✓ " : ""}
                  {step.id}/{steps.length}: {step.shortTitle}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          </label>

          {onOpenCourseModal && (
            <button
              onClick={onOpenCourseModal}
              className="shrink-0 p-2 rounded-lg border border-slate-200 bg-slate-100 text-hkjf-red"
              aria-label="Lehrgang wechseln"
              title="Lehrgang wechseln"
            >
              <GraduationCap className="w-4 h-4" />
            </button>
          )}

          {modeToggle}
        </div>
        <div className="flex items-center gap-2">
          <Progress value={progressPercentage} className="h-1.5 bg-slate-100 flex-1" />
          <span className="text-[10px] font-bold text-slate-500 shrink-0">
            {completedSteps.length}/{steps.length} fertig
          </span>
        </div>
      </div>

      <div className="hidden sm:block max-w-7xl mx-auto px-6 lg:px-8 py-3">

        {/* Top Header: Progress & Mode Switcher */}
        <div className="flex items-center justify-between gap-3 mb-2.5">

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hkjf-red text-white text-xs font-black shadow-xs shrink-0">
                {currentStepId}
              </span>
              <span className="text-sm font-black text-hkjf-navy shrink-0">
                Schritt {currentStepId} von {steps.length}:
              </span>
              <span className="text-sm font-extrabold text-hkjf-red truncate hidden md:inline">
                {currentStep.title}
              </span>
            </div>

            <Badge variant="outline" className="text-[11px] font-bold border-slate-300 text-slate-600 shrink-0">
              {completedSteps.length}/{steps.length} fertig ({progressPercentage}%)
            </Badge>

            {onOpenCourseModal && (
              <button
                onClick={onOpenCourseModal}
                className="text-[11px] font-bold text-hkjf-navy bg-slate-100 hover:bg-red-50 hover:text-hkjf-red px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0"
                title="Lehrgangsauswahl im Modal ändern"
                aria-label="Lehrgang wechseln"
              >
                <GraduationCap className="w-3.5 h-3.5 text-hkjf-red" />
                <span className="hidden lg:inline">Lehrgang wechseln</span>
              </button>
            )}
          </div>

          {/* Mode Switcher & Reset */}
          <div className="flex items-center gap-2 shrink-0">
            {modeToggle}

            {/* Reset Button (subtle) */}
            {completedSteps.length > 0 && (
              <button
                onClick={onResetProgress}
                className="text-[11px] font-medium text-slate-400 hover:text-red-500 flex items-center gap-1 p-1 rounded-md transition-colors"
                title="Fortschritt zurücksetzen"
                aria-label="Fortschritt zurücksetzen"
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
          {steps.map((step) => {
            const Icon = STEP_ICONS[step.iconName] || GraduationCap;
            const isCurrent = step.id === currentStepId;
            const isCompleted = completedSteps.includes(step.id);

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border select-none group ${
                  isCurrent
                    ? "bg-hkjf-navy text-white border-hkjf-navy shadow-md ring-2 ring-blue-900/20"
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
